import { createHash } from 'node:crypto';
import {
	copyFile,
	mkdir,
	readFile,
	readdir,
	rename,
	stat,
	unlink,
	writeFile
} from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';

/**
 * Mirror applied artwork into the media folders as local image files.
 *
 * Jellyfin's local image provider re-imports files sitting next to the media on
 * every metadata refresh and library scan, and those files win over whatever the
 * API uploaded. Left alone, an old `folder.jpg` therefore keeps "reverting" an
 * applied poster. Writing the applied (verified read-back) bytes into the folder
 * turns that same mechanism into the protection: the next refresh re-imports the
 * applied image instead of the stale one.
 *
 * The mapping from the media server's view of a path (`/data/movies/…`, the
 * container path Jellyfin reports) to the app's own mount is configured with
 * `MEDIA_PATH_MAP` (`from:to` pairs, `;`-separated). Without a mapping — or with
 * `LOCAL_ARTWORK=off` — every write is skipped and behavior is unchanged.
 */

export interface MediaPathMapping {
	from: string;
	to: string;
}

/** Parse `MEDIA_PATH_MAP` (`/data/movies:/media/movies;/data/tv:/media/tv`). */
export function parseMediaPathMap(raw: string | null | undefined): MediaPathMapping[] {
	if (!raw) return [];
	const mappings: MediaPathMapping[] = [];
	for (const entry of raw.split(';')) {
		const trimmed = entry.trim();
		if (!trimmed) continue;
		const separator = trimmed.indexOf(':');
		if (separator <= 0 || separator === trimmed.length - 1) continue;
		const from = trimmed.slice(0, separator).trim().replace(/\/+$/, '');
		const to = trimmed
			.slice(separator + 1)
			.trim()
			.replace(/\/+$/, '');
		if (!from.startsWith('/') || !to.startsWith('/')) continue;
		mappings.push({ from, to });
	}
	return mappings;
}

/** Translate a media-server item path into this app's filesystem view. */
export function mapItemPath(itemPath: string, mappings: MediaPathMapping[]): string | null {
	for (const mapping of mappings) {
		if (itemPath === mapping.from) return mapping.to;
		if (itemPath.startsWith(`${mapping.from}/`)) {
			return `${mapping.to}${itemPath.slice(mapping.from.length)}`;
		}
	}
	return null;
}

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'tbn', 'bmp', 'gif'];
const POSTER_CONFLICT_BASES = ['folder', 'poster', 'cover'];
const BACKGROUND_CONFLICT_BASES = ['fanart', 'backdrop', 'background'];

/** Identify an image format from magic bytes so the local file is served raw. */
export function imageExtensionForBytes(bytes: Uint8Array): string | null {
	if (
		bytes.length >= 8 &&
		bytes[0] === 0x89 &&
		bytes[1] === 0x50 &&
		bytes[2] === 0x4e &&
		bytes[3] === 0x47
	) {
		return 'png';
	}
	if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
		return 'jpg';
	}
	if (
		bytes.length >= 12 &&
		bytes[0] === 0x52 &&
		bytes[1] === 0x49 &&
		bytes[2] === 0x46 &&
		bytes[3] === 0x46 &&
		bytes[8] === 0x57 &&
		bytes[9] === 0x45 &&
		bytes[10] === 0x42 &&
		bytes[11] === 0x50
	) {
		return 'webp';
	}
	if (
		bytes.length >= 4 &&
		bytes[0] === 0x47 &&
		bytes[1] === 0x49 &&
		bytes[2] === 0x46 &&
		bytes[3] === 0x38
	) {
		return 'gif';
	}
	return null;
}

function sha256Hex(bytes: Uint8Array): string {
	return createHash('sha256').update(bytes).digest('hex');
}

export type LocalArtworkKind = 'poster' | 'background';

export type LocalArtworkWriteOutcome =
	| { status: 'written'; path: string; moved: string[] }
	| { status: 'unchanged'; path: string }
	| { status: 'skipped'; reason: string };

export interface LocalArtworkWriteInput {
	/** The media server's path for the item (e.g. `/data/movies/Title/movie.mkv`), or null. */
	itemPath: string | null;
	kind: LocalArtworkKind;
	/** The verified bytes as read back from the server after the apply. */
	bytes: ArrayBuffer | Uint8Array;
	mediaItemId: number;
}

export interface LocalArtworkWriter {
	write(input: LocalArtworkWriteInput): Promise<LocalArtworkWriteOutcome>;
}

export interface LocalArtworkWriterOptions {
	mappings: MediaPathMapping[];
	/** Where displaced local images are preserved (never deleted). */
	backupRoot: string;
	logger?: (message: string) => void;
}

function isImageFile(name: string): boolean {
	return IMAGE_EXTENSIONS.includes(extname(name).slice(1).toLowerCase());
}

function isConflictFile(name: string, kind: LocalArtworkKind, videoBase: string): boolean {
	if (!isImageFile(name)) return false;
	const lower = name.toLowerCase();
	const stem = lower.slice(0, lower.lastIndexOf('.'));
	if (kind === 'poster') {
		return POSTER_CONFLICT_BASES.includes(stem) || stem === videoBase;
	}
	return BACKGROUND_CONFLICT_BASES.includes(stem);
}

async function uniqueBackupPath(directory: string, name: string): Promise<string> {
	let candidate = join(directory, name);
	let suffix = 1;
	for (;;) {
		try {
			await stat(candidate);
			candidate = join(directory, `${name}.${suffix}`);
			suffix += 1;
		} catch {
			return candidate;
		}
	}
}

export function createLocalArtworkWriter(options: LocalArtworkWriterOptions): LocalArtworkWriter {
	const log = options.logger ?? (() => {});
	return {
		async write(input) {
			try {
				if (!input.itemPath) return { status: 'skipped', reason: 'item has no media path' };
				const mapped = mapItemPath(input.itemPath, options.mappings);
				if (!mapped) {
					return { status: 'skipped', reason: 'media path is not covered by MEDIA_PATH_MAP' };
				}
				const folder = dirname(mapped);
				try {
					const stats = await stat(folder);
					if (!stats.isDirectory()) return { status: 'skipped', reason: 'media folder not found' };
				} catch {
					return { status: 'skipped', reason: 'media folder not found' };
				}

				const bytes = input.bytes instanceof Uint8Array ? input.bytes : new Uint8Array(input.bytes);
				const ext = imageExtensionForBytes(bytes);
				if (!ext) return { status: 'skipped', reason: 'unrecognized image format' };
				const name = input.kind === 'poster' ? `folder.${ext}` : `fanart.${ext}`;
				const target = join(folder, name);
				const digest = sha256Hex(bytes);

				let targetExists = false;
				try {
					const existing = await readFile(target);
					if (sha256Hex(existing) === digest) return { status: 'unchanged', path: target };
					targetExists = true;
				} catch {
					targetExists = false;
				}

				const backupDir = join(options.backupRoot, String(input.mediaItemId));
				const moved: string[] = [];
				const videoBase = basename(mapped, extname(mapped)).toLowerCase();
				let entries: string[] = [];
				try {
					entries = await readdir(folder);
				} catch {
					entries = [];
				}
				for (const entry of entries) {
					if (entry === name) continue;
					if (!isConflictFile(entry, input.kind, videoBase)) continue;
					await mkdir(backupDir, { recursive: true });
					const backupPath = await uniqueBackupPath(backupDir, entry);
					await copyFile(join(folder, entry), backupPath);
					await unlink(join(folder, entry));
					moved.push(entry);
				}
				if (targetExists) {
					await mkdir(backupDir, { recursive: true });
					const backupPath = await uniqueBackupPath(backupDir, `${name}.replaced`);
					await copyFile(target, backupPath);
				}

				const temporary = join(folder, `.${name}.tmp-${process.pid}-${Date.now()}`);
				await writeFile(temporary, bytes, { mode: 0o644 });
				await rename(temporary, target);
				log(
					`local artwork: wrote ${target}${moved.length > 0 ? ` (moved: ${moved.join(', ')})` : ''}`
				);
				return { status: 'written', path: target, moved };
			} catch (error) {
				const reason = error instanceof Error ? error.message : String(error);
				log(`local artwork: skipped (${reason})`);
				return { status: 'skipped', reason };
			}
		}
	};
}

/**
 * Build the writer from deployment environment. Returns undefined — keeping the
 * feature off — unless at least one valid path mapping is configured and
 * `LOCAL_ARTWORK` is not `off`.
 */
export function createLocalArtworkWriterFromEnv(
	environment: Record<string, string | undefined>,
	dataDirectory: string
): LocalArtworkWriter | undefined {
	if (environment.LOCAL_ARTWORK === 'off') return undefined;
	const mappings = parseMediaPathMap(environment.MEDIA_PATH_MAP);
	if (mappings.length === 0) return undefined;
	return createLocalArtworkWriter({
		mappings,
		backupRoot: join(dataDirectory, 'local-artwork-backups'),
		logger: (message) => console.log(message)
	});
}

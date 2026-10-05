import { createHash, randomUUID } from 'node:crypto';
import {
	lstat,
	mkdir,
	realpath,
	readFile,
	readdir,
	rename,
	stat,
	unlink,
	writeFile
} from 'node:fs/promises';
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path';

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
		const from = trimmed.slice(0, separator).trim().replace(/\/+$/, '') || '/';
		const to =
			trimmed
				.slice(separator + 1)
				.trim()
				.replace(/\/+$/, '') || '/';
		if (!from.startsWith('/') || !to.startsWith('/')) continue;
		mappings.push({ from, to });
	}
	return mappings;
}

/** Translate a media-server item path into this app's filesystem view. */
export function mapItemPath(itemPath: string, mappings: MediaPathMapping[]): string | null {
	const mapping = matchingMapping(itemPath, mappings);
	return mapping ? resolve(mapping.to, relative(resolve(mapping.from), resolve(itemPath))) : null;
}

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'tbn', 'bmp', 'gif'];
const VIDEO_EXTENSIONS = ['mkv', 'mp4', 'avi', 'm4v', 'mov', 'wmv', 'ts', 'mts', 'm2ts', 'webm'];
const POSTER_CONFLICT_BASES = ['folder', 'poster', 'cover', 'default', 'movie', 'show'];
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

export type LocalArtworkItemType = 'movie' | 'show' | 'season' | 'episode';

export type LocalArtworkWriteOutcome =
	| { status: 'written'; path: string; moved: string[] }
	| { status: 'unchanged'; path: string; moved?: string[] }
	| { status: 'skipped'; reason: string }
	| { status: 'removed'; path: string; backedUp: string | null };

export interface LocalArtworkWriteInput {
	/** The media server's path for the item (e.g. `/data/movies/Title/movie.mkv`), or null. */
	itemPath: string | null;
	itemType: LocalArtworkItemType;
	kind: LocalArtworkKind;
	/** The verified bytes as read back from the server after the apply. */
	bytes: ArrayBuffer | Uint8Array;
	mediaItemId: number;
}

export interface LocalArtworkRestoreInput {
	/** The media server's path for the item. */
	itemPath: string | null;
	itemType: LocalArtworkItemType;
	kind: LocalArtworkKind;
	mediaItemId: number;
	/** Desired bytes, or null to indicate the artwork should be absent. */
	bytes: ArrayBuffer | Uint8Array | null;
	/** Pre-undo server bytes — CAS anchor. Restore only operates when canonical file matches by hash. */
	expectedBytes: ArrayBuffer | Uint8Array;
}

export interface LocalArtworkWriter {
	write(input: LocalArtworkWriteInput): Promise<LocalArtworkWriteOutcome>;
	restore(input: LocalArtworkRestoreInput): Promise<LocalArtworkWriteOutcome>;
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

function isVideoFile(name: string): boolean {
	return VIDEO_EXTENSIONS.includes(extname(name).slice(1).toLowerCase());
}

function contained(root: string, path: string): boolean {
	const suffix = relative(root, path);
	return suffix !== '..' && !suffix.startsWith(`..${sep}`) && !isAbsolute(suffix);
}

function safeAbsolute(path: string): boolean {
	return isAbsolute(path) && !path.includes('\0') && !path.split('/').includes('..');
}

function matchingMapping(
	itemPath: string,
	mappings: MediaPathMapping[]
): MediaPathMapping | undefined {
	if (!safeAbsolute(itemPath)) return undefined;
	return [...mappings]
		.filter(({ from, to }) => safeAbsolute(from) && safeAbsolute(to))
		.sort((a, b) => b.from.length - a.from.length)
		.find(({ from }) => contained(resolve(from), resolve(itemPath)));
}

function toBytes(data: ArrayBuffer | Uint8Array): Uint8Array {
	return data instanceof Uint8Array ? data : new Uint8Array(data);
}

interface LocalTarget {
	folder: string;
	stem: string;
	conflictStems: Set<string>;
}

type LocalTargetInput = Pick<LocalArtworkWriteInput, 'itemPath' | 'itemType' | 'kind'>;

async function resolveTarget(
	input: LocalTargetInput,
	mappings: MediaPathMapping[]
): Promise<LocalTarget> {
	if (!input.itemPath) throw new Error('item has no media path');
	const mapping = matchingMapping(input.itemPath, mappings);
	const mapped = mapItemPath(input.itemPath, mappings);
	if (!mapping || !mapped) throw new Error('media path is not safely covered by MEDIA_PATH_MAP');
	if (input.itemType === 'episode' && input.kind === 'background') {
		throw new Error('episode background artwork is not supported');
	}
	const directoryItem = input.itemType === 'show' || input.itemType === 'season';
	const lexicalFolder = directoryItem ? mapped : dirname(mapped);
	const root = await realpath(mapping.to);
	const folder = await realpath(lexicalFolder);
	if (!contained(root, folder) || !contained(resolve(mapping.to), resolve(lexicalFolder))) {
		throw new Error('media folder escapes its mapping');
	}
	if (!(await stat(folder)).isDirectory()) throw new Error('media folder not found');
	if (input.itemType === 'season') {
		// Parent-level season art takes precedence. Do not guess which parent file
		// belongs to this season without the provider's season name and index.
		if (!contained(root, dirname(folder))) throw new Error('season parent is outside mapping');
		const parentFiles = await readdir(dirname(folder));
		if (
			parentFiles.some(
				(name) => isImageFile(name) && /-(poster|fanart)$/i.test(basename(name, extname(name)))
			)
		) {
			throw new Error('parent show directory has artwork overrides; season mirror skipped');
		}
	}
	const videoBase = basename(mapped, extname(mapped));
	const lowerBase = videoBase.toLowerCase();
	const entries = await readdir(folder);
	const shared =
		input.itemType === 'movie' &&
		entries.some(
			(name) => isVideoFile(name) && basename(name, extname(name)).toLowerCase() !== lowerBase
		);
	const generic = input.kind === 'poster' ? POSTER_CONFLICT_BASES : BACKGROUND_CONFLICT_BASES;
	const conflictStems = new Set<string>();
	let stem: string;
	if (input.itemType === 'episode') {
		stem = `${videoBase}-thumb`;
		conflictStems.add(lowerBase);
		conflictStems.add(stem.toLowerCase());
	} else {
		stem = shared
			? `${videoBase}-${input.kind === 'poster' ? 'poster' : 'fanart'}`
			: input.kind === 'poster'
				? 'folder'
				: 'fanart';
		if (!shared) {
			for (const name of generic) conflictStems.add(name);
			if (input.kind === 'poster') conflictStems.add(input.itemType === 'movie' ? 'movie' : 'show');
		}
		if (input.itemType === 'movie') {
			if (input.kind === 'poster') conflictStems.add(lowerBase);
			for (const name of generic) conflictStems.add(`${lowerBase}-${name}`);
		}
	}
	return { folder, stem, conflictStems };
}

interface LocalFile {
	name: string;
	path: string;
	bytes: Uint8Array;
}

async function readConflicts(target: LocalTarget): Promise<LocalFile[]> {
	const files: LocalFile[] = [];
	for (const name of await readdir(target.folder)) {
		if (
			!isImageFile(name) ||
			!target.conflictStems.has(basename(name, extname(name)).toLowerCase())
		)
			continue;
		const path = join(target.folder, name);
		// Do not follow artwork symlinks, including dangling links, or read devices.
		const info = await lstat(path);
		if (!info.isFile() || info.isSymbolicLink()) throw new Error('artwork is not a regular file');
		files.push({ name, path, bytes: await readFile(path) });
	}
	return files;
}

async function backupFile(file: LocalFile, directory: string, name: string): Promise<string> {
	await mkdir(directory, { recursive: true });
	for (let suffix = 0; ; suffix += 1) {
		const path = join(directory, suffix ? `${name}.${suffix}` : name);
		try {
			// Exclusive create preserves earlier backups even under concurrent writers.
			await writeFile(path, file.bytes, { flag: 'wx', mode: 0o600 });
			return path;
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
		}
	}
}

// Serialize local filesystem changes across writer instances in this process.
const pendingFolders = new Map<string, Promise<void>>();
async function withFolderLock<T>(folder: string, work: () => Promise<T>): Promise<T> {
	const previous = pendingFolders.get(folder) ?? Promise.resolve();
	let release!: () => void;
	const next = new Promise<void>((resolve) => {
		release = resolve;
	});
	pendingFolders.set(folder, next);
	await previous;
	try {
		return await work();
	} finally {
		release();
		if (pendingFolders.get(folder) === next) pendingFolders.delete(folder);
	}
}

export function createLocalArtworkWriter(options: LocalArtworkWriterOptions): LocalArtworkWriter {
	const log = options.logger ?? (() => {});
	async function reconcile(
		input: LocalArtworkWriteInput | LocalArtworkRestoreInput,
		restoring: boolean
	): Promise<LocalArtworkWriteOutcome> {
		try {
			const target = await resolveTarget(input, options.mappings);
			return await withFolderLock(target.folder, async () => {
				const bytes = input.bytes === null ? null : toBytes(input.bytes);
				const ext = bytes ? imageExtensionForBytes(bytes) : null;
				if (bytes && !ext) throw new Error('unrecognized image format');
				const files = await readConflicts(target);
				const expected = restoring
					? sha256Hex(toBytes((input as LocalArtworkRestoreInput).expectedBytes))
					: null;
				// Check ALL possible local sources, not just the previous extension.
				// Refuse the entire restore if anyone changed an in-scope file independently.
				if (restoring && files.some((file) => sha256Hex(file.bytes) !== expected)) {
					throw new Error('local artwork independently changed; refusing restore');
				}
				const name = `${target.stem}.${ext ?? imageExtensionForBytes(toBytes((input as LocalArtworkRestoreInput).expectedBytes)) ?? 'jpg'}`;
				const path = join(target.folder, name);
				const existing = files.find((file) => file.name === name);
				const unchanged = bytes && existing && sha256Hex(existing.bytes) === sha256Hex(bytes);
				const displaced = files.filter((file) => !bytes || file.name !== name || !unchanged);
				const backupDir = join(options.backupRoot, String(input.mediaItemId));
				const backups = new Map<string, string>();
				let temporary: string | undefined;
				try {
					// Stage first: a failed write must not remove existing images.
					if (bytes && !unchanged) {
						temporary = join(target.folder, `.${name}.tmp-${randomUUID()}`);
						await writeFile(temporary, bytes, { mode: 0o644, flag: 'wx' });
					}
					for (const file of displaced) {
						backups.set(
							file.path,
							await backupFile(
								file,
								backupDir,
								bytes && file.name === name ? `${name}.replaced` : file.name
							)
						);
					}
					// Detect edits made while staging/backing up; don't clobber them.
					const fresh = await readConflicts(target);
					if (
						fresh.length !== files.length ||
						fresh.some(
							(file) =>
								!files.some(
									(prior) =>
										prior.name === file.name && sha256Hex(prior.bytes) === sha256Hex(file.bytes)
								)
						)
					) {
						throw new Error('local artwork changed during write');
					}
					if (temporary) {
						await rename(temporary, path);
						temporary = undefined;
					}
					const moved: string[] = [];
					for (const file of displaced) {
						if (bytes && file.path === path) continue;
						await unlink(file.path);
						moved.push(file.name);
					}
					log(`local artwork: ${bytes ? 'reconciled' : 'removed'} ${path}`);
					if (!bytes)
						return files.length
							? { status: 'removed', path, backedUp: backups.values().next().value ?? null }
							: { status: 'unchanged', path };
					return unchanged
						? { status: 'unchanged', path, moved }
						: { status: 'written', path, moved };
				} finally {
					if (temporary) await unlink(temporary).catch(() => {});
				}
			});
		} catch (error) {
			const reason = error instanceof Error ? error.message : String(error);
			log(`local artwork: skipped (${reason})`);
			return { status: 'skipped', reason };
		}
	}
	return { write: (input) => reconcile(input, false), restore: (input) => reconcile(input, true) };
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

import { mkdir, mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
	createLocalArtworkWriter,
	imageExtensionForBytes,
	mapItemPath,
	parseMediaPathMap,
	type MediaPathMapping
} from './local-artwork';

const PNG_BYTES = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4]);
const JPG_BYTES = Uint8Array.from([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4]);
const OTHER_PNG = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 9, 9, 9, 9]);

describe('parseMediaPathMap', () => {
	it('parses a single mapping', () => {
		expect(parseMediaPathMap('/data/movies:/media/movies')).toEqual([
			{ from: '/data/movies', to: '/media/movies' }
		]);
	});

	it('parses multiple mappings and strips trailing slashes', () => {
		expect(parseMediaPathMap('/data/movies/:/media/movies/; /data/tv:/media/tv')).toEqual([
			{ from: '/data/movies', to: '/media/movies' },
			{ from: '/data/tv', to: '/media/tv' }
		]);
	});

	it('skips malformed and relative entries', () => {
		expect(parseMediaPathMap('movies:/media/movies; /data/movies:media; broken; ; /a:/b')).toEqual([
			{ from: '/a', to: '/b' }
		]);
	});

	it('returns an empty list for empty input', () => {
		expect(parseMediaPathMap(undefined)).toEqual([]);
		expect(parseMediaPathMap('')).toEqual([]);
	});
});

describe('mapItemPath', () => {
	const mappings: MediaPathMapping[] = [{ from: '/data/movies', to: '/media/movies' }];

	it('maps a nested item path', () => {
		expect(mapItemPath('/data/movies/Title (2020)/Title.mkv', mappings)).toBe(
			'/media/movies/Title (2020)/Title.mkv'
		);
	});

	it('maps the root itself', () => {
		expect(mapItemPath('/data/movies', mappings)).toBe('/media/movies');
	});

	it('does not map sibling prefixes', () => {
		expect(mapItemPath('/data/movies2/x.mkv', mappings)).toBeNull();
	});

	it('returns null when nothing matches', () => {
		expect(mapItemPath('/mnt/other/x.mkv', mappings)).toBeNull();
	});
});

describe('imageExtensionForBytes', () => {
	it('detects png, jpeg, webp and gif', () => {
		expect(imageExtensionForBytes(PNG_BYTES)).toBe('png');
		expect(imageExtensionForBytes(JPG_BYTES)).toBe('jpg');
		expect(
			imageExtensionForBytes(
				Uint8Array.from([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50])
			)
		).toBe('webp');
		expect(imageExtensionForBytes(Uint8Array.from([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]))).toBe(
			'gif'
		);
	});

	it('returns null for unknown or empty input', () => {
		expect(imageExtensionForBytes(Uint8Array.from([1, 2, 3, 4]))).toBeNull();
		expect(imageExtensionForBytes(new Uint8Array())).toBeNull();
	});
});

describe('createLocalArtworkWriter', () => {
	let root: string;
	let mediaRoot: string;
	let backupRoot: string;
	const mappings: MediaPathMapping[] = [{ from: '/data/movies', to: '' }];

	beforeEach(async () => {
		root = await mkdtemp(join(tmpdir(), 'pp-local-artwork-'));
		mediaRoot = join(root, 'media', 'movies');
		backupRoot = join(root, 'backups');
		mappings[0] = { from: '/data/movies', to: mediaRoot };
	});

	afterEach(async () => {
		await rm(root, { recursive: true, force: true });
	});

	function writer() {
		return createLocalArtworkWriter({ mappings, backupRoot });
	}

	async function makeFolder(name: string): Promise<string> {
		const folder = join(mediaRoot, name);
		await mkdir(folder, { recursive: true });
		return folder;
	}

	it('refuses symlinked media directories outside the mapping', async () => {
		await makeFolder('');
		const outside = join(root, 'outside');
		await mkdir(outside);
		await symlink(outside, join(mediaRoot, 'Escape'));
		const outcome = await writer().write({
			itemPath: '/data/movies/Escape/movie.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('skipped');
		expect(await readdir(outside)).toEqual([]);
	});

	it('refuses symlink artwork without reading or moving its target', async () => {
		const folder = await makeFolder('Title');
		const outside = join(root, 'outside.jpg');
		await writeFile(outside, JPG_BYTES);
		await symlink(outside, join(folder, 'poster.jpg'));
		const outcome = await writer().write({
			itemPath: '/data/movies/Title/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('skipped');
		expect(await readFile(outside)).toEqual(Buffer.from(JPG_BYTES));
	});

	it('does not remove season artwork when writing an episode', async () => {
		const folder = await makeFolder('Show/Season 1');
		await writeFile(join(folder, 'folder.jpg'), JPG_BYTES);
		await writeFile(join(folder, 'episode-thumb.jpg'), JPG_BYTES);
		const outcome = await writer().write({
			itemPath: '/data/movies/Show/Season 1/Episode.mkv',
			itemType: 'episode',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('written');
		expect(await readFile(join(folder, 'folder.jpg'))).toEqual(Buffer.from(JPG_BYTES));
		await expect(stat(join(folder, 'episode-thumb.jpg'))).rejects.toThrow();
	});

	it('preserves shared folder artwork when writing one movie', async () => {
		const folder = await makeFolder('Mixed');
		await writeFile(join(folder, 'One.mkv'), 'video');
		await writeFile(join(folder, 'Two.mkv'), 'video');
		await writeFile(join(folder, 'poster.jpg'), JPG_BYTES);
		await writeFile(join(folder, 'one-poster.jpg'), JPG_BYTES);
		await writer().write({
			itemPath: '/data/movies/Mixed/One.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(await readFile(join(folder, 'poster.jpg'))).toEqual(Buffer.from(JPG_BYTES));
		await expect(stat(join(folder, 'one-poster.jpg'))).rejects.toThrow();
	});

	it('allows dots within a title rather than treating them as traversal', async () => {
		const folder = await makeFolder('Wait... What');
		const outcome = await writer().write({
			itemPath: '/data/movies/Wait... What',
			itemType: 'show',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('written');
		expect(await readFile(join(folder, 'folder.png'))).toEqual(Buffer.from(PNG_BYTES));
	});

	it('skips a season with parent-level artwork overrides', async () => {
		const folder = await makeFolder('Show/Season 1');
		await writeFile(join(mediaRoot, 'Show', 'season01-poster.jpg'), JPG_BYTES);
		const outcome = await writer().write({
			itemPath: '/data/movies/Show/Season 1',
			itemType: 'season',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('skipped');
		expect(await readdir(folder)).toEqual([]);
	});

	it('writes the applied bytes as folder.<ext> for dedicated movie dirs', async () => {
		const folder = await makeFolder('Title (2020)');
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('written');
		expect(await readFile(join(folder, 'folder.png'))).toEqual(Buffer.from(PNG_BYTES));
	});

	it('writes video-basename-poster.<ext> in a shared multi-video directory', async () => {
		const folder = await makeFolder('Mixed');
		// Put two video files in the same folder to simulate a shared dir
		await writeFile(join(folder, 'Title1.mkv'), 'video1');
		await writeFile(join(folder, 'Title2.mkv'), 'video2');
		const outcome = await writer().write({
			itemPath: '/data/movies/Mixed/Title1.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('written');
		// Should NOT use folder.png in a shared dir
		await expect(stat(join(folder, 'folder.png'))).rejects.toThrow();
		// Should use basename-poster
		expect(await readFile(join(folder, 'Title1-poster.png'))).toEqual(Buffer.from(PNG_BYTES));
	});

	it('writes background as video-basename-fanart.<ext> in a shared multi-video directory', async () => {
		const folder = await makeFolder('Mixed');
		await writeFile(join(folder, 'Title1.mkv'), 'video1');
		await writeFile(join(folder, 'Title2.mkv'), 'video2');
		const outcome = await writer().write({
			itemPath: '/data/movies/Mixed/Title1.mkv',
			itemType: 'movie',
			kind: 'background',
			bytes: JPG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('written');
		expect(await readFile(join(folder, 'Title1-fanart.jpg'))).toEqual(Buffer.from(JPG_BYTES));
	});

	it('writes show poster INSIDE the itemPath directory as folder.ext', async () => {
		const showDir = await makeFolder('Show (2024)');
		const outcome = await writer().write({
			itemPath: '/data/movies/Show (2024)',
			itemType: 'show',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 10
		});
		expect(outcome.status).toBe('written');
		// Show writes INSIDE the itemPath dir
		expect(await readFile(join(showDir, 'folder.png'))).toEqual(Buffer.from(PNG_BYTES));
	});

	it('writes season poster inside the itemPath directory', async () => {
		const seasonDir = await makeFolder('Season 1');
		const outcome = await writer().write({
			itemPath: '/data/movies/Season 1',
			itemType: 'season',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 11
		});
		expect(outcome.status).toBe('written');
		expect(await readFile(join(seasonDir, 'folder.png'))).toEqual(Buffer.from(PNG_BYTES));
	});

	it('writes episode poster as video-basename-thumb.<ext>', async () => {
		const folder = await makeFolder('Show');
		const seasonDir = join(folder, 'Season 1');
		await mkdir(seasonDir, { recursive: true });
		const outcome = await writer().write({
			itemPath: '/data/movies/Show/Season 1/Show - S01E01.mkv',
			itemType: 'episode',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 12
		});
		expect(outcome.status).toBe('written');
		// Episodes use thumb naming, never folder.ext
		expect(await readFile(join(seasonDir, 'Show - S01E01-thumb.png'))).toEqual(
			Buffer.from(PNG_BYTES)
		);
		await expect(stat(join(seasonDir, 'folder.png'))).rejects.toThrow();
	});

	it('skips episode background as unsupported', async () => {
		const folder = await makeFolder('Show');
		const seasonDir = join(folder, 'Season 1');
		await mkdir(seasonDir, { recursive: true });
		const outcome = await writer().write({
			itemPath: '/data/movies/Show/Season 1/Show - S01E01.mkv',
			itemType: 'episode',
			kind: 'background',
			bytes: JPG_BYTES,
			mediaItemId: 12
		});
		expect(outcome.status).toBe('skipped');
	});

	it('rejects item paths containing ".."', async () => {
		await makeFolder('Title (2020)');
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/../outside/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('skipped');
	});

	it('rejects item paths with ".." for show itemType', async () => {
		const outcome = await writer().write({
			itemPath: '/data/movies/Show (2024)/..',
			itemType: 'show',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 10
		});
		expect(outcome.status).toBe('skipped');
	});

	it('moves conflicting local poster files to the backup before writing', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.jpg'), 'old poster');
		await writeFile(join(folder, 'Title.jpg'), 'video-base poster');
		await writeFile(join(folder, 'banner.jpg'), 'unrelated');
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('written');
		if (outcome.status !== 'written') return;
		expect(outcome.moved.sort()).toEqual(['Title.jpg', 'folder.jpg']);
		expect(await readFile(join(backupRoot, '7', 'folder.jpg'), 'utf8')).toBe('old poster');
		expect(await readFile(join(backupRoot, '7', 'Title.jpg'), 'utf8')).toBe('video-base poster');
		await expect(stat(join(folder, 'banner.jpg'))).resolves.toBeTruthy();
		await expect(stat(join(folder, 'folder.jpg'))).rejects.toThrow();
	});

	it('reconciles conflict images even when the canonical target already matches', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.png'), PNG_BYTES);
		// Also put conflicting file that should be moved
		await writeFile(join(folder, 'cover.jpg'), 'conflict file');
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('unchanged');
		// Conflict file should have been moved to backup even though the target was unchanged
		await expect(stat(join(folder, 'cover.jpg'))).rejects.toThrow();
		expect(await readFile(join(backupRoot, '7', 'cover.jpg'), 'utf8')).toBe('conflict file');
	});

	it('is idempotent when the target already holds the same bytes', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.png'), PNG_BYTES);
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('unchanged');
	});

	it('preserves a replaced target copy when the bytes differ', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.png'), OTHER_PNG);
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('written');
		expect(await readFile(join(folder, 'folder.png'))).toEqual(Buffer.from(PNG_BYTES));
		expect(await readFile(join(backupRoot, '7', 'folder.png.replaced'))).toEqual(
			Buffer.from(OTHER_PNG)
		);
	});

	it('writes background artwork as fanart.<ext> and moves local backdrop files', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'backdrop.jpg'), 'old backdrop');
		await writeFile(join(folder, 'folder.jpg'), 'poster stays');
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'background',
			bytes: JPG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('written');
		if (outcome.status !== 'written') return;
		expect(outcome.moved).toEqual(['backdrop.jpg']);
		expect(await readFile(join(folder, 'fanart.jpg'))).toEqual(Buffer.from(JPG_BYTES));
		await expect(stat(join(folder, 'folder.jpg'))).resolves.toBeTruthy();
	});

	it('skips cleanly when the item path is missing, unmapped, missing on disk, or unrecognized', async () => {
		const writerInstance = writer();
		expect(
			(
				await writerInstance.write({
					itemPath: null,
					itemType: 'movie',
					kind: 'poster',
					bytes: PNG_BYTES,
					mediaItemId: 7
				})
			).status
		).toBe('skipped');
		expect(
			(
				await writerInstance.write({
					itemPath: '/elsewhere/Title (2020)/Title.mkv',
					itemType: 'movie',
					kind: 'poster',
					bytes: PNG_BYTES,
					mediaItemId: 7
				})
			).status
		).toBe('skipped');
		expect(
			(
				await writerInstance.write({
					itemPath: '/data/movies/Missing (2020)/Missing.mkv',
					itemType: 'movie',
					kind: 'poster',
					bytes: PNG_BYTES,
					mediaItemId: 7
				})
			).status
		).toBe('skipped');
		const folder = await makeFolder('Title (2020)');
		expect(
			(
				await writerInstance.write({
					itemPath: '/data/movies/Title (2020)/Title.mkv',
					itemType: 'movie',
					kind: 'poster',
					bytes: Uint8Array.from([1, 2, 3, 4]),
					mediaItemId: 7
				})
			).status
		).toBe('skipped');
		expect(await stat(folder)).toBeTruthy();
	});
});

describe('createLocalArtworkWriter restore', () => {
	let root: string;
	let mediaRoot: string;
	let backupRoot: string;
	const mappings: MediaPathMapping[] = [{ from: '/data/movies', to: '' }];

	beforeEach(async () => {
		root = await mkdtemp(join(tmpdir(), 'pp-local-artwork-'));
		mediaRoot = join(root, 'media', 'movies');
		backupRoot = join(root, 'backups');
		mappings[0] = { from: '/data/movies', to: mediaRoot };
	});

	afterEach(async () => {
		await rm(root, { recursive: true, force: true });
	});

	function writer() {
		return createLocalArtworkWriter({ mappings, backupRoot });
	}

	async function makeFolder(name: string): Promise<string> {
		const folder = join(mediaRoot, name);
		await mkdir(folder, { recursive: true });
		return folder;
	}

	it('preserves independently changed artwork at the desired extension', async () => {
		const folder = await makeFolder('Title');
		await writeFile(join(folder, 'folder.jpg'), JPG_BYTES);
		await writeFile(join(folder, 'folder.png'), OTHER_PNG);
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: PNG_BYTES,
			expectedBytes: JPG_BYTES
		});
		expect(outcome.status).toBe('skipped');
		expect(await readFile(join(folder, 'folder.png'))).toEqual(Buffer.from(OTHER_PNG));
		expect(await readFile(join(folder, 'folder.jpg'))).toEqual(Buffer.from(JPG_BYTES));
	});

	it('backs up same-extension restoration and removes matching conflicts', async () => {
		const folder = await makeFolder('Title');
		await writeFile(join(folder, 'folder.png'), OTHER_PNG);
		await writeFile(join(folder, 'poster.png'), OTHER_PNG);
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: PNG_BYTES,
			expectedBytes: OTHER_PNG
		});
		expect(outcome.status).toBe('written');
		expect(await readFile(join(backupRoot, '7', 'folder.png.replaced'))).toEqual(
			Buffer.from(OTHER_PNG)
		);
		await expect(stat(join(folder, 'poster.png'))).rejects.toThrow();
	});

	it('preserves independently changed conflicts during restoration', async () => {
		const folder = await makeFolder('Title');
		await writeFile(join(folder, 'poster.jpg'), JPG_BYTES);
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: PNG_BYTES,
			expectedBytes: OTHER_PNG
		});
		expect(outcome.status).toBe('skipped');
		expect(await readFile(join(folder, 'poster.jpg'))).toEqual(Buffer.from(JPG_BYTES));
		await expect(stat(join(folder, 'folder.png'))).rejects.toThrow();
	});

	it('writes bytes when current file matches expectedBytes (CAS)', async () => {
		const folder = await makeFolder('Title (2020)');
		// The canonical file currently holds JPG_BYTES
		await writeFile(join(folder, 'folder.jpg'), JPG_BYTES);
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: PNG_BYTES,
			expectedBytes: JPG_BYTES
		});
		expect(outcome.status).toBe('written');
		expect(await readFile(join(folder, 'folder.png'))).toEqual(Buffer.from(PNG_BYTES));
	});

	it('skips restore when current file bytes differ from expectedBytes (CAS safety)', async () => {
		const folder = await makeFolder('Title (2020)');
		// The canonical file has JPG extension (matching expectedBytes format) but
		// holds OTHER_PNG content — different from the JPG_BYTES expectedBytes value
		await writeFile(join(folder, 'folder.jpg'), OTHER_PNG);
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: PNG_BYTES,
			expectedBytes: JPG_BYTES
		});
		expect(outcome.status).toBe('skipped');
		// File should be preserved unchanged
		expect(await readFile(join(folder, 'folder.jpg'))).toEqual(Buffer.from(OTHER_PNG));
	});

	it('removes the target file when bytes is null and current matches expectedBytes', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.png'), PNG_BYTES);
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: null,
			expectedBytes: PNG_BYTES
		});
		const outcome2 = outcome as Extract<typeof outcome, { status: 'removed' }>;
		expect(outcome2.status).toBe('removed');
		await expect(stat(join(folder, 'folder.png'))).rejects.toThrow();
	});

	it('skips removal when bytes is null but current does not match expectedBytes', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.png'), OTHER_PNG);
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: null,
			expectedBytes: PNG_BYTES
		});
		expect(outcome.status).toBe('skipped');
		// File should be preserved
		expect(await readFile(join(folder, 'folder.png'))).toEqual(Buffer.from(OTHER_PNG));
	});

	it('returns unchanged when bytes is null and no target file exists', async () => {
		await makeFolder('Title (2020)');
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: null,
			expectedBytes: PNG_BYTES
		});
		expect(outcome.status).toBe('unchanged');
	});

	it('preserves unrelated images on restore removal', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.png'), PNG_BYTES);
		await writeFile(join(folder, 'banner.jpg'), 'this should stay');
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: null,
			expectedBytes: PNG_BYTES
		});
		const outcome2 = outcome as Extract<typeof outcome, { status: 'removed' }>;
		expect(outcome2.status).toBe('removed');
		await expect(stat(join(folder, 'folder.png'))).rejects.toThrow();
		expect(await readFile(join(folder, 'banner.jpg'), 'utf8')).toBe('this should stay');
	});

	it('backups the removed file on restore removal', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.png'), PNG_BYTES);
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: null,
			expectedBytes: PNG_BYTES
		});
		const outcome2 = outcome as Extract<typeof outcome, { status: 'removed' }>;
		expect(outcome2.status).toBe('removed');
		expect(typeof outcome2.backedUp).toBe('string');
		if (!outcome2.backedUp) throw new Error('Expected a backup path');
		const backedUpContent = await readFile(outcome2.backedUp);
		expect(backedUpContent).toEqual(Buffer.from(PNG_BYTES));
	});

	it('restores episode thumb even when current matches expectedBytes', async () => {
		const folder = await makeFolder('Show');
		const seasonDir = join(folder, 'Season 1');
		await mkdir(seasonDir, { recursive: true });
		const epFile = join(seasonDir, 'Show - S01E01-thumb.png');
		await writeFile(epFile, PNG_BYTES);
		const outcome = await writer().restore({
			itemPath: '/data/movies/Show/Season 1/Show - S01E01.mkv',
			itemType: 'episode',
			kind: 'poster',
			mediaItemId: 12,
			bytes: PNG_BYTES,
			expectedBytes: PNG_BYTES
		});
		expect(outcome.status).toBe('unchanged');
	});

	it('rejects item paths containing ".."', async () => {
		const outcome = await writer().restore({
			itemPath: '/data/movies/Title (2020)/../outside/Title.mkv',
			itemType: 'movie',
			kind: 'poster',
			mediaItemId: 7,
			bytes: PNG_BYTES,
			expectedBytes: PNG_BYTES
		});
		expect(outcome.status).toBe('skipped');
	});
});

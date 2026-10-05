import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
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

	it('writes the applied bytes as folder.<ext>', async () => {
		const folder = await makeFolder('Title (2020)');
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
			kind: 'poster',
			bytes: PNG_BYTES,
			mediaItemId: 7
		});
		expect(outcome.status).toBe('written');
		expect(await readFile(join(folder, 'folder.png'))).toEqual(Buffer.from(PNG_BYTES));
	});

	it('moves conflicting local poster files to the backup before writing', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.jpg'), 'old poster');
		await writeFile(join(folder, 'Title.jpg'), 'video-base poster');
		await writeFile(join(folder, 'banner.jpg'), 'unrelated');
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
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

	it('is idempotent when the target already holds the same bytes', async () => {
		const folder = await makeFolder('Title (2020)');
		await writeFile(join(folder, 'folder.png'), PNG_BYTES);
		const outcome = await writer().write({
			itemPath: '/data/movies/Title (2020)/Title.mkv',
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
					kind: 'poster',
					bytes: Uint8Array.from([1, 2, 3, 4]),
					mediaItemId: 7
				})
			).status
		).toBe('skipped');
		expect(await stat(folder)).toBeTruthy();
	});
});

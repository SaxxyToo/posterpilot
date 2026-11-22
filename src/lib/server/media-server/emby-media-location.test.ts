import { afterEach, describe, expect, it, vi } from 'vitest';
import { embyLikeProvider } from './emby';

afterEach(() => vi.unstubAllGlobals());

describe('Jellyfin local artwork location', () => {
	it.each([
		['Movie', '/media/Movie/Movie.mkv', 'movie'],
		['Series', '/media/Show', 'show'],
		['Season', '/media/Show/Season 01', 'season'],
		['Episode', '/media/Show/Season 01/Episode.mkv', 'episode']
	])('preserves the path and item type for %s', async (Type, Path, type) => {
		const fetcher = vi.fn(async (_input: RequestInfo | URL) =>
			Response.json({ Items: [{ Id: 'item-1', Type, Path }] })
		);
		vi.stubGlobal('fetch', fetcher);
		const server = embyLikeProvider('http://jellyfin.local', 'test-key', 'jellyfin');
		expect(await server.getItemMediaLocation?.('item-1')).toEqual({ path: Path, type });
		const url = new URL(fetcher.mock.calls[0]?.[0] as unknown as string);
		expect(url.pathname).toBe('/Items');
		expect(url.searchParams.get('ids')).toBe('item-1');
		expect(url.searchParams.get('Fields')).toContain('Path');
	});

	it.each([
		{ Id: 'item-1', Type: 'Season', Path: '/media/Show', LocationType: 'Virtual' },
		{ Id: 'item-1', Type: 'BoxSet', Path: '/metadata/collections/Collection' },
		{ Id: 'item-1', Type: 'Series', Path: '' },
		{ Id: 'different-item', Type: 'Movie', Path: '/media/Movie.mkv' },
		{ Id: 'item-1', Type: '__proto__', Path: '/media/Movie.mkv' },
		{ Id: 'item-1', Type: 'Movie', Path: 42 },
		{ Id: 'item-1', Type: 'Movie', Path: '/media/Movie.mkv', LocationType: 'Remote' },
		{ Id: 'item-1', Path: '/media/Movie.mkv' }
	])('refuses an unsafe or unsupported item location: %j', async (item) => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => Response.json({ Items: [item] }))
		);
		const server = embyLikeProvider('http://jellyfin.local', 'test-key', 'jellyfin');
		expect(await server.getItemMediaLocation?.('item-1')).toBeNull();
	});

	it('treats a failed location lookup as unavailable', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => new Response(null, { status: 503 }))
		);
		const server = embyLikeProvider('http://jellyfin.local', 'test-key', 'jellyfin');
		expect(await server.getItemMediaLocation?.('item-1')).toBeNull();
	});
});

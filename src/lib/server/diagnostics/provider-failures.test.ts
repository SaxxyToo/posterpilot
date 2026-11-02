import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createClient, type Client } from '@libsql/client';
import { randomUUID } from 'node:crypto';
import { rmSync } from 'node:fs';
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '$lib/server/db/schema';
import { providerDiscoveryOutcomes } from '$lib/server/db/schema';
import { listProviderDiscoveryFailures } from './provider-failures';

// The provider registry (for PROVIDER_ORDER) transitively imports the shared HTTP client
// and the real db singleton; neither is needed to exercise this query.
vi.mock('$env/dynamic/private', () => ({ env: {} }));
vi.mock('$lib/server/db', () => ({ db: {} }));

type OutcomeStatus =
	| 'succeeded'
	| 'empty'
	| 'disabled'
	| 'missing_credential'
	| 'timed_out'
	| 'failed';

let client: Client;
let database: LibSQLDatabase<typeof schema>;
let databasePath: string;
let runNumber: number;

beforeEach(async () => {
	databasePath = `/tmp/posterpilot-provider-failures-${randomUUID()}.db`;
	client = createClient({ url: `file:${databasePath}` });
	database = drizzle(client, { schema });
	await client.executeMultiple(`
		CREATE TABLE provider_discovery_outcomes (
			id integer PRIMARY KEY AUTOINCREMENT,
			run_id text NOT NULL,
			server_instance_id text NOT NULL,
			media_item_id integer NOT NULL,
			provider text NOT NULL,
			status text NOT NULL,
			candidate_count integer DEFAULT 0 NOT NULL,
			retained_stale_candidates integer DEFAULT 0 NOT NULL,
			truncated_kinds text DEFAULT '[]' NOT NULL,
			latency_ms integer,
			error_code text,
			error text,
			last_success_at integer,
			started_at integer,
			completed_at integer NOT NULL
		);
	`);
	runNumber = 0;
});

afterEach(() => {
	client?.close();
	try {
		rmSync(databasePath, { force: true });
	} catch {
		// best-effort cleanup
	}
});

async function record(
	provider: string,
	status: OutcomeStatus,
	errorCode: string | null,
	completedAt: Date,
	serverInstanceId = 'server-a'
): Promise<void> {
	runNumber += 1;
	await database.insert(providerDiscoveryOutcomes).values({
		runId: `run-${runNumber}`,
		serverInstanceId,
		mediaItemId: 1,
		provider,
		status,
		errorCode,
		completedAt
	});
}

describe('listProviderDiscoveryFailures', () => {
	it('returns the most recent failed outcome per provider, newest first', async () => {
		await record(
			'theposterdb',
			'failed',
			'theposterdb_placeholder_only',
			new Date('2026-11-01T10:00:00Z')
		);
		await record(
			'theposterdb',
			'failed',
			'theposterdb_auth_failed',
			new Date('2026-11-01T11:00:00Z')
		);
		await record('mediux', 'failed', 'mediux_blocked', new Date('2026-11-01T12:00:00Z'));

		const failures = await listProviderDiscoveryFailures(database);

		expect(failures).toEqual([
			expect.objectContaining({ provider: 'mediux', errorCode: 'mediux_blocked' }),
			expect.objectContaining({ provider: 'theposterdb', errorCode: 'theposterdb_auth_failed' })
		]);
	});

	it('omits a provider whose latest outcome succeeded', async () => {
		await record(
			'theposterdb',
			'failed',
			'theposterdb_placeholder_only',
			new Date('2026-11-01T10:00:00Z')
		);
		await record('theposterdb', 'succeeded', null, new Date('2026-11-01T11:00:00Z'));

		await expect(listProviderDiscoveryFailures(database)).resolves.toEqual([]);
	});

	it('treats a timed-out latest outcome as a failure', async () => {
		await record('fanarttv', 'timed_out', 'provider_timeout', new Date('2026-11-01T10:00:00Z'));

		const failures = await listProviderDiscoveryFailures(database);

		expect(failures).toEqual([
			expect.objectContaining({
				provider: 'fanarttv',
				status: 'timed_out',
				errorCode: 'provider_timeout'
			})
		]);
	});

	it('scopes the latest outcome to a single server instance', async () => {
		await record(
			'mediux',
			'failed',
			'mediux_blocked',
			new Date('2026-11-01T10:00:00Z'),
			'server-a'
		);
		await record('mediux', 'succeeded', null, new Date('2026-11-01T11:00:00Z'), 'server-b');

		await expect(listProviderDiscoveryFailures(database, 'server-a')).resolves.toEqual([
			expect.objectContaining({ provider: 'mediux', status: 'failed' })
		]);
		await expect(listProviderDiscoveryFailures(database, 'server-b')).resolves.toEqual([]);
	});

	it('returns nothing when no discovery has run', async () => {
		await expect(listProviderDiscoveryFailures(database)).resolves.toEqual([]);
	});
});

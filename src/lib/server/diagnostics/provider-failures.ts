import { and, desc, eq } from 'drizzle-orm';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { providerDiscoveryOutcomes } from '$lib/server/db/schema';
import type * as schema from '$lib/server/db/schema';
import { PROVIDER_ORDER } from '$lib/server/posters/providers';

/** A provider whose most recent discovery run failed to yield usable artwork. */
export interface ProviderDiscoveryFailure {
	provider: string;
	status: string;
	errorCode: string | null;
	completedAt: Date | null;
}

type Database = Pick<LibSQLDatabase<typeof schema>, 'select'>;

const FAILED_STATUSES = ['failed', 'timed_out'];

/**
 * The most recent *outcome* per configured provider, filtered to those whose latest
 * outcome failed, newest first. Using the latest outcome (not the latest failure) is
 * deliberate: a provider that failed once and has since succeeded is healthy again and
 * must not keep reporting a stale failure.
 */
export async function listProviderDiscoveryFailures(
	database: Database,
	serverInstanceId: string | null = null
): Promise<ProviderDiscoveryFailure[]> {
	const failures = await Promise.all(
		PROVIDER_ORDER.map(async (provider): Promise<ProviderDiscoveryFailure | null> => {
			const predicates = [eq(providerDiscoveryOutcomes.provider, provider)];
			if (serverInstanceId) {
				predicates.push(eq(providerDiscoveryOutcomes.serverInstanceId, serverInstanceId));
			}
			const row = (
				await database
					.select({
						provider: providerDiscoveryOutcomes.provider,
						status: providerDiscoveryOutcomes.status,
						errorCode: providerDiscoveryOutcomes.errorCode,
						completedAt: providerDiscoveryOutcomes.completedAt
					})
					.from(providerDiscoveryOutcomes)
					.where(and(...predicates))
					.orderBy(desc(providerDiscoveryOutcomes.completedAt))
					.limit(1)
			)[0];
			if (!row || !FAILED_STATUSES.includes(row.status)) return null;
			return {
				provider: row.provider,
				status: row.status,
				errorCode: row.errorCode,
				completedAt: row.completedAt
			};
		})
	);
	return failures
		.filter((row): row is ProviderDiscoveryFailure => row !== null)
		.sort((a, b) => (b.completedAt?.getTime() ?? 0) - (a.completedAt?.getTime() ?? 0));
}

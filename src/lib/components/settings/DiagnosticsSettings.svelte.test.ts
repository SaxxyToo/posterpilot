import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
// The real stylesheet, so the rendered section matches the app's markup.
import '../../../app.css';
import { tick } from 'svelte';
import DiagnosticsSettings from './DiagnosticsSettings.svelte';

/**
 * The provider discovery failure readout, in a real browser. The query behind it
 * (latest outcome per provider) is unit-tested in
 * `$lib/server/diagnostics/provider-failures.test.ts`; what only a render proves is
 * that a stored code becomes a readable, provider-labelled line rather than a raw
 * snake_case code, and that an empty history reads as healthy.
 */

type ProviderFailure = {
	provider: string;
	status: string;
	errorCode: string | null;
	completedAt: Date | null;
};

function mount(providerFailures: ProviderFailure[]) {
	render(DiagnosticsSettings, {
		initial: { latest: [], history: [], providerFailures },
		servers: [],
		locale: 'en'
	});
}

describe('diagnostics provider discovery failures', () => {
	it('names the provider and explains a placeholder-only ThePosterDB scrape', async () => {
		mount([
			{
				provider: 'theposterdb',
				status: 'failed',
				errorCode: 'theposterdb_placeholder_only',
				completedAt: new Date('2026-11-01T10:00:00Z')
			}
		]);
		await tick();

		const text = document.body.textContent ?? '';
		expect(text).toContain('Provider discovery failures');
		expect(text).toContain('ThePosterDB');
		expect(text).toContain('no usable artwork');
		// The raw code must not leak to the user — only the readable label.
		expect(text).not.toContain('theposterdb_placeholder_only');
	});

	it('reads as healthy when no provider discovery has failed', async () => {
		mount([]);
		await tick();

		expect(document.body.textContent).toContain('No provider discovery failures recorded');
	});

	it('still labels an unrecognized code instead of showing it bare', async () => {
		mount([
			{ provider: 'mediux', status: 'failed', errorCode: 'some_future_code', completedAt: null }
		]);
		await tick();

		expect(document.body.textContent).toContain('Provider failure: some_future_code');
	});
});

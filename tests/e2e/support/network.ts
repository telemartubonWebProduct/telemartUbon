import type { BrowserContext } from "@playwright/test";

/**
 * Blocks every request that leaves the site under test. The public pages load
 * the Google Ads tag and Tawk chat, which these tests do not check; waiting on
 * them made "network idle" depend on third parties, and CI must not send them
 * traffic either.
 */
export async function blockThirdParty(context: BrowserContext, baseURL: string): Promise<void> {
  const { origin } = new URL(baseURL);
  await context.route(
    (url) => (url.protocol === "http:" || url.protocol === "https:") && url.origin !== origin,
    (route) => route.abort("blockedbyclient"),
  );
}

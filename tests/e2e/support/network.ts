import type { BrowserContext, Page, Request } from "@playwright/test";

/**
 * Blocks every request that leaves the site under test. The public pages load
 * the Google Ads tag and Tawk chat, which these tests do not check; waiting on
 * them made "network idle" depend on third parties, and CI must not send them
 * traffic either.
 *
 * It also reports requests that stay unanswered for a while, so a test that
 * times out waiting for the page to load says what it was waiting for.
 */
export async function blockThirdParty(context: BrowserContext, baseURL: string): Promise<void> {
  const { origin } = new URL(baseURL);
  await context.route(
    (url) => (url.protocol === "http:" || url.protocol === "https:") && url.origin !== origin,
    (route) => route.abort("blockedbyclient"),
  );
  reportSlowRequests(context);
}

const SLOW_MS = 8_000;

function reportSlowRequests(context: BrowserContext) {
  const pending = new Map<Request, number>();
  context.on("request", (request) => pending.set(request, Date.now()));
  context.on("requestfinished", (request) => pending.delete(request));
  context.on("requestfailed", (request) => pending.delete(request));
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [request, started] of pending) {
      if (now - started < SLOW_MS) continue;
      console.log(`[slow request] ${Math.round((now - started) / 1000)}s ${request.resourceType()} ${request.method()} ${request.url()}`);
      pending.delete(request);
    }
  }, 2_000);
  timer.unref();
  context.on("close", () => clearInterval(timer));
}

/**
 * Lets the page's requests finish before a test closes it. The image
 * optimizer of `next start` (Next 16.3.7) hands the visitor's socket to its
 * internal fetch of the source file: when the first request for an image is
 * cut off within milliseconds, that fetch never ends, and every later request
 * for the same image waits on it until the server restarts. Tests that close
 * pages with lazy images still starting would leave such images behind for
 * the tests after them.
 */
export async function settle(page: Page): Promise<void> {
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => undefined);
}

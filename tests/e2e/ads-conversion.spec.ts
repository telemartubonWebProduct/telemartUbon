import { expect, test, type Page } from "@playwright/test";

import { content } from "@/lib/content";

import { blockThirdParty, settle } from "./support/network";

// The home page reports one Google Ads conversion each time it opens, as the
// old site did (commit 9b768a6). Requests to Google are blocked here, so the
// calls are read from the tag's queue (window.dataLayer) that gtag.js sends.
// The editor and its preview are covered in admin-editor.spec.ts.

const { googleAdsId, googleAdsHomeConversion } = content.site.integrations;

test.beforeEach(async ({ context, baseURL }) => {
  await blockThirdParty(context, baseURL!);
});

test.afterEach(async ({ page }) => {
  await settle(page);
});

/** Every gtag() call queued on the page, in order. */
function gtagCalls(page: Page): Promise<unknown[][]> {
  return page.evaluate(() => {
    const queue = (window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer ?? [];
    return Array.from(queue, (entry) => Array.from(entry));
  });
}

async function conversions(page: Page) {
  return (await gtagCalls(page)).filter(([command, name]) => command === "event" && name === "conversion");
}

/** Waits until the tag is configured and the page has stopped loading. */
async function tagConfigured(page: Page) {
  await expect.poll(async () => (await gtagCalls(page)).some(([command, id]) => command === "config" && id === googleAdsId)).toBe(true);
  await settle(page);
}

for (const path of ["/", "/en"]) {
  test(`opening ${path} reports one conversion, after the tag is configured`, async ({ page }) => {
    await page.goto(path);
    await tagConfigured(page);
    const calls = await gtagCalls(page);
    expect(await conversions(page)).toEqual([["event", "conversion", { send_to: googleAdsHomeConversion, value: 1, currency: "THB" }]]);
    const configAt = calls.findIndex(([command]) => command === "config");
    const conversionAt = calls.findIndex(([command, name]) => command === "event" && name === "conversion");
    expect(conversionAt).toBeGreaterThan(configAt);

    // A reload opens the page again.
    await page.reload();
    await tagConfigured(page);
    expect(await conversions(page)).toHaveLength(1);
  });
}

test("other pages report none, and going home from them counts once", async ({ page }) => {
  for (const path of ["/broadband", "/en/monthy", "/wEnergy"]) {
    await page.goto(path);
    await tagConfigured(page);
    expect(await conversions(page), path).toEqual([]);
  }

  // The logo goes home without reloading the document (client-side navigation).
  await page.goto("/broadband");
  await tagConfigured(page);
  await page.getByRole("banner").getByRole("link").first().click();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(async () => (await conversions(page)).length).toBe(1);
  await settle(page);
  expect(await conversions(page)).toHaveLength(1);
});

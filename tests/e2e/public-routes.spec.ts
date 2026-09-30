import { expect, test, type Page } from "@playwright/test";

import { localizePath, locales } from "@/lib/i18n/locales";

// Every public URL of the current site must keep working through the
// renovation (docs/renovation/CURRENT-SITE-AUDIT.md, PLAN.md). Thai stays at
// these URLs; English serves the same paths under /en.
const publicPaths = [
  "/",
  "/broadband",
  "/broadband-old",
  "/monthy",
  "/topup",
  "/wEnergy",
  "/service",
  "/wifiService",
  "/termsAndPrivacy",
];

function trackFailures(page: Page, origin: string) {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(`page error: ${error.message}`));
  page.on("response", (response) => {
    if (response.url().startsWith(origin) && response.status() >= 400) {
      failures.push(`${response.status()} ${decodeURIComponent(response.url())}`);
    }
  });
  return failures;
}

for (const path of publicPaths) {
  test(`${path} renders in Thai without errors or broken local assets`, async ({ page, baseURL }) => {
    const failures = trackFailures(page, baseURL!);

    const response = await page.goto(path, { waitUntil: "load" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "th");
    await expect(page.locator("body")).toBeVisible();

    // Lazy images below the fold only load once scrolled into view.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    });
    await page.waitForLoadState("networkidle");

    expect(failures).toEqual([]);
  });
}

// Until the redesigned pages land, /en serves the legacy Thai pages, whose
// links point at the Thai URLs; only the routing itself is checked here.
test("every public path is also served in English under /en", async ({ request }) => {
  for (const path of publicPaths) {
    const url = localizePath(path, "en");
    const response = await request.get(url);
    expect(response.status(), url).toBe(200);
    expect(await response.text(), url).toContain('<html lang="en"');
  }
  expect(locales).toEqual(["th", "en"]);
});

test("old and duplicate URLs redirect permanently", async ({ request }) => {
  const redirects: [string, string][] = [
    ["/SoonContent", "/"],
    ["/en/SoonContent", "/en"],
    ["/th", "/"],
    ["/th/broadband", "/broadband"],
  ];
  for (const [from, to] of redirects) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status(), from).toBe(308);
    expect(new URL(response.headers().location, "http://x").pathname, from).toBe(to);
  }
});

test("unknown URLs get a real 404 page in both languages", async ({ page }) => {
  for (const url of ["/no-such-page", "/en/no-such-page"]) {
    const response = await page.goto(url);
    expect(response?.status(), url).toBe(404);
    await expect(page.getByRole("heading", { name: "ไม่พบหน้านี้" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
});

test("home carousels initialise with the upgraded Swiper", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".swiper-initialized").first()).toBeVisible();
});

import { expect, test, type Page } from "@playwright/test";

// Every public URL of the current site must keep working through the
// renovation (docs/renovation/CURRENT-SITE-AUDIT.md, PLAN.md).
const legacyRoutes = [
  "/",
  "/broadband",
  "/broadband-old",
  "/monthy",
  "/topup",
  "/wEnergy",
  "/service",
  "/wifiService",
  "/termsAndPrivacy",
  "/SoonContent",
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

for (const route of legacyRoutes) {
  test(`legacy route ${route} renders without errors or broken local assets`, async ({ page, baseURL }) => {
    const failures = trackFailures(page, baseURL!);

    const response = await page.goto(route, { waitUntil: "load" });
    expect(response?.status()).toBe(200);
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

test("home carousels initialise with the upgraded Swiper", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".swiper-initialized").first()).toBeVisible();
});

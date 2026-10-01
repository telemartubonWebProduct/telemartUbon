import { expect, test, type Page } from "@playwright/test";

import { blockThirdParty } from "./support/network";

// The router of the home page's equipment section shows its poster first and
// swaps in the 3D model only where it can run (docs/renovation/3D-MEDIA-PLAN.md).

test.beforeEach(async ({ context, baseURL }) => {
  await blockThirdParty(context, baseURL!);
});

const stage = (page: Page) => page.locator("[data-router-stage]");

async function supportsWebGL2(page: Page) {
  return page.evaluate(() => Boolean(document.createElement("canvas").getContext("webgl2")));
}

test("the 3D router replaces the poster where WebGL2 runs, without covering the calls to action", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("img", { name: /ภาพประกอบเราเตอร์ Wi-Fi/ })).toBeAttached();
  await stage(page).scrollIntoViewIfNeeded();

  if (await supportsWebGL2(page)) {
    await expect(stage(page)).toHaveAttribute("data-router-stage", "ready", { timeout: 30_000 });
    await expect(stage(page).locator("canvas")).toBeVisible();
  } else {
    await page.waitForTimeout(3_000);
    await expect(stage(page)).toHaveAttribute("data-router-stage", "poster");
  }

  // Whatever the visual does, the primary call to action stays on top and clickable.
  await page.evaluate(() => window.scrollTo(0, 0));
  const covered = await page.evaluate(() => {
    const cta = document.querySelector<HTMLElement>('[data-cta="hero-broadband"]')!;
    const box = cta.getBoundingClientRect();
    return document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)?.closest("[data-cta]") !== cta;
  });
  expect(covered).toBe(false);
});

test("reduced motion keeps the poster and never loads the 3D model", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await stage(page).scrollIntoViewIfNeeded();
  await page.waitForTimeout(3_000);
  await expect(stage(page)).toHaveAttribute("data-router-stage", "poster");
  await expect(stage(page).locator("canvas")).toHaveCount(0);
  await expect(page.getByRole("img", { name: /ภาพประกอบเราเตอร์ Wi-Fi/ })).toBeVisible();
});

test("without WebGL the poster stays", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
      if (type.startsWith("webgl")) return null;
      return (original as (...args: unknown[]) => RenderingContext | null).call(this, type, ...rest);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto("/");
  await stage(page).scrollIntoViewIfNeeded();
  await page.waitForTimeout(3_000);
  await expect(stage(page)).toHaveAttribute("data-router-stage", "poster");
  await expect(stage(page).locator("canvas")).toHaveCount(0);
});

test("the model stops rendering when its section leaves the screen", async ({ page }) => {
  await page.goto("/");
  await stage(page).scrollIntoViewIfNeeded();
  test.skip(!(await supportsWebGL2(page)), "no WebGL2 in this browser");
  await expect(stage(page)).toHaveAttribute("data-router-stage", "ready", { timeout: 30_000 });
  await expect(stage(page)).toHaveAttribute("data-active", "true");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(stage(page)).toHaveAttribute("data-active", "false");
});

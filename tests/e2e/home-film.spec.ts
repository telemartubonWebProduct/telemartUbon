import { expect, test, type Page } from "@playwright/test";

import { content } from "@/lib/content";
import { blockThirdParty } from "./support/network";

// The home film (docs/renovation/R1-HOME-FILM.md): it plays as visitors scroll,
// one beat of words at a time, with the calls to action always on screen.
// Reduced motion, no JavaScript and the editor get the same beats as panels.

const beats = content.pages.home.hero.beats;

test.beforeEach(async ({ context, baseURL }) => {
  await blockThirdParty(context, baseURL!);
});

/** Scrolls to a point of the film (0 top, 1 last frame) and waits for the film to catch up. */
async function scrollFilm(page: Page, progress: number) {
  await page.evaluate((p) => {
    const track = document.querySelector<HTMLElement>(".tm-film-track")!;
    const rect = track.getBoundingClientRect();
    window.scrollTo(0, window.scrollY + rect.top + p * (rect.height - window.innerHeight));
  }, progress);
  await expect
    .poll(() => page.evaluate(() => Number(document.querySelector<HTMLElement>(".tm-film-stage")!.style.getPropertyValue("--p"))), { timeout: 5_000 })
    .toBeCloseTo(progress, 2);
}

/** Opacity of each beat's words, as the visitor sees them. */
function beatOpacities(page: Page) {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>(".tm-film-beat .tm-film-copy"), (copy) => Number(getComputedStyle(copy).opacity)),
  );
}

const rawFrame = (url: string) => /\/media\/film\/.+\/\d{4}\.(avif|webp)$/.test(new URL(url).pathname);

test("plays the film as visitors scroll, one beat of words at a time", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".tm-film")).toHaveAttribute("data-film-live", "");
  await expect(page.locator(".tm-film-canvas")).toHaveAttribute("data-ready", "", { timeout: 20_000 });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(beats[0].heading.th);

  expect(await beatOpacities(page)).toEqual([1, 0, 0]);
  await scrollFilm(page, 0.5);
  expect(await beatOpacities(page)).toEqual([0, 1, 0]);
  await expect(page.locator(".tm-film-stage")).toHaveAttribute("data-text", beats[1].textColor);
  await expect(page.locator("[data-film-scene='1']")).toHaveAttribute("aria-current", "step");
  await scrollFilm(page, 1);
  expect(await beatOpacities(page)).toEqual([0, 0, 1]);

  // Between two beats the screen never shows both.
  for (const progress of [0.29, 0.31, 0.68, 0.7]) {
    await scrollFilm(page, progress);
    expect((await beatOpacities(page)).filter((opacity) => opacity > 0).length, `at ${progress}`).toBeLessThanOrEqual(1);
  }
});

test("keeps the calls to action on screen and clickable for the whole film", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".tm-film")).toHaveAttribute("data-film-live", "");
  for (const progress of [0, 0.3, 0.5, 0.8, 1]) {
    await scrollFilm(page, progress);
    const reachable = await page.evaluate(() => {
      const cta = document.querySelector<HTMLElement>('[data-cta="hero-broadband"]')!;
      const box = cta.getBoundingClientRect();
      const inView = box.top >= 0 && box.bottom <= window.innerHeight;
      return inView && document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)?.closest("[data-cta]") === cta;
    });
    expect(reachable, `at ${progress}`).toBe(true);
  }
});

test("scene links and the skip link move through the film", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".tm-film")).toHaveAttribute("data-film-live", "");
  await page.locator(`[data-film-scene='${beats.length - 1}']`).click();
  await expect.poll(() => beatOpacities(page).then((opacities) => opacities.at(-1)), { timeout: 5_000 }).toBe(1);
  await page.locator(".tm-film-skip").click();
  await expect(page.locator("#featured-heading")).toBeInViewport();
});

test("phones get the portrait frames", async ({ page, isMobile }) => {
  test.skip(!isMobile, "portrait screens only");
  const frames: string[] = [];
  page.on("request", (request) => {
    if (rawFrame(request.url())) frames.push(new URL(request.url()).pathname);
  });
  await page.goto("/");
  await expect(page.locator(".tm-film-canvas")).toHaveAttribute("data-ready", "", { timeout: 20_000 });
  expect(frames.length).toBeGreaterThan(0);
  expect(frames.every((frame) => frame.includes("/portrait/"))).toBe(true);
});

test("reduced motion shows the beats as panels over stills and loads no frames", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const frames: string[] = [];
  page.on("request", (request) => {
    if (rawFrame(request.url())) frames.push(request.url());
  });
  await page.goto("/");
  await page.waitForTimeout(3_000);
  await expect(page.locator(".tm-film")).not.toHaveAttribute("data-film-live", "");
  for (const beat of beats) {
    const heading = page.getByRole("heading", { name: beat.heading.th });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeInViewport();
  }
  expect(frames).toEqual([]);
});

test("the page before and after the film starts is the same height, so nothing jumps", async ({ page, browser }) => {
  const height = (target: Page) =>
    target.evaluate(() => ({ track: document.querySelector<HTMLElement>(".tm-film-track")!.getBoundingClientRect().height, screen: window.innerHeight }));
  await page.goto("/");
  await expect(page.locator(".tm-film")).toHaveAttribute("data-film-live", "");
  const film = await height(page);
  // Without JavaScript the server's stack of panels stays: what visitors see before the film starts.
  const before = await browser.newContext({ javaScriptEnabled: false, viewport: page.viewportSize()! });
  const beforePage = await before.newPage();
  await beforePage.goto(page.url());
  const stack = await height(beforePage);
  await before.close();
  expect(film.track).toBeCloseTo(beats.length * 1.5 * film.screen, 0);
  expect(stack.track).toBeCloseTo(film.track, 0);
});

test("Save-Data loads only the stills", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", { value: { saveData: true, effectiveType: "4g" }, configurable: true });
  });
  const frames = new Set<string>();
  page.on("request", (request) => {
    if (rawFrame(request.url())) frames.add(new URL(request.url()).pathname);
  });
  await page.goto("/");
  await expect(page.locator(".tm-film-canvas")).toHaveAttribute("data-ready", "", { timeout: 20_000 });
  await page.waitForTimeout(3_000);
  expect(frames.size).toBe(beats.length);
});

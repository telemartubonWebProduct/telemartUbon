import { expect, test, type Page } from "@playwright/test";

import { content, packageById } from "@/lib/content";
import { packageSectionIn } from "@/lib/content/lookup";
import { formatNumber } from "@/lib/content/render";

import { blockThirdParty, settle } from "./support/network";

// The home page's recommended packages (docs/renovation/R2-HOME-PROMOS.md):
// a tab per category, a row of picture cards in each, with prices and terms
// straight from the catalog.

const { tabs } = content.pages.home.promos;

test.beforeEach(async ({ context, baseURL }) => {
  await blockThirdParty(context, baseURL!);
});

test.afterEach(async ({ page }) => {
  await settle(page);
});

const section = (page: Page) => page.locator("section.tm-promos");
const panel = (page: Page, id: string) => section(page).locator(`[data-panel="${id}"]`);
const cards = (page: Page, id: string) => panel(page, id).locator("[data-package]");

test("opens on home internet, and each tab shows its own cards", async ({ page }) => {
  await page.goto("/");
  const tablist = section(page).getByRole("tablist", { name: content.pages.home.promos.heading.th });
  await expect(tablist.getByRole("tab")).toHaveText(tabs.map((tab) => tab.title.th));
  await expect(tablist.getByRole("tab").first()).toHaveAttribute("aria-selected", "true");

  for (const tab of tabs) {
    await tablist.getByRole("tab", { name: tab.title.th }).click();
    await expect(tablist.getByRole("tab", { name: tab.title.th })).toHaveAttribute("aria-selected", "true");
    await expect(section(page).getByRole("tabpanel")).toHaveCount(1);
    await expect(panel(page, tab.id)).toBeVisible();
    await expect(cards(page, tab.id)).toHaveCount(tab.items.length);
    expect(await cards(page, tab.id).evaluateAll((items) => items.map((item) => (item as HTMLElement).dataset.package))).toEqual(
      tab.items.map((card) => card.packageId),
    );
  }
});

test("arrow keys, Home and End move between tabs", async ({ page }) => {
  await page.goto("/");
  const tab = (index: number) => section(page).getByRole("tab").nth(index);
  await tab(0).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tab(1)).toBeFocused();
  await expect(tab(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(tab(tabs.length - 1)).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(tab(0)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowLeft");
  await expect(tab(tabs.length - 1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Home");
  await expect(tab(0)).toBeFocused();
  // Only the open tab is in the tab order.
  expect(await section(page).getByRole("tab").evaluateAll((items) => items.map((item) => item.getAttribute("tabindex")))).toEqual(
    tabs.map((_, index) => (index === 0 ? "0" : "-1")),
  );
});

test("cards show the catalog's name, price and terms, and link to the package's section", async ({ page }) => {
  await page.goto("/");
  for (const tab of tabs) {
    await section(page).getByRole("tab", { name: tab.title.th }).click();
    for (const card of tab.items) {
      const item = packageById(card.packageId);
      const element = panel(page, tab.id).locator(`[data-package="${item.id}"]`);
      await expect(element.getByRole("heading", { level: 3 })).toHaveText(item.name.th);
      await expect(element).toContainText(formatNumber(item.price.amount, "th"));
      const term = item.contract ?? item.validity;
      if (term) await expect(element).toContainText(term.th);
      const target = packageSectionIn(content, item)!;
      await expect(element.getByRole("link", { name: /ดูรายละเอียด/ })).toHaveAttribute("href", `${target.path}#${target.hash}`);
    }
  }
});

test("the buttons scroll the row of cards and switch off at either end", async ({ page, isMobile }) => {
  test.skip(isMobile, "phones swipe the row; the buttons show from tablet width");
  await page.goto("/");
  const rail = panel(page, tabs[0].id).locator("[data-rail]");
  const previous = section(page).getByRole("button", { name: content.site.ui.scrollPrevious.th });
  const next = section(page).getByRole("button", { name: content.site.ui.scrollNext.th });
  await expect(previous).toBeDisabled();
  await next.click();
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  await expect(previous).toBeEnabled();
  await rail.evaluate((element) => element.scrollTo({ left: element.scrollWidth }));
  await expect(next).toBeDisabled();
});

test("without JavaScript every tab's cards show under its title", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, locale: "th-TH" });
  await blockThirdParty(context, baseURL!);
  const page = await context.newPage();
  await page.goto("/");
  await expect(section(page).getByRole("tablist")).toBeHidden();
  for (const tab of tabs) {
    await expect(panel(page, tab.id).getByRole("heading", { level: 3, name: tab.title.th, exact: true })).toBeVisible();
    await expect(cards(page, tab.id).first()).toBeVisible();
  }
  await settle(page);
  await context.close();
});

test("the English page has the same tabs and cards in English", async ({ page }) => {
  await page.goto("/en");
  await expect(section(page).getByRole("tab")).toHaveText(tabs.map((tab) => tab.title.en));
  const first = packageById(tabs[0].items[0].packageId);
  await expect(panel(page, tabs[0].id).locator(`[data-package="${first.id}"]`).getByRole("heading", { level: 3 })).toHaveText(first.name.en);
  await expect(panel(page, tabs[0].id).getByRole("link", { name: /See details/ }).first()).toHaveAttribute("href", /^\/en\/broadband#/);
});

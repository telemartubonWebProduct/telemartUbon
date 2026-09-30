import { expect, test, type Browser, type FrameLocator, type Page } from "@playwright/test";

import { content } from "@/lib/content";

import {
  createConfirmedUser,
  deleteUsers,
  localStackConfigured,
  localStackSkipReason,
  serviceClient,
  setMembership,
  type TestUser,
} from "./support/local-supabase";

// M3 acceptance for the Mirror editor, against the local Supabase stack:
// edits show in the preview at once and autosave as drafts, drafts survive a
// reload and never reach the public site, concurrent edits are caught,
// invalid values are not saved, and only active Admins get in. Desktop
// project only; the phone preview is checked inside the editor.

test.skip(!localStackConfigured, localStackSkipReason);
test.describe.configure({ mode: "serial" });

let admin: TestUser;
let member: TestUser;
const createdUserIds: string[] = [];
const documents = ["page:home", "page:contact"];
const publishedHeading = content.pages.home.hero.heading;

async function clearDrafts() {
  const { error } = await serviceClient().from("content_drafts").delete().in("document_id", documents);
  if (error) throw error;
}

async function storedDraft(documentId: string) {
  const { data, error } = await serviceClient().from("content_drafts").select("body, revision").eq("document_id", documentId).maybeSingle();
  if (error) throw error;
  return data as { body: { hero?: { heading?: { th: string; en: string } } }; revision: number } | null;
}

test.beforeAll(async () => {
  admin = await createConfirmedUser("editor");
  member = await createConfirmedUser("editor-member");
  createdUserIds.push(admin.id, member.id);
  await setMembership(admin.id, "active");
  await clearDrafts();
});

test.afterAll(async () => {
  await clearDrafts();
  await deleteUsers(createdUserIds);
});

async function signIn(page: Page, user: TestUser, next = "/admin/editor") {
  await page.goto(`/admin/login?next=${encodeURIComponent(next)}`);
  await page.getByLabel("อีเมล").fill(user.email);
  await page.getByLabel("รหัสผ่าน").fill(user.password);
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await page.waitForURL((url) => url.pathname !== "/admin/login");
}

function preview(page: Page): FrameLocator {
  return page.frameLocator('iframe[title^="ตัวอย่างหน้า"]');
}

async function openEditor(page: Page, path = "/admin/editor") {
  await page.goto(path);
  await expect(preview(page).locator("h1").first()).toBeVisible();
  // The preview has received the working content once the panel reflects the page.
  await expect(page.getByRole("button", { name: /ส่วนเปิดหน้า/ })).toBeVisible();
}

const saveStatus = (page: Page) => page.locator("[data-save-status]");

async function editorSession(browser: Browser) {
  const context = await browser.newContext({ locale: "th-TH", viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await signIn(page, admin);
  await expect(page).toHaveURL(/\/admin\/editor(\?|$)/);
  await expect(preview(page).locator("h1").first()).toBeVisible();
  return { context, page };
}

test("only active Admins reach the editor and its preview", async ({ page }) => {
  await page.goto("/admin/editor");
  await expect(page).toHaveURL(/\/admin\/login\?next=%2Fadmin%2Feditor$/);
  await page.goto("/admin/preview/th/home");
  await expect(page).toHaveURL(/\/admin\/login\?next=%2Fadmin%2Fpreview%2Fth%2Fhome$/);

  await signIn(page, member);
  await expect(page).toHaveURL(/\/admin\/denied$/);
  await page.goto("/admin/preview/th/home");
  await expect(page).toHaveURL(/\/admin\/denied$/);
  await page.goto("/admin/editor");
  await expect(page).toHaveURL(/\/admin\/denied$/);
});

test("an edit shows in the preview at once, autosaves, survives a reload and stays off the public site", async ({ page, request }) => {
  await signIn(page, admin);
  await openEditor(page);
  const frame = preview(page);
  const marker = `หัวเรื่องร่าง ${Date.now()}`;

  await frame.locator("h1").first().click();
  const thai = page.getByRole("textbox", { name: "หัวเรื่อง ไทย" });
  await expect(thai).toBeFocused();
  await thai.fill(marker);
  await expect(frame.locator("h1").first()).toHaveText(marker);
  await expect(saveStatus(page)).toHaveAttribute("data-save-status", "saved");
  expect((await storedDraft("page:home"))?.body.hero?.heading?.th).toBe(marker);

  await page.reload();
  await expect(preview(page).locator("h1").first()).toHaveText(marker);

  // Visitors get the published page: no draft text, no editor markup.
  for (const path of ["/", "/en"]) {
    const html = await (await request.get(path)).text();
    expect(html).not.toContain(marker);
    expect(html).not.toContain("data-edit");
  }
  const previewResponse = await page.request.get("/admin/preview/th/home");
  expect(previewResponse.headers()["cache-control"]).toContain("no-store");
  expect(previewResponse.headers()["x-robots-tag"]).toContain("noindex");
});

test("a value the schema rejects is flagged and not saved", async ({ page }) => {
  await signIn(page, admin);
  await openEditor(page);
  const before = await storedDraft("page:home");

  await preview(page).locator("h1").first().click();
  await page.getByRole("textbox", { name: "หัวเรื่อง English" }).fill("");
  await expect(saveStatus(page)).toHaveAttribute("data-save-status", "invalid");
  await expect(page.getByText("ต้องกรอกข้อความ")).toBeVisible();
  expect(await storedDraft("page:home")).toEqual(before);

  await page.getByRole("textbox", { name: "หัวเรื่อง English" }).fill(publishedHeading.en);
  await expect(saveStatus(page)).toHaveAttribute("data-save-status", "saved");
});

test("a save from another session is caught as a conflict instead of being overwritten", async ({ browser }) => {
  const first = await editorSession(browser);
  const second = await editorSession(browser);
  const theirs = `ฉบับของผู้ดูแลคนแรก ${Date.now()}`;

  await preview(first.page).locator("h1").first().click();
  await first.page.getByRole("textbox", { name: "หัวเรื่อง ไทย" }).fill(theirs);
  await expect(saveStatus(first.page)).toHaveAttribute("data-save-status", "saved");

  await preview(second.page).locator("h1").first().click();
  await second.page.getByRole("textbox", { name: "หัวเรื่อง ไทย" }).fill("ฉบับที่สอง ซึ่งเปิดไว้ก่อนหน้า");
  await expect(saveStatus(second.page)).toHaveAttribute("data-save-status", "conflict");
  await expect(second.page.getByRole("alert").filter({ hasText: "ผู้ดูแลอีกคนบันทึกเอกสารนี้" })).toBeVisible();
  expect((await storedDraft("page:home"))?.body.hero?.heading?.th).toBe(theirs);

  await second.page.getByRole("button", { name: "ใช้ฉบับล่าสุดในระบบ (ทิ้งที่ฉันแก้)" }).click();
  await expect(second.page.getByRole("textbox", { name: "หัวเรื่อง ไทย" })).toHaveValue(theirs);
  await expect(preview(second.page).locator("h1").first()).toHaveText(theirs);
  await expect(saveStatus(second.page)).not.toHaveAttribute("data-save-status", "conflict");

  await first.context.close();
  await second.context.close();
});

test("discarding a draft brings back the published page", async ({ page }) => {
  await signIn(page, admin);
  await openEditor(page);
  expect(await storedDraft("page:home")).not.toBeNull();

  await page.getByRole("button", { name: "ทิ้งร่างของเอกสารนี้" }).click();
  await page.getByRole("button", { name: "ทิ้งร่าง", exact: true }).click();
  await expect(preview(page).locator("h1").first()).toHaveText(publishedHeading.th);
  await expect.poll(() => storedDraft("page:home")).toBeNull();
});

test("viewing follows links inside the site and never leaves it", async ({ page }) => {
  await signIn(page, admin);
  await openEditor(page);
  const frame = preview(page);

  await page.getByRole("button", { name: "ดูหน้าเว็บ" }).click();
  await frame.getByRole("banner").getByRole("link", { name: "ติดต่อเรา" }).click();
  await expect(page).toHaveURL(/page=contact/);
  await expect(page.getByRole("combobox", { name: "หน้า" })).toHaveValue("contact");
  await expect(frame.locator("h1").first()).toHaveText(content.pages.contact.hero.heading.th);

  await frame.getByRole("link", { name: /แชตทาง LINE/ }).first().click();
  await expect(page.getByRole("status").filter({ hasText: "หน้าตัวอย่างไม่เปิดลิงก์ออกนอกเว็บ" })).toBeVisible();
  expect(page.frames().some((entry) => entry.url().startsWith("https://lin.ee"))).toBe(false);
});

test("the preview renders the phone layout at phone width", async ({ page }) => {
  await signIn(page, admin);
  await openEditor(page);
  await page.getByRole("button", { name: "มือถือ", exact: true }).click();
  const frameElement = page.locator('iframe[title^="ตัวอย่างหน้า"]');
  await expect(frameElement).toHaveCSS("width", "390px");
  const frame = preview(page);
  await expect(frame.getByRole("button", { name: "เมนู" })).toBeVisible();
  await expect(frame.getByRole("navigation", { name: "เมนูหลัก" }).first()).toBeHidden();
});

test("the preview is the public page, pixel for pixel", async ({ browser }) => {
  // Reduced motion keeps the 3D hero on its poster in both, so the shots are stable.
  const context = await browser.newContext({ locale: "th-TH", viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  await context.route(/googletagmanager|tawk\.to/, (route) => route.abort());
  const page = await context.newPage();
  await signIn(page, admin, "/admin");
  await expect(page).toHaveURL(/\/admin$/);

  const shot = async (path: string) => {
    await page.goto(path);
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      window.scrollTo(0, 0);
      await Promise.all(Array.from(document.images, (image) => (image.complete ? null : new Promise((resolve) => (image.onload = image.onerror = resolve)))));
    });
    return (await page.screenshot({ fullPage: true, animations: "disabled" })).toString("base64");
  };
  const pairs = [
    ["/", "/admin/preview/th/home"],
    ["/en/broadband", "/admin/preview/en/broadband-new"],
    ["/wifiService", "/admin/preview/th/apply-with-agent"],
  ] as const;
  for (const [publicPath, previewPath] of pairs) {
    const publicShot = await shot(publicPath);
    const previewShot = await shot(previewPath);
    expect(await pixelDifference(page, publicShot, previewShot), `${previewPath} against ${publicPath}`).toBeLessThan(0.001);
  }
  await context.close();
});

/** Share of pixels that differ between two PNG screenshots (1 when the sizes differ). */
async function pixelDifference(page: Page, publicShot: string, previewShot: string): Promise<number> {
  return page.evaluate(
    async ([a, b]) => {
      const load = (src: string) =>
        new Promise<HTMLImageElement>((resolve) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.src = `data:image/png;base64,${src}`;
        });
      const [left, right] = await Promise.all([load(a), load(b)]);
      if (left.width !== right.width || left.height !== right.height) return 1;
      const canvas = document.createElement("canvas");
      canvas.width = left.width;
      canvas.height = left.height;
      const context2d = canvas.getContext("2d")!;
      context2d.drawImage(left, 0, 0);
      const pixelsA = context2d.getImageData(0, 0, canvas.width, canvas.height).data;
      context2d.drawImage(right, 0, 0);
      const pixelsB = context2d.getImageData(0, 0, canvas.width, canvas.height).data;
      let changed = 0;
      for (let index = 0; index < pixelsA.length; index += 4) {
        if (Math.abs(pixelsA[index] - pixelsB[index]) + Math.abs(pixelsA[index + 1] - pixelsB[index + 1]) + Math.abs(pixelsA[index + 2] - pixelsB[index + 2]) > 30) changed += 1;
      }
      return changed / (pixelsA.length / 4);
    },
    [publicShot, previewShot],
  );
}

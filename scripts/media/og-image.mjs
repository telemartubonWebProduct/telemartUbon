// Renders public/media/og-image.png (1200x630), the picture social apps show
// when a page is shared: the Telemart logo and the concept router, no text, so
// it suits both languages. Needs the Playwright Chromium used by the e2e tests.
//
// Usage: node scripts/media/og-image.mjs  (PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH optional)
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dataUri = (file, type) => `data:${type};base64,${readFileSync(path.join(root, "public", file)).toString("base64")}`;

const html = `<!doctype html><html><body style="margin:0">
<div style="position:relative;width:1200px;height:630px;background:#fff;overflow:hidden">
  <img src="${dataUri("logo.webp", "image/webp")}" style="position:absolute;left:72px;top:64px;height:72px">
  <div style="position:absolute;left:72px;top:176px;width:120px;height:4px;background:#e60012"></div>
  <img src="${dataUri("media/router-concept.svg", "image/svg+xml")}" style="position:absolute;right:40px;bottom:36px;width:800px">
</div></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.screenshot({ path: path.join(root, "public/media/og-image.png") });
await browser.close();
console.log("public/media/og-image.png written");

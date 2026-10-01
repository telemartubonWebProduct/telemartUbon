// Draws the home film's stand-in frames (scene in film-placeholder/scene.js)
// and writes them as AVIF to public/media/film/home-placeholder/{landscape,portrait}.
// The footage briefed for Google Flow replaces it through film-frames.mjs
// (docs/renovation/R1-HOME-FILM.md). Needs the Playwright Chromium of the e2e
// tests; sharp comes with Next.
//
// Usage:
//   node scripts/media/film-placeholder.mjs                 all frames
//   node scripts/media/film-placeholder.mjs --preview DIR   six PNG stills per orientation into DIR
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { chromium } from "@playwright/test";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { values } = parseArgs({ options: { preview: { type: "string" }, frames: { type: "string", default: "120" } } });
const frames = Number(values.frames);

const variants = [
  { name: "landscape", width: 1600, height: 900 },
  { name: "portrait", width: 720, height: 1280 },
];

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
const page = await browser.newPage();
await page.setContent("<!doctype html><canvas></canvas>");
await page.addScriptTag({ path: path.join(root, "scripts/media/film-placeholder/scene.js") });

async function draw(variant, t) {
  const dataUrl = await page.evaluate(
    ({ width, height, t: progress }) => {
      const canvas = document.querySelector("canvas");
      canvas.width = width;
      canvas.height = height;
      window.TelemartFilm.render(canvas, progress);
      return canvas.toDataURL("image/png");
    },
    { width: variant.width, height: variant.height, t },
  );
  return Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64");
}

let total = 0;
for (const variant of variants) {
  if (values.preview) {
    mkdirSync(values.preview, { recursive: true });
    for (const t of [0, 0.2, 0.34, 0.5, 0.7, 0.86, 0.93, 1]) {
      const file = path.join(values.preview, `${variant.name}-${t.toFixed(2)}.png`);
      writeFileSync(file, await draw(variant, t));
    }
    console.log(`${variant.name}: previews in ${values.preview}`);
    continue;
  }
  const dir = path.join(root, "public/media/film/home-placeholder", variant.name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  let bytes = 0;
  for (let index = 0; index < frames; index += 1) {
    const png = await draw(variant, index / (frames - 1));
    // AVIF keeps the city lights at under half the size of WebP at the same look.
    const avif = await sharp(png).avif({ quality: 40, effort: 4 }).toBuffer();
    writeFileSync(path.join(dir, `${String(index + 1).padStart(4, "0")}.avif`), avif);
    bytes += avif.length;
  }
  total += bytes;
  console.log(`${variant.name}: ${frames} frames, ${(bytes / 1024 / 1024).toFixed(2)} MB`);
}
await browser.close();
if (!values.preview) console.log(`total ${(total / 1024 / 1024).toFixed(2)} MB`);

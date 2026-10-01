// Turns the home film's clips (Google Flow footage, docs/renovation/R1-HOME-FILM.md)
// into the numbered frames the scroll film plays: public/media/film/<name>/{landscape,portrait}.
// Clips are joined in the order given; their seams are checked, since each clip
// should end on the frame the next one starts with. Phones get the portrait
// clips when there are some, otherwise a centre crop of the landscape ones.
//
// Needs ffmpeg with H.264 (on PATH, in FFMPEG_PATH, or --ffmpeg); sharp comes with Next.
//
// Usage:
//   node scripts/media/film-frames.mjs --name home-v1 --landscape C1.mp4,C2.mp4,C3.mp4 \
//     [--portrait C1-9x16.mp4,C2-9x16.mp4,C3-9x16.mp4] [--frames 120] [--quality 40] [--focus 0.5]
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { values } = parseArgs({
  options: {
    name: { type: "string" },
    landscape: { type: "string" },
    portrait: { type: "string" },
    frames: { type: "string", default: "120" },
    quality: { type: "string", default: "40" },
    focus: { type: "string", default: "0.5" },
    ffmpeg: { type: "string" },
  },
});

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!values.name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.name)) fail("--name: lowercase words joined by -, such as home-v1");
if (!values.landscape) fail("--landscape: the clips in order, separated by commas");
const frames = Number(values.frames);
const quality = Number(values.quality);
const focus = Math.min(1, Math.max(0, Number(values.focus)));
const ffmpeg = values.ffmpeg ?? process.env.FFMPEG_PATH ?? "ffmpeg";
if (spawnSync(ffmpeg, ["-version"]).status !== 0) {
  fail(`ffmpeg not found (${ffmpeg}). Install it, or pass --ffmpeg /path/to/ffmpeg or set FFMPEG_PATH.`);
}

const sizes = { landscape: { width: 1600, height: 900 }, portrait: { width: 720, height: 1280 } };

/** Duration of a clip in seconds, from ffmpeg's own report. */
function duration(file) {
  const report = spawnSync(ffmpeg, ["-hide_banner", "-i", file], { encoding: "utf8" }).stderr;
  const match = /Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/.exec(report);
  if (!match) fail(`${file}: not a video ffmpeg can read`);
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
}

/** Every clip's frames at the rate that gives about `count` frames in all, as PNG files in order. */
function extract(clips, size, crop, work) {
  const total = clips.reduce((sum, clip) => sum + duration(clip), 0);
  // Sample a little denser than needed, then pick evenly, so no clip is short-changed.
  const rate = ((frames + clips.length * 2) / total).toFixed(4);
  const scale = crop
    ? `scale=-2:${size.height}:flags=lanczos,crop=${size.width}:${size.height}:(iw-${size.width})*${focus}:0`
    : `scale=${size.width}:${size.height}:force_original_aspect_ratio=increase:flags=lanczos,crop=${size.width}:${size.height}`;
  const files = [];
  const seams = [];
  clips.forEach((clip, index) => {
    const dir = path.join(work, String(index));
    mkdirSync(dir, { recursive: true });
    execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-i", clip, "-vf", `fps=${rate},${scale}`, "-an", path.join(dir, "%05d.png")]);
    const own = readdirSync(dir)
      .filter((file) => file.endsWith(".png"))
      .sort()
      .map((file) => path.join(dir, file));
    if (own.length === 0) fail(`${clip}: no frames came out`);
    if (files.length > 0) seams.push({ before: files[files.length - 1], after: own[0], clip });
    files.push(...own);
  });
  // Pick exactly `frames` frames, evenly.
  const picked = Array.from({ length: frames }, (_, i) => files[Math.round((i * (files.length - 1)) / (frames - 1))]);
  return { picked, seams };
}

/** Mean difference of two frames, 0 (same) to 1, at a small size. */
async function difference(a, b) {
  const [x, y] = await Promise.all([a, b].map((file) => sharp(file).resize(160, 90, { fit: "fill" }).removeAlpha().raw().toBuffer()));
  let sum = 0;
  for (let i = 0; i < x.length; i += 1) sum += Math.abs(x[i] - y[i]);
  return sum / x.length / 255;
}

const work = mkdtempSync(path.join(tmpdir(), "film-frames-"));
const entry = {};
try {
  for (const orientation of ["landscape", "portrait"]) {
    const own = values[orientation]?.split(",").map((clip) => clip.trim()).filter(Boolean);
    const clips = own?.length ? own : orientation === "portrait" ? values.landscape.split(",").map((clip) => clip.trim()) : [];
    const size = sizes[orientation];
    const { picked, seams } = extract(clips, size, orientation === "portrait" && !own?.length, path.join(work, orientation));
    for (const seam of seams) {
      const change = await difference(seam.before, seam.after);
      const verdict = change < 0.04 ? "seamless" : change < 0.1 ? "visible, check it" : "a jump: the clips do not share this frame";
      console.log(`${orientation} seam before ${path.basename(seam.clip)}: ${(change * 100).toFixed(1)}% (${verdict})`);
    }
    const dir = path.join(root, "public/media/film", values.name, orientation);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    let bytes = 0;
    for (const [index, file] of picked.entries()) {
      const out = path.join(dir, `${String(index + 1).padStart(4, "0")}.avif`);
      writeFileSync(out, await sharp(file).avif({ quality, effort: 5 }).toBuffer());
      bytes += statSync(out).size;
    }
    console.log(`${orientation}: ${frames} frames, ${(bytes / 1024 / 1024).toFixed(2)} MB${own?.length ? "" : " (cropped from landscape)"}`);
    entry[orientation] = { path: `/media/film/${values.name}/${orientation}`, format: "avif", frames, ...size };
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

console.log("\nMedia entry for src/content/media.ts (fill in alt text and source):");
console.log(
  JSON.stringify(
    {
      [`film-${values.name}`]: {
        src: `${entry.landscape.path}/0001.avif`,
        width: entry.landscape.width,
        height: entry.landscape.height,
        kind: "generated",
        alt: { th: "…", en: "…" },
        source: "…",
        sequence: entry,
      },
    },
    null,
    2,
  ),
);

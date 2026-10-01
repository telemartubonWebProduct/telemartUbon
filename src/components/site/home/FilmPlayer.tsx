"use client";

import { useEffect, useRef } from "react";

import type { FrameSequence } from "@/lib/content/schema";

import { activeBeat, beatFocus, beatWindows, frameUrl, loadOrder, stillFrame, type BeatWindow } from "./film-timeline";

// Plays the home film (FilmHero) as visitors scroll. It switches the server
// markup from the static stack to the film layout by setting data-film-live,
// drives the beats through the --p custom property, and draws the frames on a
// canvas over the poster. Without motion it leaves the static stack alone.

type Sequences = { landscape: FrameSequence; portrait?: FrameSequence };

type FilmPlayerProps = {
  /** Frames of the film; without them the beats still play over the poster. */
  sequence?: Sequences;
  /** Text colour of each beat, for the bar of calls to action. */
  textColors: readonly ("dark" | "light")[];
};

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** How fast the film catches up with the scroll (per second); higher is snappier. */
const FOLLOW = 9;
/** Decoded frames kept around the current one, besides the stills. */
const KEEP_DECODED = 12;
const PARALLEL_FETCHES = 4;
const PORTRAIT = "(max-aspect-ratio: 4/5)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (from: number, to: number, value: number) => {
  const t = clamp01((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};

/** Save-Data and slow connections get the stills only, crossfading from beat to beat. */
function stillsOnly(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return Boolean(connection?.saveData) || /(^|-)(2g|3g)$/.test(connection?.effectiveType ?? "");
}

/** Fetches frames in the background and keeps a few decoded around the playhead. */
class FrameBank {
  private readonly blobs: (Blob | undefined)[];
  private readonly decoded = new Map<number, ImageBitmap>();
  private readonly decoding = new Set<number>();
  private readonly pinned: Set<number>;
  private readonly controller = new AbortController();
  private readonly order: number[];
  private next = 0;
  private inFlight = 0;
  private disposed = false;
  playhead = 0;

  constructor(
    readonly sequence: FrameSequence,
    stills: number[],
    onlyStills: boolean,
    private readonly onFrame: () => void,
  ) {
    this.blobs = new Array(sequence.frames);
    this.pinned = new Set(stills);
    this.order = onlyStills ? [...new Set(stills)] : loadOrder(sequence.frames, stills);
  }

  start() {
    while (!this.disposed && this.inFlight < PARALLEL_FETCHES && this.next < this.order.length) {
      const index = this.order[this.next];
      const early = this.next < this.pinned.size;
      this.next += 1;
      this.inFlight += 1;
      fetch(frameUrl(this.sequence, index), { signal: this.controller.signal, priority: early ? "high" : "low" })
        .then((response) => (response.ok ? response.blob() : Promise.reject(new Error(String(response.status)))))
        .then((blob) => {
          this.blobs[index] = blob;
          if (this.pinned.has(index) || Math.abs(index - this.playhead) <= 2) this.decode(index);
        })
        .catch(() => undefined)
        .finally(() => {
          this.inFlight -= 1;
          this.start();
        });
    }
  }

  /** Decoded frames on either side of a position, the nearest ones first. */
  around(position: number): [number, ImageBitmap][] {
    let below: [number, ImageBitmap] | undefined;
    let above: [number, ImageBitmap] | undefined;
    for (const entry of this.decoded) {
      const [index] = entry;
      if (index <= position && (!below || index > below[0])) below = entry;
      if (index >= position && (!above || index < above[0])) above = entry;
    }
    return [below, above].filter((entry): entry is [number, ImageBitmap] => entry !== undefined);
  }

  /** Asks for the frames next to the playhead, ahead in the direction of travel. */
  prepare(position: number, direction: number) {
    const base = Math.floor(position);
    const wanted = direction >= 0 ? [base, base + 1, base + 2, base + 3, base - 1] : [base + 1, base, base - 1, base - 2, base + 2];
    for (const index of wanted) this.decode(index);
  }

  private decode(index: number) {
    if (this.disposed || index < 0 || index >= this.sequence.frames || this.decoded.has(index) || this.decoding.has(index)) return;
    const blob = this.blobs[index];
    if (!blob) return;
    this.decoding.add(index);
    createImageBitmap(blob)
      .then((bitmap) => {
        this.decoding.delete(index);
        if (this.disposed) {
          bitmap.close();
          return;
        }
        this.decoded.set(index, bitmap);
        this.evict();
        this.onFrame();
      })
      .catch(() => {
        this.decoding.delete(index);
        // A still this browser cannot open means none of the frames will: stop
        // downloading them and leave the beats playing over the poster.
        if (this.pinned.has(index)) this.dispose();
      });
  }

  /** Frees the decoded frames farthest from the playhead; the stills stay. */
  private evict() {
    while (this.decoded.size > KEEP_DECODED + this.pinned.size) {
      let farthest = -1;
      let distance = -1;
      for (const index of this.decoded.keys()) {
        if (this.pinned.has(index)) continue;
        const away = Math.abs(index - this.playhead);
        if (away > distance) {
          distance = away;
          farthest = index;
        }
      }
      if (farthest === -1) return;
      this.decoded.get(farthest)?.close();
      this.decoded.delete(farthest);
    }
  }

  dispose() {
    this.disposed = true;
    this.controller.abort();
    for (const bitmap of this.decoded.values()) bitmap.close();
    this.decoded.clear();
  }
}

export function FilmPlayer({ sequence, textColors }: FilmPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Primitive dependencies: the server sends new objects on every render.
  const frames = JSON.stringify(sequence ?? null);
  const colors = textColors.join(" ");

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = canvas?.closest<HTMLElement>(".tm-film");
    const track = root?.querySelector<HTMLElement>(".tm-film-track");
    const stage = root?.querySelector<HTMLElement>(".tm-film-stage");
    if (!canvas || !root || !track || !stage) return;
    const context = canvas.getContext("2d", { alpha: true });
    const film = JSON.parse(frames) as Sequences | null;
    const palette = colors.split(" ");
    const windows: BeatWindow[] = beatWindows(palette.length);
    const scenes = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-film-scene]"));
    const motion = window.matchMedia(REDUCED_MOTION);
    const portrait = window.matchMedia(PORTRAIT);

    let bank: FrameBank | undefined;
    let raf = 0;
    let last = 0;
    let current = 0;
    let drawnAt = Number.NaN;
    let beat = -1;
    let onScreen = true;
    let started = false;
    let stopLoading: (() => void) | undefined;

    const progress = () => {
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      return span > 0 ? clamp01(-rect.top / span) : 0;
    };

    const draw = (force = false) => {
      if (!bank || !context) return;
      const position = current * (bank.sequence.frames - 1);
      if (!force && position === drawnAt) return;
      bank.playhead = position;
      bank.prepare(position, position - (Number.isNaN(drawnAt) ? position : drawnAt));
      const pair = bank.around(position);
      if (pair.length === 0) return;
      const { width, height } = canvas;
      const fit = (bitmap: ImageBitmap) => {
        const scale = Math.max(width / bitmap.width, height / bitmap.height);
        const w = bitmap.width * scale;
        const h = bitmap.height * scale;
        return [(width - w) / 2, (height - h) / 2, w, h] as const;
      };
      context.globalAlpha = 1;
      context.drawImage(pair[0][1], ...fit(pair[0][1]));
      if (pair.length === 2 && pair[1][0] !== pair[0][0]) {
        const [[from], [to, bitmap]] = pair;
        const t = (position - from) / (to - from);
        // Neighbouring frames blend for smooth motion; distant ones (stills) cross over in the middle.
        context.globalAlpha = to - from <= 2 ? t : smoothstep(0.35, 0.65, t);
        context.drawImage(bitmap, ...fit(bitmap));
        context.globalAlpha = 1;
      }
      drawnAt = position;
      if (!canvas.hasAttribute("data-ready")) canvas.setAttribute("data-ready", "");
    };

    const apply = () => {
      stage.style.setProperty("--p", current.toFixed(4));
      const next = activeBeat(windows, current);
      if (next !== beat) {
        beat = next;
        stage.dataset.text = palette[beat] ?? "dark";
        scenes.forEach((link, index) => (index === beat ? link.setAttribute("aria-current", "step") : link.removeAttribute("aria-current")));
      }
      draw();
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
      last = now;
      const target = progress();
      current += (target - current) * (1 - Math.exp(-dt * FOLLOW));
      if (Math.abs(target - current) < 0.0004) current = target;
      apply();
      if (current !== target) raf = requestAnimationFrame(tick);
      else last = 0;
    };

    const kick = () => {
      if (!raf && onScreen && started) raf = requestAnimationFrame(tick);
    };

    const size = () => {
      const sequenceNow = bank?.sequence;
      const cssWidth = canvas.clientWidth || 1;
      const cssHeight = canvas.clientHeight || 1;
      // No sharper than the frames themselves, and at most twice the CSS size.
      const detail = sequenceNow ? Math.max(sequenceNow.width / cssWidth, sequenceNow.height / cssHeight, 1) : 1;
      const ratio = Math.min(window.devicePixelRatio || 1, 2, detail);
      const width = Math.round(cssWidth * ratio);
      const height = Math.round(cssHeight * ratio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        draw(true);
      }
    };

    const pickSequence = () => (film?.portrait && portrait.matches ? film.portrait : film?.landscape);

    const loadFrames = () => {
      const chosen = pickSequence();
      if (!chosen || bank?.sequence === chosen) return;
      bank?.dispose();
      canvas.removeAttribute("data-ready");
      drawnAt = Number.NaN;
      const stills = windows.map((_, index) => stillFrame(windows, index, chosen.frames));
      bank = new FrameBank(chosen, stills, stillsOnly(), () => {
        draw(true);
      });
      size();
      // Frames wait until the page has loaded, so the poster, fonts and text come first.
      const begin = () => {
        stopLoading = undefined;
        bank?.start();
      };
      if (document.readyState === "complete") {
        const idle = window.requestIdleCallback?.(begin, { timeout: 1500 }) ?? window.setTimeout(begin, 300);
        stopLoading = () => (window.cancelIdleCallback ? window.cancelIdleCallback(idle) : window.clearTimeout(idle));
      } else {
        window.addEventListener("load", begin, { once: true });
        stopLoading = () => window.removeEventListener("load", begin);
      }
    };

    const onScene = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("[data-film-scene]");
      if (!link) return;
      event.preventDefault();
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const top = window.scrollY + rect.top + beatFocus(windows, Number(link.dataset.filmScene)) * span;
      window.scrollTo({ top, behavior: "smooth" });
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      kick();
    });
    const resized = new ResizeObserver(() => {
      size();
      kick();
    });

    const start = () => {
      if (started) return;
      started = true;
      root.setAttribute("data-film-live", "");
      current = progress();
      beat = -1;
      apply();
      loadFrames();
      observer.observe(track);
      resized.observe(canvas);
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("resize", kick);
      root.addEventListener("click", onScene);
      portrait.addEventListener("change", loadFrames);
    };

    const stop = () => {
      if (!started) return;
      started = false;
      root.removeAttribute("data-film-live");
      stage.style.removeProperty("--p");
      cancelAnimationFrame(raf);
      raf = 0;
      stopLoading?.();
      bank?.dispose();
      bank = undefined;
      canvas.removeAttribute("data-ready");
      observer.disconnect();
      resized.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      root.removeEventListener("click", onScene);
      portrait.removeEventListener("change", loadFrames);
    };

    const onMotion = () => (motion.matches ? stop() : start());
    onMotion();
    motion.addEventListener("change", onMotion);

    return () => {
      motion.removeEventListener("change", onMotion);
      stop();
    };
  }, [frames, colors]);

  return <canvas ref={canvasRef} className="tm-film-canvas" />;
}

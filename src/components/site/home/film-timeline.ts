import type { FrameSequence } from "@/lib/content/schema";

// Timing of the home film (FilmHero, FilmPlayer): which beat of words shows at
// which point of the scroll, and which frames to load first. Progress runs
// from 0 at the top of the film to 1 when its last frame is reached.

/** Scroll length of one beat, in small-viewport heights; the static layout uses the same, so switching moves nothing. */
export const BEAT_LENGTH_SVH = 150;

/** Share of the progress spent between two beats: the first fades out, then the next fades in. */
export const BEAT_GAP = 0.12;

/** Progress over which a beat is fully visible, and how long its fades take. */
export type BeatWindow = { start: number; end: number; fade: number };

export function beatWindows(count: number): BeatWindow[] {
  const fade = BEAT_GAP / 2;
  if (count <= 1) return [{ start: 0, end: 1, fade }];
  const width = (1 - BEAT_GAP * (count - 1)) / count;
  return Array.from({ length: count }, (_, index) => {
    const start = index * (width + BEAT_GAP);
    return { start, end: index === count - 1 ? 1 : start + width, fade };
  });
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Opacity of a beat at a progress; the CSS of FilmHero computes the same from --p. */
export function beatOpacity(window: BeatWindow, progress: number): number {
  const fadeIn = (progress - (window.start - window.fade)) / window.fade;
  const fadeOut = (window.end + window.fade - progress) / window.fade;
  return clamp01(Math.min(fadeIn, fadeOut));
}

/** The beat on screen: the most visible one, or the next one while the screen is between two. */
export function activeBeat(windows: readonly BeatWindow[], progress: number): number {
  let best = 0;
  let bestOpacity = -1;
  windows.forEach((window, index) => {
    const opacity = beatOpacity(window, progress);
    if (opacity > bestOpacity || (opacity === bestOpacity && progress >= window.start - window.fade)) {
      best = index;
      bestOpacity = opacity;
    }
  });
  return best;
}

/** Progress at which a beat is best seen: the start for the first, the end for the last, the middle otherwise. */
export function beatFocus(windows: readonly BeatWindow[], index: number): number {
  if (index === 0) return 0;
  if (index === windows.length - 1) return 1;
  const window = windows[index];
  return (window.start + window.end) / 2;
}

/** Frame shown for a beat in the static layout and while only stills load. */
export function stillFrame(windows: readonly BeatWindow[], index: number, frames: number): number {
  return Math.round(beatFocus(windows, index) * (frames - 1));
}

/** URL of one frame of a sequence (frames count from 0; files from 0001). */
export function frameUrl(sequence: Pick<FrameSequence, "path" | "format">, index: number): string {
  return `${sequence.path}/${String(index + 1).padStart(4, "0")}.${sequence.format}`;
}

/**
 * Order in which to fetch frames: the given ones first (the stills), then the
 * film coarse to fine, so a scrub soon after the page opens already has frames
 * spread over the whole film.
 */
export function loadOrder(frames: number, first: readonly number[] = []): number[] {
  const order: number[] = [];
  const seen = new Set<number>();
  const add = (index: number) => {
    if (index < 0 || index >= frames || seen.has(index)) return;
    seen.add(index);
    order.push(index);
  };
  first.forEach(add);
  add(0);
  add(frames - 1);
  const spans: [number, number][] = [[0, frames - 1]];
  for (let next = 0; next < spans.length; next += 1) {
    const [from, to] = spans[next];
    if (to - from < 2) continue;
    const middle = Math.floor((from + to) / 2);
    add(middle);
    spans.push([from, middle], [middle, to]);
  }
  return order;
}

import { describe, expect, it } from "vitest";

import {
  activeBeat,
  BEAT_GAP,
  beatFocus,
  beatOpacity,
  beatWindows,
  frameUrl,
  loadOrder,
  stillFrame,
} from "@/components/site/home/film-timeline";

describe("film beats", () => {
  it("share the film, one at a time, with a gap between each", () => {
    const windows = beatWindows(3);
    expect(windows[0].start).toBe(0);
    expect(windows[2].end).toBe(1);
    for (let index = 1; index < windows.length; index += 1) {
      expect(windows[index].start - windows[index - 1].end).toBeCloseTo(BEAT_GAP, 10);
    }
  });

  it("never show two beats at once", () => {
    const windows = beatWindows(3);
    for (let progress = 0; progress <= 1; progress += 0.005) {
      const visible = windows.filter((window) => beatOpacity(window, progress) > 0);
      expect(visible.length, `at ${progress}`).toBeLessThanOrEqual(1);
    }
  });

  it("start on the first beat and end on the last, fully visible", () => {
    const windows = beatWindows(3);
    expect(beatOpacity(windows[0], 0)).toBe(1);
    expect(beatOpacity(windows[2], 1)).toBe(1);
    expect(activeBeat(windows, 0)).toBe(0);
    expect(activeBeat(windows, 0.5)).toBe(1);
    expect(activeBeat(windows, 1)).toBe(2);
    // Between beats the screen already points at the next one.
    expect(activeBeat(windows, windows[0].end + windows[0].fade + 0.001)).toBe(1);
  });

  it("keep a single beat on screen for the whole film", () => {
    const [only] = beatWindows(1);
    expect(beatOpacity(only, 0)).toBe(1);
    expect(beatOpacity(only, 1)).toBe(1);
  });

  it("pick the stills from where each beat is best seen", () => {
    const windows = beatWindows(3);
    expect(beatFocus(windows, 0)).toBe(0);
    expect(beatFocus(windows, 2)).toBe(1);
    expect(stillFrame(windows, 0, 120)).toBe(0);
    expect(stillFrame(windows, 1, 120)).toBe(Math.round(0.5 * 119));
    expect(stillFrame(windows, 2, 120)).toBe(119);
  });
});

describe("film frames", () => {
  it("are numbered from 0001", () => {
    expect(frameUrl({ path: "/media/film/home/landscape", format: "avif" }, 0)).toBe("/media/film/home/landscape/0001.avif");
    expect(frameUrl({ path: "/media/film/home/landscape", format: "webp" }, 119)).toBe("/media/film/home/landscape/0120.webp");
  });

  it("load the stills first, then the whole film coarse to fine, each once", () => {
    const order = loadOrder(120, [59, 0, 119]);
    expect(order.slice(0, 3)).toEqual([59, 0, 119]);
    expect(new Set(order).size).toBe(120);
    expect([...order].sort((a, b) => a - b)).toEqual(Array.from({ length: 120 }, (_, index) => index));
    // After a handful of fetches the frames already cover the film in quarters.
    const early = order.slice(0, 7);
    for (const quarter of [0, 29, 59, 89, 119]) expect(early.some((index) => Math.abs(index - quarter) <= 2), String(quarter)).toBe(true);
  });
});

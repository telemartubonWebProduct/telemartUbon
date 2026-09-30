import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { camera, viewAxes } from "@/components/site/home/router-geometry";

// The 3D hero's first frame must sit on the poster it replaces.
describe("router scene framing", () => {
  it("matches the poster's viewBox", () => {
    const svg = readFileSync(path.join(process.cwd(), "public/media/router-concept.svg"), "utf8");
    const [x, y, width, height] = svg.match(/viewBox="([^"]+)"/)![1].split(" ").map(Number);
    expect(camera.viewWidth).toBeCloseTo(width / 100, 2);
    expect(camera.viewHeight).toBeCloseTo(height / 100, 2);
    expect(x + width / 2).toBeCloseTo(0, 0);
    // SVG y points down; the scene's up axis points up.
    expect(camera.centreUp).toBeCloseTo(-(y + height / 2) / 100, 2);
  });

  it("builds an orthonormal view basis looking down at the router", () => {
    const { dir, right, up } = viewAxes();
    const dot = (a: number[], b: number[]) => a.reduce((sum, value, index) => sum + value * b[index], 0);
    expect(dot(dir, right)).toBeCloseTo(0, 6);
    expect(dot(dir, up)).toBeCloseTo(0, 6);
    expect(dot(right, up)).toBeCloseTo(0, 6);
    expect(Math.hypot(...up)).toBeCloseTo(1, 6);
    expect(right[1]).toBe(0);
    expect(up[1]).toBeGreaterThan(0.9);
  });
});

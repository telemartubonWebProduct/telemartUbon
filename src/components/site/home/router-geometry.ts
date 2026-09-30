// Proportions and camera of the concept router, in poster units / 100. The
// poster (public/media/router-concept.svg, drawn by
// scripts/media/router-concept.py) and the 3D scene share these numbers, so
// the model's first frame sits exactly on the poster it replaces.

export const body = { width: 3.2, depth: 2.0, height: 0.46, cornerRadius: 0.26 };

export const antenna = {
  width: 0.24,
  thickness: 0.09,
  /** Bottom and top of each paddle; the bottom is hidden behind the body. */
  bottom: 0.4,
  top: 2.14,
  z: -body.depth / 2 - 0.09 / 2 + 0.01,
  xs: [-1.16, -1.6 / 3 + 0.1, 1.6 / 3 - 0.1, 1.16],
};

export const vents = { count: 15, firstX: -0.98, step: 0.14, width: 0.04, zFrom: -0.56, zTo: -0.16 };

export const leds = { count: 4, firstX: -1.18, step: 0.2, y: body.height * 0.52, radius: 0.023 };

/** Signal rings on the floor: radius, line width and opacity. The 3D lines are
 *  a little wider than the poster's strokes, which antialiasing thins out. */
export const rings = [
  { radius: 2.08, width: 0.024, opacity: 1 },
  { radius: 2.54, width: 0.02, opacity: 0.62 },
  { radius: 3.0, width: 0.017, opacity: 0.34 },
];

/** Orthographic view: yaw to the right of the front, elevation above the floor. */
export const camera = {
  yaw: (34 * Math.PI) / 180,
  elevation: (24 * Math.PI) / 180,
  /** Visible width and the vertical centre of the frame (the poster's viewBox). */
  viewWidth: 6.239,
  viewHeight: 4.046,
  centreUp: 0.683,
};

/** Direction from the router towards the camera, and the screen's right and up axes. */
export function viewAxes() {
  const { yaw, elevation } = camera;
  const dir: [number, number, number] = [Math.sin(yaw) * Math.cos(elevation), Math.sin(elevation), Math.cos(yaw) * Math.cos(elevation)];
  const rightLength = Math.hypot(dir[2], dir[0]);
  const right: [number, number, number] = [dir[2] / rightLength, 0, -dir[0] / rightLength];
  const up: [number, number, number] = [
    dir[1] * right[2] - dir[2] * right[1],
    dir[2] * right[0] - dir[0] * right[2],
    dir[0] * right[1] - dir[1] * right[0],
  ];
  return { dir, right, up };
}

// Drawn film for the home page, used until the footage briefed for Google
// Flow is approved (docs/renovation/R1-HOME-FILM.md). Runs in the browser page
// of scripts/media/film-placeholder.mjs: window.TelemartFilm.render(canvas, t)
// draws the frame at progress t (0..1) on a canvas of any size.
//
// One continuous camera move, in metres: above a sea of clouds at dusk, down
// through them, over a city at night whose fibre routes glow red and white,
// along one street to a house, and through its window into a living room
// filled with Wi-Fi rings.
(() => {
  const NAVY = [14, 22, 48];
  const WARM = [255, 190, 120];

  // Deterministic random numbers: the same film on every run.
  function random(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = (e0, e1, v) => {
    const t = clamp01((v - e0) / (e1 - e0));
    return t * t * (3 - 2 * t);
  };
  const rgba = ([r, g, b], a = 1) => `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${Math.max(0, Math.min(1, a)).toFixed(4)})`;
  const mixColor = (a, b, t) => a.map((v, i) => mix(v, b[i], t));

  // Scene -------------------------------------------------------------------

  // The house sits right of the street's axis, so the words on the left stay clear of it.
  const TARGET = { x: 8, z: 2000 };
  const HOUSE = { x: TARGET.x, z: TARGET.z + 5, width: 12, depth: 10, height: 4.2 };
  const UPPER = { x: TARGET.x + 1.2, z: TARGET.z + 5.6, width: 8.6, depth: 8.6, height: 7.6 };
  const WINDOW = { x: 0, y: 2.05, width: 5.2, height: 2.7 };
  const CLOUD_BASE = 430;
  const CLOUD_TOP = 600;
  const riverZ = (x) => 1250 + 230 * Math.sin(x / 760 + 0.6) + 90 * Math.sin(x / 290);

  function buildScene() {
    const rand = random(20261001);

    // Clouds: clusters of puffs, thicker towards the horizon.
    const clouds = [];
    for (let c = 0; c < 340; c += 1) {
      const cx = mix(-3800, 3800, rand());
      const cz = mix(-2400, 3400, rand());
      const cy = mix(CLOUD_BASE + 30, CLOUD_TOP - 30, rand());
      const size = mix(0.6, 1.4, rand());
      for (let i = 0; i < 9; i += 1) {
        clouds.push({
          x: cx + (rand() - 0.5) * 360 * size,
          y: cy + (rand() - 0.5) * 70,
          z: cz + (rand() - 0.5) * 300 * size,
          r: mix(80, 200, rand()) * size,
          a: mix(0.45, 0.85, rand()),
        });
      }
    }

    // Districts with their own street grids, so the city reads as a city.
    const lights = [];
    const districts = [{ x: 0, z: TARGET.z - 120, r: 560, angle: 0, spacing: 44 }];
    for (let i = 0; i < 16; i += 1) {
      const a = rand() * Math.PI * 2;
      const d = mix(500, 2900, Math.sqrt(rand()));
      districts.push({ x: Math.cos(a) * d, z: TARGET.z + Math.sin(a) * d * 0.9 - 200, r: mix(320, 720, rand()), angle: rand() * Math.PI, spacing: mix(40, 70, rand()) });
    }
    // Neighbourhoods under the camera's path, so the descent has a city below it.
    for (let i = 0; i < 22; i += 1) {
      const side = rand() < 0.5 ? -1 : 1;
      districts.push({ x: side * mix(0, 1300, rand() ** 1.4), z: mix(-1200, 1650, rand()), r: mix(260, 560, rand()), angle: rand() * Math.PI, spacing: mix(36, 58, rand()) });
    }
    const nearRiver = (x, z) => Math.abs(z - riverZ(x)) < 60;
    for (const district of districts) {
      const cos = Math.cos(district.angle);
      const sin = Math.sin(district.angle);
      for (let u = -district.r; u <= district.r; u += district.spacing) {
        for (const direction of [0, 1]) {
          for (let v = -district.r; v <= district.r; v += 11 + rand() * 6) {
            const a = direction ? u : v;
            const b = direction ? v : u;
            const falloff = 1 - Math.hypot(a, b) / district.r;
            if (falloff <= 0 || rand() > falloff * 0.95 + 0.12) continue;
            const x = district.x + a * cos - b * sin;
            const z = district.z + a * sin + b * cos;
            if (nearRiver(x, z)) continue;
            lights.push({ x, z, tone: rand() < 0.04 ? 1 : rand() < 0.12 ? 2 : 0, size: mix(0.8, 1.7, rand()) });
          }
        }
      }
    }
    // Ring roads and highways: long curves of bright sodium lights.
    const highways = [];
    for (let i = 0; i < 5; i += 1) {
      const z0 = mix(-200, 4400, rand());
      const amp = mix(120, 420, rand());
      const wave = mix(600, 1400, rand());
      const phase = rand() * 6;
      const points = [];
      for (let x = -3600; x <= 3600; x += 40) points.push([x, 0, z0 + amp * Math.sin(x / wave + phase)]);
      highways.push(points);
      for (let s = 0; s < points.length - 1; s += 1) {
        const [x0, , zA] = points[s];
        const [x1, , zB] = points[s + 1];
        for (let k = 0; k < 6; k += 1) {
          const t = rand();
          const x = mix(x0, x1, t) + (rand() - 0.5) * 8;
          const z = mix(zA, zB, t) + (rand() - 0.5) * 8;
          if (!nearRiver(x, z)) lights.push({ x, z, tone: 3, size: mix(1, 1.8, rand()) });
        }
      }
    }
    // A scatter of lights everywhere else, thin.
    for (let i = 0; i < 6000; i += 1) {
      const x = mix(-3800, 3800, rand());
      const z = mix(-600, 6400, rand());
      if (rand() > Math.exp(-Math.hypot(x, z - TARGET.z) / 1800) || nearRiver(x, z)) continue;
      lights.push({ x, z, tone: 0, size: mix(0.6, 1.2, rand()) });
    }

    // Fibre routes: arcs between district hubs, all leading towards the house's district.
    const routes = [];
    const hubs = districts.map((d) => [d.x, d.z]);
    const seen = new Set();
    hubs.forEach((hub, i) => {
      const nearest = hubs
        .map((other, j) => ({ j, d: Math.hypot(other[0] - hub[0], other[1] - hub[1]) }))
        .filter(({ j }) => j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      for (const { j } of nearest) {
        const key = [i, j].sort().join("-");
        if (seen.has(key)) continue;
        seen.add(key);
        // Pulses travel towards the hub nearer the house.
        const [from, to] = Math.hypot(hub[0], hub[1] - TARGET.z) > Math.hypot(hubs[j][0], hubs[j][1] - TARGET.z) ? [hub, hubs[j]] : [hubs[j], hub];
        const bend = (rand() - 0.5) * 0.5;
        routes.push({ from, to, bend, color: rand() < 0.6 ? "red" : "white", phase: rand(), speed: mix(0.7, 1.3, rand()) });
      }
    });

    // The backbone the camera follows from the clouds to the house's street.
    const backbone = [];
    for (let z = -2600; z <= TARGET.z - 420; z += 40) backbone.push([60 * Math.sin(z / 520) * smooth(TARGET.z - 420, -600, z), 2.5, z]);

    // The street to the house, its pole line, houses and lamps.
    const street = { from: [0, 0, TARGET.z - 420], to: [0, 0, TARGET.z - 6] };
    const houses = [];
    const lamps = [];
    for (let z = TARGET.z - 400; z < TARGET.z - 18; z += 16) {
      for (const side of [-1, 1]) {
        if (rand() < 0.1) continue;
        houses.push({
          x: side * mix(17, 20, rand()),
          z: z + mix(-2, 2, rand()),
          width: mix(8, 10.5, rand()),
          depth: mix(8, 11, rand()),
          height: mix(5.6, 7.8, rand()),
          lit: rand(),
          face: side < 0 ? 1 : -1,
        });
      }
      if (Math.round(z) % 32 === 0) lamps.push({ x: 7.5, z });
    }

    const motes = [];
    for (let i = 0; i < 40; i += 1) motes.push({ x: rand(), y: rand(), r: mix(2, 8, rand()), a: mix(0.05, 0.2, rand()), drift: mix(-0.04, 0.04, rand()) });

    return { clouds, lights, districts, highways, routes, backbone, street, houses, lamps, motes };
  }

  // City at night seen from above, as a texture: streets, highways, river.
  const MAP = { x0: -4600, z0: -3400, size: 9600, res: 4096 };

  function buildMap(scene) {
    const rand = random(7);
    const canvas = document.createElement("canvas");
    canvas.width = MAP.res;
    canvas.height = MAP.res;
    const ctx = canvas.getContext("2d");
    const k = MAP.res / MAP.size;
    const u = (x) => (x - MAP.x0) * k;
    const v = (z) => (z - MAP.z0) * k;
    ctx.fillStyle = "rgb(9,12,30)";
    ctx.fillRect(0, 0, MAP.res, MAP.res);
    ctx.globalCompositeOperation = "lighter";
    for (const district of scene.districts) {
      const cos = Math.cos(district.angle);
      const sin = Math.sin(district.angle);
      for (let a = -district.r; a <= district.r; a += district.spacing) {
        for (const direction of [0, 1]) {
          // One street: a faint line of light, with brighter lamps and windows along it.
          const span = Math.sqrt(Math.max(0, district.r * district.r - a * a));
          const p0 = direction ? [a, -span] : [-span, a];
          const p1 = direction ? [a, span] : [span, a];
          const w0 = [district.x + p0[0] * cos - p0[1] * sin, district.z + p0[0] * sin + p0[1] * cos];
          const w1 = [district.x + p1[0] * cos - p1[1] * sin, district.z + p1[0] * sin + p1[1] * cos];
          const strength = 0.35 + 0.65 * (1 - Math.abs(a) / district.r);
          ctx.strokeStyle = `rgba(255,190,130,${0.22 * strength})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(u(w0[0]), v(w0[1]));
          ctx.lineTo(u(w1[0]), v(w1[1]));
          ctx.stroke();
          const length = Math.hypot(w1[0] - w0[0], w1[1] - w0[1]);
          for (let s = 0; s < length; s += 7 + rand() * 9) {
            const f = s / length;
            const x = mix(w0[0], w1[0], f) + (rand() - 0.5) * 14;
            const z = mix(w0[1], w1[1], f) + (rand() - 0.5) * 14;
            if (Math.abs(z - riverZ(x)) < 70) continue;
            const warm = rand() < 0.85;
            ctx.fillStyle = warm ? `rgba(255,${190 + rand() * 40},${120 + rand() * 50},${(0.35 + rand() * 0.65) * strength})` : `rgba(200,220,255,${0.6 * strength})`;
            const size = 1 + rand() * 1.6;
            ctx.fillRect(u(x), v(z), size, size);
          }
        }
      }
    }
    for (const points of scene.highways) {
      for (const [width, alpha] of [
        [9, 0.12],
        [2.6, 0.75],
      ]) {
        ctx.strokeStyle = `rgba(255,160,80,${alpha})`;
        ctx.lineWidth = width;
        ctx.beginPath();
        points.forEach(([x, , z], i) => (i ? ctx.lineTo(u(x), v(z)) : ctx.moveTo(u(x), v(z))));
        ctx.stroke();
      }
    }
    // The river: dark water with a faint sheen on its banks.
    ctx.globalCompositeOperation = "source-over";
    ctx.lineCap = "round";
    for (const [width, color] of [
      [64, "rgba(40,50,96,0.6)"],
      [56, "rgb(12,18,44)"],
    ]) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      for (let x = -4600; x <= 5000; x += 40) (x === -4600 ? ctx.moveTo : ctx.lineTo).call(ctx, u(x), v(riverZ(x)));
      ctx.stroke();
    }
    // Mip levels, so far rows stay calm instead of shimmering.
    const levels = [canvas];
    while (levels[levels.length - 1].width > 128) {
      const prev = levels[levels.length - 1];
      const next = document.createElement("canvas");
      next.width = prev.width / 2;
      next.height = prev.height / 2;
      const c = next.getContext("2d");
      c.imageSmoothingQuality = "high";
      c.drawImage(prev, 0, 0, next.width, next.height);
      levels.push(next);
    }
    return levels;
  }

  // Camera ------------------------------------------------------------------

  // Key positions of the one continuous move: [t, x, height, z, pitch (deg)].
  const KEYS = [
    [0.0, 0, 1000, -2200, -6],
    [0.2, 0, 780, -1500, -10],
    [0.32, 0, 520, -820, -16],
    [0.42, 0, 380, -380, -24],
    [0.58, 0, 210, 600, -30],
    [0.7, 0, 70, 1440, -26],
    [0.8, 1.5, 14, 1858, -9],
    [0.88, 6.2, 3.4, 1972, -1.5],
    [0.94, TARGET.x, 2.05, 1999.6, 0],
  ];

  // Catmull-Rom through the keys, heights in log space so the descent eases.
  function camera(t) {
    const tt = Math.min(t, KEYS[KEYS.length - 1][0]);
    let i = 0;
    while (i < KEYS.length - 2 && tt > KEYS[i + 1][0]) i += 1;
    const k0 = KEYS[Math.max(0, i - 1)];
    const k1 = KEYS[i];
    const k2 = KEYS[i + 1];
    const k3 = KEYS[Math.min(KEYS.length - 1, i + 2)];
    const u = (tt - k1[0]) / (k2[0] - k1[0]);
    const cr = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);
    const value = (index, log) => {
      const f = (k) => (log ? Math.log(k[index]) : k[index]);
      const v = cr(f(k0), f(k1), f(k2), f(k3));
      return log ? Math.exp(v) : v;
    };
    return { x: value(1, false), y: value(2, true), z: value(3, false), pitch: (value(4, false) * Math.PI) / 180 };
  }

  function projector(cam, width, height, fovY) {
    const f = height / 2 / Math.tan(fovY / 2);
    const cp = Math.cos(cam.pitch);
    const sp = Math.sin(cam.pitch);
    const cx = width / 2;
    const cy = height / 2;
    // forward = (0, sp, cp), up = (0, cp, -sp), right = (1, 0, 0)
    const view = (x, y, z) => {
      const dx = x - cam.x;
      const dy = y - cam.y;
      const dz = z - cam.z;
      return [dx, dy * cp - dz * sp, dy * sp + dz * cp];
    };
    const screen = ([vx, vy, vz]) => [cx + (f * vx) / vz, cy - (f * vy) / vz, vz];
    return { f, view, screen, horizon: cy - f * Math.tan(-cam.pitch), scale: height / 900 };
  }

  // Drawing ------------------------------------------------------------------

  function sky(ctx, w, h, below, horizon) {
    const g = ctx.createLinearGradient(0, 0, 0, Math.max(horizon + h * 0.05, h * 0.3));
    g.addColorStop(0, rgba(mixColor([248, 249, 255], [24, 26, 70], below)));
    g.addColorStop(0.6, rgba(mixColor([236, 234, 255], [70, 50, 130], below)));
    g.addColorStop(1, rgba(mixColor([255, 222, 206], [196, 98, 140], below)));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  // The city map in perspective, one screen row at a time (the camera has no roll).
  function ground(ctx, p, cam, w, h, mips, visible) {
    if (p.horizon >= h || visible <= 0) return;
    const cp = Math.cos(cam.pitch);
    const sp = Math.sin(cam.pitch);
    ctx.save();
    ctx.globalAlpha = visible;
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = "rgb(9,12,30)";
    ctx.fillRect(0, Math.max(0, p.horizon), w, h);
    const rowAt = (y) => {
      const yc = h / 2 - y;
      const dy = cp * yc + sp * p.f;
      if (dy >= -1e-6) return null;
      const t = -cam.y / dy;
      return { z: cam.z + t * (-sp * yc + cp * p.f), half: (t * w) / 2 };
    };
    for (let y = Math.max(0, Math.ceil(p.horizon) + 1); y < h; y += 1) {
      const row = rowAt(y + 0.5);
      const next = rowAt(y + 1.5);
      if (!row) continue;
      const metres = Math.max((row.half * 2) / w, next ? Math.abs(row.z - next.z) : 0);
      let level = 0;
      while (level < mips.length - 1 && MAP.size / mips[level].width < metres * 0.8) level += 1;
      const map = mips[level];
      const k = map.width / MAP.size;
      const sy = (row.z - MAP.z0) * k;
      if (sy < 0 || sy >= map.height) continue;
      const sx = (cam.x - row.half - MAP.x0) * k;
      ctx.drawImage(map, sx, sy, row.half * 2 * k, Math.max(1, metres * k), 0, y, w, 1);
    }
    // Haze towards the horizon.
    const top = Math.max(0, p.horizon);
    const haze = ctx.createLinearGradient(0, top, 0, top + h * 0.35);
    haze.addColorStop(0, rgba([168, 92, 150], 0.85));
    haze.addColorStop(0.12, rgba([88, 52, 120], 0.45));
    haze.addColorStop(1, rgba([40, 30, 80], 0));
    ctx.fillStyle = haze;
    ctx.fillRect(0, top, w, h * 0.35);
    ctx.restore();
  }

  function clip(a, b, near) {
    if (a[2] < near && b[2] < near) return null;
    if (a[2] >= near && b[2] >= near) return [a, b];
    const t = (near - a[2]) / (b[2] - a[2]);
    const c = [mix(a[0], b[0], t), mix(a[1], b[1], t), near];
    return a[2] < near ? [c, b] : [a, c];
  }

  function cityLights(ctx, scene, p, w, h, visible) {
    if (visible <= 0) return;
    ctx.globalCompositeOperation = "lighter";
    const colors = [
      [255, 206, 150],
      [255, 70, 80],
      [205, 222, 255],
      [255, 170, 90],
    ];
    for (const light of scene.lights) {
      const v = p.view(light.x, 0, light.z);
      if (v[2] < 3 || v[2] > 1400) continue;
      const [sx, sy, depth] = p.screen(v);
      if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;
      const fog = Math.exp(-depth / 5200) * smooth(1400, 700, depth);
      const size = Math.max(0.9, Math.min(6, (light.size * 1300 * p.scale) / depth));
      ctx.fillStyle = rgba(colors[light.tone], (light.tone === 3 ? 1 : 0.92) * fog * visible);
      ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
    }
    ctx.globalCompositeOperation = "source-over";
  }

  // A soft haze of light over the city centre.
  function cityGlow(ctx, p, w, h, visible) {
    if (visible <= 0) return;
    const v = p.view(TARGET.x, 0, TARGET.z + 400);
    if (v[2] < 10) return;
    const [sx, sy] = p.screen(v);
    const radius = Math.max(w, h) * 0.7;
    const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
    g.addColorStop(0, rgba([255, 130, 120], 0.18 * visible));
    g.addColorStop(1, rgba([255, 130, 120], 0));
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
  }

  function polyline(ctx, p, points, color, alpha, widthAt) {
    for (let i = 0; i < points.length - 1; i += 1) {
      const clipped = clip(p.view(...points[i]), p.view(...points[i + 1]), 1.5);
      if (!clipped) continue;
      const [s0, s1] = clipped.map(p.screen);
      const depth = (s0[2] + s1[2]) / 2;
      ctx.strokeStyle = rgba(color, alpha * Math.exp(-depth / 5600));
      ctx.lineWidth = widthAt(depth);
      ctx.beginPath();
      ctx.moveTo(s0[0], s0[1]);
      ctx.lineTo(s1[0], s1[1]);
      ctx.stroke();
    }
  }

  function routePoints(route, steps = 28) {
    const [x0, z0] = route.from;
    const [x1, z1] = route.to;
    const mx = (x0 + x1) / 2 - (z1 - z0) * route.bend;
    const mz = (z0 + z1) / 2 + (x1 - x0) * route.bend;
    const points = [];
    for (let i = 0; i <= steps; i += 1) {
      const u = i / steps;
      const x = (1 - u) ** 2 * x0 + 2 * (1 - u) * u * mx + u * u * x1;
      const z = (1 - u) ** 2 * z0 + 2 * (1 - u) * u * mz + u * u * z1;
      points.push([x, 2, z]);
    }
    return points;
  }

  function glowDot(ctx, x, y, radius, color, alpha) {
    if (radius <= 0 || alpha <= 0) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, rgba([255, 255, 255], alpha));
    g.addColorStop(0.22, rgba(color, alpha * 0.85));
    g.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function network(ctx, scene, p, t, visible, cam) {
    if (visible <= 0) return;
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    const k = p.scale;
    for (const route of scene.routes) {
      const color = route.color === "red" ? [255, 40, 64] : [228, 236, 255];
      const points = routePoints(route);
      polyline(ctx, p, points, color, 0.16 * visible, (d) => Math.max(2, Math.min(16, (11000 * k) / d)));
      polyline(ctx, p, points, color, 0.8 * visible, (d) => Math.max(0.8, Math.min(4, (2600 * k) / d)));
      for (let n = 0; n < 2; n += 1) {
        const u = (route.phase + n / 2 + t * route.speed * 1.8) % 1;
        const index = u * (points.length - 1);
        const a = points[Math.floor(index)];
        const b = points[Math.min(points.length - 1, Math.floor(index) + 1)];
        const f = index - Math.floor(index);
        const v = p.view(mix(a[0], b[0], f), 3, mix(a[2], b[2], f));
        if (v[2] < 3) continue;
        const [sx, sy, depth] = p.screen(v);
        glowDot(ctx, sx, sy, Math.max(3, Math.min(30, (18000 * k) / depth)), color, 0.95 * visible * Math.exp(-depth / 5600));
      }
    }
    // The backbone: brighter than the other routes, pulses running to the house.
    polyline(ctx, p, scene.backbone, [255, 40, 64], 0.22 * visible, (d) => Math.max(3, Math.min(22, (14000 * k) / d)));
    polyline(ctx, p, scene.backbone, [255, 150, 160], 0.95 * visible, (d) => Math.max(1.1, Math.min(5, (3400 * k) / d)));
    for (let n = 0; n < 7; n += 1) {
      const u = (n / 7 + t * 2.2) % 1;
      const index = u * (scene.backbone.length - 1);
      const a = scene.backbone[Math.floor(index)];
      const b = scene.backbone[Math.min(scene.backbone.length - 1, Math.floor(index) + 1)];
      const f = index - Math.floor(index);
      const v = p.view(mix(a[0], b[0], f), 4, mix(a[2], b[2], f));
      if (v[2] < 3) continue;
      const [sx, sy, depth] = p.screen(v);
      glowDot(ctx, sx, sy, Math.max(4, Math.min(44, (24000 * k) / depth)), [255, 60, 84], 0.95 * visible * Math.exp(-depth / 5600));
    }
    // The street line to the house, on the poles, and the pulse the camera follows.
    const pole = [
      [-5, 5.2, scene.street.from[2]],
      [TARGET.x - WINDOW.width / 2 - 0.6, 3.6, TARGET.z - 0.5],
    ];
    const near = smooth(0.5, 0.75, t);
    const linePts = Array.from({ length: 80 }, (_, i) => pole[0].map((v, j) => mix(v, pole[1][j], i / 79)));
    polyline(ctx, p, linePts, [255, 40, 64], (0.2 + 0.3 * near) * visible, (d) => Math.max(2, Math.min(18, (11000 * k) / d)));
    polyline(ctx, p, linePts, [255, 140, 150], 0.9 * visible, (d) => Math.max(0.9, Math.min(4, (2800 * k) / d)));
    const lead = Math.min(TARGET.z - 0.6, cam.z + mix(320, 26, smooth(0.5, 0.86, t)));
    const along = (lead - pole[0][2]) / (pole[1][2] - pole[0][2]);
    const v = p.view(mix(pole[0][0], pole[1][0], along), mix(pole[0][1], pole[1][1], along), lead);
    if (v[2] > 1) {
      const [sx, sy, depth] = p.screen(v);
      glowDot(ctx, sx, sy, Math.max(7, Math.min(110, (36000 * k) / depth)), [255, 60, 84], visible);
    }
    ctx.globalCompositeOperation = "source-over";
  }

  function quadPath(ctx, s) {
    ctx.beginPath();
    s.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
  }

  function boxFaces(box, cam) {
    const x0 = box.x - box.width / 2;
    const x1 = box.x + box.width / 2;
    const z0 = box.z - box.depth / 2;
    const z1 = box.z + box.depth / 2;
    const y0 = box.base ?? 0;
    const y1 = box.height;
    const quads = [
      { pts: [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]], n: [0, 0, -1], shade: 0.62 },
      { pts: [[x0, y0, z1], [x0, y0, z0], [x0, y1, z0], [x0, y1, z1]], n: [-1, 0, 0], shade: 0.42 },
      { pts: [[x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0]], n: [1, 0, 0], shade: 0.42 },
      { pts: [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], n: [0, 1, 0], shade: 0.78 },
    ];
    return quads.filter((quad) => {
      const c = quad.pts.reduce((acc, pt) => acc.map((v, i) => v + pt[i] / 4), [0, 0, 0]);
      return (cam.x - c[0]) * quad.n[0] + (cam.y - c[1]) * quad.n[1] + (cam.z - c[2]) * quad.n[2] > 0;
    });
  }

  function windowQuad(p, house, win, z) {
    const corners = [
      [house.x + win.x - win.width / 2, win.y - win.height / 2, z],
      [house.x + win.x + win.width / 2, win.y - win.height / 2, z],
      [house.x + win.x + win.width / 2, win.y + win.height / 2, z],
      [house.x + win.x - win.width / 2, win.y + win.height / 2, z],
    ].map((pt) => p.view(...pt));
    if (corners.some((v) => v[2] < 0.05)) return null;
    return corners.map(p.screen);
  }

  function neighbourhood(ctx, scene, p, cam, visible, t, room) {
    if (visible <= 0) return;
    const items = [];
    const push = (box, kind) => {
      for (const quad of boxFaces(box, cam)) {
        const viewPts = quad.pts.map((pt) => p.view(...pt));
        if (viewPts.some((v) => v[2] < 0.05)) continue;
        items.push({ kind, box, quad, s: viewPts.map(p.screen), depth: viewPts.reduce((sum, v) => sum + v[2], 0) / 4 });
      }
    };
    for (const house of scene.houses) push(house, "house");
    push({ ...HOUSE, target: true }, "target");
    push({ ...UPPER, base: HOUSE.height, target: true }, "upper");
    items.sort((a, b) => b.depth - a.depth);
    for (const item of items) {
      const fog = Math.exp(-item.depth / 700);
      if (item.kind === "tree") {
        const [sx, sy] = p.screen(item.v);
        const r = (item.tree.r * p.f) / item.depth;
        if (r > p.f * 0.12) continue;
        const g = ctx.createRadialGradient(sx, sy - r * 0.3, r * 0.1, sx, sy, r);
        g.addColorStop(0, rgba(mixColor([20, 30, 56], [44, 54, 90], 0.5 * fog), visible));
        g.addColorStop(0.85, rgba([10, 14, 30], visible * 0.95));
        g.addColorStop(1, rgba([10, 14, 30], 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      const target = item.kind !== "house";
      const wall = target ? [238, 240, 248] : [150, 158, 196];
      ctx.fillStyle = rgba(mixColor(NAVY, wall, item.quad.shade * (target ? 0.6 : 0.32) * fog), visible);
      quadPath(ctx, item.s);
      ctx.fill();
      if (item.quad.n[2] !== -1) continue;
      const z = item.box.z - item.box.depth / 2 - 0.01;
      if (item.kind === "target") {
        const quad = windowQuad(p, HOUSE, WINDOW, z);
        if (quad) {
          const cx = quad.reduce((sum, q) => sum + q[0], 0) / 4;
          const cy = quad.reduce((sum, q) => sum + q[1], 0) / 4;
          const span = Math.abs(quad[1][0] - quad[0][0]);
          ctx.globalCompositeOperation = "lighter";
          glowDot(ctx, cx, cy, span * 1.6, [255, 170, 110], 0.35 * visible);
          ctx.globalCompositeOperation = "source-over";
          // The living room shows through the big window.
          ctx.save();
          quadPath(ctx, quad);
          ctx.clip();
          // The room fills the window, and becomes the full frame (at the
          // first interior frame's zoom) as the window does.
          const xs = quad.map((q) => q[0]);
          const ys = quad.map((q) => q[1]);
          const width = Math.max(...xs) - Math.min(...xs);
          const height = Math.max(...ys) - Math.min(...ys);
          const frameW = room.width;
          const frameH = room.height;
          const scale = Math.min(1.1, Math.max(width / frameW, height / frameH));
          const settle = smooth(0.6, 1.1, scale);
          const cx2 = mix((Math.max(...xs) + Math.min(...xs)) / 2, frameW / 2, settle);
          const cy2 = mix((Math.max(...ys) + Math.min(...ys)) / 2, frameH / 2, settle);
          ctx.globalAlpha = visible;
          ctx.drawImage(room, cx2 - (frameW * scale) / 2, cy2 - (frameH * scale) / 2, frameW * scale, frameH * scale);
          ctx.restore();
          ctx.strokeStyle = rgba([24, 26, 44], 0.9 * visible);
          ctx.lineWidth = Math.max(1, (0.12 * p.f) / item.depth);
          quadPath(ctx, quad);
          ctx.stroke();
        }
        const door = windowQuad(p, HOUSE, { x: 4.1, y: 1.15, width: 1.2, height: 2.3 }, z);
        if (door) {
          ctx.fillStyle = rgba([40, 44, 70], visible);
          quadPath(ctx, door);
          ctx.fill();
        }
        continue;
      }
      const windows =
        item.kind === "upper"
          ? [
              { x: UPPER.x - HOUSE.x - 2, y: 5.9, width: 2.6, height: 1.5 },
              { x: UPPER.x - HOUSE.x + 2.2, y: 5.9, width: 1.6, height: 1.5 },
            ]
          : [
              { x: -item.box.width * 0.2, y: 1.7, width: 2.4, height: 1.4 },
              { x: item.box.width * 0.24, y: 4.5, width: 1.8, height: 1.2 },
            ];
      windows.forEach((win, index) => {
        const host = item.kind === "upper" ? HOUSE : item.box;
        const quad = windowQuad(p, host, win, z);
        if (!quad) return;
        const on = item.kind === "upper" ? 0.8 : item.box.lit > 0.3 || index === 0 ? 0.7 : 0.12;
        const g = ctx.createLinearGradient(quad[0][0], quad[2][1], quad[1][0], quad[0][1]);
        g.addColorStop(0, rgba([255, 214, 160], on * visible));
        g.addColorStop(1, rgba([255, 150, 92], on * visible));
        ctx.fillStyle = g;
        quadPath(ctx, quad);
        ctx.fill();
      });
    }
    // Street lamps.
    ctx.globalCompositeOperation = "lighter";
    for (const lamp of scene.lamps) {
      const v = p.view(lamp.x, 5.5, lamp.z);
      if (v[2] < 0.5) continue;
      const [sx, sy, depth] = p.screen(v);
      glowDot(ctx, sx, sy, Math.max(2, Math.min(60, (14 * p.f) / depth / 3)), [255, 190, 120], 0.7 * visible * Math.exp(-depth / 900));
    }
    ctx.globalCompositeOperation = "source-over";
  }

  function cloudLayer(ctx, scene, p, w, h, cam) {
    const items = [];
    for (const cloud of scene.clouds) {
      const v = p.view(cloud.x, cloud.y, cloud.z);
      if (v[2] < 8) continue;
      const [sx, sy, depth] = p.screen(v);
      const radius = (cloud.r * p.f) / depth;
      if (sx + radius < 0 || sx - radius > w || sy + radius < 0 || sy - radius > h) continue;
      items.push({ cloud, sx, sy, depth, radius });
    }
    items.sort((a, b) => b.depth - a.depth);
    for (const { cloud, sx, sy, depth, radius } of items) {
      const under = cam.y < cloud.y;
      // Tops warm white in the low sun; undersides violet, lit by the city.
      const light = under ? [150, 112, 176] : [255, 252, 250];
      const shade = under ? [70, 54, 118] : [214, 206, 232];
      const haze = mixColor(under ? [96, 70, 140] : [255, 232, 222], light, Math.exp(-depth / 2600));
      const alpha = cloud.a * Math.exp(-depth / 6500) * (under ? 0.7 : 1);
      const g = ctx.createRadialGradient(sx, sy - radius * 0.35, radius * 0.1, sx, sy, radius);
      g.addColorStop(0, rgba(mixColor(haze, light, 0.5), alpha));
      g.addColorStop(0.55, rgba(mixColor(haze, shade, 0.35), alpha * 0.75));
      g.addColorStop(1, rgba(shade, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // The living room at the end, drawn on its own canvas so the window can show it.
  function drawRoom(room, scene, t, portrait) {
    const ctx = room.getContext("2d");
    const w = room.width;
    const h = room.height;
    const k = h / 900;
    const u = smooth(0.86, 1, t);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    const base = ctx.createLinearGradient(0, 0, w, h * 0.3);
    base.addColorStop(0, rgba([20, 22, 58]));
    base.addColorStop(0.5, rgba([52, 38, 104]));
    base.addColorStop(1, rgba([118, 66, 112]));
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    const lampX = portrait ? w * 0.84 : w * 0.86;
    const lampY = portrait ? h * 0.5 : h * 0.3;
    const lamp = ctx.createRadialGradient(lampX, lampY, 0, lampX, lampY, Math.max(w, h) * 0.62);
    lamp.addColorStop(0, rgba(WARM, 0.8));
    lamp.addColorStop(0.3, rgba([228, 118, 96], 0.32));
    lamp.addColorStop(1, rgba([228, 118, 96], 0));
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = lamp;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
    // Floor and a low cabinet with the glowing point, a TV above it, a sofa in front.
    const floorY = portrait ? h * 0.78 : h * 0.76;
    const floor = ctx.createLinearGradient(0, floorY - h * 0.02, 0, h);
    floor.addColorStop(0, rgba([30, 22, 52], 0));
    floor.addColorStop(0.1, rgba([30, 22, 52], 0.75));
    floor.addColorStop(1, rgba([14, 12, 30], 0.96));
    ctx.fillStyle = floor;
    ctx.fillRect(0, floorY - h * 0.02, w, h);
    const cabW = portrait ? w * 0.62 : w * 0.3;
    const cabX = portrait ? w * 0.3 : w * 0.56;
    const cabY = floorY - h * 0.075;
    ctx.fillStyle = rgba([36, 26, 58], 0.96);
    ctx.beginPath();
    ctx.roundRect(cabX, cabY, cabW, h * 0.075, 6 * k);
    ctx.fill();
    const tvW = cabW * 0.62;
    const tvH = tvW * 0.56;
    const tvX = cabX + cabW * 0.19;
    const tvY = cabY - tvH - h * 0.06;
    const tv = ctx.createLinearGradient(tvX, tvY, tvX + tvW, tvY + tvH);
    tv.addColorStop(0, rgba([96, 80, 220], 0.85));
    tv.addColorStop(0.55, rgba([214, 58, 112], 0.75));
    tv.addColorStop(1, rgba([255, 168, 110], 0.85));
    ctx.fillStyle = rgba([10, 10, 22], 0.95);
    ctx.beginPath();
    ctx.roundRect(tvX - 4 * k, tvY - 4 * k, tvW + 8 * k, tvH + 8 * k, 6 * k);
    ctx.fill();
    ctx.fillStyle = tv;
    ctx.beginPath();
    ctx.roundRect(tvX, tvY, tvW, tvH, 3 * k);
    ctx.fill();
    // Wi-Fi rings from the point on the cabinet, filling the room.
    const ox = cabX + cabW * 0.82;
    const oy = cabY + h * 0.02;
    const maxR = Math.hypot(w, h) * 0.8;
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 7; i += 1) {
      const phase = (u * 1.1 + i / 7) % 1;
      const r = 14 * k + phase * maxR;
      ctx.strokeStyle = rgba(i % 2 ? [255, 255, 255] : [255, 72, 96], (1 - phase) ** 1.7 * 0.55);
      ctx.lineWidth = mix(3.2, 1, phase) * k;
      ctx.beginPath();
      ctx.arc(ox, oy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    glowDot(ctx, ox, oy, 40 * k, [255, 64, 88], 0.95);
    for (const mote of scene.motes) {
      const mx = ((mote.x + mote.drift * u + 1) % 1) * w;
      const my = mote.y * h * 0.85;
      glowDot(ctx, mx, my, mote.r * k * 3, WARM, mote.a);
    }
    ctx.globalCompositeOperation = "source-over";
    // The sofa, dark against the light, seen from behind.
    const sofaW = portrait ? w * 0.82 : w * 0.42;
    const sofaX = portrait ? w * 0.1 : w * 0.46;
    const sofaY = portrait ? h * 0.83 : h * 0.8;
    ctx.fillStyle = rgba([12, 12, 28], 0.97);
    ctx.beginPath();
    ctx.roundRect(sofaX, sofaY, sofaW, h * 0.3, 26 * k);
    ctx.fill();
    ctx.strokeStyle = rgba(WARM, 0.25);
    ctx.lineWidth = 2 * k;
    ctx.beginPath();
    ctx.roundRect(sofaX, sofaY, sofaW, h * 0.3, 26 * k);
    ctx.stroke();
  }

  function vignette(ctx, w, h, strength) {
    if (strength <= 0) return;
    const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.hypot(w, h) * 0.62);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, `rgba(6,8,20,${strength})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  let scene;
  let room;
  let mips;

  function render(canvas, t) {
    scene ??= buildScene();
    mips ??= buildMap(scene);
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const portrait = h > w;
    room ??= document.createElement("canvas");
    if (room.width !== w || room.height !== h) {
      room.width = w;
      room.height = h;
    }
    drawRoom(room, scene, t, portrait);

    const inside = t >= 0.94;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    if (inside) {
      // A last slow push into the room.
      const zoom = mix(1.1, 1, smooth(0.94, 1, t));
      ctx.drawImage(room, (w - w * zoom) / 2, (h - h * zoom) / 2, w * zoom, h * zoom);
      vignette(ctx, w, h, 0.4);
      return;
    }

    const fovY = ((portrait ? 72 : 52) * Math.PI) / 180;
    const cam = camera(t);
    const p = projector(cam, w, h, fovY);
    const below = smooth(CLOUD_TOP - 30, CLOUD_BASE - 40, cam.y);
    const mist = smooth(CLOUD_TOP + 20, CLOUD_TOP - 70, cam.y) * smooth(CLOUD_BASE - 60, CLOUD_BASE + 30, cam.y);
    const city = smooth(0.15, 0.6, below);

    sky(ctx, w, h, below, p.horizon);
    // Below the cloud base the clouds are sky, behind everything on the ground.
    const overhead = cam.y < CLOUD_BASE;
    if (overhead) cloudLayer(ctx, scene, p, w, h, cam);
    // Street-level ground under the map, for when the camera is down among the houses.
    if (p.horizon < h) {
      const top = Math.max(0, p.horizon);
      const street = ctx.createLinearGradient(0, top, 0, h);
      street.addColorStop(0, rgba([70, 44, 96], city));
      street.addColorStop(0.1, rgba([22, 22, 52], city));
      street.addColorStop(1, rgba([8, 10, 24], city));
      ctx.fillStyle = street;
      ctx.fillRect(0, top, w, h - top);
    }
    ground(ctx, p, cam, w, h, mips, city * smooth(10, 55, cam.y));
    cityGlow(ctx, p, w, h, city);
    cityLights(ctx, scene, p, w, h, city * smooth(700, 250, cam.y));
    network(ctx, scene, p, t, city, cam);
    neighbourhood(ctx, scene, p, cam, smooth(320, 90, cam.y), t, room);
    if (!overhead) cloudLayer(ctx, scene, p, w, h, cam);
    if (mist > 0) {
      ctx.fillStyle = rgba(mixColor([252, 250, 255], [206, 196, 236], below), 0.94 * mist);
      ctx.fillRect(0, 0, w, h);
    }
    vignette(ctx, w, h, 0.45 * smooth(0.3, 0.5, t));
  }

  window.TelemartFilm = { render, camera };
})();

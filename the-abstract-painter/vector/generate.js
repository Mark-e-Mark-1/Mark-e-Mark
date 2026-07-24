const VectorGenerator = (() => {
  function createRng(seed) {
    let s = (seed >>> 0) || (Date.now() >>> 0);
    return {
      next() {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      },
      range(min, max) {
        return min + this.next() * (max - min);
      },
      int(min, max) {
        return Math.floor(this.range(min, max + 1));
      },
      pick(arr) {
        return arr[this.int(0, arr.length - 1)];
      },
      chance(p) {
        return this.next() < p;
      },
    };
  }

  function paletteColors(paletteState, rng) {
    const list = [
      ...(paletteState?.swatches || []),
      paletteState?.primary,
      paletteState?.secondary,
    ].filter(Boolean);
    const unique = [...new Set(list)];
    while (unique.length < 8) {
      unique.push(
        `hsl(${rng.int(0, 359)} ${rng.int(45, 85)}% ${rng.int(35, 70)}%)`
      );
    }
    return unique;
  }

  function style(rng, colors, { filledChance = 0.55, strokeChance = 0.85 } = {}) {
    const stroke = rng.chance(strokeChance) ? rng.pick(colors) : null;
    let fill = null;
    if (rng.chance(filledChance)) {
      if (rng.chance(0.28)) {
        fill = VectorModel.makeLinearFill(rng.pick(colors), rng.pick(colors), rng.range(0, 360));
      } else if (rng.chance(0.18)) {
        fill = VectorModel.makeRadialFill(rng.pick(colors), rng.pick(colors));
      } else {
        fill = rng.pick(colors);
      }
    }
    if (!stroke && !fill) fill = rng.pick(colors);
    const profiles = ["constant", "constant", "taper", "taper-rev", "swell"];
    return {
      stroke,
      fill,
      strokeWidth: rng.range(0.8, 8),
      strokeProfile: stroke ? rng.pick(profiles) : "constant",
      opacity: rng.range(0.45, 1),
      strokeLinecap: "round",
      strokeLinejoin: "round",
      dash: rng.chance(0.12) ? [rng.range(4, 14), rng.range(4, 12)] : null,
      shadow: rng.chance(0.2)
        ? {
            dx: rng.range(2, 10),
            dy: rng.range(3, 14),
            blur: rng.range(6, 28),
            color: "#000000",
            opacity: rng.range(0.2, 0.45),
          }
        : null,
    };
  }

  function rotateObj(obj, rng) {
    if (!rng.chance(0.55)) return obj;
    obj.transform.rotation = rng.range(-Math.PI, Math.PI);
    return obj;
  }

  function makeRibbon(w, h, rng, colors) {
    const points = [];
    const n = rng.int(5, 12);
    const y0 = rng.range(h * 0.1, h * 0.9);
    const amp = rng.range(h * 0.05, h * 0.35);
    const startX = rng.range(-w * 0.05, w * 0.2);
    const endX = rng.range(w * 0.8, w * 1.05);
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const x = startX + (endX - startX) * t;
      const y = y0 + Math.sin(t * Math.PI * rng.range(1, 3) + rng.range(0, 6)) * amp;
      const handle = (endX - startX) / (n - 1) * 0.35;
      points.push({
        x,
        y,
        in: i === 0 ? null : { x: -handle, y: rng.range(-amp * 0.2, amp * 0.2) },
        out: i === n - 1 ? null : { x: handle, y: rng.range(-amp * 0.2, amp * 0.2) },
      });
    }
    return VectorModel.createPathObject(points, {
      ...style(rng, colors, { filledChance: 0.15, strokeChance: 1 }),
      strokeWidth: rng.range(3, 28),
      closed: false,
    });
  }

  function makeBlobPath(w, h, rng, colors) {
    const cx = rng.range(w * 0.15, w * 0.85);
    const cy = rng.range(h * 0.15, h * 0.85);
    const rx = rng.range(Math.min(w, h) * 0.04, Math.min(w, h) * 0.22);
    const ry = rx * rng.range(0.6, 1.4);
    const lobes = rng.int(5, 9);
    const points = [];
    for (let i = 0; i < lobes; i++) {
      const a = (i / lobes) * Math.PI * 2;
      const rScale = rng.range(0.55, 1.15);
      const x = cx + Math.cos(a) * rx * rScale;
      const y = cy + Math.sin(a) * ry * rScale;
      const tang = ((Math.PI * 2) / lobes) * 0.28 * Math.max(rx, ry);
      points.push({
        x,
        y,
        in: { x: Math.cos(a - Math.PI / 2) * tang, y: Math.sin(a - Math.PI / 2) * tang },
        out: { x: Math.cos(a + Math.PI / 2) * tang, y: Math.sin(a + Math.PI / 2) * tang },
      });
    }
    return VectorModel.createPathObject(points, {
      ...style(rng, colors, { filledChance: 0.85, strokeChance: 0.5 }),
      closed: true,
    });
  }

  function makeOrbitRings(w, h, rng, colors) {
    const objects = [];
    const cx = rng.range(w * 0.25, w * 0.75);
    const cy = rng.range(h * 0.25, h * 0.75);
    const count = rng.int(3, 7);
    for (let i = 0; i < count; i++) {
      const r = rng.range(Math.min(w, h) * 0.06, Math.min(w, h) * 0.42) * (0.4 + i / count);
      const thick = rng.range(1.5, 6);
      objects.push(
        VectorModel.createEllipseObject(cx - r, cy - r, r * 2, r * 2, {
          ...style(rng, colors, { filledChance: 0.08, strokeChance: 1 }),
          strokeWidth: thick,
          fill: null,
        })
      );
    }
    return objects;
  }

  function makeConstellation(w, h, rng, colors) {
    const objects = [];
    const n = rng.int(6, 14);
    const pts = [];
    for (let i = 0; i < n; i++) {
      pts.push({ x: rng.range(w * 0.1, w * 0.9), y: rng.range(h * 0.1, h * 0.9) });
    }
    for (let i = 0; i < pts.length - 1; i++) {
      if (!rng.chance(0.7)) continue;
      const a = pts[i];
      const b = rng.pick(pts);
      if (a === b) continue;
      objects.push(
        VectorModel.createLineObject(a.x, a.y, b.x, b.y, {
          ...style(rng, colors, { filledChance: 0, strokeChance: 1 }),
          strokeWidth: rng.range(0.8, 3),
        })
      );
    }
    pts.forEach((p) => {
      const r = rng.range(3, 14);
      objects.push(
        VectorModel.createEllipseObject(p.x - r, p.y - r, r * 2, r * 2, {
          ...style(rng, colors, { filledChance: 0.9, strokeChance: 0.3 }),
          strokeWidth: 1,
        })
      );
    });
    return objects;
  }

  function makeShapeBurst(w, h, rng, colors) {
    const objects = [];
    const count = rng.int(8, 22);
    for (let i = 0; i < count; i++) {
      const kind = rng.pick(["ellipse", "rect", "round", "star", "poly", "line"]);
      const s = style(rng, colors);
      const x = rng.range(0, w);
      const y = rng.range(0, h);
      const size = rng.range(Math.min(w, h) * 0.03, Math.min(w, h) * 0.28);
      let obj = null;
      if (kind === "ellipse") {
        obj = VectorModel.createEllipseObject(x - size, y - size * rng.range(0.5, 1.2), size * 2, size * 2 * rng.range(0.5, 1.3), s);
      } else if (kind === "rect") {
        obj = VectorModel.createRectObject(x - size, y - size * 0.6, size * 2, size * 1.2, s);
      } else if (kind === "round") {
        obj = VectorModel.createRoundRectObject(x - size, y - size * 0.7, size * 2, size * 1.4, size * rng.range(0.1, 0.45), s);
      } else if (kind === "star") {
        obj = VectorModel.createStarObject(x, y, size, size * rng.range(0.3, 0.55), rng.int(4, 9), s);
      } else if (kind === "poly") {
        obj = VectorModel.createRegularPolygonObject(x, y, size, rng.int(3, 8), s);
      } else {
        obj = VectorModel.createLineObject(
          x,
          y,
          x + rng.range(-size * 2, size * 2),
          y + rng.range(-size * 2, size * 2),
          { ...s, fill: null }
        );
      }
      objects.push(rotateObj(obj, rng));
    }
    return objects;
  }

  function makeSpiral(w, h, rng, colors) {
    const cx = rng.range(w * 0.3, w * 0.7);
    const cy = rng.range(h * 0.3, h * 0.7);
    const turns = rng.range(2.2, 5.5);
    const maxR = rng.range(Math.min(w, h) * 0.15, Math.min(w, h) * 0.45);
    const steps = rng.int(40, 90);
    const points = [];
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const a = t * turns * Math.PI * 2 + rng.range(0, Math.PI);
      const r = maxR * t;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      points.push({ x, y, in: null, out: null });
    }
    // Light smoothing handles
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const next = points[i + 1];
      points[i].in = { x: (prev.x - next.x) * 0.15, y: (prev.y - next.y) * 0.15 };
      points[i].out = { x: (next.x - prev.x) * 0.15, y: (next.y - prev.y) * 0.15 };
    }
    return VectorModel.createPathObject(points, {
      ...style(rng, colors, { filledChance: 0, strokeChance: 1 }),
      strokeWidth: rng.range(2, 10),
      strokeProfile: rng.pick(["constant", "taper", "swell"]),
      closed: false,
    });
  }

  /**
   * Build a random abstract composition as vector objects.
   * @returns {{ objects: object[], styleName: string }}
   */
  function generate(width, height, paletteState, seed) {
    const rng = createRng(seed == null ? (Math.random() * 1e9) >>> 0 : seed);
    const colors = paletteColors(paletteState || Palette.getState(), rng);
    const styleName = rng.pick([
      "ribbons",
      "orbits",
      "constellation",
      "burst",
      "spirals",
      "blobs",
      "mixed",
    ]);
    const objects = [];

    const pushMany = (arr) => {
      (Array.isArray(arr) ? arr : [arr]).forEach((o) => {
        if (o) objects.push(o);
      });
    };

    if (styleName === "ribbons" || styleName === "mixed") {
      const n = styleName === "mixed" ? rng.int(2, 5) : rng.int(4, 9);
      for (let i = 0; i < n; i++) pushMany(makeRibbon(width, height, rng, colors));
    }
    if (styleName === "orbits" || styleName === "mixed") {
      pushMany(makeOrbitRings(width, height, rng, colors));
      if (rng.chance(0.5)) pushMany(makeOrbitRings(width, height, rng, colors));
    }
    if (styleName === "constellation" || (styleName === "mixed" && rng.chance(0.6))) {
      pushMany(makeConstellation(width, height, rng, colors));
    }
    if (styleName === "burst" || styleName === "mixed") {
      pushMany(makeShapeBurst(width, height, rng, colors));
    }
    if (styleName === "spirals" || (styleName === "mixed" && rng.chance(0.7))) {
      const n = styleName === "spirals" ? rng.int(2, 5) : rng.int(1, 3);
      for (let i = 0; i < n; i++) pushMany(makeSpiral(width, height, rng, colors));
    }
    if (styleName === "blobs" || (styleName === "mixed" && rng.chance(0.75))) {
      const n = styleName === "blobs" ? rng.int(6, 14) : rng.int(3, 8);
      for (let i = 0; i < n; i++) pushMany(makeBlobPath(width, height, rng, colors));
    }

    // Always sprinkle a few accent shapes
    if (rng.chance(0.8)) {
      for (let i = 0; i < rng.int(2, 6); i++) {
        const x = rng.range(width * 0.1, width * 0.9);
        const y = rng.range(height * 0.1, height * 0.9);
        const r = rng.range(8, Math.min(width, height) * 0.08);
        pushMany(
          rotateObj(
            VectorModel.createStarObject(x, y, r, r * 0.45, rng.int(4, 8), style(rng, colors)),
            rng
          )
        );
      }
    }

    return { objects, styleName };
  }

  /** Saturated accents + black & white for high-contrast geometric work. */
  function geometricPalette(paletteState, rng) {
    const vivid = [
      ...(paletteState?.swatches || []),
      paletteState?.primary,
      paletteState?.secondary,
    ].filter(Boolean);
    const extras = [];
    for (let i = 0; i < 6; i++) {
      extras.push(`hsl(${rng.int(0, 359)} ${rng.int(70, 100)}% ${rng.int(42, 62)}%)`);
    }
    const bw = ["#000000", "#ffffff", "#111111", "#f5f5f5", "#222222", "#e8e8e8"];
    // Bias list: roughly half color, half B&W
    return [...vivid, ...extras, ...bw, ...bw];
  }

  function geoStyle(rng, colors, { filledChance = 0.75, strokeChance = 0.55, mono = false } = {}) {
    const bwPool = ["#000000", "#ffffff", "#111111", "#f5f5f5", "#222222", "#e8e8e8"];
    const use = mono ? bwPool : colors;
    const stroke = rng.chance(strokeChance) ? rng.pick(use) : null;
    let fill = rng.chance(filledChance) ? rng.pick(use) : null;
    if (!stroke && !fill) fill = rng.pick(use);
    // Prefer solid fills for hard geometry (occasional gradient)
    if (fill && !mono && rng.chance(0.18)) {
      fill = VectorModel.makeLinearFill(rng.pick(use), rng.pick(use), rng.pick([0, 45, 90, 135]));
    }
    return {
      stroke,
      fill,
      strokeWidth: rng.range(1.2, 7),
      strokeProfile: "constant",
      opacity: rng.range(0.85, 1),
      strokeLinecap: "square",
      strokeLinejoin: "miter",
      dash: rng.chance(0.1) ? [rng.range(3, 10), rng.range(3, 8)] : null,
      shadow: null,
    };
  }

  function placeGeoInCell(cell, rng, colors, motif) {
    const pad = Math.min(cell.w, cell.h) * 0.06;
    const x0 = cell.x + pad;
    const y0 = cell.y + pad;
    const cw = cell.w - pad * 2;
    const ch = cell.h - pad * 2;
    const objects = [];
    const mono = motif === "bw";
    const s = () => geoStyle(rng, colors, { mono });

    // Background panel for the quadrant
    objects.push(
      VectorModel.createRectObject(cell.x, cell.y, cell.w, cell.h, {
        fill: mono
          ? rng.pick(["#000000", "#ffffff"])
          : rng.pick(colors),
        stroke: rng.chance(0.35) ? rng.pick(["#000000", "#ffffff"]) : null,
        strokeWidth: rng.range(2, 8),
        strokeProfile: "constant",
        opacity: 1,
      })
    );

    const count = rng.int(5, 14);
    for (let i = 0; i < count; i++) {
      const kind = rng.pick(["ellipse", "rect", "round", "star", "poly", "line", "square"]);
      const size = rng.range(Math.min(cw, ch) * 0.08, Math.min(cw, ch) * 0.55);
      const cx = x0 + rng.range(0, Math.max(1, cw));
      const cy = y0 + rng.range(0, Math.max(1, ch));
      const styleOpts = s();
      let obj = null;

      if (kind === "ellipse") {
        const rw = size * rng.range(0.6, 1.4);
        const rh = size * rng.range(0.6, 1.4);
        obj = VectorModel.createEllipseObject(cx - rw / 2, cy - rh / 2, rw, rh, styleOpts);
      } else if (kind === "square") {
        obj = VectorModel.createRectObject(cx - size / 2, cy - size / 2, size, size, styleOpts);
      } else if (kind === "rect") {
        obj = VectorModel.createRectObject(
          cx - size * rng.range(0.4, 0.9),
          cy - size * rng.range(0.25, 0.55),
          size * rng.range(0.8, 1.8),
          size * rng.range(0.35, 0.9),
          styleOpts
        );
      } else if (kind === "round") {
        const rw = size * rng.range(0.9, 1.6);
        const rh = size * rng.range(0.5, 1.1);
        obj = VectorModel.createRoundRectObject(
          cx - rw / 2,
          cy - rh / 2,
          rw,
          rh,
          Math.min(rw, rh) * rng.range(0.12, 0.4),
          styleOpts
        );
      } else if (kind === "star") {
        obj = VectorModel.createStarObject(cx, cy, size * 0.55, size * rng.range(0.18, 0.32), rng.int(4, 8), styleOpts);
      } else if (kind === "poly") {
        obj = VectorModel.createRegularPolygonObject(cx, cy, size * 0.5, rng.int(3, 8), styleOpts);
      } else {
        const ang = rng.range(0, Math.PI * 2);
        const len = size * rng.range(0.8, 2.2);
        obj = VectorModel.createLineObject(
          cx,
          cy,
          cx + Math.cos(ang) * len,
          cy + Math.sin(ang) * len,
          { ...styleOpts, fill: null, stroke: styleOpts.stroke || rng.pick(colors), strokeWidth: rng.range(2, 10) }
        );
      }

      if (obj && kind !== "line" && rng.chance(0.4)) {
        obj.transform.rotation = rng.pick([0, Math.PI / 4, Math.PI / 2, -Math.PI / 4, Math.PI / 6, -Math.PI / 6]);
      }
      if (obj) objects.push(obj);
    }

    // Hard divider accents along cell edges (black/white bars)
    if (rng.chance(0.55)) {
      const thick = rng.range(3, 12);
      const ink = rng.pick(["#000000", "#ffffff"]);
      if (rng.chance(0.5)) {
        objects.push(
          VectorModel.createRectObject(cell.x, cell.y + cell.h * rng.range(0.2, 0.8), cell.w, thick, {
            fill: ink,
            stroke: null,
            opacity: 1,
          })
        );
      } else {
        objects.push(
          VectorModel.createRectObject(cell.x + cell.w * rng.range(0.2, 0.8), cell.y, thick, cell.h, {
            fill: ink,
            stroke: null,
            opacity: 1,
          })
        );
      }
    }

    return objects;
  }

  function buildQuadrants(width, height, rng) {
    const layout = rng.pick(["2x2", "2x3", "3x2", "3x3", "2x2-split", "asymmetric"]);
    const cells = [];
    const gap = 0;

    if (layout === "2x2") {
      const cols = 2;
      const rows = 2;
      const cw = width / cols;
      const ch = height / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({ x: c * cw + gap, y: r * ch + gap, w: cw - gap, h: ch - gap });
        }
      }
    } else if (layout === "2x3") {
      const cw = width / 3;
      const ch = height / 2;
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 3; c++) {
          cells.push({ x: c * cw, y: r * ch, w: cw, h: ch });
        }
      }
    } else if (layout === "3x2") {
      const cw = width / 2;
      const ch = height / 3;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 2; c++) {
          cells.push({ x: c * cw, y: r * ch, w: cw, h: ch });
        }
      }
    } else if (layout === "3x3") {
      const cw = width / 3;
      const ch = height / 3;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          cells.push({ x: c * cw, y: r * ch, w: cw, h: ch });
        }
      }
    } else if (layout === "2x2-split") {
      // Four main quadrants; one randomly subdivided into two
      const midX = width * rng.range(0.4, 0.6);
      const midY = height * rng.range(0.4, 0.6);
      const base = [
        { x: 0, y: 0, w: midX, h: midY },
        { x: midX, y: 0, w: width - midX, h: midY },
        { x: 0, y: midY, w: midX, h: height - midY },
        { x: midX, y: midY, w: width - midX, h: height - midY },
      ];
      const splitIdx = rng.int(0, 3);
      base.forEach((cell, i) => {
        if (i !== splitIdx) {
          cells.push(cell);
          return;
        }
        if (rng.chance(0.5)) {
          const half = cell.w / 2;
          cells.push({ x: cell.x, y: cell.y, w: half, h: cell.h });
          cells.push({ x: cell.x + half, y: cell.y, w: cell.w - half, h: cell.h });
        } else {
          const half = cell.h / 2;
          cells.push({ x: cell.x, y: cell.y, w: cell.w, h: half });
          cells.push({ x: cell.x, y: cell.y + half, w: cell.w, h: cell.h - half });
        }
      });
    } else {
      // Asymmetric: 4–7 irregular panels via recursive splits
      const queue = [{ x: 0, y: 0, w: width, h: height, depth: 0 }];
      while (queue.length && cells.length + queue.length < 8) {
        const cell = queue.shift();
        if (cell.depth >= 2 || (cell.depth >= 1 && rng.chance(0.35)) || Math.min(cell.w, cell.h) < Math.min(width, height) * 0.18) {
          cells.push({ x: cell.x, y: cell.y, w: cell.w, h: cell.h });
          continue;
        }
        if (rng.chance(0.5)) {
          const cut = cell.w * rng.range(0.35, 0.65);
          queue.push({ x: cell.x, y: cell.y, w: cut, h: cell.h, depth: cell.depth + 1 });
          queue.push({ x: cell.x + cut, y: cell.y, w: cell.w - cut, h: cell.h, depth: cell.depth + 1 });
        } else {
          const cut = cell.h * rng.range(0.35, 0.65);
          queue.push({ x: cell.x, y: cell.y, w: cell.w, h: cut, depth: cell.depth + 1 });
          queue.push({ x: cell.x, y: cell.y + cut, w: cell.w, h: cell.h - cut, depth: cell.depth + 1 });
        }
      }
      queue.forEach((c) => cells.push({ x: c.x, y: c.y, w: c.w, h: c.h }));
    }

    // Guarantee at least 4 regions
    while (cells.length < 4) {
      const i = rng.int(0, cells.length - 1);
      const cell = cells.splice(i, 1)[0];
      if (cell.w >= cell.h) {
        const half = cell.w / 2;
        cells.push({ x: cell.x, y: cell.y, w: half, h: cell.h });
        cells.push({ x: cell.x + half, y: cell.y, w: cell.w - half, h: cell.h });
      } else {
        const half = cell.h / 2;
        cells.push({ x: cell.x, y: cell.y, w: cell.w, h: half });
        cells.push({ x: cell.x, y: cell.y + half, w: cell.w, h: cell.h - half });
      }
    }

    return { cells, layout };
  }

  /**
   * Geometric-only abstract: canvas split into 4+ quadrants, color + B&W.
   * @returns {{ objects: object[], styleName: string, layout: string, quadrantCount: number }}
   */
  function generateGeometric(width, height, paletteState, seed) {
    const rng = createRng(seed == null ? (Math.random() * 1e9) >>> 0 : seed);
    const colors = geometricPalette(paletteState || Palette.getState(), rng);
    const { cells, layout } = buildQuadrants(width, height, rng);
    const motifs = ["color", "bw", "color", "mixed", "color", "bw"];
    const objects = [];

    cells.forEach((cell, i) => {
      const motif = motifs[i % motifs.length];
      const resolved = motif === "mixed" ? (rng.chance(0.5) ? "color" : "bw") : motif;
      placeGeoInCell(cell, rng, colors, resolved).forEach((o) => objects.push(o));
    });

    // Global black/white grid lines to reinforce quadrant structure
    const ink = rng.pick(["#000000", "#ffffff"]);
    const lineW = rng.range(2, 6);
    const xs = [...new Set(cells.flatMap((c) => [c.x, c.x + c.w]))].sort((a, b) => a - b);
    const ys = [...new Set(cells.flatMap((c) => [c.y, c.y + c.h]))].sort((a, b) => a - b);
    xs.forEach((x) => {
      if (x <= 1 || x >= width - 1) return;
      objects.push(
        VectorModel.createRectObject(x - lineW / 2, 0, lineW, height, {
          fill: ink,
          stroke: null,
          opacity: 1,
        })
      );
    });
    ys.forEach((y) => {
      if (y <= 1 || y >= height - 1) return;
      objects.push(
        VectorModel.createRectObject(0, y - lineW / 2, width, lineW, {
          fill: ink,
          stroke: null,
          opacity: 1,
        })
      );
    });

    return {
      objects,
      styleName: "geometric",
      layout,
      quadrantCount: cells.length,
    };
  }

  function graffitiPalette(paletteState, rng) {
    const street = [
      "#ff2d55",
      "#ffcc00",
      "#00e5ff",
      "#39ff14",
      "#ff6b00",
      "#c77dff",
      "#ffffff",
      "#111111",
      "#ff0080",
      "#00ff9f",
    ];
    const fromDoc = [
      ...(paletteState?.swatches || []),
      paletteState?.primary,
      paletteState?.secondary,
    ].filter(Boolean);
    return [...street, ...fromDoc, ...street];
  }

  function paintStyle(rng, colors, { outline = true, fillChance = 0.95 } = {}) {
    const fill = rng.chance(fillChance) ? rng.pick(colors) : null;
    const stroke = outline ? "#0a0a0a" : rng.chance(0.4) ? rng.pick(colors) : null;
    return {
      fill,
      stroke,
      strokeWidth: outline ? rng.range(3, 10) : rng.range(1.5, 5),
      strokeProfile: "constant",
      opacity: rng.range(0.88, 1),
      strokeLinecap: "round",
      strokeLinejoin: "round",
      dash: null,
      shadow: rng.chance(0.25)
        ? { dx: rng.range(2, 8), dy: rng.range(3, 10), blur: rng.range(0, 4), color: "#000000", opacity: 0.55 }
        : null,
    };
  }

  function makeBrickWall(width, height, rng) {
    const objects = [];
    const mortar = rng.pick(["#2a2a2a", "#1c1c1c", "#333028", "#252525"]);
    objects.push(
      VectorModel.createRectObject(0, 0, width, height, {
        fill: mortar,
        stroke: null,
        opacity: 1,
      })
    );

    let brickH = rng.range(height * 0.055, height * 0.1);
    let brickW = brickH * rng.range(2.0, 2.8);
    const approx = Math.ceil((width / brickW) * (height / brickH));
    if (approx > 140) {
      const scale = Math.sqrt(approx / 120);
      brickH *= scale;
      brickW *= scale;
    }
    const brickColors = ["#6b3f2a", "#8a5240", "#5c4033", "#7a4a3a", "#4a3428", "#9a6b55", "#3d3d3d", "#555555"];
    let row = 0;
    for (let y = 0; y < height + brickH; y += brickH + 3) {
      const offset = row % 2 === 0 ? 0 : -brickW * 0.5;
      for (let x = offset; x < width + brickW; x += brickW + 3) {
        if (rng.chance(0.12)) continue;
        objects.push(
          VectorModel.createRectObject(x, y, brickW - 1, brickH - 1, {
            fill: rng.pick(brickColors),
            stroke: "#1a1a1a",
            strokeWidth: 1,
            opacity: rng.range(0.85, 1),
          })
        );
      }
      row++;
    }

    // Window / door cutouts — dark panels like building faces
    const facadeCount = rng.int(1, 4);
    for (let i = 0; i < facadeCount; i++) {
      const fw = width * rng.range(0.12, 0.35);
      const fh = height * rng.range(0.2, 0.55);
      const fx = rng.range(0, Math.max(1, width - fw));
      const fy = rng.range(height * 0.05, Math.max(height * 0.05, height - fh - height * 0.05));
      objects.push(
        VectorModel.createRectObject(fx, fy, fw, fh, {
          fill: rng.pick(["#0d0d12", "#121820", "#1a1520", "#0a0a0a"]),
          stroke: "#000000",
          strokeWidth: 3,
          opacity: 0.92,
        })
      );
      // Window panes
      if (rng.chance(0.7)) {
        const cols = rng.int(2, 4);
        const rows = rng.int(2, 5);
        const pw = fw / cols;
        const ph = fh / rows;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            objects.push(
              VectorModel.createRectObject(fx + c * pw + 3, fy + r * ph + 3, pw - 6, ph - 6, {
                fill: rng.chance(0.15)
                  ? rng.pick(["#ffe08a", "#88cfff", "#ffb070"])
                  : rng.pick(["#1a2230", "#101820", "#162030"]),
                stroke: "#000000",
                strokeWidth: 1.5,
                opacity: 0.95,
              })
            );
          }
        }
      }
    }

    // Concrete / plywood patch
    if (rng.chance(0.6)) {
      const pw = width * rng.range(0.25, 0.55);
      const ph = height * rng.range(0.2, 0.4);
      objects.push(
        VectorModel.createRectObject(
          rng.range(0, width - pw),
          rng.range(0, height - ph),
          pw,
          ph,
          {
            fill: rng.pick(["#c4c0b4", "#a8a49a", "#d0ccc0", "#8e8a80"]),
            stroke: "#333333",
            strokeWidth: 2,
            opacity: 0.9,
          }
        )
      );
    }

    return objects;
  }

  function makeSprayCloud(cx, cy, radius, color, rng) {
    const objects = [];
    const n = rng.int(18, 45);
    for (let i = 0; i < n; i++) {
      const a = rng.range(0, Math.PI * 2);
      const d = rng.range(0, radius) * Math.sqrt(rng.next());
      const r = rng.range(radius * 0.04, radius * 0.22);
      objects.push(
        VectorModel.createEllipseObject(cx + Math.cos(a) * d - r, cy + Math.sin(a) * d - r, r * 2, r * 2, {
          fill: color,
          stroke: null,
          opacity: rng.range(0.15, 0.55),
        })
      );
    }
    return objects;
  }

  function makeDrip(x, y, length, color, rng) {
    const objects = [];
    const w = rng.range(4, 14);
    objects.push(
      VectorModel.createRoundRectObject(x - w / 2, y, w, length, w * 0.45, {
        fill: color,
        stroke: null,
        opacity: rng.range(0.7, 1),
      })
    );
    const tip = rng.range(w * 0.7, w * 1.4);
    objects.push(
      VectorModel.createEllipseObject(x - tip / 2, y + length - tip * 0.2, tip, tip, {
        fill: color,
        stroke: null,
        opacity: 1,
      })
    );
    return objects;
  }

  function makeBubbleLetter(cx, cy, size, color, rng) {
    // Fat rounded “throw-up” blob with hard outline
    const objects = [];
    const outline = paintStyle(rng, [color], { outline: true });
    outline.fill = color;
    outline.stroke = "#0a0a0a";
    outline.strokeWidth = Math.max(4, size * 0.08);
    const kind = rng.pick(["ellipse", "round", "poly", "star"]);
    if (kind === "ellipse") {
      objects.push(
        VectorModel.createEllipseObject(cx - size * 0.55, cy - size * 0.45, size * 1.1, size * 0.9, outline)
      );
    } else if (kind === "round") {
      objects.push(
        VectorModel.createRoundRectObject(
          cx - size * 0.55,
          cy - size * 0.4,
          size * 1.1,
          size * 0.8,
          size * 0.25,
          outline
        )
      );
    } else if (kind === "poly") {
      objects.push(VectorModel.createRegularPolygonObject(cx, cy, size * 0.5, rng.int(3, 6), outline));
    } else {
      objects.push(VectorModel.createStarObject(cx, cy, size * 0.5, size * 0.28, rng.int(4, 6), outline));
    }
    // Inner highlight
    if (rng.chance(0.65)) {
      objects.push(
        VectorModel.createEllipseObject(cx - size * 0.25, cy - size * 0.28, size * 0.22, size * 0.14, {
          fill: "#ffffff",
          stroke: null,
          opacity: 0.55,
        })
      );
    }
    return objects;
  }

  function makeWildstylePath(x, y, w, h, color, rng) {
    const points = [];
    const segs = rng.int(5, 9);
    for (let i = 0; i < segs; i++) {
      const t = i / (segs - 1);
      const px = x + t * w + rng.range(-h * 0.15, h * 0.15);
      const py = y + h * 0.5 + Math.sin(t * Math.PI * rng.range(1.5, 3) + rng.range(0, 4)) * h * 0.45;
      const handle = (w / (segs - 1)) * 0.4;
      points.push({
        x: px,
        y: py,
        in: i === 0 ? null : { x: -handle, y: rng.range(-h * 0.2, h * 0.2) },
        out: i === segs - 1 ? null : { x: handle, y: rng.range(-h * 0.2, h * 0.2) },
      });
    }
    return VectorModel.createPathObject(points, {
      stroke: color,
      fill: null,
      strokeWidth: rng.range(8, 22),
      strokeProfile: rng.pick(["constant", "swell", "taper"]),
      strokeLinecap: "round",
      strokeLinejoin: "round",
      opacity: 1,
      closed: false,
      shadow: { dx: 3, dy: 4, blur: 0, color: "#000000", opacity: 0.7 },
    });
  }

  function makeTagText(x, y, colors, rng) {
    const tags = [
      "ZONE",
      "BLAST",
      "KID",
      "ACE",
      "NOIR",
      "FLUX",
      "REBEL",
      "SPRAY",
      "WALL",
      "CITY",
      "NEON",
      "BOMB",
      "CREW",
      "INK",
      "RIOT",
      "VANDAL",
      "SKETCH",
      "URBAN",
    ];
    const word = rng.pick(tags) + (rng.chance(0.35) ? rng.pick(["!", ".", "88", "01", ""]) : "");
    const fill = rng.pick(colors);
    const obj = VectorModel.createTextObject(x, y, word, {
      fill,
      fontSize: rng.range(28, 96),
      fontFamily: rng.pick([
        "Impact, Haettenschweiler, 'Arial Black', sans-serif",
        "'Arial Black', Gadget, sans-serif",
        "Oswald, Montserrat, 'Arial Narrow', sans-serif",
        "Courier New, monospace",
      ]),
      fontWeight: "900",
      textAlign: rng.pick(["left", "center"]),
      opacity: 1,
    });
    if (rng.chance(0.55)) {
      obj.transform.rotation = rng.range(-0.35, 0.35);
    }
    return obj;
  }

  function makeArrow(x, y, size, color, rng) {
    const dir = rng.pick([-1, 1]);
    const points = [
      { x: x, y: y, in: null, out: null },
      { x: x + size * 0.55 * dir, y: y - size * 0.15, in: null, out: null },
      { x: x + size * 0.55 * dir, y: y - size * 0.35, in: null, out: null },
      { x: x + size * dir, y: y, in: null, out: null },
      { x: x + size * 0.55 * dir, y: y + size * 0.35, in: null, out: null },
      { x: x + size * 0.55 * dir, y: y + size * 0.15, in: null, out: null },
    ];
    return VectorModel.createPathObject(points, {
      ...paintStyle(rng, [color]),
      fill: color,
      stroke: "#0a0a0a",
      strokeWidth: 3,
      closed: true,
    });
  }

  /**
   * Street graffiti on a wall/building facade.
   * @returns {{ objects: object[], styleName: string }}
   */
  function generateGraffiti(width, height, paletteState, seed) {
    const rng = createRng(seed == null ? (Math.random() * 1e9) >>> 0 : seed);
    const colors = graffitiPalette(paletteState || Palette.getState(), rng);
    const objects = [];
    const push = (arr) => {
      (Array.isArray(arr) ? arr : [arr]).forEach((o) => {
        if (o) objects.push(o);
      });
    };

    // Wall / building base
    push(makeBrickWall(width, height, rng));

    // Background wash / rollers
    for (let i = 0; i < rng.int(2, 5); i++) {
      const ww = width * rng.range(0.2, 0.55);
      const wh = height * rng.range(0.15, 0.4);
      push(
        VectorModel.createRectObject(
          rng.range(-ww * 0.1, width - ww * 0.7),
          rng.range(0, height - wh),
          ww,
          wh,
          {
            fill: rng.pick(colors),
            stroke: null,
            opacity: rng.range(0.35, 0.7),
          }
        )
      );
    }

    // Spray clouds
    for (let i = 0; i < rng.int(4, 10); i++) {
      push(
        makeSprayCloud(
          rng.range(width * 0.1, width * 0.9),
          rng.range(height * 0.1, height * 0.9),
          rng.range(Math.min(width, height) * 0.06, Math.min(width, height) * 0.2),
          rng.pick(colors),
          rng
        )
      );
    }

    // Wildstyle ribbons / outlines
    for (let i = 0; i < rng.int(2, 5); i++) {
      const tw = width * rng.range(0.25, 0.7);
      const th = height * rng.range(0.12, 0.28);
      push(
        makeWildstylePath(
          rng.range(0, width - tw),
          rng.range(height * 0.1, height * 0.7),
          tw,
          th,
          rng.pick(colors),
          rng
        )
      );
    }

    // Bubble throw-ups
    for (let i = 0; i < rng.int(4, 9); i++) {
      const size = rng.range(Math.min(width, height) * 0.08, Math.min(width, height) * 0.22);
      push(
        makeBubbleLetter(
          rng.range(size, width - size),
          rng.range(size, height - size),
          size,
          rng.pick(colors),
          rng
        )
      );
    }

    // Tag text
    for (let i = 0; i < rng.int(3, 7); i++) {
      push(
        makeTagText(
          rng.range(width * 0.05, width * 0.7),
          rng.range(height * 0.12, height * 0.88),
          colors,
          rng
        )
      );
    }

    // Crowns / stars / arrows
    for (let i = 0; i < rng.int(3, 8); i++) {
      const cx = rng.range(width * 0.1, width * 0.9);
      const cy = rng.range(height * 0.1, height * 0.9);
      const s = rng.range(Math.min(width, height) * 0.03, Math.min(width, height) * 0.1);
      const c = rng.pick(colors);
      if (rng.chance(0.4)) {
        push(makeArrow(cx, cy, s * 2, c, rng));
      } else if (rng.chance(0.5)) {
        push(
          VectorModel.createStarObject(cx, cy, s, s * 0.45, rng.int(4, 8), {
            ...paintStyle(rng, [c]),
            fill: c,
            stroke: "#0a0a0a",
            strokeWidth: 3,
          })
        );
      } else {
        // Crown-ish: row of triangles
        for (let t = 0; t < 3; t++) {
          push(
            VectorModel.createRegularPolygonObject(cx + (t - 1) * s * 0.7, cy, s * 0.45, 3, {
              fill: c,
              stroke: "#0a0a0a",
              strokeWidth: 2,
              opacity: 1,
            })
          );
        }
      }
    }

    // Paint drips
    for (let i = 0; i < rng.int(6, 16); i++) {
      push(
        makeDrip(
          rng.range(width * 0.05, width * 0.95),
          rng.range(height * 0.05, height * 0.6),
          rng.range(height * 0.08, height * 0.35),
          rng.pick(colors),
          rng
        )
      );
    }

    // Fat outline strokes / tags as lines
    for (let i = 0; i < rng.int(3, 8); i++) {
      const x1 = rng.range(0, width);
      const y1 = rng.range(0, height);
      push(
        VectorModel.createLineObject(
          x1,
          y1,
          x1 + rng.range(-width * 0.25, width * 0.25),
          y1 + rng.range(-height * 0.15, height * 0.15),
          {
            stroke: rng.pick(["#0a0a0a", rng.pick(colors)]),
            fill: null,
            strokeWidth: rng.range(4, 16),
            strokeProfile: rng.pick(["constant", "taper", "swell"]),
            strokeLinecap: "round",
            opacity: rng.range(0.7, 1),
          }
        )
      );
    }

    // Extra spray near bottom (street level mist)
    for (let i = 0; i < rng.int(2, 5); i++) {
      push(
        makeSprayCloud(
          rng.range(0, width),
          height * rng.range(0.7, 0.95),
          rng.range(Math.min(width, height) * 0.08, Math.min(width, height) * 0.18),
          rng.pick(colors),
          rng
        )
      );
    }

    return { objects, styleName: "graffiti" };
  }

  function wildstylePalette(rng) {
    const pairs = [
      ["#7df9ff", "#0088cc"],
      ["#00e5ff", "#004e8c"],
      ["#ff4da6", "#b3006e"],
      ["#ff2d95", "#6b0038"],
      ["#ffe600", "#ff8a00"],
      ["#ffcc00", "#ff5500"],
      ["#c8ff00", "#5cff1a"],
      ["#d4ff4d", "#39c700"],
      ["#c77dff", "#5a1a9e"],
      ["#ff6b9d", "#ff2d55"],
      ["#ffffff", "#a0d8ff"],
    ];
    // Shuffle-ish pick order
    const out = [...pairs];
    for (let i = out.length - 1; i > 0; i--) {
      const j = rng.int(0, i);
      const t = out[i];
      out[i] = out[j];
      out[j] = t;
    }
    return out;
  }

  function makeLobedBlobPoints(cx, cy, rx, ry, lobes, rng, { jagged = 0.35, hooks = true } = {}) {
    const points = [];
    for (let i = 0; i < lobes; i++) {
      const a = (i / lobes) * Math.PI * 2 + rng.range(-0.12, 0.12);
      let rScale = rng.range(0.55, 1.15);
      // Occasional sharp spike / arrow tip
      if (hooks && rng.chance(0.22)) rScale *= rng.range(1.25, 1.65);
      // Occasional inward notch
      if (rng.chance(0.15)) rScale *= rng.range(0.35, 0.55);
      const x = cx + Math.cos(a) * rx * rScale;
      const y = cy + Math.sin(a) * ry * rScale;
      const sharp = rng.chance(jagged);
      if (sharp) {
        points.push({ x, y, in: null, out: null });
      } else {
        const tang = ((Math.PI * 2) / lobes) * 0.32 * Math.max(rx, ry) * rScale;
        points.push({
          x,
          y,
          in: { x: Math.cos(a - Math.PI / 2) * tang, y: Math.sin(a - Math.PI / 2) * tang },
          out: { x: Math.cos(a + Math.PI / 2) * tang, y: Math.sin(a + Math.PI / 2) * tang },
        });
      }
    }
    return points;
  }

  function offsetPathPoints(points, dx, dy) {
    return points.map((p) => ({
      x: p.x + dx,
      y: p.y + dy,
      in: p.in ? { ...p.in } : null,
      out: p.out ? { ...p.out } : null,
    }));
  }

  function makeWildPiece(cx, cy, size, pair, rng) {
    const objects = [];
    const rx = size * rng.range(0.55, 1.05);
    const ry = size * rng.range(0.45, 0.95);
    const lobes = rng.int(6, 11);
    const points = makeLobedBlobPoints(cx, cy, rx, ry, lobes, rng, { jagged: 0.4, hooks: true });
    const [c0, c1] = pair;
    const fill = rng.chance(0.7)
      ? VectorModel.makeLinearFill(c0, c1, rng.pick([30, 60, 90, 120, 200, 240]))
      : VectorModel.makeRadialFill(c0, c1);
    const outlineW = Math.max(4, size * 0.07);

    // Soft glow behind piece
    objects.push(
      VectorModel.createEllipseObject(cx - rx * 0.9, cy - ry * 0.9, rx * 1.8, ry * 1.8, {
        fill: c0,
        stroke: null,
        opacity: rng.range(0.08, 0.2),
      })
    );

    // 3D extrusion / block shadow
    const ex = rng.range(size * 0.06, size * 0.16);
    const ey = rng.range(size * 0.08, size * 0.18);
    objects.push(
      VectorModel.createPathObject(offsetPathPoints(points, ex, ey), {
        fill: rng.pick(["#0a0614", "#12081c", "#051018", "#1a0a24"]),
        stroke: "#000000",
        strokeWidth: outlineW * 0.6,
        closed: true,
        opacity: 0.95,
      })
    );

    // Main glossy piece
    objects.push(
      VectorModel.createPathObject(points, {
        fill,
        stroke: "#050505",
        strokeWidth: outlineW,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        closed: true,
        opacity: 1,
      })
    );

    // Inner rim light (slightly inset ellipse or small stroke path)
    if (rng.chance(0.75)) {
      const inset = makeLobedBlobPoints(cx - size * 0.02, cy - size * 0.04, rx * 0.72, ry * 0.68, Math.max(5, lobes - 2), rng, {
        jagged: 0.15,
        hooks: false,
      });
      objects.push(
        VectorModel.createPathObject(inset, {
          fill: null,
          stroke: rng.pick(["#ffffff", c0, "#e8ffff"]),
          strokeWidth: Math.max(1.5, outlineW * 0.28),
          closed: true,
          opacity: rng.range(0.35, 0.7),
        })
      );
    }

    // Specular highlights
    const hlCount = rng.int(1, 3);
    for (let i = 0; i < hlCount; i++) {
      const hx = cx + rng.range(-rx * 0.35, rx * 0.2);
      const hy = cy + rng.range(-ry * 0.45, -ry * 0.05);
      objects.push(
        VectorModel.createEllipseObject(
          hx,
          hy,
          rng.range(size * 0.06, size * 0.22),
          rng.range(size * 0.03, size * 0.1),
          { fill: "#ffffff", stroke: null, opacity: rng.range(0.45, 0.85) }
        )
      );
    }

    // Occasional crack / sketch line inside
    if (rng.chance(0.4)) {
      const a1 = rng.range(0, Math.PI * 2);
      objects.push(
        VectorModel.createLineObject(
          cx + Math.cos(a1) * rx * 0.2,
          cy + Math.sin(a1) * ry * 0.2,
          cx + Math.cos(a1 + 0.8) * rx * 0.55,
          cy + Math.sin(a1 + 0.8) * ry * 0.55,
          {
            stroke: "#0a0a0a",
            fill: null,
            strokeWidth: rng.range(1.5, 3.5),
            opacity: 0.55,
            strokeLinecap: "round",
          }
        )
      );
    }

    // Drips hanging from bottom of piece
    const dripN = rng.int(1, 4);
    for (let i = 0; i < dripN; i++) {
      const dx = cx + rng.range(-rx * 0.5, rx * 0.5);
      const dy = cy + ry * rng.range(0.35, 0.85);
      const len = rng.range(size * 0.25, size * 0.85);
      const color = rng.chance(0.5) ? c0 : c1;
      const w = rng.range(size * 0.04, size * 0.1);
      objects.push(
        VectorModel.createRoundRectObject(dx - w / 2, dy, w, len, w * 0.45, {
          fill: color,
          stroke: "#050505",
          strokeWidth: Math.max(1.5, w * 0.25),
          opacity: 1,
        })
      );
      const tip = w * rng.range(1.1, 1.6);
      objects.push(
        VectorModel.createEllipseObject(dx - tip / 2, dy + len - tip * 0.25, tip, tip, {
          fill: color,
          stroke: "#050505",
          strokeWidth: 1.5,
          opacity: 1,
        })
      );
    }

    return objects;
  }

  function makeJaggedSplash(cx, cy, size, color, rng) {
    const points = makeLobedBlobPoints(cx, cy, size, size * rng.range(0.6, 1.1), rng.int(7, 14), rng, {
      jagged: 0.55,
      hooks: true,
    });
    return VectorModel.createPathObject(points, {
      fill: color,
      stroke: null,
      opacity: rng.range(0.25, 0.55),
      closed: true,
    });
  }

  function makeSoftSpray(cx, cy, radius, color, rng) {
    const objects = [];
    // Layered translucent disks to fake soft spray glow
    for (let i = 0; i < 4; i++) {
      const t = i / 3;
      const r = radius * (0.45 + t * 0.7);
      objects.push(
        VectorModel.createEllipseObject(cx - r, cy - r, r * 2, r * 2, {
          fill: color,
          stroke: null,
          opacity: 0.12 * (1 - t * 0.7),
        })
      );
    }
    // Harder splatter dots
    const n = rng.int(10, 28);
    for (let i = 0; i < n; i++) {
      const a = rng.range(0, Math.PI * 2);
      const d = rng.range(0, radius) * Math.sqrt(rng.next());
      const r = rng.range(radius * 0.02, radius * 0.12);
      objects.push(
        VectorModel.createEllipseObject(cx + Math.cos(a) * d - r, cy + Math.sin(a) * d - r, r * 2, r * 2, {
          fill: color,
          stroke: null,
          opacity: rng.range(0.35, 0.9),
        })
      );
    }
    return objects;
  }

  function makeSparkle(x, y, size, rng) {
    return VectorModel.createStarObject(x, y, size, size * 0.28, 4, {
      fill: "#ffffff",
      stroke: null,
      opacity: rng.range(0.7, 1),
    });
  }

  function makeBarAccent(cx, cy, size, pair, rng) {
    // Blocky rectangular “letter bar” like the pink chunk in the reference
    const objects = [];
    const w = size * rng.range(0.7, 1.4);
    const h = size * rng.range(0.35, 0.7);
    const [c0, c1] = pair;
    const fill = VectorModel.makeLinearFill(c0, c1, rng.pick([0, 45, 90]));
    const ex = size * 0.1;
    const ey = size * 0.12;
    objects.push(
      VectorModel.createRoundRectObject(cx - w / 2 + ex, cy - h / 2 + ey, w, h, h * 0.15, {
        fill: "#0a0614",
        stroke: "#000000",
        strokeWidth: 3,
        opacity: 1,
      })
    );
    objects.push(
      VectorModel.createRoundRectObject(cx - w / 2, cy - h / 2, w, h, h * 0.15, {
        fill,
        stroke: "#050505",
        strokeWidth: Math.max(4, size * 0.08),
        opacity: 1,
      })
    );
    objects.push(
      VectorModel.createEllipseObject(cx - w * 0.25, cy - h * 0.35, w * 0.25, h * 0.2, {
        fill: "#ffffff",
        stroke: null,
        opacity: 0.55,
      })
    );
    return objects;
  }

  /**
   * Glossy wildstyle graffiti piece on black — interlocking neon shapes,
   * gradients, drips, spray, and sparkles (inspired by digital wildstyle art).
   */
  function generateWildstyle(width, height, paletteState, seed) {
    const rng = createRng(seed == null ? (Math.random() * 1e9) >>> 0 : seed);
    const pairs = wildstylePalette(rng);
    // Fold in document palette colors as extra gradient ends
    const docColors = [
      ...(paletteState?.swatches || []),
      paletteState?.primary,
      paletteState?.secondary,
    ].filter(Boolean);
    if (docColors.length >= 2) {
      pairs.push([docColors[0], docColors[1]]);
    }

    const objects = [];
    const push = (arr) => {
      (Array.isArray(arr) ? arr : [arr]).forEach((o) => {
        if (o) objects.push(o);
      });
    };

    const minDim = Math.min(width, height);
    const cx = width * 0.5 + rng.range(-width * 0.04, width * 0.04);
    const cy = height * 0.48 + rng.range(-height * 0.04, height * 0.04);

    // Solid black wall
    push(
      VectorModel.createRectObject(0, 0, width, height, {
        fill: "#000000",
        stroke: null,
        opacity: 1,
      })
    );

    // Background spray washes
    for (let i = 0; i < rng.int(5, 9); i++) {
      const pair = rng.pick(pairs);
      push(
        makeSoftSpray(
          cx + rng.range(-width * 0.35, width * 0.35),
          cy + rng.range(-height * 0.35, height * 0.35),
          minDim * rng.range(0.12, 0.32),
          pair[0],
          rng
        )
      );
    }

    // Jagged color splashes behind letters
    for (let i = 0; i < rng.int(3, 6); i++) {
      const pair = rng.pick(pairs);
      push(
        makeJaggedSplash(
          cx + rng.range(-width * 0.28, width * 0.28),
          cy + rng.range(-height * 0.28, height * 0.28),
          minDim * rng.range(0.12, 0.28),
          pair[rng.int(0, 1)],
          rng
        )
      );
    }

    // Diagonal flow of interlocking pieces (top-left → bottom-right)
    const pieceCount = rng.int(6, 10);
    for (let i = 0; i < pieceCount; i++) {
      const t = i / Math.max(1, pieceCount - 1);
      const px = cx + (t - 0.5) * width * rng.range(0.45, 0.65) + rng.range(-minDim * 0.08, minDim * 0.08);
      const py = cy + (t - 0.5) * height * rng.range(0.28, 0.48) + rng.range(-minDim * 0.1, minDim * 0.1);
      const size = minDim * rng.range(0.14, 0.28) * (rng.chance(0.25) ? rng.range(1.15, 1.4) : 1);
      const pair = pairs[i % pairs.length];
      if (rng.chance(0.22)) {
        push(makeBarAccent(px, py, size * 0.85, pair, rng));
      } else {
        push(makeWildPiece(px, py, size, pair, rng));
      }
    }

    // A few floating accent bubbles
    for (let i = 0; i < rng.int(6, 14); i++) {
      const pair = rng.pick(pairs);
      const r = minDim * rng.range(0.012, 0.045);
      const bx = rng.range(width * 0.08, width * 0.92);
      const by = rng.range(height * 0.08, height * 0.92);
      push(
        VectorModel.createEllipseObject(bx - r, by - r, r * 2, r * 2, {
          fill: VectorModel.makeRadialFill("#ffffff", pair[0]),
          stroke: "#050505",
          strokeWidth: Math.max(1.5, r * 0.25),
          opacity: 1,
        })
      );
    }

    // Peripheral splatters
    for (let i = 0; i < rng.int(4, 8); i++) {
      const pair = rng.pick(pairs);
      const angle = rng.range(0, Math.PI * 2);
      const dist = minDim * rng.range(0.28, 0.48);
      push(
        makeSoftSpray(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, minDim * rng.range(0.05, 0.12), pair[0], rng)
      );
    }

    // Sparkles / 4-point stars
    for (let i = 0; i < rng.int(5, 12); i++) {
      push(
        makeSparkle(
          rng.range(width * 0.1, width * 0.9),
          rng.range(height * 0.1, height * 0.9),
          minDim * rng.range(0.01, 0.035),
          rng
        )
      );
    }

    // Extra outer drips from mid-composition
    for (let i = 0; i < rng.int(3, 7); i++) {
      const pair = rng.pick(pairs);
      const dx = cx + rng.range(-width * 0.25, width * 0.25);
      const dy = cy + rng.range(0, height * 0.2);
      const len = minDim * rng.range(0.12, 0.35);
      const w = minDim * rng.range(0.01, 0.025);
      push(
        VectorModel.createRoundRectObject(dx - w / 2, dy, w, len, w * 0.45, {
          fill: pair[0],
          stroke: "#050505",
          strokeWidth: 1.5,
          opacity: 1,
        })
      );
      push(
        VectorModel.createEllipseObject(dx - w * 0.75, dy + len - w * 0.3, w * 1.5, w * 1.5, {
          fill: pair[0],
          stroke: "#050505",
          strokeWidth: 1.2,
          opacity: 1,
        })
      );
    }

    return { objects, styleName: "wildstyle" };
  }

  return { generate, generateGeometric, generateGraffiti, generateWildstyle, createRng };
})();

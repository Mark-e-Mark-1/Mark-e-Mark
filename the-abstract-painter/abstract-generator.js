const AbstractGenerator = (() => {
  function createRng(seed) {
    let s = seed >>> 0;
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
      shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = this.int(0, i);
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      },
    };
  }

  function buildColors(paletteState, rng) {
    const saved = Palette.toJSON();
    const primary = rng.pick([paletteState.primary, ...paletteState.swatches]);
    Palette.setPrimary(primary);
    Palette.generateHarmony(rng.pick(["complementary", "analogous", "triadic", "split"]));
    const generated = Palette.getSwatches().slice();
    Palette.loadFromProject(saved);

    const merged = [...new Set([
      ...paletteState.swatches,
      ...generated,
      paletteState.primary,
      paletteState.secondary,
    ])];
    while (merged.length < 10) {
      const [h, s, l] = Palette.hexToHsl(rng.pick(merged));
      merged.push(Palette.hslToHex(h + rng.range(-50, 50), s * rng.range(0.5, 1.1), l * rng.range(0.45, 1.15)));
    }
    return merged;
  }

  function drawBackground(ctx, w, h, colors, rng) {
    const c1 = rng.pick(colors);
    const c2 = rng.pick(colors);
    const c3 = rng.pick(colors);
    const grad = rng.next() > 0.5
      ? ctx.createLinearGradient(0, 0, w, h)
      : ctx.createRadialGradient(w * rng.range(0.2, 0.8), h * rng.range(0.2, 0.8), 0, w / 2, h / 2, Math.max(w, h) * 0.8);
    grad.addColorStop(0, c1);
    grad.addColorStop(rng.range(0.3, 0.7), c2);
    grad.addColorStop(1, c3);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function drawBlobs(ctx, w, h, colors, rng) {
    const count = rng.int(8, 28);
    for (let i = 0; i < count; i++) {
      const x = rng.range(0, w);
      const y = rng.range(0, h);
      const radius = rng.range(40, Math.min(w, h) * 0.35);
      BrushEngine.stamp(ctx, x, y, radius, rng.range(0.2, 0.7), rng.pick(colors), rng.range(0.3, 0.9), 1, false);
    }
  }

  function drawFlowField(ctx, w, h, colors, rng) {
    const seeds = rng.int(12, 40);
    const scale = rng.range(0.005, 0.025);
    for (let s = 0; s < seeds; s++) {
      let x = rng.range(0, w);
      let y = rng.range(0, h);
      const color = rng.pick(colors);
      const steps = rng.int(30, 120);
      const size = rng.range(8, 40);
      for (let i = 0; i < steps; i++) {
        const angle = Math.sin(x * scale + s) * Math.cos(y * scale + s * 0.7) * Math.PI * 2;
        x += Math.cos(angle) * rng.range(2, 6);
        y += Math.sin(angle) * rng.range(2, 6);
        if (x < 0 || x > w || y < 0 || y > h) break;
        BrushEngine.stamp(ctx, x, y, size / 3, 0.35, color, rng.range(0.3, 0.7), 1, false);
      }
    }
  }

  function drawLines(ctx, w, h, colors, rng) {
    const count = rng.int(5, 18);
    for (let i = 0; i < count; i++) {
      ctx.strokeStyle = rng.pick(colors);
      ctx.lineWidth = rng.range(4, 48);
      ctx.lineCap = "round";
      ctx.beginPath();
      const x1 = rng.range(0, w);
      const y1 = rng.range(0, h);
      if (rng.next() > 0.4) {
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(
          rng.range(0, w), rng.range(0, h),
          rng.range(0, w), rng.range(0, h),
          rng.range(0, w), rng.range(0, h)
        );
      } else {
        ctx.moveTo(x1, y1);
        ctx.lineTo(rng.range(0, w), rng.range(0, h));
      }
      ctx.stroke();
    }
  }

  function drawShapes(ctx, w, h, colors, rng) {
    const count = rng.int(4, 14);
    for (let i = 0; i < count; i++) {
      ctx.fillStyle = rng.pick(colors);
      ctx.strokeStyle = rng.pick(colors);
      const x = rng.range(0, w);
      const y = rng.range(0, h);
      const sw = rng.range(30, w * 0.5);
      const sh = rng.range(30, h * 0.5);
      ctx.beginPath();
      if (rng.next() > 0.5) {
        ctx.ellipse(x, y, sw / 2, sh / 2, rng.range(0, Math.PI), 0, Math.PI * 2);
      } else {
        ctx.rect(x - sw / 2, y - sh / 2, sw, sh);
      }
      if (rng.next() > 0.5) ctx.fill();
      else ctx.stroke();
    }
  }

  function drawAttractors(ctx, w, h, colors, rng) {
    const count = rng.int(1, 4);
    for (let n = 0; n < count; n++) {
      const cx = rng.range(w * 0.1, w * 0.9);
      const cy = rng.range(h * 0.1, h * 0.9);
      const a = rng.range(1, 2.5);
      const b = rng.range(-2.5, -1);
      const c = rng.range(1.5, 2.8);
      const d = rng.range(-2.8, -1.5);
      let x = 0.1;
      let y = 0.1;
      const scale = rng.range(40, Math.min(w, h) * 0.15);
      const color = rng.pick(colors);
      const iterations = rng.int(4000, 12000);
      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 0; i < iterations; i++) {
        const nx = Math.sin(a * y) - Math.cos(b * x);
        const ny = Math.sin(c * x) - Math.cos(d * y);
        x = nx;
        y = ny;
        if (i > 15) {
          BrushEngine.stamp(ctx, x * scale, y * scale, rng.range(1, 4), 0.5, color, rng.range(0.4, 0.9), 1, false);
        }
      }
      ctx.restore();
    }
  }

  function drawSplatter(ctx, w, h, colors, rng) {
    const count = rng.int(80, 250);
    for (let i = 0; i < count; i++) {
      const x = rng.range(0, w);
      const y = rng.range(0, h);
      BrushEngine.stamp(ctx, x, y, rng.range(2, 18), rng.range(0.2, 0.8), rng.pick(colors), rng.range(0.2, 0.85), 1, false);
    }
  }

  function drawStripes(ctx, w, h, colors, rng) {
    const angle = rng.range(0, Math.PI);
    const spacing = rng.range(20, 80);
    const cx = w / 2;
    const cy = h / 2;
    const len = Math.hypot(w, h);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    for (let i = -len; i < len; i += spacing) {
      ctx.fillStyle = rng.pick(colors);
      ctx.globalAlpha = rng.range(0.15, 0.6);
      ctx.fillRect(i, -len, spacing * rng.range(0.3, 0.8), len * 2);
    }
    ctx.restore();
  }

  function drawKaleidoscopeBurst(ctx, w, h, colors, rng) {
    const cx = rng.range(w * 0.25, w * 0.75);
    const cy = rng.range(h * 0.25, h * 0.75);
    const segments = rng.int(4, 10);
    const arms = rng.int(12, 36);
    const color = rng.pick(colors);
    for (let i = 0; i < arms; i++) {
      const angle = (i / arms) * Math.PI * 2;
      const dist = rng.range(20, Math.min(w, h) * 0.45);
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;
      const points = BrushEngine.kaleidoscopePoints(x, y, cx, cy, segments);
      for (const p of points) {
        BrushEngine.stamp(ctx, p.x, p.y, rng.range(15, 60), rng.range(0.3, 0.7), color, rng.range(0.4, 0.8), 1, false);
      }
    }
  }

  function generate(ctx, width, height, paletteState) {
    const seed = Date.now() ^ (Math.random() * 0xffffffff);
    const rng = createRng(seed);
    const colors = buildColors(paletteState, rng);

    ctx.clearRect(0, 0, width, height);
    drawBackground(ctx, width, height, colors, rng);

    const techniques = rng.shuffle([
      drawBlobs,
      drawFlowField,
      drawLines,
      drawShapes,
      drawAttractors,
      drawSplatter,
      drawStripes,
      drawKaleidoscopeBurst,
    ]);
    const passCount = rng.int(4, 6);
    for (let i = 0; i < passCount; i++) {
      ctx.save();
      ctx.globalCompositeOperation = rng.pick([
        "source-over", "multiply", "screen", "overlay", "lighter", "soft-light",
      ]);
      ctx.globalAlpha = rng.range(0.45, 1);
      techniques[i](ctx, width, height, colors, rng);
      ctx.restore();
    }

    return seed;
  }

  const PHI = (1 + Math.sqrt(5)) / 2;
  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
  const FIB = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  function buildGoldenColors(paletteState, rng) {
    const saved = Palette.toJSON();
    Palette.setPrimary(paletteState.primary);
    Palette.generateHarmony("triadic");
    const base = Palette.getSwatches().slice(0, 6);
    Palette.loadFromProject(saved);
    const colors = [paletteState.primary, paletteState.secondary, ...base];
    const [h, s, l] = Palette.hexToHsl(paletteState.primary);
    colors.push(Palette.hslToHex((h + 137.5) % 360, Math.min(100, s * 1.05), l));
    colors.push(Palette.hslToHex((h + 222.5) % 360, s * 0.8, l * 0.85));
    return colors;
  }

  function drawPhiFociBackground(ctx, w, h, colors) {
    const fx = w / PHI;
    const fy = h / PHI;
    const r = Math.max(w, h) * 0.85;
    const g1 = ctx.createRadialGradient(fx, fy, 0, fx, fy, r);
    g1.addColorStop(0, colors[0]);
    g1.addColorStop(1 / PHI, colors[1] || colors[0]);
    g1.addColorStop(1, "transparent");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);
    const g2 = ctx.createRadialGradient(w - fx, h - fy, 0, w - fx, h - fy, r * 0.7);
    g2.addColorStop(0, colors[2] || colors[1]);
    g2.addColorStop(1, "transparent");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = colors[colors.length - 1] || "#0a0a12";
    ctx.globalAlpha = 0.35;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  function drawPhiLissajous(ctx, w, h, colors, rng) {
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h) * 0.38;
    const curves = rng.int(3, 6);
    for (let c = 0; c < curves; c++) {
      const a = FIB[rng.int(3, 7)];
      const b = Math.round(a * PHI);
      const delta = c * GOLDEN_ANGLE;
      const color = colors[c % colors.length];
      ctx.strokeStyle = color;
      ctx.lineWidth = rng.range(2, 7);
      ctx.globalAlpha = rng.range(0.35, 0.75);
      ctx.beginPath();
      const steps = 480;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const x = cx + Math.sin(a * t + delta) * scale * Math.pow(PHI, -c * 0.15);
        const y = cy + Math.sin(b * t) * scale * Math.pow(PHI, -c * 0.15);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      BrushEngine.stamp(ctx, cx, cy, scale * 0.08, 0.5, color, 0.4, 1, false);
    }
    ctx.globalAlpha = 1;
  }

  function drawFibonacciRingMandala(ctx, w, h, colors, rng) {
    const cx = w / 2;
    const cy = h / 2;
    const unit = Math.min(w, h) / (FIB[9] * 1.2);
    const rings = rng.int(6, 9);
    for (let i = 2; i < rings + 2; i++) {
      const radius = FIB[i] * unit;
      const segments = FIB[Math.min(i + 2, FIB.length - 1)];
      const rot = i * GOLDEN_ANGLE;
      ctx.strokeStyle = colors[i % colors.length];
      ctx.lineWidth = rng.range(1.5, 4);
      ctx.globalAlpha = rng.range(0.3, 0.65);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, rot, rot + Math.PI * 1.5);
      ctx.stroke();
      for (let s = 0; s < segments; s++) {
        const ang = rot + (s / segments) * Math.PI * 2;
        const x = cx + Math.cos(ang) * radius;
        const y = cy + Math.sin(ang) * radius;
        BrushEngine.stamp(ctx, x, y, unit * rng.range(1.2, 2.8), 0.35, colors[(i + s) % colors.length], rng.range(0.45, 0.85), 1, false);
      }
    }
    ctx.globalAlpha = 1;
  }

  function drawGoldenMoiré(ctx, w, h, colors, rng) {
    const spacingA = rng.range(8, 16);
    const spacingB = spacingA * PHI;
    const angle = rng.range(-0.12, 0.12);
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(angle);
    ctx.translate(-w / 2, -h / 2);
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.18;
    for (let x = -w; x < w * 2; x += spacingA) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 2);
    ctx.translate(-w / 2, -h / 2);
    ctx.strokeStyle = colors[1];
    for (let y = -h; y < h * 2; y += spacingB) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawGoldenMesh(ctx, w, h, colors, rng) {
    const cx = w / 2;
    const cy = h / 2;
    const count = rng.int(40, 72);
    const maxR = Math.min(w, h) * 0.46;
    const points = [];
    for (let i = 0; i < count; i++) {
      const r = maxR * Math.sqrt(i / count);
      const theta = i * GOLDEN_ANGLE + rng.range(-0.05, 0.05);
      points.push({ x: cx + Math.cos(theta) * r, y: cy + Math.sin(theta) * r });
    }
    ctx.lineWidth = rng.range(0.8, 2);
    ctx.globalAlpha = rng.range(0.2, 0.45);
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const neighbors = [1, 2, 3, 5, 8].map((k) => points[i + k]).filter(Boolean);
      neighbors.forEach((q, j) => {
        ctx.strokeStyle = colors[(i + j) % colors.length];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      });
      BrushEngine.stamp(ctx, p.x, p.y, rng.range(3, 10), 0.4, colors[i % colors.length], rng.range(0.35, 0.7), 1, false);
    }
    ctx.globalAlpha = 1;
  }

  function drawPhiWaveBands(ctx, w, h, colors, rng) {
    const bands = rng.int(5, 9);
    for (let b = 0; b < bands; b++) {
      const wavelength = w / (FIB[b + 3] / PHI);
      const amp = rng.range(12, 40);
      const yBase = (b + 0.5) * (h / bands);
      ctx.strokeStyle = colors[b % colors.length];
      ctx.lineWidth = rng.range(3, 8);
      ctx.globalAlpha = rng.range(0.25, 0.55);
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = yBase + Math.sin((x / wavelength) * Math.PI * 2 + b * GOLDEN_ANGLE) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function generateGolden(ctx, width, height, paletteState) {
    const seed = Date.now() ^ (Math.random() * 0xffffffff);
    const rng = createRng(seed);
    const colors = buildGoldenColors(paletteState, rng);

    ctx.clearRect(0, 0, width, height);
    drawPhiFociBackground(ctx, width, height, colors);

    const techniques = rng.shuffle([
      drawPhiLissajous,
      drawFibonacciRingMandala,
      drawGoldenMoiré,
      drawGoldenMesh,
      drawPhiWaveBands,
    ]);
    const passCount = rng.int(3, 4);
    for (let i = 0; i < passCount; i++) {
      ctx.save();
      ctx.globalCompositeOperation = rng.pick(["source-over", "screen", "overlay", "soft-light"]);
      ctx.globalAlpha = rng.range(0.55, 0.92);
      techniques[i](ctx, width, height, colors, rng);
      ctx.restore();
    }

    return seed;
  }

  function getSeedOfLifeCenters(radius, rotation) {
    const centers = [{ x: 0, y: 0 }];
    for (let i = 0; i < 6; i++) {
      const angle = rotation + (i * Math.PI) / 3;
      centers.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    }
    return centers;
  }

  function getFlowerRingCenters(radius, rotation) {
    const centers = getSeedOfLifeCenters(radius, rotation);
    for (let i = 0; i < 6; i++) {
      const angle = rotation + (i * Math.PI) / 3;
      centers.push({
        x: Math.cos(angle) * radius * 2,
        y: Math.sin(angle) * radius * 2,
      });
    }
    return dedupeCenters(centers);
  }

  function dedupeCenters(centers) {
    const key = (p) => `${Math.round(p.x * 100)}:${Math.round(p.y * 100)}`;
    const seen = new Set();
    return centers.filter((p) => {
      const k = key(p);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  function drawSeedCluster(ctx, cx, cy, radius, rotation, colors, rng, style) {
    const useBloom = style.bloom;
    const centers = useBloom
      ? getFlowerRingCenters(radius, rotation)
      : getSeedOfLifeCenters(radius, rotation);

    centers.forEach((pt, i) => {
      const x = cx + pt.x;
      const y = cy + pt.y;
      const color = colors[i % colors.length];
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = style.lineWidth;
      ctx.lineCap = "round";
      ctx.globalAlpha = style.opacity;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);

      if (style.filled) {
        ctx.globalAlpha = style.fillOpacity;
        ctx.fill();
      }
      if (style.stroked) {
        ctx.globalAlpha = style.opacity;
        ctx.stroke();
      }
      if (style.glow) {
        ctx.globalAlpha = style.opacity * 0.35;
        ctx.lineWidth = style.lineWidth * 2.5;
        ctx.stroke();
      }
      ctx.restore();
    });

    if (style.vesica && !style.filled) {
      ctx.save();
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = Math.max(1, style.lineWidth * 0.6);
      ctx.globalAlpha = style.opacity * 0.5;
      for (let i = 0; i < 6; i++) {
        const a1 = rotation + (i * Math.PI) / 3;
        const a2 = rotation + ((i + 1) * Math.PI) / 3;
        const x1 = cx + Math.cos(a1) * radius * 0.5;
        const y1 = cy + Math.sin(a1) * radius * 0.5;
        const x2 = cx + Math.cos(a2) * radius * 0.5;
        const y2 = cy + Math.sin(a2) * radius * 0.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  function generateSeedOfLife(ctx, width, height, paletteState) {
    const seed = Date.now() ^ (Math.random() * 0xffffffff);
    const rng = createRng(seed);
    const colors = buildGoldenColors(paletteState, rng);

    ctx.clearRect(0, 0, width, height);

    const bg = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.7);
    bg.addColorStop(0, colors[colors.length - 1] || "#0f172a");
    bg.addColorStop(1, paletteState.secondary || "#1e293b");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const clusterCount = rng.int(1, rng.chance(0.35) ? 3 : 1);
    const baseRadius = Math.min(width, height) / (clusterCount === 1 ? rng.range(4.5, 6.5) : rng.range(7, 10));

    for (let c = 0; c < clusterCount; c++) {
      const cx = clusterCount === 1
        ? width / 2 + rng.range(-width * 0.08, width * 0.08)
        : rng.range(width * 0.22, width * 0.78);
      const cy = clusterCount === 1
        ? height / 2 + rng.range(-height * 0.08, height * 0.08)
        : rng.range(height * 0.22, height * 0.78);
      const radius = baseRadius * rng.range(0.85, 1.15);
      const rotation = rng.range(0, Math.PI * 2);

      const styleRoll = rng.next();
      const style = {
        filled: styleRoll < 0.45,
        stroked: styleRoll >= 0.2,
        glow: rng.chance(0.4),
        bloom: rng.chance(0.35),
        vesica: rng.chance(0.5),
        lineWidth: rng.range(1.5, Math.max(2, radius * 0.04)),
        opacity: rng.range(0.55, 0.95),
        fillOpacity: rng.range(0.08, 0.28),
      };
      if (style.filled && !style.stroked) style.stroked = rng.chance(0.6);

      ctx.save();
      ctx.globalCompositeOperation = rng.pick(["source-over", "screen", "overlay", "lighter"]);
      drawSeedCluster(ctx, cx, cy, radius, rotation, colors, rng, style);
      ctx.restore();

      if (rng.chance(0.25)) {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = rng.range(0.15, 0.35);
        drawSeedCluster(ctx, cx, cy, radius * 0.5, rotation + Math.PI / 6, colors, rng, {
          filled: false,
          stroked: true,
          glow: false,
          bloom: false,
          vesica: false,
          lineWidth: Math.max(1, style.lineWidth * 0.7),
          opacity: 0.6,
          fillOpacity: 0,
        });
        ctx.restore();
      }
    }

    return seed;
  }

  function generateFractal(ctx, width, height, paletteState) {
    return FractalEngine.fillLayer(ctx, width, height, paletteState, { clearFirst: true }).seed;
  }

  function getPaletteColors(paletteState) {
    return [...new Set([
      paletteState.primary,
      paletteState.secondary,
      ...paletteState.swatches,
    ])].filter(Boolean);
  }

  function drawShapePrimitive(ctx, type, cx, cy, size, rotation, color, rng) {
    const half = size / 2;
    const filled = rng.chance(0.72);
    const stroked = !filled || rng.chance(0.35);
    const lineWidth = rng.range(1, Math.max(2, size * 0.06));
    const alpha = rng.range(0.55, 1);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    switch (type) {
      case "rect":
        ctx.rect(-half, -half * rng.range(0.6, 1.4), size, size * rng.range(0.5, 1.5));
        break;
      case "rounded":
        roundRectPath(ctx, -half, -half, size, size * rng.range(0.7, 1.3), size * rng.range(0.08, 0.22));
        break;
      case "circle":
        ctx.arc(0, 0, half, 0, Math.PI * 2);
        break;
      case "ellipse":
        ctx.ellipse(0, 0, half, half * rng.range(0.35, 1.1), 0, 0, Math.PI * 2);
        break;
      case "triangle": {
        const r = half;
        for (let i = 0; i < 3; i++) {
          const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      }
      case "polygon": {
        const sides = rng.int(5, 8);
        const r = half;
        for (let i = 0; i < sides; i++) {
          const a = (i / sides) * Math.PI * 2 - Math.PI / 2;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      }
      case "diamond":
        ctx.moveTo(0, -half);
        ctx.lineTo(half, 0);
        ctx.lineTo(0, half);
        ctx.lineTo(-half, 0);
        ctx.closePath();
        break;
      case "line":
        ctx.moveTo(-half, rng.range(-half, half));
        ctx.lineTo(half, rng.range(-half, half));
        break;
      case "arc":
        ctx.arc(0, 0, half, rng.range(0, Math.PI), rng.range(Math.PI, Math.PI * 2));
        break;
      case "ring":
        ctx.arc(0, 0, half, 0, Math.PI * 2);
        ctx.moveTo(half * 0.55, 0);
        ctx.arc(0, 0, half * 0.55, 0, Math.PI * 2, true);
        break;
      case "cross": {
        const t = size * rng.range(0.15, 0.35);
        ctx.rect(-t / 2, -half, t, size);
        ctx.rect(-half, -t / 2, size, t);
        break;
      }
      default:
        ctx.rect(-half, -half, size, size);
    }

    if (type === "line" || type === "arc" || (type === "ring" && !filled)) {
      ctx.stroke();
    } else {
      if (filled) ctx.fill();
      if (stroked) ctx.stroke();
    }
    ctx.restore();
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    const rad = Math.min(r, w / 2, h / 2);
    ctx.moveTo(x + rad, y);
    ctx.lineTo(x + w - rad, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
    ctx.lineTo(x + w, y + h - rad);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
    ctx.lineTo(x + rad, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
    ctx.lineTo(x, y + rad);
    ctx.quadraticCurveTo(x, y, x + rad, y);
    ctx.closePath();
  }

  function generateShapes(ctx, width, height, paletteState) {
    const seed = Date.now() ^ (Math.random() * 0xffffffff);
    const rng = createRng(seed);
    const colors = getPaletteColors(paletteState);
    if (!colors.length) return seed;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = rng.pick(colors);
    ctx.fillRect(0, 0, width, height);

    const shapeTypes = [
      "rect", "rounded", "circle", "ellipse", "triangle",
      "polygon", "diamond", "line", "arc", "ring", "cross",
    ];
    const area = width * height;
    const count = rng.int(
      Math.floor(area / 18000),
      Math.floor(area / 6000)
    );
    const minDim = Math.min(width, height);

    for (let i = 0; i < count; i++) {
      const type = rng.pick(shapeTypes);
      const cx = rng.range(0, width);
      const cy = rng.range(0, height);
      const size = rng.range(minDim * 0.02, minDim * rng.range(0.12, 0.42));
      const rotation = rng.range(0, Math.PI * 2);
      const color = rng.pick(colors);

      ctx.save();
      if (rng.chance(0.12)) {
        ctx.globalCompositeOperation = rng.pick(["multiply", "screen", "overlay", "lighter"]);
      }
      drawShapePrimitive(ctx, type, cx, cy, size, rotation, color, rng);
      ctx.restore();
    }

    if (rng.chance(0.4)) {
      const overlayCount = rng.int(8, 24);
      for (let i = 0; i < overlayCount; i++) {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = rng.range(0.15, 0.4);
        drawShapePrimitive(
          ctx,
          rng.pick(shapeTypes),
          rng.range(0, width),
          rng.range(0, height),
          rng.range(minDim * 0.15, minDim * 0.55),
          rng.range(0, Math.PI * 2),
          rng.pick(colors),
          rng
        );
        ctx.restore();
      }
    }

    return seed;
  }

  return { generate, generateGolden, generateSeedOfLife, generateFractal, generateShapes };
})();

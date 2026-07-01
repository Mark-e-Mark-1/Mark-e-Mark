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

  function darkenColor(hex, amount) {
    const [h, s, l] = Palette.hexToHsl(hex);
    return Palette.hslToHex(h, s, Math.max(0.05, l * (1 - amount)));
  }

  function lightenColor(hex, amount) {
    const [h, s, l] = Palette.hexToHsl(hex);
    return Palette.hslToHex(h, s, Math.min(0.95, l + (1 - l) * amount));
  }

  function pickSkyColors(colors, rng, skyStyle) {
    const c1 = rng.pick(colors);
    const c2 = rng.pick(colors);
    const c3 = rng.pick(colors);
    if (skyStyle === "night" || skyStyle === "neon") {
      return [darkenColor(c3, 0.75), darkenColor(c1, 0.55), darkenColor(c2, 0.35)];
    }
    if (skyStyle === "sunset") {
      return [lightenColor(c1, 0.2), c2, darkenColor(c3, 0.25)];
    }
    if (skyStyle === "dusk") {
      return [darkenColor(c2, 0.45), c1, lightenColor(c3, 0.15)];
    }
    return [lightenColor(c1, 0.35), lightenColor(c2, 0.1), c3];
  }

  function drawCitySky(ctx, w, h, horizon, colors, rng, skyStyle) {
    const [top, mid, bottom] = pickSkyColors(colors, rng, skyStyle);
    const grad = ctx.createLinearGradient(0, 0, 0, horizon);
    grad.addColorStop(0, top);
    grad.addColorStop(rng.range(0.35, 0.65), mid);
    grad.addColorStop(1, bottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function drawCityStars(ctx, w, horizon, rng) {
    const count = rng.int(40, 160);
    ctx.save();
    for (let i = 0; i < count; i++) {
      const x = rng.range(0, w);
      const y = rng.range(0, horizon * 0.85);
      const r = rng.range(0.4, 1.8);
      ctx.fillStyle = `rgba(255,255,255,${rng.range(0.25, 0.95)})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawCityClouds(ctx, w, maxY, colors, rng) {
    const count = rng.int(3, 9);
    ctx.save();
    for (let i = 0; i < count; i++) {
      const cx = rng.range(-w * 0.1, w * 1.1);
      const cy = rng.range(maxY * 0.08, maxY * 0.75);
      const scale = rng.range(0.6, 1.6);
      ctx.fillStyle = lightenColor(rng.pick(colors), rng.range(0.35, 0.55));
      ctx.globalAlpha = rng.range(0.12, 0.35);
      for (let b = 0; b < rng.int(3, 6); b++) {
        ctx.beginPath();
        ctx.ellipse(
          cx + b * 28 * scale,
          cy + rng.range(-8, 8),
          rng.range(28, 58) * scale,
          rng.range(14, 28) * scale,
          0, 0, Math.PI * 2
        );
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawSunOrMoon(ctx, w, h, horizon, colors, rng, skyStyle) {
    const isMoon = skyStyle === "night" || skyStyle === "neon" || skyStyle === "dusk";
    const cx = rng.range(w * 0.12, w * 0.88);
    const cy = rng.range(horizon * 0.12, horizon * 0.55);
    const r = rng.range(Math.min(w, h) * 0.025, Math.min(w, h) * 0.07);
    ctx.save();
    ctx.fillStyle = isMoon ? lightenColor(rng.pick(colors), 0.55) : lightenColor(rng.pick(colors), 0.25);
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = r * rng.range(1.5, 3.5);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function pickBuildingColor(colors, rng, depth, skyStyle) {
    const base = rng.pick(colors);
    const depthDarken = 0.15 + depth * 0.45;
    if (skyStyle === "neon") {
      return rng.chance(0.35) ? base : darkenColor(base, depthDarken);
    }
    return darkenColor(base, depthDarken + rng.range(0, 0.15));
  }

  function drawBuildingWindows(ctx, bx, by, bw, bh, colors, rng, neon) {
    const cellW = rng.range(7, 14);
    const cellH = rng.range(9, 18);
    const cols = Math.max(1, Math.floor(bw / cellW));
    const rows = Math.max(1, Math.floor(bh / cellH));
    const padX = (bw - cols * cellW) / (cols + 1);
    const padY = (bh - rows * cellH) / (rows + 1);
    if (padX < 1 || padY < 1) return;

    ctx.save();
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!rng.chance(0.78)) continue;
        const wx = bx + padX + col * (cellW + padX);
        const wy = by + padY + row * (cellH + padY);
        const lit = neon ? rng.chance(0.62) : rng.chance(0.38);
        ctx.fillStyle = lit
          ? lightenColor(rng.pick(colors), rng.range(0.25, 0.55))
          : darkenColor(rng.pick(colors), rng.range(0.35, 0.6));
        ctx.globalAlpha = lit ? rng.range(0.55, 1) : rng.range(0.15, 0.35);
        ctx.fillRect(wx, wy, cellW * 0.75, cellH * 0.7);
      }
    }
    ctx.restore();
  }

  function drawBuildingSpire(ctx, cx, topY, bw, spireH, color, rng) {
    const w = bw * rng.range(0.15, 0.35);
    ctx.save();
    ctx.fillStyle = darkenColor(color, 0.1);
    ctx.beginPath();
    ctx.moveTo(cx - w / 2, topY);
    ctx.lineTo(cx, topY - spireH);
    ctx.lineTo(cx + w / 2, topY);
    ctx.closePath();
    ctx.fill();
    if (rng.chance(0.45)) {
      ctx.strokeStyle = lightenColor(color, 0.25);
      ctx.lineWidth = Math.max(1, w * 0.08);
      ctx.beginPath();
      ctx.moveTo(cx, topY - spireH);
      ctx.lineTo(cx, topY - spireH - rng.range(4, 18));
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBuildingRow(ctx, w, baseY, maxHeight, minW, colors, rng, depth, skyStyle) {
    const neon = skyStyle === "neon" || skyStyle === "night";
    const silhouette = depth < 0.34;
    let x = -rng.range(0, minW * 1.5);

    while (x < w + minW) {
      const bw = rng.range(minW * 0.55, minW * 2.4);
      const bh = rng.range(maxHeight * 0.25, maxHeight);
      const topY = baseY - bh;
      const color = silhouette
        ? darkenColor(rng.pick(colors), 0.55 + depth * 0.2)
        : pickBuildingColor(colors, rng, depth, skyStyle);

      ctx.fillStyle = color;
      ctx.fillRect(x, topY, bw, bh);

      if (!silhouette && bh > maxHeight * 0.18 && bw > 10) {
        drawBuildingWindows(ctx, x, topY, bw, bh, colors, rng, neon);
      }

      if (rng.chance(silhouette ? 0.08 : 0.18) && bh > maxHeight * 0.35) {
        drawBuildingSpire(ctx, x + bw / 2, topY, bw, bh * rng.range(0.08, 0.22), color, rng);
      }

      if (!silhouette && rng.chance(0.12)) {
        const setbackW = bw * rng.range(0.35, 0.7);
        const setbackH = bh * rng.range(0.15, 0.35);
        ctx.fillStyle = darkenColor(color, 0.12);
        ctx.fillRect(x + (bw - setbackW) / 2, topY - setbackH, setbackW, setbackH);
        if (setbackW > 12) {
          drawBuildingWindows(ctx, x + (bw - setbackW) / 2, topY - setbackH, setbackW, setbackH, colors, rng, neon);
        }
      }

      x += bw + rng.range(-bw * 0.08, minW * 0.35);
    }
  }

  function drawCityWater(ctx, w, h, horizon, colors, rng) {
    const waterTop = horizon + rng.range(2, h * 0.04);
    const sliceH = Math.floor(horizon);
    const temp = document.createElement("canvas");
    temp.width = w;
    temp.height = sliceH;
    temp.getContext("2d").drawImage(ctx.canvas, 0, 0, w, sliceH, 0, 0, w, sliceH);

    const waterH = h - waterTop;
    const grad = ctx.createLinearGradient(0, waterTop, 0, h);
    grad.addColorStop(0, darkenColor(rng.pick(colors), 0.15));
    grad.addColorStop(1, darkenColor(rng.pick(colors), 0.5));
    ctx.fillStyle = grad;
    ctx.fillRect(0, waterTop, w, waterH);

    ctx.save();
    ctx.globalAlpha = rng.range(0.22, 0.42);
    const reflectH = waterH * rng.range(0.65, 0.92);
    ctx.translate(0, waterTop + reflectH);
    ctx.scale(1, -1);
    ctx.drawImage(temp, 0, 0, w, sliceH, 0, 0, w, reflectH);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = rng.range(0.04, 0.12);
    ctx.strokeStyle = lightenColor(rng.pick(colors), 0.4);
    for (let i = 0; i < rng.int(4, 12); i++) {
      const y = waterTop + rng.range(reflectH * 0.1, reflectH * 0.95);
      ctx.lineWidth = rng.range(0.5, 2);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * 0.25, y + rng.range(-4, 4), w * 0.75, y + rng.range(-4, 4), w, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawCityForeground(ctx, w, horizon, colors, rng) {
    const lampCount = rng.int(2, 7);
    ctx.save();
    for (let i = 0; i < lampCount; i++) {
      const x = rng.range(0, w);
      const poleH = rng.range(18, 42);
      const baseY = horizon + rng.range(-2, 6);
      ctx.strokeStyle = darkenColor(rng.pick(colors), 0.5);
      ctx.lineWidth = rng.range(1.5, 3);
      ctx.beginPath();
      ctx.moveTo(x, baseY);
      ctx.lineTo(x, baseY - poleH);
      ctx.stroke();
      ctx.fillStyle = lightenColor(rng.pick(colors), 0.35);
      ctx.globalAlpha = rng.range(0.5, 0.9);
      ctx.beginPath();
      ctx.arc(x, baseY - poleH, rng.range(3, 7), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    if (rng.chance(0.35)) {
      const bridgeY = horizon - rng.range(8, 28);
      const bridgeH = rng.range(6, 16);
      ctx.save();
      ctx.fillStyle = darkenColor(rng.pick(colors), 0.35);
      ctx.globalAlpha = 0.85;
      ctx.fillRect(0, bridgeY, w, bridgeH);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = lightenColor(rng.pick(colors), 0.2);
      ctx.lineWidth = 2;
      const arches = rng.int(3, 8);
      const archW = w / arches;
      for (let i = 0; i < arches; i++) {
        const ax = i * archW + archW / 2;
        ctx.beginPath();
        ctx.moveTo(ax - archW * 0.35, bridgeY);
        ctx.quadraticCurveTo(ax, bridgeY - rng.range(12, 36), ax + archW * 0.35, bridgeY);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  function drawNeonAccents(ctx, w, horizon, colors, rng) {
    const count = rng.int(3, 10);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < count; i++) {
      const x = rng.range(0, w);
      const y = rng.range(horizon * 0.35, horizon * 0.95);
      const len = rng.range(20, 90);
      const color = lightenColor(rng.pick(colors), 0.4);
      ctx.strokeStyle = color;
      ctx.lineWidth = rng.range(1, 3);
      ctx.shadowColor = color;
      ctx.shadowBlur = rng.range(6, 18);
      ctx.globalAlpha = rng.range(0.35, 0.75);
      ctx.beginPath();
      if (rng.chance(0.5)) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + rng.range(-len, len), y);
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - len);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function generateCityscape(ctx, width, height, paletteState) {
    const seed = Date.now() ^ (Math.random() * 0xffffffff);
    const rng = createRng(seed);
    const colors = getPaletteColors(paletteState);
    if (!colors.length) return seed;

    const skyStyle = rng.pick(["dusk", "night", "day", "sunset", "neon"]);
    const horizon = height * rng.range(0.58, 0.76);
    const hasWater = rng.chance(0.38);

    drawCitySky(ctx, width, height, horizon, colors, rng, skyStyle);
    if (skyStyle === "night" || skyStyle === "neon" || (skyStyle === "dusk" && rng.chance(0.6))) {
      drawCityStars(ctx, width, horizon, rng);
    }
    if (rng.chance(0.55)) drawCityClouds(ctx, width, horizon, colors, rng);
    if (rng.chance(0.45)) drawSunOrMoon(ctx, width, height, horizon, colors, rng, skyStyle);

    const layerCount = rng.int(2, 4);
    for (let layer = 0; layer < layerCount; layer++) {
      const depth = layer / (layerCount - 1 || 1);
      const baseY = horizon - depth * height * rng.range(0.04, 0.1);
      const maxH = height * rng.range(0.14, 0.38) * (1.05 - depth * 0.55);
      const minW = width / rng.int(22, 42);
      drawBuildingRow(ctx, width, baseY, maxH, minW, colors, rng, depth, skyStyle);
    }

    if (skyStyle === "neon") drawNeonAccents(ctx, width, horizon, colors, rng);
    if (hasWater) drawCityWater(ctx, width, height, horizon, colors, rng);
    if (rng.chance(0.4)) drawCityForeground(ctx, width, horizon, colors, rng);

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;

    return seed;
  }

  function streetHalfAt(y, vpY, groundY, streetHalfBottom) {
    const t = (y - vpY) / (groundY - vpY);
    return Math.max(0, streetHalfBottom * t);
  }

  function streetLeftX(y, vpX, vpY, groundY, streetHalfBottom) {
    return vpX - streetHalfAt(y, vpY, groundY, streetHalfBottom);
  }

  function streetRightX(y, vpX, vpY, groundY, streetHalfBottom) {
    return vpX + streetHalfAt(y, vpY, groundY, streetHalfBottom);
  }

  function fillPerspectiveQuad(ctx, x0, y0, x1, y1, x2, y2, x3, y3, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawPerspectiveFacadeWindows(ctx, wallX, yBottom, yTop, vpX, vpY, groundY, streetHalfBottom, colors, rng, neon, side) {
    if (yBottom - yTop < 8) return;
    const rows = rng.int(3, 10);
    const cols = rng.int(3, 8);
    ctx.save();
    ctx.lineWidth = rng.range(0.5, 1.5);
    for (let r = 1; r < rows; r++) {
      const y = yTop + (yBottom - yTop) * (r / rows);
      const xStreet = side === "left"
        ? streetLeftX(y, vpX, vpY, groundY, streetHalfBottom)
        : streetRightX(y, vpX, vpY, groundY, streetHalfBottom);
      const xWall = side === "left" ? wallX : xStreet;
      const xEnd = side === "left" ? xStreet : wallX;
      ctx.strokeStyle = darkenColor(rng.pick(colors), 0.35);
      ctx.globalAlpha = rng.range(0.25, 0.5);
      ctx.beginPath();
      ctx.moveTo(xWall, y);
      ctx.lineTo(xEnd, y);
      ctx.stroke();
    }
    for (let c = 1; c < cols; c++) {
      const frac = c / cols;
      const xBottom = side === "left"
        ? wallX + (streetLeftX(yBottom, vpX, vpY, groundY, streetHalfBottom) - wallX) * frac
        : streetRightX(yBottom, vpX, vpY, groundY, streetHalfBottom) + (wallX - streetRightX(yBottom, vpX, vpY, groundY, streetHalfBottom)) * frac;
      const xTop = side === "left"
        ? wallX + (streetLeftX(yTop, vpX, vpY, groundY, streetHalfBottom) - wallX) * frac
        : streetRightX(yTop, vpX, vpY, groundY, streetHalfBottom) + (wallX - streetRightX(yTop, vpX, vpY, groundY, streetHalfBottom)) * frac;
      ctx.beginPath();
      ctx.moveTo(xBottom, yBottom);
      ctx.lineTo(xTop, yTop);
      ctx.stroke();
    }

    const litCount = rng.int(3, 14);
    for (let i = 0; i < litCount; i++) {
      const y = rng.range(yTop + 4, yBottom - 4);
      const xStreet = side === "left"
        ? streetLeftX(y, vpX, vpY, groundY, streetHalfBottom)
        : streetRightX(y, vpX, vpY, groundY, streetHalfBottom);
      const span = Math.abs(xStreet - wallX);
      if (span < 4) continue;
      const wx = side === "left" ? wallX + rng.range(span * 0.08, span * 0.82) : wallX - rng.range(span * 0.08, span * 0.82);
      const lit = neon ? rng.chance(0.72) : rng.chance(0.42);
      if (!lit) continue;
      const ww = span * rng.range(0.05, 0.14);
      const wh = (yBottom - yTop) * rng.range(0.03, 0.09);
      ctx.fillStyle = lightenColor(rng.pick(colors), rng.range(0.25, 0.55));
      ctx.globalAlpha = rng.range(0.5, 0.98);
      ctx.fillRect(wx - ww / 2, y - wh / 2, ww, wh);
    }
    ctx.restore();
  }

  function drawPerspectiveStreetSurface(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng) {
    const leftBot = streetLeftX(h, vpX, vpY, h, streetHalfBottom);
    const rightBot = streetRightX(h, vpX, vpY, h, streetHalfBottom);
    const streetGrad = ctx.createLinearGradient(0, vpY, 0, h);
    streetGrad.addColorStop(0, darkenColor(rng.pick(colors), 0.35));
    streetGrad.addColorStop(1, darkenColor(rng.pick(colors), 0.55));
    ctx.save();
    ctx.fillStyle = streetGrad;
    ctx.beginPath();
    ctx.moveTo(vpX, vpY);
    ctx.lineTo(leftBot, h);
    ctx.lineTo(rightBot, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawPerspectiveStreetLanes(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng) {
    const leftBot = streetLeftX(h, vpX, vpY, h, streetHalfBottom);
    const rightBot = streetRightX(h, vpX, vpY, h, streetHalfBottom);
    ctx.save();
    ctx.strokeStyle = lightenColor(rng.pick(colors), 0.2);
    ctx.lineWidth = rng.range(1, 2.5);
    ctx.globalAlpha = rng.range(0.3, 0.55);
    const lanes = rng.int(3, 6);
    for (let i = 1; i < lanes; i++) {
      const frac = i / lanes;
      ctx.beginPath();
      ctx.moveTo(vpX, vpY);
      ctx.lineTo(vpX + (leftBot - vpX) * frac, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(vpX, vpY);
      ctx.lineTo(vpX + (rightBot - vpX) * frac, h);
      ctx.stroke();
    }
    ctx.strokeStyle = lightenColor(rng.pick(colors), 0.3);
    ctx.lineWidth = rng.range(2, 4);
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(leftBot, h);
    ctx.lineTo(vpX, vpY);
    ctx.lineTo(rightBot, h);
    ctx.stroke();
    ctx.restore();
  }

  function drawPerspectiveStreetEdges(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng) {
    const leftBot = streetLeftX(h, vpX, vpY, h, streetHalfBottom);
    const rightBot = streetRightX(h, vpX, vpY, h, streetHalfBottom);
    const yTop = vpY + (h - vpY) * 0.02;
    const leftTop = streetLeftX(yTop, vpX, vpY, h, streetHalfBottom);
    const rightTop = streetRightX(yTop, vpX, vpY, h, streetHalfBottom);
    ctx.save();
    ctx.strokeStyle = lightenColor(rng.pick(colors), 0.15);
    ctx.lineWidth = rng.range(2, 4);
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(leftBot, h);
    ctx.lineTo(leftTop, yTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightBot, h);
    ctx.lineTo(rightTop, yTop);
    ctx.stroke();
    ctx.restore();
  }

  function drawTowerWindows(ctx, xBL, xBR, xTL, xTR, yBase, yRoof, colors, rng, neon) {
    const rows = rng.int(3, 10);
    const cols = rng.int(2, 6);
    const h = yBase - yRoof;
    if (h < 14 || xBR - xBL < 10) return;
    ctx.save();
    ctx.lineWidth = 1;
    for (let r = 1; r < rows; r++) {
      const y = yRoof + (h * r) / rows;
      const t = (y - yRoof) / h;
      const xL = xTL + (xBL - xTL) * t;
      const xR = xTR + (xBR - xTR) * t;
      ctx.strokeStyle = darkenColor(rng.pick(colors), 0.4);
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(xL, y);
      ctx.lineTo(xR, y);
      ctx.stroke();
    }
    for (let c = 1; c < cols; c++) {
      const frac = c / cols;
      const xB = xBL + (xBR - xBL) * frac;
      const xT = xTL + (xTR - xTL) * frac;
      ctx.beginPath();
      ctx.moveTo(xB, yBase);
      ctx.lineTo(xT, yRoof);
      ctx.stroke();
    }
    const lights = rng.int(2, 8);
    for (let i = 0; i < lights; i++) {
      const t = rng.range(0.1, 0.9);
      const y = yRoof + h * t;
      const xL = xTL + (xBL - xTL) * t;
      const xR = xTR + (xBR - xTR) * t;
      if (!rng.chance(neon ? 0.65 : 0.4)) continue;
      const wx = xL + (xR - xL) * rng.range(0.15, 0.85);
      const ww = (xR - xL) * 0.12;
      const wh = h * 0.06;
      ctx.fillStyle = lightenColor(rng.pick(colors), 0.4);
      ctx.globalAlpha = rng.range(0.55, 1);
      ctx.fillRect(wx - ww / 2, y - wh / 2, ww, wh);
    }
    ctx.restore();
  }

  function drawPerspectiveGround(ctx, w, h, vpY, colors, rng) {
    const grad = ctx.createLinearGradient(0, vpY, 0, h);
    grad.addColorStop(0, darkenColor(rng.pick(colors), 0.45));
    grad.addColorStop(1, darkenColor(rng.pick(colors), 0.65));
    ctx.fillStyle = grad;
    ctx.fillRect(0, vpY, w, h - vpY);
  }

  function streetEdgeX(y, side, vpX, vpY, groundY, streetHalfBottom) {
    return side === "left"
      ? streetLeftX(y, vpX, vpY, groundY, streetHalfBottom)
      : streetRightX(y, vpX, vpY, groundY, streetHalfBottom);
  }

  function drawParallelFacadeWindows(ctx, outerNear, yNear, outerFar, yFar, yRoofNear, yRoofFar, colors, rng, neon) {
    const cols = rng.int(2, 6);
    const rows = rng.int(4, 10);
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = darkenColor(rng.pick(colors), 0.35);
    ctx.globalAlpha = 0.35;

    for (let c = 1; c < cols; c++) {
      const frac = c / cols;
      const y = yFar + (yNear - yFar) * frac;
      const x = outerFar + (outerNear - outerFar) * frac;
      const yR = yRoofFar + (yRoofNear - yRoofFar) * frac;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, yR);
      ctx.stroke();
    }
    for (let r = 1; r < rows; r++) {
      const t = r / rows;
      const yA = yRoofNear + (yNear - yRoofNear) * t;
      const yB = yRoofFar + (yFar - yRoofFar) * t;
      ctx.beginPath();
      ctx.moveTo(outerNear, yA);
      ctx.lineTo(outerFar, yB);
      ctx.stroke();
    }

    const lights = rng.int(4, 14);
    for (let i = 0; i < lights; i++) {
      const frac = rng.range(0.1, 0.9);
      const y = yFar + (yNear - yFar) * frac;
      const x = outerFar + (outerNear - outerFar) * frac;
      const yR = yRoofFar + (yRoofNear - yRoofFar) * frac;
      if (y <= yR + 4) continue;
      if (!rng.chance(neon ? 0.65 : 0.4)) continue;
      const ww = Math.max(4, Math.abs(outerNear - outerFar) * 0.1 + 3);
      const wh = (y - yR) * 0.07;
      ctx.fillStyle = lightenColor(rng.pick(colors), 0.4);
      ctx.globalAlpha = rng.range(0.55, 1);
      ctx.fillRect(x - ww / 2, y - wh / 2, ww, wh);
    }
    ctx.restore();
  }

  function drawStreetParallelBlock(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng, skyStyle, side, yFar, yNear) {
    const neon = skyStyle === "neon" || skyStyle === "night";
    const slNear = streetEdgeX(yNear, side, vpX, vpY, h, streetHalfBottom);
    const slFar = streetEdgeX(yFar, side, vpX, vpY, h, streetHalfBottom);

    const spanNear = side === "left" ? slNear : w - slNear;
    const spanFar = side === "left" ? slFar : w - slFar;
    const widthNear = spanNear * rng.range(0.55, 0.95);
    const widthFar = spanFar * rng.range(0.5, 0.9);

    let outerNear;
    let outerFar;
    if (side === "left") {
      outerNear = Math.max(0, slNear - widthNear);
      outerFar = Math.max(0, slFar - widthFar);
    } else {
      outerNear = Math.min(w, slNear + widthNear);
      outerFar = Math.min(w, slFar + widthFar);
    }

    const heightNear = (yNear - vpY) * rng.range(0.5, 1.05);
    const heightFar = (yFar - vpY) * rng.range(0.45, 0.95);
    const yRoofNear = yNear - heightNear;
    const yRoofFar = yFar - heightFar;

    const color = pickBuildingColor(colors, rng, rng.range(0.2, 0.8), skyStyle);
    const sideColor = darkenColor(color, 0.16);
    const capColor = darkenColor(color, 0.24);
    const topColor = darkenColor(color, 0.28);
    const edgeColor = darkenColor(color, 0.42);

    ctx.save();
    ctx.globalAlpha = rng.range(0.88, 1);
    ctx.lineWidth = 1;

    if (side === "left") {
      ctx.fillStyle = color;
      fillPerspectiveQuad(ctx, outerNear, yNear, outerFar, yFar, outerFar, yRoofFar, outerNear, yRoofNear, color, 1);
      ctx.fillStyle = sideColor;
      fillPerspectiveQuad(ctx, outerNear, yNear, slNear, yNear, slFar, yFar, outerFar, yFar, sideColor, 1);
      ctx.fillStyle = capColor;
      fillPerspectiveQuad(ctx, 0, yNear, outerNear, yNear, outerNear, yRoofNear, 0, yRoofNear, capColor, 1);
      ctx.fillStyle = topColor;
      fillPerspectiveQuad(ctx, 0, yRoofNear, outerNear, yRoofNear, outerFar, yRoofFar, 0, yRoofFar, topColor, 1);

      ctx.strokeStyle = edgeColor;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(outerNear, yNear);
      ctx.lineTo(outerFar, yFar);
      ctx.lineTo(outerFar, yRoofFar);
      ctx.lineTo(outerNear, yRoofNear);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.fillStyle = color;
      fillPerspectiveQuad(ctx, outerNear, yNear, outerFar, yFar, outerFar, yRoofFar, outerNear, yRoofNear, color, 1);
      ctx.fillStyle = sideColor;
      fillPerspectiveQuad(ctx, slNear, yNear, outerNear, yNear, outerFar, yFar, slFar, yFar, sideColor, 1);
      ctx.fillStyle = capColor;
      fillPerspectiveQuad(ctx, outerNear, yNear, w, yNear, w, yRoofNear, outerNear, yRoofNear, capColor, 1);
      ctx.fillStyle = topColor;
      fillPerspectiveQuad(ctx, outerNear, yRoofNear, w, yRoofNear, w, yRoofFar, outerFar, yRoofFar, topColor, 1);

      ctx.strokeStyle = edgeColor;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(outerNear, yNear);
      ctx.lineTo(outerFar, yFar);
      ctx.lineTo(outerFar, yRoofFar);
      ctx.lineTo(outerNear, yRoofNear);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
    drawParallelFacadeWindows(ctx, outerNear, yNear, outerFar, yFar, yRoofNear, yRoofFar, colors, rng, neon);

    const capW = side === "left" ? outerNear : w - outerNear;
    if (capW > 10) {
      const capX = side === "left" ? 0 : outerNear;
      drawBuildingWindows(ctx, capX, yRoofNear, capW, heightNear, colors, rng, neon);
    }

    if (rng.chance(0.2)) {
      const cx = (outerNear + outerFar) / 2;
      const roofY = (yRoofNear + yRoofFar) / 2;
      drawBuildingSpire(ctx, cx, roofY, widthNear * 0.25, heightNear * rng.range(0.1, 0.2), color, rng);
    }
  }

  function drawPerspectiveBuildings(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng, skyStyle) {
    const blockCount = rng.int(3, 5);
    for (let i = 0; i < blockCount; i++) {
      const tFar = i / blockCount;
      const tNear = (i + 1) / blockCount;
      const yFar = vpY + (h - vpY) * tFar;
      const yNear = vpY + (h - vpY) * tNear;
      if (yNear - yFar < 10) continue;
      drawStreetParallelBlock(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng, skyStyle, "left", yFar, yNear);
      drawStreetParallelBlock(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng, skyStyle, "right", yFar, yNear);
    }
  }

  function drawPerspectiveStreetLanesClipped(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng) {
    const leftBot = streetLeftX(h, vpX, vpY, h, streetHalfBottom);
    const rightBot = streetRightX(h, vpX, vpY, h, streetHalfBottom);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(vpX, vpY);
    ctx.lineTo(leftBot, h);
    ctx.lineTo(rightBot, h);
    ctx.closePath();
    ctx.clip();
    drawPerspectiveStreetLanes(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng);
    ctx.restore();
  }

  function drawDistantSkyline(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng) {
    const yBase = vpY + (h - vpY) * rng.range(0.04, 0.12);
    const leftEdge = streetLeftX(yBase, vpX, vpY, h, streetHalfBottom);
    const rightEdge = streetRightX(yBase, vpX, vpY, h, streetHalfBottom);
    let x = 0;
    while (x < w) {
      const bw = rng.range(12, 48);
      const bh = rng.range((h - vpY) * 0.06, (h - vpY) * rng.range(0.14, 0.28));
      const inStreet = x + bw > leftEdge && x < rightEdge;
      if (!inStreet) {
        ctx.fillStyle = darkenColor(rng.pick(colors), rng.range(0.3, 0.5));
        ctx.globalAlpha = rng.range(0.65, 0.9);
        ctx.fillRect(x, yBase - bh, bw, bh);
      }
      x += bw + rng.range(2, 12);
    }
    ctx.globalAlpha = 1;
  }

  function drawPerspectiveStreet(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng) {
    drawPerspectiveStreetSurface(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng);
    drawPerspectiveStreetLanes(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng);
  }

  function drawPerspectiveSidewalks(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng) {
    drawPerspectiveStreetEdges(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng);
  }

  function drawPerspectiveNeonSigns(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng) {
    const count = rng.int(4, 12);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < count; i++) {
      const y = rng.range(vpY + (h - vpY) * 0.15, h * 0.92);
      const side = rng.pick(["left", "right"]);
      const xStreet = side === "left"
        ? streetLeftX(y, vpX, vpY, h, streetHalfBottom)
        : streetRightX(y, vpX, vpY, h, streetHalfBottom);
      const signW = (h - vpY) * rng.range(0.02, 0.06) * ((y - vpY) / (h - vpY));
      const signH = signW * rng.range(0.35, 0.7);
      const x = side === "left" ? xStreet - signW * rng.range(0.3, 0.9) : xStreet + signW * rng.range(0.1, 0.6);
      const color = lightenColor(rng.pick(colors), 0.45);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = rng.range(8, 22);
      ctx.globalAlpha = rng.range(0.45, 0.85);
      ctx.fillRect(x, y - signH, signW, signH);
    }
    ctx.restore();
  }

  function drawPerspectiveWetStreet(ctx, w, h, vpX, vpY, streetHalfBottom, colors, rng) {
    const wetTop = h * rng.range(0.55, 0.72);
    const temp = document.createElement("canvas");
    temp.width = w;
    temp.height = Math.ceil(wetTop);
    temp.getContext("2d").drawImage(ctx.canvas, 0, 0, w, wetTop, 0, 0, w, wetTop);

    const grad = ctx.createLinearGradient(0, wetTop, 0, h);
    grad.addColorStop(0, "rgba(0,0,0,0.15)");
    grad.addColorStop(1, darkenColor(rng.pick(colors), 0.45));
    ctx.fillStyle = grad;
    ctx.fillRect(0, wetTop, w, h - wetTop);

    ctx.save();
    ctx.globalAlpha = rng.range(0.18, 0.35);
    const reflectH = (h - wetTop) * rng.range(0.7, 0.95);
    ctx.translate(0, wetTop + reflectH);
    ctx.scale(1, -0.45);
    ctx.drawImage(temp, 0, 0, w, wetTop, 0, 0, w, reflectH);
    ctx.restore();
  }

  function drawTwoPointPerspectiveBlock(ctx, w, h, colors, rng, skyStyle) {
    const horizon = h * rng.range(0.32, 0.42);
    const vpLeft = { x: w * rng.range(-0.15, 0.12), y: horizon };
    const vpRight = { x: w * rng.range(0.88, 1.15), y: horizon };
    const groundY = h * rng.range(0.88, 0.96);
    const neon = skyStyle === "neon" || skyStyle === "night";

    drawCitySky(ctx, w, h, horizon, colors, rng, skyStyle);
    if (skyStyle === "night" || skyStyle === "neon") drawCityStars(ctx, w, horizon, rng);
    if (rng.chance(0.4)) drawSunOrMoon(ctx, w, h, horizon, colors, rng, skyStyle);

    const groundColor = darkenColor(rng.pick(colors), 0.5);
    ctx.fillStyle = groundColor;
    ctx.fillRect(0, horizon, w, h - horizon);

    const blocks = rng.int(6, 12);
    for (let b = 0; b < blocks; b++) {
      const yBase = groundY - (groundY - horizon) * rng.range(0.05, 0.95);
      const height = (groundY - horizon) * rng.range(0.08, 0.45) * rng.range(0.5, 1);
      const yTop = yBase - height;
      const side = rng.pick(["left", "right"]);
      const vp = side === "left" ? vpLeft : vpRight;
      const anchorX = side === "left" ? rng.range(w * 0.02, w * 0.45) : rng.range(w * 0.55, w * 0.98);
      const widthBase = w * rng.range(0.06, 0.22);

      const x0 = anchorX;
      const x1 = anchorX + (side === "left" ? widthBase : -widthBase);
      const xTop0 = x0 + (vp.x - x0) * ((yTop - yBase) / (groundY - yBase)) * 0.15;
      const xTop1 = x1 + (vp.x - x1) * ((yTop - yBase) / (groundY - yBase)) * 0.15;

      const color = pickBuildingColor(colors, rng, rng.range(0.2, 0.8), skyStyle);
      fillPerspectiveQuad(ctx, x0, yBase, x1, yBase, xTop1, yTop, xTop0, yTop, color, rng.range(0.65, 0.95));
      drawBuildingWindows(
        ctx,
        Math.min(x0, x1),
        yTop,
        Math.abs(x1 - x0),
        height,
        colors,
        rng,
        neon
      );
    }

    if (skyStyle === "neon") drawNeonAccents(ctx, w, horizon, colors, rng);
  }

  function generatePerspectiveCityscape(ctx, width, height, paletteState) {
    const seed = Date.now() ^ (Math.random() * 0xffffffff);
    const rng = createRng(seed);
    const colors = getPaletteColors(paletteState);
    if (!colors.length) return seed;

    const skyStyle = rng.pick(["dusk", "night", "day", "sunset", "neon"]);
    const useTwoPoint = rng.chance(0.12);

    if (useTwoPoint) {
      drawTwoPointPerspectiveBlock(ctx, width, height, colors, rng, skyStyle);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;
      return seed;
    }

    const vpX = width * rng.range(0.44, 0.56);
    const vpY = height * rng.range(0.3, 0.4);
    const streetHalfBottom = width * rng.range(0.1, 0.22);
    const hasWetStreet = rng.chance(0.35);

    drawCitySky(ctx, width, height, vpY, colors, rng, skyStyle);
    if (skyStyle === "night" || skyStyle === "neon" || (skyStyle === "dusk" && rng.chance(0.55))) {
      drawCityStars(ctx, width, vpY, rng);
    }
    if (rng.chance(0.45)) drawCityClouds(ctx, width, vpY, colors, rng);
    if (rng.chance(0.4)) drawSunOrMoon(ctx, width, height, vpY, colors, rng, skyStyle);

    // Back → front: sky, horizon, ground, street, buildings, street details
    drawDistantSkyline(ctx, width, height, vpX, vpY, streetHalfBottom, colors, rng);
    drawPerspectiveGround(ctx, width, height, vpY, colors, rng);
    drawPerspectiveStreetSurface(ctx, width, height, vpX, vpY, streetHalfBottom, colors, rng);
    drawPerspectiveBuildings(ctx, width, height, vpX, vpY, streetHalfBottom, colors, rng, skyStyle);
    drawPerspectiveStreetLanesClipped(ctx, width, height, vpX, vpY, streetHalfBottom, colors, rng);
    drawPerspectiveStreetEdges(ctx, width, height, vpX, vpY, streetHalfBottom, colors, rng);

    if (skyStyle === "neon") {
      drawPerspectiveNeonSigns(ctx, width, height, vpX, vpY, streetHalfBottom, colors, rng);
      drawNeonAccents(ctx, width, vpY, colors, rng);
    }

    if (hasWetStreet) drawPerspectiveWetStreet(ctx, width, height, vpX, vpY, streetHalfBottom, colors, rng);

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, vpY);
    ctx.lineTo(width, vpY);
    ctx.stroke();
    ctx.restore();

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;

    return seed;
  }

  const ABSTRACT1_RIBBON_COLORS = [
    "#3d0f28", "#5c1240", "#7a1a52", "#9d1b5c", "#be185d", "#db2777",
    "#e879a8", "#f472b6", "#ff5c3a", "#f97316", "#fb923c", "#78716c",
    "#a8a29e", "#d6d3d1", "#4c1d4a", "#6b2d5c",
  ];

  function buildRibbonPalette(paletteState, rng) {
    const base = getPaletteColors(paletteState);
    const warm = base.filter((c) => {
      const [h] = Palette.hexToHsl(c);
      return h < 70 || h > 265;
    });
    const merged = [...new Set([...ABSTRACT1_RIBBON_COLORS, ...warm, ...base])];
    return rng.shuffle(merged).slice(0, rng.int(9, 15));
  }

  function cubicPoint(p0, p1, p2, p3, t) {
    const u = 1 - t;
    const u2 = u * u;
    const u3 = u2 * u;
    const t2 = t * t;
    const t3 = t2 * t;
    const x = u3 * p0.x + 3 * u2 * t * p1.x + 3 * u * t2 * p2.x + t3 * p3.x;
    const y = u3 * p0.y + 3 * u2 * t * p1.y + 3 * u * t2 * p2.y + t3 * p3.y;
    const dx = 3 * u2 * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t2 * (p3.x - p2.x);
    const dy = 3 * u2 * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t2 * (p3.y - p2.y);
    const len = Math.hypot(dx, dy) || 1;
    return { x, y, nx: -dy / len, ny: dx / len };
  }

  function pickEdgePoint(rng, w, h, margin) {
    const m = margin ?? 0.12;
    const edge = rng.int(0, 3);
    if (edge === 0) return { x: rng.range(-w * m, w * (1 + m)), y: rng.range(-h * m, h * m * 0.5) };
    if (edge === 1) return { x: rng.range(w * (1 - m * 0.5), w * (1 + m)), y: rng.range(-h * m, h * (1 + m)) };
    if (edge === 2) return { x: rng.range(-w * m, w * (1 + m)), y: rng.range(h * (1 - m * 0.5), h * (1 + m)) };
    return { x: rng.range(-w * m, w * m * 0.5), y: rng.range(-h * m, h * (1 + m)) };
  }

  function createRibbonSpec(rng, w, h, fromLeft, style) {
    const expansive = style === "expansive";
    const segments = [];
    let prev;

    if (expansive) {
      prev = pickEdgePoint(rng, w, h, 0.14);
    } else {
      prev = fromLeft
        ? { x: rng.range(-w * 0.08, w * 0.14), y: rng.range(h * 0.05, h * 0.94) }
        : { x: rng.range(w * 0.86, w * 1.08), y: rng.range(h * 0.05, h * 0.94) };
    }

    const segCount = expansive ? rng.int(2, 4) : rng.int(1, 3);

    for (let s = 0; s < segCount; s++) {
      let end;
      if (expansive) {
        end = s === segCount - 1 ? pickEdgePoint(rng, w, h, 0.14) : {
          x: rng.range(-w * 0.08, w * 1.08),
          y: rng.range(-h * 0.08, h * 1.08),
        };
      } else if (s === segCount - 1) {
        end = {
          x: fromLeft ? rng.range(w * 0.42, w * 0.9) : rng.range(w * 0.1, w * 0.58),
          y: rng.range(h * 0.06, h * 0.94),
        };
      } else {
        end = { x: rng.range(w * 0.18, w * 0.82), y: rng.range(h * 0.08, h * 0.92) };
      }

      const cpSpreadX = expansive ? w * 0.55 : w * 0.38;
      const cpSpreadY = expansive ? h * 0.62 : h * 0.48;
      const cp1 = {
        x: prev.x + rng.range(-cpSpreadX, cpSpreadX),
        y: prev.y + rng.range(-cpSpreadY, cpSpreadY),
      };
      const cp2 = {
        x: end.x + rng.range(-cpSpreadX, cpSpreadX),
        y: end.y + rng.range(-cpSpreadY, cpSpreadY),
      };
      segments.push({ p0: { ...prev }, p1: cp1, p2: cp2, p3: { ...end } });
      prev = end;
    }

    const minDim = Math.min(w, h);
    const maxDim = Math.max(w, h);
    let maxWidth;
    if (expansive) {
      if (rng.chance(0.35)) {
        maxWidth = rng.range(maxDim * 0.55, maxDim * 0.96);
      } else {
        maxWidth = rng.range(minDim * 0.08, minDim * 0.72);
      }
    } else {
      maxWidth = rng.range(minDim * 0.07, minDim * 0.26);
    }

    return {
      segments,
      maxWidth,
      strands: expansive ? rng.int(28, 96) : rng.int(30, 78),
      depth: rng.range(0, 1),
      wobbleAmp: expansive ? rng.range(0.02, 0.14) : rng.range(0.015, 0.09),
      wobbleFreq: rng.range(2.5, 8),
      widthScalePower: expansive ? rng.range(0.28, 0.5) : 0.62,
      widthScaleMin: expansive ? rng.range(0.18, 0.42) : 0.06,
      widthPulseFreq: expansive ? rng.range(1.2, 4.5) : 0,
      widthPulseAmp: expansive ? rng.range(0.35, 0.85) : 0,
      widthPhase: rng.range(0, Math.PI * 2),
    };
  }

  function createRibbonSpecs(rng, w, h, style) {
    const expansive = style === "expansive";
    const count = expansive ? rng.int(2, 6) : rng.int(2, 5);
    const ribbons = [];
    for (let i = 0; i < count; i++) {
      const fromLeft = expansive ? rng.chance(0.5) : i % 2 === 0;
      ribbons.push(createRibbonSpec(rng, w, h, fromLeft, style));
    }
    return ribbons.sort((a, b) => a.depth - b.depth);
  }

  function sampleRibbonPath(segments, t) {
    const n = segments.length;
    const ft = Math.min(Math.max(t, 0), 1) * n;
    const idx = Math.min(Math.floor(ft), n - 1);
    const lt = ft - idx;
    const seg = segments[idx];
    return cubicPoint(seg.p0, seg.p1, seg.p2, seg.p3, lt);
  }

  function drawFlowRibbon(ctx, spec, palette, rng) {
    const steps = rng.int(170, 300);
    const samples = [];
    const scalePower = spec.widthScalePower ?? 0.62;
    const scaleMin = spec.widthScaleMin ?? 0.06;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const pt = sampleRibbonPath(spec.segments, t);
      let widthScale = Math.max(scaleMin, Math.pow(Math.sin(t * Math.PI), scalePower));
      if (spec.widthPulseFreq > 0) {
        const pulse = Math.sin(t * Math.PI * spec.widthPulseFreq + spec.widthPhase);
        widthScale *= 1 - spec.widthPulseAmp * 0.5 + spec.widthPulseAmp * (pulse * 0.5 + 0.5);
      }
      pt.widthScale = widthScale;
      pt.t = t;
      samples.push(pt);
    }

    const strandColors = [];
    for (let s = 0; s < spec.strands; s++) {
      strandColors.push(rng.pick(palette));
    }

    ctx.save();
    ctx.lineCap = "butt";
    ctx.lineJoin = "round";

    for (let s = 0; s < spec.strands; s++) {
      const frac = spec.strands > 1 ? s / (spec.strands - 1) : 0.5;
      const offsetCenter = (frac - 0.5) * 2;
      let baseColor = strandColors[s];
      if (offsetCenter > 0.35) baseColor = lightenColor(baseColor, 0.08);
      else if (offsetCenter < -0.35) baseColor = darkenColor(baseColor, 0.14);

      ctx.strokeStyle = baseColor;
      ctx.globalAlpha = 1;
      ctx.lineWidth = Math.max(1.1, (spec.maxWidth / spec.strands) * 1.2);

      ctx.beginPath();
      for (let i = 0; i < samples.length; i++) {
        const pt = samples[i];
        const halfW = spec.maxWidth * pt.widthScale * 0.5;
        const wobble = Math.sin(pt.t * Math.PI * spec.wobbleFreq + s * 0.17) * spec.maxWidth * spec.wobbleAmp;
        const ox = pt.x + pt.nx * (offsetCenter * halfW + wobble);
        const oy = pt.y + pt.ny * (offsetCenter * halfW + wobble);
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function generateRibbonAbstract(ctx, width, height, paletteState, style) {
    const seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
    const rng = createRng(seed);
    const expansive = style === "expansive";

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    const palette = buildRibbonPalette(paletteState, rng);
    const ribbons = createRibbonSpecs(rng, width, height, style);

    for (const ribbon of ribbons) {
      drawFlowRibbon(ctx, ribbon, palette, rng);
    }

    const accentChance = expansive ? 0.5 : 0.6;
    if (rng.chance(accentChance)) {
      const accentCount = rng.int(1, expansive ? 3 : 2);
      for (let i = 0; i < accentCount; i++) {
        const accent = createRibbonSpec(rng, width, height, rng.chance(0.5), style);
        if (expansive) {
          accent.maxWidth *= rng.chance(0.4) ? rng.range(0.75, 1.15) : rng.range(0.2, 0.65);
        } else {
          accent.maxWidth *= rng.range(0.3, 0.55);
        }
        accent.strands = rng.int(expansive ? 18 : 14, expansive ? 48 : 32);
        drawFlowRibbon(ctx, accent, palette, rng);
      }
    }

    ctx.globalAlpha = 1;
    return seed;
  }

  function generateAbstract1(ctx, width, height, paletteState) {
    return generateRibbonAbstract(ctx, width, height, paletteState, "compact");
  }

  function generateAbstract2(ctx, width, height, paletteState) {
    return generateRibbonAbstract(ctx, width, height, paletteState, "expansive");
  }

  function drawGen3Background(ctx, w, h, colors, rng) {
    const c1 = darkenColor(rng.pick(colors), rng.range(0.55, 0.82));
    const c2 = darkenColor(rng.pick(colors), rng.range(0.35, 0.65));
    const c3 = darkenColor(rng.pick(colors), rng.range(0.7, 0.9));
    const grad = rng.chance(0.5)
      ? ctx.createRadialGradient(w * rng.range(0.2, 0.8), h * rng.range(0.15, 0.85), 0, w / 2, h / 2, Math.max(w, h) * 0.75)
      : ctx.createLinearGradient(0, 0, w, h);
    if (!rng.chance(0.5)) {
      grad.addColorStop(0, c1);
      grad.addColorStop(rng.range(0.35, 0.65), c2);
      grad.addColorStop(1, c3);
    } else {
      grad.addColorStop(0, c3);
      grad.addColorStop(0.5, c1);
      grad.addColorStop(1, c2);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function drawGen3Nebula(ctx, w, h, colors, rng) {
    drawGen3Background(ctx, w, h, colors, rng);
    const blooms = rng.int(7, 18);
    for (let i = 0; i < blooms; i++) {
      const x = rng.range(-w * 0.15, w * 1.15);
      const y = rng.range(-h * 0.15, h * 1.15);
      const radius = rng.range(Math.min(w, h) * 0.08, Math.max(w, h) * 0.45);
      const color = rng.pick(colors);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, lightenColor(color, rng.range(0.15, 0.45)));
      grad.addColorStop(0.45, color);
      grad.addColorStop(1, "transparent");
      ctx.save();
      ctx.globalCompositeOperation = rng.pick(["screen", "lighter", "soft-light", "overlay"]);
      ctx.globalAlpha = rng.range(0.18, 0.55);
      ctx.fillStyle = grad;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      ctx.restore();
    }

    const filaments = rng.int(3, 8);
    for (let i = 0; i < filaments; i++) {
      ctx.save();
      ctx.strokeStyle = lightenColor(rng.pick(colors), 0.25);
      ctx.globalAlpha = rng.range(0.12, 0.35);
      ctx.lineWidth = rng.range(1, 4);
      ctx.beginPath();
      ctx.moveTo(rng.range(0, w), rng.range(0, h));
      ctx.bezierCurveTo(
        rng.range(0, w), rng.range(0, h),
        rng.range(0, w), rng.range(0, h),
        rng.range(0, w), rng.range(0, h)
      );
      ctx.stroke();
      ctx.restore();
    }

    const stars = rng.int(40, 160);
    for (let i = 0; i < stars; i++) {
      const x = rng.range(0, w);
      const y = rng.range(0, h);
      const size = rng.range(0.6, 2.8);
      ctx.fillStyle = rng.chance(0.25) ? lightenColor(rng.pick(colors), 0.5) : "rgba(255,255,255,0.9)";
      ctx.globalAlpha = rng.range(0.25, 1);
      ctx.fillRect(x, y, size, size);
    }
  }

  function drawGen3OrbitRings(ctx, w, h, colors, rng) {
    drawGen3Background(ctx, w, h, colors, rng);
    const centers = rng.int(2, 5);
    for (let c = 0; c < centers; c++) {
      const cx = rng.range(w * 0.1, w * 0.9);
      const cy = rng.range(h * 0.1, h * 0.9);
      const rings = rng.int(8, 28);
      const tilt = rng.range(0, Math.PI);
      const rxBase = rng.range(Math.min(w, h) * 0.06, Math.min(w, h) * 0.22);
      const ryBase = rxBase * rng.range(0.35, 1.4);
      for (let r = 0; r < rings; r++) {
        const scale = 1 + r * rng.range(0.12, 0.28);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tilt + r * rng.range(-0.04, 0.04));
        ctx.strokeStyle = rng.pick(colors);
        ctx.globalAlpha = rng.range(0.15, 0.75);
        ctx.lineWidth = rng.range(0.8, rng.chance(0.2) ? 6 : 2.5);
        if (rng.chance(0.15)) ctx.setLineDash([rng.range(4, 16), rng.range(4, 20)]);
        ctx.beginPath();
        ctx.ellipse(0, 0, rxBase * scale, ryBase * scale, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
    }
  }

  function drawGen3StainedGlass(ctx, w, h, colors, rng) {
    drawGen3Background(ctx, w, h, colors, rng);

    function splitCell(x, y, cw, ch, depth) {
      if (depth <= 0 || cw < 36 || ch < 36) {
        ctx.fillStyle = rng.pick(colors);
        ctx.globalAlpha = rng.range(0.55, 0.92);
        ctx.fillRect(x, y, cw, ch);
        ctx.strokeStyle = darkenColor(rng.pick(colors), 0.35);
        ctx.globalAlpha = 0.65;
        ctx.lineWidth = rng.range(1.5, 3.5);
        ctx.strokeRect(x + 0.5, y + 0.5, cw - 1, ch - 1);
        return;
      }
      if (cw > ch && rng.chance(0.55) || ch >= cw && !rng.chance(0.55)) {
        const cut = cw * rng.range(0.28, 0.72);
        splitCell(x, y, cut, ch, depth - 1);
        splitCell(x + cut, y, cw - cut, ch, depth - 1);
      } else {
        const cut = ch * rng.range(0.28, 0.72);
        splitCell(x, y, cw, cut, depth - 1);
        splitCell(x, y + cut, cw, ch - cut, depth - 1);
      }
    }

    ctx.save();
    splitCell(0, 0, w, h, rng.int(4, 7));
    ctx.restore();

    if (rng.chance(0.7)) {
      ctx.save();
      ctx.globalCompositeOperation = "soft-light";
      ctx.globalAlpha = rng.range(0.08, 0.2);
      const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
      glow.addColorStop(0, lightenColor(rng.pick(colors), 0.4));
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }
  }

  function drawGen3MeteorField(ctx, w, h, colors, rng) {
    drawGen3Background(ctx, w, h, colors, rng);
    const streaks = rng.int(25, 90);
    for (let i = 0; i < streaks; i++) {
      const x = rng.range(-w * 0.1, w * 1.1);
      const y = rng.range(-h * 0.1, h * 0.4);
      const angle = rng.range(Math.PI * 0.55, Math.PI * 0.95);
      const len = rng.range(Math.min(w, h) * 0.04, Math.max(w, h) * 0.35);
      const x2 = x + Math.cos(angle) * len;
      const y2 = y + Math.sin(angle) * len;
      const color = rng.pick(colors);
      const grad = ctx.createLinearGradient(x, y, x2, y2);
      grad.addColorStop(0, lightenColor(color, 0.55));
      grad.addColorStop(0.15, color);
      grad.addColorStop(1, "transparent");
      ctx.strokeStyle = grad;
      ctx.lineWidth = rng.range(0.8, rng.chance(0.15) ? 5 : 2.2);
      ctx.globalAlpha = rng.range(0.35, 0.95);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    const glows = rng.int(6, 16);
    for (let i = 0; i < glows; i++) {
      const x = rng.range(0, w);
      const y = rng.range(0, h);
      const r = rng.range(8, Math.min(w, h) * 0.08);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, lightenColor(rng.pick(colors), 0.35));
      grad.addColorStop(1, "transparent");
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = rng.range(0.25, 0.6);
      ctx.fillStyle = grad;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      ctx.restore();
    }
  }

  function drawGen3LuminousMesh(ctx, w, h, colors, rng) {
    drawGen3Background(ctx, w, h, colors, rng);
    const cols = rng.int(7, 16);
    const rows = rng.int(7, 16);
    const points = [];
    for (let row = 0; row <= rows; row++) {
      for (let col = 0; col <= cols; col++) {
        const jx = (w / cols) * rng.range(-0.35, 0.35);
        const jy = (h / rows) * rng.range(-0.35, 0.35);
        points.push({
          x: (col / cols) * w + jx,
          y: (row / rows) * h + jy,
        });
      }
    }

    function idx(col, row) {
      return row * (cols + 1) + col;
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const a = points[idx(col, row)];
        const b = points[idx(col + 1, row)];
        const c = points[idx(col, row + 1)];
        const d = points[idx(col + 1, row + 1)];
        const tri1 = [a, b, c];
        const tri2 = rng.chance(0.5) ? [b, d, c] : [a, b, d];
        [tri1, tri2].forEach((tri) => {
          ctx.fillStyle = rng.pick(colors);
          ctx.globalAlpha = rng.range(0.35, 0.82);
          ctx.beginPath();
          ctx.moveTo(tri[0].x, tri[0].y);
          ctx.lineTo(tri[1].x, tri[1].y);
          ctx.lineTo(tri[2].x, tri[2].y);
          ctx.closePath();
          ctx.fill();
        });
      }
    }

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = rng.range(0.15, 0.35);
    ctx.strokeStyle = lightenColor(rng.pick(colors), 0.35);
    ctx.lineWidth = rng.range(0.6, 1.8);
    for (let row = 0; row <= rows; row++) {
      for (let col = 0; col <= cols; col++) {
        const p = points[idx(col, row)];
        if (col < cols) {
          const q = points[idx(col + 1, row)];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
        if (row < rows) {
          const q = points[idx(col, row + 1)];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  function drawGen3InkBloom(ctx, w, h, colors, rng) {
    ctx.fillStyle = rng.chance(0.5) ? "#f5f0e8" : darkenColor(rng.pick(colors), 0.88);
    ctx.fillRect(0, 0, w, h);

    const blobs = rng.int(5, 14);
    for (let i = 0; i < blobs; i++) {
      let x = rng.range(w * 0.1, w * 0.9);
      let y = rng.range(h * 0.1, h * 0.9);
      const color = rng.pick(colors);
      const steps = rng.int(50, 140);
      const scale = rng.range(0.004, 0.018);
      const phase = rng.range(0, 100);
      ctx.save();
      ctx.globalCompositeOperation = rng.pick(["multiply", "source-over", "darken"]);
      for (let s = 0; s < steps; s++) {
        const angle = Math.sin(x * scale + phase) * Math.cos(y * scale + phase * 0.7) * Math.PI * 3;
        x += Math.cos(angle) * rng.range(2, 7);
        y += Math.sin(angle) * rng.range(2, 7);
        BrushEngine.stamp(ctx, x, y, rng.range(10, 55), rng.range(0.15, 0.55), color, rng.range(0.08, 0.35), 1, false);
      }
      ctx.restore();
    }

    if (rng.chance(0.55)) {
      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = rng.range(0.1, 0.25);
      const wash = ctx.createLinearGradient(0, 0, w, h);
      wash.addColorStop(0, lightenColor(rng.pick(colors), 0.2));
      wash.addColorStop(1, darkenColor(rng.pick(colors), 0.2));
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }
  }

  function generateAbstract3(ctx, width, height, paletteState) {
    const seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
    const rng = createRng(seed);
    const colors = buildColors(paletteState, rng);
    const modes = [
      drawGen3Nebula,
      drawGen3OrbitRings,
      drawGen3StainedGlass,
      drawGen3MeteorField,
      drawGen3LuminousMesh,
      drawGen3InkBloom,
    ];
    rng.pick(modes)(ctx, width, height, colors, rng);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    return seed;
  }

  function drawGen4Background(ctx, w, h, colors, rng) {
    if (rng.chance(0.55)) {
      ctx.fillStyle = darkenColor(rng.pick(colors), rng.range(0.78, 0.92));
    } else {
      ctx.fillStyle = lightenColor(rng.pick(colors), rng.range(0.72, 0.88));
    }
    ctx.fillRect(0, 0, w, h);

    if (rng.chance(0.45)) {
      const wash = ctx.createRadialGradient(
        rng.range(0, w), rng.range(0, h), 0,
        w / 2, h / 2, Math.max(w, h) * 0.75
      );
      wash.addColorStop(0, lightenColor(rng.pick(colors), 0.15));
      wash.addColorStop(1, "transparent");
      ctx.save();
      ctx.globalAlpha = rng.range(0.12, 0.35);
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }
  }

  function emitGen4Particle(ctx, x, y, vx, vy, colors, rng, minDim, kind) {
    const color = rng.pick(colors);
    const alpha = rng.range(0.35, 0.95);

    if (kind === "micro") {
      const r = rng.range(0.8, 3.5);
      BrushEngine.stamp(ctx, x, y, r, rng.range(0.15, 0.45), color, alpha, 1, false);
      return;
    }

    if (kind === "speck") {
      const r = rng.range(2.5, 9);
      BrushEngine.stamp(ctx, x, y, r, rng.range(0.2, 0.55), color, alpha, 1, false);
      if (rng.chance(0.35)) {
        const satellites = rng.int(2, 6);
        for (let s = 0; s < satellites; s++) {
          const a = rng.range(0, Math.PI * 2);
          const d = rng.range(r * 0.5, r * 2.2);
          BrushEngine.stamp(
            ctx, x + Math.cos(a) * d, y + Math.sin(a) * d,
            rng.range(0.8, 3), 0.25, color, alpha * rng.range(0.5, 0.9), 1, false
          );
        }
      }
      return;
    }

    if (kind === "splat") {
      const rx = rng.range(minDim * 0.004, minDim * 0.035);
      const ry = rx * rng.range(0.35, 1.8);
      const rot = Math.atan2(vy, vx) + rng.range(-0.6, 0.6);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (kind === "blob") {
      const r = rng.range(minDim * 0.018, minDim * 0.11);
      BrushEngine.stamp(ctx, x, y, r, rng.range(0.12, 0.42), color, alpha * rng.range(0.55, 0.9), 1, false);
      return;
    }

    if (kind === "mega") {
      const r = rng.range(minDim * 0.06, minDim * 0.22);
      BrushEngine.stamp(ctx, x, y, r, rng.range(0.08, 0.28), color, alpha * rng.range(0.25, 0.55), 1, false);
      return;
    }

    if (kind === "drip") {
      const len = rng.range(minDim * 0.015, minDim * 0.12);
      const angle = Math.atan2(vy, vx) + rng.range(-0.35, 0.35);
      const steps = rng.int(4, 14);
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const px = x + Math.cos(angle) * len * t;
        const py = y + Math.sin(angle) * len * t;
        const r = rng.range(1.5, 8) * (1 - t * 0.65);
        BrushEngine.stamp(ctx, px, py, r, rng.range(0.2, 0.5), color, alpha * (1 - t * 0.4), 1, false);
      }
    }
  }

  function pickGen4ParticleKind(rng) {
    const roll = rng.next();
    if (roll < 0.42) return "micro";
    if (roll < 0.68) return "speck";
    if (roll < 0.82) return "splat";
    if (roll < 0.91) return "blob";
    if (roll < 0.97) return "drip";
    return "mega";
  }

  function sprayGen4Burst(ctx, cx, cy, colors, rng, w, h) {
    const minDim = Math.min(w, h);
    const particleCount = rng.int(60, 280);
    const spread = rng.range(minDim * 0.04, minDim * 0.38);
    const aim = rng.range(0, Math.PI * 2);
    const cone = rng.range(Math.PI * 0.35, Math.PI * 1.35);
    const pressure = rng.range(0.6, 1.4);

    ctx.save();
    ctx.globalCompositeOperation = rng.pick(["source-over", "source-over", "multiply", "screen", "overlay"]);

    for (let i = 0; i < particleCount; i++) {
      const dist = Math.pow(rng.next(), rng.range(0.45, 1.1)) * spread * pressure;
      const angle = aim + rng.range(-cone / 2, cone / 2);
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      if (px < -minDim * 0.05 || px > w + minDim * 0.05 || py < -minDim * 0.05 || py > h + minDim * 0.05) {
        continue;
      }
      const vx = Math.cos(angle) * rng.range(0.5, 2);
      const vy = Math.sin(angle) * rng.range(0.5, 2);
      emitGen4Particle(ctx, px, py, vx, vy, colors, rng, minDim, pickGen4ParticleKind(rng));
    }

    ctx.restore();
  }

  function scatterGen4Field(ctx, colors, rng, w, h) {
    const minDim = Math.min(w, h);
    const areaScale = (w * h) / (800 * 600);
    const count = rng.int(Math.floor(120 * areaScale), Math.floor(420 * areaScale));

    ctx.save();
    ctx.globalCompositeOperation = rng.pick(["source-over", "lighter", "soft-light"]);

    for (let i = 0; i < count; i++) {
      const x = rng.range(0, w);
      const y = rng.range(0, h);
      const kindRoll = rng.next();
      const kind = kindRoll < 0.55 ? "micro" : kindRoll < 0.85 ? "speck" : "splat";
      emitGen4Particle(ctx, x, y, rng.range(-1, 1), rng.range(-1, 1), colors, rng, minDim, kind);
    }

    ctx.restore();
  }

  function generateAbstract4(ctx, width, height, paletteState) {
    const seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
    const rng = createRng(seed);
    const colors = buildColors(paletteState, rng);
    const minDim = Math.min(width, height);

    drawGen4Background(ctx, width, height, colors, rng);

    const burstCount = rng.int(10, 28);
    for (let i = 0; i < burstCount; i++) {
      const cx = rng.range(-width * 0.05, width * 1.05);
      const cy = rng.range(-height * 0.05, height * 1.05);
      sprayGen4Burst(ctx, cx, cy, colors, rng, width, height);
    }

    scatterGen4Field(ctx, colors, rng, width, height);

    if (rng.chance(0.55)) {
      const heavyBursts = rng.int(2, 6);
      ctx.save();
      ctx.globalCompositeOperation = rng.pick(["multiply", "overlay", "source-over"]);
      for (let i = 0; i < heavyBursts; i++) {
        const cx = rng.range(0, width);
        const cy = rng.range(0, height);
        const savedCount = rng.int(40, 120);
        for (let p = 0; p < savedCount; p++) {
          const dist = rng.range(0, minDim * rng.range(0.08, 0.28));
          const angle = rng.range(0, Math.PI * 2);
          const px = cx + Math.cos(angle) * dist;
          const py = cy + Math.sin(angle) * dist;
          const kind = rng.chance(0.5) ? "blob" : rng.chance(0.5) ? "mega" : "splat";
          emitGen4Particle(ctx, px, py, Math.cos(angle), Math.sin(angle), colors, rng, minDim, kind);
        }
      }
      ctx.restore();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    return seed;
  }

  const GEN5_COLOR_THEMES = [
    {
      name: "red",
      gradient: ["#000000", "#1a0508", "#4a0a14", "#7f1025", "#b91c1c", "#dc2626", "#ea580c", "#f97316", "#fdba74", "#fff1e6", "#ffffff"],
      dendrites: ["#fff7ed", "#fdba74", "#f97316", "#dc2626", "#7f1d1d"],
      glowInner: "#ffedd5",
      glowMid: "#dc2626",
      highlightTint: "255,220,200",
    },
    {
      name: "blue",
      gradient: ["#000000", "#020617", "#0c1844", "#1e3a8a", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe", "#ffffff"],
      dendrites: ["#eff6ff", "#93c5fd", "#3b82f6", "#1d4ed8", "#1e3a8a"],
      glowInner: "#dbeafe",
      glowMid: "#2563eb",
      highlightTint: "200,220,255",
    },
    {
      name: "yellow",
      gradient: ["#000000", "#1a1200", "#422006", "#713f12", "#a16207", "#ca8a04", "#eab308", "#facc15", "#fde047", "#fef9c3", "#ffffff"],
      dendrites: ["#fefce8", "#fde047", "#eab308", "#ca8a04", "#713f12"],
      glowInner: "#fef9c3",
      glowMid: "#eab308",
      highlightTint: "255,245,180",
    },
    {
      name: "green",
      gradient: ["#000000", "#021105", "#052e16", "#14532d", "#15803d", "#16a34a", "#22c55e", "#4ade80", "#86efac", "#dcfce7", "#ffffff"],
      dendrites: ["#ecfdf5", "#86efac", "#22c55e", "#15803d", "#14532d"],
      glowInner: "#dcfce7",
      glowMid: "#22c55e",
      highlightTint: "200,255,210",
    },
    {
      name: "purple",
      gradient: ["#000000", "#0f0318", "#3b0764", "#581c87", "#7e22ce", "#9333ea", "#a855f7", "#c084fc", "#d8b4fe", "#f3e8ff", "#ffffff"],
      dendrites: ["#faf5ff", "#d8b4fe", "#a855f7", "#7e22ce", "#581c87"],
      glowInner: "#f3e8ff",
      glowMid: "#9333ea",
      highlightTint: "230,200,255",
    },
    {
      name: "cyan",
      gradient: ["#000000", "#031216", "#0e3a40", "#115e59", "#0f766e", "#0d9488", "#14b8a6", "#2dd4bf", "#5eead4", "#ecfeff", "#ffffff"],
      dendrites: ["#ecfeff", "#5eead4", "#14b8a6", "#0f766e", "#115e59"],
      glowInner: "#ecfeff",
      glowMid: "#14b8a6",
      highlightTint: "180,255,245",
    },
    {
      name: "magenta",
      gradient: ["#000000", "#1a0510", "#500724", "#9d174d", "#be185d", "#db2777", "#ec4899", "#f472b6", "#f9a8d4", "#fce7f3", "#ffffff"],
      dendrites: ["#fdf2f8", "#f9a8d4", "#ec4899", "#db2777", "#9d174d"],
      glowInner: "#fce7f3",
      glowMid: "#ec4899",
      highlightTint: "255,200,230",
    },
    {
      name: "orange",
      gradient: ["#000000", "#1a0a00", "#431407", "#7c2d12", "#c2410c", "#ea580c", "#f97316", "#fb923c", "#fdba74", "#ffedd5", "#ffffff"],
      dendrites: ["#fff7ed", "#fdba74", "#fb923c", "#ea580c", "#7c2d12"],
      glowInner: "#ffedd5",
      glowMid: "#f97316",
      highlightTint: "255,210,170",
    },
  ];

  function pickGen5Theme(rng) {
    return rng.pick(GEN5_COLOR_THEMES);
  }

  function createGen5Shape(rng) {
    return {
      baseScale: rng.range(0.42, 1.32),
      stretchX: rng.range(0.4, 2.2),
      stretchY: rng.range(0.4, 2.2),
      rotation: rng.range(0, Math.PI * 2),
      offsetX: rng.range(-0.28, 0.28),
      offsetY: rng.range(-0.28, 0.28),
      normScale: rng.range(0.34, 0.54),
      edgeChaos: rng.range(0.12, 0.38),
      edgeMicro: rng.range(0.06, 0.2),
      lobes: rng.int(2, 9),
      lobeStrength: rng.range(0, 0.3),
      lobePhase: rng.range(0, Math.PI * 2),
      warpStrength: rng.range(0.22, 0.55),
    };
  }

  function gen5Hash(x, y, seed) {
    const n = Math.sin(x * 127.1 + y * 311.7 + seed * 0.173) * 43758.5453123;
    return n - Math.floor(n);
  }

  function gen5SmoothNoise(x, y, seed) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);
    const a = gen5Hash(ix, iy, seed);
    const b = gen5Hash(ix + 1, iy, seed);
    const c = gen5Hash(ix, iy + 1, seed);
    const d = gen5Hash(ix + 1, iy + 1, seed);
    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
  }

  function gen5Fbm(x, y, seed, octaves) {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;
    for (let i = 0; i < octaves; i++) {
      value += amplitude * gen5SmoothNoise(x * frequency, y * frequency, seed + i * 19.7);
      amplitude *= 0.52;
      frequency *= 2.05;
    }
    return value;
  }

  function gen5Rgb(hex) {
    const h = hex.replace("#", "");
    const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return [
      parseInt(n.slice(0, 2), 16),
      parseInt(n.slice(2, 4), 16),
      parseInt(n.slice(4, 6), 16),
    ];
  }

  function gen5LerpHex(c1, c2, t) {
    const [r1, g1, b1] = gen5Rgb(c1);
    const [r2, g2, b2] = gen5Rgb(c2);
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return [r, g, b];
  }

  function gen5SampleGradient(t, gradient) {
    const clamped = Math.max(0, Math.min(1, t));
    const scaled = clamped * (gradient.length - 1);
    const idx = Math.floor(scaled);
    const frac = scaled - idx;
    if (idx >= gradient.length - 1) return gen5Rgb(gradient[gradient.length - 1]);
    return gen5LerpHex(gradient[idx], gradient[idx + 1], frac);
  }

  function createGen5Cells(rng) {
    const count = rng.int(28, 62);
    const cells = [];
    for (let i = 0; i < count; i++) {
      cells.push({
        x: rng.range(-1.35, 1.35),
        y: rng.range(-1.35, 1.35),
        tone: rng.range(0.25, 1),
        size: rng.range(0.65, 1.45),
      });
    }
    return cells;
  }

  function gen5Voronoi(nx, ny, cells) {
    let best = Infinity;
    let second = Infinity;
    let id = 0;
    let tone = 0.5;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const dx = nx - cell.x;
      const dy = ny - cell.y;
      const d = Math.hypot(dx, dy) / cell.size;
      if (d < best) {
        second = best;
        best = d;
        id = i;
        tone = cell.tone;
      } else if (d < second) {
        second = d;
      }
    }
    return { best, edge: second - best, id, tone };
  }

  function gen5EdgeRadius(angle, nx, ny, seed, shape) {
    const spike = gen5Fbm(Math.cos(angle) * 7.5 + seed * 0.01, Math.sin(angle) * 7.5, seed + 40, 5);
    const body = gen5Fbm(nx * 2.4 + 2, ny * 2.4 + 2, seed + 80, 4);
    const micro = gen5Fbm(Math.cos(angle) * 22, Math.sin(angle) * 22, seed + 120, 3);
    const lobes = 1 + shape.lobeStrength * Math.sin(angle * shape.lobes + shape.lobePhase);
    return shape.baseScale * lobes * (
      0.52 + 0.32 * body + shape.edgeChaos * spike + shape.edgeMicro * micro
    );
  }

  function renderGen5FluidPixels(rw, rh, rng, seed, cells, shape, theme) {
    const data = new Uint8ClampedArray(rw * rh * 4);
    const cx = rw * 0.5;
    const cy = rh * 0.5;
    const norm = Math.min(rw, rh) * shape.normScale;
    const cosR = Math.cos(-shape.rotation);
    const sinR = Math.sin(-shape.rotation);
    const edgeSharpness = rng.range(28, 48);
    const lensFalloff = rng.range(3.5, 6.5);
    const lensStrength = rng.range(0.15, 0.35);
    const highlightBoost = rng.range(1.2, 2.1);

    for (let py = 0; py < rh; py++) {
      for (let px = 0; px < rw; px++) {
        let nx = (px - cx) / norm;
        let ny = (py - cy) / norm;
        const rx = nx * cosR - ny * sinR;
        const ry = nx * sinR + ny * cosR;
        nx = rx * shape.stretchX + shape.offsetX;
        ny = ry * shape.stretchY + shape.offsetY;
        const dist = Math.hypot(nx, ny);
        const angle = Math.atan2(ny, nx);
        const edgeR = gen5EdgeRadius(angle, nx, ny, seed, shape);
        const idx = (py * rw + px) * 4;

        if (dist > edgeR) {
          data[idx] = 0;
          data[idx + 1] = 0;
          data[idx + 2] = 0;
          data[idx + 3] = 255;
          continue;
        }

        const wx = nx + (gen5Fbm(nx * 3.2, ny * 3.2, seed, 4) - 0.5) * shape.warpStrength;
        const wy = ny + (gen5Fbm(nx * 3.2 + 4.7, ny * 3.2 + 4.7, seed + 30, 4) - 0.5) * shape.warpStrength;
        const vor = gen5Voronoi(wx, wy, cells);
        const marble = gen5Fbm(wx * 4.5 + vor.id * 0.31, wy * 4.5, seed + 160, 5);
        const swirl = gen5Fbm(wx * 2 + wy * 1.6, wy * 2 - wx * 1.6, seed + 210, 3);
        const cellEdge = Math.exp(-vor.edge * edgeSharpness);
        const lens = Math.exp(-vor.best * lensFalloff) * lensStrength;

        let tone = marble * 0.42 + swirl * 0.22 + vor.tone * 0.28 + cellEdge * 0.35 + lens;
        if (marble > 0.68) tone += (marble - 0.68) * highlightBoost;
        if (swirl > 0.72 && dist < edgeR * 0.85) tone += (swirl - 0.72) * 1.8;

        const rim = 1 - Math.max(0, (dist - edgeR * 0.82) / (edgeR * 0.18));
        tone *= 0.55 + rim * 0.45;
        tone = Math.max(0, Math.min(1, tone));

        const [r, g, b] = gen5SampleGradient(tone, theme.gradient);
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }
    return data;
  }

  function drawGen5Dendrites(ctx, w, h, rng, seed, shape, theme) {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const norm = Math.min(w, h) * shape.normScale * shape.baseScale;
    const rays = rng.int(220, 520);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    for (let i = 0; i < rays; i++) {
      const angle = rng.range(0, Math.PI * 2);
      const startDist = norm * rng.range(0.55, 0.98);
      let x = cx + Math.cos(angle) * startDist * shape.stretchX;
      let y = cy + Math.sin(angle) * startDist * shape.stretchY;
      let dir = angle + rng.range(-0.5, 0.5);
      const steps = rng.int(6, 20);
      const stepLen = rng.range(norm * 0.015, norm * 0.06);

      for (let s = 0; s < steps; s++) {
        dir += rng.range(-0.75, 0.75) + (gen5Fbm(x * 0.02, y * 0.02, seed + i, 2) - 0.5) * 0.8;
        const nx = x + Math.cos(dir) * stepLen;
        const ny = y + Math.sin(dir) * stepLen;
        const fade = 1 - s / steps;
        ctx.strokeStyle = rng.pick(theme.dendrites);
        ctx.globalAlpha = fade * rng.range(0.2, 0.75);
        ctx.lineWidth = rng.range(0.4, 2.2) * (0.35 + fade * 0.65);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        if (rng.chance(0.12) && s < steps - 2) {
          const branchDir = dir + rng.range(-1.2, 1.2);
          const bx = nx + Math.cos(branchDir) * stepLen * rng.range(0.5, 1.2);
          const by = ny + Math.sin(branchDir) * stepLen * rng.range(0.5, 1.2);
          ctx.globalAlpha = fade * 0.45;
          ctx.lineWidth = Math.max(0.3, ctx.lineWidth * 0.55);
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }

        x = nx;
        y = ny;
        if (x < 0 || x > w || y < 0 || y > h) break;
      }
    }
    ctx.restore();
  }

  function drawGen5Highlights(ctx, w, h, rng, shape, theme) {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const norm = Math.min(w, h) * shape.normScale * shape.baseScale * 0.92;
    const spots = rng.int(40, 110);
    const tint = theme.highlightTint;

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < spots; i++) {
      const angle = rng.range(0, Math.PI * 2);
      const dist = norm * Math.pow(rng.next(), 0.65) * rng.range(0.2, 1);
      const x = cx + Math.cos(angle) * dist * shape.stretchX;
      const y = cy + Math.sin(angle) * dist * shape.stretchY;
      const r = rng.range(norm * 0.01, norm * 0.07);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(255,255,255,${rng.range(0.35, 0.9)})`);
      grad.addColorStop(0.45, `rgba(${tint},${rng.range(0.12, 0.35)})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }

    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = rng.range(0.08, 0.18);
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, norm * 1.1);
    glow.addColorStop(0, theme.glowInner);
    glow.addColorStop(0.35, theme.glowMid);
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  function generateAbstract5(ctx, width, height, paletteState) {
    const seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
    const rng = createRng(seed);
    const theme = pickGen5Theme(rng);
    const shape = createGen5Shape(rng);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    const maxSide = 820;
    const scale = Math.min(1, maxSide / Math.max(width, height));
    const rw = Math.max(1, Math.round(width * scale));
    const rh = Math.max(1, Math.round(height * scale));

    const cells = createGen5Cells(rng);

    const buffer = document.createElement("canvas");
    buffer.width = rw;
    buffer.height = rh;
    const bctx = buffer.getContext("2d");
    const imageData = bctx.createImageData(rw, rh);
    imageData.data.set(renderGen5FluidPixels(rw, rh, rng, seed, cells, shape, theme));
    bctx.putImageData(imageData, 0, 0);

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(buffer, 0, 0, rw, rh, 0, 0, width, height);
    ctx.restore();

    drawGen5Dendrites(ctx, width, height, rng, seed, shape, theme);
    drawGen5Highlights(ctx, width, height, rng, shape, theme);

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    return seed;
  }

  const GEN6_BARK = ["#2c1810", "#3d2817", "#4a3728", "#5c4033", "#6b4423", "#8b6914"];
  const GEN6_FOLIAGE = ["#14532d", "#15803d", "#16a34a", "#22c55e", "#4ade80", "#166534", "#365314", "#3f6212"];
  const GEN6_AUTUMN = ["#7f1d1d", "#c2410c", "#ea580c", "#ca8a04", "#a16207", "#854d0e", "#b45309"];
  const GEN6_SKY_DAY = ["#7dd3fc", "#38bdf8", "#0ea5e9", "#bae6fd", "#e0f2fe"];
  const GEN6_SKY_DUSK = ["#1e1b4b", "#312e81", "#7c3aed", "#f97316", "#fdba74"];
  const GEN6_SKY_NIGHT = ["#020617", "#0f172a", "#1e293b", "#334155", "#475569"];

  function buildGen6Colors(paletteState, rng) {
    const base = getPaletteColors(paletteState);
    const greens = base.filter((c) => {
      const [h, s] = Palette.hexToHsl(c);
      return h > 70 && h < 170 && s > 0.15;
    });
    const earth = base.filter((c) => {
      const [h, s, l] = Palette.hexToHsl(c);
      return (h < 70 || h > 30) && l < 0.55;
    });
    return {
      bark: [...new Set([...GEN6_BARK, ...earth, ...base])],
      foliage: [...new Set([...GEN6_FOLIAGE, ...greens, ...base])],
      autumn: [...new Set([...GEN6_AUTUMN, ...base])],
      accent: base,
    };
  }

  function drawGen6Sky(ctx, w, h, rng, colors) {
    const mood = rng.pick(["day", "day", "dusk", "night", "overcast"]);
    let stops;
    if (mood === "night") stops = rng.shuffle(GEN6_SKY_NIGHT).slice(0, 3);
    else if (mood === "dusk") stops = rng.shuffle(GEN6_SKY_DUSK).slice(0, 3);
    else if (mood === "overcast") stops = [lightenColor(rng.pick(colors.accent), 0.5), "#94a3b8", "#64748b"];
    else stops = rng.shuffle(GEN6_SKY_DAY).slice(0, 3);

    const grad = rng.chance(0.35)
      ? ctx.createLinearGradient(0, 0, 0, h)
      : ctx.createRadialGradient(w * rng.range(0.3, 0.7), h * rng.range(0.05, 0.25), 0, w / 2, h * 0.3, Math.max(w, h));
    grad.addColorStop(0, stops[0]);
    grad.addColorStop(rng.range(0.45, 0.75), stops[1] || stops[0]);
    grad.addColorStop(1, stops[2] || stops[1] || stops[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    if (mood === "day" && rng.chance(0.55)) {
      const sunX = w * rng.range(0.12, 0.88);
      const sunY = h * rng.range(0.08, 0.28);
      const sunR = Math.min(w, h) * rng.range(0.04, 0.09);
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR);
      sunGrad.addColorStop(0, "rgba(255,255,240,0.95)");
      sunGrad.addColorStop(0.5, "rgba(255,230,150,0.35)");
      sunGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sunGrad;
      ctx.fillRect(sunX - sunR, sunY - sunR, sunR * 2, sunR * 2);
    }

    return { mood, groundY: h * rng.range(0.72, 0.9) };
  }

  function drawGen6Ground(ctx, w, h, groundY, rng, colors) {
    const groundTop = darkenColor(rng.pick(colors.bark), 0.55);
    const groundBot = darkenColor(rng.pick(colors.foliage), 0.75);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, groundY + h * rng.range(0.02, 0.06));
    const freq = rng.range(0.004, 0.012);
    const phase = rng.range(0, 10);
    const amp = h * rng.range(0.01, 0.035);
    for (let x = 0; x <= w; x += Math.max(8, w / 40)) {
      const y = groundY + Math.sin(x * freq + phase) * amp;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, groundY, 0, h);
    grad.addColorStop(0, groundTop);
    grad.addColorStop(1, groundBot);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    if (rng.chance(0.45)) {
      ctx.save();
      ctx.globalAlpha = rng.range(0.15, 0.35);
      ctx.fillStyle = darkenColor(rng.pick(colors.foliage), 0.35);
      for (let i = 0; i < rng.int(8, 24); i++) {
        const bx = rng.range(0, w);
        const by = groundY + rng.range(h * 0.01, h * 0.08);
        ctx.beginPath();
        ctx.ellipse(bx, by, rng.range(20, 80), rng.range(6, 18), 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawGen6Trunk(ctx, x, baseY, height, trunkW, color, rng) {
    const topY = baseY - height;
    const lean = rng.range(-height * 0.06, height * 0.06);
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - trunkW * 0.55, baseY);
    ctx.quadraticCurveTo(x + lean * 0.3, baseY - height * 0.5, x + lean - trunkW * 0.35, topY + height * 0.08);
    ctx.lineTo(x + lean + trunkW * 0.35, topY + height * 0.08);
    ctx.quadraticCurveTo(x + lean * 0.5, baseY - height * 0.5, x + trunkW * 0.55, baseY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    return { x: x + lean, y: topY + height * 0.08 };
  }

  function drawGen6Branch(ctx, x, y, len, angle, width, depth, barkColor, rng) {
    if (depth <= 0 || len < 2.5) return;

    const endX = x + Math.cos(angle) * len;
    const endY = y + Math.sin(angle) * len;
    ctx.strokeStyle = barkColor;
    ctx.lineWidth = Math.max(0.7, width);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    const childLen = len * rng.range(0.64, 0.86);
    const childW = width * rng.range(0.6, 0.74);
    const spread = rng.range(0.28, 0.78);

    drawGen6Branch(ctx, endX, endY, childLen, angle - spread, childW, depth - 1, barkColor, rng);
    drawGen6Branch(ctx, endX, endY, childLen, angle + spread, childW, depth - 1, barkColor, rng);
    if (rng.chance(0.52)) {
      drawGen6Branch(ctx, endX, endY, childLen * 0.78, angle + rng.range(-0.25, 0.25), childW * 0.82, depth - 1, barkColor, rng);
    }
    if (rng.chance(0.24)) {
      drawGen6Branch(ctx, endX, endY, childLen * 0.62, angle, childW * 0.7, depth - 1, barkColor, rng);
    }
  }

  function drawGen6BareBranches(ctx, crown, height, trunkW, barkColor, rng, heavy) {
    const mainCount = heavy ? rng.int(3, 6) : rng.int(2, 4);
    const depth = heavy ? rng.int(7, 10) : rng.int(5, 8);
    for (let i = 0; i < mainCount; i++) {
      const angle = -Math.PI / 2 + rng.range(-0.95, 0.95);
      drawGen6Branch(
        ctx, crown.x, crown.y, height * rng.range(0.18, 0.34), angle,
        trunkW * rng.range(0.38, 0.52), depth, barkColor, rng
      );
    }
  }

  function drawGen6BarePine(ctx, x, baseY, height, trunkW, barkColor, rng, heavy) {
    drawGen6Trunk(ctx, x, baseY, height * rng.range(0.82, 0.95), trunkW, barkColor, rng);
    const tiers = heavy ? rng.int(7, 12) : rng.int(5, 9);
    const branchDepth = heavy ? rng.int(4, 6) : rng.int(3, 5);
    for (let i = 0; i < tiers; i++) {
      const t = (i + 1) / (tiers + 1);
      const ty = baseY - height * (0.12 + t * 0.78);
      const branchLen = height * (0.24 - t * 0.17);
      const w = trunkW * rng.range(0.22, 0.38);
      drawGen6Branch(ctx, x, ty, branchLen, -Math.PI / 2 - rng.range(0.35, 0.65), w, branchDepth, barkColor, rng);
      drawGen6Branch(ctx, x, ty, branchLen, -Math.PI / 2 + rng.range(0.35, 0.65), w, branchDepth, barkColor, rng);
      if (heavy && rng.chance(0.35)) {
        drawGen6Branch(ctx, x, ty, branchLen * 0.7, -Math.PI / 2, w * 0.75, branchDepth - 1, barkColor, rng);
      }
    }
  }

  function drawGen6Silhouette(ctx, x, baseY, height, rng, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.lineTo(x - height * 0.06, baseY);
    ctx.lineTo(x - height * 0.04, baseY - height * 0.35);
    ctx.lineTo(x - height * 0.28, baseY - height * 0.55);
    ctx.lineTo(x - height * 0.08, baseY - height * 0.75);
    ctx.lineTo(x - height * 0.22, baseY - height * 0.92);
    ctx.lineTo(x, baseY - height);
    ctx.lineTo(x + height * 0.18, baseY - height * 0.88);
    ctx.lineTo(x + height * 0.12, baseY - height * 0.62);
    ctx.lineTo(x + height * 0.32, baseY - height * 0.48);
    ctx.lineTo(x + height * 0.04, baseY - height * 0.35);
    ctx.lineTo(x + height * 0.06, baseY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawGen6Tree(ctx, tree, rng, colors) {
    const height = tree.height;
    const trunkW = height * rng.range(0.035, 0.11);
    const barkColor = darkenColor(rng.pick(colors.bark), rng.range(0, 0.25));
    const style = tree.style;
    const heavy = tree.heavyBranches;

    ctx.save();
    ctx.globalAlpha = 0.55 + tree.depth * 0.45;

    if (style === "pine") {
      drawGen6BarePine(ctx, tree.x, tree.y, height, trunkW, barkColor, rng, heavy);
    } else if (style === "silhouette") {
      drawGen6Silhouette(ctx, tree.x, tree.y, height, rng, barkColor);
    } else {
      const crown = drawGen6Trunk(ctx, tree.x, tree.y, height * rng.range(0.55, 0.82), trunkW, barkColor, rng);
      drawGen6BareBranches(ctx, crown, height, trunkW, barkColor, rng, heavy);
    }

    ctx.restore();
  }

  function generateAbstract6(ctx, width, height, paletteState) {
    const seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
    const rng = createRng(seed);
    const colors = buildGen6Colors(paletteState, rng);

    const scene = drawGen6Sky(ctx, width, height, rng, colors);
    drawGen6Ground(ctx, width, height, scene.groundY, rng, colors);

    const treeCount = rng.int(2, rng.chance(0.35) ? 32 : 14);
    const trees = [];
    for (let i = 0; i < treeCount; i++) {
      const depth = rng.next();
      const scale = rng.range(0.3, 1.25) * (0.65 + depth * 0.35);
      trees.push({
        x: rng.range(width * 0.02, width * 0.98),
        y: scene.groundY + rng.range(-height * 0.015, height * 0.025) + (1 - depth) * height * 0.04,
        height: Math.min(width, height) * rng.range(0.12, 0.42) * scale,
        depth,
        heavyBranches: rng.chance(0.72),
        style: rng.pick(["branch", "branch", "branch", "branch", "pine", "silhouette"]),
      });
    }
    trees.sort((a, b) => a.depth - b.depth);

    for (const tree of trees) {
      drawGen6Tree(ctx, tree, rng, colors);
    }

    if (rng.chance(0.35)) {
      ctx.save();
      ctx.globalCompositeOperation = "soft-light";
      ctx.globalAlpha = rng.range(0.08, 0.2);
      const mist = ctx.createLinearGradient(0, scene.groundY - height * 0.3, 0, scene.groundY + height * 0.05);
      mist.addColorStop(0, "transparent");
      mist.addColorStop(0.5, "rgba(255,255,255,0.5)");
      mist.addColorStop(1, "transparent");
      ctx.fillStyle = mist;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    return seed;
  }

  return {
    generate,
    generateGolden,
    generateSeedOfLife,
    generateFractal,
    generateShapes,
    generateCityscape,
    generateAbstract1,
    generateAbstract2,
    generateAbstract3,
    generateAbstract4,
    generateAbstract5,
    generateAbstract6,
  };
})();

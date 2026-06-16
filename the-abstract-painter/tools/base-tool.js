const BrushEngine = (() => {
  function getDabPoints(from, to, spacing) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return [to];
    const steps = Math.max(1, Math.ceil(dist / spacing));
    const points = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      points.push({ x: from.x + dx * t, y: from.y + dy * t });
    }
    return points;
  }

  function stamp(ctx, x, y, radius, hardness, color, opacity, flow, erase, blendMode) {
    ctx.save();
    const alpha = opacity * flow;
    if (erase) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${alpha})`;
    } else {
      ctx.globalCompositeOperation = blendMode || "source-over";
      const inner = radius * hardness;
      const grad = ctx.createRadialGradient(x, y, inner, x, y, radius);
      const solid = colorToRgba(color, alpha);
      const mid = colorToRgba(color, alpha * 0.5);
      grad.addColorStop(0, solid);
      grad.addColorStop(hardness, mid);
      grad.addColorStop(1, colorToRgba(color, 0));
      ctx.fillStyle = grad;
    }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function colorToRgba(color, alpha) {
    if (color.startsWith("rgba")) return color;
    if (color.startsWith("rgb(")) {
      return color.replace("rgb(", "rgba(").replace(")", `,${alpha})`);
    }
    const h = color.replace("#", "");
    const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const r = parseInt(n.slice(0, 2), 16);
    const g = parseInt(n.slice(2, 4), 16);
    const b = parseInt(n.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function drawStroke(ctx, points, options) {
    const {
      size, hardness, opacity, flow, erase,
      colorResolver, strokeDistanceStart = 0,
    } = options;
    const radius = size / 2;
    const spacing = Math.max(1, size * 0.15);
    let dist = strokeDistanceStart;
    let prev = points[0];
    for (let i = 1; i < points.length; i++) {
      const dabs = getDabPoints(prev, points[i], spacing);
      for (const pt of dabs) {
        const segDist = Math.hypot(pt.x - prev.x, pt.y - prev.y);
        dist += segDist;
        const speed = segDist;
        const color = erase ? "#000" : colorResolver(pt.x, pt.y, dist, speed);
        stamp(ctx, pt.x, pt.y, radius, hardness, color, opacity, flow, erase);
        prev = pt;
      }
    }
    return dist;
  }

  function simpleNoise(x, y, seed) {
    const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
    return n - Math.floor(n);
  }

  function noiseOffset(x, y, amount, seed) {
    const n = simpleNoise(x * 0.05, y * 0.05, seed);
    const angle = n * Math.PI * 2;
    return { dx: Math.cos(angle) * amount, dy: Math.sin(angle) * amount };
  }

  function kaleidoscopePoints(x, y, cx, cy, segments) {
    const dx = x - cx;
    const dy = y - cy;
    const angle = Math.atan2(dy, dx);
    const dist = Math.hypot(dx, dy);
    const points = [];
    const slice = (Math.PI * 2) / segments;
    for (let i = 0; i < segments; i++) {
      const a = angle + i * slice;
      points.push({ x: cx + Math.cos(a) * dist, y: cy + Math.sin(a) * dist });
      const mirrorA = -angle + i * slice;
      points.push({ x: cx + Math.cos(mirrorA) * dist, y: cy + Math.sin(mirrorA) * dist });
    }
    return points;
  }

  function sampleAverageColor(ctx, cx, cy, radius, canvasW, canvasH) {
    const r = Math.ceil(radius);
    const x0 = Math.max(0, Math.floor(cx - r));
    const y0 = Math.max(0, Math.floor(cy - r));
    const x1 = Math.min(canvasW, Math.ceil(cx + r));
    const y1 = Math.min(canvasH, Math.ceil(cy + r));
    const rw = x1 - x0;
    const rh = y1 - y0;
    if (rw <= 0 || rh <= 0) return null;
    const data = ctx.getImageData(x0, y0, rw, rh).data;
    const r2 = radius * radius;
    let sr = 0, sg = 0, sb = 0, sa = 0, n = 0;
    for (let py = y0; py < y1; py++) {
      for (let px = x0; px < x1; px++) {
        const dx = px - cx;
        const dy = py - cy;
        if (dx * dx + dy * dy > r2) continue;
        const i = ((py - y0) * rw + (px - x0)) * 4;
        sr += data[i];
        sg += data[i + 1];
        sb += data[i + 2];
        sa += data[i + 3];
        n++;
      }
    }
    if (!n) return null;
    return { r: sr / n, g: sg / n, b: sb / n, a: sa / n };
  }

  function rgbaToCss(c) {
    if (!c) return "transparent";
    return `rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})`;
  }

  function parseColorToRgba(color) {
    if (color.startsWith("#")) {
      const h = color.replace("#", "");
      const n = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
      return {
        r: parseInt(n.slice(0, 2), 16),
        g: parseInt(n.slice(2, 4), 16),
        b: parseInt(n.slice(4, 6), 16),
        a: 255,
      };
    }
    const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (m) {
      return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] * 255 : 255 };
    }
    return { r: 0, g: 0, b: 0, a: 255 };
  }

  function mixRgba(a, b, t) {
    const u = 1 - t;
    return {
      r: a.r * u + b.r * t,
      g: a.g * u + b.g * t,
      b: a.b * u + b.b * t,
      a: a.a * u + b.a * t,
    };
  }

  /** Blend neighboring pixels toward their local average — visible in-place color mixing. */
  function localBlend(ctx, cx, cy, radius, strength, canvasW, canvasH) {
    const r = Math.ceil(radius);
    const x0 = Math.max(0, Math.floor(cx - r));
    const y0 = Math.max(0, Math.floor(cy - r));
    const x1 = Math.min(canvasW, Math.ceil(cx + r));
    const y1 = Math.min(canvasH, Math.ceil(cy + r));
    const pw = x1 - x0;
    const ph = y1 - y0;
    if (pw <= 0 || ph <= 0) return;

    const img = ctx.getImageData(x0, y0, pw, ph);
    const data = img.data;
    const r2 = radius * radius;
    let ar = 0, ag = 0, ab = 0, aa = 0, n = 0;

    for (let py = y0; py < y1; py++) {
      for (let px = x0; px < x1; px++) {
        const dx = px - cx;
        const dy = py - cy;
        if (dx * dx + dy * dy > r2) continue;
        const i = ((py - y0) * pw + (px - x0)) * 4;
        ar += data[i];
        ag += data[i + 1];
        ab += data[i + 2];
        aa += data[i + 3];
        n++;
      }
    }
    if (!n || aa / n < 4) return;

    ar /= n;
    ag /= n;
    ab /= n;

    for (let py = y0; py < y1; py++) {
      for (let px = x0; px < x1; px++) {
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > radius) continue;
        const i = ((py - y0) * pw + (px - x0)) * 4;
        const falloff = 1 - dist / radius;
        const t = strength * falloff;
        data[i] = data[i] * (1 - t) + ar * t;
        data[i + 1] = data[i + 1] * (1 - t) + ag * t;
        data[i + 2] = data[i + 2] * (1 - t) + ab * t;
      }
    }
    ctx.putImageData(img, x0, y0);
  }

  /** Smudge: copy pixels from source point and stamp at destination. */
  function smudgeCopy(ctx, sourceCanvas, fromX, fromY, toX, toY, radius, strength) {
    const r = Math.ceil(radius);
    const size = r * 2 + 1;
    const temp = document.createElement("canvas");
    temp.width = size;
    temp.height = size;
    const tctx = temp.getContext("2d");
    const fx = Math.round(fromX - r);
    const fy = Math.round(fromY - r);
    tctx.drawImage(sourceCanvas, fx, fy, size, size, 0, 0, size, size);

    ctx.save();
    ctx.globalAlpha = strength;
    ctx.beginPath();
    ctx.arc(toX, toY, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(temp, toX - r, toY - r);
    ctx.restore();
  }

  return {
    getDabPoints,
    stamp,
    drawStroke,
    simpleNoise,
    noiseOffset,
    kaleidoscopePoints,
    sampleAverageColor,
    rgbaToCss,
    parseColorToRgba,
    mixRgba,
    localBlend,
    smudgeCopy,
  };
})();

const BaseTool = {
  name: "base",
  cursor: "crosshair",

  onPointerDown(ctx, e, app) {},
  onPointerMove(ctx, e, app) {},
  onPointerUp(ctx, e, app) {},
};

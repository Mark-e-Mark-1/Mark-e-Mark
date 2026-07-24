const LayerFilters = (() => {
  function blurCanvas(sourceCanvas, amount) {
    const temp = document.createElement("canvas");
    temp.width = sourceCanvas.width;
    temp.height = sourceCanvas.height;
    const ctx = temp.getContext("2d");
    ctx.filter = `blur(${amount}px)`;
    ctx.drawImage(sourceCanvas, 0, 0);
    ctx.filter = "none";
    return temp;
  }

  function copyCanvas(source) {
    const c = document.createElement("canvas");
    c.width = source.width;
    c.height = source.height;
    c.getContext("2d").drawImage(source, 0, 0);
    return c;
  }

  function grayscaleValue(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  function buildInvertedGrayscale(sourceCanvas) {
    const w = sourceCanvas.width;
    const h = sourceCanvas.height;
    const out = document.createElement("canvas");
    out.width = w;
    out.height = h;
    const ctx = out.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = 255 - grayscaleValue(d[i], d[i + 1], d[i + 2]);
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return out;
  }

  function buildEdgeOverlay(sourceCanvas, strength) {
    const w = sourceCanvas.width;
    const h = sourceCanvas.height;
    const scale = Math.min(1, 1024 / Math.max(w, h));
    const sw = Math.max(1, Math.round(w * scale));
    const sh = Math.max(1, Math.round(h * scale));

    const small = document.createElement("canvas");
    small.width = sw;
    small.height = sh;
    const sctx = small.getContext("2d");
    sctx.drawImage(sourceCanvas, 0, 0, sw, sh);
    const src = sctx.getImageData(0, 0, sw, sh);
    const out = sctx.createImageData(sw, sh);
    const s = src.data;
    const o = out.data;

    for (let y = 1; y < sh - 1; y++) {
      for (let x = 1; x < sw - 1; x++) {
        const idx = (y * sw + x) * 4;
        const lum = (px, py) => {
          const i = (py * sw + px) * 4;
          return grayscaleValue(s[i], s[i + 1], s[i + 2]);
        };
        const gx =
          -lum(x - 1, y - 1) - 2 * lum(x - 1, y) - lum(x - 1, y + 1) +
          lum(x + 1, y - 1) + 2 * lum(x + 1, y) + lum(x + 1, y + 1);
        const gy =
          -lum(x - 1, y - 1) - 2 * lum(x, y - 1) - lum(x + 1, y - 1) +
          lum(x - 1, y + 1) + 2 * lum(x, y + 1) + lum(x + 1, y + 1);
        const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy) * strength);
        const v = 255 - mag;
        o[idx] = o[idx + 1] = o[idx + 2] = v;
        o[idx + 3] = 255;
      }
    }

    sctx.putImageData(out, 0, 0);
    const full = document.createElement("canvas");
    full.width = w;
    full.height = h;
    full.getContext("2d").drawImage(small, 0, 0, w, h);
    return full;
  }

  function applyDrawing(layer, options) {
    const detail = options.detail ?? 12;
    const colorKeep = options.colorKeep ?? 0.3;
    const lineStrength = options.lineStrength ?? 0.55;
    const w = layer.canvas.width;
    const h = layer.canvas.height;
    if (w < 1 || h < 1) return;

    const original = copyCanvas(layer.canvas);
    const inverted = buildInvertedGrayscale(original);
    const blurred = blurCanvas(inverted, detail);
    const edges = lineStrength > 0 ? buildEdgeOverlay(original, lineStrength) : null;

    const ctx = layer.getCtx();
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.drawImage(original, 0, 0);
    ctx.globalCompositeOperation = "color-dodge";
    ctx.drawImage(blurred, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    if (edges) {
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(edges, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    }

    if (colorKeep > 0) {
      ctx.globalAlpha = colorKeep;
      ctx.globalCompositeOperation = "color";
      ctx.drawImage(original, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }
  }

  function clampByte(v) {
    return v < 0 ? 0 : v > 255 ? 255 : v;
  }

  function mapLevelsChannel(v, black, white, gamma) {
    const b = Math.min(254, Math.max(0, black));
    const w = Math.max(b + 1, Math.min(255, white));
    let t = (v - b) / (w - b);
    t = Math.min(1, Math.max(0, t));
    const g = Math.max(0.1, Math.min(3, gamma || 1));
    return clampByte(Math.pow(t, 1 / g) * 255);
  }

  /** Levels: remap tonal range. black/white in 0–255, gamma ~0.1–3 (1 = linear). */
  function applyLevels(layer, options) {
    const black = options.black ?? 0;
    const white = options.white ?? 255;
    const gamma = options.gamma ?? 1;
    const w = layer.canvas.width;
    const h = layer.canvas.height;
    if (w < 1 || h < 1) return;
    const ctx = layer.getCtx();
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue;
      d[i] = mapLevelsChannel(d[i], black, white, gamma);
      d[i + 1] = mapLevelsChannel(d[i + 1], black, white, gamma);
      d[i + 2] = mapLevelsChannel(d[i + 2], black, white, gamma);
    }
    ctx.putImageData(img, 0, 0);
  }

  /** Build a 256 LUT from curve points [{x,y}] in 0–255 (x sorted). */
  function buildCurveLut(points) {
    const pts = (points && points.length ? points.slice() : [
      { x: 0, y: 0 },
      { x: 255, y: 255 },
    ]).map((p) => ({ x: +p.x, y: +p.y })).sort((a, b) => a.x - b.x);
    if (pts[0].x > 0) pts.unshift({ x: 0, y: pts[0].y });
    if (pts[pts.length - 1].x < 255) pts.push({ x: 255, y: pts[pts.length - 1].y });
    const lut = new Uint8Array(256);
    let j = 0;
    for (let x = 0; x < 256; x++) {
      while (j < pts.length - 2 && pts[j + 1].x < x) j++;
      const a = pts[j];
      const b = pts[j + 1] || a;
      const t = b.x === a.x ? 0 : (x - a.x) / (b.x - a.x);
      // Smoothstep interpolation
      const s = t * t * (3 - 2 * t);
      lut[x] = clampByte(a.y + (b.y - a.y) * s);
    }
    return lut;
  }

  /** Curves: apply tone curve. points = [{x,y}] 0–255, or preset "s-curve" / "invert". */
  function applyCurves(layer, options) {
    let points = options.points;
    if (options.preset === "s-curve") {
      points = [
        { x: 0, y: 0 },
        { x: 64, y: 48 },
        { x: 128, y: 128 },
        { x: 192, y: 208 },
        { x: 255, y: 255 },
      ];
    } else if (options.preset === "invert") {
      points = [
        { x: 0, y: 255 },
        { x: 255, y: 0 },
      ];
    } else if (options.mid != null) {
      // Single mid-point control: shadow→mid→highlight
      const mid = Math.min(240, Math.max(16, options.mid));
      const midOut = Math.min(240, Math.max(16, options.midOut ?? mid));
      points = [
        { x: 0, y: 0 },
        { x: mid, y: midOut },
        { x: 255, y: 255 },
      ];
    }
    const lut = buildCurveLut(points);
    const w = layer.canvas.width;
    const h = layer.canvas.height;
    if (w < 1 || h < 1) return;
    const ctx = layer.getCtx();
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue;
      d[i] = lut[d[i]];
      d[i + 1] = lut[d[i + 1]];
      d[i + 2] = lut[d[i + 2]];
    }
    ctx.putImageData(img, 0, 0);
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l };
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    return { h, s, l };
  }

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  function hslToRgb(h, s, l) {
    if (s === 0) {
      const v = clampByte(l * 255);
      return { r: v, g: v, b: v };
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return {
      r: clampByte(hue2rgb(p, q, h + 1 / 3) * 255),
      g: clampByte(hue2rgb(p, q, h) * 255),
      b: clampByte(hue2rgb(p, q, h - 1 / 3) * 255),
    };
  }

  /** Hue/saturation: hueShift degrees (-180..180), sat ±100, light ±100. */
  function applyHueSat(layer, options) {
    const hueShift = (options.hue ?? 0) / 360;
    const satDelta = (options.saturation ?? 0) / 100;
    const lightDelta = (options.lightness ?? 0) / 100;
    const w = layer.canvas.width;
    const h = layer.canvas.height;
    if (w < 1 || h < 1) return;
    const ctx = layer.getCtx();
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue;
      const hsl = rgbToHsl(d[i], d[i + 1], d[i + 2]);
      let hVal = hsl.h + hueShift;
      hVal = hVal - Math.floor(hVal);
      let s = Math.min(1, Math.max(0, hsl.s + satDelta));
      let l = Math.min(1, Math.max(0, hsl.l + lightDelta));
      const rgb = hslToRgb(hVal, s, l);
      d[i] = rgb.r;
      d[i + 1] = rgb.g;
      d[i + 2] = rgb.b;
    }
    ctx.putImageData(img, 0, 0);
  }

  return { applyDrawing, applyLevels, applyCurves, applyHueSat };
})();

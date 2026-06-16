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

  return { applyDrawing };
})();

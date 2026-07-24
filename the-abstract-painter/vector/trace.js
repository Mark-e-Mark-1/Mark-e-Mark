const VectorTrace = (() => {
  function simplifyRing(ring, eps) {
    if (ring.length < 3) return ring;
    const out = [ring[0]];
    for (let i = 1; i < ring.length; i++) {
      const p = ring[i];
      const q = out[out.length - 1];
      if (Math.hypot(p[0] - q[0], p[1] - q[1]) >= eps) out.push(p);
    }
    if (out.length >= 3) {
      const f = out[0];
      const l = out[out.length - 1];
      if (Math.hypot(f[0] - l[0], f[1] - l[1]) < eps) out.pop();
    }
    return out.length >= 3 ? out : ring;
  }

  function area(ring) {
    let a = 0;
    for (let i = 0, n = ring.length; i < n; i++) {
      const j = (i + 1) % n;
      a += ring[i][0] * ring[j][1] - ring[j][0] * ring[i][1];
    }
    return a / 2;
  }

  function ensureCCW(ring) {
    const r = ring.map((p) => [p[0], p[1]]);
    if (area(r) < 0) r.reverse();
    return r;
  }

  function ringBounds(ring) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    ring.forEach((p) => {
      minX = Math.min(minX, p[0]);
      minY = Math.min(minY, p[1]);
      maxX = Math.max(maxX, p[0]);
      maxY = Math.max(maxY, p[1]);
    });
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
  }

  /**
   * Trace painted content on a raster canvas into closed path rings.
   * Uses alpha + contrast-from-background so soft/light strokes still count.
   */
  function traceCanvas(canvas, opts = {}) {
    const alphaMin = opts.threshold ?? 12;
    const contrastMin = opts.contrast ?? 18;
    const maxContours = opts.maxContours ?? 80;
    const simplifyEps = opts.simplify ?? 2;
    const step = Math.max(1, opts.sampleStep ?? 2);
    const minArea = opts.minArea ?? 40;
    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const data = ctx.getImageData(0, 0, w, h).data;

    // Estimate background from corners (typical empty layer / white canvas)
    const corners = [
      [0, 0],
      [w - 1, 0],
      [0, h - 1],
      [w - 1, h - 1],
    ];
    let br = 0;
    let bg = 0;
    let bb = 0;
    let ba = 0;
    corners.forEach(([cx, cy]) => {
      const i = (cy * w + cx) * 4;
      br += data[i];
      bg += data[i + 1];
      bb += data[i + 2];
      ba += data[i + 3];
    });
    br /= 4;
    bg /= 4;
    bb /= 4;
    ba /= 4;

    const cw = Math.ceil(w / step);
    const ch = Math.ceil(h / step);
    const mask = new Uint8Array(cw * ch);
    let inkCount = 0;

    function isInk(px, py) {
      const i = (py * w + px) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < alphaMin) return false;
      // Transparent-ish background: any opaque enough pixel is ink
      if (ba < 40) return a >= alphaMin;
      // Opaque background: require contrast from corner color
      const dr = r - br;
      const dg = g - bg;
      const db = b - bb;
      const da = a - ba;
      const dist = Math.sqrt(dr * dr + dg * dg + db * db + da * da * 0.25);
      return dist >= contrastMin;
    }

    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        const px = Math.min(w - 1, x * step + Math.floor(step / 2));
        const py = Math.min(h - 1, y * step + Math.floor(step / 2));
        if (isInk(px, py)) {
          mask[y * cw + x] = 1;
          inkCount++;
        }
      }
    }

    if (inkCount < 4) return [];

    // If nearly the whole canvas is "ink", treat as solid fill — outline only the outer edge
    const coverage = inkCount / (cw * ch);
    const solidFill = coverage > 0.92;

    function inside(x, y) {
      if (x < 0 || y < 0 || x >= cw || y >= ch) return false;
      return mask[y * cw + x] === 1;
    }

    // Moore neighborhood contour (clockwise), start from left-edge ink pixels
    const N8 = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
    ];
    const edgeVisited = new Uint8Array(cw * ch);
    const rings = [];

    function edgeKey(x, y) {
      return y * cw + x;
    }

    function traceBoundary(sx, sy) {
      // Find initial backtrack direction: coming from left (outside)
      let backDir = 4; // from west
      const ring = [];
      let x = sx;
      let y = sy;
      let guard = cw * ch * 4;
      const startX = sx;
      const startY = sy;

      do {
        ring.push([x * step + step / 2, y * step + step / 2]);
        edgeVisited[edgeKey(x, y)] = 1;

        // Search neighbors starting from backDir+1 (left of entry)
        let found = false;
        let nextDir = -1;
        for (let k = 0; k < 8; k++) {
          const d = (backDir + 1 + k) % 8;
          const nx = x + N8[d][0];
          const ny = y + N8[d][1];
          if (inside(nx, ny)) {
            x = nx;
            y = ny;
            // New back direction is opposite of the step we took
            backDir = (d + 4) % 8;
            nextDir = d;
            found = true;
            break;
          }
        }
        void nextDir;
        if (!found) break;
        guard--;
      } while (guard > 0 && !(x === startX && y === startY && ring.length > 3));

      if (ring.length < 4) return null;
      const simplified = simplifyRing(ring, simplifyEps * step);
      if (simplified.length < 3) return null;
      const a = Math.abs(area(simplified));
      if (a < minArea) return null;
      const b = ringBounds(simplified);
      // Skip near-full-canvas outlines unless the layer really is a solid fill
      if (!solidFill && b.w > w * 0.95 && b.h > h * 0.95) return null;
      return ensureCCW(simplified);
    }

    for (let y = 0; y < ch && rings.length < maxContours; y++) {
      for (let x = 0; x < cw && rings.length < maxContours; x++) {
        if (!inside(x, y) || edgeVisited[edgeKey(x, y)]) continue;
        // Start only on left silhouette edge
        if (inside(x - 1, y)) continue;
        const ring = traceBoundary(x, y);
        if (ring) rings.push(ring);
        // Mark a band of the component so we don't restart endlessly on the same blob
        // (edgeVisited already covers boundary; flood a bit of interior near this start)
        const stack = [[x, y]];
        let marked = 0;
        while (stack.length && marked < 2000) {
          const [cx, cy] = stack.pop();
          if (!inside(cx, cy)) continue;
          const k = edgeKey(cx, cy);
          if (edgeVisited[k] === 2) continue;
          if (edgeVisited[k] === 0) edgeVisited[k] = 2;
          marked++;
          stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
        }
      }
    }

    // Prefer larger shapes first
    rings.sort((a, b) => Math.abs(area(b)) - Math.abs(area(a)));
    return rings;
  }

  function sampleFillColor(canvas, ring) {
    if (!ring?.length) return null;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const b = ringBounds(ring);
    const cx = Math.round((b.minX + b.maxX) / 2);
    const cy = Math.round((b.minY + b.maxY) / 2);
    const x = Math.max(0, Math.min(canvas.width - 1, cx));
    const y = Math.max(0, Math.min(canvas.height - 1, cy));
    const d = ctx.getImageData(x, y, 1, 1).data;
    if (d[3] < 20) return null;
    const hex = (n) => n.toString(16).padStart(2, "0");
    return `#${hex(d[0])}${hex(d[1])}${hex(d[2])}`;
  }

  function ringsToObjects(rings, style = {}, canvas = null) {
    return rings.map((ring) => {
      const points = ring.map((p) => ({ x: p[0], y: p[1], in: null, out: null }));
      const sampled = canvas ? sampleFillColor(canvas, ring) : null;
      return VectorModel.createPathObject(points, {
        stroke: style.stroke || "#111111",
        fill: style.fill !== undefined ? style.fill : sampled || "#88c0d0",
        strokeWidth: style.strokeWidth ?? 1.5,
        opacity: style.opacity ?? 1,
        closed: true,
      });
    });
  }

  function traceLayerToObjects(layer, opts = {}) {
    if (!layer?.canvas) return [];
    const rings = traceCanvas(layer.canvas, opts);
    return ringsToObjects(rings, opts.style || {}, layer.canvas);
  }

  return { traceCanvas, ringsToObjects, traceLayerToObjects };
})();

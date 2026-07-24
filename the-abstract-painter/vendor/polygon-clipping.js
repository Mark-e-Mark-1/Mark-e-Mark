/**
 * Polygon boolean ops for The Abstract Painter.
 * API mirrors polygon-clipping: union / intersection / difference / xor
 * Geometry: MultiPolygon = [ Polygon ]; Polygon = [ ring, ...holes ]; ring = [[x,y], ...]
 *
 * Uses high-res canvas masks + marching-squares contour extraction so bezier-sampled
 * shapes boolean reliably without an npm dependency.
 */
(function (root) {
  "use strict";

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

  function normalizeMP(geom) {
    if (!geom || !geom.length) return [];
    if (typeof geom[0][0][0] === "number") {
      return [geom.map((ring) => ring.map((p) => [+p[0], +p[1]]))];
    }
    return geom.map((poly) => poly.map((ring) => ring.map((p) => [+p[0], +p[1]])));
  }

  function boundsOf(mps) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    mps.forEach((mp) => {
      mp.forEach((poly) => {
        poly.forEach((ring) => {
          ring.forEach((p) => {
            minX = Math.min(minX, p[0]);
            minY = Math.min(minY, p[1]);
            maxX = Math.max(maxX, p[0]);
            maxY = Math.max(maxY, p[1]);
          });
        });
      });
    });
    if (!Number.isFinite(minX)) return { minX: 0, minY: 0, maxX: 1, maxY: 1 };
    return { minX, minY, maxX, maxY };
  }

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

  function fillMP(ctx, mp, ox, oy, scale) {
    mp.forEach((poly) => {
      ctx.beginPath();
      poly.forEach((ring) => {
        if (!ring.length) return;
        ctx.moveTo((ring[0][0] - ox) * scale, (ring[0][1] - oy) * scale);
        for (let i = 1; i < ring.length; i++) {
          ctx.lineTo((ring[i][0] - ox) * scale, (ring[i][1] - oy) * scale);
        }
        ctx.closePath();
      });
      ctx.fill("evenodd");
    });
  }

  function rasterBoolean(subjectMP, clipMP, mode, targetRes) {
    const all = [subjectMP, clipMP];
    const b = boundsOf(all);
    const pad = 4;
    const bw = Math.max(4, b.maxX - b.minX);
    const bh = Math.max(4, b.maxY - b.minY);
    const scale = Math.min(1, targetRes / Math.max(bw, bh));
    const cw = Math.max(16, Math.ceil((bw + pad * 2) * scale));
    const ch = Math.max(16, Math.ceil((bh + pad * 2) * scale));
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const ox = b.minX - pad;
    const oy = b.minY - pad;

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#ffffff";
    ctx.globalCompositeOperation = "source-over";
    fillMP(ctx, subjectMP, ox, oy, scale);

    if (mode === "intersection") {
      ctx.globalCompositeOperation = "destination-in";
      fillMP(ctx, clipMP, ox, oy, scale);
    } else if (mode === "difference") {
      ctx.globalCompositeOperation = "destination-out";
      fillMP(ctx, clipMP, ox, oy, scale);
    } else if (mode === "union") {
      fillMP(ctx, clipMP, ox, oy, scale);
    } else if (mode === "xor") {
      ctx.globalCompositeOperation = "xor";
      fillMP(ctx, clipMP, ox, oy, scale);
    }

    const data = ctx.getImageData(0, 0, cw, ch).data;
    function inside(x, y) {
      if (x < 0 || y < 0 || x >= cw || y >= ch) return false;
      return data[(y * cw + x) * 4 + 3] > 128;
    }

    const visited = new Uint8Array(cw * ch);
    const rings = [];
    const dirs = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    function trace(sx, sy) {
      const ring = [];
      let x = sx;
      let y = sy;
      let dir = 0;
      let guard = cw * ch * 8;
      do {
        ring.push([ox + (x + 0.5) / scale, oy + (y + 0.5) / scale]);
        visited[y * cw + x] = 1;
        let stepped = false;
        for (let t = 0; t < 4; t++) {
          const nd = (dir + 3 + t) % 4;
          const nx = x + dirs[nd][0];
          const ny = y + dirs[nd][1];
          if (inside(nx, ny)) {
            x = nx;
            y = ny;
            dir = nd;
            stepped = true;
            break;
          }
        }
        if (!stepped) break;
        guard--;
      } while (guard > 0 && !(x === sx && y === sy && ring.length > 3));
      const simplified = simplifyRing(ring, Math.max(0.75 / scale, 0.5));
      if (simplified.length >= 3) rings.push(ensureCCW(simplified));
    }

    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        if (!inside(x, y) || visited[y * cw + x]) continue;
        if (!inside(x - 1, y)) trace(x, y);
      }
    }

    return rings.map((r) => [r]);
  }

  function combinePair(aMP, bMP, mode) {
    return rasterBoolean(normalizeMP(aMP), normalizeMP(bMP), mode, 720);
  }

  function reduce(geoms, mode) {
    if (!geoms.length) return [];
    let acc = normalizeMP(geoms[0]);
    for (let i = 1; i < geoms.length; i++) {
      acc = combinePair(acc, geoms[i], mode);
      if (!acc.length && mode === "intersection") return [];
    }
    return acc;
  }

  root.PolygonClipping = {
    union() {
      return reduce(Array.prototype.slice.call(arguments), "union");
    },
    intersection() {
      return reduce(Array.prototype.slice.call(arguments), "intersection");
    },
    difference(subject) {
      let acc = normalizeMP(subject);
      for (let i = 1; i < arguments.length; i++) {
        acc = combinePair(acc, arguments[i], "difference");
      }
      return acc;
    },
    xor() {
      return reduce(Array.prototype.slice.call(arguments), "xor");
    },
  };
})(typeof window !== "undefined" ? window : globalThis);

const VectorModel = (() => {
  function uid() {
    return "vobj_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
  }

  function defaultTransform() {
    return { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 };
  }

  function appearanceFromOpts(opts = {}) {
    return {
      stroke: opts.stroke !== undefined ? opts.stroke : "#000000",
      fill: opts.fill !== undefined ? cloneFill(opts.fill) : null,
      strokeWidth: opts.strokeWidth ?? 2,
      strokeProfile: opts.strokeProfile || "constant",
      opacity: opts.opacity ?? 1,
      strokeLinecap: opts.strokeLinecap || "round",
      strokeLinejoin: opts.strokeLinejoin || "round",
      dash: opts.dash != null ? opts.dash.slice() : null,
      shadow: opts.shadow !== undefined ? cloneShadow(opts.shadow) : null,
    };
  }

  function defaultShadow() {
    return { dx: 4, dy: 6, blur: 12, color: "#000000", opacity: 0.45 };
  }

  function cloneShadow(shadow) {
    if (!shadow) return null;
    return {
      dx: +shadow.dx || 0,
      dy: +shadow.dy || 0,
      blur: Math.max(0, +shadow.blur || 0),
      color: shadow.color || "#000000",
      opacity: Math.min(1, Math.max(0, shadow.opacity ?? 0.45)),
    };
  }

  function rgbaFromHex(hex, alpha) {
    const raw = String(hex || "#000000").replace("#", "");
    const full =
      raw.length === 3
        ? raw.split("").map((c) => c + c).join("")
        : raw.padEnd(6, "0").slice(0, 6);
    const r = parseInt(full.slice(0, 2), 16) || 0;
    const g = parseInt(full.slice(2, 4), 16) || 0;
    const b = parseInt(full.slice(4, 6), 16) || 0;
    const a = Math.min(1, Math.max(0, alpha ?? 1));
    return `rgba(${r},${g},${b},${a})`;
  }

  function cloneFill(fill) {
    if (fill == null) return null;
    if (typeof fill === "string") return fill;
    if (typeof fill !== "object") return null;
    return JSON.parse(JSON.stringify(fill));
  }

  function isGradientFill(fill) {
    return fill && typeof fill === "object" && (fill.type === "linear" || fill.type === "radial");
  }

  function isSolidFill(fill) {
    return typeof fill === "string" && fill.length > 0;
  }

  function hasFill(fill) {
    return isSolidFill(fill) || isGradientFill(fill);
  }

  function solidFillColor(fill, fallback = "#457b9d") {
    if (isSolidFill(fill)) return fill;
    if (isGradientFill(fill) && fill.stops?.length) return fill.stops[0].color || fallback;
    return fallback;
  }

  function makeLinearFill(c0, c1, angleDeg = 90) {
    const rad = ((angleDeg || 0) * Math.PI) / 180;
    const cx = 0.5;
    const cy = 0.5;
    const dx = Math.cos(rad) * 0.5;
    const dy = Math.sin(rad) * 0.5;
    return {
      type: "linear",
      x1: cx - dx,
      y1: cy - dy,
      x2: cx + dx,
      y2: cy + dy,
      stops: [
        { offset: 0, color: c0 || "#e63946" },
        { offset: 1, color: c1 || "#457b9d" },
      ],
    };
  }

  function makeRadialFill(c0, c1) {
    return {
      type: "radial",
      cx: 0.5,
      cy: 0.5,
      r: 0.7,
      stops: [
        { offset: 0, color: c0 || "#e63946" },
        { offset: 1, color: c1 || "#457b9d" },
      ],
    };
  }

  function localBoundsForFill(obj) {
    if (!obj) return { x: 0, y: 0, w: 1, h: 1 };
    if (obj.type === "rect" || obj.type === "roundRect" || obj.type === "ellipse") {
      return {
        x: Math.min(obj.x, obj.x + obj.w),
        y: Math.min(obj.y, obj.y + obj.h),
        w: Math.max(1, Math.abs(obj.w)),
        h: Math.max(1, Math.abs(obj.h)),
      };
    }
    if (obj.type === "star" || obj.type === "regpoly") {
      const r = Math.max(obj.outerR || obj.radius || 1, 1);
      return { x: obj.cx - r, y: obj.cy - r, w: r * 2, h: r * 2 };
    }
    if (obj.type === "line") {
      const x = Math.min(obj.x1, obj.x2);
      const y = Math.min(obj.y1, obj.y2);
      return {
        x,
        y,
        w: Math.max(1, Math.abs(obj.x2 - obj.x1)),
        h: Math.max(1, Math.abs(obj.y2 - obj.y1)),
      };
    }
    if (obj.type === "text") {
      const lines = textLines(obj);
      const approxW = Math.max(40, (obj.fontSize || 32) * Math.max(...lines.map((l) => l.length), 1) * 0.55);
      const approxH = (obj.fontSize || 32) * (obj.lineHeight ?? 1.25) * Math.max(1, lines.length);
      return { x: obj.x, y: obj.y - (obj.fontSize || 32), w: approxW, h: approxH };
    }
    if (obj.type === "path" && obj.points?.length) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      obj.points.forEach((p) => {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      });
      return {
        x: minX,
        y: minY,
        w: Math.max(1, maxX - minX),
        h: Math.max(1, maxY - minY),
      };
    }
    const b = localBounds(obj);
    return b || { x: 0, y: 0, w: 1, h: 1 };
  }

  function profileWidthFactor(t, profile) {
    const u = Math.min(1, Math.max(0, t));
    switch (profile) {
      case "taper":
        return Math.max(0.06, 1 - u * 0.94);
      case "taper-rev":
        return Math.max(0.06, 0.06 + u * 0.94);
      case "swell":
        return Math.max(0.08, 0.08 + 0.92 * Math.sin(Math.PI * u));
      default:
        return 1;
    }
  }

  function sampleLocalPolyline(obj, samplesPerSeg = 10) {
    if (!obj) return [];
    if (obj.type === "line") {
      return [
        { x: obj.x1, y: obj.y1 },
        { x: obj.x2, y: obj.y2 },
      ];
    }
    let path = obj.type === "path" ? obj : shapeToPath(obj);
    if (!path?.points?.length) return [];
    const pts = path.points;
    const out = [];
    out.push({ x: pts[0].x, y: pts[0].y });
    const count = path.closed ? pts.length : pts.length - 1;
    for (let i = 0; i < count; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      if (a.out || b.in) {
        for (let s = 1; s <= samplesPerSeg; s++) {
          const p = cubicPoint(a, b, s / samplesPerSeg);
          out.push({ x: p.x, y: p.y });
        }
      } else {
        out.push({ x: b.x, y: b.y });
      }
    }
    return out;
  }

  function createPathObject(points, opts = {}) {
    return {
      id: uid(),
      type: "path",
      ...appearanceFromOpts(opts),
      transform: defaultTransform(),
      closed: !!opts.closed,
      points: points.map((p) => ({
        x: p.x,
        y: p.y,
        in: p.in ? { ...p.in } : null,
        out: p.out ? { ...p.out } : null,
      })),
    };
  }

  function createRectObject(x, y, w, h, opts = {}) {
    return {
      id: uid(),
      type: "rect",
      ...appearanceFromOpts(opts),
      transform: defaultTransform(),
      x,
      y,
      w,
      h,
    };
  }

  function createEllipseObject(x, y, w, h, opts = {}) {
    return {
      id: uid(),
      type: "ellipse",
      ...appearanceFromOpts(opts),
      transform: defaultTransform(),
      x,
      y,
      w,
      h,
    };
  }

  function createLineObject(x1, y1, x2, y2, opts = {}) {
    return {
      id: uid(),
      type: "line",
      ...appearanceFromOpts({ ...opts, fill: null }),
      fill: null,
      transform: defaultTransform(),
      x1,
      y1,
      x2,
      y2,
    };
  }

  function createRoundRectObject(x, y, w, h, rx, opts = {}) {
    const maxR = Math.min(Math.abs(w), Math.abs(h)) / 2;
    return {
      id: uid(),
      type: "roundRect",
      ...appearanceFromOpts(opts),
      transform: defaultTransform(),
      x,
      y,
      w,
      h,
      rx: Math.max(0, Math.min(rx ?? 12, maxR)),
    };
  }

  function createStarObject(cx, cy, outerR, innerR, tips, opts = {}) {
    return {
      id: uid(),
      type: "star",
      ...appearanceFromOpts(opts),
      transform: defaultTransform(),
      cx,
      cy,
      outerR: Math.max(1, outerR),
      innerR: Math.max(0.5, innerR),
      tips: Math.max(3, Math.round(tips || 5)),
    };
  }

  function createRegularPolygonObject(cx, cy, radius, sides, opts = {}) {
    return {
      id: uid(),
      type: "regpoly",
      ...appearanceFromOpts(opts),
      transform: defaultTransform(),
      cx,
      cy,
      radius: Math.max(1, radius),
      sides: Math.max(3, Math.round(sides || 6)),
    };
  }

  function cloneObject(obj) {
    const copy = JSON.parse(JSON.stringify(obj));
    copy.id = uid();
    return copy;
  }

  function starPoints(obj) {
    const pts = [];
    const n = obj.tips || 5;
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? obj.outerR : obj.innerR;
      const a = -Math.PI / 2 + (i * Math.PI) / n;
      pts.push({
        x: obj.cx + Math.cos(a) * r,
        y: obj.cy + Math.sin(a) * r,
        in: null,
        out: null,
      });
    }
    return pts;
  }

  function regularPolygonPoints(obj) {
    const pts = [];
    const n = obj.sides || 6;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      pts.push({
        x: obj.cx + Math.cos(a) * obj.radius,
        y: obj.cy + Math.sin(a) * obj.radius,
        in: null,
        out: null,
      });
    }
    return pts;
  }

  function roundRectCornerRadius(obj) {
    const maxR = Math.min(Math.abs(obj.w), Math.abs(obj.h)) / 2;
    return Math.max(0, Math.min(obj.rx ?? 0, maxR));
  }

  function roundRectPathPoints(obj) {
    const x = Math.min(obj.x, obj.x + obj.w);
    const y = Math.min(obj.y, obj.y + obj.h);
    const w = Math.abs(obj.w);
    const h = Math.abs(obj.h);
    const r = roundRectCornerRadius(obj);
    if (r < 0.5) {
      return [
        { x, y, in: null, out: null },
        { x: x + w, y, in: null, out: null },
        { x: x + w, y: y + h, in: null, out: null },
        { x, y: y + h, in: null, out: null },
      ];
    }
    const k = 0.5522847498;
    // Approximate rounded corners with cubic beziers
    return [
      { x: x + r, y, in: null, out: null },
      { x: x + w - r, y, in: null, out: { x: r * k, y: 0 } },
      { x: x + w, y: y + r, in: { x: 0, y: -r * k }, out: null },
      { x: x + w, y: y + h - r, in: null, out: { x: 0, y: r * k } },
      { x: x + w - r, y: y + h, in: { x: r * k, y: 0 }, out: null },
      { x: x + r, y: y + h, in: null, out: { x: -r * k, y: 0 } },
      { x, y: y + h - r, in: { x: 0, y: r * k }, out: null },
      { x, y: y + r, in: null, out: { x: 0, y: -r * k } },
    ];
  }

  function createTextObject(x, y, text, opts = {}) {
    return {
      id: uid(),
      type: "text",
      stroke: null,
      fill: opts.fill || opts.stroke || "#000000",
      strokeWidth: 0,
      opacity: opts.opacity ?? 1,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      dash: null,
      transform: defaultTransform(),
      x,
      y,
      text: text || "Text",
      fontSize: opts.fontSize ?? 32,
      fontFamily: opts.fontFamily || "Georgia, 'Times New Roman', serif",
      fontWeight: opts.fontWeight || "normal",
      textAlign: opts.textAlign || "left",
      lineHeight: opts.lineHeight ?? 1.25,
      pathId: opts.pathId || null,
      pathOffset: opts.pathOffset ?? 0,
    };
  }

  function fontCss(obj) {
    const weight = obj.fontWeight || "normal";
    const size = obj.fontSize || 32;
    const family = obj.fontFamily || "sans-serif";
    return `${weight} ${size}px ${family}`;
  }

  function textLines(obj) {
    return String(obj.text || "").split(/\r?\n/);
  }

  function measureTextSize(obj) {
    const canvas = measureTextSize._c || (measureTextSize._c = document.createElement("canvas"));
    const ctx = canvas.getContext("2d");
    ctx.font = fontCss(obj);
    const lines = textLines(obj);
    const lineH = (obj.fontSize || 32) * (obj.lineHeight ?? 1.25);
    let maxW = 8;
    lines.forEach((line) => {
      maxW = Math.max(maxW, ctx.measureText(line || " ").width);
    });
    const h = Math.max(lineH, lines.length * lineH);
    return { w: maxW, h, lineH, lines };
  }

  function textAnchorX(obj, lineWidth) {
    const align = obj.textAlign || "left";
    if (align === "center") return obj.x - lineWidth / 2;
    if (align === "right") return obj.x - lineWidth;
    return obj.x;
  }

  /** Sample a path (or convertible shape) into world-space polyline points. */
  function sampleObjectPolyline(obj, samplesPerSeg = 12) {
    if (!obj) return [];
    let path = obj.type === "path" ? obj : shapeToPath(obj);
    if (!path?.points?.length) {
      if (obj.type === "line") {
        const a = applyTransformPoint(obj.x1, obj.y1, obj.transform);
        const b = applyTransformPoint(obj.x2, obj.y2, obj.transform);
        return [a, b];
      }
      return [];
    }
    const pts = path.points;
    const out = [];
    const push = (lp) => out.push(applyTransformPoint(lp.x, lp.y, path.transform));
    push(pts[0]);
    const count = path.closed ? pts.length : pts.length - 1;
    for (let i = 0; i < count; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      if (a.out || b.in) {
        for (let s = 1; s <= samplesPerSeg; s++) push(cubicPoint(a, b, s / samplesPerSeg));
      } else {
        push(b);
      }
    }
    return out;
  }

  function buildPathLengthTable(points) {
    const segLens = [0];
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
      segLens.push(total);
    }
    return { points, segLens, total };
  }

  function pointAtLength(table, dist) {
    if (!table || table.total <= 0 || table.points.length < 2) {
      return { x: 0, y: 0, angle: 0 };
    }
    let d = dist;
    if (d < 0) d = 0;
    if (d > table.total) d = table.total;
    let i = 1;
    while (i < table.segLens.length && table.segLens[i] < d) i++;
    const a = table.points[i - 1];
    const b = table.points[Math.min(i, table.points.length - 1)];
    const segStart = table.segLens[i - 1];
    const segEnd = table.segLens[Math.min(i, table.segLens.length - 1)];
    const t = segEnd > segStart ? (d - segStart) / (segEnd - segStart) : 0;
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      angle: Math.atan2(b.y - a.y, b.x - a.x),
    };
  }

  function applyTextProps(obj, props) {
    if (!obj || obj.type !== "text" || !props) return;
    if (props.text !== undefined) obj.text = props.text;
    if (props.fontSize !== undefined) obj.fontSize = props.fontSize;
    if (props.fontFamily !== undefined) obj.fontFamily = props.fontFamily;
    if (props.fontWeight !== undefined) obj.fontWeight = props.fontWeight;
    if (props.textAlign !== undefined) obj.textAlign = props.textAlign;
    if (props.lineHeight !== undefined) obj.lineHeight = props.lineHeight;
    if (props.pathId !== undefined) obj.pathId = props.pathId;
    if (props.pathOffset !== undefined) obj.pathOffset = props.pathOffset;
    if (props.fill !== undefined) obj.fill = props.fill;
    if (props.opacity !== undefined) obj.opacity = props.opacity;
  }

  function cloneObjects(objects) {
    return JSON.parse(JSON.stringify(objects || []));
  }

  function findObject(layer, id) {
    if (!layer?.objects) return null;
    return findObjectInList(layer.objects, id);
  }

  function findObjectInList(list, id) {
    if (!list) return null;
    for (const o of list) {
      if (o.id === id) return o;
      if (o.type === "group" && o.children) {
        const hit = findObjectInList(o.children, id);
        if (hit) return hit;
      }
    }
    return null;
  }

  function createGroupObject(children) {
    return {
      id: uid(),
      type: "group",
      stroke: null,
      fill: null,
      strokeWidth: 0,
      opacity: 1,
      transform: defaultTransform(),
      children: (children || []).map((c) => cloneObject(c)),
    };
  }

  function composeTransforms(outer, inner) {
    // result(p) = outer(inner(p)) with scale→rotate→translate convention
    const i = inner || defaultTransform();
    const o = outer || defaultTransform();
    const p00 = applyTransformPoint(0, 0, i);
    const p10 = applyTransformPoint(1, 0, i);
    const p01 = applyTransformPoint(0, 1, i);
    const w00 = applyTransformPoint(p00.x, p00.y, o);
    const w10 = applyTransformPoint(p10.x, p10.y, o);
    const w01 = applyTransformPoint(p01.x, p01.y, o);
    const sxLen = Math.hypot(w10.x - w00.x, w10.y - w00.y) || 1;
    const syLen = Math.hypot(w01.x - w00.x, w01.y - w00.y) || 1;
    const rotation = Math.atan2(w10.y - w00.y, w10.x - w00.x);
    return {
      tx: w00.x,
      ty: w00.y,
      rotation,
      sx: Math.sign(i.sx || 1) * Math.sign(o.sx || 1) * sxLen,
      sy: Math.sign(i.sy || 1) * Math.sign(o.sy || 1) * syLen,
    };
  }

  /** Flatten group: bake group.transform into each child; return new child objects. */
  function bakeGroupToChildren(group) {
    if (!group || group.type !== "group") return [];
    const g = group.transform || defaultTransform();
    const identity =
      Math.abs(g.tx || 0) < 1e-9 &&
      Math.abs(g.ty || 0) < 1e-9 &&
      Math.abs(g.rotation || 0) < 1e-9 &&
      Math.abs((g.sx ?? 1) - 1) < 1e-9 &&
      Math.abs((g.sy ?? 1) - 1) < 1e-9;
    return (group.children || []).map((child) => {
      const c = cloneObject(child);
      if (!identity) c.transform = composeTransforms(g, c.transform || defaultTransform());
      return c;
    });
  }

  function applyTransformPoint(x, y, t) {
    const cos = Math.cos(t.rotation);
    const sin = Math.sin(t.rotation);
    const px = x * t.sx;
    const py = y * t.sy;
    return {
      x: px * cos - py * sin + t.tx,
      y: px * sin + py * cos + t.ty,
    };
  }

  function inverseTransformPoint(x, y, t) {
    const dx = x - t.tx;
    const dy = y - t.ty;
    const cos = Math.cos(-t.rotation);
    const sin = Math.sin(-t.rotation);
    const rx = dx * cos - dy * sin;
    const ry = dx * sin + dy * cos;
    return {
      x: rx / (t.sx || 1),
      y: ry / (t.sy || 1),
    };
  }

  function localBounds(obj) {
    if (obj.type === "group") {
      const kids = obj.children || [];
      if (!kids.length) return { x: 0, y: 0, w: 0, h: 0 };
      // Children store absolute-at-create transforms; treat as local to group
      return unionBounds(kids.map((c) => worldBoundsIgnoringGroup(c)));
    }
    if (obj.type === "rect" || obj.type === "ellipse" || obj.type === "roundRect") {
      const x0 = Math.min(obj.x, obj.x + obj.w);
      const y0 = Math.min(obj.y, obj.y + obj.h);
      const x1 = Math.max(obj.x, obj.x + obj.w);
      const y1 = Math.max(obj.y, obj.y + obj.h);
      return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
    }
    if (obj.type === "star") {
      const r = Math.max(obj.outerR || 0, obj.innerR || 0);
      return { x: obj.cx - r, y: obj.cy - r, w: r * 2, h: r * 2 };
    }
    if (obj.type === "regpoly") {
      const r = obj.radius || 0;
      return { x: obj.cx - r, y: obj.cy - r, w: r * 2, h: r * 2 };
    }
    if (obj.type === "line") {
      const x0 = Math.min(obj.x1, obj.x2);
      const y0 = Math.min(obj.y1, obj.y2);
      return {
        x: x0,
        y: y0,
        w: Math.max(1, Math.abs(obj.x2 - obj.x1)),
        h: Math.max(1, Math.abs(obj.y2 - obj.y1)),
      };
    }
    if (obj.type === "text") {
      const size = measureTextSize(obj);
      let x = obj.x;
      if ((obj.textAlign || "left") === "center") x = obj.x - size.w / 2;
      else if (obj.textAlign === "right") x = obj.x - size.w;
      // Baseline at obj.y for first line; extend downward
      return { x, y: obj.y - size.lineH * 0.8, w: size.w, h: size.h };
    }
    if (!obj.points?.length) return { x: 0, y: 0, w: 0, h: 0 };
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    obj.points.forEach((p) => {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
      if (p.in) {
        minX = Math.min(minX, p.x + p.in.x);
        minY = Math.min(minY, p.y + p.in.y);
        maxX = Math.max(maxX, p.x + p.in.x);
        maxY = Math.max(maxY, p.y + p.in.y);
      }
      if (p.out) {
        minX = Math.min(minX, p.x + p.out.x);
        minY = Math.min(minY, p.y + p.out.y);
        maxX = Math.max(maxX, p.x + p.out.x);
        maxY = Math.max(maxY, p.y + p.out.y);
      }
    });
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }

  function worldBoundsIgnoringGroup(obj) {
    // worldBounds for non-group, or for group children without parent compose
    if (obj.type === "group") {
      const kids = obj.children || [];
      if (!kids.length) return { x: 0, y: 0, w: 0, h: 0 };
      return unionBounds(kids.map((c) => worldBoundsIgnoringGroup(c)));
    }
    const corners = worldCorners(obj);
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    corners.forEach((p) => {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    });
    const pad = (obj.strokeWidth || 0) / 2;
    return {
      x: minX - pad,
      y: minY - pad,
      w: maxX - minX + pad * 2,
      h: maxY - minY + pad * 2,
    };
  }

  function worldBounds(obj) {
    if (obj.type === "group") {
      const kids = obj.children || [];
      if (!kids.length) return { x: 0, y: 0, w: 0, h: 0 };
      const composed = kids.map((c) => ({
        ...c,
        transform: composeTransforms(obj.transform || defaultTransform(), c.transform || defaultTransform()),
      }));
      return unionBounds(composed.map((c) => worldBoundsIgnoringGroup(c)));
    }
    return worldBoundsIgnoringGroup(obj);
  }

  function worldCorners(obj) {
    if (obj.type === "group") {
      const b = worldBounds(obj);
      return [
        { x: b.x, y: b.y },
        { x: b.x + b.w, y: b.y },
        { x: b.x + b.w, y: b.y + b.h },
        { x: b.x, y: b.y + b.h },
      ];
    }
    const b = localBounds(obj);
    const pts = [
      { x: b.x, y: b.y },
      { x: b.x + b.w, y: b.y },
      { x: b.x + b.w, y: b.y + b.h },
      { x: b.x, y: b.y + b.h },
    ];
    return pts.map((p) => applyTransformPoint(p.x, p.y, obj.transform));
  }

  function pointInBounds(px, py, b, pad = 0) {
    return px >= b.x - pad && px <= b.x + b.w + pad && py >= b.y - pad && py <= b.y + b.h + pad;
  }

  function distToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  function hitTestObject(obj, px, py, tolerance = 6) {
    if (obj.type === "group") {
      const kids = obj.children || [];
      for (let i = kids.length - 1; i >= 0; i--) {
        const baked = {
          ...kids[i],
          transform: composeTransforms(obj.transform || defaultTransform(), kids[i].transform || defaultTransform()),
        };
        if (hitTestObject(baked, px, py, tolerance)) return true;
      }
      return false;
    }
    const local = inverseTransformPoint(px, py, obj.transform);
    if (obj.type === "rect" || obj.type === "roundRect") {
      const x0 = Math.min(obj.x, obj.x + obj.w);
      const y0 = Math.min(obj.y, obj.y + obj.h);
      const x1 = Math.max(obj.x, obj.x + obj.w);
      const y1 = Math.max(obj.y, obj.y + obj.h);
      const inside = local.x >= x0 && local.x <= x1 && local.y >= y0 && local.y <= y1;
      if (obj.fill && inside) return true;
      const nearEdge =
        Math.abs(local.x - x0) <= tolerance ||
        Math.abs(local.x - x1) <= tolerance ||
        Math.abs(local.y - y0) <= tolerance ||
        Math.abs(local.y - y1) <= tolerance;
      return inside && (obj.fill || nearEdge);
    }
    if (obj.type === "star" || obj.type === "regpoly") {
      const pts = obj.type === "star" ? starPoints(obj) : regularPolygonPoints(obj);
      if (obj.fill) {
        let inside = false;
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
          const yi = pts[i].y > local.y;
          const yj = pts[j].y > local.y;
          if (
            yi !== yj &&
            local.x < ((pts[j].x - pts[i].x) * (local.y - pts[i].y)) / (pts[j].y - pts[i].y + 1e-9) + pts[i].x
          ) {
            inside = !inside;
          }
        }
        if (inside) return true;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        if (distToSegment(local.x, local.y, a.x, a.y, b.x, b.y) <= tolerance + (obj.strokeWidth || 1) / 2) {
          return true;
        }
      }
      return false;
    }
    if (obj.type === "ellipse") {
      const cx = obj.x + obj.w / 2;
      const cy = obj.y + obj.h / 2;
      const rx = Math.abs(obj.w) / 2 || 1;
      const ry = Math.abs(obj.h) / 2 || 1;
      const nx = (local.x - cx) / rx;
      const ny = (local.y - cy) / ry;
      const d = nx * nx + ny * ny;
      if (obj.fill && d <= 1) return true;
      const edge = Math.abs(Math.sqrt(d) - 1) * Math.min(rx, ry);
      return edge <= tolerance;
    }
    if (obj.type === "line") {
      return distToSegment(local.x, local.y, obj.x1, obj.y1, obj.x2, obj.y2) <= tolerance + (obj.strokeWidth || 1) / 2;
    }
    if (obj.type === "text") {
      const b = localBounds(obj);
      return pointInBounds(local.x, local.y, b, tolerance);
    }
    if (!obj.points?.length) return false;
    const pts = obj.points;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      if (a.out || b.in) {
        const samples = 12;
        let prev = a;
        for (let s = 1; s <= samples; s++) {
          const t = s / samples;
          const p = cubicPoint(a, b, t);
          if (distToSegment(local.x, local.y, prev.x, prev.y, p.x, p.y) <= tolerance) return true;
          prev = p;
        }
      } else if (distToSegment(local.x, local.y, a.x, a.y, b.x, b.y) <= tolerance) {
        return true;
      }
    }
    if (obj.closed && pts.length > 2) {
      const a = pts[pts.length - 1];
      const b = pts[0];
      if (distToSegment(local.x, local.y, a.x, a.y, b.x, b.y) <= tolerance) return true;
    }
    return false;
  }

  function cubicPoint(a, b, t) {
    const c1x = a.x + (a.out ? a.out.x : 0);
    const c1y = a.y + (a.out ? a.out.y : 0);
    const c2x = b.x + (b.in ? b.in.x : 0);
    const c2y = b.y + (b.in ? b.in.y : 0);
    const u = 1 - t;
    return {
      x: u * u * u * a.x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * b.x,
      y: u * u * u * a.y + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * b.y,
    };
  }

  function hitTestLayer(layer, px, py, tolerance = 6) {
    if (!layer?.objects) return null;
    for (let i = layer.objects.length - 1; i >= 0; i--) {
      const obj = layer.objects[i];
      if (hitTestObject(obj, px, py, tolerance)) return obj;
    }
    return null;
  }

  function translateObject(obj, dx, dy) {
    obj.transform.tx += dx;
    obj.transform.ty += dy;
  }

  function scaleObject(obj, sx, sy, originX, originY) {
    const t = obj.transform;
    const localOrigin = inverseTransformPoint(originX, originY, t);
    t.sx *= sx;
    t.sy *= sy;
    const after = applyTransformPoint(localOrigin.x, localOrigin.y, t);
    t.tx += originX - after.x;
    t.ty += originY - after.y;
  }

  function rotateObject(obj, deltaAngle, originX, originY) {
    const t = obj.transform;
    const before = applyTransformPoint(
      inverseTransformPoint(originX, originY, t).x,
      inverseTransformPoint(originX, originY, t).y,
      t
    );
    t.rotation += deltaAngle;
    const after = applyTransformPoint(
      inverseTransformPoint(originX, originY, { ...t, rotation: t.rotation - deltaAngle }).x,
      inverseTransformPoint(originX, originY, { ...t, rotation: t.rotation - deltaAngle }).y,
      t
    );
    // Keep pivot stable
    const local = inverseTransformPoint(originX, originY, { ...t, rotation: t.rotation - deltaAngle, tx: t.tx, ty: t.ty });
    const pivoted = applyTransformPoint(local.x, local.y, t);
    t.tx += originX - pivoted.x;
    t.ty += originY - pivoted.y;
    void before;
    void after;
  }

  function offsetObjects(objects, dx, dy) {
    objects.forEach((obj) => {
      if (obj.type === "rect" || obj.type === "ellipse" || obj.type === "roundRect") {
        obj.x += dx;
        obj.y += dy;
      } else if (obj.type === "star" || obj.type === "regpoly") {
        obj.cx += dx;
        obj.cy += dy;
      } else if (obj.type === "line") {
        obj.x1 += dx;
        obj.y1 += dy;
        obj.x2 += dx;
        obj.y2 += dy;
      } else if (obj.type === "text") {
        obj.x += dx;
        obj.y += dy;
      } else if (obj.points) {
        obj.points.forEach((p) => {
          p.x += dx;
          p.y += dy;
        });
      }
    });
  }

  function scaleObjects(objects, scaleX, scaleY) {
    objects.forEach((obj) => {
      if (obj.type === "rect" || obj.type === "ellipse" || obj.type === "roundRect") {
        obj.x *= scaleX;
        obj.y *= scaleY;
        obj.w *= scaleX;
        obj.h *= scaleY;
        if (obj.type === "roundRect") obj.rx = (obj.rx || 0) * ((scaleX + scaleY) / 2);
      } else if (obj.type === "star") {
        obj.cx *= scaleX;
        obj.cy *= scaleY;
        obj.outerR *= (scaleX + scaleY) / 2;
        obj.innerR *= (scaleX + scaleY) / 2;
      } else if (obj.type === "regpoly") {
        obj.cx *= scaleX;
        obj.cy *= scaleY;
        obj.radius *= (scaleX + scaleY) / 2;
      } else if (obj.type === "line") {
        obj.x1 *= scaleX;
        obj.y1 *= scaleY;
        obj.x2 *= scaleX;
        obj.y2 *= scaleY;
      } else if (obj.type === "text") {
        obj.x *= scaleX;
        obj.y *= scaleY;
        obj.fontSize = Math.max(6, (obj.fontSize || 32) * ((scaleX + scaleY) / 2));
      } else if (obj.points) {
        obj.points.forEach((p) => {
          p.x *= scaleX;
          p.y *= scaleY;
          if (p.in) {
            p.in.x *= scaleX;
            p.in.y *= scaleY;
          }
          if (p.out) {
            p.out.x *= scaleX;
            p.out.y *= scaleY;
          }
        });
      }
      obj.transform.tx *= scaleX;
      obj.transform.ty *= scaleY;
      if (obj.type !== "text") {
        obj.strokeWidth = Math.max(0.5, (obj.strokeWidth || 1) * ((scaleX + scaleY) / 2));
      }
    });
  }

  function applyAppearance(obj, props) {
    if (!obj || !props) return;
    if (props.stroke !== undefined) obj.stroke = props.stroke;
    if (props.fill !== undefined) obj.fill = cloneFill(props.fill);
    if (props.strokeWidth !== undefined) obj.strokeWidth = props.strokeWidth;
    if (props.strokeProfile !== undefined) obj.strokeProfile = props.strokeProfile || "constant";
    if (props.opacity !== undefined) obj.opacity = props.opacity;
    if (props.strokeLinecap !== undefined) obj.strokeLinecap = props.strokeLinecap;
    if (props.strokeLinejoin !== undefined) obj.strokeLinejoin = props.strokeLinejoin;
    if (props.dash !== undefined) obj.dash = props.dash == null ? null : props.dash.slice();
    if (props.shadow !== undefined) obj.shadow = cloneShadow(props.shadow);
  }

  function unionBounds(boundsList) {
    if (!boundsList.length) return { x: 0, y: 0, w: 0, h: 0 };
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    boundsList.forEach((b) => {
      minX = Math.min(minX, b.x);
      minY = Math.min(minY, b.y);
      maxX = Math.max(maxX, b.x + b.w);
      maxY = Math.max(maxY, b.y + b.h);
    });
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }

  function alignObjects(objects, mode) {
    if (!objects?.length) return;
    const bounds = objects.map((o) => worldBounds(o));
    const group = unionBounds(bounds);
    objects.forEach((obj, i) => {
      const b = bounds[i];
      let dx = 0;
      let dy = 0;
      if (mode === "left") dx = group.x - b.x;
      else if (mode === "center") dx = group.x + group.w / 2 - (b.x + b.w / 2);
      else if (mode === "right") dx = group.x + group.w - (b.x + b.w);
      else if (mode === "top") dy = group.y - b.y;
      else if (mode === "middle") dy = group.y + group.h / 2 - (b.y + b.h / 2);
      else if (mode === "bottom") dy = group.y + group.h - (b.y + b.h);
      if (dx || dy) translateObject(obj, dx, dy);
    });
  }

  function distributeObjects(objects, axis) {
    if (!objects || objects.length < 3) return;
    const items = objects
      .map((obj) => ({ obj, b: worldBounds(obj) }))
      .sort((a, b) => (axis === "h" ? a.b.x - b.b.x : a.b.y - b.b.y));
    const first = items[0].b;
    const last = items[items.length - 1].b;
    if (axis === "h") {
      const total = last.x + last.w - first.x;
      const sumW = items.reduce((s, it) => s + it.b.w, 0);
      const gap = (total - sumW) / (items.length - 1);
      let cursor = first.x;
      items.forEach((it) => {
        const dx = cursor - it.b.x;
        if (dx) translateObject(it.obj, dx, 0);
        cursor += it.b.w + gap;
      });
    } else {
      const total = last.y + last.h - first.y;
      const sumH = items.reduce((s, it) => s + it.b.h, 0);
      const gap = (total - sumH) / (items.length - 1);
      let cursor = first.y;
      items.forEach((it) => {
        const dy = cursor - it.b.y;
        if (dy) translateObject(it.obj, 0, dy);
        cursor += it.b.h + gap;
      });
    }
  }

  function shapeToPath(obj) {
    if (!obj) return null;
    if (obj.type === "path") return obj;
    const appearance = {
      stroke: obj.stroke,
      fill: cloneFill(obj.fill),
      strokeWidth: obj.strokeWidth,
      strokeProfile: obj.strokeProfile || "constant",
      opacity: obj.opacity,
      strokeLinecap: obj.strokeLinecap,
      strokeLinejoin: obj.strokeLinejoin,
      dash: obj.dash,
      shadow: cloneShadow(obj.shadow),
    };
    let points = [];
    let closed = true;
    if (obj.type === "rect") {
      const x0 = Math.min(obj.x, obj.x + obj.w);
      const y0 = Math.min(obj.y, obj.y + obj.h);
      const x1 = Math.max(obj.x, obj.x + obj.w);
      const y1 = Math.max(obj.y, obj.y + obj.h);
      points = [
        { x: x0, y: y0, in: null, out: null },
        { x: x1, y: y0, in: null, out: null },
        { x: x1, y: y1, in: null, out: null },
        { x: x0, y: y1, in: null, out: null },
      ];
    } else if (obj.type === "roundRect") {
      points = roundRectPathPoints(obj);
    } else if (obj.type === "star") {
      points = starPoints(obj);
    } else if (obj.type === "regpoly") {
      points = regularPolygonPoints(obj);
    } else if (obj.type === "ellipse") {
      const cx = obj.x + obj.w / 2;
      const cy = obj.y + obj.h / 2;
      const rx = Math.abs(obj.w) / 2;
      const ry = Math.abs(obj.h) / 2;
      const k = 0.5522847498;
      points = [
        { x: cx + rx, y: cy, in: { x: 0, y: -ry * k }, out: { x: 0, y: ry * k } },
        { x: cx, y: cy + ry, in: { x: rx * k, y: 0 }, out: { x: -rx * k, y: 0 } },
        { x: cx - rx, y: cy, in: { x: 0, y: ry * k }, out: { x: 0, y: -ry * k } },
        { x: cx, y: cy - ry, in: { x: -rx * k, y: 0 }, out: { x: rx * k, y: 0 } },
      ];
    } else if (obj.type === "line") {
      closed = false;
      points = [
        { x: obj.x1, y: obj.y1, in: null, out: null },
        { x: obj.x2, y: obj.y2, in: null, out: null },
      ];
    } else {
      return null;
    }
    const path = createPathObject(points, { ...appearance, closed });
    path.id = obj.id;
    path.transform = { ...obj.transform };
    return path;
  }

  function ensurePathObject(layer, obj) {
    if (!layer || !obj) return null;
    if (obj.type === "path") return obj;
    if (obj.type === "text") return null;
    const path = shapeToPath(obj);
    if (!path) return null;
    const idx = layer.objects.indexOf(obj);
    if (idx >= 0) layer.objects[idx] = path;
    return path;
  }

  function hitTestNode(obj, px, py, tolerance = 7) {
    if (!obj || obj.type !== "path" || !obj.points?.length) return null;
    const local = inverseTransformPoint(px, py, obj.transform);
    for (let i = 0; i < obj.points.length; i++) {
      const p = obj.points[i];
      if (Math.hypot(local.x - p.x, local.y - p.y) <= tolerance) {
        return { kind: "anchor", index: i };
      }
      if (p.out && Math.hypot(local.x - (p.x + p.out.x), local.y - (p.y + p.out.y)) <= tolerance) {
        return { kind: "out", index: i };
      }
      if (p.in && Math.hypot(local.x - (p.x + p.in.x), local.y - (p.y + p.in.y)) <= tolerance) {
        return { kind: "in", index: i };
      }
    }
    return null;
  }

  function closestPointOnSegment(px, py, a, b, samples = 16) {
    let bestT = 0;
    let bestDist = Infinity;
    let best = { x: a.x, y: a.y };
    if (a.out || b.in) {
      for (let s = 0; s <= samples; s++) {
        const t = s / samples;
        const p = cubicPoint(a, b, t);
        const d = Math.hypot(px - p.x, py - p.y);
        if (d < bestDist) {
          bestDist = d;
          bestT = t;
          best = p;
        }
      }
    } else {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len2 = dx * dx + dy * dy || 1;
      let t = ((px - a.x) * dx + (py - a.y) * dy) / len2;
      t = Math.max(0, Math.min(1, t));
      bestT = t;
      best = { x: a.x + t * dx, y: a.y + t * dy };
      bestDist = Math.hypot(px - best.x, py - best.y);
    }
    return { point: best, t: bestT, dist: bestDist };
  }

  function hitTestSegment(obj, px, py, tolerance = 6) {
    if (!obj || obj.type !== "path" || !obj.points?.length) return null;
    const local = inverseTransformPoint(px, py, obj.transform);
    const pts = obj.points;
    const segs = [];
    for (let i = 0; i < pts.length - 1; i++) segs.push([i, i + 1]);
    if (obj.closed && pts.length > 2) segs.push([pts.length - 1, 0]);
    let best = null;
    segs.forEach(([i0, i1]) => {
      const hit = closestPointOnSegment(local.x, local.y, pts[i0], pts[i1]);
      if (hit.dist <= tolerance && (!best || hit.dist < best.dist)) {
        best = { segmentIndex: i0, nextIndex: i1, t: hit.t, point: hit.point, dist: hit.dist };
      }
    });
    return best;
  }

  function insertNodeOnSegment(obj, segmentHit) {
    if (!obj?.points || !segmentHit) return null;
    const i0 = segmentHit.segmentIndex;
    const i1 = segmentHit.nextIndex;
    const a = obj.points[i0];
    const b = obj.points[i1];
    const t = segmentHit.t;
    const p = cubicPoint(a, b, t);
    const newPt = { x: p.x, y: p.y, in: null, out: null };
    if (a.out || b.in) {
      const c1 = { x: a.x + (a.out ? a.out.x : 0), y: a.y + (a.out ? a.out.y : 0) };
      const c2 = { x: b.x + (b.in ? b.in.x : 0), y: b.y + (b.in ? b.in.y : 0) };
      // De Casteljau split
      const p01 = { x: a.x + (c1.x - a.x) * t, y: a.y + (c1.y - a.y) * t };
      const p12 = { x: c1.x + (c2.x - c1.x) * t, y: c1.y + (c2.y - c1.y) * t };
      const p23 = { x: c2.x + (b.x - c2.x) * t, y: c2.y + (b.y - c2.y) * t };
      const p012 = { x: p01.x + (p12.x - p01.x) * t, y: p01.y + (p12.y - p01.y) * t };
      const p123 = { x: p12.x + (p23.x - p12.x) * t, y: p12.y + (p23.y - p12.y) * t };
      a.out = { x: p01.x - a.x, y: p01.y - a.y };
      newPt.in = { x: p012.x - newPt.x, y: p012.y - newPt.y };
      newPt.out = { x: p123.x - newPt.x, y: p123.y - newPt.y };
      b.in = { x: p23.x - b.x, y: p23.y - b.y };
    }
    const insertAt = i0 + 1;
    obj.points.splice(insertAt, 0, newPt);
    return insertAt;
  }

  function removeNode(obj, index) {
    if (!obj?.points) return false;
    const minPts = obj.closed ? 3 : 2;
    if (obj.points.length <= minPts) return false;
    if (index < 0 || index >= obj.points.length) return false;
    obj.points.splice(index, 1);
    return true;
  }

  function samplePathRing(obj, samplesPerSeg = 12) {
    if (!obj) return null;
    let path = obj.type === "path" ? obj : shapeToPath(obj);
    if (!path?.points?.length) return null;
    if (obj.type === "text" || obj.type === "line") return null;
    if (!path.closed) return null;
    if (path.points.length < 3) return null;
    const pts = path.points;
    const ring = [];
    const pushWorld = (lp) => {
      const w = applyTransformPoint(lp.x, lp.y, path.transform);
      ring.push([w.x, w.y]);
    };
    pushWorld(pts[0]);
    const count = path.closed ? pts.length : pts.length - 1;
    for (let i = 0; i < count; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      if (a.out || b.in) {
        for (let s = 1; s <= samplesPerSeg; s++) {
          pushWorld(cubicPoint(a, b, s / samplesPerSeg));
        }
      } else {
        pushWorld(b);
      }
    }
    if (ring.length > 1) {
      const first = ring[0];
      const last = ring[ring.length - 1];
      if (Math.hypot(first[0] - last[0], first[1] - last[1]) < 0.01) ring.pop();
    }
    return ring.length >= 3 ? ring : null;
  }

  /** Chaikin corner-cutting smoothing for freehand polylines. */
  function smoothPolyline(points, iterations = 2) {
    if (!points || points.length < 3) return (points || []).map((p) => ({ x: p.x, y: p.y, in: null, out: null }));
    let pts = points.map((p) => ({ x: p.x, y: p.y }));
    const iters = Math.max(0, Math.min(5, iterations | 0));
    for (let n = 0; n < iters; n++) {
      const next = [pts[0]];
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        next.push({ x: 0.75 * a.x + 0.25 * b.x, y: 0.75 * a.y + 0.25 * b.y });
        next.push({ x: 0.25 * a.x + 0.75 * b.x, y: 0.25 * a.y + 0.75 * b.y });
      }
      next.push(pts[pts.length - 1]);
      pts = next;
    }
    return pts.map((p) => ({ x: p.x, y: p.y, in: null, out: null }));
  }

  /** Convert open polyline to cubic path via Catmull-Rom → Bezier. */
  function polylineToSmoothPath(points, closed = false) {
    if (!points || points.length < 2) return [];
    const pts = points.map((p) => ({ x: p.x, y: p.y }));
    if (pts.length === 2) {
      return [
        { x: pts[0].x, y: pts[0].y, in: null, out: null },
        { x: pts[1].x, y: pts[1].y, in: null, out: null },
      ];
    }
    const result = pts.map((p) => ({ x: p.x, y: p.y, in: null, out: null }));
    const n = pts.length;
    for (let i = 0; i < n; i++) {
      const p0 = pts[i === 0 ? (closed ? n - 1 : 0) : i - 1];
      const p1 = pts[i];
      const p2 = pts[i === n - 1 ? (closed ? 0 : n - 1) : i + 1];
      const p3 = pts[Math.min(n - 1, i + 2)];
      // Tangents
      const tx = (p2.x - p0.x) / 6;
      const ty = (p2.y - p0.y) / 6;
      result[i].out = i === n - 1 && !closed ? null : { x: tx, y: ty };
      result[i].in = i === 0 && !closed ? null : { x: -tx, y: -ty };
      void p3;
    }
    if (!closed) {
      result[0].in = null;
      result[n - 1].out = null;
    }
    return result;
  }

  function reorderVectorObjects(layer, ids, mode) {
    if (!layer?.objects?.length || !ids?.length) return false;
    const idSet = new Set(ids);
    // Preserve relative order of selected objects as they appear in the layer
    const selected = layer.objects.filter((o) => idSet.has(o.id));
    if (!selected.length) return false;

    if (mode === "front") {
      layer.objects = [...layer.objects.filter((o) => !idSet.has(o.id)), ...selected];
      layer.cacheDirty = true;
      return true;
    }
    if (mode === "back") {
      layer.objects = [...selected, ...layer.objects.filter((o) => !idSet.has(o.id))];
      layer.cacheDirty = true;
      return true;
    }

    if (mode === "forward") {
      const arr = layer.objects.slice();
      for (let i = arr.length - 2; i >= 0; i--) {
        if (idSet.has(arr[i].id) && !idSet.has(arr[i + 1].id)) {
          const tmp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = tmp;
        }
      }
      layer.objects = arr;
      layer.cacheDirty = true;
      return true;
    }
    if (mode === "backward") {
      const arr = layer.objects.slice();
      for (let i = 1; i < arr.length; i++) {
        if (idSet.has(arr[i].id) && !idSet.has(arr[i - 1].id)) {
          const tmp = arr[i];
          arr[i] = arr[i - 1];
          arr[i - 1] = tmp;
        }
      }
      layer.objects = arr;
      layer.cacheDirty = true;
      return true;
    }
    return false;
  }

  return {
    uid,
    createPathObject,
    createRectObject,
    createEllipseObject,
    createLineObject,
    createTextObject,
    fontCss,
    textLines,
    textAnchorX,
    applyTextProps,
    sampleObjectPolyline,
    buildPathLengthTable,
    pointAtLength,
    createRoundRectObject,
    createStarObject,
    createRegularPolygonObject,
    createGroupObject,
    bakeGroupToChildren,
    composeTransforms,
    cloneObject,
    cloneFill,
    defaultShadow,
    cloneShadow,
    rgbaFromHex,
    isGradientFill,
    isSolidFill,
    hasFill,
    solidFillColor,
    makeLinearFill,
    makeRadialFill,
    localBoundsForFill,
    profileWidthFactor,
    sampleLocalPolyline,
    appearanceFromOpts,
    applyAppearance,
    measureTextSize,
    cloneObjects,
    findObject,
    applyTransformPoint,
    inverseTransformPoint,
    localBounds,
    worldBounds,
    worldCorners,
    unionBounds,
    pointInBounds,
    hitTestObject,
    hitTestLayer,
    translateObject,
    scaleObject,
    rotateObject,
    offsetObjects,
    scaleObjects,
    alignObjects,
    distributeObjects,
    cubicPoint,
    shapeToPath,
    ensurePathObject,
    hitTestNode,
    hitTestSegment,
    insertNodeOnSegment,
    removeNode,
    samplePathRing,
    smoothPolyline,
    polylineToSmoothPath,
    starPoints,
    regularPolygonPoints,
    roundRectPathPoints,
    roundRectCornerRadius,
    reorderVectorObjects,
  };
})();

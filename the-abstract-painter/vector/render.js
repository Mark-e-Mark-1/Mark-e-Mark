const VectorRender = (() => {
  function invalidate(layer) {
    if (!layer || layer.type !== "vector") return;
    layer.cacheDirty = true;
  }

  function ensureCache(layer, width, height) {
    if (!layer.canvas) {
      layer.canvas = document.createElement("canvas");
    }
    if (layer.canvas.width !== width || layer.canvas.height !== height) {
      layer.canvas.width = width;
      layer.canvas.height = height;
      layer.cacheDirty = true;
    }
    if (!layer.getCtx) {
      layer.getCtx = () => layer.canvas.getContext("2d");
    }
    if (layer.cacheDirty !== false) {
      redrawCache(layer, width, height);
      layer.cacheDirty = false;
    }
    return layer.canvas;
  }

  function applyStrokeStyle(ctx, obj) {
    ctx.strokeStyle = obj.stroke;
    ctx.lineWidth = obj.strokeWidth;
    ctx.lineCap = obj.strokeLinecap || "round";
    ctx.lineJoin = obj.strokeLinejoin || "round";
    if (obj.dash && obj.dash.length) ctx.setLineDash(obj.dash);
    else ctx.setLineDash([]);
  }

  function makeFillStyle(ctx, fill, bounds) {
    if (!VectorModel.hasFill(fill)) return null;
    if (typeof fill === "string") return fill;
    const b = bounds || { x: 0, y: 0, w: 1, h: 1 };
    const stops = fill.stops || [];
    if (fill.type === "linear") {
      const g = ctx.createLinearGradient(
        b.x + (fill.x1 ?? 0) * b.w,
        b.y + (fill.y1 ?? 0) * b.h,
        b.x + (fill.x2 ?? 1) * b.w,
        b.y + (fill.y2 ?? 1) * b.h
      );
      stops.forEach((s) => g.addColorStop(Math.min(1, Math.max(0, s.offset ?? 0)), s.color || "#000"));
      return g;
    }
    if (fill.type === "radial") {
      const cx = b.x + (fill.cx ?? 0.5) * b.w;
      const cy = b.y + (fill.cy ?? 0.5) * b.h;
      const r = Math.max(1, (fill.r ?? 0.7) * Math.max(b.w, b.h) / 2 * 2);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      stops.forEach((s) => g.addColorStop(Math.min(1, Math.max(0, s.offset ?? 0)), s.color || "#000"));
      return g;
    }
    return null;
  }

  function fillCurrentPath(ctx, obj) {
    const style = makeFillStyle(ctx, obj.fill, VectorModel.localBoundsForFill(obj));
    if (!style) return;
    ctx.fillStyle = style;
    ctx.fill();
  }

  function usesStrokeProfile(obj) {
    return obj.strokeProfile && obj.strokeProfile !== "constant" && obj.stroke && obj.strokeWidth > 0;
  }

  function drawVariableWidthStroke(ctx, points, closed, obj) {
    if (!points || points.length < 2) return;
    const base = obj.strokeWidth || 2;
    const profile = obj.strokeProfile || "constant";
    // Deduplicate consecutive points
    const pts = [];
    points.forEach((p) => {
      const last = pts[pts.length - 1];
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 0.05) pts.push(p);
    });
    if (pts.length < 2) return;

    const n = pts.length;
    const count = closed ? n : n;
    const left = [];
    const right = [];
    const lens = [0];
    let total = 0;
    for (let i = 1; i < n; i++) {
      total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      lens.push(total);
    }
    if (closed && n > 2) {
      total += Math.hypot(pts[0].x - pts[n - 1].x, pts[0].y - pts[n - 1].y);
    }
    if (total < 0.001) return;

    for (let i = 0; i < count; i++) {
      const p = pts[i];
      let tx;
      let ty;
      if (closed) {
        const prev = pts[(i - 1 + n) % n];
        const next = pts[(i + 1) % n];
        tx = next.x - prev.x;
        ty = next.y - prev.y;
      } else if (i === 0) {
        tx = pts[1].x - pts[0].x;
        ty = pts[1].y - pts[0].y;
      } else if (i === n - 1) {
        tx = pts[n - 1].x - pts[n - 2].x;
        ty = pts[n - 1].y - pts[n - 2].y;
      } else {
        tx = pts[i + 1].x - pts[i - 1].x;
        ty = pts[i + 1].y - pts[i - 1].y;
      }
      const len = Math.hypot(tx, ty) || 1;
      const nx = -ty / len;
      const ny = tx / len;
      const t = closed
        ? (i / n)
        : (lens[i] / total);
      const half = (base * VectorModel.profileWidthFactor(t, profile)) / 2;
      left.push({ x: p.x + nx * half, y: p.y + ny * half });
      right.push({ x: p.x - nx * half, y: p.y - ny * half });
    }

    ctx.beginPath();
    ctx.moveTo(left[0].x, left[0].y);
    for (let i = 1; i < left.length; i++) ctx.lineTo(left[i].x, left[i].y);
    for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i].x, right[i].y);
    ctx.closePath();
    ctx.fillStyle = obj.stroke;
    ctx.fill();
  }

  function strokeObjectPath(ctx, obj, closed) {
    if (!obj.stroke || !(obj.strokeWidth > 0)) return;
    if (usesStrokeProfile(obj)) {
      const pts = VectorModel.sampleLocalPolyline(obj, 12);
      drawVariableWidthStroke(ctx, pts, !!closed, obj);
      return;
    }
    applyStrokeStyle(ctx, obj);
    ctx.stroke();
  }

  function strokeAttrsSvg(obj, defsAcc) {
    const stroke = obj.stroke || "none";
    let fill = "none";
    if (typeof obj.fill === "string") fill = obj.fill;
    else if (VectorModel.isGradientFill(obj.fill) && defsAcc) {
      const id = "grad_" + (obj.id || Math.random().toString(36).slice(2, 8));
      const b = VectorModel.localBoundsForFill(obj);
      const f = obj.fill;
      if (f.type === "linear") {
        const stops = (f.stops || [])
          .map((s) => `<stop offset="${(s.offset ?? 0) * 100}%" stop-color="${s.color || "#000"}"/>`)
          .join("");
        defsAcc.push(
          `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${b.x + (f.x1 ?? 0) * b.w}" y1="${b.y + (f.y1 ?? 0) * b.h}" x2="${b.x + (f.x2 ?? 1) * b.w}" y2="${b.y + (f.y2 ?? 1) * b.h}">${stops}</linearGradient>`
        );
      } else {
        const cx = b.x + (f.cx ?? 0.5) * b.w;
        const cy = b.y + (f.cy ?? 0.5) * b.h;
        const r = Math.max(1, (f.r ?? 0.7) * Math.max(b.w, b.h));
        const stops = (f.stops || [])
          .map((s) => `<stop offset="${(s.offset ?? 0) * 100}%" stop-color="${s.color || "#000"}"/>`)
          .join("");
        defsAcc.push(
          `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${r}" fx="${cx}" fy="${cy}">${stops}</radialGradient>`
        );
      }
      fill = `url(#${id})`;
    } else if (VectorModel.isGradientFill(obj.fill)) {
      fill = VectorModel.solidFillColor(obj.fill);
    }
    const sw = obj.strokeWidth ?? 1;
    const opacity = obj.opacity ?? 1;
    const cap = obj.strokeLinecap || "round";
    const join = obj.strokeLinejoin || "round";
    let dash = "";
    if (obj.dash && obj.dash.length) dash = ` stroke-dasharray="${obj.dash.join(" ")}"`;
    let filter = "";
    if (obj.shadow && defsAcc) {
      const sid = "sh_" + (obj.id || Math.random().toString(36).slice(2, 8));
      const sh = obj.shadow;
      const std = Math.max(0.1, (sh.blur ?? 12) / 2);
      defsAcc.push(
        `<filter id="${sid}" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="${sh.dx ?? 4}" dy="${sh.dy ?? 6}" stdDeviation="${std}" flood-color="${sh.color || "#000"}" flood-opacity="${sh.opacity ?? 0.45}"/></filter>`
      );
      filter = ` filter="url(#${sid})"`;
    }
    return { stroke, fill, sw, opacity, cap, join, dash, filter };
  }

  function buildPath(ctx, obj) {
    const pts = obj.points;
    if (!pts?.length) return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      if (a.out || b.in) {
        const c1x = a.x + (a.out ? a.out.x : 0);
        const c1y = a.y + (a.out ? a.out.y : 0);
        const c2x = b.x + (b.in ? b.in.x : 0);
        const c2y = b.y + (b.in ? b.in.y : 0);
        ctx.bezierCurveTo(c1x, c1y, c2x, c2y, b.x, b.y);
      } else {
        ctx.lineTo(b.x, b.y);
      }
    }
    if (obj.closed && pts.length > 2) {
      const a = pts[pts.length - 1];
      const b = pts[0];
      if (a.out || b.in) {
        const c1x = a.x + (a.out ? a.out.x : 0);
        const c1y = a.y + (a.out ? a.out.y : 0);
        const c2x = b.x + (b.in ? b.in.x : 0);
        const c2y = b.y + (b.in ? b.in.y : 0);
        ctx.bezierCurveTo(c1x, c1y, c2x, c2y, b.x, b.y);
      } else {
        ctx.closePath();
      }
    }
  }

  function applyDropShadow(ctx, shadow) {
    if (!shadow) {
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      return;
    }
    ctx.shadowColor = VectorModel.rgbaFromHex(shadow.color || "#000000", shadow.opacity ?? 0.45);
    ctx.shadowBlur = Math.max(0, shadow.blur ?? 12);
    ctx.shadowOffsetX = shadow.dx ?? 4;
    ctx.shadowOffsetY = shadow.dy ?? 6;
  }

  function clearDropShadow(ctx) {
    applyDropShadow(ctx, null);
  }

  function drawObject(ctx, obj) {
    ctx.save();
    ctx.globalAlpha = obj.opacity ?? 1;
    const t = obj.transform || { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 };
    ctx.translate(t.tx, t.ty);
    ctx.rotate(t.rotation || 0);
    ctx.scale(t.sx || 1, t.sy || 1);
    applyDropShadow(ctx, obj.shadow);

    if (obj.type === "rect") {
      const x = Math.min(obj.x, obj.x + obj.w);
      const y = Math.min(obj.y, obj.y + obj.h);
      const w = Math.abs(obj.w);
      const h = Math.abs(obj.h);
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      if (VectorModel.hasFill(obj.fill)) fillCurrentPath(ctx, obj);
      if (usesStrokeProfile(obj)) {
        strokeObjectPath(ctx, obj, true);
      } else if (obj.stroke && obj.strokeWidth > 0) {
        applyStrokeStyle(ctx, obj);
        ctx.strokeRect(x, y, w, h);
      }
    } else if (obj.type === "roundRect") {
      const x = Math.min(obj.x, obj.x + obj.w);
      const y = Math.min(obj.y, obj.y + obj.h);
      const w = Math.abs(obj.w);
      const h = Math.abs(obj.h);
      const r = VectorModel.roundRectCornerRadius(obj);
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
      else {
        const pts = VectorModel.roundRectPathPoints(obj);
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          if (a.out || b.in) {
            ctx.bezierCurveTo(
              a.x + (a.out ? a.out.x : 0),
              a.y + (a.out ? a.out.y : 0),
              b.x + (b.in ? b.in.x : 0),
              b.y + (b.in ? b.in.y : 0),
              b.x,
              b.y
            );
          } else ctx.lineTo(b.x, b.y);
        }
        ctx.closePath();
      }
      if (VectorModel.hasFill(obj.fill)) fillCurrentPath(ctx, obj);
      strokeObjectPath(ctx, obj, true);
    } else if (obj.type === "star" || obj.type === "regpoly") {
      const pts = obj.type === "star" ? VectorModel.starPoints(obj) : VectorModel.regularPolygonPoints(obj);
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.closePath();
      if (VectorModel.hasFill(obj.fill)) fillCurrentPath(ctx, obj);
      strokeObjectPath(ctx, obj, true);
    } else if (obj.type === "ellipse") {
      const cx = obj.x + obj.w / 2;
      const cy = obj.y + obj.h / 2;
      const rx = Math.abs(obj.w) / 2;
      const ry = Math.abs(obj.h) / 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.max(0.5, rx), Math.max(0.5, ry), 0, 0, Math.PI * 2);
      if (VectorModel.hasFill(obj.fill)) fillCurrentPath(ctx, obj);
      strokeObjectPath(ctx, obj, true);
    } else if (obj.type === "line") {
      if (usesStrokeProfile(obj)) {
        strokeObjectPath(ctx, obj, false);
      } else if (obj.stroke && obj.strokeWidth > 0) {
        ctx.beginPath();
        ctx.moveTo(obj.x1, obj.y1);
        ctx.lineTo(obj.x2, obj.y2);
        applyStrokeStyle(ctx, obj);
        ctx.stroke();
      }
    } else if (obj.type === "group") {
      // Parent ctx already has this group's transform. Draw children with their
      // local transforms only — do NOT compose again or objects double-move.
      clearDropShadow(ctx);
      const kids = obj.children || [];
      kids.forEach((child) => {
        drawObject(ctx, {
          ...child,
          shadow: child.shadow || obj.shadow || null,
        });
      });
    } else if (obj.type === "text") {
      drawTextObject(ctx, obj);
    } else if (obj.type === "path") {
      buildPath(ctx, obj);
      if (VectorModel.hasFill(obj.fill) && obj.closed) fillCurrentPath(ctx, obj);
      if (usesStrokeProfile(obj)) {
        strokeObjectPath(ctx, { ...obj, closed: obj.closed }, !!obj.closed);
      } else if (obj.stroke && obj.strokeWidth > 0) {
        applyStrokeStyle(ctx, obj);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawTextObject(ctx, obj) {
    ctx.font = VectorModel.fontCss(obj);
    ctx.textBaseline = "alphabetic";
    const fillStyle = makeFillStyle(ctx, obj.fill || "#000000", VectorModel.localBoundsForFill(obj));
    ctx.fillStyle = fillStyle || obj.fill || "#000000";
    const layer = drawTextObject._layer;

    if (obj.pathId && layer) {
      const pathObj = VectorModel.findObject(layer, obj.pathId);
      if (pathObj) {
        drawTextOnPath(ctx, obj, pathObj);
        return;
      }
    }

    const lines = VectorModel.textLines(obj);
    const lineH = (obj.fontSize || 32) * (obj.lineHeight ?? 1.25);
    lines.forEach((line, i) => {
      const w = ctx.measureText(line || " ").width;
      const x = VectorModel.textAnchorX(obj, w);
      ctx.fillText(line, x, obj.y + i * lineH);
    });
  }

  function drawTextOnPath(ctx, obj, pathObj) {
    // Path is already in world space via sample; we're inside object transform — sample in local of path then convert
    // Simpler: sample world polyline, then inverse-transform into this text object's space
    const worldPts = VectorModel.sampleObjectPolyline(pathObj, 16);
    if (worldPts.length < 2) return;
    const localPts = worldPts.map((p) => VectorModel.inverseTransformPoint(p.x, p.y, obj.transform));
    const table = VectorModel.buildPathLengthTable(localPts);
    if (table.total <= 0) return;

    const text = String(obj.text || "").replace(/\r?\n/g, " ");
    if (!text) return;
    ctx.font = VectorModel.fontCss(obj);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const fillStyle = makeFillStyle(ctx, obj.fill || "#000000", VectorModel.localBoundsForFill(obj));
    ctx.fillStyle = fillStyle || obj.fill || "#000000";

    let offset = obj.pathOffset || 0;
    const align = obj.textAlign || "left";
    let totalW = 0;
    for (let i = 0; i < text.length; i++) totalW += ctx.measureText(text[i]).width;
    if (align === "center") offset = (table.total - totalW) / 2 + (obj.pathOffset || 0);
    else if (align === "right") offset = table.total - totalW + (obj.pathOffset || 0);

    let cursor = offset;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const cw = ctx.measureText(ch).width;
      const mid = cursor + cw / 2;
      if (mid > table.total) break;
      if (mid >= 0) {
        const pt = VectorModel.pointAtLength(table, mid);
        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.angle);
        ctx.fillText(ch, 0, 0);
        ctx.restore();
      }
      cursor += cw;
    }
  }

  function redrawCache(layer, width, height) {
    const ctx = layer.canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    drawTextObject._layer = layer;
    (layer.objects || []).forEach((obj) => drawObject(ctx, obj));
    drawTextObject._layer = null;
  }

  function drawOutline(ctx, obj, color) {
    const corners = VectorModel.worldCorners(obj);
    ctx.save();
    ctx.strokeStyle = color || "#7dd3fc";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i < corners.length; i++) ctx.lineTo(corners[i].x, corners[i].y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function drawSelectionOverlay(ctx, obj, opts = {}) {
    if (!obj) return;
    const withHandles = opts.withHandles !== false;
    const corners = VectorModel.worldCorners(obj);
    const bounds = VectorModel.worldBounds(obj);
    const cx = bounds.x + bounds.w / 2;
    const cy = bounds.y + bounds.h / 2;

    ctx.save();
    ctx.strokeStyle = opts.color || "#38bdf8";
    ctx.lineWidth = 1;
    ctx.setLineDash(withHandles ? [4, 3] : [3, 3]);
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i < corners.length; i++) ctx.lineTo(corners[i].x, corners[i].y);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    if (withHandles) {
      const handleSize = 7;
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#0ea5e9";
      corners.forEach((p) => {
        ctx.fillRect(p.x - handleSize / 2, p.y - handleSize / 2, handleSize, handleSize);
        ctx.strokeRect(p.x - handleSize / 2, p.y - handleSize / 2, handleSize, handleSize);
      });

      const rotY = bounds.y - 22;
      ctx.beginPath();
      ctx.moveTo(cx, bounds.y);
      ctx.lineTo(cx, rotY);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, rotY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawMultiSelectionOverlay(ctx, objects, primaryId) {
    (objects || []).forEach((obj) => {
      if (!obj) return;
      if (obj.id === primaryId) drawSelectionOverlay(ctx, obj, { withHandles: true });
      else drawOutline(ctx, obj, "#7dd3fc");
    });
  }

  function drawNodeOverlay(ctx, obj, selectedNode) {
    if (!obj || obj.type !== "path" || !obj.points?.length) return;
    const t = obj.transform || { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 };
    ctx.save();
    obj.points.forEach((p, i) => {
      const anchor = VectorModel.applyTransformPoint(p.x, p.y, t);
      if (p.out) {
        const oh = VectorModel.applyTransformPoint(p.x + p.out.x, p.y + p.out.y, t);
        ctx.strokeStyle = "#94a3b8";
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.lineTo(oh.x, oh.y);
        ctx.stroke();
        ctx.fillStyle = selectedNode?.kind === "out" && selectedNode.index === i ? "#f59e0b" : "#fbbf24";
        ctx.fillRect(oh.x - 3, oh.y - 3, 6, 6);
      }
      if (p.in) {
        const ih = VectorModel.applyTransformPoint(p.x + p.in.x, p.y + p.in.y, t);
        ctx.strokeStyle = "#94a3b8";
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.lineTo(ih.x, ih.y);
        ctx.stroke();
        ctx.fillStyle = selectedNode?.kind === "in" && selectedNode.index === i ? "#f59e0b" : "#fbbf24";
        ctx.fillRect(ih.x - 3, ih.y - 3, 6, 6);
      }
      ctx.fillStyle = selectedNode?.kind === "anchor" && selectedNode.index === i ? "#0ea5e9" : "#38bdf8";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(anchor.x - 4, anchor.y - 4, 8, 8);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawMarquee(ctx, marquee) {
    if (!marquee) return;
    const x = Math.min(marquee.x0, marquee.x1);
    const y = Math.min(marquee.y0, marquee.y1);
    const w = Math.abs(marquee.x1 - marquee.x0);
    const h = Math.abs(marquee.y1 - marquee.y0);
    ctx.save();
    ctx.strokeStyle = "#38bdf8";
    ctx.fillStyle = "rgba(56,189,248,0.12)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    ctx.restore();
  }

  function drawSnapGuides(ctx, guides) {
    if (!guides?.length) return;
    ctx.save();
    ctx.strokeStyle = "#f472b6";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    guides.forEach((g) => {
      ctx.beginPath();
      if (g.type === "v") {
        ctx.moveTo(g.pos, g.a);
        ctx.lineTo(g.pos, g.b);
      } else {
        ctx.moveTo(g.a, g.pos);
        ctx.lineTo(g.b, g.pos);
      }
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawDraftOverlay(ctx, draft) {
    if (!draft) return;
    ctx.save();
    if (draft.type === "rect" || draft.type === "ellipse" || draft.type === "roundRect") {
      ctx.strokeStyle = draft.stroke || "#e63946";
      ctx.lineWidth = draft.strokeWidth || 2;
      if (draft.dash) ctx.setLineDash(draft.dash);
      if (draft.type === "rect") {
        if (draft.fill) {
          ctx.fillStyle = typeof draft.fill === "string" ? draft.fill : (draft.fill.stops?.[0]?.color || "#457b9d");
          ctx.globalAlpha = 0.35;
          ctx.fillRect(draft.x, draft.y, draft.w, draft.h);
          ctx.globalAlpha = 1;
        }
        ctx.strokeRect(draft.x, draft.y, draft.w, draft.h);
      } else if (draft.type === "roundRect") {
        drawObject(ctx, {
          ...draft,
          transform: draft.transform || { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 },
          opacity: 1,
        });
      } else {
        const cx = draft.x + draft.w / 2;
        const cy = draft.y + draft.h / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.max(0.5, Math.abs(draft.w) / 2), Math.max(0.5, Math.abs(draft.h) / 2), 0, 0, Math.PI * 2);
        if (draft.fill) {
          ctx.fillStyle = draft.fill;
          ctx.globalAlpha = 0.35;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.ellipse(cx, cy, Math.max(0.5, Math.abs(draft.w) / 2), Math.max(0.5, Math.abs(draft.h) / 2), 0, 0, Math.PI * 2);
        }
        ctx.stroke();
      }
    } else if (draft.type === "star" || draft.type === "regpoly") {
      drawObject(ctx, {
        ...draft,
        transform: draft.transform || { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 },
        opacity: 1,
      });
    } else if (draft.type === "line") {
      applyStrokeStyle(ctx, draft);
      ctx.beginPath();
      ctx.moveTo(draft.x1, draft.y1);
      ctx.lineTo(draft.x2, draft.y2);
      ctx.stroke();
    } else if (draft.type === "text") {
      ctx.font = `${draft.fontSize || 32}px ${draft.fontFamily || "sans-serif"}`;
      ctx.fillStyle = draft.fill || "#e63946";
      ctx.globalAlpha = 0.7;
      ctx.fillText(draft.text || "Text", draft.x, draft.y);
    } else if (draft.type === "path" && draft.points?.length) {
      drawObject(ctx, {
        ...draft,
        transform: draft.transform || { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 },
        opacity: 1,
      });
      if (draft.showAnchors) {
        ctx.fillStyle = "#38bdf8";
        draft.points.forEach((p) => {
          ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
          if (p.out) {
            ctx.strokeStyle = "#94a3b8";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.out.x, p.y + p.out.y);
            ctx.stroke();
            ctx.fillStyle = "#fbbf24";
            ctx.fillRect(p.x + p.out.x - 2, p.y + p.out.y - 2, 4, 4);
            ctx.fillStyle = "#38bdf8";
          }
          if (p.in) {
            ctx.strokeStyle = "#94a3b8";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.in.x, p.y + p.in.y);
            ctx.stroke();
            ctx.fillStyle = "#fbbf24";
            ctx.fillRect(p.x + p.in.x - 2, p.y + p.in.y - 2, 4, 4);
            ctx.fillStyle = "#38bdf8";
          }
        });
      }
    }
    ctx.restore();
  }

  function escapeXml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function objectToSvg(obj, defsAcc) {
    const defs = defsAcc || [];
    const t = obj.transform || { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 };
    const transform = `translate(${t.tx} ${t.ty}) rotate(${(t.rotation * 180) / Math.PI}) scale(${t.sx} ${t.sy})`;
    const { stroke, fill, sw, opacity, cap, join, dash, filter } = strokeAttrsSvg(obj, defs);
    // Profiled strokes export as constant width in SVG for simplicity (visual canvas uses ribbon)
    if (obj.type === "rect") {
      const x = Math.min(obj.x, obj.x + obj.w);
      const y = Math.min(obj.y, obj.y + obj.h);
      return `<rect x="${x}" y="${y}" width="${Math.abs(obj.w)}" height="${Math.abs(obj.h)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}" stroke-linejoin="${join}"${dash}${filter} opacity="${opacity}" transform="${transform}" />`;
    }
    if (obj.type === "roundRect") {
      const x = Math.min(obj.x, obj.x + obj.w);
      const y = Math.min(obj.y, obj.y + obj.h);
      const r = VectorModel.roundRectCornerRadius(obj);
      return `<rect x="${x}" y="${y}" width="${Math.abs(obj.w)}" height="${Math.abs(obj.h)}" rx="${r}" ry="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}" stroke-linejoin="${join}"${dash}${filter} opacity="${opacity}" transform="${transform}" />`;
    }
    if (obj.type === "star" || obj.type === "regpoly") {
      const pts = obj.type === "star" ? VectorModel.starPoints(obj) : VectorModel.regularPolygonPoints(obj);
      const d =
        pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
      return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}" stroke-linejoin="${join}"${dash}${filter} opacity="${opacity}" transform="${transform}" />`;
    }
    if (obj.type === "group") {
      return (obj.children || [])
        .map((child) => {
          const baked = {
            ...child,
            shadow: child.shadow || obj.shadow || null,
            transform: VectorModel.composeTransforms(
              obj.transform || { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 },
              child.transform || { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 }
            ),
          };
          return objectToSvg(baked, defs);
        })
        .filter(Boolean)
        .join("\n");
    }
    if (obj.type === "ellipse") {
      const cx = obj.x + obj.w / 2;
      const cy = obj.y + obj.h / 2;
      return `<ellipse cx="${cx}" cy="${cy}" rx="${Math.abs(obj.w) / 2}" ry="${Math.abs(obj.h) / 2}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}" stroke-linejoin="${join}"${dash}${filter} opacity="${opacity}" transform="${transform}" />`;
    }
    if (obj.type === "line") {
      return `<line x1="${obj.x1}" y1="${obj.y1}" x2="${obj.x2}" y2="${obj.y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}"${dash}${filter} opacity="${opacity}" transform="${transform}" />`;
    }
    if (obj.type === "text") {
      const font = escapeXml(obj.fontFamily || "serif");
      const weight = obj.fontWeight || "normal";
      const anchor =
        obj.textAlign === "center" ? "middle" : obj.textAlign === "right" ? "end" : "start";
      const lines = String(obj.text || "").split(/\r?\n/);
      const lineH = (obj.fontSize || 32) * (obj.lineHeight ?? 1.25);
      const textFill = fill === "none" ? VectorModel.solidFillColor(obj.fill, "#000") : fill;
      if (lines.length === 1) {
        return `<text x="${obj.x}" y="${obj.y}" fill="${textFill}" font-size="${obj.fontSize || 32}" font-family="${font}" font-weight="${weight}" text-anchor="${anchor}"${filter} opacity="${opacity}" transform="${transform}">${escapeXml(lines[0])}</text>`;
      }
      const spans = lines
        .map((line, i) => `<tspan x="${obj.x}" dy="${i === 0 ? 0 : lineH}">${escapeXml(line)}</tspan>`)
        .join("");
      return `<text x="${obj.x}" y="${obj.y}" fill="${textFill}" font-size="${obj.fontSize || 32}" font-family="${font}" font-weight="${weight}" text-anchor="${anchor}"${filter} opacity="${opacity}" transform="${transform}">${spans}</text>`;
    }
    if (obj.type === "path" && obj.points?.length) {
      const pts = obj.points;
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        if (a.out || b.in) {
          const c1x = a.x + (a.out ? a.out.x : 0);
          const c1y = a.y + (a.out ? a.out.y : 0);
          const c2x = b.x + (b.in ? b.in.x : 0);
          const c2y = b.y + (b.in ? b.in.y : 0);
          d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
        } else {
          d += ` L ${b.x} ${b.y}`;
        }
      }
      if (obj.closed) d += " Z";
      return `<path d="${d}" fill="${obj.closed && fill !== "none" ? fill : "none"}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}" stroke-linejoin="${join}"${dash}${filter} opacity="${opacity}" transform="${transform}" />`;
    }
    return "";
  }

  function objectsToSvgFragment(objects) {
    const defs = [];
    const bodies = (objects || []).map((o) => objectToSvg(o, defs)).filter(Boolean);
    const defsBlock = defs.length ? `<defs>${defs.join("")}</defs>\n` : "";
    return defsBlock + bodies.join("\n");
  }

  return {
    invalidate,
    ensureCache,
    drawObject,
    drawSelectionOverlay,
    drawMultiSelectionOverlay,
    drawNodeOverlay,
    drawMarquee,
    drawSnapGuides,
    drawDraftOverlay,
    objectToSvg,
    objectsToSvgFragment,
  };
})();

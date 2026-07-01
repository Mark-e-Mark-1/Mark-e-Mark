const SelectionManager = (() => {
  const HANDLE = 10;

  let items = [];
  let activeIndex = -1;
  let marquee = null;
  let drag = null;
  let clipboard = null;
  let regionRect = null;

  function isActive() {
    return items.length > 0 || marquee !== null;
  }

  function hasFloating() {
    return items.length > 0;
  }

  function isCopyMode(app) {
    return app.toolOptions.selectionAction === "copy";
  }

  function getTransformAabb(t) {
    const corners = getCorners(t);
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const c of corners) {
      minX = Math.min(minX, c.x);
      minY = Math.min(minY, c.y);
      maxX = Math.max(maxX, c.x);
      maxY = Math.max(maxY, c.y);
    }
    return {
      x: Math.floor(minX),
      y: Math.floor(minY),
      w: Math.ceil(maxX - minX),
      h: Math.ceil(maxY - minY),
    };
  }

  function rememberRegion(rect) {
    regionRect = { x: rect.x, y: rect.y, w: rect.w, h: rect.h };
  }

  function getCropRect(doc) {
    if (marquee) {
      const r = normalizeRect(marquee.x0, marquee.y0, marquee.x1, marquee.y1);
      if (r.w >= 2 && r.h >= 2) return r;
    }
    if (items.length) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const item of items) {
        const a = getTransformAabb(item.transform);
        minX = Math.min(minX, a.x);
        minY = Math.min(minY, a.y);
        maxX = Math.max(maxX, a.x + a.w);
        maxY = Math.max(maxY, a.y + a.h);
      }
      return {
        x: Math.floor(minX),
        y: Math.floor(minY),
        w: Math.ceil(maxX - minX),
        h: Math.ceil(maxY - minY),
      };
    }
    if (regionRect) return { ...regionRect };
    return null;
  }

  function canCrop(doc) {
    const rect = getCropRect(doc);
    if (!rect) return false;
    return !!DocumentModel.clampCropRect(rect, doc.width, doc.height);
  }

  function clearSelectionState(app) {
    items = [];
    activeIndex = -1;
    drag = null;
    marquee = null;
    regionRect = null;
    app.onSelectionChange?.();
    app.requestRender();
  }

  function crop(app, target) {
    const rect = getCropRect(app.doc);
    if (!rect) return false;

    if (hasFloating()) commit(app);

    let ok = false;
    if (target === "canvas") {
      ok = DocumentModel.cropDocumentWithHistory(app.doc, rect);
      if (ok) CanvasViewport.fitToView(app.doc.width, app.doc.height);
    } else {
      const layer = DocumentModel.getActiveLayer(app.doc);
      if (layer.locked) return false;
      ok = DocumentModel.cropLayerWithHistory(app.doc, layer.id, rect);
    }

    if (!ok) return false;
    clearSelectionState(app);
    app.onHistoryChange?.();
    app.requestRender();
    return true;
  }

  function normalizeRect(x0, y0, x1, y1) {
    const x = Math.min(x0, x1);
    const y = Math.min(y0, y1);
    const w = Math.abs(x1 - x0);
    const h = Math.abs(y1 - y0);
    return { x, y, w, h };
  }

  function getCorners(t) {
    const hw = t.w / 2;
    const hh = t.h / 2;
    const cos = Math.cos(t.rotation);
    const sin = Math.sin(t.rotation);
    const pts = [
      [-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh],
    ];
    return pts.map(([lx, ly]) => ({
      x: t.cx + lx * cos - ly * sin,
      y: t.cy + lx * sin + ly * cos,
    }));
  }

  function getRotateHandle(t) {
    const cos = Math.cos(t.rotation);
    const sin = Math.sin(t.rotation);
    const dist = t.h / 2 + 28;
    return {
      x: t.cx + (-sin * dist),
      y: t.cy + (-cos * dist),
    };
  }

  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function worldToLocal(x, y, t) {
    const lx = x - t.cx;
    const ly = y - t.cy;
    const cos = Math.cos(-t.rotation);
    const sin = Math.sin(-t.rotation);
    return { x: lx * cos - ly * sin, y: lx * sin + ly * cos };
  }

  function resizeFromAnchor(t, st, newH, newW, mode) {
    const anchorLocal = {
      n: { x: 0, y: st.h / 2 },
      s: { x: 0, y: -st.h / 2 },
      e: { x: -st.w / 2, y: 0 },
      w: { x: st.w / 2, y: 0 },
    }[mode];
    const newLocal = {
      n: { x: 0, y: -newH / 2 },
      s: { x: 0, y: newH / 2 },
      e: { x: newW / 2, y: 0 },
      w: { x: -newW / 2, y: 0 },
    }[mode];
    const cos = Math.cos(st.rotation);
    const sin = Math.sin(st.rotation);
    const ax = anchorLocal.x * cos - anchorLocal.y * sin;
    const ay = anchorLocal.x * sin + anchorLocal.y * cos;
    const nx = newLocal.x * cos - newLocal.y * sin;
    const ny = newLocal.x * sin + newLocal.y * cos;
    t.w = newW;
    t.h = newH;
    t.cx = st.cx + ax - nx;
    t.cy = st.cy + ay - ny;
    t.rotation = st.rotation;
  }

  function floodMask(layerCtx, w, h, sx, sy, tolerance) {
    const x = Math.floor(sx);
    const y = Math.floor(sy);
    if (x < 0 || y < 0 || x >= w || y >= h) return null;
    const img = layerCtx.getImageData(0, 0, w, h);
    const data = img.data;
    const idx = (y * w + x) * 4;
    const tr = data[idx];
    const tg = data[idx + 1];
    const tb = data[idx + 2];
    const ta = data[idx + 3];
    const mask = new Uint8Array(w * h);
    const stack = [[x, y]];
    while (stack.length) {
      const [cx, cy] = stack.pop();
      const pi = cy * w + cx;
      if (mask[pi]) continue;
      const i = pi * 4;
      if (
        Math.abs(data[i] - tr) + Math.abs(data[i + 1] - tg) +
        Math.abs(data[i + 2] - tb) + Math.abs(data[i + 3] - ta) > tolerance * 4
      ) continue;
      mask[pi] = 1;
      if (cx > 0) stack.push([cx - 1, cy]);
      if (cx < w - 1) stack.push([cx + 1, cy]);
      if (cy > 0) stack.push([cx, cy - 1]);
      if (cy < h - 1) stack.push([cx, cy + 1]);
    }
    return mask;
  }

  function maskBounds(mask, w, h) {
    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;
    let any = false;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!mask[y * w + x]) continue;
        any = true;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
    if (!any) return null;
    return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
  }

  function extractMasked(layerCanvas, mask, bounds, lw) {
    const content = document.createElement("canvas");
    content.width = bounds.w;
    content.height = bounds.h;
    const src = layerCanvas.getContext("2d").getImageData(bounds.x, bounds.y, bounds.w, bounds.h);
    const d = src.data;
    for (let y = 0; y < bounds.h; y++) {
      for (let x = 0; x < bounds.w; x++) {
        const mi = (bounds.y + y) * lw + (bounds.x + x);
        const i = (y * bounds.w + x) * 4;
        if (!mask[mi]) d[i + 3] = 0;
      }
    }
    content.getContext("2d").putImageData(src, 0, 0);
    return content;
  }

  function clearMasked(layerCtx, mask, bounds, lw) {
    const img = layerCtx.getImageData(bounds.x, bounds.y, bounds.w, bounds.h);
    const d = img.data;
    for (let y = 0; y < bounds.h; y++) {
      for (let x = 0; x < bounds.w; x++) {
        const mi = (bounds.y + y) * lw + (bounds.x + x);
        if (mask[mi]) {
          const i = (y * bounds.w + x) * 4;
          d[i] = d[i + 1] = d[i + 2] = d[i + 3] = 0;
        }
      }
    }
    layerCtx.putImageData(img, bounds.x, bounds.y);
  }

  function cloneCanvas(canvas) {
    const copy = document.createElement("canvas");
    copy.width = canvas.width;
    copy.height = canvas.height;
    copy.getContext("2d").drawImage(canvas, 0, 0);
    return copy;
  }

  function cloneTransform(t) {
    return { cx: t.cx, cy: t.cy, w: t.w, h: t.h, rotation: t.rotation };
  }

  function snapshotItems(sourceItems) {
    return sourceItems.map((item) => ({
      content: cloneCanvas(item.content),
      transform: cloneTransform(item.transform),
    }));
  }

  function addItem(app, layer, content, transform, cut) {
    items.push({ layerId: layer.id, content, transform, cut });
    activeIndex = items.length - 1;
    if (cut) app.onHistoryChange();
    app.onSelectionChange?.();
    app.requestRender();
  }

  function liftRect(app, rect, asCopy) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    if (layer.locked) return;
    const content = document.createElement("canvas");
    content.width = rect.w;
    content.height = rect.h;
    content.getContext("2d").drawImage(layer.canvas, rect.x, rect.y, rect.w, rect.h, 0, 0, rect.w, rect.h);
    if (!asCopy) {
      History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
      layer.getCtx().clearRect(rect.x, rect.y, rect.w, rect.h);
      History.commitStroke(app.doc);
    }
    rememberRegion(rect);
    addItem(
      app,
      layer,
      content,
      { cx: rect.x + rect.w / 2, cy: rect.y + rect.h / 2, w: rect.w, h: rect.h, rotation: 0 },
      !asCopy,
    );
  }

  function liftWand(app, x, y, tolerance, asCopy) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    if (layer.locked) return;
    const lw = layer.canvas.width;
    const lh = layer.canvas.height;
    const ctx = layer.getCtx();
    const mask = floodMask(ctx, lw, lh, x, y, tolerance);
    if (!mask) return;
    const bounds = maskBounds(mask, lw, lh);
    if (!bounds || bounds.w < 1 || bounds.h < 1) return;
    const content = extractMasked(layer.canvas, mask, bounds, lw);
    if (!asCopy) {
      History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
      clearMasked(ctx, mask, bounds, lw);
      History.commitStroke(app.doc);
    }
    rememberRegion(bounds);
    addItem(
      app,
      layer,
      content,
      {
        cx: bounds.x + bounds.w / 2,
        cy: bounds.y + bounds.h / 2,
        w: bounds.w,
        h: bounds.h,
        rotation: 0,
      },
      !asCopy,
    );
  }

  function hitTestItem(item, x, y, allowHandles) {
    const t = item.transform;
    if (allowHandles) {
      const rot = getRotateHandle(t);
      if (dist({ x, y }, rot) <= HANDLE) return "rotate";

      const corners = getCorners(t);
      const names = ["nw", "ne", "se", "sw"];
      for (let i = 0; i < corners.length; i++) {
        if (dist({ x, y }, corners[i]) <= HANDLE) return names[i];
      }
      const edges = [
        { name: "n", x: (corners[0].x + corners[1].x) / 2, y: (corners[0].y + corners[1].y) / 2 },
        { name: "e", x: (corners[1].x + corners[2].x) / 2, y: (corners[1].y + corners[2].y) / 2 },
        { name: "s", x: (corners[2].x + corners[3].x) / 2, y: (corners[2].y + corners[3].y) / 2 },
        { name: "w", x: (corners[3].x + corners[0].x) / 2, y: (corners[3].y + corners[0].y) / 2 },
      ];
      for (const edge of edges) {
        if (dist({ x, y }, edge) <= HANDLE) return edge.name;
      }
    }

    const lx = x - t.cx;
    const ly = y - t.cy;
    const cos = Math.cos(-t.rotation);
    const sin = Math.sin(-t.rotation);
    const rx = lx * cos - ly * sin;
    const ry = lx * sin + ly * cos;
    if (Math.abs(rx) <= t.w / 2 && Math.abs(ry) <= t.h / 2) return "move";
    return null;
  }

  function hitTest(x, y) {
    for (let i = items.length - 1; i >= 0; i--) {
      const mode = hitTestItem(items[i], x, y, i === activeIndex);
      if (mode) return { index: i, mode };
    }
    return null;
  }

  function drawItemContent(ctx, item) {
    const t = item.transform;
    ctx.save();
    ctx.translate(t.cx, t.cy);
    ctx.rotate(t.rotation);
    ctx.drawImage(item.content, -t.w / 2, -t.h / 2, t.w, t.h);
    ctx.restore();
  }

  function strokePolygon(ctx, pts) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
    ctx.stroke();
  }

  function drawItemHandles(ctx, item, active) {
    const t = item.transform;
    const corners = getCorners(t);
    const rot = getRotateHandle(t);

    ctx.save();
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = active ? "#fff" : "rgba(255,255,255,0.6)";
    strokePolygon(ctx, corners);
    ctx.strokeStyle = active ? "#000" : "rgba(0,0,0,0.5)";
    ctx.lineDashOffset = 5;
    strokePolygon(ctx, corners);

    if (!active) {
      ctx.restore();
      return;
    }

    ctx.setLineDash([]);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#3b82f6";
    corners.forEach((c) => {
      ctx.fillRect(c.x - HANDLE / 2, c.y - HANDLE / 2, HANDLE, HANDLE);
      ctx.strokeRect(c.x - HANDLE / 2, c.y - HANDLE / 2, HANDLE, HANDLE);
    });
    const edges = [
      { x: (corners[0].x + corners[1].x) / 2, y: (corners[0].y + corners[1].y) / 2 },
      { x: (corners[1].x + corners[2].x) / 2, y: (corners[1].y + corners[2].y) / 2 },
      { x: (corners[2].x + corners[3].x) / 2, y: (corners[2].y + corners[3].y) / 2 },
      { x: (corners[3].x + corners[0].x) / 2, y: (corners[3].y + corners[0].y) / 2 },
    ];
    edges.forEach((c) => {
      ctx.fillRect(c.x - HANDLE / 2, c.y - HANDLE / 2, HANDLE, HANDLE);
      ctx.strokeRect(c.x - HANDLE / 2, c.y - HANDLE / 2, HANDLE, HANDLE);
    });
    ctx.beginPath();
    ctx.moveTo(
      corners[0].x + (corners[1].x - corners[0].x) / 2,
      corners[0].y + (corners[1].y - corners[0].y) / 2,
    );
    ctx.lineTo(rot.x, rot.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rot.x, rot.y, HANDLE / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawOverlay(ctx) {
    if (marquee) {
      const r = normalizeRect(marquee.x0, marquee.y0, marquee.x1, marquee.y1);
      ctx.save();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = "#000";
      ctx.lineDashOffset = 4;
      ctx.strokeRect(r.x, r.y, r.w, r.h);
      ctx.fillStyle = "rgba(59, 130, 246, 0.12)";
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.restore();
    }

    items.forEach((item, i) => {
      drawItemContent(ctx, item);
      drawItemHandles(ctx, item, i === activeIndex);
    });
  }

  function startMarquee(x, y) {
    marquee = { x0: x, y0: y, x1: x, y1: y };
  }

  function updateMarquee(x, y) {
    if (!marquee) return;
    marquee.x1 = x;
    marquee.y1 = y;
  }

  function finishMarquee(app) {
    if (!marquee) return;
    const r = normalizeRect(marquee.x0, marquee.y0, marquee.x1, marquee.y1);
    marquee = null;
    if (r.w >= 2 && r.h >= 2) {
      rememberRegion(r);
      liftRect(app, r, isCopyMode(app));
    } else app.requestRender();
  }

  function beginSelection(app, x, y) {
    if (app.toolOptions.selectionMode === "wand") {
      liftWand(app, x, y, app.toolOptions.fillTolerance || 32, isCopyMode(app));
      return;
    }
    startMarquee(x, y);
    app.onSelectionChange?.();
    app.requestRender();
  }

  function commit(app) {
    if (!hasFloating()) return false;

    const targetLayer = DocumentModel.getActiveLayer(app.doc);
    if (targetLayer.locked) return false;

    History.beginStroke(app.doc, targetLayer.id, DocumentModel.snapshotLayer(targetLayer));
    const ctx = targetLayer.getCtx();
    for (const item of items) drawItemContent(ctx, item);
    History.commitStroke(app.doc);

    items = [];
    activeIndex = -1;
    drag = null;
    app.onHistoryChange();
    app.onSelectionChange?.();
    app.requestRender();
    return true;
  }

  function copyToClipboard(app) {
    if (!hasFloating()) return false;
    clipboard = snapshotItems(items);
    app.onSelectionChange?.();
    app.requestRender();
    return true;
  }

  function pasteFromClipboard(app) {
    if (!clipboard?.length) return false;

    const layer = DocumentModel.getActiveLayer(app.doc);
    if (layer.locked) return false;

    if (hasFloating()) commit(app);

    items = clipboard.map((entry) => ({
      layerId: layer.id,
      content: cloneCanvas(entry.content),
      transform: cloneTransform(entry.transform),
      cut: false,
    }));
    activeIndex = items.length - 1;
    drag = null;
    app.onSelectionChange?.();
    app.requestRender();
    return true;
  }

  function hasClipboard() {
    return !!clipboard?.length;
  }

  function cancel(app) {
    if (!hasFloating()) {
      marquee = null;
      drag = null;
      app.requestRender();
      return;
    }

    const cutCount = items.filter((item) => item.cut).length;
    for (let i = 0; i < cutCount; i++) {
      History.undo(app.doc, DocumentModel.restoreLayer);
    }
    items = [];
    activeIndex = -1;
    drag = null;
    marquee = null;
    app.onHistoryChange();
    app.onSelectionChange?.();
    app.requestRender();
  }

  function clearMarquee(app) {
    if (marquee) {
      marquee = null;
      app.requestRender();
    }
  }

  function handlePointerDown(ev, app) {
    if (hasFloating()) {
      const hit = hitTest(ev.docX, ev.docY);
      if (hit) {
        activeIndex = hit.index;
        drag = {
          itemIndex: hit.index,
          mode: hit.mode,
          startX: ev.docX,
          startY: ev.docY,
          startTransform: { ...items[hit.index].transform },
        };
        app.requestRender();
        return true;
      }

      if (ev.shiftKey) {
        if (app.activeTool === "select") beginSelection(app, ev.docX, ev.docY);
        return true;
      }

      commit(app);
      return true;
    }

    if (app.activeTool !== "select") return false;

    const layer = DocumentModel.getActiveLayer(app.doc);
    if (layer.locked) return false;

    beginSelection(app, ev.docX, ev.docY);
    return true;
  }

  function handlePointerMove(ev, app) {
    if (drag && hasFloating()) {
      const item = items[drag.itemIndex];
      if (!item) return false;
      const t = item.transform;
      const st = drag.startTransform;

      if (drag.mode === "move") {
        t.cx = st.cx + (ev.docX - drag.startX);
        t.cy = st.cy + (ev.docY - drag.startY);
      } else if (drag.mode === "rotate") {
        const a0 = Math.atan2(drag.startY - st.cy, drag.startX - st.cx);
        const a1 = Math.atan2(ev.docY - st.cy, ev.docX - st.cx);
        t.rotation = st.rotation + (a1 - a0);
      } else if (drag.mode === "n" || drag.mode === "s") {
        const loc = worldToLocal(ev.docX, ev.docY, st);
        const half = drag.mode === "s" ? Math.max(4, loc.y) : Math.max(4, -loc.y);
        resizeFromAnchor(t, st, half * 2, st.w, drag.mode);
      } else if (drag.mode === "e" || drag.mode === "w") {
        const loc = worldToLocal(ev.docX, ev.docY, st);
        const half = drag.mode === "e" ? Math.max(4, loc.x) : Math.max(4, -loc.x);
        resizeFromAnchor(t, st, st.h, half * 2, drag.mode);
      } else {
        const startDist = Math.hypot(drag.startX - st.cx, drag.startY - st.cy) || 1;
        const curDist = Math.hypot(ev.docX - st.cx, ev.docY - st.cy);
        const s = Math.max(0.03, curDist / startDist);
        t.w = Math.max(8, st.w * s);
        t.h = Math.max(8, st.h * s);
        t.cx = st.cx;
        t.cy = st.cy;
        t.rotation = st.rotation;
      }

      app.requestRender();
      return true;
    }

    if (marquee) {
      updateMarquee(ev.docX, ev.docY);
      app.requestRender();
      return true;
    }

    return false;
  }

  function handlePointerUp(ev, app) {
    if (drag) {
      drag = null;
      return true;
    }
    if (marquee) {
      finishMarquee(app);
      return true;
    }
    return false;
  }

  function getStatusHint(app) {
    if (hasFloating()) {
      const n = items.length;
      const multi = n > 1 ? ` · ${n} selected` : "";
      const layer = app?.doc ? DocumentModel.getActiveLayer(app.doc) : null;
      const target = layer ? ` → ${layer.name}` : "";
      return `Selection${multi}${target}: move/resize · switch layer to paste elsewhere · Enter apply · Ctrl+C copy · Esc cancel`;
    }
    if (hasClipboard()) return "Ctrl+V paste copied selection onto active layer";
    if (marquee) return "Drag to select area · Crop buttons trim to this region";
    if (regionRect && canCrop(app?.doc)) return "Crop Image or Crop Layer to the last selection region";
    return "";
  }

  function onToolChange() {
    marquee = null;
  }

  return {
    isActive,
    hasFloating,
    hasClipboard,
    canCrop,
    crop,
    drawOverlay,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    commit,
    cancel,
    copyToClipboard,
    pasteFromClipboard,
    clearMarquee,
    getStatusHint,
    onToolChange,
  };
})();

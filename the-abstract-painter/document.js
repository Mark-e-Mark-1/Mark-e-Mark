const DocumentModel = (() => {
  let nextLayerNum = 1;

  function uid() {
    return "layer_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
  }

  function attachGetCtx(layer) {
    layer.getCtx = () => layer.canvas.getContext("2d");
    return layer;
  }

  function createLayer(name, width, height, fill) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, width, height);
    }
    return attachGetCtx({
      id: uid(),
      type: "raster",
      name: name || "Layer " + nextLayerNum++,
      visible: true,
      opacity: 1,
      blendMode: "source-over",
      locked: false,
      canvas,
    });
  }

  function createVectorLayer(name, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return attachGetCtx({
      id: uid(),
      type: "vector",
      name: name || "Vector " + nextLayerNum++,
      visible: true,
      opacity: 1,
      blendMode: "source-over",
      locked: false,
      canvas,
      objects: [],
      cacheDirty: true,
    });
  }

  function isVectorLayer(layer) {
    return layer && layer.type === "vector";
  }

  function createDocument(opts = {}) {
    const width = opts.width || CONFIG.DEFAULT_WIDTH;
    const height = opts.height || CONFIG.DEFAULT_HEIGHT;
    const backgroundColor = opts.backgroundColor ?? CONFIG.DEFAULT_BACKGROUND;
    nextLayerNum = 1;
    const bgLayer = createLayer("Background", width, height, backgroundColor);
    return {
      title: opts.title || "Untitled",
      width,
      height,
      backgroundColor,
      layers: [bgLayer],
      activeLayerId: bgLayer.id,
      dirty: true,
    };
  }

  function getActiveLayer(doc) {
    return doc.layers.find((l) => l.id === doc.activeLayerId) || doc.layers[0];
  }

  function setActiveLayer(doc, id) {
    if (doc.layers.some((l) => l.id === id)) {
      doc.activeLayerId = id;
      doc.dirty = true;
    }
  }

  function addLayer(doc, name) {
    const layer = createLayer(name, doc.width, doc.height);
    doc.layers.push(layer);
    doc.activeLayerId = layer.id;
    doc.dirty = true;
    return layer;
  }

  function addVectorLayer(doc, name) {
    const layer = createVectorLayer(name, doc.width, doc.height);
    doc.layers.push(layer);
    doc.activeLayerId = layer.id;
    doc.dirty = true;
    return layer;
  }

  function ensureActiveVectorLayer(doc) {
    const active = getActiveLayer(doc);
    if (isVectorLayer(active) && !active.locked) return active;
    return addVectorLayer(doc, "Vector " + (doc.layers.length + 1));
  }

  function removeLayer(doc, id) {
    if (doc.layers.length <= 1) return false;
    const idx = doc.layers.findIndex((l) => l.id === id);
    if (idx < 0) return false;
    doc.layers.splice(idx, 1);
    if (doc.activeLayerId === id) {
      doc.activeLayerId = doc.layers[Math.max(0, idx - 1)].id;
    }
    doc.dirty = true;
    return true;
  }

  function duplicateLayer(doc, id) {
    const src = doc.layers.find((l) => l.id === id);
    if (!src) return null;
    let copy;
    if (isVectorLayer(src)) {
      copy = createVectorLayer(src.name + " copy", doc.width, doc.height);
      copy.objects = VectorModel.cloneObjects(src.objects);
      copy.cacheDirty = true;
      VectorRender.ensureCache(copy, doc.width, doc.height);
    } else {
      copy = createLayer(src.name + " copy", doc.width, doc.height);
      copy.getCtx().drawImage(src.canvas, 0, 0);
    }
    copy.visible = src.visible;
    copy.opacity = src.opacity;
    copy.blendMode = src.blendMode;
    const idx = doc.layers.indexOf(src);
    doc.layers.splice(idx + 1, 0, copy);
    doc.activeLayerId = copy.id;
    doc.dirty = true;
    return copy;
  }

  function mergeDown(doc, id) {
    const idx = doc.layers.findIndex((l) => l.id === id);
    if (idx <= 0) return false;
    const upper = doc.layers[idx];
    const lower = doc.layers[idx - 1];
    if (isVectorLayer(lower)) {
      // Rasterize lower first into a new raster layer content by converting in place
      const rasterized = createLayer(lower.name, doc.width, doc.height);
      VectorRender.ensureCache(lower, doc.width, doc.height);
      rasterized.getCtx().drawImage(lower.canvas, 0, 0);
      rasterized.visible = lower.visible;
      rasterized.opacity = lower.opacity;
      rasterized.blendMode = lower.blendMode;
      doc.layers[idx - 1] = rasterized;
    }
    const target = doc.layers[idx - 1];
    if (isVectorLayer(upper)) {
      VectorRender.ensureCache(upper, doc.width, doc.height);
    }
    const ctx = target.getCtx();
    ctx.save();
    ctx.globalAlpha = upper.opacity;
    ctx.globalCompositeOperation = upper.blendMode;
    ctx.drawImage(upper.canvas, 0, 0);
    ctx.restore();
    doc.layers.splice(idx, 1);
    doc.activeLayerId = target.id;
    doc.dirty = true;
    return true;
  }

  function moveLayer(doc, id, direction) {
    const idx = doc.layers.findIndex((l) => l.id === id);
    if (idx < 0) return false;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= doc.layers.length) return false;
    const [layer] = doc.layers.splice(idx, 1);
    doc.layers.splice(newIdx, 0, layer);
    doc.dirty = true;
    return true;
  }

  function clampCropRect(rect, dw, dh) {
    const x = Math.max(0, Math.min(dw - 1, Math.floor(rect.x)));
    const y = Math.max(0, Math.min(dh - 1, Math.floor(rect.y)));
    const w = Math.min(dw - x, Math.max(1, Math.ceil(rect.w)));
    const h = Math.min(dh - y, Math.max(1, Math.ceil(rect.h)));
    if (w < 2 || h < 2) return null;
    return { x, y, w, h };
  }

  function cropDocument(doc, rect) {
    const r = clampCropRect(rect, doc.width, doc.height);
    if (!r) return false;
    doc.layers.forEach((layer) => {
      if (isVectorLayer(layer)) {
        VectorModel.offsetObjects(layer.objects, -r.x, -r.y);
        layer.canvas = document.createElement("canvas");
        layer.canvas.width = r.w;
        layer.canvas.height = r.h;
        attachGetCtx(layer);
        layer.cacheDirty = true;
        VectorRender.ensureCache(layer, r.w, r.h);
      } else {
        const old = layer.canvas;
        const newCanvas = document.createElement("canvas");
        newCanvas.width = r.w;
        newCanvas.height = r.h;
        newCanvas.getContext("2d").drawImage(old, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
        layer.canvas = newCanvas;
        attachGetCtx(layer);
      }
    });
    doc.width = r.w;
    doc.height = r.h;
    doc.dirty = true;
    return true;
  }

  function cropDocumentWithHistory(doc, rect) {
    const r = clampCropRect(rect, doc.width, doc.height);
    if (!r) return false;
    History.beginCompound(doc);
    doc.layers.forEach((layer) => {
      History.addCompoundLayer(doc, layer.id, snapshotLayer(layer));
    });
    cropDocument(doc, r);
    History.commitCompound(doc);
    return true;
  }

  function cropLayer(doc, layerId, rect) {
    const layer = doc.layers.find((l) => l.id === layerId);
    if (!layer) return false;
    const r = clampCropRect(rect, doc.width, doc.height);
    if (!r) return false;
    if (isVectorLayer(layer)) {
      // Keep objects that intersect crop; shift into crop space then back relative to full canvas by clearing outside via cache redraw only of intersecting objects
      layer.objects = layer.objects.filter((obj) => {
        const b = VectorModel.worldBounds(obj);
        return !(b.x + b.w < r.x || b.y + b.h < r.y || b.x > r.x + r.w || b.y > r.y + r.h);
      });
      layer.cacheDirty = true;
      VectorRender.ensureCache(layer, doc.width, doc.height);
      // Mask: clear cache outside rect
      const ctx = layer.getCtx();
      const img = ctx.getImageData(0, 0, doc.width, doc.height);
      const d = img.data;
      for (let y = 0; y < doc.height; y++) {
        for (let x = 0; x < doc.width; x++) {
          if (x < r.x || x >= r.x + r.w || y < r.y || y >= r.y + r.h) {
            const i = (y * doc.width + x) * 4;
            d[i] = d[i + 1] = d[i + 2] = d[i + 3] = 0;
          }
        }
      }
      ctx.putImageData(img, 0, 0);
      // Note: objects remain; cache temporarily masked. Re-invalidate so next edit redraws full objects (acceptable for v1)
      layer.cacheDirty = false;
      doc.dirty = true;
      return true;
    }
    const ctx = layer.getCtx();
    const img = ctx.getImageData(0, 0, doc.width, doc.height);
    const d = img.data;
    for (let y = 0; y < doc.height; y++) {
      for (let x = 0; x < doc.width; x++) {
        if (x < r.x || x >= r.x + r.w || y < r.y || y >= r.y + r.h) {
          const i = (y * doc.width + x) * 4;
          d[i] = d[i + 1] = d[i + 2] = d[i + 3] = 0;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
    doc.dirty = true;
    return true;
  }

  function cropLayerWithHistory(doc, layerId, rect) {
    const layer = doc.layers.find((l) => l.id === layerId);
    if (!layer || layer.locked) return false;
    const r = clampCropRect(rect, doc.width, doc.height);
    if (!r) return false;
    History.beginStroke(doc, layer.id, snapshotLayer(layer));
    cropLayer(doc, layerId, r);
    History.commitStroke(doc);
    return true;
  }

  function resizeDocument(doc, newW, newH, mode) {
    const oldW = doc.width;
    const oldH = doc.height;
    doc.width = newW;
    doc.height = newH;
    doc.layers.forEach((layer) => {
      if (isVectorLayer(layer)) {
        if (mode === "scale") {
          VectorModel.scaleObjects(layer.objects, newW / oldW, newH / oldH);
        } else {
          const ox = Math.floor((newW - oldW) / 2);
          const oy = Math.floor((newH - oldH) / 2);
          VectorModel.offsetObjects(layer.objects, ox, oy);
        }
        layer.canvas = document.createElement("canvas");
        layer.canvas.width = newW;
        layer.canvas.height = newH;
        attachGetCtx(layer);
        layer.cacheDirty = true;
        VectorRender.ensureCache(layer, newW, newH);
      } else {
        const oldCanvas = layer.canvas;
        const newCanvas = document.createElement("canvas");
        newCanvas.width = newW;
        newCanvas.height = newH;
        const ctx = newCanvas.getContext("2d");
        if (mode === "scale") {
          ctx.drawImage(oldCanvas, 0, 0, oldW, oldH, 0, 0, newW, newH);
        } else {
          const ox = Math.floor((newW - oldW) / 2);
          const oy = Math.floor((newH - oldH) / 2);
          ctx.drawImage(oldCanvas, ox, oy);
        }
        layer.canvas = newCanvas;
        attachGetCtx(layer);
      }
    });
    doc.dirty = true;
  }

  function compositeToCanvas(doc, targetCtx, onlyVisible = true) {
    targetCtx.save();
    targetCtx.clearRect(0, 0, doc.width, doc.height);
    if (doc.backgroundColor) {
      targetCtx.fillStyle = doc.backgroundColor;
      targetCtx.fillRect(0, 0, doc.width, doc.height);
    }
    doc.layers.forEach((layer) => {
      if (onlyVisible && !layer.visible) return;
      if (isVectorLayer(layer)) {
        VectorRender.ensureCache(layer, doc.width, doc.height);
      }
      targetCtx.save();
      targetCtx.globalAlpha = layer.opacity;
      targetCtx.globalCompositeOperation = layer.blendMode;
      targetCtx.drawImage(layer.canvas, 0, 0);
      targetCtx.restore();
    });
    targetCtx.restore();
  }

  function snapshotLayer(layer) {
    if (isVectorLayer(layer)) {
      return { kind: "vector", objects: VectorModel.cloneObjects(layer.objects) };
    }
    const ctx = layer.getCtx();
    return {
      kind: "raster",
      imageData: ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height),
    };
  }

  function restoreLayer(layer, snapshot) {
    if (!snapshot) return;
    if (snapshot.kind === "vector" || (snapshot.objects && !snapshot.imageData)) {
      layer.type = "vector";
      layer.objects = VectorModel.cloneObjects(snapshot.objects || []);
      layer.cacheDirty = true;
      if (!layer.canvas) {
        layer.canvas = document.createElement("canvas");
      }
      attachGetCtx(layer);
      VectorRender.ensureCache(layer, layer.canvas.width, layer.canvas.height);
      return;
    }
    // Raster snapshot — ensure layer is raster
    if (isVectorLayer(layer)) {
      layer.type = "raster";
      delete layer.objects;
      delete layer.cacheDirty;
      attachGetCtx(layer);
    }
    const imageData = snapshot.kind === "raster" ? snapshot.imageData : snapshot;
    if (imageData) layer.getCtx().putImageData(imageData, 0, 0);
  }

  function addVectorObject(layer, obj) {
    if (!isVectorLayer(layer)) return;
    layer.objects.push(obj);
    layer.cacheDirty = true;
  }

  function removeVectorObject(layer, id) {
    if (!isVectorLayer(layer)) return false;
    const idx = layer.objects.findIndex((o) => o.id === id);
    if (idx < 0) return false;
    layer.objects.splice(idx, 1);
    layer.cacheDirty = true;
    return true;
  }

  /** Convert a vector layer into a raster layer in place. */
  function rasterizeVectorLayer(doc, layerId) {
    const layer = doc.layers.find((l) => l.id === layerId);
    if (!isVectorLayer(layer) || layer.locked) return false;
    VectorRender.ensureCache(layer, doc.width, doc.height);
    const canvas = document.createElement("canvas");
    canvas.width = doc.width;
    canvas.height = doc.height;
    canvas.getContext("2d").drawImage(layer.canvas, 0, 0);
    layer.type = "raster";
    delete layer.objects;
    delete layer.cacheDirty;
    layer.canvas = canvas;
    attachGetCtx(layer);
    doc.dirty = true;
    return true;
  }

  /**
   * Trace the active raster layer into a new vector layer of closed paths.
   */
  function traceRasterLayer(doc, layerId, opts = {}) {
    const src = doc.layers.find((l) => l.id === layerId);
    if (!src || isVectorLayer(src)) return null;
    const objects = VectorTrace.traceLayerToObjects(src, opts);
    if (!objects.length) return null;
    const layer = addVectorLayer(doc, (src.name || "Layer") + " Trace");
    objects.forEach((obj) => addVectorObject(layer, obj));
    VectorRender.ensureCache(layer, doc.width, doc.height);
    return layer;
  }

  return {
    createLayer,
    createVectorLayer,
    createDocument,
    isVectorLayer,
    getActiveLayer,
    setActiveLayer,
    addLayer,
    addVectorLayer,
    ensureActiveVectorLayer,
    removeLayer,
    duplicateLayer,
    mergeDown,
    moveLayer,
    clampCropRect,
    cropDocument,
    cropDocumentWithHistory,
    cropLayer,
    cropLayerWithHistory,
    resizeDocument,
    compositeToCanvas,
    snapshotLayer,
    restoreLayer,
    addVectorObject,
    removeVectorObject,
    rasterizeVectorLayer,
    traceRasterLayer,
  };
})();

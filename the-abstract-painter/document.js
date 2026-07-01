const DocumentModel = (() => {
  let nextLayerNum = 1;

  function uid() {
    return "layer_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
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
    return {
      id: uid(),
      name: name || "Layer " + nextLayerNum++,
      visible: true,
      opacity: 1,
      blendMode: "source-over",
      locked: false,
      canvas,
      getCtx() {
        return canvas.getContext("2d");
      },
    };
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
    const copy = createLayer(src.name + " copy", doc.width, doc.height);
    copy.visible = src.visible;
    copy.opacity = src.opacity;
    copy.blendMode = src.blendMode;
    copy.getCtx().drawImage(src.canvas, 0, 0);
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
    const ctx = lower.getCtx();
    ctx.save();
    ctx.globalAlpha = upper.opacity;
    ctx.globalCompositeOperation = upper.blendMode;
    ctx.drawImage(upper.canvas, 0, 0);
    ctx.restore();
    doc.layers.splice(idx, 1);
    doc.activeLayerId = lower.id;
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
      const old = layer.canvas;
      const newCanvas = document.createElement("canvas");
      newCanvas.width = r.w;
      newCanvas.height = r.h;
      newCanvas.getContext("2d").drawImage(old, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
      layer.canvas = newCanvas;
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
      targetCtx.save();
      targetCtx.globalAlpha = layer.opacity;
      targetCtx.globalCompositeOperation = layer.blendMode;
      targetCtx.drawImage(layer.canvas, 0, 0);
      targetCtx.restore();
    });
    targetCtx.restore();
  }

  function snapshotLayer(layer) {
    const ctx = layer.getCtx();
    return ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
  }

  function restoreLayer(layer, imageData) {
    layer.getCtx().putImageData(imageData, 0, 0);
  }

  return {
    createLayer,
    createDocument,
    getActiveLayer,
    setActiveLayer,
    addLayer,
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
  };
})();

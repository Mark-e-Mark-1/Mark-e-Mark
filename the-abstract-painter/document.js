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
    resizeDocument,
    compositeToCanvas,
    snapshotLayer,
    restoreLayer,
  };
})();

const IO = (() => {
  function sanitizeTitle(name) {
    const cleaned = (name || "").trim().replace(/[<>:"/\\|?*]/g, "").slice(0, 128);
    return cleaned || "Untitled";
  }

  function layerToData(layer) {
    return {
      name: layer.name,
      visible: layer.visible,
      opacity: layer.opacity,
      blendMode: layer.blendMode,
      locked: layer.locked,
      image: layer.canvas.toDataURL("image/png"),
    };
  }

  function saveProject(doc) {
    const data = {
      version: CONFIG.PROJECT_VERSION,
      title: doc.title,
      width: doc.width,
      height: doc.height,
      background: doc.backgroundColor,
      palette: Palette.toJSON(),
      layers: doc.layers.map(layerToData),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    downloadBlob(blob, sanitizeTitle(doc.title) + ".abstract");
    addRecent(doc.title);
  }

  function loadProject(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          const baseName = file.name.replace(/\.abstract$/i, "");
          const doc = {
            title: data.title || baseName || "Untitled",
            width: data.width,
            height: data.height,
            backgroundColor: data.background || CONFIG.DEFAULT_BACKGROUND,
            layers: [],
            activeLayerId: null,
            dirty: true,
          };
          const loadNext = (index) => {
            if (index >= data.layers.length) {
              if (doc.layers.length === 0) DocumentModel.addLayer(doc, "Layer 1");
              doc.activeLayerId = doc.layers[doc.layers.length - 1].id;
              if (data.palette) Palette.loadFromProject(data.palette);
              doc.dirty = true;
              addRecent(doc.title);
              resolve(doc);
              return;
            }
            const ld = data.layers[index];
            const layer = DocumentModel.createLayer(ld.name, doc.width, doc.height);
            layer.visible = ld.visible !== false;
            layer.opacity = ld.opacity ?? 1;
            layer.blendMode = ld.blendMode || "source-over";
            layer.locked = ld.locked || false;
            const img = new Image();
            img.onload = () => {
              layer.getCtx().drawImage(img, 0, 0);
              doc.layers.push(layer);
              loadNext(index + 1);
            };
            img.onerror = () => {
              doc.layers.push(layer);
              loadNext(index + 1);
            };
            img.src = ld.image;
          };
          loadNext(0);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  function exportImage(doc, format, quality) {
    const canvas = document.createElement("canvas");
    canvas.width = doc.width;
    canvas.height = doc.height;
    DocumentModel.compositeToCanvas(doc, canvas.getContext("2d"), true);
    const mime = format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
    const ext = format === "jpeg" ? "jpg" : format;
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, sanitizeTitle(doc.title) + "." + ext);
    }, mime, quality ?? 0.92);
  }

  function importImage(file, doc, asNewLayer) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          let layer;
          if (asNewLayer) {
            layer = DocumentModel.addLayer(doc, file.name.replace(/\.[^.]+$/, ""));
          } else {
            layer = DocumentModel.getActiveLayer(doc);
            layer.getCtx().clearRect(0, 0, doc.width, doc.height);
          }
          const ctx = layer.getCtx();
          const scale = Math.min(doc.width / img.width, doc.height / img.height, 1);
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (doc.width - w) / 2;
          const y = (doc.height - h) / 2;
          ctx.drawImage(img, x, y, w, h);
          doc.dirty = true;
          resolve(doc);
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function downloadBlob(blob, filename) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function addRecent(title) {
    try {
      const key = CONFIG.RECENT_FILES_KEY;
      let recent = JSON.parse(localStorage.getItem(key) || "[]");
      recent = [title, ...recent.filter((t) => t !== title)].slice(0, CONFIG.MAX_RECENT);
      localStorage.setItem(key, JSON.stringify(recent));
    } catch (_) {}
  }

  function getRecent() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.RECENT_FILES_KEY) || "[]");
    } catch (_) {
      return [];
    }
  }

  return {
    saveProject,
    loadProject,
    exportImage,
    importImage,
    getRecent,
    sanitizeTitle,
  };
})();

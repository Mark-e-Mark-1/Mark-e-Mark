const App = (() => {
  let doc = null;
  let activeTool = "brush";
  let spaceHeld = false;
  let pointerDown = false;
  let lastPressure = 1;
  let displayCanvas = null;
  let statusEl = null;

  const generatorPreview = {
    canvas: null,
    active: false,
    namePrefix: "Generated",
    mode: "raster", // "raster" | "vector"
    objects: null,
    meta: null,
  };

  const tools = {
    ...StandardTools,
    ...AbstractTools,
    ...VectorTools,
  };

  const VECTOR_TOOLS = new Set([
    "vector-pen", "vector-pencil", "vector-bezier", "vector-rect", "vector-roundrect",
    "vector-select", "vector-node", "vector-polygon", "vector-ellipse", "vector-line",
    "vector-text", "vector-star", "vector-regpoly",
  ]);

  const toolOptions = {
    brushSize: CONFIG.DEFAULT_BRUSH,
    hardness: CONFIG.DEFAULT_HARDNESS,
    opacity: CONFIG.DEFAULT_OPACITY,
    flow: CONFIG.DEFAULT_FLOW,
    fillTolerance: 32,
    selectionMode: "rect",
    selectionAction: "cut",
    shapeFill: false,
    strokeProfile: "constant",
    vectorCornerRadius: 16,
    vectorStarTips: 5,
    vectorStarInner: 0.45,
    vectorPolySides: 6,
    vectorPencilSmooth: 2,
    kaleidoscopeSegments: CONFIG.KALEIDOSCOPE_SEGMENTS.default,
    noiseAmount: 12,
    wetBlend: true,
    particleCount: 80,
    fieldScale: 0.02,
    particleSteps: 40,
    echoCount: 4,
    echoOffset: 8,
    mixStrength: 0.65,
    mixTint: 0.12,
    dripGravity: 2.5,
    dripWobble: 2,
    dripLength: 400,
    dripCount: 4,
    smudgeStrength: 0.85,
    toneUsePalette: false,
    splatterCount: 18,
    flowTrailParticles: 12,
    blobSoftness: 0.15,
    blurAmount: 8,
    circleComplexity: 5,
    sketchDetail: 12,
    sketchColorKeep: 0.3,
  };

  function init() {
    doc = DocumentModel.createDocument();
    displayCanvas = document.getElementById("paint-canvas");
    statusEl = document.getElementById("status-bar");
    const wrap = document.getElementById("canvas-wrap");

    CanvasViewport.init(displayCanvas, wrap);
    CanvasViewport.fitToView(doc.width, doc.height);
    GuidesManager.ensureDom(wrap);
    GuidesManager.setEnabled(true);
    LayersPanel.init(document.getElementById("layer-list"));
    PalettePanel.init();

    setupToolbar();
    setupMenus();
    setupNameDialog();
    setupNewDocDialog();
    setupAdjustDialog();
    setupToolOptions();
    setupVectorPanel();
    setupPointerEvents();
    setupKeyboard();

    LayersPanel.onLayerAction(handleLayerAction);
    CanvasViewport.onViewportChange(() => {
      GuidesManager.drawRulers(doc.width, doc.height);
      updateStatus();
    });
    window.addEventListener("guides-changed", () => {
      render();
      GuidesManager.drawRulers(doc.width, doc.height);
    });

    render();
    updateUI();
    renderRecentFiles();
    openNewDocumentFlow({ initial: true });
  }

  let nameDialogMode = "new";
  let nameDialogResolve = null;

  function setupNameDialog() {
    const dialog = document.getElementById("name-dialog");
    const form = document.getElementById("name-form");
    const input = document.getElementById("name-input");
    const errorEl = document.getElementById("name-error");
    const cancelBtn = document.getElementById("name-cancel");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = IO.sanitizeTitle(input.value);
      if (!input.value.trim()) {
        errorEl.classList.remove("hidden");
        input.focus();
        return;
      }
      errorEl.classList.add("hidden");
      const done = nameDialogResolve;
      nameDialogResolve = null;
      dialog.close();
      if (done) done(name);
    });

    cancelBtn.addEventListener("click", () => {
      errorEl.classList.add("hidden");
      const done = nameDialogResolve;
      nameDialogResolve = null;
      dialog.close();
      if (!done) return;
      if (nameDialogMode === "rename") return;
      done(IO.sanitizeTitle("Untitled"));
    });

    input.addEventListener("input", () => {
      if (input.value.trim()) errorEl.classList.add("hidden");
    });

    dialog.addEventListener("close", () => {
      if (!nameDialogResolve) return;
      if (nameDialogMode === "rename") {
        nameDialogResolve = null;
        return;
      }
      const pending = nameDialogResolve;
      nameDialogResolve = null;
      pending(IO.sanitizeTitle("Untitled"));
    });

    document.getElementById("doc-title").addEventListener("click", () => {
      promptDocumentName("rename", doc.title);
    });
  }

  function promptDocumentName(mode, currentName = "") {
    nameDialogMode = mode;
    const dialog = document.getElementById("name-dialog");
    const input = document.getElementById("name-input");
    const heading = document.getElementById("name-dialog-heading");
    const hint = document.getElementById("name-dialog-hint");
    const applyBtn = document.getElementById("name-apply");
    const cancelBtn = document.getElementById("name-cancel");
    const errorEl = document.getElementById("name-error");

    heading.textContent = mode === "rename" ? "Rename Project" : "Name Your Project";
    hint.textContent = mode === "rename"
      ? "Enter a new name for this project. It will be used when saving and exporting."
      : "Choose a name for your painting before you start. This is used when saving and exporting.";
    applyBtn.textContent = mode === "rename" ? "Rename" : "Create";
    cancelBtn.textContent = mode === "rename" ? "Cancel" : "Skip (Untitled)";
    input.value = mode === "new" && (!currentName || currentName === "Untitled") ? "" : currentName;
    errorEl.classList.add("hidden");

    return new Promise((resolve) => {
      nameDialogResolve = (name) => {
        if (mode === "rename") setDocumentTitle(name);
        resolve(name);
      };
      dialog.showModal();
      input.focus();
      if (input.value) input.select();
    });
  }

  function setDocumentTitle(name) {
    doc.title = IO.sanitizeTitle(name);
    updateUI();
    document.title = doc.title + " — The Abstract Painter";
  }

  function createNewDocument(opts = {}) {
    const template = opts.template || null;
    doc = DocumentModel.createDocument({
      width: template?.w || opts.width,
      height: template?.h || opts.height,
      backgroundColor: template?.bg || opts.backgroundColor,
      title: opts.title || "Untitled",
    });
    History.clear(doc);
    clearGeneratorPreview();
    GuidesManager.clearGuides();
    applyDocumentStarter(template?.starter || opts.starter || "blank");
    CanvasViewport.fitToView(doc.width, doc.height);
    render();
    updateUI();
  }

  function applyDocumentStarter(starter) {
    if (starter === "vector") {
      const layer = DocumentModel.addVectorLayer(doc, "Vectors");
      doc.activeLayerId = layer.id;
    } else if (starter === "mixed") {
      DocumentModel.addLayer(doc, "Paint");
      const v = DocumentModel.addVectorLayer(doc, "Vectors");
      doc.activeLayerId = v.id;
    }
  }

  let selectedTemplateId = "hd";
  let newDocResolve = null;

  function setupNewDocDialog() {
    const dialog = document.getElementById("new-doc-dialog");
    const form = document.getElementById("new-doc-form");
    const grid = document.getElementById("template-grid");
    const nameInput = document.getElementById("new-doc-name");
    const errorEl = document.getElementById("new-doc-error");
    const templates = CONFIG.DOCUMENT_TEMPLATES || [];

    grid.innerHTML = "";
    templates.forEach((t) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "template-card" + (t.id === selectedTemplateId ? " active" : "");
      btn.dataset.templateId = t.id;
      btn.innerHTML = `<strong>${t.label}</strong><span>${t.desc || `${t.w}×${t.h}`}</span>`;
      btn.addEventListener("click", () => {
        selectedTemplateId = t.id;
        grid.querySelectorAll(".template-card").forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
      });
      grid.appendChild(btn);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = IO.sanitizeTitle(nameInput.value) || "Untitled";
      errorEl.classList.add("hidden");
      const template = templates.find((t) => t.id === selectedTemplateId) || templates[0];
      const done = newDocResolve;
      newDocResolve = null;
      dialog.close();
      if (done) done({ name, template });
    });

    document.getElementById("new-doc-cancel").addEventListener("click", () => {
      const done = newDocResolve;
      newDocResolve = null;
      dialog.close();
      if (done) done(null);
    });

    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      document.getElementById("new-doc-cancel").click();
    });
  }

  function openNewDocumentFlow({ initial = false } = {}) {
    const dialog = document.getElementById("new-doc-dialog");
    const nameInput = document.getElementById("new-doc-name");
    const errorEl = document.getElementById("new-doc-error");
    nameInput.value = "";
    errorEl.classList.add("hidden");
    return new Promise((resolve) => {
      newDocResolve = (result) => {
        if (!result) {
          if (initial) setDocumentTitle("Untitled");
          resolve(null);
          return;
        }
        if (!initial) createNewDocument({ template: result.template, title: result.name });
        else {
          // Replace the default bootstrapping doc with the chosen template
          createNewDocument({ template: result.template, title: result.name });
        }
        setDocumentTitle(result.name);
        resolve(result);
      };
      dialog.showModal();
      nameInput.focus();
    });
  }

  function renderRecentFiles() {
    const el = document.getElementById("recent-files");
    if (!el) return;
    const recent = IO.getRecent();
    if (!recent.length) {
      el.innerHTML = "";
      return;
    }
    el.innerHTML = "<span class='recent-label'>Recent</span>";
    recent.forEach((title) => {
      const btn = document.createElement("button");
      btn.textContent = title;
      btn.title = "Recent project name (re-open via File → Open)";
      btn.addEventListener("click", () => {
        setDocumentTitle(title);
      });
      el.appendChild(btn);
    });
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }

  function setupToolbar() {
    document.querySelectorAll("[data-tool]").forEach((btn) => {
      btn.addEventListener("click", () => setTool(btn.dataset.tool));
    });
    setTool("brush");
  }

  function setTool(name) {
    if (activeTool === "select" && name !== "select") {
      SelectionManager.onToolChange();
    }
    if (SelectionManager.hasFloating() && name !== "select") {
      SelectionManager.commit(getAppContext());
    }
    if (activeTool === "vector-bezier" && name !== "vector-bezier") {
      VectorTools["vector-bezier"].finish?.(getAppContext());
    }
    if (activeTool === "vector-polygon" && name !== "vector-polygon") {
      VectorTools["vector-polygon"].finish?.(getAppContext(), false);
    }
    activeTool = name;
    document.querySelectorAll("[data-tool]").forEach((b) => {
      b.classList.toggle("active", b.dataset.tool === name);
    });
    const tool = tools[name];
    let cursor = tool ? tool.cursor : "default";
    if (SelectionManager.hasFloating()) cursor = "move";
    displayCanvas.style.cursor = cursor;
    updateToolOptionsPanel();
    updateStatus();
  }

  function setupMenus() {
    document.getElementById("btn-new").addEventListener("click", async () => {
      if (!confirm("Create new document? Unsaved changes will be lost.")) return;
      await openNewDocumentFlow({ initial: false });
    });

    document.getElementById("btn-rename").addEventListener("click", () => {
      promptDocumentName("rename", doc.title);
    });

    document.getElementById("btn-save").addEventListener("click", () => {
      IO.saveProject(doc);
      renderRecentFiles();
    });
    document.getElementById("btn-open").addEventListener("click", () => {
      document.getElementById("file-open").click();
    });
    document.getElementById("file-open").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        doc = await IO.loadProject(file);
        History.clear(doc);
        clearGeneratorPreview();
        CanvasViewport.fitToView(doc.width, doc.height);
        render();
        updateUI();
        document.title = doc.title + " — The Abstract Painter";
        renderRecentFiles();
      } catch (err) {
        alert("Failed to open project: " + err.message);
      }
      e.target.value = "";
    });

    document.getElementById("btn-export-png").addEventListener("click", () => IO.exportImage(doc, "png"));
    document.getElementById("btn-export-jpg").addEventListener("click", () => IO.exportImage(doc, "jpeg"));
    document.getElementById("btn-export-webp").addEventListener("click", () => IO.exportImage(doc, "webp"));
    document.getElementById("btn-export-svg").addEventListener("click", () => IO.exportSvg(doc));
    document.getElementById("btn-import-image").addEventListener("click", () => {
      document.getElementById("file-import-image").click();
    });
    document.getElementById("file-import-image").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const asNew = document.getElementById("import-as-layer").checked;
      await IO.importImage(file, doc, asNew);
      render();
      updateUI();
      e.target.value = "";
    });

    document.getElementById("btn-import-svg").addEventListener("click", () => {
      document.getElementById("file-import-svg").click();
    });
    document.getElementById("file-import-svg").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const { name, objects } = await VectorSvgIO.importSvgFile(file);
        if (!objects.length) {
          alert("No supported shapes found in SVG.");
        } else {
          const layer = DocumentModel.addVectorLayer(doc, name || "Imported SVG");
          objects.forEach((obj) => DocumentModel.addVectorObject(layer, obj));
          VectorRender.ensureCache(layer, doc.width, doc.height);
          doc.activeLayerId = layer.id;
          doc.dirty = true;
          VectorSelection.setSelectedIds(objects.map((o) => o.id));
          render();
          updateUI();
          syncVectorInspector();
        }
      } catch (err) {
        alert("Failed to import SVG: " + (err.message || err));
      }
      e.target.value = "";
    });

    document.getElementById("btn-undo").addEventListener("click", undo);
    document.getElementById("btn-redo").addEventListener("click", redo);
    document.getElementById("btn-fit").addEventListener("click", () => {
      CanvasViewport.fitToView(doc.width, doc.height);
    });
    document.getElementById("btn-fullscreen").addEventListener("click", toggleFullscreen);
    document.getElementById("view-rulers").addEventListener("change", (e) => {
      GuidesManager.setEnabled(e.target.checked);
      render();
      GuidesManager.drawRulers(doc.width, doc.height);
    });
    document.getElementById("btn-clear-guides").addEventListener("click", () => {
      GuidesManager.clearGuides();
      render();
    });
    document.getElementById("btn-resize").addEventListener("click", () => {
      document.getElementById("resize-w").value = doc.width;
      document.getElementById("resize-h").value = doc.height;
      document.getElementById("resize-dialog").showModal();
    });
    document.getElementById("btn-generate-abstract").addEventListener("click", generateAbstractLayer);
    document.getElementById("btn-generate-golden").addEventListener("click", generateGoldenLayer);
    document.getElementById("btn-generate-seed").addEventListener("click", generateSeedOfLifeLayer);
    document.getElementById("btn-generate-fractal").addEventListener("click", generateFractalLayer);
    document.getElementById("btn-generate-shapes").addEventListener("click", generateShapeLayer);
    document.getElementById("btn-generate-cityscape").addEventListener("click", generateCityscapeLayer);
    document.getElementById("btn-generate-abstract1").addEventListener("click", generateAbstract1Layer);
    document.getElementById("btn-generate-abstract2").addEventListener("click", generateAbstract2Layer);
    document.getElementById("btn-generate-abstract3").addEventListener("click", generateAbstract3Layer);
    document.getElementById("btn-generate-abstract4").addEventListener("click", generateAbstract4Layer);
    document.getElementById("btn-generate-abstract5").addEventListener("click", generateAbstract5Layer);
    document.getElementById("btn-generate-abstract6").addEventListener("click", generateAbstract6Layer);
    document.getElementById("btn-generate-vector-abstract")?.addEventListener("click", generateVectorAbstract);
    document.getElementById("btn-generate-vector-geometric")?.addEventListener("click", generateVectorGeometric);
    document.getElementById("btn-generate-vector-graffiti")?.addEventListener("click", generateVectorGraffiti);
    document.getElementById("btn-generate-vector-wildstyle")?.addEventListener("click", generateVectorWildstyle);
    document.getElementById("btn-generate-toolbar").addEventListener("click", generateAbstractLayer);
    document.getElementById("btn-generate-golden-toolbar").addEventListener("click", generateGoldenLayer);
    document.getElementById("btn-generate-seed-toolbar").addEventListener("click", generateSeedOfLifeLayer);
    document.getElementById("btn-generate-fractal-toolbar").addEventListener("click", generateFractalLayer);
    document.getElementById("btn-generate-shapes-toolbar").addEventListener("click", generateShapeLayer);
    document.getElementById("btn-generate-cityscape-toolbar").addEventListener("click", generateCityscapeLayer);
    document.getElementById("btn-generate-abstract1-toolbar").addEventListener("click", generateAbstract1Layer);
    document.getElementById("btn-generate-abstract2-toolbar").addEventListener("click", generateAbstract2Layer);
    document.getElementById("btn-generate-abstract3-toolbar").addEventListener("click", generateAbstract3Layer);
    document.getElementById("btn-generate-abstract4-toolbar").addEventListener("click", generateAbstract4Layer);
    document.getElementById("btn-generate-abstract5-toolbar").addEventListener("click", generateAbstract5Layer);
    document.getElementById("btn-generate-abstract6-toolbar").addEventListener("click", generateAbstract6Layer);
    document.getElementById("btn-generate-vector-toolbar")?.addEventListener("click", generateVectorAbstract);
    document.getElementById("btn-generate-vector-geometric-toolbar")?.addEventListener("click", generateVectorGeometric);
    document.getElementById("btn-generate-vector-graffiti-toolbar")?.addEventListener("click", generateVectorGraffiti);
    document.getElementById("btn-generate-vector-wildstyle-toolbar")?.addEventListener("click", generateVectorWildstyle);
    document.getElementById("btn-create-generator-layer").addEventListener("click", commitGeneratorPreview);
    document.getElementById("btn-drawing-filter").addEventListener("click", applyDrawingFilter);
    document.getElementById("btn-adjust-levels").addEventListener("click", () => openAdjustDialog("levels"));
    document.getElementById("btn-adjust-curves").addEventListener("click", () => openAdjustDialog("curves"));
    document.getElementById("btn-adjust-hue").addEventListener("click", () => openAdjustDialog("hue"));
    document.getElementById("resize-apply").addEventListener("click", applyResize);
  }

  let adjustMode = "levels";
  let adjustSession = null; // { layerId, originalCanvas }
  let adjustPreviewRaf = 0;

  function copyLayerCanvas(layer) {
    const c = document.createElement("canvas");
    c.width = layer.canvas.width;
    c.height = layer.canvas.height;
    c.getContext("2d").drawImage(layer.canvas, 0, 0);
    return c;
  }

  function restoreAdjustOriginal(layer, originalCanvas) {
    const src = originalCanvas || adjustSession?.originalCanvas;
    if (!src || !layer) return;
    const ctx = layer.getCtx();
    ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    ctx.drawImage(src, 0, 0);
  }

  function getAdjustOptionsFromDialog() {
    if (adjustMode === "levels") {
      return {
        kind: "levels",
        black: +document.getElementById("adj-black").value,
        white: +document.getElementById("adj-white").value,
        gamma: +document.getElementById("adj-gamma").value / 100,
      };
    }
    if (adjustMode === "curves") {
      const preset = document.getElementById("adj-curve-preset").value;
      if (preset === "s-curve" || preset === "invert") return { kind: "curves", preset };
      return {
        kind: "curves",
        mid: +document.getElementById("adj-curve-mid").value,
        midOut: +document.getElementById("adj-curve-midout").value,
      };
    }
    return {
      kind: "hue",
      hue: +document.getElementById("adj-hue").value,
      saturation: +document.getElementById("adj-sat").value,
      lightness: +document.getElementById("adj-light").value,
    };
  }

  function runAdjustmentOnLayer(layer, opts) {
    if (opts.kind === "levels") {
      LayerFilters.applyLevels(layer, opts);
    } else if (opts.kind === "curves") {
      LayerFilters.applyCurves(layer, opts);
    } else {
      LayerFilters.applyHueSat(layer, opts);
    }
  }

  function isIdentityAdjustment(opts) {
    if (opts.kind === "levels") {
      return opts.black === 0 && opts.white === 255 && Math.abs(opts.gamma - 1) < 0.001;
    }
    if (opts.kind === "curves") {
      if (opts.preset === "s-curve" || opts.preset === "invert") return false;
      return opts.mid === 128 && opts.midOut === 128;
    }
    return opts.hue === 0 && opts.saturation === 0 && opts.lightness === 0;
  }

  function previewAdjustmentNow() {
    if (!adjustSession) return;
    const layer = doc.layers.find((l) => l.id === adjustSession.layerId);
    if (!layer) return;
    restoreAdjustOriginal(layer, adjustSession.originalCanvas);
    const opts = getAdjustOptionsFromDialog();
    if (!isIdentityAdjustment(opts)) runAdjustmentOnLayer(layer, opts);
    render();
  }

  function scheduleAdjustPreview() {
    if (!adjustSession) return;
    if (adjustPreviewRaf) cancelAnimationFrame(adjustPreviewRaf);
    adjustPreviewRaf = requestAnimationFrame(() => {
      adjustPreviewRaf = 0;
      previewAdjustmentNow();
    });
  }

  function resetAdjustSliders() {
    document.getElementById("adj-black").value = 0;
    document.getElementById("adj-white").value = 255;
    document.getElementById("adj-gamma").value = 100;
    document.getElementById("adj-curve-preset").value = "mid";
    document.getElementById("adj-curve-mid").value = 128;
    document.getElementById("adj-curve-midout").value = 128;
    document.getElementById("adj-hue").value = 0;
    document.getElementById("adj-sat").value = 0;
    document.getElementById("adj-light").value = 0;
    document.getElementById("adj-black-val").textContent = "0";
    document.getElementById("adj-white-val").textContent = "255";
    document.getElementById("adj-gamma-val").textContent = "1.00";
    document.getElementById("adj-curve-mid-val").textContent = "128";
    document.getElementById("adj-curve-midout-val").textContent = "128";
    document.getElementById("adj-hue-val").textContent = "0";
    document.getElementById("adj-sat-val").textContent = "0";
    document.getElementById("adj-light-val").textContent = "0";
    const mid = true;
    document.getElementById("adj-curve-mid-wrap").classList.toggle("hidden", !mid);
    document.getElementById("adj-curve-midout-wrap").classList.toggle("hidden", !mid);
  }

  function endAdjustSession(commit) {
    const dialog = document.getElementById("adjust-dialog");
    if (adjustPreviewRaf) {
      cancelAnimationFrame(adjustPreviewRaf);
      adjustPreviewRaf = 0;
    }
    const session = adjustSession;
    adjustSession = null;
    if (!session) {
      if (dialog.open) dialog.close();
      return;
    }
    const layer = doc.layers.find((l) => l.id === session.layerId) || DocumentModel.getActiveLayer(doc);
    if (!layer) {
      if (dialog.open) dialog.close();
      return;
    }
    if (commit) {
      const opts = getAdjustOptionsFromDialog();
      restoreAdjustOriginal(layer, session.originalCanvas);
      if (!isIdentityAdjustment(opts)) {
        History.beginStroke(doc, layer.id, DocumentModel.snapshotLayer(layer));
        runAdjustmentOnLayer(layer, opts);
        History.commitStroke(doc);
        doc.dirty = true;
      }
    } else {
      restoreAdjustOriginal(layer, session.originalCanvas);
    }
    if (dialog.open) dialog.close();
    render();
    updateUI();
  }

  function setupAdjustDialog() {
    const dialog = document.getElementById("adjust-dialog");
    const form = document.getElementById("adjust-form");
    const bindRange = (id, valId, fmt) => {
      const el = document.getElementById(id);
      const val = document.getElementById(valId);
      if (!el || !val) return;
      const sync = () => {
        val.textContent = fmt ? fmt(+el.value) : el.value;
        scheduleAdjustPreview();
      };
      el.addEventListener("input", sync);
      sync();
    };
    bindRange("adj-black", "adj-black-val");
    bindRange("adj-white", "adj-white-val");
    bindRange("adj-gamma", "adj-gamma-val", (v) => (v / 100).toFixed(2));
    bindRange("adj-curve-mid", "adj-curve-mid-val");
    bindRange("adj-curve-midout", "adj-curve-midout-val");
    bindRange("adj-hue", "adj-hue-val");
    bindRange("adj-sat", "adj-sat-val");
    bindRange("adj-light", "adj-light-val");

    const preset = document.getElementById("adj-curve-preset");
    const syncCurvePreset = () => {
      const mid = preset.value === "mid";
      document.getElementById("adj-curve-mid-wrap").classList.toggle("hidden", !mid);
      document.getElementById("adj-curve-midout-wrap").classList.toggle("hidden", !mid);
      scheduleAdjustPreview();
    };
    preset.addEventListener("change", syncCurvePreset);
    syncCurvePreset();

    document.getElementById("adjust-reset").addEventListener("click", () => {
      resetAdjustSliders();
      scheduleAdjustPreview();
    });
    document.getElementById("adjust-cancel").addEventListener("click", () => {
      endAdjustSession(false);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      endAdjustSession(true);
    });
    dialog.addEventListener("cancel", (e) => {
      // Esc
      e.preventDefault();
      endAdjustSession(false);
    });
    dialog.addEventListener("close", () => {
      // If closed without going through endAdjustSession (e.g. form method=dialog), restore
      if (adjustSession) endAdjustSession(false);
    });
  }

  function openAdjustDialog(mode) {
    const layer = DocumentModel.getActiveLayer(doc);
    if (layer.locked) {
      window.alert("Unlock the active layer before applying adjustments.");
      return;
    }
    if (DocumentModel.isVectorLayer(layer)) {
      window.alert("Adjustments work on raster layers. Select a raster layer, or merge/rasterize first.");
      return;
    }
    // Finish any prior session without committing
    if (adjustSession) endAdjustSession(false);

    adjustMode = mode;
    resetAdjustSliders();
    adjustSession = {
      layerId: layer.id,
      originalCanvas: copyLayerCanvas(layer),
    };

    const dialog = document.getElementById("adjust-dialog");
    const heading = document.getElementById("adjust-dialog-heading");
    document.getElementById("adjust-levels-fields").classList.toggle("hidden", mode !== "levels");
    document.getElementById("adjust-curves-fields").classList.toggle("hidden", mode !== "curves");
    document.getElementById("adjust-hue-fields").classList.toggle("hidden", mode !== "hue");
    heading.textContent =
      mode === "levels" ? "Levels" : mode === "curves" ? "Curves" : "Hue / Saturation";
    // Non-modal so the canvas stays visible and unobscured by a dim backdrop
    dialog.show();
    scheduleAdjustPreview();
  }

  function applyAdjustmentFromDialog() {
    endAdjustSession(true);
  }

  function applyDrawingFilter() {
    const layer = DocumentModel.getActiveLayer(doc);
    if (layer.locked) {
      window.alert("Unlock the active layer before applying the drawing filter.");
      return;
    }
    applyLayerEdit((target) => {
      LayerFilters.applyDrawing(target, {
        detail: toolOptions.sketchDetail,
        colorKeep: toolOptions.sketchColorKeep,
      });
    });
  }

  function ensureGeneratorPreview() {
    if (!generatorPreview.canvas) {
      generatorPreview.canvas = document.createElement("canvas");
    }
    if (generatorPreview.canvas.width !== doc.width || generatorPreview.canvas.height !== doc.height) {
      generatorPreview.canvas.width = doc.width;
      generatorPreview.canvas.height = doc.height;
      generatorPreview.active = false;
      generatorPreview.mode = "raster";
      generatorPreview.objects = null;
      generatorPreview.meta = null;
      updateGeneratorPreviewUI();
    }
    return generatorPreview.canvas.getContext("2d");
  }

  function clearGeneratorPreview() {
    if (generatorPreview.canvas) {
      generatorPreview.canvas.getContext("2d").clearRect(0, 0, generatorPreview.canvas.width, generatorPreview.canvas.height);
    }
    generatorPreview.active = false;
    generatorPreview.mode = "raster";
    generatorPreview.objects = null;
    generatorPreview.meta = null;
    updateGeneratorPreviewUI();
  }

  function updateGeneratorPreviewUI() {
    const btn = document.getElementById("btn-create-generator-layer");
    if (btn) btn.disabled = !generatorPreview.active;
  }

  function previewGenerate(namePrefix, generateFn) {
    const ctx = ensureGeneratorPreview();
    ctx.clearRect(0, 0, doc.width, doc.height);
    generateFn(ctx);
    generatorPreview.active = true;
    generatorPreview.mode = "raster";
    generatorPreview.objects = null;
    generatorPreview.meta = null;
    generatorPreview.namePrefix = namePrefix;
    if (statusEl) statusEl.textContent = `Preview: ${namePrefix} — press Create Layer to add`;
    render();
    updateGeneratorPreviewUI();
  }

  function previewVectorGenerate(namePrefix, result) {
    const { objects, styleName, layout, quadrantCount } = result || {};
    if (!objects || !objects.length) {
      window.alert("No vector shapes were generated. Try again.");
      return;
    }
    const ctx = ensureGeneratorPreview();
    ctx.clearRect(0, 0, doc.width, doc.height);
    objects.forEach((obj) => VectorRender.drawObject(ctx, obj));
    generatorPreview.active = true;
    generatorPreview.mode = "vector";
    generatorPreview.objects = objects;
    generatorPreview.meta = { styleName, layout, quadrantCount };
    generatorPreview.namePrefix = namePrefix;
    const extra =
      styleName === "geometric" && quadrantCount
        ? ` — ${quadrantCount} panels (${layout || "grid"})`
        : "";
    if (statusEl) {
      statusEl.textContent = `Preview: ${objects.length} vector shapes (${styleName || "abstract"})${extra} — press Create Layer to add`;
    }
    render();
    updateGeneratorPreviewUI();
  }

  function commitGeneratorPreview() {
    if (!generatorPreview.active) return;

    if (generatorPreview.mode === "vector") {
      const objects = generatorPreview.objects;
      if (!objects || !objects.length) return;
      const meta = generatorPreview.meta || {};
      const styleName = meta.styleName || "Abstract";
      const layerNum = doc.layers.filter((l) => DocumentModel.isVectorLayer(l)).length + 1;
      const label = styleName.charAt(0).toUpperCase() + styleName.slice(1);
      const layer = DocumentModel.addVectorLayer(
        doc,
        generatorPreview.namePrefix
          ? `${generatorPreview.namePrefix} ${layerNum}`
          : `Vector ${label} ${layerNum}`
      );
      History.beginStroke(doc, layer.id, DocumentModel.snapshotLayer(layer));
      objects.forEach((obj) => DocumentModel.addVectorObject(layer, obj));
      VectorRender.ensureCache(layer, doc.width, doc.height);
      History.commitStroke(doc);
      doc.activeLayerId = layer.id;
      doc.dirty = true;
      VectorSelection.setSelectedIds(objects.map((o) => o.id));
      const extra =
        styleName === "geometric" && meta.quadrantCount
          ? ` — ${meta.quadrantCount} panels (${meta.layout || "grid"})`
          : "";
      if (statusEl) {
        statusEl.textContent = `Created ${objects.length} vector shapes (${styleName})${extra} on ${layer.name}`;
      }
      clearGeneratorPreview();
      render();
      updateUI();
      syncVectorInspector();
      return;
    }

    if (!generatorPreview.canvas) return;
    const layerNum = doc.layers.length + 1;
    const layer = DocumentModel.addLayer(doc, generatorPreview.namePrefix + " " + layerNum);
    History.beginStroke(doc, layer.id, DocumentModel.snapshotLayer(layer));
    layer.getCtx().drawImage(generatorPreview.canvas, 0, 0);
    History.commitStroke(doc);
    clearGeneratorPreview();
    doc.dirty = true;
    render();
    updateUI();
  }

  function generateAbstractLayer() {
    previewGenerate("Abstract", (ctx) => {
      AbstractGenerator.generate(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateGoldenLayer() {
    previewGenerate("Golden", (ctx) => {
      AbstractGenerator.generateGolden(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateSeedOfLifeLayer() {
    previewGenerate("Seed", (ctx) => {
      AbstractGenerator.generateSeedOfLife(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateFractalLayer() {
    previewGenerate("Fractal", (ctx) => {
      AbstractGenerator.generateFractal(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateShapeLayer() {
    previewGenerate("Shapes", (ctx) => {
      AbstractGenerator.generateShapes(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateCityscapeLayer() {
    previewGenerate("Cityscape", (ctx) => {
      AbstractGenerator.generateCityscape(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateAbstract1Layer() {
    previewGenerate("Abstract 1", (ctx) => {
      AbstractGenerator.generateAbstract1(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateAbstract2Layer() {
    previewGenerate("Abstract 2", (ctx) => {
      AbstractGenerator.generateAbstract2(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateAbstract3Layer() {
    previewGenerate("Abstract 3", (ctx) => {
      AbstractGenerator.generateAbstract3(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateAbstract4Layer() {
    previewGenerate("Abstract 4", (ctx) => {
      AbstractGenerator.generateAbstract4(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateAbstract5Layer() {
    previewGenerate("Abstract 5", (ctx) => {
      AbstractGenerator.generateAbstract5(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateAbstract6Layer() {
    previewGenerate("Abstract 6", (ctx) => {
      AbstractGenerator.generateAbstract6(ctx, doc.width, doc.height, Palette.getState());
    });
  }

  function generateVectorAbstract() {
    previewVectorGenerate(
      "Vector Abstract",
      VectorGenerator.generate(doc.width, doc.height, Palette.getState())
    );
  }

  function generateVectorGeometric() {
    previewVectorGenerate(
      "Vector Geometric",
      VectorGenerator.generateGeometric(doc.width, doc.height, Palette.getState())
    );
  }

  function generateVectorGraffiti() {
    previewVectorGenerate(
      "Vector Graffiti",
      VectorGenerator.generateGraffiti(doc.width, doc.height, Palette.getState())
    );
  }

  function generateVectorWildstyle() {
    previewVectorGenerate(
      "Vector Wildstyle",
      VectorGenerator.generateWildstyle(doc.width, doc.height, Palette.getState())
    );
  }

  function applyResize(e) {
    e.preventDefault();
    const w = parseInt(document.getElementById("resize-w").value, 10);
    const h = parseInt(document.getElementById("resize-h").value, 10);
    const mode = document.getElementById("resize-mode").value;
    if (w > 0 && h > 0) {
      DocumentModel.resizeDocument(doc, w, h, mode);
      clearGeneratorPreview();
      CanvasViewport.fitToView(doc.width, doc.height);
      render();
      updateUI();
    }
    document.getElementById("resize-dialog").close();
  }

  let syncSelTransformFields = () => {};

  function setupToolOptions() {
    const sizeSlider = document.getElementById("opt-brush-size");
    const sizeVal = document.getElementById("opt-brush-size-val");
    sizeSlider.value = toolOptions.brushSize;
    sizeVal.textContent = toolOptions.brushSize;
    sizeSlider.addEventListener("input", () => {
      toolOptions.brushSize = +sizeSlider.value;
      sizeVal.textContent = sizeSlider.value;
      updateStatus();
    });

    document.getElementById("opt-hardness").addEventListener("input", (e) => {
      toolOptions.hardness = +e.target.value / 100;
    });
    document.getElementById("opt-opacity").addEventListener("input", (e) => {
      toolOptions.opacity = +e.target.value / 100;
    });
    document.getElementById("opt-fill-tolerance").addEventListener("input", (e) => {
      toolOptions.fillTolerance = +e.target.value;
      document.getElementById("opt-fill-tolerance-val").textContent = e.target.value;
    });
    document.getElementById("opt-kaleidoscope").addEventListener("input", (e) => {
      toolOptions.kaleidoscopeSegments = +e.target.value;
      document.getElementById("opt-kaleidoscope-val").textContent = e.target.value;
    });
    document.getElementById("opt-noise").addEventListener("input", (e) => {
      toolOptions.noiseAmount = +e.target.value;
    });
    document.getElementById("opt-shape-fill").addEventListener("change", (e) => {
      toolOptions.shapeFill = e.target.checked;
    });
    document.getElementById("opt-vec-corner").addEventListener("input", (e) => {
      toolOptions.vectorCornerRadius = +e.target.value;
      document.getElementById("opt-vec-corner-val").textContent = e.target.value;
    });
    document.getElementById("opt-vec-star-tips").addEventListener("input", (e) => {
      toolOptions.vectorStarTips = +e.target.value;
      document.getElementById("opt-vec-star-tips-val").textContent = e.target.value;
    });
    document.getElementById("opt-vec-poly-sides").addEventListener("input", (e) => {
      toolOptions.vectorPolySides = +e.target.value;
      document.getElementById("opt-vec-poly-sides-val").textContent = e.target.value;
    });
    document.getElementById("opt-vec-pencil-smooth").addEventListener("input", (e) => {
      toolOptions.vectorPencilSmooth = +e.target.value;
      document.getElementById("opt-vec-pencil-smooth-val").textContent = e.target.value;
    });
    document.getElementById("opt-wet-blend").addEventListener("change", (e) => {
      toolOptions.wetBlend = e.target.checked;
    });
    document.getElementById("opt-mix-strength").addEventListener("input", (e) => {
      toolOptions.mixStrength = +e.target.value / 100;
      document.getElementById("opt-mix-strength-val").textContent = e.target.value;
    });
    document.getElementById("opt-drip-gravity").addEventListener("input", (e) => {
      toolOptions.dripGravity = +e.target.value;
    });
    document.getElementById("opt-drip-length").addEventListener("input", (e) => {
      toolOptions.dripLength = +e.target.value;
    });
    document.getElementById("opt-smudge-strength").addEventListener("input", (e) => {
      toolOptions.smudgeStrength = +e.target.value / 100;
      document.getElementById("opt-smudge-strength-val").textContent = e.target.value;
    });
    document.getElementById("opt-tone-palette").addEventListener("change", (e) => {
      toolOptions.toneUsePalette = e.target.checked;
    });
    document.getElementById("opt-splatter").addEventListener("input", (e) => {
      toolOptions.splatterCount = +e.target.value;
      document.getElementById("opt-splatter-val").textContent = e.target.value;
    });
    document.getElementById("opt-flow-particles").addEventListener("input", (e) => {
      const v = +e.target.value;
      toolOptions.flowTrailParticles = v;
      toolOptions.particleCount = v * 6;
    });
    document.getElementById("opt-blob-softness").addEventListener("input", (e) => {
      toolOptions.blobSoftness = +e.target.value / 100;
    });
    document.getElementById("opt-circle-complexity").addEventListener("input", (e) => {
      toolOptions.circleComplexity = +e.target.value;
      document.getElementById("opt-circle-complexity-val").textContent = e.target.value;
    });
    document.getElementById("opt-blur-amount").addEventListener("input", (e) => {
      toolOptions.blurAmount = +e.target.value;
      document.getElementById("opt-blur-amount-val").textContent = e.target.value;
    });
    document.getElementById("opt-sketch-detail").addEventListener("input", (e) => {
      toolOptions.sketchDetail = +e.target.value;
      document.getElementById("opt-sketch-detail-val").textContent = e.target.value;
    });
    document.getElementById("opt-sketch-color").addEventListener("input", (e) => {
      toolOptions.sketchColorKeep = +e.target.value / 100;
      document.getElementById("opt-sketch-color-val").textContent = e.target.value;
    });
    document.querySelectorAll("[data-selection-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toolOptions.selectionMode = btn.dataset.selectionMode;
        document.querySelectorAll("[data-selection-mode]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
    document.querySelectorAll("[data-selection-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toolOptions.selectionAction = btn.dataset.selectionAction;
        document.querySelectorAll("[data-selection-action]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
    document.getElementById("selection-apply").addEventListener("click", () => {
      SelectionManager.commit(getAppContext());
      updateSelectionActions();
    });
    document.getElementById("selection-copy").addEventListener("click", () => {
      SelectionManager.copyToClipboard(getAppContext());
      updateSelectionActions();
    });
    document.getElementById("selection-paste").addEventListener("click", () => {
      SelectionManager.pasteFromClipboard(getAppContext());
      updateSelectionActions();
    });
    document.getElementById("selection-cancel").addEventListener("click", () => {
      SelectionManager.cancel(getAppContext());
      updateSelectionActions();
    });
    document.getElementById("selection-crop-canvas").addEventListener("click", () => {
      if (SelectionManager.crop(getAppContext(), "canvas")) {
        updateUI();
        updateSelectionActions();
      }
    });
    document.getElementById("selection-crop-layer").addEventListener("click", () => {
      if (SelectionManager.crop(getAppContext(), "layer")) {
        updateUI();
        updateSelectionActions();
      }
    });
    document.getElementById("btn-crop-canvas").addEventListener("click", () => {
      if (SelectionManager.crop(getAppContext(), "canvas")) {
        updateUI();
        updateSelectionActions();
      }
    });
    document.getElementById("btn-crop-layer").addEventListener("click", () => {
      if (SelectionManager.crop(getAppContext(), "layer")) {
        updateUI();
        updateSelectionActions();
      }
    });

    syncSelTransformFields = () => {
      const t = SelectionManager.getActiveTransform();
      const wrap = document.getElementById("opt-selection-transform-wrap");
      if (!wrap) return;
      wrap.classList.toggle("hidden", !t);
      if (!t) return;
      document.getElementById("sel-rot-deg").value = String(Math.round((t.rotation * 180) / Math.PI));
    };

    document.getElementById("sel-rot-ccw")?.addEventListener("click", () => {
      SelectionManager.rotateActive(getAppContext(), -15);
      syncSelTransformFields();
    });
    document.getElementById("sel-rot-cw")?.addEventListener("click", () => {
      SelectionManager.rotateActive(getAppContext(), 15);
      syncSelTransformFields();
    });
    document.getElementById("sel-rot-deg")?.addEventListener("change", (e) => {
      SelectionManager.setActiveRotation(getAppContext(), +e.target.value);
      syncSelTransformFields();
    });
    document.getElementById("sel-flip-h")?.addEventListener("click", () => {
      SelectionManager.flipActiveContent(getAppContext(), true);
    });
    document.getElementById("sel-flip-v")?.addEventListener("click", () => {
      SelectionManager.flipActiveContent(getAppContext(), false);
    });
    document.getElementById("sel-scale-down")?.addEventListener("click", () => {
      SelectionManager.scaleActive(getAppContext(), 0.9);
      document.getElementById("sel-scale-pct").value = "100";
    });
    document.getElementById("sel-scale-up")?.addEventListener("click", () => {
      SelectionManager.scaleActive(getAppContext(), 1.1);
      document.getElementById("sel-scale-pct").value = "100";
    });
    document.getElementById("sel-scale-apply")?.addEventListener("click", () => {
      const pct = +document.getElementById("sel-scale-pct").value || 100;
      SelectionManager.scaleActive(getAppContext(), pct / 100);
      document.getElementById("sel-scale-pct").value = "100";
    });

    setupShadowControls();
  }

  let shadowUiSilent = false;

  function shadowContextActive() {
    if (SelectionManager.hasFloating()) return "raster";
    const layer = DocumentModel.getActiveLayer(doc);
    if (DocumentModel.isVectorLayer(layer) && VectorSelection.getSelectedIds().length) return "vector";
    return null;
  }

  function readShadowFromUi(enabledOverride) {
    const enabled = enabledOverride !== undefined
      ? enabledOverride
      : document.getElementById("shadow-enabled").checked;
    if (!enabled) return null;
    return VectorModel.cloneShadow({
      dx: +document.getElementById("shadow-dx").value || 0,
      dy: +document.getElementById("shadow-dy").value || 0,
      blur: +document.getElementById("shadow-blur").value || 0,
      opacity: (+document.getElementById("shadow-opacity").value || 0) / 100,
      color: document.getElementById("shadow-color").value || "#000000",
    });
  }

  function writeShadowToUi(shadow) {
    shadowUiSilent = true;
    const enabled = !!shadow;
    const base = shadow || VectorModel.defaultShadow();
    document.getElementById("shadow-enabled").checked = enabled;
    document.getElementById("shadow-dx").value = String(base.dx);
    document.getElementById("shadow-dy").value = String(base.dy);
    document.getElementById("shadow-blur").value = String(base.blur);
    document.getElementById("shadow-opacity").value = String(Math.round((base.opacity ?? 0.45) * 100));
    if (base.color && /^#/.test(base.color)) document.getElementById("shadow-color").value = base.color;
    const disabled = !enabled;
    ["shadow-dx", "shadow-dy", "shadow-blur", "shadow-opacity", "shadow-color"].forEach((id) => {
      document.getElementById(id).disabled = disabled;
    });
    shadowUiSilent = false;
  }

  function syncShadowUi() {
    const ctx = shadowContextActive();
    const wrap = document.getElementById("opt-shadow-wrap");
    if (!wrap) return;
    wrap.classList.toggle("hidden", !ctx);
    if (!ctx) return;
    if (ctx === "raster") {
      writeShadowToUi(SelectionManager.getActiveShadow());
      return;
    }
    const layer = DocumentModel.getActiveLayer(doc);
    const id = VectorSelection.getPrimaryId();
    const obj = id ? VectorModel.findObject(layer, id) : null;
    writeShadowToUi(obj?.shadow || null);
  }

  function applyShadowFromUi() {
    if (shadowUiSilent) return;
    const ctx = shadowContextActive();
    if (!ctx) return;
    const shadow = readShadowFromUi();
    if (ctx === "raster") {
      SelectionManager.setShadowOnFloating(getAppContext(), shadow, true);
      return;
    }
    VectorTools.applyAppearanceToSelection(getAppContext(), { shadow });
    syncVectorInspector();
  }

  function setupShadowControls() {
    const setFieldsEnabled = (on) => {
      ["shadow-dx", "shadow-dy", "shadow-blur", "shadow-opacity", "shadow-color"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.disabled = !on;
      });
    };
    document.getElementById("shadow-enabled")?.addEventListener("change", () => {
      if (shadowUiSilent) return;
      const on = document.getElementById("shadow-enabled").checked;
      setFieldsEnabled(on);
      if (on) {
        const sh = readShadowFromUi(true) || VectorModel.defaultShadow();
        writeShadowToUi(sh);
        document.getElementById("shadow-enabled").checked = true;
        setFieldsEnabled(true);
      }
      applyShadowFromUi();
    });
    ["shadow-dx", "shadow-dy", "shadow-blur", "shadow-opacity", "shadow-color"].forEach((id) => {
      document.getElementById(id)?.addEventListener("change", () => {
        if (shadowUiSilent) return;
        applyShadowFromUi();
      });
      document.getElementById(id)?.addEventListener("input", () => {
        if (shadowUiSilent) return;
        if (!document.getElementById("shadow-enabled").checked) return;
        if (shadowContextActive() === "raster") applyShadowFromUi();
      });
    });
  }

  let vectorInspectorSilent = false;

  function syncVectorInspector() {
    const layer = DocumentModel.getActiveLayer(doc);
    const id = VectorSelection.getPrimaryId();
    const obj = DocumentModel.isVectorLayer(layer) && id ? VectorModel.findObject(layer, id) : null;
    vectorInspectorSilent = true;
    const strokeEl = document.getElementById("vec-stroke");
    const strokeNone = document.getElementById("vec-stroke-none");
    const fillTypeEl = document.getElementById("vec-fill-type");
    const fillEl = document.getElementById("vec-fill");
    const fillA = document.getElementById("vec-fill-a");
    const fillB = document.getElementById("vec-fill-b");
    const fillAngle = document.getElementById("vec-fill-angle");
    const fillAngleVal = document.getElementById("vec-fill-angle-val");
    const widthEl = document.getElementById("vec-stroke-width");
    const widthVal = document.getElementById("vec-stroke-width-val");
    const profileEl = document.getElementById("vec-stroke-profile");
    const opacityEl = document.getElementById("vec-opacity");
    const opacityVal = document.getElementById("vec-opacity-val");
    const capEl = document.getElementById("vec-linecap");
    const joinEl = document.getElementById("vec-linejoin");
    const dashEl = document.getElementById("vec-dash");
    if (obj) {
      strokeNone.checked = !obj.stroke;
      if (obj.stroke && /^#/.test(obj.stroke)) strokeEl.value = obj.stroke;
      let fillType = "none";
      if (VectorModel.isSolidFill(obj.fill)) fillType = "solid";
      else if (VectorModel.isGradientFill(obj.fill)) fillType = obj.fill.type === "radial" ? "radial" : "linear";
      fillTypeEl.value = fillType;
      if (fillType === "solid" && /^#/.test(obj.fill)) fillEl.value = obj.fill;
      if (fillType === "linear" || fillType === "radial") {
        const stops = obj.fill.stops || [];
        if (stops[0]?.color) fillA.value = stops[0].color;
        if (stops[1]?.color) fillB.value = stops[1].color;
        if (fillType === "linear") {
          const dx = (obj.fill.x2 ?? 1) - (obj.fill.x1 ?? 0);
          const dy = (obj.fill.y2 ?? 1) - (obj.fill.y1 ?? 0);
          const ang = Math.round(((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360);
          fillAngle.value = ang;
          fillAngleVal.textContent = String(ang);
        }
      }
      widthEl.value = obj.strokeWidth ?? 2;
      widthVal.textContent = String(obj.strokeWidth ?? 2);
      if (profileEl) profileEl.value = obj.strokeProfile || "constant";
      opacityEl.value = Math.round((obj.opacity ?? 1) * 100);
      opacityVal.textContent = String(Math.round((obj.opacity ?? 1) * 100));
      capEl.value = obj.strokeLinecap || "round";
      joinEl.value = obj.strokeLinejoin || "round";
      dashEl.value = obj.dash && obj.dash.length ? "dashed" : "solid";
      if (obj.type === "text") {
        const tw = document.getElementById("vec-text-weight");
        const ta = document.getElementById("vec-text-align");
        const tf = document.getElementById("vec-text-family");
        const to = document.getElementById("vec-text-path-offset");
        const tov = document.getElementById("vec-text-path-offset-val");
        if (tw) tw.value = String(obj.fontWeight || "normal");
        if (ta) ta.value = obj.textAlign || "left";
        if (tf && obj.fontFamily) {
          const opt = [...tf.options].find((o) => o.value === obj.fontFamily);
          if (opt) tf.value = obj.fontFamily;
        }
        if (to) {
          to.value = Math.round(obj.pathOffset || 0);
          if (tov) tov.textContent = String(Math.round(obj.pathOffset || 0));
        }
      }
    }
    updateFillInspectorVisibility();
    const isText = obj?.type === "text";
    document.getElementById("vector-text-ops")?.classList.toggle("dimmed", !isText && VectorSelection.getSelectedIds().every((sid) => {
      const o = DocumentModel.isVectorLayer(layer) ? VectorModel.findObject(layer, sid) : null;
      return o?.type !== "text";
    }));
    document.getElementById("vector-align-ops").classList.toggle("dimmed", VectorSelection.getSelectedIds().length < 2);
    document.querySelectorAll("#vector-align-ops [data-distribute]").forEach((btn) => {
      btn.disabled = VectorSelection.getSelectedIds().length < 3;
    });
    vectorInspectorSilent = false;
    syncShadowUi();
  }

  function updateFillInspectorVisibility() {
    const type = document.getElementById("vec-fill-type")?.value || "none";
    document.getElementById("vec-fill-solid-wrap")?.classList.toggle("hidden", type !== "solid");
    document.getElementById("vec-fill-gradient-wrap")?.classList.toggle("hidden", type !== "linear" && type !== "radial");
    document.getElementById("vec-fill-angle-wrap")?.classList.toggle("hidden", type !== "linear");
  }

  function fillFromInspector() {
    const type = document.getElementById("vec-fill-type").value;
    if (type === "none") return null;
    if (type === "solid") return document.getElementById("vec-fill").value;
    const a = document.getElementById("vec-fill-a").value;
    const b = document.getElementById("vec-fill-b").value;
    if (type === "radial") return VectorModel.makeRadialFill(a, b);
    const angle = +document.getElementById("vec-fill-angle").value || 90;
    return VectorModel.makeLinearFill(a, b, angle);
  }

  function setupVectorPanel() {
    VectorTools.setInspectorSync(syncVectorInspector);

    const apply = (props) => {
      if (vectorInspectorSilent) return;
      VectorTools.applyAppearanceToSelection(getAppContext(), props);
      syncVectorInspector();
    };

    document.getElementById("vec-stroke").addEventListener("input", (e) => {
      document.getElementById("vec-stroke-none").checked = false;
      apply({ stroke: e.target.value });
    });
    document.getElementById("vec-stroke-none").addEventListener("change", (e) => {
      apply({ stroke: e.target.checked ? null : document.getElementById("vec-stroke").value });
    });
    document.getElementById("vec-fill-type").addEventListener("change", () => {
      updateFillInspectorVisibility();
      apply({ fill: fillFromInspector() });
    });
    document.getElementById("vec-fill").addEventListener("input", () => {
      apply({ fill: fillFromInspector() });
    });
    document.getElementById("vec-fill-a").addEventListener("input", () => apply({ fill: fillFromInspector() }));
    document.getElementById("vec-fill-b").addEventListener("input", () => apply({ fill: fillFromInspector() }));
    document.getElementById("vec-fill-angle").addEventListener("input", (e) => {
      document.getElementById("vec-fill-angle-val").textContent = e.target.value;
    });
    document.getElementById("vec-fill-angle").addEventListener("change", () => {
      apply({ fill: fillFromInspector() });
    });
    document.getElementById("vec-stroke-width").addEventListener("change", (e) => {
      document.getElementById("vec-stroke-width-val").textContent = e.target.value;
      apply({ strokeWidth: +e.target.value });
    });
    document.getElementById("vec-stroke-width").addEventListener("input", (e) => {
      document.getElementById("vec-stroke-width-val").textContent = e.target.value;
    });
    document.getElementById("vec-stroke-profile").addEventListener("change", (e) => {
      toolOptions.strokeProfile = e.target.value;
      apply({ strokeProfile: e.target.value });
    });
    document.getElementById("vec-opacity").addEventListener("change", (e) => {
      document.getElementById("vec-opacity-val").textContent = e.target.value;
      apply({ opacity: +e.target.value / 100 });
    });
    document.getElementById("vec-opacity").addEventListener("input", (e) => {
      document.getElementById("vec-opacity-val").textContent = e.target.value;
    });
    document.getElementById("vec-linecap").addEventListener("change", (e) => apply({ strokeLinecap: e.target.value }));
    document.getElementById("vec-linejoin").addEventListener("change", (e) => apply({ strokeLinejoin: e.target.value }));
    document.getElementById("vec-dash").addEventListener("change", (e) => {
      apply({ dash: e.target.value === "dashed" ? [8, 6] : null });
    });

    document.getElementById("vec-bool-union").addEventListener("click", () => VectorTools.booleanSelection(getAppContext(), "union"));
    document.getElementById("vec-bool-subtract").addEventListener("click", () => VectorTools.booleanSelection(getAppContext(), "subtract"));
    document.getElementById("vec-bool-intersect").addEventListener("click", () => VectorTools.booleanSelection(getAppContext(), "intersect"));
    document.getElementById("vec-bool-exclude").addEventListener("click", () => VectorTools.booleanSelection(getAppContext(), "exclude"));

    document.querySelectorAll("[data-align]").forEach((btn) => {
      btn.addEventListener("click", () => VectorTools.alignSelection(getAppContext(), btn.dataset.align));
    });
    document.querySelectorAll("[data-distribute]").forEach((btn) => {
      btn.addEventListener("click", () => VectorTools.distributeSelection(getAppContext(), btn.dataset.distribute));
    });

    const snap = VectorTools.getSnapOpts();
    document.getElementById("vec-snap-grid").checked = !!snap.grid;
    document.getElementById("vec-snap-objects").checked = !!snap.objects;
    document.getElementById("vec-snap-grid").addEventListener("change", (e) => {
      snap.grid = e.target.checked;
    });
    document.getElementById("vec-snap-objects").addEventListener("change", (e) => {
      snap.objects = e.target.checked;
    });
    const snapGuidesEl = document.getElementById("vec-snap-guides");
    if (snapGuidesEl) {
      snapGuidesEl.checked = snap.guides !== false;
      snapGuidesEl.addEventListener("change", (e) => {
        snap.guides = e.target.checked;
      });
    }

    document.getElementById("vec-dup").addEventListener("click", () => VectorTools.duplicateSelection(getAppContext()));
    document.getElementById("vec-copy").addEventListener("click", () => VectorTools.copySelection(getAppContext()));
    document.getElementById("vec-paste").addEventListener("click", () => VectorTools.pasteClipboard(getAppContext()));
    document.getElementById("vec-z-front").addEventListener("click", () => VectorTools.reorderSelection(getAppContext(), "front"));
    document.getElementById("vec-z-forward").addEventListener("click", () => VectorTools.reorderSelection(getAppContext(), "forward"));
    document.getElementById("vec-z-backward").addEventListener("click", () => VectorTools.reorderSelection(getAppContext(), "backward"));
    document.getElementById("vec-z-back").addEventListener("click", () => VectorTools.reorderSelection(getAppContext(), "back"));
    document.getElementById("vec-group")?.addEventListener("click", () => VectorTools.groupSelection(getAppContext()));
    document.getElementById("vec-ungroup")?.addEventListener("click", () => VectorTools.ungroupSelection(getAppContext()));
    document.getElementById("vec-generate-abstract")?.addEventListener("click", generateVectorAbstract);
    document.getElementById("vec-generate-geometric")?.addEventListener("click", generateVectorGeometric);
    document.getElementById("vec-generate-graffiti")?.addEventListener("click", generateVectorGraffiti);
    document.getElementById("vec-generate-wildstyle")?.addEventListener("click", generateVectorWildstyle);

    const applyText = (props) => {
      if (vectorInspectorSilent) return;
      VectorTools.applyTextPropsToSelection(getAppContext(), props);
      syncVectorInspector();
    };
    document.getElementById("vec-text-weight")?.addEventListener("change", (e) => applyText({ fontWeight: e.target.value }));
    document.getElementById("vec-text-align")?.addEventListener("change", (e) => applyText({ textAlign: e.target.value }));
    document.getElementById("vec-text-family")?.addEventListener("change", (e) => applyText({ fontFamily: e.target.value }));
    document.getElementById("vec-text-path-offset")?.addEventListener("input", (e) => {
      document.getElementById("vec-text-path-offset-val").textContent = e.target.value;
    });
    document.getElementById("vec-text-path-offset")?.addEventListener("change", (e) => {
      applyText({ pathOffset: +e.target.value });
    });
    document.getElementById("vec-text-edit")?.addEventListener("click", () => {
      const layer = DocumentModel.getActiveLayer(doc);
      const id = VectorSelection.getPrimaryId();
      const obj = DocumentModel.isVectorLayer(layer) && id ? VectorModel.findObject(layer, id) : null;
      if (obj?.type === "text") VectorTools.editSelectedText(getAppContext(), obj);
    });
    document.getElementById("vec-text-attach")?.addEventListener("click", () => VectorTools.attachTextToPath(getAppContext()));
    document.getElementById("vec-text-detach")?.addEventListener("click", () => VectorTools.detachTextFromPath(getAppContext()));
  }

  function updateSelectionActions() {
    const wrap = document.getElementById("opt-selection-actions-wrap");
    const pasteBtn = document.getElementById("selection-paste");
    const showFloating = SelectionManager.hasFloating();
    const showPaste = SelectionManager.hasClipboard();
    const showCrop = SelectionManager.canCrop(doc);
    wrap.classList.toggle("hidden", !showFloating && !showPaste && !showCrop);
    pasteBtn.classList.toggle("hidden", !showPaste);
    document.getElementById("selection-crop-canvas").disabled = !showCrop;
    document.getElementById("selection-crop-layer").disabled = !showCrop;
    document.getElementById("btn-crop-canvas").disabled = !showCrop;
    document.getElementById("btn-crop-layer").disabled = !showCrop;
    document.getElementById("opt-selection-transform-wrap")?.classList.toggle("hidden", !showFloating);
    syncSelTransformFields();
    syncShadowUi();
    updateStatus();
  }

  function updateToolOptionsPanel() {
    const abstract = ["kaleidoscope", "gradient-flow", "noise-smear", "flow-field", "fractal", "echo-trail"];
    const shapes = [
      "line", "rect", "ellipse",
      "vector-rect", "vector-roundrect", "vector-bezier", "vector-ellipse",
      "vector-polygon", "vector-star", "vector-regpoly",
    ];
    document.getElementById("opt-kaleidoscope-wrap").classList.toggle("hidden", activeTool !== "kaleidoscope");
    const fillTools = activeTool === "fill" || activeTool === "clear-fill";
    document.getElementById("opt-fill-tolerance-wrap").classList.toggle("hidden", !fillTools && activeTool !== "select");
    document.getElementById("opt-selection-mode-wrap").classList.toggle("hidden", activeTool !== "select");
    document.getElementById("opt-selection-action-wrap").classList.toggle("hidden", activeTool !== "select");
    document.getElementById("opt-selection-actions-wrap").classList.toggle(
      "hidden",
      !SelectionManager.hasFloating() && !SelectionManager.hasClipboard() && !SelectionManager.canCrop(doc),
    );
    document.getElementById("opt-noise-wrap").classList.toggle("hidden", activeTool !== "noise-smear");
    document.getElementById("opt-shape-fill-wrap").classList.toggle("hidden", !shapes.includes(activeTool));
    document.getElementById("opt-vec-corner-wrap").classList.toggle("hidden", activeTool !== "vector-roundrect");
    document.getElementById("opt-vec-star-tips-wrap").classList.toggle("hidden", activeTool !== "vector-star");
    document.getElementById("opt-vec-poly-sides-wrap").classList.toggle("hidden", activeTool !== "vector-regpoly");
    document.getElementById("opt-vec-pencil-smooth-wrap").classList.toggle("hidden", activeTool !== "vector-pencil");
    document.getElementById("opt-wet-blend-wrap").classList.toggle("hidden", activeTool !== "gradient-flow");
    document.getElementById("opt-mix-strength-wrap").classList.toggle("hidden", activeTool !== "color-mixer");
    document.getElementById("opt-mix-hint").classList.toggle("hidden", activeTool !== "color-mixer");
    document.getElementById("opt-drip-gravity-wrap").classList.toggle("hidden", activeTool !== "wet-drip");
    document.getElementById("opt-drip-length-wrap").classList.toggle("hidden", activeTool !== "wet-drip");
    document.getElementById("opt-smudge-strength-wrap").classList.toggle("hidden", activeTool !== "smudge");
    document.getElementById("opt-splatter-wrap").classList.toggle("hidden", activeTool !== "splatter");
    const flowTools = activeTool === "flow-trails" || activeTool === "flow-field";
    document.getElementById("opt-flow-particles-wrap").classList.toggle("hidden", !flowTools);
    document.getElementById("opt-blob-softness-wrap").classList.toggle("hidden", activeTool !== "soft-blobs");
    document.getElementById("opt-circle-complexity-wrap").classList.toggle("hidden", activeTool !== "circle-pattern");
    document.getElementById("opt-blur-amount-wrap").classList.toggle("hidden", activeTool !== "blur");
    const toneTools = activeTool === "lighten" || activeTool === "darken";
    document.getElementById("opt-tone-palette-wrap").classList.toggle("hidden", !toneTools);
  }

  function setupPointerEvents() {
    displayCanvas.addEventListener("pointerdown", onPointerDown);
    displayCanvas.addEventListener("pointermove", onPointerMove);
    displayCanvas.addEventListener("pointerup", onPointerUp);
    displayCanvas.addEventListener("pointerleave", onPointerUp);
    displayCanvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  function eventToDoc(e) {
    const rect = displayCanvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const docPt = CanvasViewport.screenToDoc(sx, sy);
    const pressure = e.pressure > 0 ? e.pressure : 1;
    return { docX: docPt.x, docY: docPt.y, altKey: e.altKey, shiftKey: e.shiftKey, button: e.button, pressure, detail: e.detail || 1 };
  }

  function onPointerDown(e) {
    if (e.button !== 0) return;
    if (spaceHeld) {
      CanvasViewport.startPan(e);
      return;
    }
    pointerDown = true;
    displayCanvas.setPointerCapture(e.pointerId);
    const ev = eventToDoc(e);
    lastPressure = ev.pressure || 1;
    // Alt+click near a guide to drag it (avoids stealing paint/select hits)
    if (ev.altKey && GuidesManager.tryPointerDownOnGuide(ev.docX, ev.docY)) return;
    if (!VECTOR_TOOLS.has(activeTool) && SelectionManager.handlePointerDown(ev, getAppContext())) return;
    let layer = DocumentModel.getActiveLayer(doc);
    const tool = tools[activeTool];
    if (tool && !VECTOR_TOOLS.has(activeTool) && DocumentModel.isVectorLayer(layer)) {
      window.alert("Switch to a raster layer (or add one with +) to use paint tools. Vector tools are in the Vector section.");
      pointerDown = false;
      return;
    }
    if (tool && tool.onPointerDown) {
      tool.onPointerDown(layer.getCtx(), ev, getAppContext());
    }
  }

  function onPointerMove(e) {
    if (CanvasViewport.isPanning()) {
      CanvasViewport.movePan(e);
      return;
    }
    const ev = eventToDoc(e);
    lastPressure = ev.pressure || 1;
    updateStatus(ev.docX, ev.docY);
    if (SelectionManager.handlePointerMove(ev, getAppContext())) return;
    if (!pointerDown) return;
    const layer = DocumentModel.getActiveLayer(doc);
    const tool = tools[activeTool];
    if (tool && tool.onPointerMove) {
      tool.onPointerMove(layer.getCtx(), ev, getAppContext());
    }
  }

  function onPointerUp(e) {
    CanvasViewport.endPan();
    const ev = eventToDoc(e);
    if (SelectionManager.handlePointerUp(ev, getAppContext())) {
      pointerDown = false;
      return;
    }
    if (!pointerDown) return;
    pointerDown = false;
    const layer = DocumentModel.getActiveLayer(doc);
    const tool = tools[activeTool];
    if (tool && tool.onPointerUp) {
      tool.onPointerUp(layer.getCtx(), ev, getAppContext());
    }
  }

  function setupKeyboard() {
    window.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea, select")) return;
      if (e.code === "Space") { spaceHeld = true; e.preventDefault(); }
      if (VectorTools.handleKey(e, getAppContext())) return;
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") { e.preventDefault(); undo(); }
        if (e.key === "y") { e.preventDefault(); redo(); }
        if (e.key === "s") { e.preventDefault(); IO.saveProject(doc); }
        if (e.key === "o") { e.preventDefault(); document.getElementById("file-open").click(); }
        if (e.key === "c" && SelectionManager.hasFloating() && !VectorSelection.getSelectedIds().length) {
          e.preventDefault();
          SelectionManager.copyToClipboard(getAppContext());
          updateSelectionActions();
        }
        if (e.key === "v" && SelectionManager.hasClipboard() && !VectorTools.hasClipboard()) {
          e.preventDefault();
          SelectionManager.pasteFromClipboard(getAppContext());
          updateSelectionActions();
        }
      }
      const shortcuts = {
        b: "brush", e: "eraser", g: "fill", t: "clear-fill", i: "eyedropper",
        p: "pencil", m: "move", s: "select", n: "vector-pen", v: "vector-select", a: "vector-node",
      };
      if (!e.ctrlKey && !e.metaKey && shortcuts[e.key]) setTool(shortcuts[e.key]);
      if (e.key === "Enter" && SelectionManager.hasFloating()) {
        e.preventDefault();
        SelectionManager.commit(getAppContext());
      }
      if (e.key === "Escape") {
        if (SelectionManager.isActive()) {
          e.preventDefault();
          SelectionManager.cancel(getAppContext());
        }
      }
      if (e.key === "x") { Palette.swapColors(); PalettePanel.render(); }
      if (e.key === "[") {
        toolOptions.brushSize = Math.max(CONFIG.BRUSH_MIN, toolOptions.brushSize - 2);
        document.getElementById("opt-brush-size").value = toolOptions.brushSize;
        document.getElementById("opt-brush-size-val").textContent = toolOptions.brushSize;
      }
      if (e.key === "]") {
        toolOptions.brushSize = Math.min(CONFIG.BRUSH_MAX, toolOptions.brushSize + 2);
        document.getElementById("opt-brush-size").value = toolOptions.brushSize;
        document.getElementById("opt-brush-size-val").textContent = toolOptions.brushSize;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.code === "Space") spaceHeld = false;
    });
  }

  function applyLayerEdit(editFn) {
    const layer = DocumentModel.getActiveLayer(doc);
    if (layer.locked) return;
    if (DocumentModel.isVectorLayer(layer)) {
      window.alert("This filter works on raster layers. Select a raster layer, or merge the vector layer down first.");
      return;
    }
    History.beginStroke(doc, layer.id, DocumentModel.snapshotLayer(layer));
    editFn(layer);
    History.commitStroke(doc);
    doc.dirty = true;
    render();
    updateUI();
  }

  function handleLayerAction(action) {
    const active = DocumentModel.getActiveLayer(doc);
    switch (action) {
      case "add":
        DocumentModel.addLayer(doc);
        break;
      case "add-vector":
        DocumentModel.addVectorLayer(doc);
        break;
      case "remove":
        DocumentModel.removeLayer(doc, active.id);
        VectorTools.setSelectedId(null);
        break;
      case "up":
        DocumentModel.moveLayer(doc, active.id, 1);
        break;
      case "down":
        DocumentModel.moveLayer(doc, active.id, -1);
        break;
      case "duplicate":
        DocumentModel.duplicateLayer(doc, active.id);
        break;
      case "merge":
        DocumentModel.mergeDown(doc, active.id);
        break;
      case "rasterize": {
        if (!DocumentModel.isVectorLayer(active)) {
          window.alert("Select a vector layer to rasterize.");
          return;
        }
        if (active.locked) return;
        const before = DocumentModel.snapshotLayer(active);
        History.beginStroke(doc, active.id, before);
        DocumentModel.rasterizeVectorLayer(doc, active.id);
        History.commitStroke(doc);
        VectorTools.setSelectedId(null);
        break;
      }
      case "trace": {
        if (DocumentModel.isVectorLayer(active)) {
          window.alert("Select a raster layer to trace into vectors.\n\nTip: paint on a transparent layer (not the solid Background), then Trace.");
          return;
        }
        if (active.locked) return;
        const primary = Palette.getState().primary;
        const secondary = Palette.getState().secondary;
        const layer = DocumentModel.traceRasterLayer(doc, active.id, {
          threshold: 12,
          contrast: 18,
          sampleStep: 2,
          simplify: 2,
          maxContours: 80,
          minArea: 40,
          style: {
            stroke: primary,
            // undefined → auto sample fill from the bitmap; null only if user wants outlines
            fill: toolOptions.shapeFill ? secondary : undefined,
            strokeWidth: 1.5,
          },
        });
        if (!layer) {
          window.alert(
            "Nothing to trace on this layer.\n\n" +
              "• Use a raster layer with paint (brush/shapes) on a transparent background\n" +
              "• Solid white Background usually has no “ink” to find\n" +
              "• Soft/very light strokes may need higher opacity"
          );
          return;
        }
        const count = (layer.objects || []).length;
        statusEl.textContent = `Traced ${count} shape${count === 1 ? "" : "s"} → ${layer.name}`;
        break;
      }
      case "blur-layer":
        applyLayerEdit((layer) => LayerTransform.blurLayer(layer, toolOptions.blurAmount || 8));
        return;
      case "drawing-filter":
        applyLayerEdit((layer) => {
          LayerFilters.applyDrawing(layer, {
            detail: toolOptions.sketchDetail,
            colorKeep: toolOptions.sketchColorKeep,
          });
        });
        return;
      case "adjust-levels":
        openAdjustDialog("levels");
        return;
      case "adjust-curves":
        openAdjustDialog("curves");
        return;
      case "adjust-hue":
        openAdjustDialog("hue");
        return;
      case "flip-h":
        applyLayerEdit((layer) => LayerTransform.flipLayer(layer, true));
        return;
      case "flip-v":
        applyLayerEdit((layer) => LayerTransform.flipLayer(layer, false));
        return;
      case "rotate-cw":
        applyLayerEdit((layer) => LayerTransform.rotateLayer(layer, true));
        return;
      case "rotate-ccw":
        applyLayerEdit((layer) => LayerTransform.rotateLayer(layer, false));
        return;
      case "refresh":
        updateSelectionActions();
        break;
      case "render":
        render();
        updateStatus();
        return;
    }
    render();
    updateUI();
  }

  function getBrushOptions(erase) {
    const pressure = pointerDown && lastPressure ? lastPressure : 1;
    return {
      size: toolOptions.brushSize * (0.3 + pressure * 0.7),
      hardness: toolOptions.hardness,
      opacity: toolOptions.opacity,
      flow: toolOptions.flow,
      erase,
      colorResolver: Palette.colorResolver,
    };
  }

  function getAppContext() {
    return {
      doc,
      activeTool,
      toolOptions,
      getBrushOptions,
      requestRender: render,
      onHistoryChange: updateUI,
      onSelectionChange: updateSelectionActions,
      updateUI,
      setStatus: (msg) => {
        if (statusEl && msg) statusEl.textContent = msg;
      },
    };
  }

  function render() {
    const composite = Renderer.renderDocument(doc);
    CanvasViewport.drawComposite(composite, doc.width, doc.height);
    if (generatorPreview.active && generatorPreview.canvas) {
      displayCanvas.getContext("2d").drawImage(generatorPreview.canvas, 0, 0);
    }
    const overlayCtx = displayCanvas.getContext("2d");
    GuidesManager.drawGuidesOverlay(overlayCtx, doc.width, doc.height);
    if (SelectionManager.isActive()) {
      SelectionManager.drawOverlay(overlayCtx);
    }
    VectorTools.drawOverlay(overlayCtx, getAppContext());
    GuidesManager.drawRulers(doc.width, doc.height);
  }

  function updateUI() {
    document.getElementById("doc-title").textContent = doc.title;
    document.title = doc.title + " — The Abstract Painter";
    LayersPanel.render(doc);
    updateToolOptionsPanel();
    updateGeneratorPreviewUI();
    syncVectorInspector();
    updateStatus();
  }

  function updateStatus(x, y) {
    const zoom = Math.round(CanvasViewport.getZoom() * 100);
    const coords = x !== undefined ? `x: ${Math.floor(x)}  y: ${Math.floor(y)}` : "";
    const hint = SelectionManager.getStatusHint(getAppContext());
    const toolLabel = hint || `${activeTool} ${toolOptions.brushSize}px`;
    statusEl.textContent = `${coords}  |  Zoom: ${zoom}%  |  ${toolLabel}  |  ${doc.width}×${doc.height}`;
  }

  function undo() {
    if (History.undo(doc, DocumentModel.restoreLayer)) {
      render();
      updateUI();
    }
  }

  function redo() {
    if (History.redo(doc, DocumentModel.restoreLayer)) {
      render();
      updateUI();
    }
  }

  document.addEventListener("DOMContentLoaded", init);

  return { getAppContext };
})();

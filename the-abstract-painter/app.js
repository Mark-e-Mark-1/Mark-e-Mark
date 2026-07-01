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
  };

  const tools = {
    ...StandardTools,
    ...AbstractTools,
  };

  const toolOptions = {
    brushSize: CONFIG.DEFAULT_BRUSH,
    hardness: CONFIG.DEFAULT_HARDNESS,
    opacity: CONFIG.DEFAULT_OPACITY,
    flow: CONFIG.DEFAULT_FLOW,
    fillTolerance: 32,
    selectionMode: "rect",
    selectionAction: "cut",
    shapeFill: false,
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
    LayersPanel.init(document.getElementById("layer-list"));
    PalettePanel.init();

    setupToolbar();
    setupMenus();
    setupNameDialog();
    setupToolOptions();
    setupPointerEvents();
    setupKeyboard();

    LayersPanel.onLayerAction(handleLayerAction);
    CanvasViewport.onViewportChange(updateStatus);

    render();
    updateUI();
    renderRecentFiles();
    promptDocumentName("new").then((name) => {
      if (name) setDocumentTitle(name);
    });
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

  function createNewDocument() {
    doc = DocumentModel.createDocument();
    History.clear(doc);
    clearGeneratorPreview();
    CanvasViewport.fitToView(doc.width, doc.height);
    render();
    updateUI();
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
      const name = await promptDocumentName("new");
      createNewDocument();
      if (name) setDocumentTitle(name);
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

    document.getElementById("btn-undo").addEventListener("click", undo);
    document.getElementById("btn-redo").addEventListener("click", redo);
    document.getElementById("btn-fit").addEventListener("click", () => {
      CanvasViewport.fitToView(doc.width, doc.height);
    });
    document.getElementById("btn-fullscreen").addEventListener("click", toggleFullscreen);
    document.getElementById("btn-resize").addEventListener("click", () => {
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
    document.getElementById("btn-create-generator-layer").addEventListener("click", commitGeneratorPreview);
    document.getElementById("btn-drawing-filter").addEventListener("click", applyDrawingFilter);
    document.getElementById("resize-apply").addEventListener("click", applyResize);
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
      updateGeneratorPreviewUI();
    }
    return generatorPreview.canvas.getContext("2d");
  }

  function clearGeneratorPreview() {
    if (generatorPreview.canvas) {
      generatorPreview.canvas.getContext("2d").clearRect(0, 0, generatorPreview.canvas.width, generatorPreview.canvas.height);
    }
    generatorPreview.active = false;
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
    generatorPreview.namePrefix = namePrefix;
    render();
    updateGeneratorPreviewUI();
  }

  function commitGeneratorPreview() {
    if (!generatorPreview.active || !generatorPreview.canvas) return;
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
    updateStatus();
  }

  function updateToolOptionsPanel() {
    const abstract = ["kaleidoscope", "gradient-flow", "noise-smear", "flow-field", "fractal", "echo-trail"];
    const shapes = ["line", "rect", "ellipse"];
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
    return { docX: docPt.x, docY: docPt.y, altKey: e.altKey, shiftKey: e.shiftKey, button: e.button, pressure };
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
    if (SelectionManager.handlePointerDown(ev, getAppContext())) return;
    const layer = DocumentModel.getActiveLayer(doc);
    const tool = tools[activeTool];
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
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") { e.preventDefault(); undo(); }
        if (e.key === "y") { e.preventDefault(); redo(); }
        if (e.key === "s") { e.preventDefault(); IO.saveProject(doc); }
        if (e.key === "o") { e.preventDefault(); document.getElementById("file-open").click(); }
        if (e.key === "c" && SelectionManager.hasFloating()) {
          e.preventDefault();
          SelectionManager.copyToClipboard(getAppContext());
          updateSelectionActions();
        }
        if (e.key === "v" && SelectionManager.hasClipboard()) {
          e.preventDefault();
          SelectionManager.pasteFromClipboard(getAppContext());
          updateSelectionActions();
        }
      }
      const shortcuts = { b: "brush", e: "eraser", g: "fill", t: "clear-fill", i: "eyedropper", p: "pencil", m: "move", s: "select" };
      if (shortcuts[e.key]) setTool(shortcuts[e.key]);
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
      case "remove":
        DocumentModel.removeLayer(doc, active.id);
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
    };
  }

  function render() {
    const composite = Renderer.renderDocument(doc);
    CanvasViewport.drawComposite(composite, doc.width, doc.height);
    if (generatorPreview.active && generatorPreview.canvas) {
      displayCanvas.getContext("2d").drawImage(generatorPreview.canvas, 0, 0);
    }
    if (SelectionManager.isActive()) {
      const ctx = displayCanvas.getContext("2d");
      SelectionManager.drawOverlay(ctx);
    }
  }

  function updateUI() {
    document.getElementById("doc-title").textContent = doc.title;
    document.title = doc.title + " — The Abstract Painter";
    LayersPanel.render(doc);
    updateToolOptionsPanel();
    updateGeneratorPreviewUI();
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

const App = (() => {
  let doc = null;
  let editorEl = null;
  let historyTimer = null;
  let autosaveTimer = null;
  let focusMode = false;
  let outlineVisible = true;

  function init() {
    editorEl = document.getElementById("editor");
    Formatting.init(editorEl);
    Toolbar.init();
    OutlinePanel.init(document.getElementById("outline-list"));
    FindPanel.init(document.getElementById("find-panel"), editorEl);

    setupEditor();
    setupMenus();
    setupNameDialog();
    setupPageSetupDialog();
    setupKeyboard();

    Toolbar.onFormatChange(refreshFromEditor);
    FindPanel.onContentChange(refreshFromEditor);
    OutlinePanel.onHeadingClick((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      Formatting.focusEditor();
    });

    const autosaved = IO.loadAutosave();
    if (autosaved && autosaved.content && autosaved.content !== CONFIG.DEFAULT_CONTENT) {
      const useAutosave = confirm("Recover autosaved document from your last session?");
      doc = useAutosave ? autosaved : DocumentModel.createDocument();
    } else {
      doc = DocumentModel.createDocument();
    }

    loadDocumentIntoEditor();
    History.reset(doc, editorEl.innerHTML);
    applyDocumentStyles();
    updateUI();
    renderRecentFiles();
    startAutosave();

    promptDocumentName("new").then((name) => {
      if (name) setDocumentTitle(name);
    });
  }

  function setupEditor() {
    editorEl.addEventListener("input", () => {
      scheduleHistoryPush();
      refreshFromEditor();
    });
    editorEl.addEventListener("keyup", () => Toolbar.sync(doc));
    editorEl.addEventListener("mouseup", () => Toolbar.sync(doc));
    editorEl.addEventListener("paste", (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
      refreshFromEditor();
    });
  }

  function scheduleHistoryPush() {
    clearTimeout(historyTimer);
    historyTimer = setTimeout(() => {
      History.push(doc, editorEl.innerHTML);
    }, CONFIG.HISTORY_DEBOUNCE_MS);
  }

  function refreshFromEditor() {
    DocumentModel.setContent(doc, editorEl.innerHTML);
    updateUI();
  }

  function loadDocumentIntoEditor() {
    History.withoutRecording(doc, () => {
      editorEl.innerHTML = doc.content;
    });
  }

  function applyDocumentStyles() {
    const dims = DocumentModel.getPageDimensions(doc);
    const frame = document.getElementById("page-frame");
    frame.style.width = dims.width + "px";
    frame.style.minHeight = dims.height + "px";
    frame.style.padding = `${doc.page.marginTop}px ${doc.page.marginRight}px ${doc.page.marginBottom}px ${doc.page.marginLeft}px`;
    frame.style.zoom = doc.zoom / 100;

    editorEl.style.fontFamily = doc.fontFamily;
    editorEl.style.fontSize = doc.fontSize + "pt";
    editorEl.style.lineHeight = doc.lineHeight;
    editorEl.style.color = doc.textColor;
  }

  function updateUI() {
    document.getElementById("doc-title").textContent = doc.title;
    document.title = doc.title + " — " + CONFIG.APP_NAME;

    const stats = Stats.analyze(editorEl.innerHTML);
    document.getElementById("status-stats").textContent = Stats.formatStatus(stats);
    document.getElementById("status-zoom").textContent = doc.zoom + "%";
    document.getElementById("status-dirty").textContent = doc.dirty ? "Unsaved changes" : "";

    Toolbar.sync(doc);
    OutlinePanel.render(editorEl.innerHTML);

    document.getElementById("btn-undo").disabled = !History.canUndo(doc);
    document.getElementById("btn-redo").disabled = !History.canRedo(doc);
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
      if (!input.value.trim()) {
        errorEl.classList.remove("hidden");
        input.focus();
        return;
      }
      errorEl.classList.add("hidden");
      const name = IO.sanitizeTitle(input.value);
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
      done(IO.sanitizeTitle(CONFIG.DEFAULT_TITLE));
    });

    dialog.addEventListener("close", () => {
      if (!nameDialogResolve) return;
      if (nameDialogMode === "rename") {
        nameDialogResolve = null;
        return;
      }
      const pending = nameDialogResolve;
      nameDialogResolve = null;
      pending(IO.sanitizeTitle(CONFIG.DEFAULT_TITLE));
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

    heading.textContent = mode === "rename" ? "Rename Document" : "Name Your Document";
    hint.textContent = mode === "rename"
      ? "Enter a new name for this document."
      : "Choose a name before you start. It is used when saving and exporting.";
    applyBtn.textContent = mode === "rename" ? "Rename" : "Create";
    cancelBtn.textContent = mode === "rename" ? "Cancel" : "Skip (Untitled)";
    input.value = mode === "new" && (!currentName || currentName === CONFIG.DEFAULT_TITLE) ? "" : currentName;
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
    DocumentModel.setTitle(doc, IO.sanitizeTitle(name));
    updateUI();
  }

  function createNewDocument() {
    doc = DocumentModel.createDocument();
    History.clear(doc);
    loadDocumentIntoEditor();
    History.reset(doc, editorEl.innerHTML);
    applyDocumentStyles();
    updateUI();
    Formatting.focusEditor();
  }

  function confirmDiscard() {
    if (!doc.dirty) return true;
    return confirm("Discard unsaved changes?");
  }

  function setupMenus() {
    document.getElementById("btn-new").addEventListener("click", async () => {
      if (!confirmDiscard()) return;
      const name = await promptDocumentName("new");
      createNewDocument();
      if (name) setDocumentTitle(name);
      IO.clearAutosave();
    });

    document.getElementById("btn-rename").addEventListener("click", () => {
      promptDocumentName("rename", doc.title);
    });

    document.getElementById("btn-save").addEventListener("click", () => {
      doc.content = editorEl.innerHTML;
      IO.saveProject(doc);
      IO.clearAutosave();
      updateUI();
      renderRecentFiles();
    });

    document.getElementById("btn-open").addEventListener("click", () => {
      document.getElementById("file-open").click();
    });

    document.getElementById("file-open").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!confirmDiscard()) {
        e.target.value = "";
        return;
      }
      try {
        doc = await IO.loadProject(file);
        History.clear(doc);
        loadDocumentIntoEditor();
        History.reset(doc, editorEl.innerHTML);
        applyDocumentStyles();
        updateUI();
        renderRecentFiles();
        IO.clearAutosave();
      } catch (err) {
        alert("Failed to open document: " + err.message);
      }
      e.target.value = "";
    });

    document.getElementById("btn-export-txt").addEventListener("click", () => {
      doc.content = editorEl.innerHTML;
      IO.exportPlainText(doc);
    });
    document.getElementById("btn-export-html").addEventListener("click", () => {
      doc.content = editorEl.innerHTML;
      IO.exportHtml(doc);
    });
    document.getElementById("btn-print").addEventListener("click", () => {
      doc.content = editorEl.innerHTML;
      IO.printDocument(doc);
    });

    document.getElementById("btn-undo").addEventListener("click", undo);
    document.getElementById("btn-redo").addEventListener("click", redo);
    document.getElementById("btn-find").addEventListener("click", () => FindPanel.show());
    document.getElementById("btn-select-all").addEventListener("click", () => {
      Formatting.selectAll();
      Toolbar.sync(doc);
    });
    document.getElementById("btn-insert-date").addEventListener("click", () => {
      Formatting.insertDate();
      refreshFromEditor();
    });
    document.getElementById("btn-insert-hr").addEventListener("click", () => {
      Formatting.insertHorizontalRule();
      refreshFromEditor();
    });
    document.getElementById("btn-insert-page-break").addEventListener("click", () => {
      Formatting.insertPageBreak();
      refreshFromEditor();
    });

    document.getElementById("menu-clear-format").addEventListener("click", () => {
      Formatting.clearFormatting();
      refreshFromEditor();
    });
    document.querySelectorAll("[data-menu-style]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Formatting.applyBlockStyle(btn.dataset.menuStyle);
        refreshFromEditor();
      });
    });

    document.getElementById("btn-zoom-in").addEventListener("click", () => changeZoom(1));
    document.getElementById("btn-zoom-out").addEventListener("click", () => changeZoom(-1));
    document.getElementById("btn-zoom-reset").addEventListener("click", () => {
      DocumentModel.setZoom(doc, CONFIG.DEFAULT_ZOOM);
      applyDocumentStyles();
      updateUI();
    });
    document.getElementById("btn-toggle-outline").addEventListener("click", toggleOutline);
    document.getElementById("btn-focus-mode").addEventListener("click", toggleFocusMode);
    document.getElementById("btn-page-setup").addEventListener("click", openPageSetup);
    document.getElementById("btn-fullscreen").addEventListener("click", toggleFullscreen);
  }

  function changeZoom(direction) {
    const levels = CONFIG.ZOOM_LEVELS;
    let idx = levels.indexOf(doc.zoom);
    if (idx < 0) idx = levels.indexOf(CONFIG.DEFAULT_ZOOM);
    idx = Math.max(0, Math.min(levels.length - 1, idx + direction));
    DocumentModel.setZoom(doc, levels[idx]);
    applyDocumentStyles();
    updateUI();
  }

  function toggleOutline() {
    outlineVisible = !outlineVisible;
    document.getElementById("outline-panel").classList.toggle("hidden", !outlineVisible);
  }

  function toggleFocusMode() {
    focusMode = !focusMode;
    document.body.classList.toggle("focus-mode", focusMode);
    if (focusMode) document.getElementById("outline-panel").classList.add("hidden");
    else if (outlineVisible) document.getElementById("outline-panel").classList.remove("hidden");
  }

  function openPageSetup() {
    const dialog = document.getElementById("page-setup-dialog");
    document.getElementById("page-size").value = doc.page.size;
    document.getElementById("margin-top").value = doc.page.marginTop;
    document.getElementById("margin-bottom").value = doc.page.marginBottom;
    document.getElementById("margin-left").value = doc.page.marginLeft;
    document.getElementById("margin-right").value = doc.page.marginRight;
    dialog.showModal();
  }

  function setupPageSetupDialog() {
    const dialog = document.getElementById("page-setup-dialog");
    const form = document.getElementById("page-setup-form");
    document.getElementById("page-setup-cancel").addEventListener("click", () => dialog.close());

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      DocumentModel.setPage(doc, {
        size: document.getElementById("page-size").value,
        marginTop: parseInt(document.getElementById("margin-top").value, 10),
        marginBottom: parseInt(document.getElementById("margin-bottom").value, 10),
        marginLeft: parseInt(document.getElementById("margin-left").value, 10),
        marginRight: parseInt(document.getElementById("margin-right").value, 10),
      });
      applyDocumentStyles();
      updateUI();
      dialog.close();
    });
  }

  function undo() {
    const html = History.undo(doc);
    if (html === null) return;
    History.withoutRecording(doc, () => {
      editorEl.innerHTML = html;
    });
    DocumentModel.setContent(doc, html);
    updateUI();
  }

  function redo() {
    const html = History.redo(doc);
    if (html === null) return;
    History.withoutRecording(doc, () => {
      editorEl.innerHTML = html;
    });
    DocumentModel.setContent(doc, html);
    updateUI();
  }

  function renderRecentFiles() {
    const el = document.getElementById("recent-files");
    const recent = IO.getRecent();
    if (!recent.length) {
      el.innerHTML = "";
      return;
    }
    el.innerHTML = "<span class='recent-label'>Recent</span>";
    recent.forEach((title) => {
      const btn = document.createElement("button");
      btn.textContent = title;
      btn.title = "Recent document name (re-open via File → Open)";
      btn.addEventListener("click", () => setDocumentTitle(title));
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

  function startAutosave() {
    autosaveTimer = setInterval(() => {
      if (!doc.dirty) return;
      doc.content = editorEl.innerHTML;
      IO.saveAutosave(doc);
    }, CONFIG.AUTOSAVE_INTERVAL_MS);
  }

  function setupKeyboard() {
    document.addEventListener("keydown", (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "s") {
        e.preventDefault();
        doc.content = editorEl.innerHTML;
        IO.saveProject(doc);
        IO.clearAutosave();
        updateUI();
        renderRecentFiles();
      } else if (mod && e.key === "o") {
        e.preventDefault();
        document.getElementById("btn-open").click();
      } else if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((mod && e.key === "y") || (mod && e.shiftKey && e.key === "z")) {
        e.preventDefault();
        redo();
      } else if (mod && e.key === "f") {
        e.preventDefault();
        FindPanel.show();
      } else if (mod && e.key === "b") {
        e.preventDefault();
        Formatting.toggleBold();
        refreshFromEditor();
      } else if (mod && e.key === "i") {
        e.preventDefault();
        Formatting.toggleItalic();
        refreshFromEditor();
      } else if (mod && e.key === "u") {
        e.preventDefault();
        Formatting.toggleUnderline();
        refreshFromEditor();
      } else if (mod && e.key === "p") {
        e.preventDefault();
        doc.content = editorEl.innerHTML;
        IO.printDocument(doc);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();

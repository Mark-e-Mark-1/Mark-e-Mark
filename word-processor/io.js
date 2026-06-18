const IO = (() => {
  function sanitizeTitle(name) {
    const cleaned = (name || "").trim().replace(/[<>:"/\\|?*]/g, "").slice(0, 128);
    return cleaned || CONFIG.DEFAULT_TITLE;
  }

  function downloadBlob(blob, filename) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function saveProject(doc) {
    const data = DocumentModel.toJSON(doc);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    downloadBlob(blob, sanitizeTitle(doc.title) + CONFIG.PROJECT_EXT);
    DocumentModel.markClean(doc);
    addRecent(doc.title);
  }

  function loadProject(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          const baseName = file.name.replace(/\.wdoc$/i, "");
          const doc = DocumentModel.fromJSON({
            ...data,
            title: data.title || baseName || CONFIG.DEFAULT_TITLE,
          });
          DocumentModel.markClean(doc);
          addRecent(doc.title);
          resolve(doc);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  function exportPlainText(doc) {
    const text = DocumentModel.plainText(doc);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, sanitizeTitle(doc.title) + ".txt");
  }

  function exportHtml(doc) {
    const dims = DocumentModel.getPageDimensions(doc);
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(doc.title)}</title>
  <style>
    body { margin: 0; background: #e2e8f0; font-family: ${doc.fontFamily}; color: ${doc.textColor}; }
    .page { max-width: ${dims.width}px; margin: 2rem auto; padding: ${doc.page.marginTop}px ${doc.page.marginRight}px ${doc.page.marginBottom}px ${doc.page.marginLeft}px; background: #fff; line-height: ${doc.lineHeight}; font-size: ${doc.fontSize}pt; box-shadow: 0 4px 24px rgba(0,0,0,0.12); }
    h1.doc-h1, h1 { font-size: 2em; margin: 0.6em 0 0.3em; }
    h2.doc-h2, h2 { font-size: 1.5em; margin: 0.55em 0 0.25em; }
    h3.doc-h3, h3 { font-size: 1.2em; margin: 0.5em 0 0.2em; }
    p { margin: 0 0 0.75em; }
    ul, ol { margin: 0 0 0.75em 1.5em; }
    hr { border: none; border-top: 1px solid #cbd5e1; margin: 1.25em 0; }
  </style>
</head>
<body>
  <article class="page">${doc.content}</article>
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    downloadBlob(blob, sanitizeTitle(doc.title) + ".html");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function printDocument(doc) {
    const dims = DocumentModel.getPageDimensions(doc);
    const printWin = window.open("", "_blank");
    if (!printWin) {
      window.alert("Pop-up blocked. Allow pop-ups to print this document.");
      return;
    }
    printWin.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(doc.title)}</title>
  <style>
    @page { size: ${doc.page.size === "a4" ? "A4" : doc.page.size === "legal" ? "legal" : "letter"}; margin: ${doc.page.marginTop / 96}in ${doc.page.marginRight / 96}in ${doc.page.marginBottom / 96}in ${doc.page.marginLeft / 96}in; }
    body { margin: 0; font-family: ${doc.fontFamily}; color: ${doc.textColor}; font-size: ${doc.fontSize}pt; line-height: ${doc.lineHeight}; }
    h1.doc-h1, h1 { font-size: 2em; margin: 0.5em 0 0.25em; }
    h2.doc-h2, h2 { font-size: 1.5em; margin: 0.45em 0 0.2em; }
    h3.doc-h3, h3 { font-size: 1.2em; margin: 0.4em 0 0.15em; }
    p { margin: 0 0 0.65em; }
    ul, ol { margin: 0 0 0.65em 1.4em; }
    hr { border: none; border-top: 1px solid #94a3b8; margin: 1em 0; }
  </style>
</head>
<body>${doc.content}</body>
</html>`);
    printWin.document.close();
    printWin.focus();
    printWin.onload = () => {
      printWin.print();
      printWin.onafterprint = () => printWin.close();
    };
  }

  function saveAutosave(doc) {
    try {
      localStorage.setItem(CONFIG.AUTOSAVE_KEY, JSON.stringify(DocumentModel.toJSON(doc)));
    } catch (_) {}
  }

  function loadAutosave() {
    try {
      const raw = localStorage.getItem(CONFIG.AUTOSAVE_KEY);
      if (!raw) return null;
      return DocumentModel.fromJSON(JSON.parse(raw));
    } catch (_) {
      return null;
    }
  }

  function clearAutosave() {
    try {
      localStorage.removeItem(CONFIG.AUTOSAVE_KEY);
    } catch (_) {}
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
    sanitizeTitle,
    saveProject,
    loadProject,
    exportPlainText,
    exportHtml,
    printDocument,
    saveAutosave,
    loadAutosave,
    clearAutosave,
    getRecent,
  };
})();

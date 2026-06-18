const DocumentModel = (() => {
  function createDocument(opts = {}) {
    const page = { ...CONFIG.DEFAULT_PAGE, ...(opts.page || {}) };
    return {
      title: opts.title || CONFIG.DEFAULT_TITLE,
      content: opts.content ?? CONFIG.DEFAULT_CONTENT,
      page,
      fontFamily: opts.fontFamily || CONFIG.DEFAULT_FONT_FAMILY,
      fontSize: opts.fontSize || CONFIG.DEFAULT_FONT_SIZE,
      lineHeight: opts.lineHeight || CONFIG.DEFAULT_LINE_HEIGHT,
      textColor: opts.textColor || CONFIG.DEFAULT_TEXT_COLOR,
      zoom: opts.zoom || CONFIG.DEFAULT_ZOOM,
      dirty: false,
      createdAt: opts.createdAt || new Date().toISOString(),
      modifiedAt: opts.modifiedAt || new Date().toISOString(),
    };
  }

  function getPageDimensions(doc) {
    const preset = CONFIG.PAGE_SIZES[doc.page.size] || CONFIG.PAGE_SIZES.letter;
    return { width: preset.width, height: preset.height };
  }

  function markDirty(doc) {
    doc.dirty = true;
    doc.modifiedAt = new Date().toISOString();
  }

  function markClean(doc) {
    doc.dirty = false;
  }

  function setContent(doc, html) {
    doc.content = html;
    markDirty(doc);
  }

  function setTitle(doc, title) {
    doc.title = title;
    markDirty(doc);
  }

  function setPage(doc, pagePatch) {
    doc.page = { ...doc.page, ...pagePatch };
    markDirty(doc);
  }

  function setZoom(doc, zoom) {
    doc.zoom = zoom;
  }

  function toJSON(doc) {
    return {
      version: CONFIG.PROJECT_VERSION,
      title: doc.title,
      content: doc.content,
      page: doc.page,
      fontFamily: doc.fontFamily,
      fontSize: doc.fontSize,
      lineHeight: doc.lineHeight,
      textColor: doc.textColor,
      zoom: doc.zoom,
      createdAt: doc.createdAt,
      modifiedAt: doc.modifiedAt,
    };
  }

  function fromJSON(data) {
    return createDocument({
      title: data.title,
      content: data.content,
      page: data.page,
      fontFamily: data.fontFamily,
      fontSize: data.fontSize,
      lineHeight: data.lineHeight,
      textColor: data.textColor,
      zoom: data.zoom,
      createdAt: data.createdAt,
      modifiedAt: data.modifiedAt,
    });
  }

  function plainText(doc) {
    const div = document.createElement("div");
    div.innerHTML = doc.content;
    return (div.textContent || "").replace(/\u00a0/g, " ");
  }

  return {
    createDocument,
    getPageDimensions,
    markDirty,
    markClean,
    setContent,
    setTitle,
    setPage,
    setZoom,
    toJSON,
    fromJSON,
    plainText,
  };
})();

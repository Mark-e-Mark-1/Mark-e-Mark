const Renderer = (() => {
  let compositeCanvas = null;
  let compositeCtx = null;

  function ensureComposite(w, h) {
    if (!compositeCanvas || compositeCanvas.width !== w || compositeCanvas.height !== h) {
      compositeCanvas = document.createElement("canvas");
      compositeCanvas.width = w;
      compositeCanvas.height = h;
      compositeCtx = compositeCanvas.getContext("2d");
    }
    return compositeCtx;
  }

  function renderDocument(doc) {
    const ctx = ensureComposite(doc.width, doc.height);
    DocumentModel.compositeToCanvas(doc, ctx, true);
    doc.dirty = false;
    return compositeCanvas;
  }

  function getCompositeCanvas() {
    return compositeCanvas;
  }

  function getPixelColor(doc, x, y) {
    const canvas = renderDocument(doc);
    const px = Math.floor(x);
    const py = Math.floor(y);
    if (px < 0 || py < 0 || px >= doc.width || py >= doc.height) return null;
    const data = canvas.getContext("2d").getImageData(px, py, 1, 1).data;
    return `rgba(${data[0]},${data[1]},${data[2]},${(data[3] / 255).toFixed(3)})`;
  }

  return { renderDocument, getCompositeCanvas, getPixelColor };
})();

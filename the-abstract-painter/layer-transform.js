const LayerTransform = (() => {
  function blurCanvas(sourceCanvas, amount) {
    const temp = document.createElement("canvas");
    temp.width = sourceCanvas.width;
    temp.height = sourceCanvas.height;
    const ctx = temp.getContext("2d");
    ctx.filter = `blur(${amount}px)`;
    ctx.drawImage(sourceCanvas, 0, 0);
    ctx.filter = "none";
    return temp;
  }

  function blurLayer(layer, amount) {
    const ctx = layer.getCtx();
    const blurred = blurCanvas(layer.canvas, amount);
    ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    ctx.drawImage(blurred, 0, 0);
  }

  function blurRegion(ctx, sourceCanvas, cx, cy, radius, amount, canvasW, canvasH) {
    const r = Math.ceil(radius);
    const x0 = Math.max(0, Math.floor(cx - r));
    const y0 = Math.max(0, Math.floor(cy - r));
    const x1 = Math.min(canvasW, Math.ceil(cx + r));
    const y1 = Math.min(canvasH, Math.ceil(cy + r));
    const pw = x1 - x0;
    const ph = y1 - y0;
    if (pw <= 0 || ph <= 0) return;

    const patch = document.createElement("canvas");
    patch.width = pw;
    patch.height = ph;
    patch.getContext("2d").drawImage(sourceCanvas, x0, y0, pw, ph, 0, 0, pw, ph);

    const blurred = blurCanvas(patch, amount);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(blurred, x0, y0);
    ctx.restore();
  }

  function flipLayer(layer, horizontal) {
    const c = layer.canvas;
    const w = c.width;
    const h = c.height;
    const temp = document.createElement("canvas");
    temp.width = w;
    temp.height = h;
    const tctx = temp.getContext("2d");
    tctx.save();
    if (horizontal) {
      tctx.translate(w, 0);
      tctx.scale(-1, 1);
    } else {
      tctx.translate(0, h);
      tctx.scale(1, -1);
    }
    tctx.drawImage(c, 0, 0);
    tctx.restore();
    const ctx = layer.getCtx();
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(temp, 0, 0);
  }

  function rotateLayer(layer, clockwise) {
    const c = layer.canvas;
    const w = c.width;
    const h = c.height;
    const temp = document.createElement("canvas");
    temp.width = w;
    temp.height = h;
    const tctx = temp.getContext("2d");
    tctx.translate(w / 2, h / 2);
    tctx.rotate(clockwise ? Math.PI / 2 : -Math.PI / 2);
    tctx.drawImage(c, -w / 2, -h / 2);
    const ctx = layer.getCtx();
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(temp, 0, 0);
  }

  return { blurLayer, blurRegion, flipLayer, rotateLayer };
})();

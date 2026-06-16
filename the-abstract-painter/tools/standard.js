const StandardTools = (() => {
  function makeBrushTool(name, erase) {
    return {
      name,
      cursor: erase ? "cell" : "crosshair",
      stroke: null,
      lastPoint: null,
      totalDist: 0,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.stroke = [{ x: e.docX, y: e.docY }];
        this.lastPoint = { x: e.docX, y: e.docY };
        this.totalDist = 0;
        Palette.resetStrokeDistance();
        this.paintDab(ctx, e.docX, e.docY, app);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.stroke) return;
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        const pt = { x: e.docX, y: e.docY };
        this.stroke.push(pt);
        const opts = app.getBrushOptions(erase);
        this.totalDist = BrushEngine.drawStroke(ctx, [this.lastPoint, pt], {
          ...opts,
          strokeDistanceStart: this.totalDist,
        });
        Palette.addStrokeDistance(Math.hypot(pt.x - this.lastPoint.x, pt.y - this.lastPoint.y));
        this.lastPoint = pt;
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.stroke) return;
        History.commitStroke(app.doc);
        this.stroke = null;
        this.lastPoint = null;
        app.onHistoryChange();
      },

      paintDab(ctx, x, y, app) {
        const opts = app.getBrushOptions(erase);
        BrushEngine.stamp(ctx, x, y, opts.size / 2, opts.hardness, opts.colorResolver(x, y, 0, 0), opts.opacity, opts.flow, erase);
      },
    };
  }

  const PencilTool = {
    name: "pencil",
    cursor: "crosshair",
    lastPoint: null,

    onPointerDown(ctx, e, app) {
      const layer = DocumentModel.getActiveLayer(app.doc);
      if (layer.locked) return;
      History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
      this.lastPoint = { x: e.docX, y: e.docY };
      ctx.fillStyle = Palette.getState().primary;
      ctx.fillRect(Math.floor(e.docX), Math.floor(e.docY), 1, 1);
      app.requestRender();
    },

    onPointerMove(ctx, e, app) {
      if (!this.lastPoint) return;
      const x0 = Math.floor(this.lastPoint.x);
      const y0 = Math.floor(this.lastPoint.y);
      const x1 = Math.floor(e.docX);
      const y1 = Math.floor(e.docY);
      ctx.fillStyle = Palette.getState().primary;
      const dx = Math.abs(x1 - x0);
      const dy = Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;
      let x = x0;
      let y = y0;
      while (true) {
        ctx.fillRect(x, y, 1, 1);
        if (x === x1 && y === y1) break;
        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x += sx; }
        if (e2 < dx) { err += dx; y += sy; }
      }
      this.lastPoint = { x: e.docX, y: e.docY };
      app.requestRender();
    },

    onPointerUp(ctx, e, app) {
      if (!this.lastPoint) return;
      History.commitStroke(app.doc);
      this.lastPoint = null;
      app.onHistoryChange();
    },
  };

  function floodFill(data, w, h, x, y, tolerance, matchesTarget, writePixel) {
    if (x < 0 || y < 0 || x >= w || y >= h) return false;
    const start = (y * w + x) * 4;
    const tr = data[start], tg = data[start + 1], tb = data[start + 2], ta = data[start + 3];
    if (!matchesTarget(tr, tg, tb, ta)) return false;
    const stack = [[x, y]];
    const visited = new Uint8Array(w * h);
    let changed = false;
    while (stack.length) {
      const [cx, cy] = stack.pop();
      const pi = cy * w + cx;
      if (visited[pi]) continue;
      visited[pi] = 1;
      const i = pi * 4;
      if (Math.abs(data[i] - tr) + Math.abs(data[i + 1] - tg) + Math.abs(data[i + 2] - tb) + Math.abs(data[i + 3] - ta) > tolerance * 4) continue;
      writePixel(data, i);
      changed = true;
      if (cx > 0) stack.push([cx - 1, cy]);
      if (cx < w - 1) stack.push([cx + 1, cy]);
      if (cy > 0) stack.push([cx, cy - 1]);
      if (cy < h - 1) stack.push([cx, cy + 1]);
    }
    return changed;
  }

  const FillTool = {
    name: "fill",
    cursor: "cell",

    onPointerDown(ctx, e, app) {
      const layer = DocumentModel.getActiveLayer(app.doc);
      if (layer.locked) return;
      History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
      const x = Math.floor(e.docX);
      const y = Math.floor(e.docY);
      const w = layer.canvas.width;
      const h = layer.canvas.height;
      const img = ctx.getImageData(0, 0, w, h);
      const fill = hexToRgba(Palette.getState().primary);
      const tolerance = app.toolOptions.fillTolerance || 32;
      const changed = floodFill(
        img.data, w, h, x, y, tolerance,
        (r, g, b, a) => !(r === fill.r && g === fill.g && b === fill.b && a === fill.a),
        (data, i) => {
          data[i] = fill.r;
          data[i + 1] = fill.g;
          data[i + 2] = fill.b;
          data[i + 3] = fill.a;
        }
      );
      if (!changed) {
        History.cancelStroke(app.doc);
        return;
      }
      ctx.putImageData(img, 0, 0);
      History.commitStroke(app.doc);
      app.onHistoryChange();
      app.requestRender();
    },
  };

  const ClearFillTool = {
    name: "clear-fill",
    cursor: "cell",

    onPointerDown(ctx, e, app) {
      const layer = DocumentModel.getActiveLayer(app.doc);
      if (layer.locked) return;
      History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
      const x = Math.floor(e.docX);
      const y = Math.floor(e.docY);
      const w = layer.canvas.width;
      const h = layer.canvas.height;
      const img = ctx.getImageData(0, 0, w, h);
      const tolerance = app.toolOptions.fillTolerance || 32;
      const changed = floodFill(
        img.data, w, h, x, y, tolerance,
        (r, g, b, a) => a > 0,
        (data, i) => {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
          data[i + 3] = 0;
        }
      );
      if (!changed) {
        History.cancelStroke(app.doc);
        return;
      }
      ctx.putImageData(img, 0, 0);
      History.commitStroke(app.doc);
      app.onHistoryChange();
      app.requestRender();
    },
  };

  function hexToRgba(hex) {
    const h = hex.replace("#", "");
    const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return {
      r: parseInt(n.slice(0, 2), 16),
      g: parseInt(n.slice(2, 4), 16),
      b: parseInt(n.slice(4, 6), 16),
      a: 255,
    };
  }

  function makeShapeTool(shape) {
    return {
      name: shape,
      cursor: "crosshair",
      start: null,
      snapshot: null,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        this.start = { x: e.docX, y: e.docY };
        this.snapshot = DocumentModel.snapshotLayer(layer);
        History.beginStroke(app.doc, layer.id, this.snapshot);
      },

      onPointerMove(ctx, e, app) {
        if (!this.start) return;
        DocumentModel.restoreLayer(DocumentModel.getActiveLayer(app.doc), this.snapshot);
        this.drawShape(ctx, this.start, { x: e.docX, y: e.docY }, app);
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.start) return;
        History.commitStroke(app.doc);
        this.start = null;
        this.snapshot = null;
        app.onHistoryChange();
        app.requestRender();
      },

      drawShape(ctx, a, b, app) {
        const fill = app.toolOptions.shapeFill;
        ctx.strokeStyle = Palette.getState().primary;
        ctx.fillStyle = Palette.getState().primary;
        ctx.lineWidth = app.toolOptions.brushSize || CONFIG.DEFAULT_BRUSH;
        const x = Math.min(a.x, b.x);
        const y = Math.min(a.y, b.y);
        const w = Math.abs(b.x - a.x);
        const h = Math.abs(b.y - a.y);
        ctx.beginPath();
        if (shape === "line") {
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        } else if (shape === "rect") {
          if (fill) ctx.fillRect(x, y, w, h);
          else ctx.strokeRect(x, y, w, h);
        } else if (shape === "ellipse") {
          ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
          if (fill) ctx.fill();
          else ctx.stroke();
        }
      },
    };
  }

  const EyedropperTool = {
    name: "eyedropper",
    cursor: "copy",

    onPointerDown(ctx, e, app) {
      const color = Renderer.getPixelColor(app.doc, e.docX, e.docY);
      if (color) {
        if (e.altKey) Palette.setSecondary(color);
        else Palette.setPrimary(color);
      }
    },
  };

  const SmudgeTool = {
    name: "smudge",
    cursor: "grab",
    lastPoint: null,

    onPointerDown(ctx, e, app) {
      const layer = DocumentModel.getActiveLayer(app.doc);
      if (layer.locked) return;
      History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
      this.lastPoint = { x: e.docX, y: e.docY };
      app.requestRender();
    },

    onPointerMove(ctx, e, app) {
      if (!this.lastPoint) return;
      const layer = DocumentModel.getActiveLayer(app.doc);
      const pt = { x: e.docX, y: e.docY };
      const opts = app.getBrushOptions(false);
      const radius = opts.size / 2;
      const strength = app.toolOptions.smudgeStrength ?? 0.85;
      const spacing = Math.max(2, opts.size * 0.06);
      const dabs = BrushEngine.getDabPoints(this.lastPoint, pt, spacing);
      for (const dab of dabs) {
        BrushEngine.smudgeCopy(ctx, layer.canvas, this.lastPoint.x, this.lastPoint.y, dab.x, dab.y, radius, strength);
        this.lastPoint = { x: dab.x, y: dab.y };
      }
      this.lastPoint = pt;
      app.requestRender();
    },

    onPointerUp(ctx, e, app) {
      if (!this.lastPoint) return;
      History.commitStroke(app.doc);
      this.lastPoint = null;
      app.onHistoryChange();
    },
  };

  function makeToneTool(name, blendMode, toneColor) {
    return {
      name,
      cursor: "crosshair",
      lastPoint: null,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.paintDab(ctx, e.docX, e.docY, app, toneColor, blendMode);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const pt = { x: e.docX, y: e.docY };
        const opts = app.getBrushOptions(false);
        const spacing = Math.max(1, opts.size * 0.12);
        const dabs = BrushEngine.getDabPoints(this.lastPoint, pt, spacing);
        for (const dab of dabs) {
          this.paintDab(ctx, dab.x, dab.y, app, toneColor, blendMode);
        }
        this.lastPoint = pt;
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.lastPoint) return;
        History.commitStroke(app.doc);
        this.lastPoint = null;
        app.onHistoryChange();
      },

      paintDab(ctx, x, y, app, defaultColor, blendMode) {
        const opts = app.getBrushOptions(false);
        const usePalette = app.toolOptions.toneUsePalette ?? false;
        const color = usePalette ? opts.colorResolver(x, y, 0, 0) : defaultColor;
        BrushEngine.stamp(
          ctx, x, y, opts.size / 2, opts.hardness,
          color, opts.opacity, opts.flow, false, blendMode
        );
      },
    };
  }

  const MoveTool = {
    name: "move",
    cursor: "move",
    start: null,
    snapshotCanvas: null,

    onPointerDown(ctx, e, app) {
      const layer = DocumentModel.getActiveLayer(app.doc);
      if (layer.locked) return;
      History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
      this.start = { x: e.docX, y: e.docY };
      this.snapshotCanvas = document.createElement("canvas");
      this.snapshotCanvas.width = layer.canvas.width;
      this.snapshotCanvas.height = layer.canvas.height;
      this.snapshotCanvas.getContext("2d").drawImage(layer.canvas, 0, 0);
    },

    onPointerMove(ctx, e, app) {
      if (!this.start || !this.snapshotCanvas) return;
      const layer = DocumentModel.getActiveLayer(app.doc);
      const dx = e.docX - this.start.x;
      const dy = e.docY - this.start.y;
      ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
      ctx.drawImage(this.snapshotCanvas, dx, dy);
      app.requestRender();
    },

    onPointerUp(ctx, e, app) {
      if (!this.start) return;
      History.commitStroke(app.doc);
      this.start = null;
      this.snapshotCanvas = null;
      app.onHistoryChange();
      app.requestRender();
    },
  };

  const BlurTool = {
    name: "blur",
    cursor: "crosshair",
    lastPoint: null,
    snapshotCanvas: null,

    onPointerDown(ctx, e, app) {
      const layer = DocumentModel.getActiveLayer(app.doc);
      if (layer.locked) return;
      History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
      this.lastPoint = { x: e.docX, y: e.docY };
      this.snapshotCanvas = layer.canvas;
      this.blurAt(ctx, e.docX, e.docY, app);
      app.requestRender();
    },

    onPointerMove(ctx, e, app) {
      if (!this.lastPoint) return;
      const pt = { x: e.docX, y: e.docY };
      const opts = app.getBrushOptions(false);
      const spacing = Math.max(4, opts.size * 0.2);
      const dabs = BrushEngine.getDabPoints(this.lastPoint, pt, spacing);
      for (const dab of dabs) {
        this.blurAt(ctx, dab.x, dab.y, app);
      }
      this.lastPoint = pt;
      app.requestRender();
    },

    onPointerUp(ctx, e, app) {
      if (!this.lastPoint) return;
      History.commitStroke(app.doc);
      this.lastPoint = null;
      this.snapshotCanvas = null;
      app.onHistoryChange();
    },

    blurAt(ctx, x, y, app) {
      const layer = DocumentModel.getActiveLayer(app.doc);
      const opts = app.getBrushOptions(false);
      const amount = app.toolOptions.blurAmount || 8;
      LayerTransform.blurRegion(
        ctx, layer.canvas, x, y, opts.size / 2, amount,
        layer.canvas.width, layer.canvas.height
      );
    },
  };

  return {
    brush: makeBrushTool("brush", false),
    eraser: makeBrushTool("eraser", true),
    pencil: PencilTool,
    fill: FillTool,
    "clear-fill": ClearFillTool,
    line: makeShapeTool("line"),
    rect: makeShapeTool("rect"),
    ellipse: makeShapeTool("ellipse"),
    eyedropper: EyedropperTool,
    smudge: SmudgeTool,
    lighten: makeToneTool("lighten", "color-dodge", "#ffffff"),
    darken: makeToneTool("darken", "color-burn", "#000000"),
    move: MoveTool,
    blur: BlurTool,
  };
})();

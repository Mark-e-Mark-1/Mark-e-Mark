const AbstractTools = (() => {
  function makeKaleidoscopeTool() {
    return {
      name: "kaleidoscope",
      cursor: "crosshair",
      lastPoint: null,
      totalDist: 0,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.totalDist = 0;
        this.paintAt(ctx, e.docX, e.docY, app);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const segments = app.toolOptions.kaleidoscopeSegments || CONFIG.KALEIDOSCOPE_SEGMENTS.default;
        const cx = app.doc.width / 2;
        const cy = app.doc.height / 2;
        const opts = app.getBrushOptions(false);
        const spacing = Math.max(1, opts.size * 0.15);
        const dabs = BrushEngine.getDabPoints(this.lastPoint, { x: e.docX, y: e.docY }, spacing);
        for (const pt of dabs) {
          const kPoints = BrushEngine.kaleidoscopePoints(pt.x, pt.y, cx, cy, segments);
          for (const kp of kPoints) {
            const color = opts.colorResolver(kp.x, kp.y, this.totalDist, 1);
            BrushEngine.stamp(ctx, kp.x, kp.y, opts.size / 2, opts.hardness, color, opts.opacity, opts.flow, false);
          }
          this.totalDist += spacing;
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

      paintAt(ctx, x, y, app) {
        const segments = app.toolOptions.kaleidoscopeSegments || 6;
        const cx = app.doc.width / 2;
        const cy = app.doc.height / 2;
        const opts = app.getBrushOptions(false);
        const kPoints = BrushEngine.kaleidoscopePoints(x, y, cx, cy, segments);
        for (const kp of kPoints) {
          const color = opts.colorResolver(kp.x, kp.y, 0, 0);
          BrushEngine.stamp(ctx, kp.x, kp.y, opts.size / 2, opts.hardness, color, opts.opacity, opts.flow, false);
        }
      },
    };
  }

  function makeGradientFlowTool() {
    return {
      name: "gradient-flow",
      cursor: "crosshair",
      lastPoint: null,
      totalDist: 0,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.totalDist = 0;
        Palette.setMultiColorMode("gradient");
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const pt = { x: e.docX, y: e.docY };
        const speed = Math.hypot(pt.x - this.lastPoint.x, pt.y - this.lastPoint.y);
        const opts = app.getBrushOptions(false);
        ctx.save();
        if (app.toolOptions.wetBlend) ctx.globalCompositeOperation = "lighter";
        this.totalDist = BrushEngine.drawStroke(ctx, [this.lastPoint, pt], {
          ...opts,
          strokeDistanceStart: this.totalDist,
          colorResolver: (x, y, dist) => {
            const colors = Palette.getActiveColors();
            if (colors.length < 2) return Palette.getState().primary;
            const t = (dist + speed * 0.5) / 150;
            const idx = t % (colors.length - 1);
            const i = Math.floor(idx);
            return Palette.lerpColor(colors[i], colors[i + 1], idx - i);
          },
        });
        ctx.restore();
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
  }

  function makeNoiseSmearTool() {
    return {
      name: "noise-smear",
      cursor: "crosshair",
      lastPoint: null,
      seed: Math.random() * 1000,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.paintNoise(ctx, e.docX, e.docY, app);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const opts = app.getBrushOptions(false);
        const spacing = Math.max(1, opts.size * 0.12);
        const dabs = BrushEngine.getDabPoints(this.lastPoint, { x: e.docX, y: e.docY }, spacing);
        for (const pt of dabs) {
          this.paintNoise(ctx, pt.x, pt.y, app);
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

      paintNoise(ctx, x, y, app) {
        const opts = app.getBrushOptions(false);
        const amount = app.toolOptions.noiseAmount || 12;
        const off = BrushEngine.noiseOffset(x, y, amount, this.seed);
        const color = opts.colorResolver(x, y, 0, 0);
        BrushEngine.stamp(ctx, x + off.dx, y + off.dy, opts.size / 2, opts.hardness * 0.6, color, opts.opacity, opts.flow, false);
      },
    };
  }

  function makeFlowFieldTool() {
    return {
      name: "flow-field",
      cursor: "crosshair",

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.runParticles(ctx, e.docX, e.docY, app);
        History.commitStroke(app.doc);
        app.onHistoryChange();
        app.requestRender();
      },

      runParticles(ctx, sx, sy, app) {
        const count = app.toolOptions.particleCount || 80;
        const scale = app.toolOptions.fieldScale || 0.02;
        const steps = app.toolOptions.particleSteps || 40;
        const opts = app.getBrushOptions(false);
        for (let p = 0; p < count; p++) {
          let x = sx + (Math.random() - 0.5) * 20;
          let y = sy + (Math.random() - 0.5) * 20;
          for (let i = 0; i < steps; i++) {
            const angle = Math.sin(x * scale) * Math.cos(y * scale) * Math.PI * 2;
            x += Math.cos(angle) * 3;
            y += Math.sin(angle) * 3;
            const color = opts.colorResolver(x, y, i * 3, 1);
            BrushEngine.stamp(ctx, x, y, opts.size / 4, 0.3, color, opts.opacity * 0.6, opts.flow, false);
          }
        }
      },
    };
  }

  function makeFractalTool() {
    return {
      name: "fractal",
      cursor: "crosshair",

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        FractalEngine.fillLayer(ctx, layer.canvas.width, layer.canvas.height, Palette.getState(), {
          clearFirst: true,
        });
        History.commitStroke(app.doc);
        app.onHistoryChange();
        app.requestRender();
      },
    };
  }

  function makeColorMixerTool() {
    return {
      name: "color-mixer",
      cursor: "crosshair",
      lastPoint: null,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.mixAt(ctx, layer, e.docX, e.docY, app, null);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const layer = DocumentModel.getActiveLayer(app.doc);
        const pt = { x: e.docX, y: e.docY };
        const opts = app.getBrushOptions(false);
        const spacing = Math.max(2, opts.size * 0.08);
        const dabs = BrushEngine.getDabPoints(this.lastPoint, pt, spacing);
        for (const dab of dabs) {
          this.mixAt(ctx, layer, dab.x, dab.y, app, this.lastPoint);
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

      mixAt(ctx, layer, x, y, app, from) {
        const w = layer.canvas.width;
        const h = layer.canvas.height;
        const opts = app.getBrushOptions(false);
        const radius = opts.size / 2;
        const mixStrength = app.toolOptions.mixStrength ?? 0.65;
        const source = layer.canvas;

        BrushEngine.localBlend(ctx, x, y, radius, mixStrength, w, h);

        if (from) {
          const dx = x - from.x;
          const dy = y - from.y;
          const len = Math.hypot(dx, dy) || 1;
          const pickX = from.x + (dx / len) * radius * 0.3;
          const pickY = from.y + (dy / len) * radius * 0.3;
          BrushEngine.smudgeCopy(ctx, source, pickX, pickY, x, y, radius, 0.75);
          BrushEngine.localBlend(ctx, x, y, radius, mixStrength * 0.5, w, h);
        }

        const tint = app.toolOptions.mixTint ?? 0.12;
        if (tint > 0) {
          const brush = opts.colorResolver(x, y, 0, 0);
          BrushEngine.stamp(ctx, x, y, radius, 0.3, brush, tint, 1, false);
        }
      },
    };
  }

  function makeWetDripTool() {
    return {
      name: "wet-drip",
      cursor: "crosshair",
      lastPoint: null,
      strokePoints: [],

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.strokePoints = [{ x: e.docX, y: e.docY }];
        this.depositPaint(ctx, e.docX, e.docY, app);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const pt = { x: e.docX, y: e.docY };
        const opts = app.getBrushOptions(false);
        const spacing = Math.max(2, opts.size * 0.2);
        const dabs = BrushEngine.getDabPoints(this.lastPoint, pt, spacing);
        for (const dab of dabs) {
          this.depositPaint(ctx, dab.x, dab.y, app);
          this.strokePoints.push({ x: dab.x, y: dab.y });
        }
        this.lastPoint = pt;
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.lastPoint) return;
        this.runDrips(ctx, app);
        History.commitStroke(app.doc);
        this.lastPoint = null;
        this.strokePoints = [];
        app.onHistoryChange();
        app.requestRender();
      },

      depositPaint(ctx, x, y, app) {
        const opts = app.getBrushOptions(false);
        const color = opts.colorResolver(x, y, 0, 0);
        BrushEngine.stamp(ctx, x, y, opts.size / 2, opts.hardness * 0.4, color, opts.opacity, opts.flow, false);
      },

      runDrips(ctx, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        const w = layer.canvas.width;
        const h = layer.canvas.height;
        const opts = app.getBrushOptions(false);
        const gravity = app.toolOptions.dripGravity ?? 2.5;
        const wobble = app.toolOptions.dripWobble ?? 2;
        const maxLen = app.toolOptions.dripLength ?? 400;
        const dripsPerPoint = app.toolOptions.dripCount ?? 4;
        const step = Math.max(1, Math.floor(opts.size / 4));

        const points = this.strokePoints.length ? this.strokePoints : [this.lastPoint];
        for (let pi = 0; pi < points.length; pi += step) {
          const pt = points[pi];
          if (!pt) continue;
          for (let d = 0; d < dripsPerPoint; d++) {
            let x = pt.x + (Math.random() - 0.5) * opts.size * 0.6;
            let y = pt.y + Math.random() * opts.size * 0.15;
            let radius = opts.size / 3;
            let color = opts.colorResolver(x, y, 0, 0);
            let carried = BrushEngine.parseColorToRgba(color);

            for (let i = 0; i < maxLen; i++) {
              if (y >= h - 1) break;
              BrushEngine.stamp(ctx, x, y, radius, 0.45, color, opts.opacity * 0.85, 0.95, false);

              const below = BrushEngine.sampleAverageColor(ctx, x, Math.min(h - 1, y + radius * 0.5), radius * 0.7, w, h);
              if (below && below.a > 8) {
                carried = BrushEngine.mixRgba(carried, below, 0.25);
                color = BrushEngine.rgbaToCss(carried);
              }

              x += (Math.random() - 0.5) * wobble;
              y += gravity * (0.7 + Math.random() * 0.6);
              radius = Math.max(1.5, radius * 0.997);

              if (BrushEngine.simpleNoise(x, y, d) > 0.97) {
                x += (Math.random() - 0.5) * opts.size * 0.2;
              }
            }
          }
        }
      },
    };
  }

  function makeEchoTrailTool() {
    return {
      name: "echo-trail",
      cursor: "crosshair",
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
        const pt = { x: e.docX, y: e.docY };
        const opts = app.getBrushOptions(false);
        const echoCount = app.toolOptions.echoCount || 4;
        const echoOffset = app.toolOptions.echoOffset || 8;
        for (let i = echoCount; i >= 0; i--) {
          const t = i / echoCount;
          const ox = (pt.x - this.lastPoint.x) * t * 0.3 + echoOffset * t;
          const oy = (pt.y - this.lastPoint.y) * t * 0.3 + echoOffset * t;
          ctx.save();
          ctx.globalAlpha = opts.opacity * (1 - t * 0.7);
          BrushEngine.drawStroke(ctx, [
            { x: this.lastPoint.x + ox, y: this.lastPoint.y + oy },
            { x: pt.x + ox, y: pt.y + oy },
          ], {
            ...opts,
            colorResolver: () => {
              const [h, s, l] = Palette.hexToHsl(Palette.getState().primary);
              return Palette.hslToHex(h + t * 40, s, l);
            },
          });
          ctx.restore();
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
  }

  function makeSplatterTool() {
    return {
      name: "splatter",
      cursor: "crosshair",
      lastPoint: null,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.spray(ctx, e.docX, e.docY, app);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const pt = { x: e.docX, y: e.docY };
        const opts = app.getBrushOptions(false);
        const spacing = Math.max(4, opts.size * 0.25);
        const dabs = BrushEngine.getDabPoints(this.lastPoint, pt, spacing);
        for (const dab of dabs) {
          this.spray(ctx, dab.x, dab.y, app);
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

      spray(ctx, x, y, app) {
        const opts = app.getBrushOptions(false);
        const count = app.toolOptions.splatterCount || 18;
        const spread = opts.size * 0.9;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * spread;
          const px = x + Math.cos(angle) * dist;
          const py = y + Math.sin(angle) * dist;
          const dotR = Math.random() * opts.size * 0.2 + 2;
          const color = opts.colorResolver(px, py, i, 0);
          BrushEngine.stamp(ctx, px, py, dotR, 0.25, color, opts.opacity, opts.flow, false);
        }
      },
    };
  }

  function makeFlowTrailsTool() {
    return {
      name: "flow-trails",
      cursor: "crosshair",
      lastPoint: null,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.emitTrails(ctx, e.docX, e.docY, app);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const pt = { x: e.docX, y: e.docY };
        const opts = app.getBrushOptions(false);
        const spacing = Math.max(6, opts.size * 0.3);
        const dabs = BrushEngine.getDabPoints(this.lastPoint, pt, spacing);
        for (const dab of dabs) {
          this.emitTrails(ctx, dab.x, dab.y, app);
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

      emitTrails(ctx, sx, sy, app) {
        const count = app.toolOptions.flowTrailParticles || 12;
        const scale = app.toolOptions.fieldScale || 0.02;
        const steps = app.toolOptions.particleSteps || 40;
        const opts = app.getBrushOptions(false);
        for (let p = 0; p < count; p++) {
          let x = sx + (Math.random() - 0.5) * opts.size * 0.4;
          let y = sy + (Math.random() - 0.5) * opts.size * 0.4;
          const color = opts.colorResolver(x, y, p, 0);
          for (let i = 0; i < steps; i++) {
            const angle = Math.sin(x * scale + p) * Math.cos(y * scale + p * 0.6) * Math.PI * 2;
            x += Math.cos(angle) * 2.5;
            y += Math.sin(angle) * 2.5;
            BrushEngine.stamp(ctx, x, y, opts.size / 5, 0.25, color, opts.opacity * 0.65, opts.flow, false);
          }
        }
      },
    };
  }

  function makeCirclePatternTool() {
    return {
      name: "circle-pattern",
      cursor: "crosshair",
      lastPoint: null,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.drawPattern(ctx, e.docX, e.docY, app);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const pt = { x: e.docX, y: e.docY };
        const opts = app.getBrushOptions(false);
        const spacing = Math.max(8, opts.size * 0.55);
        const dabs = BrushEngine.getDabPoints(this.lastPoint, pt, spacing);
        for (const dab of dabs) {
          this.drawPattern(ctx, dab.x, dab.y, app);
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

      createRng(seed) {
        let s = seed >>> 0;
        return {
          next() {
            s = (s + 0x6d2b79f5) >>> 0;
            let t = s;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
          },
          range(min, max) {
            return min + this.next() * (max - min);
          },
          int(min, max) {
            return Math.floor(this.range(min, max + 1));
          },
          pick(arr) {
            return arr[this.int(0, arr.length - 1)];
          },
          chance(p) {
            return this.next() < p;
          },
        };
      },

      drawShape(ctx, x, y, radius, startAngle, endAngle, color, lineWidth, filled, opacity, opts) {
        ctx.save();
        ctx.globalAlpha = opacity * opts.opacity;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(x, y, Math.max(1, radius), startAngle, endAngle);
        if (filled) {
          ctx.lineTo(x, y);
          ctx.closePath();
          ctx.fill();
          if (lineWidth > 0.5) ctx.stroke();
        } else {
          ctx.stroke();
        }
        ctx.restore();
      },

      drawPattern(ctx, originX, originY, app) {
        const opts = app.getBrushOptions(false);
        const complexity = app.toolOptions.circleComplexity ?? 5;
        const region = opts.size * 1.15;
        const seed = ((originX * 7919 + originY * 7877) ^ (Date.now() & 0xffff)) | 0;
        const rng = this.createRng(seed);

        const minCount = complexity <= 2 ? 1 : Math.max(2, Math.floor(complexity * 0.5));
        const maxCount = Math.max(minCount + 1, Math.floor(2 + complexity * complexity * 0.55));
        const elementCount = rng.int(minCount, maxCount);
        const allowFill = complexity >= 3;
        const allowNested = complexity >= 5;
        const allowDashed = complexity >= 7;

        const layouts = ["scatter"];
        if (complexity >= 4) layouts.push("radial");
        if (complexity >= 6) layouts.push("grid", "nested");
        const layout = rng.pick(layouts);

        const centers = [];
        if (layout === "nested") {
          centers.push({ x: originX, y: originY, weight: 1.4 });
          const satellites = rng.int(2, Math.min(6, 2 + Math.floor(complexity / 2)));
          for (let i = 0; i < satellites; i++) {
            const ang = (i / satellites) * Math.PI * 2 + rng.range(-0.3, 0.3);
            const dist = region * rng.range(0.25, 0.65);
            centers.push({
              x: originX + Math.cos(ang) * dist,
              y: originY + Math.sin(ang) * dist,
              weight: rng.range(0.6, 1),
            });
          }
        } else if (layout === "radial") {
          const hubCount = rng.int(1, complexity >= 7 ? 3 : 2);
          for (let h = 0; h < hubCount; h++) {
            const ang = rng.range(0, Math.PI * 2);
            const dist = h === 0 ? 0 : region * rng.range(0.15, 0.45);
            centers.push({
              x: originX + Math.cos(ang) * dist,
              y: originY + Math.sin(ang) * dist,
              weight: 1.1 - h * 0.2,
            });
          }
        } else if (layout === "grid") {
          const cols = rng.int(2, complexity >= 8 ? 4 : 3);
          const rows = rng.int(2, complexity >= 8 ? 4 : 3);
          const cell = (region * 1.6) / Math.max(cols, rows);
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              if (rng.chance(0.25) && complexity < 8) continue;
              centers.push({
                x: originX + (col - (cols - 1) / 2) * cell + rng.range(-cell * 0.15, cell * 0.15),
                y: originY + (row - (rows - 1) / 2) * cell + rng.range(-cell * 0.15, cell * 0.15),
                weight: rng.range(0.5, 1),
              });
            }
          }
        } else {
          centers.push({ x: originX, y: originY, weight: 1 });
        }

        const perCenter = Math.max(1, Math.ceil(elementCount / centers.length));
        let drawn = 0;

        for (const center of centers) {
          const localCount = layout === "nested" && center.weight > 1
            ? rng.int(perCenter, perCenter + Math.floor(complexity * 0.8))
            : rng.int(1, perCenter + 1);

          for (let i = 0; i < localCount && drawn < elementCount + centers.length; i++) {
            drawn++;
            const spread = layout === "scatter" ? region : region * 0.35 * center.weight;
            const px = layout === "scatter"
              ? originX + rng.range(-spread, spread)
              : center.x + rng.range(-spread * 0.35, spread * 0.35);
            const py = layout === "scatter"
              ? originY + rng.range(-spread, spread)
              : center.y + rng.range(-spread * 0.35, spread * 0.35);

            const radius = opts.size * rng.range(0.12, 0.55) * (0.7 + complexity * 0.06) * center.weight;
            const color = opts.colorResolver(px, py, drawn, i);
            const lineWidth = Math.max(1, opts.size * rng.range(0.02, 0.08) * (1 + complexity * 0.05));

            const shapeRoll = rng.next();
            let startAngle = 0;
            let endAngle = Math.PI * 2;
            let filled = false;

            if (complexity <= 2) {
              if (shapeRoll < 0.55) {
                endAngle = Math.PI * 2;
              } else {
                startAngle = rng.range(0, Math.PI * 2);
                endAngle = startAngle + Math.PI * rng.pick([0.5, 1, 1.5]);
              }
            } else if (complexity <= 5) {
              if (shapeRoll < 0.35) {
                endAngle = Math.PI * 2;
                filled = allowFill && rng.chance(0.35);
              } else if (shapeRoll < 0.7) {
                startAngle = rng.range(0, Math.PI * 2);
                endAngle = startAngle + rng.range(Math.PI * 0.35, Math.PI * 1.35);
              } else {
                startAngle = rng.range(0, Math.PI * 2);
                endAngle = startAngle + Math.PI * rng.pick([0.25, 0.5, 0.75, 1]);
              }
            } else {
              if (shapeRoll < 0.2) {
                endAngle = Math.PI * 2;
                filled = allowFill && rng.chance(0.45);
              } else if (shapeRoll < 0.55) {
                startAngle = rng.range(0, Math.PI * 2);
                endAngle = startAngle + rng.range(Math.PI * 0.2, Math.PI * 1.85);
              } else if (shapeRoll < 0.75) {
                startAngle = rng.range(0, Math.PI * 2);
                endAngle = startAngle + Math.PI * rng.pick([0.25, 0.5, 0.75, 1, 1.25, 1.5]);
              } else {
                startAngle = rng.range(0, Math.PI * 2);
                endAngle = startAngle + rng.range(Math.PI * 0.08, Math.PI * 0.45);
              }
            }

            ctx.save();
            if (allowDashed && rng.chance(0.25)) {
              ctx.setLineDash([lineWidth * 2, lineWidth * 1.5]);
            }
            this.drawShape(
              ctx, px, py, radius, startAngle, endAngle, color, lineWidth, filled,
              rng.range(0.45, 0.95), opts
            );
            ctx.restore();

            if (allowNested && rng.chance(0.2 + complexity * 0.02)) {
              const rings = rng.int(2, Math.min(5, 2 + Math.floor(complexity / 3)));
              for (let r = 1; r <= rings; r++) {
                const ringR = radius * (1 - r / (rings + 1));
                const ringColor = opts.colorResolver(px + r, py + r, drawn + r, i);
                const ringStart = startAngle + rng.range(-0.2, 0.2);
                const ringEnd = endAngle - rng.range(0, 0.3);
                this.drawShape(
                  ctx, px, py, ringR, ringStart, ringEnd, ringColor,
                  Math.max(1, lineWidth * 0.65), false, rng.range(0.25, 0.6), opts
                );
              }
            }
          }
        }
      },
    };
  }

  function makeSoftBlobsTool() {
    return {
      name: "soft-blobs",
      cursor: "crosshair",
      lastPoint: null,
      totalDist: 0,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (layer.locked) return;
        History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
        this.lastPoint = { x: e.docX, y: e.docY };
        this.totalDist = 0;
        Palette.resetStrokeDistance();
        this.paintBlob(ctx, e.docX, e.docY, app);
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.lastPoint) return;
        const pt = { x: e.docX, y: e.docY };
        const opts = app.getBrushOptions(false);
        const spacing = Math.max(3, opts.size * 0.35);
        const dabs = BrushEngine.getDabPoints(this.lastPoint, pt, spacing);
        for (const dab of dabs) {
          this.paintBlob(ctx, dab.x, dab.y, app);
          this.totalDist += spacing;
          Palette.addStrokeDistance(spacing);
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

      paintBlob(ctx, x, y, app) {
        const opts = app.getBrushOptions(false);
        const radius = opts.size * 0.65;
        const hardness = app.toolOptions.blobSoftness ?? 0.15;
        const color = opts.colorResolver(x, y, this.totalDist, 0);
        BrushEngine.stamp(ctx, x, y, radius, hardness, color, opts.opacity * 0.75, opts.flow, false);
      },
    };
  }

  return {
    kaleidoscope: makeKaleidoscopeTool(),
    "gradient-flow": makeGradientFlowTool(),
    "noise-smear": makeNoiseSmearTool(),
    "flow-field": makeFlowFieldTool(),
    fractal: makeFractalTool(),
    "echo-trail": makeEchoTrailTool(),
    "color-mixer": makeColorMixerTool(),
    "wet-drip": makeWetDripTool(),
    splatter: makeSplatterTool(),
    "flow-trails": makeFlowTrailsTool(),
    "soft-blobs": makeSoftBlobsTool(),
    "circle-pattern": makeCirclePatternTool(),
  };
})();

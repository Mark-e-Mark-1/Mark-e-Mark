const VectorTools = (() => {
  let draft = null;
  let nodeEdit = { objectId: null, selectedNode: null };
  const snapOpts = { grid: false, objects: true, guides: true, gridSize: 8 };

  function getSelectedId() {
    return VectorSelection.getPrimaryId();
  }

  function setSelectedId(id) {
    VectorSelection.setSingle(id);
  }

  function getSelectedIds() {
    return VectorSelection.getSelectedIds();
  }

  function getDraft() {
    return draft;
  }

  function clearDraft() {
    draft = null;
  }

  function getSnapOpts() {
    return snapOpts;
  }

  function styleOpts(app) {
    const primary = Palette.getState().primary;
    const secondary = Palette.getState().secondary;
    const profileEl = document.getElementById("vec-stroke-profile");
    return {
      stroke: primary,
      fill: app.toolOptions.shapeFill ? secondary : null,
      strokeWidth: Math.max(1, app.toolOptions.brushSize * 0.15),
      strokeProfile: profileEl?.value || app.toolOptions.strokeProfile || "constant",
      opacity: app.toolOptions.opacity ?? 1,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      dash: null,
    };
  }

  function beginHistory(app, layer) {
    History.beginStroke(app.doc, layer.id, DocumentModel.snapshotLayer(layer));
  }

  function commitHistory(app) {
    History.commitStroke(app.doc);
    app.doc.dirty = true;
    app.onHistoryChange?.();
    app.requestRender();
  }

  function getVectorLayer(app) {
    return DocumentModel.ensureActiveVectorLayer(app.doc);
  }

  function selectAfterCreate(id) {
    VectorSelection.setSingle(id);
    appSyncInspector();
  }

  let inspectorSyncFn = null;
  function setInspectorSync(fn) {
    inspectorSyncFn = fn;
  }
  function appSyncInspector() {
    inspectorSyncFn?.();
  }

  function hitHandle(obj, px, py) {
    if (!obj) return null;
    const corners = VectorModel.worldCorners(obj);
    const bounds = VectorModel.worldBounds(obj);
    const cx = bounds.x + bounds.w / 2;
    const rot = { x: cx, y: bounds.y - 22 };
    if (Math.hypot(px - rot.x, py - rot.y) <= 8) return { type: "rotate", cx, cy: bounds.y + bounds.h / 2 };
    const names = ["nw", "ne", "se", "sw"];
    for (let i = 0; i < corners.length; i++) {
      if (Math.hypot(px - corners[i].x, py - corners[i].y) <= 8) {
        return { type: "scale", corner: names[i], cx, cy: bounds.y + bounds.h / 2 };
      }
    }
    return null;
  }

  function boundsIntersect(a, b) {
    return !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y);
  }

  function collectSnapTargets(layer, excludeIds) {
    const targets = { xs: [], ys: [] };
    (layer.objects || []).forEach((obj) => {
      if (excludeIds.has(obj.id)) return;
      const b = VectorModel.worldBounds(obj);
      targets.xs.push(b.x, b.x + b.w / 2, b.x + b.w);
      targets.ys.push(b.y, b.y + b.h / 2, b.y + b.h);
    });
    return targets;
  }

  function snapValue(v, candidates, threshold) {
    let best = null;
    candidates.forEach((c) => {
      const d = Math.abs(v - c);
      if (d <= threshold && (best == null || d < best.d)) best = { v: c, d };
    });
    return best;
  }

  function applySnapToPoint(x, y, layer, excludeIds, docW, docH) {
    const guides = [];
    let nx = x;
    let ny = y;
    const thr = 6;
    if (snapOpts.grid) {
      const g = snapOpts.gridSize || 8;
      nx = Math.round(x / g) * g;
      ny = Math.round(y / g) * g;
      if (nx !== x) guides.push({ type: "v", pos: nx, a: 0, b: docH });
      if (ny !== y) guides.push({ type: "h", pos: ny, a: 0, b: docW });
    }
    if (snapOpts.guides && typeof GuidesManager !== "undefined" && GuidesManager.isEnabled()) {
      const sg = GuidesManager.snapPoint(nx, ny, thr);
      if (sg.x !== nx) {
        nx = sg.x;
        guides.push({ type: "v", pos: nx, a: 0, b: docH });
      }
      if (sg.y !== ny) {
        ny = sg.y;
        guides.push({ type: "h", pos: ny, a: 0, b: docW });
      }
    }
    if (snapOpts.objects) {
      const t = collectSnapTargets(layer, excludeIds);
      const sx = snapValue(nx, t.xs, thr);
      const sy = snapValue(ny, t.ys, thr);
      if (sx) {
        nx = sx.v;
        guides.push({ type: "v", pos: nx, a: 0, b: docH });
      }
      if (sy) {
        ny = sy.v;
        guides.push({ type: "h", pos: ny, a: 0, b: docW });
      }
    }
    VectorSelection.setSnapGuides(guides);
    return { x: nx, y: ny };
  }

  function snapDeltaForBounds(bounds, dx, dy, layer, excludeIds, docW, docH) {
    const edges = {
      l: bounds.x + dx,
      c: bounds.x + bounds.w / 2 + dx,
      r: bounds.x + bounds.w + dx,
      t: bounds.y + dy,
      m: bounds.y + bounds.h / 2 + dy,
      b: bounds.y + bounds.h + dy,
    };
    let adx = dx;
    let ady = dy;
    const guides = [];
    const thr = 6;

    if (snapOpts.grid) {
      const g = snapOpts.gridSize || 8;
      const sl = Math.round(edges.l / g) * g;
      const st = Math.round(edges.t / g) * g;
      adx = sl - bounds.x;
      ady = st - bounds.y;
      guides.push({ type: "v", pos: sl, a: 0, b: docH }, { type: "h", pos: st, a: 0, b: docW });
    }

    if (snapOpts.guides && typeof GuidesManager !== "undefined" && GuidesManager.isEnabled()) {
      const e2 = {
        l: bounds.x + adx,
        c: bounds.x + bounds.w / 2 + adx,
        r: bounds.x + bounds.w + adx,
        t: bounds.y + ady,
        m: bounds.y + bounds.h / 2 + ady,
        b: bounds.y + bounds.h + ady,
      };
      let bestX = null;
      let bestY = null;
      [
        { v: e2.l, side: "l" },
        { v: e2.c, side: "c" },
        { v: e2.r, side: "r" },
      ].forEach((c) => {
        const s = GuidesManager.snapValue(c.v, "v", thr);
        if (s.guide && (!bestX || Math.abs(s.value - c.v) < bestX.d)) {
          bestX = { v: s.value, d: Math.abs(s.value - c.v), from: c.v };
        }
      });
      [
        { v: e2.t, side: "t" },
        { v: e2.m, side: "m" },
        { v: e2.b, side: "b" },
      ].forEach((c) => {
        const s = GuidesManager.snapValue(c.v, "h", thr);
        if (s.guide && (!bestY || Math.abs(s.value - c.v) < bestY.d)) {
          bestY = { v: s.value, d: Math.abs(s.value - c.v), from: c.v };
        }
      });
      if (bestX) {
        adx += bestX.v - bestX.from;
        guides.push({ type: "v", pos: bestX.v, a: 0, b: docH });
      }
      if (bestY) {
        ady += bestY.v - bestY.from;
        guides.push({ type: "h", pos: bestY.v, a: 0, b: docW });
      }
    }

    if (snapOpts.objects) {
      const t = collectSnapTargets(layer, excludeIds);
      const candX = [
        { v: edges.l + (adx - dx), side: "l" },
        { v: edges.c + (adx - dx), side: "c" },
        { v: edges.r + (adx - dx), side: "r" },
      ];
      const candY = [
        { v: edges.t + (ady - dy), side: "t" },
        { v: edges.m + (ady - dy), side: "m" },
        { v: edges.b + (ady - dy), side: "b" },
      ];
      let bestX = null;
      let bestY = null;
      candX.forEach((c) => {
        const s = snapValue(c.v, t.xs, thr);
        if (s && (!bestX || s.d < bestX.d)) bestX = { ...s, side: c.side, from: c.v };
      });
      candY.forEach((c) => {
        const s = snapValue(c.v, t.ys, thr);
        if (s && (!bestY || s.d < bestY.d)) bestY = { ...s, side: c.side, from: c.v };
      });
      if (bestX) {
        adx += bestX.v - bestX.from;
        guides.push({ type: "v", pos: bestX.v, a: 0, b: docH });
      }
      if (bestY) {
        ady += bestY.v - bestY.from;
        guides.push({ type: "h", pos: bestY.v, a: 0, b: docW });
      }
    }

    VectorSelection.setSnapGuides(guides);
    return { dx: adx, dy: ady };
  }

  function makePenTool() {
    return {
      name: "vector-pen",
      cursor: "crosshair",
      drawing: false,
      lastSample: null,

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        draft = {
          type: "path",
          ...opts,
          fill: null,
          closed: false,
          points: [{ x: e.docX, y: e.docY, in: null, out: null }],
          transform: { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 },
        };
        this.drawing = true;
        this.lastSample = { x: e.docX, y: e.docY };
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.drawing || !draft) return;
        const dist = Math.hypot(e.docX - this.lastSample.x, e.docY - this.lastSample.y);
        if (dist < 2) return;
        draft.points.push({ x: e.docX, y: e.docY, in: null, out: null });
        this.lastSample = { x: e.docX, y: e.docY };
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.drawing || !draft) return;
        this.drawing = false;
        if (draft.points.length < 2) {
          draft = null;
          app.requestRender();
          return;
        }
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createPathObject(draft.points, {
          stroke: draft.stroke,
          fill: null,
          strokeWidth: draft.strokeWidth,
          strokeProfile: draft.strokeProfile,
          opacity: draft.opacity,
          strokeLinecap: draft.strokeLinecap,
          strokeLinejoin: draft.strokeLinejoin,
          dash: draft.dash,
          closed: false,
        });
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        commitHistory(app);
        app.updateUI?.();
      },
    };
  }

  function makeBezierTool() {
    return {
      name: "vector-bezier",
      cursor: "crosshair",
      draggingHandle: false,

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        if (!draft || draft.type !== "path" || !draft.editingBezier) {
          draft = {
            type: "path",
            editingBezier: true,
            showAnchors: true,
            ...opts,
            closed: false,
            points: [{ x: e.docX, y: e.docY, in: null, out: null }],
            transform: { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 },
          };
          this.draggingHandle = true;
          this.handlePointIndex = 0;
        } else {
          const first = draft.points[0];
          if (draft.points.length > 2 && Math.hypot(e.docX - first.x, e.docY - first.y) < 10) {
            draft.closed = true;
            this.finish(app);
            return;
          }
          draft.points.push({ x: e.docX, y: e.docY, in: null, out: null });
          this.draggingHandle = true;
          this.handlePointIndex = draft.points.length - 1;
        }
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!draft || !this.draggingHandle) return;
        const p = draft.points[this.handlePointIndex];
        if (!p) return;
        const dx = e.docX - p.x;
        const dy = e.docY - p.y;
        p.out = { x: dx, y: dy };
        p.in = { x: -dx, y: -dy };
        app.requestRender();
      },

      onPointerUp() {
        this.draggingHandle = false;
      },

      finish(app) {
        if (!draft || draft.points.length < 2) {
          draft = null;
          app.requestRender();
          return;
        }
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createPathObject(draft.points, {
          stroke: draft.stroke,
          fill: draft.closed ? draft.fill : null,
          strokeWidth: draft.strokeWidth,
          strokeProfile: draft.strokeProfile,
          opacity: draft.opacity,
          strokeLinecap: draft.strokeLinecap,
          strokeLinejoin: draft.strokeLinejoin,
          dash: draft.dash,
          closed: draft.closed,
        });
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        this.draggingHandle = false;
        commitHistory(app);
        app.updateUI?.();
      },

      cancel(app) {
        draft = null;
        this.draggingHandle = false;
        app.requestRender();
      },
    };
  }

  function makeRectTool() {
    return {
      name: "vector-rect",
      cursor: "crosshair",
      start: null,

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        this.start = { x: e.docX, y: e.docY };
        draft = { type: "rect", x: e.docX, y: e.docY, w: 0, h: 0, ...opts };
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.start || !draft) return;
        draft.x = Math.min(this.start.x, e.docX);
        draft.y = Math.min(this.start.y, e.docY);
        draft.w = Math.abs(e.docX - this.start.x);
        draft.h = Math.abs(e.docY - this.start.y);
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.start || !draft) return;
        if (draft.w < 2 || draft.h < 2) {
          draft = null;
          this.start = null;
          app.requestRender();
          return;
        }
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createRectObject(draft.x, draft.y, draft.w, draft.h, draft);
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        this.start = null;
        commitHistory(app);
        app.updateUI?.();
      },
    };
  }

  function makeSelectTool() {
    return {
      name: "vector-select",
      cursor: "default",
      mode: null,
      start: null,
      origins: null,
      handle: null,
      groupBounds: null,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (!DocumentModel.isVectorLayer(layer) || layer.locked) {
          VectorSelection.clear();
          appSyncInspector();
          app.requestRender();
          return;
        }
        this.historyStarted = false;
        this.moved = false;
        VectorSelection.setMarquee(null);
        VectorSelection.setSnapGuides([]);

        const primary = VectorSelection.getPrimaryId()
          ? VectorModel.findObject(layer, VectorSelection.getPrimaryId())
          : null;
        if (primary && VectorSelection.getSelectedIds().length) {
          const handle = hitHandle(primary, e.docX, e.docY);
          if (handle) {
            beginHistory(app, layer);
            this.historyStarted = true;
            this.mode = handle.type;
            this.handle = handle;
            this.start = { x: e.docX, y: e.docY };
            this.origins = {};
            VectorSelection.getSelectedIds().forEach((id) => {
              const o = VectorModel.findObject(layer, id);
              if (o) this.origins[id] = { ...o.transform };
            });
            const objs = VectorSelection.getSelectedIds()
              .map((id) => VectorModel.findObject(layer, id))
              .filter(Boolean);
            this.groupBounds = VectorModel.unionBounds(objs.map((o) => VectorModel.worldBounds(o)));
            this.startAngle = Math.atan2(e.docY - handle.cy, e.docX - handle.cx);
            return;
          }
        }

        const hit = VectorModel.hitTestLayer(layer, e.docX, e.docY, 8);
        if (hit) {
          if (VectorSelection.isSelected(hit.id) && hit.type === "text" && e.detail === 2) {
            editSelectedText(app, hit);
            this.mode = null;
            app.requestRender();
            return;
          }
          if (e.shiftKey) {
            VectorSelection.toggle(hit.id);
          } else if (!VectorSelection.isSelected(hit.id)) {
            VectorSelection.setSingle(hit.id);
          } else {
            VectorSelection.setSelectedIds(VectorSelection.getSelectedIds(), hit.id);
          }
          this.mode = "move";
          this.start = { x: e.docX, y: e.docY };
          this.origins = {};
          VectorSelection.getSelectedIds().forEach((id) => {
            const o = VectorModel.findObject(layer, id);
            if (o) this.origins[id] = { ...o.transform };
          });
          const objs = VectorSelection.getSelectedIds()
            .map((id) => VectorModel.findObject(layer, id))
            .filter(Boolean);
          this.groupBounds = VectorModel.unionBounds(objs.map((o) => VectorModel.worldBounds(o)));
          appSyncInspector();
        } else {
          if (!e.shiftKey) VectorSelection.clear();
          this.mode = "marquee";
          this.start = { x: e.docX, y: e.docY };
          VectorSelection.setMarquee({ x0: e.docX, y0: e.docY, x1: e.docX, y1: e.docY });
          appSyncInspector();
        }
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.mode || !this.start) return;
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (!DocumentModel.isVectorLayer(layer)) return;

        if (this.mode === "marquee") {
          VectorSelection.setMarquee({ x0: this.start.x, y0: this.start.y, x1: e.docX, y1: e.docY });
          app.requestRender();
          return;
        }

        if (this.mode === "move" && !this.historyStarted) {
          if (Math.hypot(e.docX - this.start.x, e.docY - this.start.y) < 2) return;
          beginHistory(app, layer);
          this.historyStarted = true;
        }

        this.moved = true;
        const ids = VectorSelection.getSelectedIds();
        const exclude = new Set(ids);

        if (this.mode === "move") {
          let dx = e.docX - this.start.x;
          let dy = e.docY - this.start.y;
          if (this.groupBounds) {
            const snapped = snapDeltaForBounds(
              this.groupBounds,
              dx,
              dy,
              layer,
              exclude,
              app.doc.width,
              app.doc.height
            );
            dx = snapped.dx;
            dy = snapped.dy;
          }
          ids.forEach((id) => {
            const obj = VectorModel.findObject(layer, id);
            const origin = this.origins[id];
            if (!obj || !origin) return;
            obj.transform.tx = origin.tx + dx;
            obj.transform.ty = origin.ty + dy;
          });
        } else if (this.mode === "scale") {
          const b = this.groupBounds;
          const cx = b.x + b.w / 2;
          const cy = b.y + b.h / 2;
          const ox = Math.max(8, Math.abs(this.start.x - cx));
          const oy = Math.max(8, Math.abs(this.start.y - cy));
          const nx = Math.max(8, Math.abs(e.docX - cx));
          const ny = Math.max(8, Math.abs(e.docY - cy));
          const sx = nx / ox;
          const sy = ny / oy;
          ids.forEach((id) => {
            const obj = VectorModel.findObject(layer, id);
            const origin = this.origins[id];
            if (!obj || !origin) return;
            obj.transform.sx = origin.sx * sx;
            obj.transform.sy = origin.sy * sy;
            obj.transform.tx = origin.tx;
            obj.transform.ty = origin.ty;
            obj.transform.rotation = origin.rotation;
            const after = VectorModel.worldBounds(obj);
            // Keep each object's center relative to group center roughly — re-apply from origin then adjust group
          });
          // Re-center group
          const objs = ids.map((id) => VectorModel.findObject(layer, id)).filter(Boolean);
          const afterGroup = VectorModel.unionBounds(objs.map((o) => VectorModel.worldBounds(o)));
          const gdx = cx - (afterGroup.x + afterGroup.w / 2);
          const gdy = cy - (afterGroup.y + afterGroup.h / 2);
          objs.forEach((obj) => {
            obj.transform.tx += gdx;
            obj.transform.ty += gdy;
          });
        } else if (this.mode === "rotate") {
          const angle = Math.atan2(e.docY - this.handle.cy, e.docX - this.handle.cx);
          const delta = angle - this.startAngle;
          const cx = this.handle.cx;
          const cy = this.handle.cy;
          ids.forEach((id) => {
            const obj = VectorModel.findObject(layer, id);
            const origin = this.origins[id];
            if (!obj || !origin) return;
            obj.transform.rotation = origin.rotation + delta;
            obj.transform.tx = origin.tx;
            obj.transform.ty = origin.ty;
            obj.transform.sx = origin.sx;
            obj.transform.sy = origin.sy;
            // Rotate object center around group pivot
            const ob = VectorModel.worldBounds({
              ...obj,
              transform: origin,
            });
            const ocx = ob.x + ob.w / 2;
            const ocy = ob.y + ob.h / 2;
            const cos = Math.cos(delta);
            const sin = Math.sin(delta);
            const rx = ocx - cx;
            const ry = ocy - cy;
            const ncx = cx + rx * cos - ry * sin;
            const ncy = cy + rx * sin + ry * cos;
            const nb = VectorModel.worldBounds(obj);
            obj.transform.tx += ncx - (nb.x + nb.w / 2);
            obj.transform.ty += ncy - (nb.y + nb.h / 2);
          });
        }

        layer.cacheDirty = true;
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (this.mode === "marquee" && DocumentModel.isVectorLayer(layer)) {
          const m = VectorSelection.getMarquee();
          if (m) {
            const box = {
              x: Math.min(m.x0, m.x1),
              y: Math.min(m.y0, m.y1),
              w: Math.abs(m.x1 - m.x0),
              h: Math.abs(m.y1 - m.y0),
            };
            if (box.w > 2 || box.h > 2) {
              const ids = (layer.objects || [])
                .filter((obj) => boundsIntersect(VectorModel.worldBounds(obj), box))
                .map((o) => o.id);
              if (e.shiftKey) {
                const merged = new Set([...VectorSelection.getSelectedIds(), ...ids]);
                VectorSelection.setSelectedIds([...merged]);
              } else {
                VectorSelection.setSelectedIds(ids);
              }
              appSyncInspector();
            }
          }
          VectorSelection.setMarquee(null);
          this.mode = null;
          this.start = null;
          app.requestRender();
          return;
        }

        if (!this.mode) return;
        VectorSelection.setSnapGuides([]);
        if (this.historyStarted && this.moved) {
          commitHistory(app);
        } else if (this.historyStarted) {
          History.cancelStroke(app.doc);
        }
        this.mode = null;
        this.start = null;
        this.handle = null;
        this.origins = null;
        this.historyStarted = false;
        this.moved = false;
        appSyncInspector();
        app.requestRender();
      },

      deleteSelected(app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        const ids = VectorSelection.getSelectedIds();
        if (!DocumentModel.isVectorLayer(layer) || !ids.length || layer.locked) return;
        beginHistory(app, layer);
        ids.forEach((id) => DocumentModel.removeVectorObject(layer, id));
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        VectorSelection.clear();
        commitHistory(app);
        appSyncInspector();
        app.updateUI?.();
      },
    };
  }

  function makeNodeTool() {
    return {
      name: "vector-node",
      cursor: "default",
      dragging: null,
      breakHandles: false,

      onPointerDown(ctx, e, app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (!DocumentModel.isVectorLayer(layer) || layer.locked) return;
        this.breakHandles = !!e.altKey;
        this.historyStarted = false;
        this.moved = false;

        let obj = null;
        if (nodeEdit.objectId) obj = VectorModel.findObject(layer, nodeEdit.objectId);

        if (obj && obj.type === "path") {
          const hit = VectorModel.hitTestNode(obj, e.docX, e.docY, 8);
          if (hit) {
            nodeEdit.selectedNode = hit;
            this.dragging = { ...hit };
            beginHistory(app, layer);
            this.historyStarted = true;
            app.requestRender();
            return;
          }
          if (e.detail === 2) {
            const seg = VectorModel.hitTestSegment(obj, e.docX, e.docY, 8);
            if (seg) {
              beginHistory(app, layer);
              const idx = VectorModel.insertNodeOnSegment(obj, seg);
              nodeEdit.selectedNode = { kind: "anchor", index: idx };
              layer.cacheDirty = true;
              VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
              commitHistory(app);
              app.requestRender();
              return;
            }
          }
        }

        const hitObj = VectorModel.hitTestLayer(layer, e.docX, e.docY, 8);
        if (hitObj && hitObj.type !== "text") {
          beginHistory(app, layer);
          const path = VectorModel.ensurePathObject(layer, hitObj);
          if (!path) {
            History.cancelStroke(app.doc);
            return;
          }
          layer.cacheDirty = true;
          VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
          commitHistory(app);
          nodeEdit.objectId = path.id;
          nodeEdit.selectedNode = null;
          VectorSelection.setSingle(path.id);
          appSyncInspector();
        } else {
          nodeEdit.objectId = null;
          nodeEdit.selectedNode = null;
        }
        this.dragging = null;
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.dragging) return;
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (!DocumentModel.isVectorLayer(layer)) return;
        const obj = VectorModel.findObject(layer, nodeEdit.objectId);
        if (!obj || obj.type !== "path") return;
        const local = VectorModel.inverseTransformPoint(e.docX, e.docY, obj.transform);
        let lx = local.x;
        let ly = local.y;
        if (snapOpts.grid || snapOpts.objects) {
          const w = VectorModel.applyTransformPoint(lx, ly, obj.transform);
          const snapped = applySnapToPoint(
            w.x,
            w.y,
            layer,
            new Set([obj.id]),
            app.doc.width,
            app.doc.height
          );
          const back = VectorModel.inverseTransformPoint(snapped.x, snapped.y, obj.transform);
          lx = back.x;
          ly = back.y;
        }
        const p = obj.points[this.dragging.index];
        if (!p) return;
        this.moved = true;
        if (this.dragging.kind === "anchor") {
          const dx = lx - p.x;
          const dy = ly - p.y;
          p.x = lx;
          p.y = ly;
        } else if (this.dragging.kind === "out") {
          p.out = { x: lx - p.x, y: ly - p.y };
          if (!this.breakHandles && !e.altKey) {
            p.in = { x: -p.out.x, y: -p.out.y };
          }
        } else if (this.dragging.kind === "in") {
          p.in = { x: lx - p.x, y: ly - p.y };
          if (!this.breakHandles && !e.altKey) {
            p.out = { x: -p.in.x, y: -p.in.y };
          }
        }
        layer.cacheDirty = true;
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        VectorSelection.setSnapGuides([]);
        if (this.historyStarted && this.moved) commitHistory(app);
        else if (this.historyStarted) History.cancelStroke(app.doc);
        this.dragging = null;
        this.historyStarted = false;
        this.moved = false;
        app.requestRender();
      },

      deleteSelectedNode(app) {
        const layer = DocumentModel.getActiveLayer(app.doc);
        if (!DocumentModel.isVectorLayer(layer) || !nodeEdit.objectId || !nodeEdit.selectedNode) return;
        if (nodeEdit.selectedNode.kind !== "anchor") return;
        const obj = VectorModel.findObject(layer, nodeEdit.objectId);
        if (!obj) return;
        beginHistory(app, layer);
        const ok = VectorModel.removeNode(obj, nodeEdit.selectedNode.index);
        if (!ok) {
          History.cancelStroke(app.doc);
          return;
        }
        nodeEdit.selectedNode = null;
        layer.cacheDirty = true;
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        commitHistory(app);
      },
    };
  }

  function makePolygonTool() {
    return {
      name: "vector-polygon",
      cursor: "crosshair",

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        if (!draft || draft.type !== "path" || !draft.editingPolygon) {
          draft = {
            type: "path",
            editingPolygon: true,
            showAnchors: true,
            ...opts,
            closed: false,
            points: [{ x: e.docX, y: e.docY, in: null, out: null }],
            transform: { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 },
          };
        } else {
          const first = draft.points[0];
          if (draft.points.length > 2 && Math.hypot(e.docX - first.x, e.docY - first.y) < 10) {
            draft.closed = true;
            this.finish(app, true);
            return;
          }
          draft.points.push({ x: e.docX, y: e.docY, in: null, out: null });
        }
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove() {},
      onPointerUp() {},

      finish(app, forceClosed) {
        if (!draft || draft.points.length < 2) {
          draft = null;
          app.requestRender();
          return;
        }
        const closed = forceClosed || !!draft.closed;
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createPathObject(draft.points, {
          stroke: draft.stroke,
          fill: closed ? draft.fill : null,
          strokeWidth: draft.strokeWidth,
          strokeProfile: draft.strokeProfile,
          opacity: draft.opacity,
          strokeLinecap: draft.strokeLinecap,
          strokeLinejoin: draft.strokeLinejoin,
          dash: draft.dash,
          closed,
        });
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        commitHistory(app);
        app.updateUI?.();
      },

      cancel(app) {
        draft = null;
        app.requestRender();
      },
    };
  }

  function makeEllipseTool() {
    return {
      name: "vector-ellipse",
      cursor: "crosshair",
      start: null,

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        this.start = { x: e.docX, y: e.docY };
        draft = { type: "ellipse", x: e.docX, y: e.docY, w: 0, h: 0, ...opts };
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.start || !draft) return;
        draft.x = Math.min(this.start.x, e.docX);
        draft.y = Math.min(this.start.y, e.docY);
        draft.w = Math.abs(e.docX - this.start.x);
        draft.h = Math.abs(e.docY - this.start.y);
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.start || !draft) return;
        if (draft.w < 2 || draft.h < 2) {
          draft = null;
          this.start = null;
          app.requestRender();
          return;
        }
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createEllipseObject(draft.x, draft.y, draft.w, draft.h, draft);
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        this.start = null;
        commitHistory(app);
        app.updateUI?.();
      },
    };
  }

  function makeLineTool() {
    return {
      name: "vector-line",
      cursor: "crosshair",
      start: null,

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        this.start = { x: e.docX, y: e.docY };
        draft = {
          type: "line",
          x1: e.docX,
          y1: e.docY,
          x2: e.docX,
          y2: e.docY,
          stroke: opts.stroke,
          strokeWidth: opts.strokeWidth,
          strokeProfile: opts.strokeProfile,
          opacity: opts.opacity,
          strokeLinecap: opts.strokeLinecap,
          dash: opts.dash,
        };
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.start || !draft) return;
        draft.x2 = e.docX;
        draft.y2 = e.docY;
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.start || !draft) return;
        if (Math.hypot(draft.x2 - draft.x1, draft.y2 - draft.y1) < 2) {
          draft = null;
          this.start = null;
          app.requestRender();
          return;
        }
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createLineObject(draft.x1, draft.y1, draft.x2, draft.y2, draft);
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        this.start = null;
        commitHistory(app);
        app.updateUI?.();
      },
    };
  }

  function makeTextTool() {
    return {
      name: "vector-text",
      cursor: "text",

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        openTextEditor({
          text: "Text",
          fontWeight: app.toolOptions.vectorFontWeight || "normal",
          textAlign: app.toolOptions.vectorTextAlign || "left",
          fontFamily: app.toolOptions.vectorFontFamily || "Georgia, 'Times New Roman', serif",
        }).then((result) => {
          if (!result || !String(result.text).trim()) return;
          beginHistory(app, layer);
          const fontSize = Math.max(10, Math.round(app.toolOptions.brushSize * 1.5));
          const obj = VectorModel.createTextObject(e.docX, e.docY, result.text, {
            fill: opts.stroke,
            opacity: opts.opacity,
            fontSize,
            fontWeight: result.fontWeight,
            textAlign: result.textAlign,
            fontFamily: result.fontFamily,
            lineHeight: result.lineHeight,
          });
          DocumentModel.addVectorObject(layer, obj);
          VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
          selectAfterCreate(obj.id);
          commitHistory(app);
          app.updateUI?.();
        });
      },

      onPointerMove() {},
      onPointerUp() {},
    };
  }

  function openTextEditor(seed = {}) {
    return new Promise((resolve) => {
      const dialog = document.getElementById("text-edit-dialog");
      const form = document.getElementById("text-edit-form");
      const area = document.getElementById("text-edit-content");
      const weight = document.getElementById("text-edit-weight");
      const align = document.getElementById("text-edit-align");
      const family = document.getElementById("text-edit-family");
      const cancel = document.getElementById("text-edit-cancel");
      if (!dialog || !form || !area) {
        const fallback = window.prompt("Enter text (use \\n for new lines):", seed.text || "Text");
        if (fallback == null) return resolve(null);
        resolve({
          text: fallback.replace(/\\n/g, "\n"),
          fontWeight: seed.fontWeight || "normal",
          textAlign: seed.textAlign || "left",
          fontFamily: seed.fontFamily,
          lineHeight: seed.lineHeight ?? 1.25,
        });
        return;
      }
      area.value = seed.text || "Text";
      if (weight) weight.value = seed.fontWeight || "normal";
      if (align) align.value = seed.textAlign || "left";
      if (family) family.value = seed.fontFamily || family.value;
      const onSubmit = (ev) => {
        ev.preventDefault();
        cleanup();
        dialog.close();
        resolve({
          text: area.value,
          fontWeight: weight ? weight.value : "normal",
          textAlign: align ? align.value : "left",
          fontFamily: family ? family.value : seed.fontFamily,
          lineHeight: seed.lineHeight ?? 1.25,
        });
      };
      const onCancel = () => {
        cleanup();
        dialog.close();
        resolve(null);
      };
      const onClose = () => {
        cleanup();
        resolve(null);
      };
      function cleanup() {
        form.removeEventListener("submit", onSubmit);
        cancel?.removeEventListener("click", onCancel);
        dialog.removeEventListener("close", onClose);
      }
      form.addEventListener("submit", onSubmit);
      cancel?.addEventListener("click", onCancel);
      dialog.addEventListener("close", onClose);
      dialog.showModal();
      area.focus();
      area.select();
    });
  }

  function editSelectedText(app, obj) {
    if (!obj || obj.type !== "text") return;
    const layer = DocumentModel.getActiveLayer(app.doc);
    openTextEditor({
      text: obj.text,
      fontWeight: obj.fontWeight,
      textAlign: obj.textAlign,
      fontFamily: obj.fontFamily,
      lineHeight: obj.lineHeight,
    }).then((result) => {
      if (!result) return;
      beginHistory(app, layer);
      VectorModel.applyTextProps(obj, result);
      layer.cacheDirty = true;
      VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
      commitHistory(app);
      appSyncInspector();
      app.updateUI?.();
    });
  }

  function applyTextPropsToSelection(app, props) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || !ids.length || layer.locked) return;
    beginHistory(app, layer);
    ids.forEach((id) => {
      const obj = VectorModel.findObject(layer, id);
      if (obj?.type === "text") VectorModel.applyTextProps(obj, props);
    });
    layer.cacheDirty = true;
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    commitHistory(app);
  }

  function attachTextToPath(app) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || ids.length < 2 || layer.locked) {
      app.setStatus?.("Select text + a path/shape, then Attach to Path.");
      return;
    }
    const objs = ids.map((id) => VectorModel.findObject(layer, id)).filter(Boolean);
    const textObj = objs.find((o) => o.type === "text");
    const pathCandidate = [...objs].reverse().find((o) => o !== textObj && o.type !== "text") || null;
    if (!textObj || !pathCandidate) {
      app.setStatus?.("Need one text object and one path/shape selected.");
      return;
    }
    beginHistory(app, layer);
    textObj.pathId = pathCandidate.id;
    textObj.pathOffset = 0;
    layer.cacheDirty = true;
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    commitHistory(app);
    appSyncInspector();
    app.setStatus?.("Text attached to path.");
  }

  function detachTextFromPath(app) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || !ids.length || layer.locked) return;
    beginHistory(app, layer);
    ids.forEach((id) => {
      const obj = VectorModel.findObject(layer, id);
      if (obj?.type === "text") {
        obj.pathId = null;
        obj.pathOffset = 0;
      }
    });
    layer.cacheDirty = true;
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    commitHistory(app);
    appSyncInspector();
  }

  function groupSelection(app) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || ids.length < 2 || layer.locked) {
      app.setStatus?.("Select 2+ objects to group.");
      return;
    }
    beginHistory(app, layer);
    const selected = [];
    const remaining = [];
    (layer.objects || []).forEach((o) => {
      if (ids.includes(o.id)) selected.push(o);
      else remaining.push(o);
    });
    if (selected.length < 2) {
      History.cancelStroke(app.doc);
      return;
    }
    // Preserve relative z-order
    selected.sort((a, b) => layer.objects.indexOf(a) - layer.objects.indexOf(b));
    const group = VectorModel.createGroupObject(selected);
    layer.objects = [...remaining, group];
    layer.cacheDirty = true;
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    VectorSelection.setSingle(group.id);
    commitHistory(app);
    appSyncInspector();
    app.setStatus?.("Grouped " + selected.length + " objects.");
  }

  function ungroupSelection(app) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || !ids.length || layer.locked) return;
    beginHistory(app, layer);
    const newIds = [];
    const next = [];
    let changed = false;
    (layer.objects || []).forEach((o) => {
      if (ids.includes(o.id) && o.type === "group") {
        const kids = VectorModel.bakeGroupToChildren(o);
        kids.forEach((k) => {
          next.push(k);
          newIds.push(k.id);
        });
        changed = true;
      } else {
        next.push(o);
      }
    });
    if (!changed) {
      History.cancelStroke(app.doc);
      app.setStatus?.("Select a group to ungroup.");
      return;
    }
    layer.objects = next;
    layer.cacheDirty = true;
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    VectorSelection.setSelectedIds(newIds);
    commitHistory(app);
    appSyncInspector();
    app.setStatus?.("Ungrouped.");
  }

  function applyAppearanceToSelection(app, props) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || !ids.length || layer.locked) return;
    beginHistory(app, layer);
    ids.forEach((id) => {
      const obj = VectorModel.findObject(layer, id);
      if (obj) VectorModel.applyAppearance(obj, props);
    });
    layer.cacheDirty = true;
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    commitHistory(app);
  }

  let vectorClipboard = [];

  function copySelection(app) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || !ids.length) return false;
    vectorClipboard = ids
      .map((id) => VectorModel.findObject(layer, id))
      .filter(Boolean)
      .map((o) => JSON.parse(JSON.stringify(o)));
    app.setStatus?.(vectorClipboard.length + " object(s) copied");
    return true;
  }

  function pasteClipboard(app, offset = 16) {
    if (!vectorClipboard.length) {
      app.setStatus?.("Clipboard empty");
      return false;
    }
    const layer = getVectorLayer(app);
    if (layer.locked) return false;
    beginHistory(app, layer);
    const newIds = [];
    vectorClipboard.forEach((src) => {
      const obj = VectorModel.cloneObject(src);
      VectorModel.translateObject(obj, offset, offset);
      DocumentModel.addVectorObject(layer, obj);
      newIds.push(obj.id);
    });
    // Offset clipboard so next paste stacks
    vectorClipboard = vectorClipboard.map((src) => {
      const o = JSON.parse(JSON.stringify(src));
      o.transform = o.transform || { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 };
      o.transform.tx = (o.transform.tx || 0) + offset;
      o.transform.ty = (o.transform.ty || 0) + offset;
      return o;
    });
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    VectorSelection.setSelectedIds(newIds);
    commitHistory(app);
    appSyncInspector();
    app.updateUI?.();
    return true;
  }

  function duplicateSelection(app) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || !ids.length || layer.locked) return false;
    beginHistory(app, layer);
    const newIds = [];
    ids.forEach((id) => {
      const src = VectorModel.findObject(layer, id);
      if (!src) return;
      const obj = VectorModel.cloneObject(src);
      VectorModel.translateObject(obj, 16, 16);
      DocumentModel.addVectorObject(layer, obj);
      newIds.push(obj.id);
    });
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    VectorSelection.setSelectedIds(newIds);
    commitHistory(app);
    appSyncInspector();
    app.updateUI?.();
    return true;
  }

  function reorderSelection(app, mode) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || !ids.length || layer.locked) return;
    beginHistory(app, layer);
    const ok = VectorModel.reorderVectorObjects(layer, ids, mode);
    if (!ok) {
      History.cancelStroke(app.doc);
      return;
    }
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    commitHistory(app);
    app.setStatus?.("Z-order: " + mode);
  }

  function alignSelection(app, mode) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || ids.length < 2 || layer.locked) return;
    beginHistory(app, layer);
    const objs = ids.map((id) => VectorModel.findObject(layer, id)).filter(Boolean);
    VectorModel.alignObjects(objs, mode);
    layer.cacheDirty = true;
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    commitHistory(app);
  }

  function distributeSelection(app, axis) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || ids.length < 3 || layer.locked) return;
    beginHistory(app, layer);
    const objs = ids.map((id) => VectorModel.findObject(layer, id)).filter(Boolean);
    VectorModel.distributeObjects(objs, axis);
    layer.cacheDirty = true;
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    commitHistory(app);
  }

  function booleanSelection(app, op) {
    const layer = DocumentModel.getActiveLayer(app.doc);
    const ids = VectorSelection.getSelectedIds();
    if (!DocumentModel.isVectorLayer(layer) || ids.length < 2 || layer.locked) {
      app.setStatus?.("Select 2+ closed shapes for boolean ops.");
      return;
    }
    // Order by z-index (layer order)
    const ordered = (layer.objects || []).filter((o) => ids.includes(o.id));
    const result = VectorBoolean.run(op, ordered);
    if (!result.ok) {
      app.setStatus?.(result.message);
      return;
    }
    beginHistory(app, layer);
    result.removeIds.forEach((id) => DocumentModel.removeVectorObject(layer, id));
    const newIds = [];
    result.objects.forEach((obj) => {
      DocumentModel.addVectorObject(layer, obj);
      newIds.push(obj.id);
    });
    VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
    VectorSelection.setSelectedIds(newIds);
    commitHistory(app);
    appSyncInspector();
    app.setStatus?.("Boolean " + op + " applied.");
    app.updateUI?.();
  }

  function makePencilTool() {
    return {
      name: "vector-pencil",
      cursor: "crosshair",
      drawing: false,
      lastSample: null,

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        draft = {
          type: "path",
          pencil: true,
          ...opts,
          fill: null,
          closed: false,
          points: [{ x: e.docX, y: e.docY, in: null, out: null }],
          transform: { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 },
        };
        this.drawing = true;
        this.lastSample = { x: e.docX, y: e.docY };
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.drawing || !draft) return;
        const dist = Math.hypot(e.docX - this.lastSample.x, e.docY - this.lastSample.y);
        if (dist < 1.5) return;
        draft.points.push({ x: e.docX, y: e.docY, in: null, out: null });
        this.lastSample = { x: e.docX, y: e.docY };
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.drawing || !draft) return;
        this.drawing = false;
        if (draft.points.length < 2) {
          draft = null;
          app.requestRender();
          return;
        }
        const smoothIters = app.toolOptions.vectorPencilSmooth ?? 2;
        const smoothed = VectorModel.smoothPolyline(draft.points, smoothIters);
        const pathPts = VectorModel.polylineToSmoothPath(smoothed, false);
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createPathObject(pathPts, {
          stroke: draft.stroke,
          fill: null,
          strokeWidth: draft.strokeWidth,
          strokeProfile: draft.strokeProfile,
          opacity: draft.opacity,
          strokeLinecap: draft.strokeLinecap,
          strokeLinejoin: draft.strokeLinejoin,
          dash: draft.dash,
          closed: false,
        });
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        commitHistory(app);
        app.updateUI?.();
      },
    };
  }

  function makeRoundRectTool() {
    return {
      name: "vector-roundrect",
      cursor: "crosshair",
      start: null,

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        this.start = { x: e.docX, y: e.docY };
        draft = {
          type: "roundRect",
          x: e.docX,
          y: e.docY,
          w: 0,
          h: 0,
          rx: app.toolOptions.vectorCornerRadius ?? 16,
          ...opts,
        };
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.start || !draft) return;
        draft.x = Math.min(this.start.x, e.docX);
        draft.y = Math.min(this.start.y, e.docY);
        draft.w = Math.abs(e.docX - this.start.x);
        draft.h = Math.abs(e.docY - this.start.y);
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.start || !draft) return;
        if (draft.w < 2 || draft.h < 2) {
          draft = null;
          this.start = null;
          app.requestRender();
          return;
        }
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createRoundRectObject(draft.x, draft.y, draft.w, draft.h, draft.rx, draft);
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        this.start = null;
        commitHistory(app);
        app.updateUI?.();
      },
    };
  }

  function makeStarTool() {
    return {
      name: "vector-star",
      cursor: "crosshair",
      start: null,

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        this.start = { x: e.docX, y: e.docY };
        draft = {
          type: "star",
          cx: e.docX,
          cy: e.docY,
          outerR: 0,
          innerR: 0,
          tips: app.toolOptions.vectorStarTips ?? 5,
          ...opts,
        };
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.start || !draft) return;
        const r = Math.hypot(e.docX - this.start.x, e.docY - this.start.y);
        draft.cx = this.start.x;
        draft.cy = this.start.y;
        draft.outerR = r;
        draft.innerR = r * (app.toolOptions.vectorStarInner ?? 0.45);
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.start || !draft) return;
        if (draft.outerR < 2) {
          draft = null;
          this.start = null;
          app.requestRender();
          return;
        }
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createStarObject(
          draft.cx,
          draft.cy,
          draft.outerR,
          draft.innerR,
          draft.tips,
          draft
        );
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        this.start = null;
        commitHistory(app);
        app.updateUI?.();
      },
    };
  }

  function makeRegPolyTool() {
    return {
      name: "vector-regpoly",
      cursor: "crosshair",
      start: null,

      onPointerDown(ctx, e, app) {
        const layer = getVectorLayer(app);
        if (layer.locked) return;
        app.doc.activeLayerId = layer.id;
        const opts = styleOpts(app);
        this.start = { x: e.docX, y: e.docY };
        draft = {
          type: "regpoly",
          cx: e.docX,
          cy: e.docY,
          radius: 0,
          sides: app.toolOptions.vectorPolySides ?? 6,
          ...opts,
        };
        VectorSelection.clear();
        app.requestRender();
      },

      onPointerMove(ctx, e, app) {
        if (!this.start || !draft) return;
        draft.cx = this.start.x;
        draft.cy = this.start.y;
        draft.radius = Math.hypot(e.docX - this.start.x, e.docY - this.start.y);
        app.requestRender();
      },

      onPointerUp(ctx, e, app) {
        if (!this.start || !draft) return;
        if (draft.radius < 2) {
          draft = null;
          this.start = null;
          app.requestRender();
          return;
        }
        const layer = getVectorLayer(app);
        beginHistory(app, layer);
        const obj = VectorModel.createRegularPolygonObject(
          draft.cx,
          draft.cy,
          draft.radius,
          draft.sides,
          draft
        );
        DocumentModel.addVectorObject(layer, obj);
        VectorRender.ensureCache(layer, app.doc.width, app.doc.height);
        selectAfterCreate(obj.id);
        draft = null;
        this.start = null;
        commitHistory(app);
        app.updateUI?.();
      },
    };
  }

  const pen = makePenTool();
  const pencil = makePencilTool();
  const bezier = makeBezierTool();
  const vectorRect = makeRectTool();
  const vectorRoundRect = makeRoundRectTool();
  const vectorStar = makeStarTool();
  const vectorRegPoly = makeRegPolyTool();
  const vectorSelect = makeSelectTool();
  const vectorNode = makeNodeTool();
  const vectorPolygon = makePolygonTool();
  const vectorEllipse = makeEllipseTool();
  const vectorLine = makeLineTool();
  const vectorText = makeTextTool();

  function drawOverlay(ctx, app) {
    if (draft) VectorRender.drawDraftOverlay(ctx, draft);
    const layer = DocumentModel.getActiveLayer(app.doc);
    if (!DocumentModel.isVectorLayer(layer)) return;

    const ids = VectorSelection.getSelectedIds();
    if (ids.length && app.activeTool === "vector-select") {
      const objs = ids.map((id) => VectorModel.findObject(layer, id)).filter(Boolean);
      VectorRender.drawMultiSelectionOverlay(ctx, objs, VectorSelection.getPrimaryId());
    } else if (ids.length === 1 && app.activeTool !== "vector-node") {
      const obj = VectorModel.findObject(layer, ids[0]);
      if (obj) VectorRender.drawSelectionOverlay(ctx, obj);
    }

    if (app.activeTool === "vector-node" && nodeEdit.objectId) {
      const obj = VectorModel.findObject(layer, nodeEdit.objectId);
      if (obj) {
        VectorRender.drawSelectionOverlay(ctx, obj, { withHandles: false });
        VectorRender.drawNodeOverlay(ctx, obj, nodeEdit.selectedNode);
      }
    }

    VectorRender.drawMarquee(ctx, VectorSelection.getMarquee());
    VectorRender.drawSnapGuides(ctx, VectorSelection.getSnapGuides());
  }

  function handleKey(e, app) {
    if (app.activeTool === "vector-bezier") {
      if (e.key === "Enter") {
        e.preventDefault();
        bezier.finish(app);
        return true;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        bezier.cancel(app);
        return true;
      }
    }
    if (app.activeTool === "vector-polygon") {
      if (e.key === "Enter") {
        e.preventDefault();
        vectorPolygon.finish(app, e.shiftKey || !!app.toolOptions.shapeFill);
        return true;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        vectorPolygon.cancel(app);
        return true;
      }
    }
    if ((e.key === "Delete" || e.key === "Backspace") && app.activeTool === "vector-node") {
      e.preventDefault();
      vectorNode.deleteSelectedNode(app);
      return true;
    }
    if (
      (e.key === "Delete" || e.key === "Backspace") &&
      VectorSelection.getSelectedIds().length &&
      (app.activeTool === "vector-select" || app.activeTool === "vector-node")
    ) {
      if (app.activeTool === "vector-select") {
        e.preventDefault();
        vectorSelect.deleteSelected(app);
        return true;
      }
    }
    if (e.key === "Escape" && VectorSelection.getSelectedIds().length) {
      VectorSelection.clear();
      nodeEdit.objectId = null;
      nodeEdit.selectedNode = null;
      appSyncInspector();
      app.requestRender();
      return true;
    }
    if ((e.ctrlKey || e.metaKey) && !e.altKey) {
      const k = e.key.toLowerCase();
      if (k === "c" && VectorSelection.getSelectedIds().length) {
        e.preventDefault();
        copySelection(app);
        return true;
      }
      if (k === "v" && vectorClipboard.length) {
        e.preventDefault();
        pasteClipboard(app);
        return true;
      }
      if (k === "d" && VectorSelection.getSelectedIds().length) {
        e.preventDefault();
        duplicateSelection(app);
        return true;
      }
      if (k === "g" && !e.shiftKey && VectorSelection.getSelectedIds().length >= 2) {
        e.preventDefault();
        groupSelection(app);
        return true;
      }
      if (k === "g" && e.shiftKey && VectorSelection.getSelectedIds().length) {
        e.preventDefault();
        ungroupSelection(app);
        return true;
      }
      if (k === "]" && VectorSelection.getSelectedIds().length) {
        e.preventDefault();
        reorderSelection(app, e.shiftKey ? "front" : "forward");
        return true;
      }
      if (k === "[" && VectorSelection.getSelectedIds().length) {
        e.preventDefault();
        reorderSelection(app, e.shiftKey ? "back" : "backward");
        return true;
      }
    }
    return false;
  }

  return {
    "vector-pen": pen,
    "vector-pencil": pencil,
    "vector-bezier": bezier,
    "vector-rect": vectorRect,
    "vector-roundrect": vectorRoundRect,
    "vector-star": vectorStar,
    "vector-regpoly": vectorRegPoly,
    "vector-select": vectorSelect,
    "vector-node": vectorNode,
    "vector-polygon": vectorPolygon,
    "vector-ellipse": vectorEllipse,
    "vector-line": vectorLine,
    "vector-text": vectorText,
    getSelectedId,
    setSelectedId,
    getSelectedIds,
    getDraft,
    clearDraft,
    getSnapOpts,
    setInspectorSync,
    applyAppearanceToSelection,
    applyTextPropsToSelection,
    attachTextToPath,
    detachTextFromPath,
    editSelectedText,
    alignSelection,
    distributeSelection,
    booleanSelection,
    copySelection,
    pasteClipboard,
    duplicateSelection,
    reorderSelection,
    groupSelection,
    ungroupSelection,
    hasClipboard: () => vectorClipboard.length > 0,
    drawOverlay,
    handleKey,
  };
})();

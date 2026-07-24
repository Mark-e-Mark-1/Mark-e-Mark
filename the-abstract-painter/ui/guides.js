const GuidesManager = (() => {
  const RULER = 20;
  let enabled = true;
  let guides = []; // { id, axis: "v"|"h", pos }
  let drag = null; // { type: "new"|"move", axis, id?, pos }
  let domReady = false;

  function uid() {
    return "guide_" + Math.random().toString(36).slice(2, 9);
  }

  function isEnabled() {
    return enabled;
  }

  function setEnabled(v) {
    enabled = !!v;
    const wrap = document.getElementById("canvas-wrap");
    if (wrap) wrap.classList.toggle("rulers-hidden", !enabled);
  }

  function getGuides() {
    return guides.map((g) => ({ id: g.id, axis: g.axis, pos: g.pos }));
  }

  function setGuides(list) {
    guides = (list || []).map((g) => ({
      id: g.id || uid(),
      axis: g.axis === "h" ? "h" : "v",
      pos: +g.pos || 0,
    }));
  }

  function clearGuides() {
    guides = [];
  }

  function addGuide(axis, pos) {
    const g = { id: uid(), axis, pos };
    guides.push(g);
    return g;
  }

  function removeGuide(id) {
    guides = guides.filter((g) => g.id !== id);
  }

  function snapValue(v, axis, threshold = 5) {
    if (!enabled) return { value: v, guide: null };
    let best = null;
    guides.forEach((g) => {
      if (g.axis !== axis) return;
      const d = Math.abs(v - g.pos);
      if (d <= threshold && (!best || d < best.d)) best = { pos: g.pos, d, guide: g };
    });
    return best ? { value: best.pos, guide: best.guide } : { value: v, guide: null };
  }

  function snapPoint(x, y, threshold = 5) {
    const sx = snapValue(x, "v", threshold);
    const sy = snapValue(y, "h", threshold);
    const lines = [];
    if (sx.guide) lines.push({ type: "v", pos: sx.value });
    if (sy.guide) lines.push({ type: "h", pos: sy.value });
    return { x: sx.value, y: sy.value, lines };
  }

  function hitGuide(docX, docY, threshold = 5) {
    let best = null;
    guides.forEach((g) => {
      const d = g.axis === "v" ? Math.abs(docX - g.pos) : Math.abs(docY - g.pos);
      if (d <= threshold && (!best || d < best.d)) best = { guide: g, d };
    });
    return best?.guide || null;
  }

  function clientToDoc(clientX, clientY) {
    const canvas = document.getElementById("paint-canvas");
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return { x: 0, y: 0 };
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function notify() {
    window.dispatchEvent(new CustomEvent("guides-changed"));
  }

  function ensureDom(wrap) {
    if (!wrap || domReady) return;
    if (wrap.querySelector(".ruler-corner")) {
      domReady = true;
      return;
    }
    wrap.classList.add("has-rulers");
    const corner = document.createElement("div");
    corner.className = "ruler-corner";
    corner.title = "Double-click to clear all guides";
    const top = document.createElement("canvas");
    top.className = "ruler ruler-top";
    top.height = RULER;
    const left = document.createElement("canvas");
    left.className = "ruler ruler-left";
    left.width = RULER;
    wrap.appendChild(corner);
    wrap.appendChild(top);
    wrap.appendChild(left);

    corner.addEventListener("dblclick", () => {
      clearGuides();
      notify();
    });

    const startNew = (axis) => (e) => {
      if (!enabled || e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      drag = { type: "new", axis, pos: 0 };
      const doc = clientToDoc(e.clientX, e.clientY);
      drag.pos = axis === "v" ? doc.x : doc.y;
      window.addEventListener("pointermove", onDragMove);
      window.addEventListener("pointerup", onDragEnd);
      notify();
    };
    top.addEventListener("pointerdown", startNew("v"));
    left.addEventListener("pointerdown", startNew("h"));
    domReady = true;
  }

  function onDragMove(e) {
    if (!drag) return;
    const doc = clientToDoc(e.clientX, e.clientY);
    if (drag.type === "new") {
      drag.pos = drag.axis === "v" ? doc.x : doc.y;
    } else if (drag.type === "move" && drag.id) {
      const g = guides.find((x) => x.id === drag.id);
      if (g) g.pos = g.axis === "v" ? doc.x : doc.y;
    }
    notify();
  }

  function onDragEnd(e) {
    window.removeEventListener("pointermove", onDragMove);
    window.removeEventListener("pointerup", onDragEnd);
    if (!drag) return;
    const canvas = document.getElementById("paint-canvas");
    const rect = canvas?.getBoundingClientRect();
    const overCanvas =
      rect &&
      e.clientX >= rect.left - 4 &&
      e.clientX <= rect.right + 4 &&
      e.clientY >= rect.top - 4 &&
      e.clientY <= rect.bottom + 4;

    if (drag.type === "new") {
      if (overCanvas) {
        const doc = clientToDoc(e.clientX, e.clientY);
        const pos = drag.axis === "v" ? doc.x : doc.y;
        if (pos >= 0 && Number.isFinite(pos)) addGuide(drag.axis, pos);
      }
    } else if (drag.type === "move" && drag.id) {
      if (!overCanvas) removeGuide(drag.id);
    }
    drag = null;
    notify();
  }

  function beginMoveGuide(guide) {
    if (!guide) return;
    drag = { type: "move", axis: guide.axis, id: guide.id, pos: guide.pos };
    window.addEventListener("pointermove", onDragMove);
    window.addEventListener("pointerup", onDragEnd);
  }

  function tryPointerDownOnGuide(docX, docY) {
    if (!enabled) return false;
    const g = hitGuide(docX, docY, 6);
    if (!g) return false;
    beginMoveGuide(g);
    return true;
  }

  function niceStep(raw) {
    const pow = Math.pow(10, Math.floor(Math.log10(Math.max(raw, 1))));
    const n = raw / pow;
    if (n < 1.5) return pow;
    if (n < 3.5) return 2 * pow;
    if (n < 7.5) return 5 * pow;
    return 10 * pow;
  }

  function drawRulers(docW, docH) {
    const wrap = document.getElementById("canvas-wrap");
    const canvas = document.getElementById("paint-canvas");
    if (!wrap || !canvas) return;
    ensureDom(wrap);
    wrap.classList.toggle("rulers-hidden", !enabled);
    if (!enabled) return;

    const top = wrap.querySelector(".ruler-top");
    const left = wrap.querySelector(".ruler-left");
    if (!top || !left) return;

    const wrapRect = wrap.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const cssW = Math.max(1, wrap.clientWidth - RULER);
    const cssH = Math.max(1, wrap.clientHeight - RULER);

    top.width = Math.floor(cssW * dpr);
    top.height = Math.floor(RULER * dpr);
    top.style.width = cssW + "px";
    top.style.height = RULER + "px";
    left.width = Math.floor(RULER * dpr);
    left.height = Math.floor(cssH * dpr);
    left.style.width = RULER + "px";
    left.style.height = cssH + "px";

    const tctx = top.getContext("2d");
    tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    tctx.clearRect(0, 0, cssW, RULER);
    tctx.fillStyle = "#161622";
    tctx.fillRect(0, 0, cssW, RULER);
    tctx.strokeStyle = "#475569";
    tctx.fillStyle = "#94a3b8";
    tctx.font = "9px sans-serif";
    tctx.lineWidth = 1;

    const leftOffset = canvasRect.left - wrapRect.left - RULER;
    const topOffset = canvasRect.top - wrapRect.top - RULER;
    const scaleX = canvasRect.width / Math.max(1, docW);
    const scaleY = canvasRect.height / Math.max(1, docH);
    const step = niceStep(40 / Math.max(scaleX, 0.01));

    tctx.beginPath();
    for (let x = 0; x <= docW + 0.01; x += step) {
      const sx = leftOffset + x * scaleX;
      if (sx < -20 || sx > cssW + 20) continue;
      const major = Math.abs(x % (step * 5)) < 0.001 || x === 0;
      tctx.moveTo(sx + 0.5, RULER);
      tctx.lineTo(sx + 0.5, major ? 3 : 10);
      if (major) tctx.fillText(String(Math.round(x)), sx + 2, 9);
    }
    tctx.stroke();

    const lctx = left.getContext("2d");
    lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lctx.clearRect(0, 0, RULER, cssH);
    lctx.fillStyle = "#161622";
    lctx.fillRect(0, 0, RULER, cssH);
    lctx.strokeStyle = "#475569";
    lctx.fillStyle = "#94a3b8";
    lctx.font = "9px sans-serif";
    lctx.lineWidth = 1;
    const stepy = niceStep(40 / Math.max(scaleY, 0.01));
    lctx.beginPath();
    for (let y = 0; y <= docH + 0.01; y += stepy) {
      const sy = topOffset + y * scaleY;
      if (sy < -20 || sy > cssH + 20) continue;
      const major = Math.abs(y % (stepy * 5)) < 0.001 || y === 0;
      lctx.moveTo(RULER, sy + 0.5);
      lctx.lineTo(major ? 3 : 10, sy + 0.5);
      if (major) {
        lctx.save();
        lctx.translate(11, sy - 2);
        lctx.rotate(-Math.PI / 2);
        lctx.fillText(String(Math.round(y)), 0, 0);
        lctx.restore();
      }
    }
    lctx.stroke();
  }

  function drawGuidesOverlay(ctx, docW, docH) {
    if (!enabled) return;
    ctx.save();
    ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);
    guides.forEach((g) => {
      ctx.beginPath();
      if (g.axis === "v") {
        ctx.moveTo(g.pos + 0.5, 0);
        ctx.lineTo(g.pos + 0.5, docH);
      } else {
        ctx.moveTo(0, g.pos + 0.5);
        ctx.lineTo(docW, g.pos + 0.5);
      }
      ctx.stroke();
    });
    if (drag?.type === "new") {
      ctx.strokeStyle = "rgba(251, 191, 36, 0.95)";
      ctx.beginPath();
      if (drag.axis === "v") {
        ctx.moveTo(drag.pos + 0.5, 0);
        ctx.lineTo(drag.pos + 0.5, docH);
      } else {
        ctx.moveTo(0, drag.pos + 0.5);
        ctx.lineTo(docW, drag.pos + 0.5);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  return {
    RULER,
    isEnabled,
    setEnabled,
    getGuides,
    setGuides,
    clearGuides,
    addGuide,
    removeGuide,
    snapValue,
    snapPoint,
    hitGuide,
    beginMoveGuide,
    tryPointerDownOnGuide,
    drawRulers,
    drawGuidesOverlay,
    ensureDom,
  };
})();

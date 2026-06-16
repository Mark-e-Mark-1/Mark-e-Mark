const CanvasViewport = (() => {
  let canvas = null;
  let wrap = null;
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let panning = false;
  let panStart = null;
  let onChange = null;

  function init(canvasEl, wrapEl) {
    canvas = canvasEl;
    wrap = wrapEl;
    canvas.addEventListener("wheel", onWheel, { passive: false });
  }

  function onWheel(e) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    zoom = Math.min(8, Math.max(0.05, zoom * factor));
    notify();
  }

  function screenToDoc(sx, sy) {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return { x: 0, y: 0 };
    return {
      x: (sx / rect.width) * canvas.width,
      y: (sy / rect.height) * canvas.height,
    };
  }

  function fitToView(docW, docH) {
    if (!wrap) return;
    const pw = wrap.clientWidth - 40;
    const ph = wrap.clientHeight - 40;
    zoom = Math.min(pw / docW, ph / docH, 1);
    panX = 0;
    panY = 0;
    notify();
  }

  function setZoom(z) {
    zoom = Math.min(8, Math.max(0.05, z));
    notify();
  }

  function getZoom() {
    return zoom;
  }

  function startPan(e) {
    panning = true;
    panStart = { x: e.clientX - panX, y: e.clientY - panY };
  }

  function movePan(e) {
    if (!panning || !panStart) return;
    panX = e.clientX - panStart.x;
    panY = e.clientY - panStart.y;
    notify();
  }

  function endPan() {
    panning = false;
    panStart = null;
  }

  function isPanning() {
    return panning;
  }

  function drawComposite(composite, docW, docH) {
    if (!canvas) return;
    canvas.width = docW;
    canvas.height = docH;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, docW, docH);
    ctx.drawImage(composite, 0, 0);
    applyTransform();
  }

  function applyTransform() {
    if (!canvas) return;
    canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
    canvas.style.transformOrigin = "center center";
  }

  function onViewportChange(fn) {
    onChange = fn;
  }

  function notify() {
    applyTransform();
    if (onChange) onChange();
  }

  return {
    init,
    screenToDoc,
    fitToView,
    setZoom,
    getZoom,
    startPan,
    movePan,
    endPan,
    isPanning,
    drawComposite,
    onViewportChange,
  };
})();

const canvas = document.getElementById("editor-canvas");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("ed-status");
const propsPanel = document.getElementById("props-panel");

canvas.width = GAME.W;
canvas.height = GAME.H;

const SNAP = 20;
const { GROUND_Y, W, H } = GAME;

let obstacles = [];
let scrollX = 0;
let tool = "select";
let letter = "V";
let selectedObj = null;
let interaction = null;
let panning = false;
const HANDLE_SIZE = 10;
let panStartX = 0;
let panStartScroll = 0;
let loadedLevelId = null;
let clipboard = null;
let undoStack = [];
let redoStack = [];
const MAX_UNDO = 50;
let propsUndoPushed = false;

function snap(v) {
  return Math.round(v / SNAP) * SNAP;
}

function canvasCoords(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

function defaultForType(type) {
  if (type === "spike") return { type, letter, h: 40 };
  if (type === "ceilingSpike") return { type, letter, h: 40, yOff: 0 };
  if (type === "block") return { type, letter, h: 60, w: 50 };
  if (type === "platform") return { type, letter, h: 20, w: 120, yOff: -100 };
  if (type === "oneWayPlatform") return { type, letter, h: 20, w: 120, yOff: -100 };
  if (type === "movingPlatform") {
    return {
      type,
      letter,
      h: 20,
      w: 120,
      yOff: -100,
      moveRange: 80,
      moveSpeed: 1,
      moveAxis: "y",
      phase: Math.random() * Math.PI * 2,
    };
  }
  if (type === "speedPad") {
    return { type, letter: "»", h: 24, w: 70, yOff: 0, speedMult: 1.5, padDuration: 90 };
  }
  if (type === "bonus") return { type, letter: "☺", h: 44, w: 44, yOff: -80 };
  if (type === "superbonus") return { type, letter: "★", h: 52, w: 52, yOff: -100 };
  if (type === "bomb") return { type, letter: "!", h: 40, w: 40, yOff: -60 };
  if (type === "jacob") return { type, letter: "J", h: 50, w: 36, yOff: -80 };
  if (type === "rowan") return { type, letter: "R", h: 50, w: 38, yOff: -80 };
  if (type === "portalFrog") return { type, letter: "F", h: 56, w: 56, yOff: -100 };
  if (type === "portalRocket") return { type, letter: "R", h: 56, w: 56, yOff: -100 };
  if (type === "gap") return { type, letter: "—", w: 100 };
  if (type === "finish") return { type, letter: "★", w: 60 };
  return { type: "block", letter, h: 50, w: 50 };
}

function screenToWorld(x) {
  return x + scrollX - 200;
}

function getScreenRect(obs) {
  const idx = obstacles.indexOf(obs);
  if (idx >= 0) {
    const rects = buildObstacleRects(obstacles, scrollX, canvas.width, performance.now());
    const r = rects.find((rect) => rect.obstacleIndex === idx);
    if (r) return r;
  }
  return obstacleScreenRect(obs, scrollX, true);
}

function findAt(screenX, screenY) {
  const rects = buildObstacleRects(obstacles, scrollX, canvas.width, performance.now());
  for (let i = rects.length - 1; i >= 0; i--) {
    const r = rects[i];
    if (screenX >= r.x && screenX <= r.x + r.w && screenY >= r.y && screenY <= r.y + r.h) {
      return obstacles[r.obstacleIndex];
    }
  }
  return null;
}

function getResizeHandles(obs) {
  const r = getScreenRect(obs);
  const hs = HANDLE_SIZE;
  const handles = [];
  const cx = (hx, hy, id, cursor) => ({ id, x: hx - hs / 2, y: hy - hs / 2, w: hs, h: hs, cursor });

  if (obs.type === "gap" || obs.type === "finish") {
    handles.push(cx(r.x, r.y + r.h / 2, "w", "ew-resize"));
    handles.push(cx(r.x + r.w, r.y + r.h / 2, "e", "ew-resize"));
    if (obs.type === "finish") {
      handles.push(cx(r.x + r.w / 2, r.y, "n", "ns-resize"));
      handles.push(cx(r.x + r.w / 2, r.y + r.h, "s", "ns-resize"));
    }
    return handles;
  }

  if (obs.type === "spike" || obs.type === "ceilingSpike") {
    handles.push(cx(r.x + r.w / 2, r.y, "n", "ns-resize"));
    handles.push(cx(r.x + r.w / 2, r.y + r.h, "s", "ns-resize"));
    return handles;
  }

  handles.push(cx(r.x, r.y, "nw", "nwse-resize"));
  handles.push(cx(r.x + r.w, r.y, "ne", "nesw-resize"));
  handles.push(cx(r.x, r.y + r.h, "sw", "nesw-resize"));
  handles.push(cx(r.x + r.w, r.y + r.h, "se", "nwse-resize"));
  handles.push(cx(r.x + r.w / 2, r.y, "n", "ns-resize"));
  handles.push(cx(r.x + r.w / 2, r.y + r.h, "s", "ns-resize"));
  handles.push(cx(r.x, r.y + r.h / 2, "w", "ew-resize"));
  handles.push(cx(r.x + r.w, r.y + r.h / 2, "e", "ew-resize"));
  return handles;
}

function findHandle(screenX, screenY) {
  if (!selectedObj) return null;
  for (const h of getResizeHandles(selectedObj)) {
    if (screenX >= h.x && screenX <= h.x + h.w && screenY >= h.y && screenY <= h.y + h.h) {
      return h;
    }
  }
  return null;
}

function cloneObsState(obs) {
  return { x: obs.x, w: obs.w, h: obs.h, yOff: obs.yOff };
}

function applyMove(obs, sx, sy, start) {
  obs.x = Math.max(200, snap(start.x + (screenToWorld(sx) - start.worldX)));

  if (
    obs.type === "platform" ||
    obs.type === "oneWayPlatform" ||
    obs.type === "movingPlatform" ||
    obs.type === "bonus" ||
    obs.type === "superbonus" ||
    obs.type === "bomb" ||
    obs.type === "jacob" ||
    obs.type === "rowan" ||
    obs.type === "speedPad" ||
    obs.type === "portalFrog" ||
    obs.type === "portalRocket"
  ) {
    const top = start.top + (sy - start.sy);
    obs.yOff = snap(top + (obs.h || 20) - GROUND_Y);
    if (obs.type === "platform" || obs.type === "oneWayPlatform" || obs.type === "movingPlatform") {
      clampPlatformYOff(obs);
    }
    else if (obs.type === "speedPad") {
      obs.yOff = Math.min(0, Math.max(platformMinYOff(obs.h), obs.yOff));
    } else obs.yOff = Math.min(-20, Math.max(platformMinYOff(obs.h), obs.yOff));
  } else if (obs.type === "ceilingSpike") {
    const top = start.top + (sy - start.sy);
    obs.yOff = snap(top - GAME.CANVAS_TOP_MARGIN);
    clampCeilingSpikeYOff(obs);
  } else if (obs.type === "block" || obs.type === "spike") {
    const top = start.top + (sy - start.sy);
    obs.h = Math.max(20, snap(GROUND_Y - top));
  }
}

function applyResize(obs, handleId, sx, sy, start) {
  const minSize = 20;

  if (handleId === "e" || handleId === "ne" || handleId === "se") {
    if (obs.type !== "spike" && obs.type !== "ceilingSpike") {
      obs.w = Math.max(minSize, snap(start.w + (sx - start.sx)));
    }
  }

  if (handleId === "w" || handleId === "nw" || handleId === "sw") {
    const newW = Math.max(minSize, snap(start.w - (sx - start.sx)));
    const dx = newW - (obs.w || start.w);
    obs.w = newW;
    obs.x = snap(start.x - dx);
  }

  if (handleId === "n" || handleId === "nw" || handleId === "ne") {
    if (obs.type === "platform" || obs.type === "oneWayPlatform" || obs.type === "movingPlatform") {
      const top = snap(sy);
      obs.h = Math.max(10, snap(start.bottom - top));
      obs.yOff = snap(top + obs.h - GROUND_Y);
      clampPlatformYOff(obs);
    } else if (obs.type === "speedPad") {
      const top = snap(sy);
      obs.h = Math.max(16, snap(start.bottom - top));
      obs.yOff = snap(top + obs.h - GROUND_Y);
      obs.yOff = Math.min(0, Math.max(platformMinYOff(obs.h), obs.yOff));
    } else if (obs.type === "jacob") {
      const top = snap(sy);
      obs.h = Math.max(36, snap(start.bottom - top));
      obs.yOff = snap(top + obs.h - GROUND_Y);
      obs.yOff = Math.min(-20, Math.max(platformMinYOff(obs.h), obs.yOff));
    } else if (obs.type === "rowan") {
      const top = snap(sy);
      obs.h = Math.max(36, snap(start.bottom - top));
      obs.yOff = snap(top + obs.h - GROUND_Y);
      obs.yOff = Math.min(-20, Math.max(platformMinYOff(obs.h), obs.yOff));
    } else if (
      obs.type === "bonus" ||
      obs.type === "superbonus" ||
      obs.type === "bomb" ||
      obs.type === "portalFrog" ||
      obs.type === "portalRocket"
    ) {
      const top = snap(sy);
      const size = Math.max(28, snap(start.bottom - top));
      obs.h = size;
      obs.w = size;
      obs.yOff = snap(top + size - GROUND_Y);
      obs.yOff = Math.min(-20, Math.max(platformMinYOff(size), obs.yOff));
    } else if (obs.type === "ceilingSpike") {
      const top = snap(sy);
      obs.h = Math.max(minSize, snap(start.bottom - top));
      obs.yOff = snap(top - GAME.CANVAS_TOP_MARGIN);
      clampCeilingSpikeYOff(obs);
    } else if (obs.type === "block" || obs.type === "spike" || obs.type === "finish") {
      obs.h = Math.max(minSize, snap(GROUND_Y - sy));
    }
  }

  if (handleId === "s" || handleId === "sw" || handleId === "se") {
    if (obs.type === "platform" || obs.type === "oneWayPlatform" || obs.type === "movingPlatform") {
      obs.h = Math.max(10, snap(sy - start.top));
      clampPlatformYOff(obs);
    } else if (obs.type === "speedPad") {
      obs.h = Math.max(16, snap(sy - start.top));
    } else if (obs.type === "jacob") {
      obs.h = Math.max(36, snap(sy - start.top));
    } else if (obs.type === "rowan") {
      obs.h = Math.max(36, snap(sy - start.top));
    } else if (obs.type === "ceilingSpike") {
      obs.h = Math.max(minSize, snap(sy - start.top));
      clampCeilingSpikeYOff(obs);
    }
  }
}

function snapshotEditorState() {
  const selectedIndex = selectedObj ? obstacles.indexOf(selectedObj) : -1;
  return JSON.stringify({
    obstacles: obstacles.map((o) => ({ ...o })),
    selectedIndex,
  });
}

function restoreEditorState(snapshot) {
  const data = JSON.parse(snapshot);
  obstacles = (data.obstacles || []).map((o) => ({ ...o }));
  selectedObj =
    data.selectedIndex >= 0 && data.selectedIndex < obstacles.length
      ? obstacles[data.selectedIndex]
      : null;
  updatePropsPanel();
  updateStatus();
}

function clearUndoHistory() {
  undoStack = [];
  redoStack = [];
}

function pushUndo() {
  undoStack.push(snapshotEditorState());
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  redoStack = [];
  updateStatus();
}

function undoEditor() {
  if (!undoStack.length) return false;
  redoStack.push(snapshotEditorState());
  restoreEditorState(undoStack.pop());
  return true;
}

function redoEditor() {
  if (!redoStack.length) return false;
  undoStack.push(snapshotEditorState());
  restoreEditorState(redoStack.pop());
  return true;
}

function updateStatus() {
  const sel = selectedObj ? ` · selected ${selectedObj.type} @ ${selectedObj.x}` : "";
  const clip = clipboard ? " · copied" : "";
  const undoHint = undoStack.length ? ` · undo ${undoStack.length}` : "";
  statusEl.textContent = `${obstacles.length} objects · scroll ${scrollX}${sel}${clip}${undoHint}`;
}

function copySelection() {
  if (!selectedObj) return false;
  clipboard = JSON.parse(JSON.stringify(selectedObj));
  updateStatus();
  return true;
}

function pasteClipboard() {
  if (!clipboard) return false;

  pushUndo();
  const paste = JSON.parse(JSON.stringify(clipboard));
  paste.x = snap(paste.x + SNAP);

  if (paste.type === "finish") {
    obstacles = obstacles.filter((o) => o.type !== "finish");
  }

  obstacles.push(paste);
  obstacles.sort((a, b) => a.x - b.x);
  selectedObj = paste;
  tool = "select";
  document.querySelectorAll(".tool").forEach((b) => b.classList.remove("active"));
  document.querySelector('.tool[data-type="select"]').classList.add("active");
  updatePropsPanel();
  updateStatus();
  return true;
}

function updateUpdateButton() {
  const btn = document.getElementById("update-level");
  btn.classList.toggle("hidden", !loadedLevelId);
}

function populateLevelPicker() {
  const select = document.getElementById("level-picker");
  const current = select.value;
  select.innerHTML = '<option value="">— Choose a level —</option>';

  const builtinGroup = document.createElement("optgroup");
  builtinGroup.label = "Built-in";
  LEVELS.forEach((lvl) => {
    const opt = document.createElement("option");
    opt.value = lvl.id;
    opt.dataset.source = "builtin";
    opt.textContent = lvl.name;
    builtinGroup.appendChild(opt);
  });
  select.appendChild(builtinGroup);

  const customLevels = loadCustomLevels();
  if (customLevels.length) {
    const customGroup = document.createElement("optgroup");
    customGroup.label = "Saved Custom";
    customLevels.forEach((lvl) => {
      const opt = document.createElement("option");
      opt.value = lvl.id;
      opt.dataset.source = "custom";
      opt.textContent = lvl.name;
      customGroup.appendChild(opt);
    });
    select.appendChild(customGroup);
  }

  if (current && [...select.options].some((o) => o.value === current)) {
    select.value = current;
  }
  updateDeleteLevelButton();
}

function updateDeleteLevelButton() {
  const select = document.getElementById("level-picker");
  const btn = document.getElementById("delete-level-btn");
  if (!btn) return;
  const isCustom = select.value && select.selectedOptions[0]?.dataset.source === "custom";
  btn.classList.toggle("hidden", !isCustom);
}

function deleteSelectedSavedLevel() {
  const select = document.getElementById("level-picker");
  const id = select.value;
  const isCustom = select.selectedOptions[0]?.dataset.source === "custom";
  if (!id || !isCustom) {
    alert("Choose a saved custom level to delete. Built-in levels cannot be removed.");
    return;
  }

  const level = getAllLevels().find((l) => l.id === id);
  const name = level?.name || "this level";
  if (!confirm(`Delete "${name}" permanently? This cannot be undone.`)) return;

  deleteCustomLevel(id);
  if (loadedLevelId === id) {
    obstacles = [];
    selectedObj = null;
    loadedLevelId = null;
    document.getElementById("ed-name").value = "My Level";
    document.getElementById("level-picker").value = "";
    updatePropsPanel();
    updateUpdateButton();
    updateStatus();
  }
  populateLevelPicker();
  alert(`Deleted "${name}".`);
}

function applyLevelToEditor(level, source) {
  clearUndoHistory();
  obstacles = (level.obstacles || []).map((o) => ({ ...o }));
  document.getElementById("ed-name").value = level.name || "Untitled";
  document.getElementById("ed-bpm").value = level.bpm || 140;
  selectedObj = null;
  scrollX = 0;
  loadedLevelId = source === "custom" ? level.id : null;
  updateUpdateButton();
  updatePropsPanel();
  updateStatus();
}

function loadSelectedLevel() {
  const select = document.getElementById("level-picker");
  const id = select.value;
  if (!id) {
    alert("Choose a level from the list first.");
    return;
  }

  if (obstacles.length && !confirm("Load this level? Any unsaved changes will be lost.")) {
    return;
  }

  const source = select.selectedOptions[0]?.dataset.source || "builtin";
  const level = getAllLevels().find((l) => l.id === id);
  if (!level) {
    alert("Level not found.");
    populateLevelPicker();
    return;
  }

  applyLevelToEditor(level, source);
}

function getEditorLevelData() {
  const name = document.getElementById("ed-name").value.trim() || "My Level";
  const bpm = Number(document.getElementById("ed-bpm").value) || 140;
  if (!obstacles.some((o) => o.type === "finish")) {
    alert("Add a Finish marker before saving.");
    return null;
  }
  return {
    name,
    bpm,
    obstacles: obstacles.map((o) => ({ ...o })),
  };
}

function updatePropsPanel() {
  if (!selectedObj) {
    propsPanel.classList.add("hidden");
    return;
  }
  const o = selectedObj;
  propsPanel.classList.remove("hidden");
  document.getElementById("prop-x").value = o.x;
  document.getElementById("prop-h").value = o.h || 40;
  document.getElementById("prop-w").value = o.w || 50;
  document.getElementById("prop-yoff").value = o.yOff || 0;
  document.getElementById("prop-letter").value = o.letter || "A";

  const isGap = o.type === "gap";
  const isFinish = o.type === "finish";
  document.getElementById("prop-h").closest("label").style.display = isGap || isFinish ? "none" : "";
  const yOffLabel = document.getElementById("prop-yoff").closest("label");
  const showYOff =
    o.type === "platform" ||
    o.type === "oneWayPlatform" ||
    o.type === "movingPlatform" ||
    o.type === "speedPad" ||
    o.type === "bonus" ||
    o.type === "superbonus" ||
    o.type === "bomb" ||
    o.type === "jacob" ||
    o.type === "rowan" ||
    o.type === "portalFrog" ||
    o.type === "portalRocket" ||
    o.type === "ceilingSpike";
  yOffLabel.style.display = showYOff ? "" : "none";
  if (o.type === "ceilingSpike") {
    yOffLabel.firstChild.textContent = "Top offset ";
    document.getElementById("prop-yoff").min = "0";
    document.getElementById("prop-yoff").max = "520";
  } else if (o.type === "speedPad") {
    yOffLabel.firstChild.textContent = "Y offset ";
    document.getElementById("prop-yoff").min = String(platformMinYOff(o.h || 24));
    document.getElementById("prop-yoff").max = "0";
  } else {
    yOffLabel.firstChild.textContent = "Y offset ";
    document.getElementById("prop-yoff").min = "-440";
    document.getElementById("prop-yoff").max = "-20";
  }
  document.getElementById("prop-letter").closest("label").style.display =
    o.type === "bonus" ||
    o.type === "superbonus" ||
    o.type === "bomb" ||
    o.type === "jacob" ||
    o.type === "rowan" ||
    o.type === "speedPad" ||
    o.type === "portalFrog" ||
    o.type === "portalRocket"
      ? "none"
      : "";

  document.getElementById("prop-move-range-wrap").classList.toggle("hidden", o.type !== "movingPlatform");
  document.getElementById("prop-move-speed-wrap").classList.toggle("hidden", o.type !== "movingPlatform");
  document.getElementById("prop-speed-mult-wrap").classList.toggle("hidden", o.type !== "speedPad");
  document.getElementById("prop-pad-duration-wrap").classList.toggle("hidden", o.type !== "speedPad");

  if (o.type === "movingPlatform") {
    document.getElementById("prop-move-range").value = o.moveRange ?? 80;
    document.getElementById("prop-move-speed").value = o.moveSpeed ?? 1;
  }
  if (o.type === "speedPad") {
    document.getElementById("prop-speed-mult").value = o.speedMult ?? 1.5;
    document.getElementById("prop-pad-duration").value = o.padDuration ?? 90;
  }
}

function applyProps() {
  if (!selectedObj) return;
  const o = selectedObj;
  o.x = Number(document.getElementById("prop-x").value) || 0;
  o.h = Number(document.getElementById("prop-h").value) || 40;
  o.w = Number(document.getElementById("prop-w").value) || 50;
  o.yOff = Number(document.getElementById("prop-yoff").value) || 0;
  o.letter = document.getElementById("prop-letter").value || "A";
  if (o.type === "platform" || o.type === "oneWayPlatform" || o.type === "movingPlatform") {
    clampPlatformYOff(o);
  }
  if (o.type === "ceilingSpike") clampCeilingSpikeYOff(o);
  if (o.type === "movingPlatform") {
    o.moveRange = Number(document.getElementById("prop-move-range").value) || 80;
    o.moveSpeed = Number(document.getElementById("prop-move-speed").value) || 1;
    o.moveRange = Math.min(240, Math.max(20, o.moveRange));
    o.moveSpeed = Math.min(4, Math.max(0.2, o.moveSpeed));
  }
  if (o.type === "speedPad") {
    o.letter = "»";
    o.speedMult = Number(document.getElementById("prop-speed-mult").value) || 1.5;
    o.padDuration = Number(document.getElementById("prop-pad-duration").value) || 90;
    o.speedMult = Math.min(2.5, Math.max(0.3, o.speedMult));
    o.padDuration = Math.min(300, Math.max(30, o.padDuration));
    o.yOff = Math.min(0, Math.max(platformMinYOff(o.h), o.yOff || 0));
  }
  if (o.type === "bonus") {
    o.letter = "☺";
    o.yOff = Math.min(-20, Math.max(platformMinYOff(o.h), o.yOff || 0));
  }
  if (o.type === "superbonus") {
    o.letter = "★";
    o.yOff = Math.min(-20, Math.max(platformMinYOff(o.h), o.yOff || 0));
  }
  if (o.type === "bomb") {
    o.letter = "!";
    o.yOff = Math.min(-20, Math.max(platformMinYOff(o.h), o.yOff || 0));
  }
  if (o.type === "jacob") {
    o.letter = "J";
    o.yOff = Math.min(-20, Math.max(platformMinYOff(o.h), o.yOff || 0));
  }
  if (o.type === "rowan") {
    o.letter = "R";
    o.yOff = Math.min(-20, Math.max(platformMinYOff(o.h), o.yOff || 0));
  }
  if (o.type === "portalFrog") {
    o.letter = "F";
    o.yOff = Math.min(-20, Math.max(platformMinYOff(o.h), o.yOff || 0));
  }
  if (o.type === "portalRocket") {
    o.letter = "R";
    o.yOff = Math.min(-20, Math.max(platformMinYOff(o.h), o.yOff || 0));
  }
  document.getElementById("prop-yoff").value = o.yOff || 0;
  obstacles.sort((a, b) => a.x - b.x);
  updateStatus();
}

function draw() {
  const animTime = performance.now();
  drawBackground(ctx, scrollX);
  const rects = buildObstacleRects(obstacles, scrollX, canvas.width, animTime);
  drawGround(ctx, rects);
  drawGapMarkers(ctx, rects);
  drawObstacles(ctx, rects);

  if (selectedObj) {
    const selIdx = obstacles.indexOf(selectedObj);
    const r =
      rects.find((rect) => rect.obstacleIndex === selIdx) ||
      obstacleScreenRect(selectedObj, scrollX, true);
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(r.x - 4, r.y - 4, r.w + 8, r.h + 8);
    ctx.setLineDash([]);

    for (const h of getResizeHandles(selectedObj)) {
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(h.x, h.y, h.w, h.h);
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 1;
      ctx.strokeRect(h.x, h.y, h.w, h.h);
    }
  }

  drawRocket(ctx, 120, GROUND_Y - GAME.PLAYER_SIZE, GAME.PLAYER_SIZE, GAME.COLORS.player, false);

  ctx.fillStyle = "#64748b";
  ctx.font = "12px monospace";
  ctx.textAlign = "left";
  ctx.fillText("Rocket start", 120, GROUND_Y - GAME.PLAYER_SIZE - 8);
}

function placeAt(screenX) {
  const worldX = snap(screenToWorld(screenX));
  if (worldX < 200) return;

  pushUndo();
  if (tool === "finish") {
    obstacles = obstacles.filter((o) => o.type !== "finish");
  }

  const obj = {
    ...defaultForType(tool),
    x: worldX,
    letter:
      tool === "gap"
        ? "—"
        : tool === "bonus"
          ? "☺"
          : tool === "superbonus"
            ? "★"
            : tool === "bomb"
              ? "!"
              : tool === "jacob"
                ? "J"
                : tool === "rowan"
                  ? "R"
                  : tool === "portalFrog"
                ? "F"
                : tool === "portalRocket"
                  ? "R"
                  : letter,
  };
  obstacles.push(obj);
  obstacles.sort((a, b) => a.x - b.x);
  selectedObj = obj;
  tool = "select";
  document.querySelectorAll(".tool").forEach((b) => b.classList.remove("active"));
  document.querySelector('.tool[data-type="select"]').classList.add("active");
  updatePropsPanel();
  updateStatus();
}

function beginMove(obj, sx, sy) {
  pushUndo();
  const r = getScreenRect(obj);
  interaction = {
    type: "move",
    start: {
      x: obj.x,
      w: obj.w,
      h: obj.h,
      yOff: obj.yOff,
      worldX: screenToWorld(sx),
      sx,
      sy,
      top: r.y,
      bottom: r.y + r.h,
    },
  };
}

function beginResize(handle, sx, sy) {
  pushUndo();
  const r = getScreenRect(selectedObj);
  interaction = {
    type: "resize",
    handle: handle.id,
    start: {
      ...cloneObsState(selectedObj),
      sx,
      sy,
      top: r.y,
      bottom: r.y + r.h,
      w: selectedObj.w,
      h: selectedObj.h,
    },
  };
}

function loop() {
  draw();
  requestAnimationFrame(loop);
}

document.getElementById("tool-grid").addEventListener("click", (e) => {
  const btn = e.target.closest(".tool");
  if (!btn) return;
  document.querySelectorAll(".tool").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  tool = btn.dataset.type;
});

document.getElementById("ed-letter").addEventListener("input", (e) => {
  letter = (e.target.value || "A").toUpperCase().slice(0, 1);
  e.target.value = letter;
  if (selectedObj && selectedObj.type !== "gap" && selectedObj.type !== "finish") {
    selectedObj.letter = letter;
  }
});

const palette = document.getElementById("letter-palette");
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((ch) => {
  const b = document.createElement("button");
  b.textContent = ch;
  b.className = "palette-letter";
  b.addEventListener("click", () => {
    letter = ch;
    document.getElementById("ed-letter").value = ch;
    if (selectedObj && selectedObj.type !== "gap" && selectedObj.type !== "finish") {
      selectedObj.letter = ch;
    }
  });
  palette.appendChild(b);
});

[
  "prop-x",
  "prop-h",
  "prop-w",
  "prop-yoff",
  "prop-letter",
  "prop-move-range",
  "prop-move-speed",
  "prop-speed-mult",
  "prop-pad-duration",
].forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("focus", () => {
    if (!propsUndoPushed) {
      pushUndo();
      propsUndoPushed = true;
    }
  });
  el.addEventListener("blur", () => {
    propsUndoPushed = false;
  });
  el.addEventListener("input", applyProps);
});

document.getElementById("delete-obj").addEventListener("click", () => {
  if (!selectedObj) return;
  pushUndo();
  obstacles = obstacles.filter((o) => o !== selectedObj);
  selectedObj = null;
  updatePropsPanel();
  updateStatus();
});

document.getElementById("add-finish").addEventListener("click", () => {
  pushUndo();
  obstacles = obstacles.filter((o) => o.type !== "finish");
  const lastX = obstacles.length ? obstacles[obstacles.length - 1].x + 200 : 600;
  const obj = { x: snap(lastX), type: "finish", letter: "★", w: 60 };
  obstacles.push(obj);
  selectedObj = obj;
  updatePropsPanel();
  updateStatus();
});

document.getElementById("clear-level").addEventListener("click", () => {
  if (confirm("Clear all obstacles?")) {
    pushUndo();
    obstacles = [];
    selectedObj = null;
    updatePropsPanel();
    updateStatus();
  }
});

document.getElementById("generate-level").addEventListener("click", () => {
  if (obstacles.length && !confirm("Generate a new random level? Unsaved changes will be lost.")) {
    return;
  }

  const seconds = Number(document.getElementById("gen-duration").value) || 45;
  const difficulty = document.getElementById("gen-difficulty").value;
  const generated = LevelGenerator.generate(seconds, difficulty);

  applyLevelToEditor(generated, "generated");
  document.getElementById("level-picker").value = "";
  loadedLevelId = null;
  updateUpdateButton();
});

document.getElementById("load-level-btn").addEventListener("click", loadSelectedLevel);

document.getElementById("delete-level-btn").addEventListener("click", deleteSelectedSavedLevel);

document.getElementById("level-picker").addEventListener("change", updateDeleteLevelButton);

document.getElementById("level-picker").addEventListener("dblclick", loadSelectedLevel);

document.getElementById("save-level").addEventListener("click", () => {
  const data = getEditorLevelData();
  if (!data) return;

  const id = "custom-" + Date.now();
  const level = { id, ...data, custom: true };
  const existing = loadCustomLevels();
  existing.push(level);
  saveCustomLevels(existing);
  loadedLevelId = id;
  updateUpdateButton();
  populateLevelPicker();
  document.getElementById("level-picker").value = id;
  alert(`Saved "${data.name}" as a new level! It will appear in the game's level list.`);
});

document.getElementById("update-level").addEventListener("click", () => {
  if (!loadedLevelId) return;
  const data = getEditorLevelData();
  if (!data) return;

  const existing = loadCustomLevels();
  const index = existing.findIndex((l) => l.id === loadedLevelId);
  if (index < 0) {
    alert("This saved level no longer exists. Use Save as New Level instead.");
    loadedLevelId = null;
    updateUpdateButton();
    populateLevelPicker();
    return;
  }

  existing[index] = { ...existing[index], ...data, id: loadedLevelId, custom: true };
  saveCustomLevels(existing);
  populateLevelPicker();
  document.getElementById("level-picker").value = loadedLevelId;
  alert(`Updated "${data.name}"!`);
});

document.getElementById("export-json").addEventListener("click", () => {
  const data = {
    name: document.getElementById("ed-name").value,
    bpm: Number(document.getElementById("ed-bpm").value),
    obstacles,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = (data.name || "level").replace(/\s+/g, "-").toLowerCase() + ".json";
  a.click();
});

document.getElementById("import-json-btn").addEventListener("click", () => {
  document.getElementById("import-json").click();
});

document.getElementById("import-json").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (obstacles.length && !confirm("Import this file? Any unsaved changes will be lost.")) {
        e.target.value = "";
        return;
      }
      applyLevelToEditor(
        { name: data.name || "Imported Level", bpm: data.bpm || 140, obstacles: data.obstacles || [] },
        "import"
      );
      document.getElementById("level-picker").value = "";
      loadedLevelId = null;
      updateUpdateButton();
    } catch {
      alert("Invalid JSON file.");
    }
    e.target.value = "";
  };
  reader.readAsText(file);
});

document.getElementById("test-level").addEventListener("click", () => {
  const name = document.getElementById("ed-name").value.trim() || "Test Level";
  const bpm = Number(document.getElementById("ed-bpm").value) || 140;
  if (!obstacles.some((o) => o.type === "finish")) {
    alert("Add a Finish marker before testing.");
    return;
  }
  const id = "test-" + Date.now();
  const level = { id, name, bpm, obstacles: obstacles.map((o) => ({ ...o })), custom: true };
  const existing = loadCustomLevels().filter((l) => !l.id.startsWith("test-"));
  existing.push(level);
  saveCustomLevels(existing);
  window.location.href = `index.html?play=${id}`;
});

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  scrollX = Math.max(0, scrollX + e.deltaY);
  updateStatus();
});

canvas.addEventListener("mousedown", (e) => {
  const { x: sx, y: sy } = canvasCoords(e);

  if (e.button === 1 || e.shiftKey) {
    panning = true;
    panStartX = e.clientX;
    panStartScroll = scrollX;
    return;
  }

  const hit = findAt(sx, sy);

  if (tool === "erase") {
    if (hit) {
      pushUndo();
      obstacles = obstacles.filter((o) => o !== hit);
      if (selectedObj === hit) selectedObj = null;
      updatePropsPanel();
      updateStatus();
    }
    return;
  }

  if (hit) {
    selectedObj = hit;
    const handle = findHandle(sx, sy);
    if (handle) {
      beginResize(handle, sx, sy);
    } else {
      beginMove(hit, sx, sy);
    }
    updatePropsPanel();
    return;
  }

  if (tool === "select") {
    selectedObj = null;
    updatePropsPanel();
    return;
  }

  placeAt(sx);
});

canvas.addEventListener("mousemove", (e) => {
  const { x: sx, y: sy } = canvasCoords(e);

  if (panning) {
    scrollX = Math.max(0, panStartScroll + (panStartX - e.clientX));
    updateStatus();
    return;
  }

  if (interaction && selectedObj) {
    if (interaction.type === "move") {
      applyMove(selectedObj, sx, sy, interaction.start);
    } else if (interaction.type === "resize") {
      applyResize(selectedObj, interaction.handle, sx, sy, interaction.start);
    }
    obstacles.sort((a, b) => a.x - b.x);
    updatePropsPanel();
    updateStatus();
    return;
  }

  const handle = selectedObj ? findHandle(sx, sy) : null;
  canvas.style.cursor = handle ? handle.cursor : "crosshair";
});

canvas.addEventListener("mouseup", () => {
  interaction = null;
  panning = false;
});

window.addEventListener("keydown", (e) => {
  const inField =
    document.activeElement.tagName === "INPUT" ||
    document.activeElement.tagName === "SELECT" ||
    document.activeElement.tagName === "TEXTAREA";

  if ((e.ctrlKey || e.metaKey) && e.code === "KeyC" && !inField) {
    if (copySelection()) e.preventDefault();
    return;
  }

  if ((e.ctrlKey || e.metaKey) && e.code === "KeyV" && !inField) {
    if (pasteClipboard()) e.preventDefault();
    return;
  }

  if ((e.ctrlKey || e.metaKey) && e.code === "KeyZ" && !inField && !e.shiftKey) {
    if (undoEditor()) e.preventDefault();
    return;
  }

  if (
    (e.ctrlKey || e.metaKey) &&
    !inField &&
    (e.code === "KeyY" || (e.code === "KeyZ" && e.shiftKey))
  ) {
    if (redoEditor()) e.preventDefault();
    return;
  }

  if (e.code === "Delete" || e.code === "Backspace") {
    if (selectedObj && !inField) {
      e.preventDefault();
      pushUndo();
      obstacles = obstacles.filter((o) => o !== selectedObj);
      selectedObj = null;
      updatePropsPanel();
      updateStatus();
    }
  }
});

canvas.addEventListener("contextmenu", (e) => e.preventDefault());

document.querySelector('.tool[data-type="select"]').classList.add("active");

populateLevelPicker();
updateUpdateButton();

const editId = new URLSearchParams(location.search).get("edit");
if (editId) {
  const level = getAllLevels().find((l) => l.id === editId);
  if (level) {
    applyLevelToEditor(level, level.custom ? "custom" : "builtin");
    document.getElementById("level-picker").value = editId;
  }
}

const musicVolumeInput = document.getElementById("ed-music-volume");
const musicVolumeLabel = document.getElementById("ed-music-volume-label");

function updateMusicVolumeLabel() {
  if (!musicVolumeLabel || !musicVolumeInput) return;
  musicVolumeLabel.textContent = `${musicVolumeInput.value}%`;
}

if (musicVolumeInput) {
  musicVolumeInput.value = String(Math.round(getMusicVolume() * 100));
  updateMusicVolumeLabel();
  musicVolumeInput.addEventListener("input", () => {
    setMusicVolume(Number(musicVolumeInput.value) / 100);
    updateMusicVolumeLabel();
  });
}

const sfxVolumeInput = document.getElementById("ed-sfx-volume");
const sfxVolumeLabel = document.getElementById("ed-sfx-volume-label");

function updateSfxVolumeLabel() {
  if (!sfxVolumeLabel || !sfxVolumeInput) return;
  sfxVolumeLabel.textContent = `${sfxVolumeInput.value}%`;
}

if (sfxVolumeInput) {
  sfxVolumeInput.value = String(Math.round(getSfxVolume() * 100));
  updateSfxVolumeLabel();
  sfxVolumeInput.addEventListener("input", () => {
    setSfxVolume(Number(sfxVolumeInput.value) / 100);
    updateSfxVolumeLabel();
  });
}

loop();
updateStatus();

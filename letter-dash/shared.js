const GAME = {
  W: 1280,
  H: 720,
  GROUND_Y: 640,
  GRAVITY: 0.65,
  JUMP_FORCE: -11.5,
  GLIDE_GRAVITY: 0.18,
  SCROLL_SPEED: 6,
  PLAYER_SIZE: 36,
  CANVAS_TOP_MARGIN: 16,
  COLORS: {
    player: "#00d4ff",
    spike: "#f472b6",
    ceilingSpike: "#fb7185",
    block: "#a855f7",
    platform: "#6366f1",
    oneWayPlatform: "#2dd4bf",
    movingPlatform: "#818cf8",
    speedPadBoost: "#f59e0b",
    speedPadSlow: "#38bdf8",
    bonus: "#facc15",
    superbonus: "#e879f9",
    bomb: "#3f3f46",
    portalFrog: "#22c55e",
    portalRocket: "#00d4ff",
    deco: "#334155",
    ground: "#1e293b",
    grid: "#1a2332",
  },
};

function platformMinYOff(height) {
  const { GROUND_Y, CANVAS_TOP_MARGIN } = GAME;
  return CANVAS_TOP_MARGIN + (height || 20) - GROUND_Y;
}

function clampPlatformYOff(obs) {
  if (obs.type !== "platform" && obs.type !== "movingPlatform" && obs.type !== "oneWayPlatform") return;
  const min = platformMinYOff(obs.h);
  obs.yOff = Math.min(-20, Math.max(min, obs.yOff || 0));
}

function clampCeilingSpikeYOff(obs) {
  if (obs.type !== "ceilingSpike") return;
  const { GROUND_Y, CANVAS_TOP_MARGIN } = GAME;
  const h = obs.h || 40;
  const max = GROUND_Y - CANVAS_TOP_MARGIN - h - 40;
  obs.yOff = Math.max(0, Math.min(max, obs.yOff || 0));
}

function obstacleScreenRect(obs, scrollX, editorHitArea) {
  const { GROUND_Y } = GAME;
  const sx = obs.x - scrollX + 200;

  if (obs.type === "spike") {
    return { ...obs, x: sx, y: GROUND_Y - obs.h, w: obs.h * 0.8, h: obs.h };
  }
  if (obs.type === "ceilingSpike") {
    const { CANVAS_TOP_MARGIN } = GAME;
    const y = CANVAS_TOP_MARGIN + (obs.yOff || 0);
    return { ...obs, x: sx, y, w: obs.h * 0.8, h: obs.h };
  }
  if (obs.type === "block") {
    return { ...obs, x: sx, y: GROUND_Y - obs.h, w: obs.w || 50, h: obs.h };
  }
  if (obs.type === "platform" || obs.type === "movingPlatform" || obs.type === "oneWayPlatform") {
    const py = GROUND_Y + (obs.yOff || 0);
    return { ...obs, x: sx, y: py - obs.h, w: obs.w || 100, h: obs.h };
  }
  if (obs.type === "speedPad") {
    const py = GROUND_Y + (obs.yOff || 0);
    const h = obs.h || 24;
    return { ...obs, x: sx, y: py - h, w: obs.w || 70, h };
  }
  if (obs.type === "bonus" || obs.type === "superbonus") {
    const py = GROUND_Y + (obs.yOff || 0);
    const size = obs.h || obs.w || 44;
    return { ...obs, x: sx, y: py - size, w: obs.w || size, h: size };
  }
  if (obs.type === "bomb") {
    const py = GROUND_Y + (obs.yOff || 0);
    const size = obs.h || obs.w || 40;
    return { ...obs, x: sx, y: py - size, w: obs.w || size, h: size };
  }
  if (obs.type === "jacob") {
    const py = GROUND_Y + (obs.yOff || 0);
    const h = obs.h || 50;
    const w = obs.w || 36;
    return { ...obs, x: sx, y: py - h, w, h };
  }
  if (obs.type === "rowan") {
    const py = GROUND_Y + (obs.yOff || 0);
    const h = obs.h || 50;
    const w = obs.w || 38;
    return { ...obs, x: sx, y: py - h, w, h };
  }
  if (obs.type === "portalFrog" || obs.type === "portalKangaroo" || obs.type === "portalRocket") {
    const py = GROUND_Y + (obs.yOff || 0);
    const size = obs.h || obs.w || 56;
    return { ...obs, x: sx, y: py - size, w: obs.w || size, h: size };
  }
  if (obs.type === "gap") {
    const w = obs.w || 80;
    const h = editorHitArea ? 40 : 10;
    const y = editorHitArea ? GROUND_Y - 30 : GROUND_Y;
    return { ...obs, x: sx, y, w, h };
  }
  if (obs.type === "finish") {
    return { ...obs, x: sx, y: GROUND_Y - 100, w: obs.w || 60, h: 100 };
  }
  return { ...obs, x: sx, y: GROUND_Y - 40, w: 50, h: 40 };
}

function getMovingPlatformOffset(obs, animTime) {
  const t = animTime ?? performance.now();
  const speed = obs.moveSpeed ?? 1;
  const range = obs.moveRange ?? 80;
  const phase = obs.phase ?? 0;
  const axis = obs.moveAxis || "y";
  const offset = Math.sin(t * 0.003 * speed + phase) * (range / 2);
  return axis === "x" ? { dx: offset, dy: 0 } : { dx: 0, dy: offset };
}

function buildObstacleRects(obstacles, scrollX, screenW, animTime) {
  const rects = [];
  const { W } = GAME;
  const viewW = screenW || W;
  const margin = 100;

  obstacles.forEach((obs, i) => {
    let rect = obstacleScreenRect(obs, scrollX, false);
    if (obs.type === "movingPlatform") {
      const off = getMovingPlatformOffset(obs, animTime);
      rect = { ...rect, x: rect.x + off.dx, y: rect.y + off.dy };
    }
    if (rect.x + rect.w < -margin || rect.x > viewW + margin) return;
    rects.push({ ...rect, obstacleIndex: i });
  });
  return rects;
}

function rectsOverlap(a, b, pad = 4) {
  return (
    a.x + pad < b.x + b.w - pad &&
    a.x + a.w - pad > b.x + pad &&
    a.y + pad < b.y + b.h - pad &&
    a.y + a.h - pad > b.y + pad
  );
}

const PARALLAX_BG = (() => {
  const stars = [];
  for (let i = 0; i < 90; i++) {
    stars.push({
      x: (i * 173.7 + 41) % 1280,
      y: (i * 97.1 + 12) % 380,
      r: (i % 4) * 0.35 + 0.45,
      twinkle: i * 1.37,
      parallax: 0.04 + (i % 5) * 0.012,
    });
  }

  const buildings = [];
  for (let i = 0; i < 14; i++) {
    buildings.push({
      x: i * 68 + (i % 3) * 12,
      w: 36 + (i % 4) * 18,
      h: 70 + (i % 5) * 38,
      windows: 2 + (i % 3),
      hue: i % 3,
    });
  }

  const hills = [];
  for (let i = 0; i < 6; i++) {
    hills.push({
      x: i * 220,
      w: 280 + (i % 2) * 80,
      h: 55 + (i % 3) * 28,
      phase: i * 1.8,
    });
  }

  return { stars, buildings, hills };
})();

function parallaxOffset(scrollX, speed, span) {
  return -((scrollX * speed) % span);
}

function drawParallaxSky(ctx) {
  const { W, H, GROUND_Y } = GAME;
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  sky.addColorStop(0, "#060a14");
  sky.addColorStop(0.45, "#0f172a");
  sky.addColorStop(0.85, "#151f33");
  sky.addColorStop(1, "#1a2740");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createLinearGradient(0, GROUND_Y - 120, 0, GROUND_Y);
  glow.addColorStop(0, "rgba(0, 212, 255, 0)");
  glow.addColorStop(0.55, "rgba(99, 102, 241, 0.08)");
  glow.addColorStop(1, "rgba(0, 212, 255, 0.14)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, GROUND_Y - 120, W, 120);
}

function drawParallaxStars(ctx, scrollX, time) {
  const { W } = GAME;
  for (const star of PARALLAX_BG.stars) {
    const x = ((star.x + scrollX * star.parallax) % (W + 20)) - 10;
    const twinkle = 0.35 + Math.sin(time * 0.002 + star.twinkle) * 0.25;
    ctx.fillStyle = `rgba(220, 235, 255, ${twinkle})`;
    ctx.beginPath();
    ctx.arc(x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawParallaxHills(ctx, scrollX) {
  const { W, GROUND_Y } = GAME;
  const speed = 0.1;
  const span = 520;
  const baseY = GROUND_Y - 18;
  const off = parallaxOffset(scrollX, speed, span);

  for (let tile = off - span; tile < W + span; tile += span) {
    for (const hill of PARALLAX_BG.hills) {
      const hx = tile + hill.x;
      const peak = baseY - hill.h;
      ctx.fillStyle = "#121a2a";
      ctx.beginPath();
      ctx.moveTo(hx, baseY);
      ctx.quadraticCurveTo(hx + hill.w * 0.35, peak - 12, hx + hill.w * 0.5, peak);
      ctx.quadraticCurveTo(hx + hill.w * 0.72, peak + 8, hx + hill.w, baseY);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function drawParallaxBuildings(ctx, scrollX, time) {
  const { W, GROUND_Y } = GAME;
  const speed = 0.24;
  const span = 960;
  const off = parallaxOffset(scrollX, speed, span);
  const baseY = GROUND_Y - 6;

  for (let tile = off - span; tile < W + span; tile += span) {
    for (const b of PARALLAX_BG.buildings) {
      const bx = tile + b.x;
      const by = baseY - b.h;
      const colors = ["#1a2236", "#1c2540", "#1e1b35"];
      ctx.fillStyle = colors[b.hue];
      ctx.fillRect(bx, by, b.w, b.h);

      const winW = Math.max(6, b.w / (b.windows + 1) - 4);
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < b.windows; col++) {
          const flicker = Math.sin(time * 0.0015 + bx * 0.02 + row + col) > -0.2;
          ctx.fillStyle = flicker ? "rgba(0, 212, 255, 0.22)" : "rgba(251, 191, 36, 0.12)";
          ctx.fillRect(
            bx + 6 + col * (winW + 4),
            by + 10 + row * 16,
            winW,
            8
          );
        }
      }
    }
  }
}

function drawParallaxOrbs(ctx, scrollX, time) {
  const { W, H } = GAME;
  const orbs = [
    { x: 120, y: 140, r: 90, color: "rgba(168, 85, 247, 0.12)", speed: 0.18 },
    { x: 520, y: 220, r: 120, color: "rgba(0, 212, 255, 0.1)", speed: 0.14 },
    { x: 900, y: 100, r: 70, color: "rgba(244, 114, 182, 0.11)", speed: 0.2 },
    { x: 300, y: 320, r: 100, color: "rgba(99, 102, 241, 0.09)", speed: 0.16 },
  ];

  for (const orb of orbs) {
    const x = ((orb.x + scrollX * orb.speed) % (W + orb.r * 2)) - orb.r;
    const pulse = 1 + Math.sin(time * 0.001 + orb.x) * 0.06;
    const grad = ctx.createRadialGradient(x, orb.y, 0, x, orb.y, orb.r * pulse);
    grad.addColorStop(0, orb.color);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, orb.y, orb.r * pulse, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawParallaxLetters(ctx, scrollX) {
  const { W, COLORS } = GAME;
  const decoLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const layers = [
    { speed: 0.32, alpha: 0.045, size: 42, count: 6, yBase: 50 },
    { speed: 0.48, alpha: 0.07, size: 56, count: 5, yBase: 90 },
  ];

  for (const layer of layers) {
    ctx.font = `bold ${layer.size}px monospace`;
    ctx.globalAlpha = layer.alpha;
    for (let i = 0; i < layer.count; i++) {
      const dx = ((scrollX * layer.speed + i * 240) % (W + 140)) - 70;
      const dy = layer.yBase + (i % 3) * 150 + (i % 2) * 40;
      ctx.fillStyle = i % 2 === 0 ? COLORS.deco : "#3b4a63";
      ctx.fillText(decoLetters[(i * 5 + 2) % 26], dx, dy);
    }
  }
  ctx.globalAlpha = 1;
}

function drawParallaxGrid(ctx, scrollX) {
  const { W, H, COLORS, GROUND_Y } = GAME;
  const gridOff = parallaxOffset(scrollX, 0.55, 40);

  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.55;
  for (let x = gridOff; x < W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, GROUND_Y);
    ctx.stroke();
  }
  for (let y = 0; y < GROUND_Y; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawBackground(ctx, scrollX, animTime) {
  const { W } = GAME;
  const time = animTime ?? performance.now();

  drawParallaxSky(ctx);
  drawParallaxStars(ctx, scrollX, time);
  drawParallaxHills(ctx, scrollX);
  drawParallaxOrbs(ctx, scrollX, time);
  drawParallaxBuildings(ctx, scrollX, time);
  drawParallaxLetters(ctx, scrollX);
  drawParallaxGrid(ctx, scrollX);

  ctx.strokeStyle = "rgba(244, 114, 182, 0.25)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, GAME.CANVAS_TOP_MARGIN);
  ctx.lineTo(W, GAME.CANVAS_TOP_MARGIN);
  ctx.stroke();
}

function drawGround(ctx, obstacles) {
  const { W, H, GROUND_Y, COLORS } = GAME;
  ctx.fillStyle = COLORS.ground;
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);

  ctx.strokeStyle = "#00d4ff";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#00d4ff";
  ctx.shadowBlur = 8;

  let segStart = 0;
  const gaps = obstacles.filter((o) => o.type === "gap").sort((a, b) => a.x - b.x);
  for (const gap of gaps) {
    if (gap.x > segStart) {
      ctx.beginPath();
      ctx.moveTo(segStart, GROUND_Y);
      ctx.lineTo(gap.x, GROUND_Y);
      ctx.stroke();
    }
    segStart = gap.x + gap.w;
  }
  if (segStart < W) {
    ctx.beginPath();
    ctx.moveTo(segStart, GROUND_Y);
    ctx.lineTo(W, GROUND_Y);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
}

function drawRocket(ctx, x, y, size, color, showFlame) {
  const cx = x + size / 2;
  const h = size;
  const w = size;

  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 14;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + 6, y + h - 6);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + 14, y + h - 2);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x + w - 6, y + h - 6);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w - 14, y + h - 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = color;
  ctx.fillRect(x + 9, y + 14, w - 18, h - 16);

  ctx.beginPath();
  ctx.moveTo(cx, y + 4);
  ctx.lineTo(x + w - 9, y + 16);
  ctx.lineTo(x + 9, y + 16);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#e0f7ff";
  ctx.beginPath();
  ctx.arc(cx, y + h * 0.48, size * 0.14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#7dd3fc";
  ctx.beginPath();
  ctx.arc(cx - 2, y + h * 0.46, size * 0.06, 0, Math.PI * 2);
  ctx.fill();

  if (showFlame) {
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.moveTo(cx - 7, y + h - 4);
    ctx.lineTo(cx, y + h + 12);
    ctx.lineTo(cx + 7, y + h - 4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.moveTo(cx - 4, y + h - 4);
    ctx.lineTo(cx, y + h + 7);
    ctx.lineTo(cx + 4, y + h - 4);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function drawFrog(ctx, x, y, size) {
  const cx = x + size / 2;
  const h = size;
  const w = size;

  ctx.save();
  ctx.shadowColor = "#16a34a";
  ctx.shadowBlur = 10;

  ctx.fillStyle = "#15803d";
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.2, y + h * 0.18, w * 0.14, h * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.2, y + h * 0.18, w * 0.14, h * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#4ade80";
  ctx.beginPath();
  ctx.ellipse(cx, y + h * 0.52, w * 0.34, h * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.24, y + h * 0.78, w * 0.12, h * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.24, y + h * 0.78, w * 0.12, h * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(cx - w * 0.2, y + h * 0.18, w * 0.05, 0, Math.PI * 2);
  ctx.arc(cx + w * 0.2, y + h * 0.18, w * 0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#14532d";
  ctx.beginPath();
  ctx.arc(cx - w * 0.2, y + h * 0.18, w * 0.025, 0, Math.PI * 2);
  ctx.arc(cx + w * 0.2, y + h * 0.18, w * 0.025, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#86efac";
  ctx.beginPath();
  ctx.arc(cx, y + h * 0.56, w * 0.08, 0, Math.PI);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.restore();
}

const PlayerSprites = (() => {
  const sprites = {
    jordan: { img: new Image(), ready: false, src: "assets/player-jordan.png" },
    rowan: { img: new Image(), ready: false, src: "assets/player-rowan.png" },
  };

  for (const key of Object.keys(sprites)) {
    const entry = sprites[key];
    entry.img.onload = () => {
      entry.ready = true;
    };
    entry.img.onerror = () => {
      entry.ready = false;
    };
    entry.img.src = entry.src;
  }

  function drawJordan(ctx, x, y, boxSize) {
    const entry = sprites.jordan;
    if (!entry.ready) {
      drawRocket(ctx, x, y, boxSize, GAME.COLORS.player, false);
      return;
    }

    const img = entry.img;
    const drawH = boxSize * 2.65;
    const drawW = (img.width / img.height) * drawH;
    const drawX = x + (boxSize - drawW) / 2;
    const drawY = y + boxSize - drawH;

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }

  function drawCharacterSprite(ctx, entry, x, y, boxW, boxH, fallbackColor, fallbackLetter) {
    const feetX = x + boxW / 2;
    if (!entry?.ready) {
      ctx.fillStyle = fallbackColor;
      ctx.fillRect(x, y, boxW, boxH);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.min(boxW, boxH) * 0.35}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(fallbackLetter, feetX, y + boxH / 2);
      return;
    }

    const img = entry.img;
    const drawH = boxH * 0.98;
    const drawW = (img.width / img.height) * drawH;
    const drawX = x + (boxW - drawW) / 2;
    const drawY = y + boxH - drawH;
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.shadowBlur = 0;
  }

  function drawJacob(ctx, x, y, boxW, boxH, opts = {}) {
    const { flames = false, rotation = 0, label = false } = opts;
    const entry = sprites.jordan;
    const feetX = x + boxW / 2;
    const feetY = y + boxH;

    ctx.save();
    if (rotation) {
      ctx.translate(feetX, feetY);
      ctx.rotate(rotation);
      ctx.translate(-feetX, -feetY);
    }

    drawCharacterSprite(ctx, entry, x, y, boxW, boxH, "#2dd4bf", "J");

    if (label) {
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("Jacob", feetX, y - 3);
    }

    if (flames) {
      drawRocketFlames(ctx, feetX, feetY, Math.max(0.8, boxH / 50));
    }

    ctx.restore();
  }

  function drawRowan(ctx, x, y, boxW, boxH, opts = {}) {
    const { label = false } = opts;
    const entry = sprites.rowan;
    const feetX = x + boxW / 2;

    ctx.save();
    drawCharacterSprite(ctx, entry, x, y, boxW, boxH, "#84cc16", "R");

    if (label) {
      ctx.fillStyle = "#ecfccb";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("Rowan", feetX, y - 3);
    }

    ctx.restore();
  }

  return {
    drawJordan,
    drawJacob,
    drawRowan,
    isReady(name) {
      return !!sprites[name]?.ready;
    },
  };
})();

function drawRocketFlames(ctx, cx, feetY, scale = 1) {
  ctx.save();
  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.moveTo(cx - 7 * scale, feetY - 2);
  ctx.lineTo(cx, feetY + 14 * scale);
  ctx.lineTo(cx + 7 * scale, feetY - 2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#fde047";
  ctx.beginPath();
  ctx.moveTo(cx - 4 * scale, feetY - 2);
  ctx.lineTo(cx, feetY + 8 * scale);
  ctx.lineTo(cx + 4 * scale, feetY - 2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#fff7ed";
  ctx.beginPath();
  ctx.moveTo(cx - 2 * scale, feetY);
  ctx.lineTo(cx, feetY + 4 * scale);
  ctx.lineTo(cx + 2 * scale, feetY);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPortal(ctx, x, y, w, h, variant, animTime) {
  const { COLORS } = GAME;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const t = animTime ?? performance.now();
  const r = Math.min(w, h) / 2;
  const spin = t * 0.004;
  const isFrog = variant === "portalFrog" || variant === "portalKangaroo";
  const color = isFrog ? COLORS.portalFrog : COLORS.portalRocket;
  const inner = isFrog ? "#16a34a" : "#6366f1";

  ctx.save();
  ctx.translate(cx, cy);

  ctx.shadowColor = color;
  ctx.shadowBlur = 18 + Math.sin(t * 0.008) * 6;

  const outer = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r);
  outer.addColorStop(0, "rgba(255,255,255,0.95)");
  outer.addColorStop(0.35, color);
  outer.addColorStop(0.75, inner);
  outer.addColorStop(1, "rgba(15,23,42,0)");
  ctx.fillStyle = outer;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(spin);
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.92, r * 0.55, (i * Math.PI) / 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.rotate(-spin * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${r * 0.75}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(isFrog ? "F" : "🚀", 0, 1);
  ctx.restore();
}

function drawLetter(ctx, x, y, w, h, letter, color, glow) {
  ctx.save();
  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
  }
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.min(w, h) * 0.65}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, x + w / 2, y + h / 2);
  ctx.restore();
}

function drawBomb(ctx, x, y, w, h, animTime) {
  const { COLORS } = GAME;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = Math.min(w, h) * 0.42;
  const t = animTime ?? performance.now();

  ctx.save();
  ctx.shadowColor = "#ef4444";
  ctx.shadowBlur = 8;

  ctx.fillStyle = COLORS.bomb;
  ctx.beginPath();
  ctx.arc(cx, cy + r * 0.1, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#52525b";
  ctx.beginPath();
  ctx.arc(cx - r * 0.35, cy - r * 0.05, r * 0.22, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#a16207";
  ctx.lineWidth = Math.max(2, r * 0.14);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx + r * 0.2, cy - r * 0.55);
  ctx.quadraticCurveTo(cx + r * 0.7, cy - r * 1.1, cx + r * 0.45, cy - r * 1.35);
  ctx.stroke();

  const spark = 0.5 + Math.sin(t * 0.02) * 0.5;
  ctx.fillStyle = `rgba(251, 191, 36, ${0.6 + spark * 0.4})`;
  ctx.shadowColor = "#fbbf24";
  ctx.shadowBlur = 10 + spark * 8;
  ctx.beginPath();
  ctx.arc(cx + r * 0.45, cy - r * 1.35, 3 + spark * 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawSuperBonus(ctx, x, y, w, h, animTime) {
  const { COLORS } = GAME;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const t = animTime ?? performance.now();
  const pulse = 0.85 + Math.sin(t * 0.006) * 0.15;
  const r = (Math.min(w, h) / 2) * pulse;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.sin(t * 0.002) * 0.15);

  ctx.shadowColor = COLORS.superbonus;
  ctx.shadowBlur = 22 + Math.sin(t * 0.01) * 8;

  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
  grad.addColorStop(0, "#fff");
  grad.addColorStop(0.35, "#fde047");
  grad.addColorStop(0.7, COLORS.superbonus);
  grad.addColorStop(1, "#6366f1");
  ctx.fillStyle = grad;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const outer = i % 2 === 0 ? r : r * 0.45;
    const px = Math.cos(angle) * outer;
    const py = Math.sin(angle) * outer;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${r * 0.9}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("★", 0, 2);
  ctx.restore();
}

function drawBonus(ctx, x, y, w, h) {
  const { COLORS } = GAME;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = Math.min(w, h) / 2;

  ctx.save();
  ctx.shadowColor = COLORS.bonus;
  ctx.shadowBlur = 14;
  ctx.fillStyle = COLORS.bonus;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#422006";
  ctx.beginPath();
  ctx.arc(cx - r * 0.32, cy - r * 0.15, r * 0.1, 0, Math.PI * 2);
  ctx.arc(cx + r * 0.32, cy - r * 0.15, r * 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#422006";
  ctx.lineWidth = Math.max(2, r * 0.12);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy + r * 0.05, r * 0.38, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
  ctx.restore();
}

function drawSpike(ctx, x, y, w, h, letter, color) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${h * 0.4}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, x + w / 2, y + h * 0.65);
  ctx.restore();
}

function drawCeilingSpike(ctx, x, y, w, h, letter, color) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + h);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${h * 0.4}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, x + w / 2, y + h * 0.35);
  ctx.restore();
}

function drawOneWayPlatform(ctx, x, y, w, h, letter, color) {
  ctx.save();
  ctx.globalAlpha = 0.88;
  drawLetter(ctx, x, y, w, h, letter, color, true);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(x + 4, y + h - 2);
  ctx.lineTo(x + w - 4, y + h - 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  const arrowStep = Math.max(28, w / 4);
  const arrowY = y + h - 6;
  for (let ax = x + arrowStep / 2; ax < x + w - 8; ax += arrowStep) {
    ctx.beginPath();
    ctx.moveTo(ax - 4, arrowY - 3);
    ctx.lineTo(ax, arrowY + 2);
    ctx.lineTo(ax + 4, arrowY - 3);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawMovingPlatform(ctx, x, y, w, h, letter, color) {
  drawLetter(ctx, x, y, w, h, letter, color, true);
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
  ctx.setLineDash([]);
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.max(10, h * 0.55)}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("↕", x + w - 10, y + h / 2);
  ctx.restore();
}

function drawSpeedPad(ctx, x, y, w, h, speedMult) {
  const { COLORS } = GAME;
  const boost = (speedMult ?? 1.5) >= 1;
  const color = boost ? COLORS.speedPadBoost : COLORS.speedPadSlow;
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.shadowBlur = 0;
  const stripeStep = 14;
  ctx.fillStyle = boost ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.2)";
  for (let sx = x + 4; sx < x + w - 4; sx += stripeStep) {
    ctx.fillRect(sx, y + 4, 6, h - 8);
  }
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.max(12, h * 0.55)}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(boost ? "»»" : "««", x + w / 2, y + h / 2);
  ctx.restore();
}

function drawObstacles(ctx, obstacles) {
  const { COLORS } = GAME;
  for (const obs of obstacles) {
    if (obs.type === "gap") continue;
    if (obs.type === "spike") {
      drawSpike(ctx, obs.x, obs.y, obs.w, obs.h, obs.letter, COLORS.spike);
    } else if (obs.type === "ceilingSpike") {
      drawCeilingSpike(ctx, obs.x, obs.y, obs.w, obs.h, obs.letter, COLORS.ceilingSpike);
    } else if (obs.type === "bonus") {
      drawBonus(ctx, obs.x, obs.y, obs.w, obs.h);
    } else if (obs.type === "superbonus") {
      drawSuperBonus(ctx, obs.x, obs.y, obs.w, obs.h);
    } else if (obs.type === "bomb") {
      drawBomb(ctx, obs.x, obs.y, obs.w, obs.h);
    } else if (obs.type === "jacob") {
      PlayerSprites.drawJacob(ctx, obs.x, obs.y, obs.w, obs.h, { label: true });
    } else if (obs.type === "rowan") {
      PlayerSprites.drawRowan(ctx, obs.x, obs.y, obs.w, obs.h, { label: true });
    } else if (obs.type === "portalFrog" || obs.type === "portalKangaroo") {
      drawPortal(ctx, obs.x, obs.y, obs.w, obs.h, "portalFrog");
    } else if (obs.type === "portalRocket") {
      drawPortal(ctx, obs.x, obs.y, obs.w, obs.h, "portalRocket");
    } else if (obs.type === "oneWayPlatform") {
      drawOneWayPlatform(ctx, obs.x, obs.y, obs.w, obs.h, obs.letter, COLORS.oneWayPlatform);
    } else if (obs.type === "movingPlatform") {
      drawMovingPlatform(ctx, obs.x, obs.y, obs.w, obs.h, obs.letter, COLORS.movingPlatform);
    } else if (obs.type === "speedPad") {
      drawSpeedPad(ctx, obs.x, obs.y, obs.w, obs.h, obs.speedMult);
    } else if (obs.type === "finish") {
      drawLetter(ctx, obs.x, obs.y, obs.w, obs.h, obs.letter, "#fbbf24", true);
      ctx.fillStyle = "rgba(251, 191, 36, 0.2)";
      ctx.fillRect(obs.x - 10, obs.y - 10, obs.w + 20, obs.h + 20);
    } else {
      const color = obs.type === "platform" ? COLORS.platform : COLORS.block;
      drawLetter(ctx, obs.x, obs.y, obs.w, obs.h, obs.letter, color, true);
    }
  }
}

function drawGapMarkers(ctx, obstacles) {
  const { GROUND_Y } = GAME;
  for (const obs of obstacles) {
    if (obs.type !== "gap") continue;
    ctx.fillStyle = "rgba(244, 114, 182, 0.25)";
    ctx.fillRect(obs.x, GROUND_Y - 4, obs.w, 8);
    ctx.fillStyle = "#f472b6";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText("GAP", obs.x + obs.w / 2, GROUND_Y - 12);
  }
}

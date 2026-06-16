const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const overlay = document.getElementById("overlay");
const hud = document.getElementById("hud");
const deathScreen = document.getElementById("death-screen");
const pointScoreEl = document.getElementById("point-score");
const progressEl = document.getElementById("progress");
const levelNameEl = document.getElementById("level-name");
const deathScoreEl = document.getElementById("death-score");
const deathHighscoreEl = document.getElementById("death-highscore");
const highScoresListEl = document.getElementById("high-scores-list");
const startBtn = document.getElementById("start-btn");
const playerNameInput = document.getElementById("player-name");
const characterSelect = document.getElementById("character-select");
const characterPreview = document.getElementById("character-preview");
const retryBtn = document.getElementById("retry-btn");
const restartBtn = document.getElementById("restart-btn");
const quitBtn = document.getElementById("quit-btn");
const menuBtn = document.getElementById("menu-btn");
const levelSelect = document.getElementById("level-select");
const muteBtn = document.getElementById("mute-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const fullscreenHudBtn = document.getElementById("fullscreen-hud-btn");
const reverseIndicatorEl = document.getElementById("reverse-indicator");
const deathStatsEl = document.getElementById("death-stats");
const gameContainer = document.getElementById("game-container");

const { W, H, GROUND_Y, GRAVITY, JUMP_FORCE, GLIDE_GRAVITY, SCROLL_SPEED, PLAYER_SIZE, COLORS } = GAME;
const COYOTE_FRAMES = 10;
const JUMP_BUFFER_FRAMES = 12;

let currentLevel = null;
let levelObstacles = [];
let levelLength = 1000;
let state = "menu";
let scrollX = 0;
let holding = false;
let reverseActive = false;
let playerForm = "rocket";
const FROG_MAX_AIR_JUMPS = 2;
let frogAirJumpsUsed = 0;
let portalContacts = new Set();
let player = { x: 120, y: GROUND_Y - PLAYER_SIZE, vy: 0, onGround: true };
let particles = [];
let scorePopups = [];
let screenFlash = 0;
let bombFlash = 0;
let superFlash = 0;
let lightBurst = null;
let superRings = [];
let explosions = [];
let hitBombIds = new Set();
let launchedJacobIds = new Set();
let flyingJacobs = [];
let rowanBounces = new Map();
let rowanContacts = new Set();
let hitSpeedPadIds = new Set();
let scrollSpeedMod = 1;
let scrollSpeedModFrames = 0;
let shake = 0;
let lastTime = 0;
let totalScore = 0;
let scoredObstacleIds = new Set();
let playerName = "";
let coyoteFrames = 0;
let jumpBufferFrames = 0;
let runStartTime = 0;
let runStats = {
  letters: 0,
  bonuses: 0,
  superBonuses: 0,
  bombs: 0,
  maxCombo: 0,
  currentCombo: 0,
};

function createRunStats() {
  return {
    letters: 0,
    bonuses: 0,
    superBonuses: 0,
    bombs: 0,
    maxCombo: 0,
    currentCombo: 0,
  };
}

function updateReverseHud() {
  if (!reverseIndicatorEl) return;
  reverseIndicatorEl.classList.toggle("hidden", !reverseActive || state !== "playing");
}

function formatRunTime(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min > 0) return `${min}:${String(sec).padStart(2, "0")}`;
  return `${sec}s`;
}

function bumpCombo() {
  runStats.currentCombo++;
  runStats.maxCombo = Math.max(runStats.maxCombo, runStats.currentCombo);
}

function breakCombo() {
  runStats.currentCombo = 0;
}

function recordScoreStat(obs) {
  if (
    obs.type === "block" ||
    obs.type === "platform" ||
    obs.type === "oneWayPlatform" ||
    obs.type === "movingPlatform"
  ) {
    runStats.letters++;
  } else if (obs.type === "bonus") {
    runStats.bonuses++;
  } else if (obs.type === "superbonus") {
    runStats.superBonuses++;
  }
  bumpCombo();
}

function updateScoreDisplay() {
  if (pointScoreEl) pointScoreEl.textContent = totalScore + " pts";
}

function renderHighScores() {
  if (!highScoresListEl) return;
  const scores = loadHighScores();
  highScoresListEl.innerHTML = "";

  if (!scores.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No scores yet — play to set one!";
    highScoresListEl.appendChild(li);
    return;
  }

  scores.forEach((entry, i) => {
    const li = document.createElement("li");
    const name = entry.name || "Player";
    li.innerHTML = `<span>${i + 1}. <strong>${name}</strong> · ${entry.level} <small>(${formatScoreDate(entry.date)})</small></span><span class="hs-points">${entry.score}</span>`;
    highScoresListEl.appendChild(li);
  });
}

function resetScore() {
  totalScore = 0;
  scoredObstacleIds = new Set();
  scorePopups = [];
  screenFlash = 0;
  bombFlash = 0;
  superFlash = 0;
  lightBurst = null;
  superRings = [];
  explosions = [];
  hitBombIds = new Set();
  updateScoreDisplay();
}

function spawnScoreEffect(obs, pts) {
  const cx = obs.x + obs.w / 2;
  const cy = obs.y + obs.h / 2;
  const isBonus = obs.type === "bonus";

  scorePopups.push({
    x: cx,
    y: cy,
    text: `+${pts}`,
    letter: isBonus ? "☺" : obs.letter,
    life: isBonus ? 65 : 50,
    maxLife: isBonus ? 65 : 50,
    bonus: isBonus,
  });

  const particleCount = isBonus ? 18 : 8;
  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.4;
    const speed = isBonus ? 2.5 + Math.random() * 3.5 : 1.5 + Math.random() * 2.5;
    particles.push({
      x: cx + (Math.random() - 0.5) * 12,
      y: cy + (Math.random() - 0.5) * 8,
      vx: Math.cos(angle) * speed * 0.6,
      vy: -Math.abs(Math.sin(angle)) * speed - (isBonus ? 2 : 1.5),
      life: isBonus ? 45 + Math.random() * 20 : 35 + Math.random() * 15,
      color: isBonus
        ? i % 3 === 0 ? "#fff" : i % 3 === 1 ? "#fde047" : "#fbbf24"
        : i % 2 === 0 ? "#fbbf24" : "#fde68a",
      size: isBonus ? 4 + Math.random() * 4 : 3 + Math.random() * 3,
      star: true,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.15,
    });
  }

  if (isBonus) {
    screenFlash = 16;
    lightBurst = { x: cx, y: cy, life: 28, maxLife: 28 };
    Music.sfxBonus();
  } else {
    Music.sfxPoints(pts);
  }

  if (pointScoreEl) {
    pointScoreEl.classList.remove("score-pop", "super-score-pop");
    void pointScoreEl.offsetWidth;
    pointScoreEl.classList.add("score-pop");
  }
}

function spawnSuperBonusEffect(obs) {
  const cx = obs.x + obs.w / 2;
  const cy = obs.y + obs.h / 2;

  scorePopups.push({
    x: cx,
    y: cy - 12,
    text: "+1000",
    letter: "★",
    life: 90,
    maxLife: 90,
    superBonus: true,
  });

  for (let i = 0; i < 42; i++) {
    const angle = (Math.PI * 2 * i) / 42 + Math.random() * 0.5;
    const speed = 3 + Math.random() * 6;
    const colors = ["#fff", "#fde047", "#e879f9", "#6366f1", "#22d3ee", "#f472b6"];
    particles.push({
      x: cx + (Math.random() - 0.5) * 16,
      y: cy + (Math.random() - 0.5) * 12,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2.5,
      life: 55 + Math.random() * 35,
      color: colors[i % colors.length],
      size: 5 + Math.random() * 7,
      star: true,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.28,
    });
  }

  for (let i = 0; i < 4; i++) {
    superRings.push({ x: cx, y: cy, life: 0, maxLife: 60, delay: i * 12 });
  }

  screenFlash = 32;
  superFlash = 40;
  lightBurst = { x: cx, y: cy, life: 58, maxLife: 58, super: true };
  Music.sfxSuperBonus();

  if (pointScoreEl) {
    pointScoreEl.classList.remove("score-pop", "super-score-pop");
    void pointScoreEl.offsetWidth;
    pointScoreEl.classList.add("score-pop", "super-score-pop");
  }
}

function spawnBombExplosion(obs) {
  const cx = obs.x + obs.w / 2;
  const cy = obs.y + obs.h / 2;

  explosions.push({ x: cx, y: cy, life: 42, maxLife: 42 });

  for (let i = 0; i < 24; i++) {
    const angle = (Math.PI * 2 * i) / 24 + Math.random() * 0.3;
    const speed = 2 + Math.random() * 5;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 30 + Math.random() * 25,
      color: i % 3 === 0 ? "#ef4444" : i % 3 === 1 ? "#f97316" : "#fde047",
      size: 4 + Math.random() * 6,
      star: false,
    });
  }

  for (let i = 0; i < 10; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 40 + Math.random() * 20,
      color: "#57534e",
      size: 3 + Math.random() * 5,
      star: false,
    });
  }

  scorePopups.push({
    x: cx,
    y: cy,
    text: "-100",
    letter: "",
    life: 60,
    maxLife: 60,
    bomb: true,
  });

  bombFlash = 14;
  shake = 10;
  Music.sfxBomb();
}

function tryLaunchJacob(obs) {
  if (obs.type !== "jacob") return;
  const id = obs.obstacleIndex;
  if (id === undefined || launchedJacobIds.has(id)) return;

  launchedJacobIds.add(id);

  const deg = 75 + Math.random() * 30;
  const rad = (deg * Math.PI) / 180;
  const speed = 14 + Math.random() * 6;
  const vx = Math.cos(rad) * speed;
  const vy = -Math.sin(rad) * speed;

  flyingJacobs.push({
    x: obs.x,
    y: obs.y,
    w: obs.w || 36,
    h: obs.h || 50,
    vx,
    vy,
    rotation: (Math.random() - 0.5) * 0.4,
    spin: (Math.random() - 0.5) * 0.12,
  });

  const cx = obs.x + obs.w / 2;
  const cy = obs.y + obs.h / 2;
  for (let i = 0; i < 14; i++) {
    const burst = Math.random() * Math.PI * 2;
    const burstSpeed = 2 + Math.random() * 5;
    particles.push({
      x: cx,
      y: cy + obs.h / 2,
      vx: Math.cos(burst) * burstSpeed,
      vy: Math.sin(burst) * burstSpeed + 2,
      life: 28 + Math.random() * 18,
      color: i % 3 === 0 ? "#fde047" : "#f97316",
      size: 3 + Math.random() * 4,
    });
  }

  Music.sfxJacobScream();
}

function getRowanBounceOffset(id) {
  return rowanBounces.get(id)?.offset || 0;
}

function tryBounceRowan(obs) {
  if (obs.type !== "rowan") return;
  const id = obs.obstacleIndex;
  if (id === undefined) return;

  let state = rowanBounces.get(id);
  if (!state) {
    state = { offset: 0, vy: 0 };
    rowanBounces.set(id, state);
  }

  state.vy = JUMP_FORCE;
  Music.sfxRowanHop();
}

function updateRowanBounces() {
  for (const state of rowanBounces.values()) {
    if (state.offset === 0 && state.vy === 0) continue;
    state.vy += GRAVITY;
    state.offset += state.vy;
    if (state.offset >= 0) {
      state.offset = 0;
      state.vy = 0;
    }
  }
}

function drawRowans(obstacles) {
  for (const obs of obstacles) {
    if (obs.type !== "rowan") continue;
    const offset = getRowanBounceOffset(obs.obstacleIndex);
    PlayerSprites.drawRowan(ctx, obs.x, obs.y + offset, obs.w, obs.h, { label: true });
  }
}

function updateFlyingJacobs() {
  for (const j of flyingJacobs) {
    j.vy += 0.18;
    j.x += j.vx;
    j.y += j.vy;
    j.rotation += j.spin;

    const feetX = j.x + j.w / 2;
    const feetY = j.y + j.h;
    for (let i = 0; i < 4; i++) {
      particles.push({
        x: feetX + (Math.random() - 0.5) * j.w * 0.4,
        y: feetY,
        vx: j.vx * 0.15 + (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 5,
        life: 14 + Math.random() * 10,
        color: Math.random() < 0.35 ? "#fde047" : "#f97316",
        size: 2 + Math.random() * 4,
      });
    }
  }

  flyingJacobs = flyingJacobs.filter(
    (j) => j.x > -160 && j.x < W + 160 && j.y > -200 && j.y < H + 200
  );
}

function drawFlyingJacobs() {
  for (const j of flyingJacobs) {
    PlayerSprites.drawJacob(ctx, j.x, j.y, j.w, j.h, {
      flames: true,
      rotation: j.rotation,
    });
  }
}

function tryHitBomb(obs) {
  if (obs.type !== "bomb") return;
  const id = obs.obstacleIndex;
  if (id === undefined || hitBombIds.has(id)) return;

  hitBombIds.add(id);
  runStats.bombs++;
  breakCombo();
  totalScore -= BOMB_PENALTY;
  updateScoreDisplay();
  spawnBombExplosion(obs);

  if (pointScoreEl) {
    pointScoreEl.classList.remove("score-pop");
    void pointScoreEl.offsetWidth;
    pointScoreEl.classList.add("score-pop");
  }
}

function tryScoreObstacle(obs) {
  if (
    obs.type !== "block" &&
    obs.type !== "platform" &&
    obs.type !== "oneWayPlatform" &&
    obs.type !== "movingPlatform" &&
    obs.type !== "bonus" &&
    obs.type !== "superbonus"
  ) {
    return;
  }
  const id = obs.obstacleIndex;
  if (id === undefined || scoredObstacleIds.has(id)) return;

  const pts = obstaclePoints(obs);
  if (pts <= 0) return;

  scoredObstacleIds.add(id);
  totalScore += pts;
  recordScoreStat(obs);
  updateScoreDisplay();
  if (obs.type === "superbonus") {
    spawnSuperBonusEffect(obs);
  } else {
    spawnScoreEffect(obs, pts);
  }
}

function finalizeRun() {
  const levelName = currentLevel?.name || "Unknown";
  const isRecord = isNewHighScore(totalScore);
  if (isRecord) addHighScore(totalScore, levelName, playerName);
  renderHighScores();
  return isRecord;
}

function readPlayerNameFromInput() {
  const name = (playerNameInput?.value || "").trim().slice(0, 20);
  if (!name) {
    playerNameInput?.classList.add("invalid");
    playerNameInput?.focus();
    return null;
  }
  playerNameInput?.classList.remove("invalid");
  setPlayerName(name);
  playerName = name;
  return name;
}

function populateLevelSelect() {
  levelSelect.innerHTML = "";
  getAllLevels().forEach((lvl, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = lvl.name + (lvl.custom ? " (custom)" : "");
    levelSelect.appendChild(opt);
  });

  const params = new URLSearchParams(location.search);
  const playId = params.get("play");
  if (playId) {
    const idx = getAllLevels().findIndex((l) => l.id === playId);
    if (idx >= 0) levelSelect.value = idx;
  }
}

function loadLevel(index) {
  const all = getAllLevels();
  currentLevel = all[Number(index)] || all[0];
  levelObstacles = currentLevel.obstacles.map((o) => ({ ...o }));
  levelLength = getLevelLength(levelObstacles);
  if (levelNameEl) levelNameEl.textContent = currentLevel.name;
}

function reset() {
  scrollX = 0;
  holding = false;
  reverseActive = false;
  playerForm = "rocket";
  frogAirJumpsUsed = 0;
  portalContacts = new Set();
  player = { x: 120, y: GROUND_Y - PLAYER_SIZE, vy: 0, onGround: true };
  particles = [];
  scorePopups = [];
  screenFlash = 0;
  bombFlash = 0;
  superFlash = 0;
  lightBurst = null;
  superRings = [];
  explosions = [];
  hitBombIds = new Set();
  launchedJacobIds = new Set();
  flyingJacobs = [];
  rowanBounces = new Map();
  rowanContacts = new Set();
  hitSpeedPadIds = new Set();
  scrollSpeedMod = 1;
  scrollSpeedModFrames = 0;
  shake = 0;
  coyoteFrames = 0;
  jumpBufferFrames = 0;
  runStats = createRunStats();
  resetScore();
  updateReverseHud();
}

function startGame() {
  if (!readPlayerNameFromInput()) return;

  loadLevel(levelSelect.value);
  reset();
  state = "playing";
  overlay.classList.add("hidden");
  deathScreen.classList.add("hidden");
  hud.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
  deathScreen.querySelector("h2").textContent = "Crash!";
  deathHighscoreEl.classList.add("hidden");
  if (deathStatsEl) deathStatsEl.innerHTML = "";
  runStartTime = Date.now();
  runStats = createRunStats();
  updateReverseHud();
  Music.start(currentLevel.bpm || 140);
}

function quitToMenu() {
  state = "menu";
  holding = false;
  reverseActive = false;
  Music.stop();
  reset();
  overlay.classList.remove("hidden");
  hud.classList.add("hidden");
  deathScreen.classList.add("hidden");
  deathScreen.querySelector("h2").textContent = "Crash!";
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

function updateFullscreenButtons() {
  const active = !!document.fullscreenElement;
  const label = active ? "Exit Fullscreen" : "Fullscreen";
  if (fullscreenBtn) fullscreenBtn.textContent = label;
  if (fullscreenHudBtn) fullscreenHudBtn.textContent = active ? "🗗" : "⛶";
  if (fullscreenHudBtn) fullscreenHudBtn.title = label;
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await gameContainer.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch {
    alert("Fullscreen is not supported or was blocked by your browser.");
  }
}

function showEndScreen(title, subtitle, isRecord) {
  deathScoreEl.textContent = totalScore + " pts";
  deathScreen.querySelector("h2").textContent = title;
  if (subtitle) {
    deathScoreEl.textContent = totalScore + " pts · " + subtitle;
  }

  if (deathStatsEl) {
    const elapsed = formatRunTime(Date.now() - runStartTime);
    deathStatsEl.innerHTML = `
      <li>Time: <strong>${elapsed}</strong></li>
      <li>Letters: <strong>${runStats.letters}</strong></li>
      <li>Bonuses: <strong>${runStats.bonuses}</strong></li>
      <li>Super ★: <strong>${runStats.superBonuses}</strong></li>
      <li>Bombs hit: <strong>${runStats.bombs}</strong></li>
      <li>Best combo: <strong>${runStats.maxCombo}</strong></li>
    `;
  }

  updateReverseHud();
  if (isRecord) {
    deathHighscoreEl.textContent = "New high score!";
    deathHighscoreEl.classList.remove("hidden");
  } else {
    deathHighscoreEl.classList.add("hidden");
  }
  deathScreen.classList.remove("hidden");
  hud.classList.add("hidden");
}

function die() {
  state = "dead";
  shake = 12;
  Music.stop();
  Music.sfxDie();
  spawnParticles(player.x + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2, COLORS.player, 20);
  const isRecord = finalizeRun();
  const pct = Math.floor((scrollX / levelLength) * 100) + "%";
  showEndScreen("Crash!", pct + " complete", isRecord);
}

function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 30 + Math.random() * 20,
      color,
      size: 2 + Math.random() * 4,
    });
  }
}

function getPlayerRect() {
  return { x: player.x, y: player.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
}

function landOnSurface(obs) {
  player.y = obs.y - PLAYER_SIZE;
  player.vy = 0;
  player.onGround = true;
  frogAirJumpsUsed = 0;
}

function resolveSolidCollision(obs, prevY) {
  const margin = 2;
  const pr = getPlayerRect();
  if (!rectsOverlap(pr, obs, margin)) return { landed: false };

  const prevFeet = prevY + PLAYER_SIZE;
  const prevHead = prevY;
  const feet = player.y + PLAYER_SIZE;
  const head = player.y;
  const top = obs.y;
  const bottom = obs.y + obs.h;

  if (obs.type === "oneWayPlatform") {
    if (player.vy >= 0 && prevFeet <= top + 10 && feet > top - 4) {
      landOnSurface(obs);
      return { landed: true };
    }
    return { landed: false };
  }

  if (player.vy >= 0 && prevFeet <= top + 10 && feet > top - 4) {
    landOnSurface(obs);
    return { landed: true };
  }

  if (player.vy < 0 && prevHead >= bottom - 10 && head < bottom + 4) {
    player.y = bottom;
    player.vy = 0;
    return { landed: false };
  }

  if (!rectsOverlap(pr, obs, 0)) return { landed: false };

  const playerMid = head + PLAYER_SIZE / 2;
  const obsMid = top + obs.h / 2;

  if (playerMid <= obsMid || player.vy >= 0) {
    landOnSurface(obs);
    return { landed: true };
  }

  player.y = bottom;
  player.vy = 0;
  return { landed: false };
}

function touchesScorableSurface(obs, pr) {
  const margin = 2;
  const feet = pr.y + pr.h;
  const horiz =
    pr.x + pr.w > obs.x + margin &&
    pr.x < obs.x + obs.w - margin;

  if (!horiz) return false;

  return feet >= obs.y - 8 && feet <= obs.y + obs.h + 6 && pr.y + pr.h > obs.y - 2;
}

function spawnPortalEffect(obs) {
  const cx = obs.x + obs.w / 2;
  const cy = obs.y + obs.h / 2;
  for (let i = 0; i < 14; i++) {
    const angle = (Math.PI * 2 * i) / 14;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * 2.5,
      vy: Math.sin(angle) * 2.5,
      life: 28 + Math.random() * 12,
      color: playerForm === "frog" ? "#22c55e" : "#00d4ff",
      size: 3 + Math.random() * 3,
      star: true,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.2,
    });
  }
  Music.sfxPortal();
}

function getScrollStep() {
  return SCROLL_SPEED * scrollSpeedMod;
}

function trySpeedPad(obs) {
  if (obs.type !== "speedPad") return;
  const id = obs.obstacleIndex;
  if (id === undefined || hitSpeedPadIds.has(id)) return;

  hitSpeedPadIds.add(id);
  scrollSpeedMod = obs.speedMult ?? 1.5;
  scrollSpeedModFrames = obs.padDuration ?? 90;

  const cx = obs.x + obs.w / 2;
  const cy = obs.y + obs.h / 2;
  const boost = scrollSpeedMod >= 1;
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: cx,
      y: cy,
      vx: (boost ? 3 : -2) + (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 3,
      life: 24 + Math.random() * 12,
      color: boost ? "#fde047" : "#7dd3fc",
      size: 3 + Math.random() * 3,
    });
  }
  Music.sfxSpeedPad(boost);
}

function tryPortal(obs) {
  const id = obs.obstacleIndex;
  if (id === undefined) return;

  const pr = getPlayerRect();
  if (!rectsOverlap(pr, obs, 4)) {
    portalContacts.delete(id);
    return;
  }
  if (portalContacts.has(id)) return;

  portalContacts.add(id);
  if (
    (obs.type === "portalFrog" || obs.type === "portalKangaroo") &&
    playerForm !== "frog"
  ) {
    playerForm = "frog";
    frogAirJumpsUsed = 0;
    spawnPortalEffect(obs);
  } else if (obs.type === "portalRocket" && playerForm !== "rocket") {
    playerForm = "rocket";
    spawnPortalEffect(obs);
  }
}

function update() {
  if (shake > 0) {
    shake *= 0.82;
    if (shake < 0.4) shake = 0;
  }

  updateFlyingJacobs();
  updateRowanBounces();

  if (state !== "playing") {
    updateParticles();
    return;
  }

  const scrollStep = getScrollStep();
  if (reverseActive) {
    scrollX = Math.max(0, scrollX - scrollStep);
    if (scrollX <= 0) {
      scrollX = 0;
      reverseActive = false;
      updateReverseHud();
    }
  } else {
    scrollX += scrollStep;
  }

  if (scrollSpeedModFrames > 0) {
    scrollSpeedModFrames--;
    if (scrollSpeedModFrames <= 0) scrollSpeedMod = 1;
  }

  const prevPlayerY = player.y;
  const canGlide = playerForm === "rocket";
  const grav = canGlide && holding && player.vy > 0 ? GLIDE_GRAVITY : GRAVITY;
  player.vy += grav;
  player.y += player.vy;

  const feet = player.y + PLAYER_SIZE;
  let onSurface = false;
  const pr = getPlayerRect();
  const obstacles = buildObstacleRects(levelObstacles, scrollX, W, lastTime);

  for (const obs of obstacles) {
    if (obs.type === "gap") continue;

    if (obs.type === "finish") {
      if (rectsOverlap(pr, obs)) {
        state = "won";
        Music.stop();
        Music.sfxWin();
        spawnParticles(player.x + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2, "#fbbf24", 30);
        const isRecord = finalizeRun();
        showEndScreen("You Win!", "Level complete", isRecord);
      }
      continue;
    }

    if (
      obs.type === "platform" ||
      obs.type === "oneWayPlatform" ||
      obs.type === "movingPlatform" ||
      obs.type === "block"
    ) {
      const result = resolveSolidCollision(obs, prevPlayerY);
      if (result.landed) onSurface = true;
      const prAfter = getPlayerRect();
      if (result.landed || touchesScorableSurface(obs, prAfter)) {
        tryScoreObstacle(obs);
      }
      continue;
    }

    if (obs.type === "speedPad") {
      if (rectsOverlap(pr, obs, 2)) {
        trySpeedPad(obs);
      }
      continue;
    }

    if (obs.type === "bonus" || obs.type === "superbonus") {
      if (rectsOverlap(pr, obs, 2)) {
        tryScoreObstacle(obs);
      }
      continue;
    }

    if (obs.type === "bomb") {
      if (rectsOverlap(pr, obs, 2)) {
        tryHitBomb(obs);
      }
      continue;
    }

    if (obs.type === "jacob") {
      if (rectsOverlap(pr, obs, 2)) {
        tryLaunchJacob(obs);
      }
      continue;
    }

    if (obs.type === "rowan") {
      const offset = getRowanBounceOffset(obs.obstacleIndex);
      const rowanRect = { ...obs, y: obs.y + offset };
      const id = obs.obstacleIndex;
      if (rectsOverlap(pr, rowanRect, 2)) {
        if (!rowanContacts.has(id)) {
          rowanContacts.add(id);
          tryBounceRowan(obs);
        }
      } else {
        rowanContacts.delete(id);
      }
      continue;
    }

    if (obs.type === "portalFrog" || obs.type === "portalKangaroo" || obs.type === "portalRocket") {
      tryPortal(obs);
      continue;
    }

    if (obs.type === "spike" || obs.type === "ceilingSpike") {
      if (rectsOverlap(pr, obs)) {
        die();
        return;
      }
    }
  }

  let overGap = false;
  for (const obs of obstacles) {
    if (obs.type === "gap") {
      const px = player.x + PLAYER_SIZE / 2;
      if (px > obs.x && px < obs.x + obs.w) {
        overGap = true;
        break;
      }
    }
  }

  if (onSurface) {
    player.onGround = true;
    frogAirJumpsUsed = 0;
  } else if (!overGap && feet >= GROUND_Y) {
    player.y = GROUND_Y - PLAYER_SIZE;
    player.vy = 0;
    player.onGround = true;
    frogAirJumpsUsed = 0;
  } else {
    player.onGround = false;
  }

  if (player.onGround) {
    coyoteFrames = COYOTE_FRAMES;
  } else if (coyoteFrames > 0) {
    coyoteFrames--;
  }

  processJumpBuffer();

  if (player.y > H + 50) die();

  if (progressEl) {
    progressEl.textContent = Math.min(100, Math.floor((scrollX / levelLength) * 100)) + "%";
  }
  updateParticles();
}

function updateParticles() {
  if (screenFlash > 0) screenFlash--;
  if (bombFlash > 0) bombFlash--;
  if (superFlash > 0) superFlash--;
  if (lightBurst) {
    lightBurst.life--;
    if (lightBurst.life <= 0) lightBurst = null;
  }

  for (const ring of superRings) {
    if (ring.delay > 0) {
      ring.delay--;
    } else {
      ring.life++;
    }
  }
  superRings = superRings.filter((ring) => ring.life <= ring.maxLife);

  for (const ex of explosions) {
    ex.life--;
  }
  explosions = explosions.filter((ex) => ex.life > 0);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.star ? 0.04 : 0.15;
    if (p.spin) p.rotation += p.spin;
    p.life--;
  }
  particles = particles.filter((p) => p.life > 0);

  for (const pop of scorePopups) {
    pop.y -= 1.2;
    pop.life--;
  }
  scorePopups = scorePopups.filter((p) => p.life > 0);
}

function drawStar(cx, cy, size, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.font = `bold ${size}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("★", cx, cy);
  ctx.restore();
}

function drawPlayer() {
  const facingReverse = reverseActive && state === "playing";
  ctx.save();
  if (facingReverse) {
    const cx = player.x + PLAYER_SIZE / 2;
    const cy = player.y + PLAYER_SIZE / 2;
    ctx.translate(cx, cy);
    ctx.scale(-1, 1);
    ctx.translate(-cx, -cy);
  }

  if (playerForm === "frog") {
    drawFrog(ctx, player.x, player.y, PLAYER_SIZE);
  } else if (getCharacter() === "jordan") {
    PlayerSprites.drawJordan(ctx, player.x, player.y, PLAYER_SIZE);
  } else {
    const showFlame =
      state === "playing" && (holding || player.vy > 0) && !player.onGround;
    drawRocket(ctx, player.x, player.y, PLAYER_SIZE, COLORS.player, showFlame);
  }
  ctx.restore();
}

function drawParticlesLayer() {
  for (const p of particles) {
    const alpha = p.life / (p.star ? 50 : 50);
    if (p.star) {
      ctx.save();
      ctx.translate(p.x, p.y);
      if (p.rotation) ctx.rotate(p.rotation);
      drawStar(0, 0, p.size * 3, p.color, alpha);
      ctx.restore();
    } else {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
  }
  ctx.globalAlpha = 1;

  for (const pop of scorePopups) {
    const alpha = pop.life / pop.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    if (pop.bomb) {
      ctx.font = "bold 30px monospace";
      ctx.fillStyle = "#ef4444";
      ctx.shadowColor = "#f97316";
      ctx.shadowBlur = 16;
      ctx.fillText(pop.text, pop.x, pop.y);
    } else if (pop.superBonus) {
      const scale = 1 + (1 - alpha) * 0.35;
      ctx.translate(pop.x, pop.y);
      ctx.scale(scale, scale);
      ctx.font = "bold 42px monospace";
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "#e879f9";
      ctx.shadowBlur = 28;
      ctx.fillText(pop.text, 0, 0);
      ctx.font = "bold 22px monospace";
      ctx.fillStyle = "#fde047";
      ctx.shadowColor = "#6366f1";
      ctx.shadowBlur = 16;
      ctx.fillText(pop.letter, 0, 28);
    } else {
      ctx.font = pop.bonus ? "bold 28px monospace" : "bold 22px monospace";
      ctx.fillStyle = pop.bonus ? "#fff" : "#fbbf24";
      ctx.shadowColor = pop.bonus ? "#fde047" : "#fbbf24";
      ctx.shadowBlur = pop.bonus ? 18 : 10;
      ctx.fillText(pop.text, pop.x, pop.y);
      if (pop.letter) {
        ctx.font = "bold 14px monospace";
        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 0;
        ctx.fillText(pop.letter, pop.x, pop.y + 18);
      }
    }
    ctx.restore();
  }
}

function drawExplosions() {
  for (const ex of explosions) {
    const t = 1 - ex.life / ex.maxLife;
    const alpha = 1 - t;
    const r = 12 + t * 90;

    ctx.save();
    ctx.globalAlpha = alpha * 0.5;
    const grad = ctx.createRadialGradient(ex.x, ex.y, 0, ex.x, ex.y, r);
    grad.addColorStop(0, "rgba(255, 255, 200, 0.95)");
    grad.addColorStop(0.3, "rgba(255, 140, 40, 0.8)");
    grad.addColorStop(0.65, "rgba(239, 68, 68, 0.45)");
    grad.addColorStop(1, "rgba(80, 20, 10, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(ex.x, ex.y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "#fde047";
    ctx.lineWidth = 3 - t * 2;
    ctx.beginPath();
    ctx.arc(ex.x, ex.y, r * 0.65, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function drawSuperRings() {
  for (const ring of superRings) {
    if (ring.delay > 0 || ring.life <= 0) continue;
    const t = ring.life / ring.maxLife;
    const alpha = 1 - t;
    const r = 20 + t * 220;
    ctx.save();
    ctx.globalAlpha = alpha * 0.85;
    ctx.strokeStyle = t < 0.33 ? "#fde047" : t < 0.66 ? "#e879f9" : "#6366f1";
    ctx.lineWidth = 5 - t * 3;
    ctx.beginPath();
    ctx.arc(ring.x, ring.y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function drawLightEffects() {
  if (lightBurst) {
    const t = lightBurst.life / lightBurst.maxLife;
    const isSuper = lightBurst.super;
    const r = (isSuper ? 80 : 50) + (1 - t) * (isSuper ? 220 : 140);
    const grad = ctx.createRadialGradient(
      lightBurst.x, lightBurst.y, 0,
      lightBurst.x, lightBurst.y, r
    );
    if (isSuper) {
      grad.addColorStop(0, `rgba(255, 255, 255, ${0.98 * t})`);
      grad.addColorStop(0.25, `rgba(253, 224, 71, ${0.8 * t})`);
      grad.addColorStop(0.5, `rgba(232, 121, 249, ${0.55 * t})`);
      grad.addColorStop(0.75, `rgba(99, 102, 241, ${0.3 * t})`);
      grad.addColorStop(1, "rgba(99, 102, 241, 0)");
    } else {
      grad.addColorStop(0, `rgba(255, 255, 230, ${0.95 * t})`);
      grad.addColorStop(0.35, `rgba(255, 236, 120, ${0.65 * t})`);
      grad.addColorStop(0.7, `rgba(255, 200, 50, ${0.25 * t})`);
      grad.addColorStop(1, "rgba(255, 200, 50, 0)");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(lightBurst.x - r, lightBurst.y - r, r * 2, r * 2);
  }

  drawSuperRings();

  if (screenFlash > 0) {
    const alpha = (screenFlash / 32) * 0.45;
    ctx.fillStyle = `rgba(255, 252, 220, ${alpha})`;
    ctx.fillRect(0, 0, W, H);
  }

  if (superFlash > 0) {
    const alpha = (superFlash / 40) * 0.35;
    const hue = superFlash % 6 < 3 ? "rgba(232, 121, 249" : "rgba(99, 102, 241";
    ctx.fillStyle = `${hue}, ${alpha})`;
    ctx.fillRect(0, 0, W, H);
  }

  if (bombFlash > 0) {
    const alpha = (bombFlash / 14) * 0.35;
    ctx.fillStyle = `rgba(255, 80, 40, ${alpha})`;
    ctx.fillRect(0, 0, W, H);
  }
}

function draw() {
  ctx.save();
  if (shake > 0.5) {
    ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  }
  drawBackground(ctx, scrollX, lastTime);
  const obstacles = buildObstacleRects(levelObstacles, scrollX, W, lastTime).filter(
    (obs) =>
      (obs.type !== "bomb" || !hitBombIds.has(obs.obstacleIndex)) &&
      (obs.type !== "jacob" || !launchedJacobIds.has(obs.obstacleIndex))
  );
  drawGround(ctx, obstacles);
  drawObstacles(
    ctx,
    obstacles.filter((obs) => obs.type !== "rowan")
  );
  drawRowans(obstacles);
  drawFlyingJacobs();
  if (state === "playing" || state === "dead") drawPlayer();
  drawExplosions();
  drawParticlesLayer();
  drawLightEffects();
  ctx.restore();
}

function hasGroundedJump() {
  return player.onGround || coyoteFrames > 0;
}

function tryJump() {
  if (state !== "playing") return false;

  let isFrogAirJump = false;
  let canJump = false;

  if (playerForm === "frog") {
    if (hasGroundedJump()) {
      canJump = true;
    } else if (frogAirJumpsUsed < FROG_MAX_AIR_JUMPS) {
      canJump = true;
      isFrogAirJump = true;
    }
  } else if (hasGroundedJump() || player.vy > -2) {
    canJump = true;
  }

  if (!canJump) return false;

  player.vy = JUMP_FORCE;
  player.onGround = false;
  coyoteFrames = 0;
  if (isFrogAirJump) frogAirJumpsUsed++;

  Music.sfxJump();
  const jumpColor = playerForm === "frog" ? "#22c55e" : COLORS.player;
  spawnParticles(player.x + PLAYER_SIZE / 2, player.y + PLAYER_SIZE, jumpColor, 6);
  return true;
}

function processJumpBuffer() {
  if (jumpBufferFrames <= 0) return;
  jumpBufferFrames--;
  if (tryJump()) jumpBufferFrames = 0;
}

function queueJump() {
  if (state !== "playing") return;
  jumpBufferFrames = JUMP_BUFFER_FRAMES;
  tryJump();
}

function gameLoop(time) {
  lastTime = time;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function toggleReverse() {
  if (state !== "playing") return;
  reverseActive = !reverseActive;
  updateReverseHud();
}

function onCanvasMouseDown(e) {
  if (e.button === 2) {
    e.preventDefault();
    toggleReverse();
    return;
  }
  if (e.button !== 0) return;
  onPress(e);
}

function onCanvasMouseUp(e) {
  if (e.button !== 0) return;
  onRelease(e);
}

function onPress(e) {
  if (e.type === "keydown" && e.code !== "Space" && e.code !== "ArrowUp") return;
  e.preventDefault();
  holding = true;
  if (state === "menu") return;
  queueJump();
}

function onRelease(e) {
  if (e.type === "keyup" && e.code !== "Space" && e.code !== "ArrowUp") return;
  holding = false;
}

const menuMusicVolume = document.getElementById("menu-music-volume");
const menuMusicVolumeLabel = document.getElementById("menu-music-volume-label");
const menuSfxVolume = document.getElementById("menu-sfx-volume");
const menuSfxVolumeLabel = document.getElementById("menu-sfx-volume-label");

function updateMenuMusicVolumeLabel() {
  if (!menuMusicVolumeLabel || !menuMusicVolume) return;
  menuMusicVolumeLabel.textContent = `${menuMusicVolume.value}%`;
}

function updateMenuSfxVolumeLabel() {
  if (!menuSfxVolumeLabel || !menuSfxVolume) return;
  menuSfxVolumeLabel.textContent = `${menuSfxVolume.value}%`;
}

Music.setVolume(getMusicVolume());
Music.setSfxVolume(getSfxVolume());
if (menuMusicVolume) {
  menuMusicVolume.value = String(Math.round(getMusicVolume() * 100));
  updateMenuMusicVolumeLabel();
  menuMusicVolume.addEventListener("input", () => {
    Music.setVolume(Number(menuMusicVolume.value) / 100);
    updateMenuMusicVolumeLabel();
  });
}
if (menuSfxVolume) {
  menuSfxVolume.value = String(Math.round(getSfxVolume() * 100));
  updateMenuSfxVolumeLabel();
  menuSfxVolume.addEventListener("input", () => {
    Music.setSfxVolume(Number(menuSfxVolume.value) / 100);
    updateMenuSfxVolumeLabel();
  });
}

function updateCharacterPreview() {
  if (!characterPreview || !characterSelect) return;
  const showJordan = characterSelect.value === "jordan";
  characterPreview.classList.toggle("hidden", !showJordan);
}

playerName = getPlayerName();
if (playerNameInput) playerNameInput.value = playerName;

if (characterSelect) {
  characterSelect.value = getCharacter();
  updateCharacterPreview();
  characterSelect.addEventListener("change", () => {
    setCharacter(characterSelect.value);
    updateCharacterPreview();
  });
}

populateLevelSelect();
loadLevel(levelSelect.value);
renderHighScores();
updateScoreDisplay();

playerNameInput?.addEventListener("input", () => {
  playerNameInput.classList.remove("invalid");
});

startBtn.addEventListener("click", startGame);
retryBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
quitBtn.addEventListener("click", quitToMenu);
menuBtn.addEventListener("click", quitToMenu);
levelSelect.addEventListener("change", () => loadLevel(levelSelect.value));

muteBtn.addEventListener("click", () => {
  const muted = Music.toggleMute();
  muteBtn.textContent = muted ? "🔇" : "🔊";
});

fullscreenBtn.addEventListener("click", toggleFullscreen);
fullscreenHudBtn.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", updateFullscreenButtons);

canvas.addEventListener("mousedown", onCanvasMouseDown);
canvas.addEventListener("mouseup", onCanvasMouseUp);
canvas.addEventListener("contextmenu", (e) => e.preventDefault());
canvas.addEventListener("touchstart", (e) => { e.preventDefault(); onPress(e); }, { passive: false });
canvas.addEventListener("touchend", (e) => { e.preventDefault(); onRelease(e); }, { passive: false });
function onKeyDown(e) {
  if (e.key === "Escape" || e.code === "Escape") {
    if (state === "playing" || state === "dead" || state === "won") {
      e.preventDefault();
      quitToMenu();
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    return;
  }

  const tag = document.activeElement?.tagName;
  const inField = tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA";

  if (e.code === "KeyF" && !e.ctrlKey && !e.metaKey && !e.altKey && !inField) {
    e.preventDefault();
    toggleFullscreen();
    return;
  }

  if (e.code === "KeyR" && !e.ctrlKey && !e.metaKey && !e.altKey && !inField) {
    e.preventDefault();
    toggleReverse();
    return;
  }

  onPress(e);
}

document.addEventListener("keydown", onKeyDown, true);
window.addEventListener("keyup", onRelease);

updateFullscreenButtons();
requestAnimationFrame(gameLoop);

import { createCamera, followTarget } from "./camera.js";
import { resolveEntityActions, runActions, getEntitiesWithTouchActions } from "./engine/actions.js";
import { getMusicAsset, playSound } from "./engine/audio.js";
import {
  createCollectEffectSystem,
  drawCollectEffects,
  updateCollectEffects,
} from "./engine/collectEffects.js";
import { applyPlayerDeath, createRespawnState, respawnPlayer } from "./engine/playerLife.js";
import { drawEndGameMessage, drawGameCompleteBanner, drawLevelCompleteBanner, drawScoreHud, initScoreHudState, updateScoreHud } from "./engine/scoreHud.js";
import { drawBackgroundLayers } from "./engine/backgrounds.js";
import { resolveEntityProperties } from "./engine/entities.js";
import { intersects } from "./engine/geometry.js";
import { createParticleSystem, drawParticles, emitParticles, updateParticles } from "./engine/particles.js";
import { initEntityRandomBounces, updateEntityRandomBounces } from "./engine/entityRandomBounce.js";
import { initEntityGravity, updateEntityGravities } from "./engine/entityGravity.js";
import { initEntityFollowers, updateEntityFollowers } from "./engine/follow.js";
import { initEntityMovement, updateEntityMovements } from "./engine/movement.js";
import { drawLevel, getEnabledEntities, getLevelById, getLevelSpawn, getNextLevelId, getOrderedLevelIds, getSolidEntities } from "./level.js";
import { createPlayer, drawPlayer, updatePlayer } from "./player.js";
import { bindGameplayInput, unbindGameplayInput } from "./input.js";

const LEVEL_TRANSITION_DELAY = 2;

export function createRuntime(canvas, project, options = {}) {
  const ctx = canvas.getContext("2d");
  const playSequence = options.playSequence ?? false;
  const levelIds = playSequence
    ? getOrderedLevelIds(project)
    : [options.levelId ?? project.activeLevelId ?? getOrderedLevelIds(project)[0]];

  let levelIndex = 0;
  let level = structuredClone(getLevelById(project, levelIds[levelIndex]));
  let spawn = getLevelSpawn(project, level, options);
  const playerSettings = structuredClone(project.player);
  playerSettings.startX = spawn.x;
  playerSettings.startY = spawn.y;
  let player = createPlayer(playerSettings);
  const camera = createCamera(canvas.width, canvas.height);
  const particles = createParticleSystem();
  const collectEffects = createCollectEffectSystem();
  let music = createLevelMusic(project, level);
  const state = {
    mode: "play",
    score: 0,
    playSequence,
    ...createRespawnState(project.player),
    completed: false,
    completedReason: "",
    gameComplete: false,
    hasNextLevel: false,
    levelTransitionTimer: 0,
    timeElapsed: 0,
    timeUp: false,
    spawn,
    activeParticleEmitterKeys: new Set(),
    particleEmitters: [],
    playerParticleTimer: 0,
    locomotionTimer: 0,
    wasLocomoting: false,
    triggered: new Set(),
    wasInAbyss: false,
  };
  initScoreHudState(state);

  let lastTime = performance.now();
  let animationFrame = 0;
  let stopped = false;

  resetLevelSystems();

  function resetLevelSystems() {
    initEntityMovement(state, project, level);
    state.entityGravity?.clear?.();
    initEntityGravity(state);
    initEntityRandomBounces(state, project, level);
    initEntityFollowers(state, project, level, camera, player);
    state.triggered.clear();
    state.wasInAbyss = false;
    state.activeParticleEmitterKeys.clear();
    state.particleEmitters = [];
    particles.particles.length = 0;
    collectEffects.effects.length = 0;
  }

  function loadLevelByIndex(index) {
    levelIndex = index;
    level = structuredClone(getLevelById(project, levelIds[levelIndex]));
    spawn = getLevelSpawn(project, level, options);
    state.spawn = spawn;

    player.x = spawn.x;
    player.y = spawn.y;
    player.vx = 0;
    player.vy = 0;
    player.jumpsRemaining = player.settings.maxJumps ?? 1;
    player.coyoteTimer = player.settings.coyoteTime ?? 0.1;
    player.jumpBufferTimer = 0;
    player.grounded = false;
    player.animationState = "idle";
    player.moveSign = 1;
    player.slopeAssist = null;

    state.timeElapsed = 0;
    state.timeUp = false;
    state.completed = false;
    state.completedReason = "";
    state.gameComplete = false;
    state.hasNextLevel = false;
    state.levelTransitionTimer = 0;

    if (music) {
      music.pause();
      music.currentTime = 0;
    }

    music = createLevelMusic(project, level);
    resetLevelSystems();

    if (!stopped && music) {
      music.play().catch(() => {});
    }
  }

  function advanceToNextLevel() {
    const nextId = getNextLevelId(project, levelIds[levelIndex]);
    if (!nextId) {
      state.gameComplete = true;
      state.completed = true;
      state.completedReason = "gameComplete";
      return;
    }

    const nextIndex = levelIds.indexOf(nextId);
    if (nextIndex < 0) {
      state.gameComplete = true;
      state.completed = true;
      state.completedReason = "gameComplete";
      return;
    }

    loadLevelByIndex(nextIndex);
  }

  function update(dt) {
    if (state.completed) {
      if (state.completedReason === "levelComplete" && playSequence && state.hasNextLevel) {
        state.levelTransitionTimer += dt;
        if (state.levelTransitionTimer >= LEVEL_TRANSITION_DELAY) {
          advanceToNextLevel();
        }
      }

      updateScoreHud(state, dt);
      return;
    }

    updateLevelTimer(dt);
    updateEntityMovements(state, project, level, dt);
    updateEntityGravities(state, project, level, dt);
    updateEntityRandomBounces(state, project, level, dt);
    handleAlwaysActions();
    handleTouchActions();
    updatePlayer(player, dt, getSolidEntities(project, level), project, level);
    updateEntityFollowers(state, project, level, player, dt);
    updatePlayerLocomotion(dt);
    updatePlayerParticles(dt);
    updateParticleEmitters(dt);
    updateParticles(particles, dt);
    updateCollectEffects(collectEffects, particles, dt);
    updateScoreHud(state, dt);
    followTarget(camera, player, level.worldWidth, level.worldHeight);
    handleAbyssFall();
  }

  function handleTouchActions() {
    for (const entity of getEntitiesWithTouchActions(project, level)) {
      const effectiveEntity = resolveEntityProperties(project, entity);

      if (!intersects(player, effectiveEntity)) {
        state.triggered.delete(entity.id);
        continue;
      }

      if (state.triggered.has(entity.id)) continue;

      state.triggered.add(entity.id);
      runActions(resolveEntityActions(project, entity).filter((action) => action.event === "onTouch"), {
        entity,
        effectiveEntity,
        level,
        player,
        project,
        particles,
        collectEffects,
        state,
      });
    }
  }

  function handleAbyssFall() {
    const inAbyss = player.y > level.worldHeight + 400;
    if (!inAbyss) {
      state.wasInAbyss = false;
      return;
    }
    if (state.wasInAbyss) return;

    state.wasInAbyss = true;
    const isGameOver = applyPlayerDeath(player, state, project);
    if (!isGameOver) {
      respawnPlayer(player, state, project);
    }
  }

  function updateLevelTimer(dt) {
    state.timeElapsed += dt;

    if (level.durationSeconds > 0 && state.timeElapsed >= level.durationSeconds) {
      state.timeUp = true;
      state.completed = true;
      state.completedReason = "timeUp";
    }
  }

  function handleAlwaysActions() {
    for (const entity of getEnabledEntities(level)) {
      const effectiveEntity = resolveEntityProperties(project, entity);
      const actions = resolveEntityActions(project, entity).filter((action) => action.event === "onAlways");

      runActions(actions, {
        entity,
        effectiveEntity,
        level,
        player,
        project,
        particles,
        collectEffects,
        state,
      });
    }
  }

  function updatePlayerLocomotion(dt) {
    const settings = player.settings;
    if (!settings.locomotionSound) return;

    const moving = player.grounded && Math.abs(player.vx) >= 1;
    if (!moving) {
      state.locomotionTimer = 0;
      state.wasLocomoting = false;
      return;
    }

    const interval = 1 / Math.max(0.1, settings.locomotionRate ?? 2.5);

    if (!state.wasLocomoting) {
      playSound(settings.locomotionSound, project);
      state.locomotionTimer = 0;
      state.wasLocomoting = true;
    }

    state.locomotionTimer += dt;

    while (state.locomotionTimer >= interval) {
      state.locomotionTimer -= interval;
      playSound(settings.locomotionSound, project);
    }
  }

  function updatePlayerParticles(dt) {
    const settings = player.settings;

    if (!settings.particlesEnabled || settings.particlePreset === "none") return;

    state.playerParticleTimer += dt;
    const interval = 1 / Math.max(0.1, settings.particleRate);

    while (state.playerParticleTimer >= interval) {
      state.playerParticleTimer -= interval;

      if (Math.random() <= settings.particleChance) {
        emitParticles(
          particles,
          settings.particlePreset,
          player.x + player.width / 2 + settings.particleOffsetX,
          player.y + player.height / 2 + settings.particleOffsetY,
          settings.particleBurstCount,
        );
      }
    }
  }

  function updateParticleEmitters(dt) {
    for (const emitter of state.particleEmitters) {
      if (Number.isFinite(emitter.remaining)) {
        emitter.remaining -= dt;
      }
      emitter.timer += dt;

      const interval = 1 / Math.max(0.1, emitter.rate);

      while (emitter.timer >= interval && emitter.remaining > 0) {
        emitter.timer -= interval;
        emitParticles(particles, emitter.preset, emitter.x, emitter.y, emitter.count);
      }
    }

    state.particleEmitters = state.particleEmitters.filter((emitter) => {
      const active = emitter.remaining > 0;
      if (!active && emitter.key) {
        state.activeParticleEmitterKeys.delete(emitter.key);
      }
      return active;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = project.game.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBackgroundLayers(ctx, project, level, camera, "back");

    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    drawLevel(ctx, project, level);
    drawPlayer(ctx, project, player);
    drawParticles(ctx, particles);
    drawCollectEffects(ctx, collectEffects);
    ctx.restore();

    drawBackgroundLayers(ctx, project, level, camera, "front");
    drawHud(ctx, project, state);
  }

  function tick(now) {
    if (stopped) return;

    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    update(dt);
    draw();

    animationFrame = requestAnimationFrame(tick);
  }

  return {
    start() {
      stopped = false;
      lastTime = performance.now();
      bindGameplayInput(canvas);
      music?.play().catch(() => {
        // Browser autoplay rules can reject playback; playtest still runs.
      });
      animationFrame = requestAnimationFrame(tick);
    },
    stop() {
      stopped = true;
      unbindGameplayInput();
      if (music) {
        music.pause();
        music.currentTime = 0;
      }
      cancelAnimationFrame(animationFrame);
    },
    draw,
    state,
  };
}

function createLevelMusic(project, level) {
  const asset = getMusicAsset(project, level.musicId);
  if (!asset) return null;

  const audio = new Audio(asset.src);
  audio.loop = level.musicLoop;
  audio.volume = Math.max(0, Math.min(1, (level.musicVolume ?? 75) / 100));
  return audio;
}

function drawHud(ctx, project, state) {
  if (state.gameComplete || state.completedReason === "gameComplete") {
    drawGameCompleteBanner(ctx, project, state);
    return;
  }

  if (state.completed && state.completedReason === "levelComplete" && !state.gameOver && !state.timeUp) {
    drawLevelCompleteBanner(ctx, project, state, {
      showNextHint: state.hasNextLevel,
    });
    return;
  }

  drawScoreHud(ctx, project, state);

  if (state.completed) {
    drawEndGameMessage(ctx, state);
  }
}

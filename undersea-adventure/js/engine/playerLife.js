import { playSound } from "./audio.js";

export function getMaxRespawns(playerSettings) {
  return playerSettings.respawns ?? 0;
}

export function hasInfiniteRespawns(playerSettings) {
  return getMaxRespawns(playerSettings) === 0;
}

export function createRespawnState(playerSettings) {
  const maxRespawns = getMaxRespawns(playerSettings);
  return {
    respawnsRemaining: maxRespawns > 0 ? maxRespawns : null,
    gameOver: false,
  };
}

export function applyPlayerDeath(player, state, project, amount = 1) {
  playSound(player.settings.deathSound || "builtin:hurt", project);

  if (hasInfiniteRespawns(player.settings)) {
    return false;
  }

  state.respawnsRemaining = Math.max(0, (state.respawnsRemaining ?? 0) - amount);

  if (state.respawnsRemaining <= 0) {
    state.gameOver = true;
    state.completed = true;
    state.completedReason = "gameOver";
    return true;
  }

  return false;
}

export function respawnPlayer(player, state, project) {
  player.x = state.spawn.x;
  player.y = state.spawn.y;
  player.vx = 0;
  player.vy = 0;
  player.jumpsRemaining = player.settings.maxJumps ?? 1;
  player.coyoteTimer = player.settings.coyoteTime ?? 0.1;
  player.jumpBufferTimer = 0;
  player.grounded = false;
  player.animationState = "idle";

  player.moveSign = 1;
  player.slopeAssist = null;

  if (player.settings.resetSound) {
    playSound(player.settings.resetSound, project);
  }
}

export function formatRespawnsHud(playerSettings, state) {
  if (hasInfiniteRespawns(playerSettings)) return "∞";
  return String(state.respawnsRemaining ?? 0);
}

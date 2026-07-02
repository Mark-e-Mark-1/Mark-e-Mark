export const PLAYER_ANIMATION_STATES = ["idle", "run", "jump", "fall"];

export function resolvePlayerAnimationState(player) {
  if (!player.grounded) {
    if (player.vy < -20) return "jump";
    if (player.vy > 20) return "fall";
    return player.vy <= 0 ? "jump" : "fall";
  }

  if (Math.abs(player.vx) >= 1) return "run";
  return "idle";
}

export function getPlayerSpriteId(settings, state) {
  const overrides = {
    idle: settings.spriteIdleId,
    run: settings.spriteRunId,
    jump: settings.spriteJumpId,
    fall: settings.spriteFallId,
  };

  return overrides[state] || settings.spriteId;
}

export function getPlayerTiltRadians(player, settings) {
  if (!settings.tiltEnabled) return 0;

  const maxTilt = ((settings.tiltAmount ?? 12) * Math.PI) / 180;
  const reference = Math.max(120, Math.abs(settings.jumpVelocity ?? 620));
  const normalized = Math.max(-1, Math.min(1, player.vy / reference));
  const spriteFlipped = shouldFlipPlayerSprite(player, settings);

  // Rising should lift the nose. Default art faces left; flip horizontal mirrors facing.
  return (spriteFlipped ? normalized : -normalized) * maxTilt;
}

export function shouldFlipPlayerSprite(player, settings) {
  const facingLeft = (player.facing ?? 1) < 0;
  return settings.flipX ? !facingLeft : facingLeft;
}

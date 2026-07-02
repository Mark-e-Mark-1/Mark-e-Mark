import { intersects } from "./engine/geometry.js";
import {
  getOneWayPassSurfaces,
  applyOneWayBlock,
  shouldBlockOneWayPass,
} from "./engine/entityOneWayPass.js";
import {
  getPlayerSpriteId,
  getPlayerTiltRadians,
  resolvePlayerAnimationState,
  shouldFlipPlayerSprite,
} from "./engine/playerAnimation.js";
import { getSpriteAsset, getSpriteImage } from "./engine/sprites.js";
import { playSound } from "./engine/audio.js";
import { axisX, jumpTriggered } from "./input.js";

export function reversePlayerDirection(player) {
  player.moveSign = (player.moveSign ?? 1) * -1;
  const settings = player.settings;
  const controlMode = settings.controlMode ?? "wasd";

  if (controlMode === "singleButton") {
    player.facing = player.moveSign;
    player.vx = settings.moveSpeed * player.moveSign;
    return;
  }

  if (Math.abs(player.vx) >= 1) {
    player.vx = -player.vx;
    player.facing = player.vx > 0 ? 1 : -1;
    return;
  }

  player.facing = (player.facing ?? 1) * -1;
}

export function startSlopeAssist(player, action = {}) {
  player.slopeAssist = {
    angle: action.angle ?? 27,
    direction: action.direction ?? "right",
    speed: action.speed ?? player.settings.moveSpeed,
  };
}

export function endSlopeAssist(player) {
  player.slopeAssist = null;
  player.vy = 0;
}

export function createPlayer(settings) {
  return {
    x: settings.startX,
    y: settings.startY,
    width: settings.width,
    height: settings.height,
    vx: 0,
    vy: 0,
    grounded: false,
    jumpsRemaining: settings.maxJumps ?? 1,
    idleTime: 0,
    facing: 1,
    moveSign: 1,
    coyoteTimer: settings.coyoteTime ?? 0.1,
    jumpBufferTimer: 0,
    animationState: "idle",
    slopeAssist: null,
    color: settings.color,
    settings,
  };
}

export function updatePlayer(player, dt, platforms, project, level) {
  const settings = player.settings;
  const oneWaySurfaces = level ? getOneWayPassSurfaces(project, level) : [];

  if (player.slopeAssist) {
    updateSlopeAssistPlayer(player, dt, platforms, oneWaySurfaces, level);
    player.animationState = resolvePlayerAnimationState(player);
    return;
  }

  const controlMode = settings.controlMode ?? "wasd";
  const wasGrounded = player.grounded;

  if (controlMode === "singleButton") {
    player.vx = settings.moveSpeed * (player.moveSign ?? 1);
  } else {
    let input = axisX();
    if ((player.moveSign ?? 1) < 0) input = -input;
    player.vx = input * settings.moveSpeed;
  }

  if (Math.abs(player.vx) >= 1) {
    player.facing = player.vx > 0 ? 1 : -1;
  } else if (controlMode === "singleButton") {
    player.facing = player.moveSign ?? 1;
  }

  if (player.grounded) {
    player.coyoteTimer = settings.coyoteTime ?? 0.1;
    player.jumpsRemaining = settings.maxJumps ?? 1;
  } else {
    player.coyoteTimer = Math.max(0, player.coyoteTimer - dt);
  }

  const jumpPressedThisFrame = jumpTriggered();

  if (jumpPressedThisFrame && !player.grounded) {
    player.jumpBufferTimer = settings.jumpBufferTime ?? 0.06;
  } else {
    player.jumpBufferTimer = Math.max(0, player.jumpBufferTimer - dt);
  }

  if (jumpPressedThisFrame && canPlayerJump(player, settings)) {
    performJump(player, settings, project);
  }

  player.vy += settings.gravity * dt;
  player.grounded = false;

  moveAxis(player, "x", player.vx * dt, platforms, oneWaySurfaces);
  moveAxis(player, "y", player.vy * dt, platforms, oneWaySurfaces);

  if (player.grounded && !wasGrounded && player.jumpBufferTimer > 0) {
    performJump(player, settings, project);
  }

  if (player.grounded && Math.abs(player.vx) < 1) {
    player.idleTime += dt;
  } else {
    player.idleTime = 0;
  }

  player.animationState = resolvePlayerAnimationState(player);
}

function updateSlopeAssistPlayer(player, dt, platforms, oneWaySurfaces, level) {
  const assist = player.slopeAssist;
  const radians = ((assist.angle ?? 27) * Math.PI) / 180;
  const sign = assist.direction === "left" ? -1 : 1;
  const speed = assist.speed ?? player.settings.moveSpeed;

  player.vx = Math.cos(radians) * speed * sign;
  player.vy = -Math.sin(radians) * speed;
  player.facing = sign;
  player.grounded = true;
  player.idleTime = 0;

  const prevX = player.x;
  const prevY = player.y;
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  if (level && (player.y + player.height > level.worldHeight || player.y < -200)) {
    player.x = prevX;
    player.y = prevY;
    endSlopeAssist(player);
    return;
  }

  for (const tile of platforms) {
    if (!intersects(player, tile)) continue;
    player.x = prevX;
    player.y = prevY;
    endSlopeAssist(player);
    return;
  }

  for (const surface of oneWaySurfaces) {
    if (!intersects(player, surface)) continue;
    if (!shouldBlockOneWayPass("x", player.vx * dt, surface.passThroughFrom)
      && !shouldBlockOneWayPass("y", player.vy * dt, surface.passThroughFrom)) {
      continue;
    }
    player.x = prevX;
    player.y = prevY;
    endSlopeAssist(player);
    return;
  }
}

function canPlayerJump(player, settings) {
  const controlMode = settings.controlMode ?? "wasd";

  if (controlMode === "singleButton") {
    return player.jumpsRemaining > 0;
  }

  if (player.grounded) return true;
  if (player.coyoteTimer > 0) return true;
  return false;
}

function performJump(player, settings, project) {
  player.vy = settings.jumpVelocity;
  player.grounded = false;
  player.coyoteTimer = 0;
  player.jumpBufferTimer = 0;

  if ((settings.controlMode ?? "wasd") === "singleButton") {
    player.jumpsRemaining -= 1;
  }

  playSound(settings.jumpSound, project);
}

function moveAxis(entity, axis, delta, platforms, oneWaySurfaces = []) {
  entity[axis] += delta;

  for (const tile of platforms) {
    if (!intersects(entity, tile)) continue;

    if (axis === "x") {
      if (delta > 0) entity.x = tile.x - entity.width;
      else if (delta < 0) entity.x = tile.x + tile.width;
      entity.vx = 0;
    } else {
      if (delta > 0) {
        entity.y = tile.y - entity.height;
        entity.grounded = true;
      } else if (delta < 0) {
        entity.y = tile.y + tile.height;
      }
      entity.vy = 0;
    }
  }

  for (const surface of oneWaySurfaces) {
    if (!intersects(entity, surface)) continue;
    if (!shouldBlockOneWayPass(axis, delta, surface.passThroughFrom)) continue;
    applyOneWayBlock(entity, axis, delta, surface);
  }
}

export function drawPlayer(ctx, project, player) {
  const settings = player.settings;
  const animationState = player.animationState ?? resolvePlayerAnimationState(player);
  const spriteId = getPlayerSpriteId(settings, animationState);
  const asset = getSpriteAsset(project, spriteId);
  const image = getSpriteImage(asset);
  const idleOffset = getIdleOffset(player);
  const drawY = player.y + idleOffset;
  const tilt = getPlayerTiltRadians(player, settings);
  const flipX = shouldFlipPlayerSprite(player, settings);

  if (image?.complete && image.naturalWidth > 0) {
    drawPlayerGraphic(ctx, player.x, drawY, player.width, player.height, (context) => {
      context.drawImage(image, 0, 0, player.width, player.height);
    }, { flipX, tilt });
    return;
  }

  drawPlayerGraphic(ctx, player.x, drawY, player.width, player.height, (context) => {
    context.fillStyle = player.color;
    context.fillRect(0, 0, player.width, player.height);
  }, { flipX, tilt });
}

function drawPlayerGraphic(ctx, x, y, width, height, draw, { flipX, tilt }) {
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  ctx.save();
  ctx.translate(centerX, centerY);
  if (tilt) ctx.rotate(tilt);
  if (flipX) ctx.scale(-1, 1);
  ctx.translate(-width / 2, -height / 2);
  draw(ctx);
  ctx.restore();
}

function getIdleOffset(player) {
  if (!player.settings.dynamicIdleEnabled || !player.grounded || Math.abs(player.vx) >= 1) {
    return 0;
  }

  return Math.sin(player.idleTime * player.settings.idleSpeed) * player.settings.idleAmplitude;
}

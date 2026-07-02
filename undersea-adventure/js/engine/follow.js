import { hasEntityGravity } from "./entityGravity.js";
import { entityHasRandomBounceAction, hasEntityRandomBounce } from "./entityRandomBounce.js";
import { resolveEntityProperties } from "./entities.js";
import { getEnabledEntities } from "../level.js";

const FOLLOW_SPEED = 12;
const DEFAULT_MIN_EDGE_GAP = 48;

export function initEntityFollowers(state, project, level, camera, player) {
  state.entityFollowers = new Map();

  for (const entity of getEnabledEntities(level)) {
    const props = resolveEntityProperties(project, entity);
    if (!props.followCharacter || props.collision === "solid") continue;
    if (entityHasRandomBounceAction(project, entity)) continue;

    const minEdgeGap = Math.max(0, props.followDistanceMin ?? DEFAULT_MIN_EDGE_GAP);
    const minCenterDistance = getMinCenterDistance(player, entity, minEdgeGap);

    state.entityFollowers.set(entity.id, {
      minCenterDistance,
      ...createFollowPlacement(camera, entity, props, player, minCenterDistance),
    });
  }
}

export function updateEntityFollowers(state, project, level, player, dt) {
  if (!state.entityFollowers?.size) return;

  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  const facing = getPlayerFacing(player);
  const lerp = Math.min(1, FOLLOW_SPEED * dt);

  for (const entity of getEnabledEntities(level)) {
    if (hasEntityGravity(state, entity.id)) continue;
    if (hasEntityRandomBounce(state, entity.id)) continue;

    const follow = state.entityFollowers.get(entity.id);
    if (!follow) continue;

    const { offsetX, offsetY } = offsetFromPlacement(facing, follow.relativeAngle, follow.distance);
    let targetX = playerCenterX + offsetX - entity.width / 2;
    let targetY = playerCenterY + offsetY - entity.height / 2;

    ({ x: targetX, y: targetY } = clampPositionToMinDistance(
      player,
      entity,
      targetX,
      targetY,
      follow.minCenterDistance,
    ));

    entity.x += (targetX - entity.x) * lerp;
    entity.y += (targetY - entity.y) * lerp;

    enforceMinimumDistance(player, entity, follow.minCenterDistance);
  }
}

export function getPlayerFacing(player) {
  if (Math.abs(player.vx) >= 1) {
    return player.vx > 0 ? 1 : -1;
  }

  return player.facing ?? 1;
}

function createFollowPlacement(camera, entity, props, player, minCenterDistance) {
  const angleMin = props.followAngleMin ?? 0;
  const angleMax = props.followAngleMax ?? 360;
  const distMax = computeMaxDistance(camera, entity, props.followDistanceMax ?? 0, minCenterDistance);

  const lo = Math.min(angleMin, angleMax);
  const hi = Math.max(angleMin, angleMax);
  const angleDeg = lo + Math.random() * Math.max(0, hi - lo);
  const distance = minCenterDistance + Math.random() * Math.max(0, distMax - minCenterDistance);

  return {
    relativeAngle: (angleDeg * Math.PI) / 180,
    distance,
  };
}

function getMinCenterDistance(player, entity, minEdgeGap) {
  return minEdgeGap + halfExtent(player) + halfExtent(entity);
}

function halfExtent(box) {
  return Math.max(box.width, box.height) / 2;
}

function offsetFromPlacement(facing, relativeAngle, distance) {
  const aheadAngle = facing >= 0 ? 0 : Math.PI;
  const worldAngle = aheadAngle + relativeAngle;

  return {
    offsetX: Math.cos(worldAngle) * distance,
    offsetY: Math.sin(worldAngle) * distance,
  };
}

function clampPositionToMinDistance(player, entity, x, y, minCenterDistance) {
  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  const entityCenterX = x + entity.width / 2;
  const entityCenterY = y + entity.height / 2;
  const dx = entityCenterX - playerCenterX;
  const dy = entityCenterY - playerCenterY;
  const dist = Math.hypot(dx, dy);

  if (dist === 0) {
    return {
      x: playerCenterX + minCenterDistance - entity.width / 2,
      y: playerCenterY - entity.height / 2,
    };
  }

  if (dist >= minCenterDistance) {
    return { x, y };
  }

  const scale = minCenterDistance / dist;

  return {
    x: playerCenterX + dx * scale - entity.width / 2,
    y: playerCenterY + dy * scale - entity.height / 2,
  };
}

function enforceMinimumDistance(player, entity, minCenterDistance) {
  const clamped = clampPositionToMinDistance(
    player,
    entity,
    entity.x,
    entity.y,
    minCenterDistance,
  );

  entity.x = clamped.x;
  entity.y = clamped.y;
}

function computeMaxDistance(camera, entity, configuredMax, minCenterDistance) {
  const marginX = Math.max(entity.width, 48);
  const marginY = Math.max(entity.height, 48);
  const maxOffsetX = Math.max(marginX, camera.viewWidth / 2 - marginX);
  const maxOffsetY = Math.max(marginY, camera.viewHeight / 2 - marginY);
  const viewportMax = Math.max(
    minCenterDistance,
    Math.min(maxOffsetX, maxOffsetY) * 0.85,
  );

  if (!configuredMax || configuredMax <= 0) {
    return viewportMax;
  }

  return Math.max(minCenterDistance, Math.min(configuredMax, viewportMax));
}

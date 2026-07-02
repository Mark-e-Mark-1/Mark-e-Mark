import { resolveEntityActions } from "./actions.js";
import { intersects } from "./geometry.js";
import { getEnabledEntities, getSolidEntities } from "../level.js";

const OFFSCREEN_MARGIN = 64;

export function initEntityRandomBounces(state, project, level) {
  state.entityRandomBounces = new Map();

  for (const entity of getEnabledEntities(level)) {
    const action = resolveEntityActions(project, entity).find((item) => item.type === "randomBounce");
    if (!action) continue;

    const speed = Math.max(40, action.speed ?? 200);
    const angle = Math.random() * Math.PI * 2;

    state.entityRandomBounces.set(entity.id, {
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      speed,
      bounceVariance: action.bounceVariance ?? 0.25,
    });

    state.entityHomes?.delete(entity.id);
    state.entityFollowers?.delete(entity.id);
    state.entityGravity?.delete(entity.id);
  }
}

export function hasEntityRandomBounce(state, entityId) {
  return state.entityRandomBounces?.has(entityId) ?? false;
}

export function entityHasRandomBounceAction(project, entity) {
  return resolveEntityActions(project, entity).some((action) => action.type === "randomBounce");
}

export function updateEntityRandomBounces(state, project, level, dt) {
  if (!state.entityRandomBounces?.size) return;

  const solids = getSolidEntities(project, level);

  for (const entity of getEnabledEntities(level)) {
    const body = state.entityRandomBounces.get(entity.id);
    if (!body) continue;

    moveBounceAxis(entity, body, "x", body.vx * dt, solids);
    moveBounceAxis(entity, body, "y", body.vy * dt, solids);

    if (isOffscreen(entity, level)) {
      entity.enabled = false;
      state.entityRandomBounces.delete(entity.id);
    }
  }

  for (const entityId of [...state.entityRandomBounces.keys()]) {
    const entity = level.entities.find((item) => item.id === entityId);
    if (!entity || entity.enabled === false) {
      state.entityRandomBounces.delete(entityId);
    }
  }
}

function moveBounceAxis(entity, body, axis, delta, solids) {
  if (Math.abs(delta) < 0.0001) return;

  entity[axis] += delta;

  for (const tile of solids) {
    if (tile.id === entity.id) continue;
    if (!intersects(entity, tile)) continue;

    if (axis === "x") {
      if (delta > 0) entity.x = tile.x - entity.width;
      else if (delta < 0) entity.x = tile.x + tile.width;
      bounceAxis(body, "x");
    } else {
      if (delta > 0) entity.y = tile.y - entity.height;
      else if (delta < 0) entity.y = tile.y + tile.height;
      bounceAxis(body, "y");
    }

    break;
  }
}

function bounceAxis(body, axis) {
  if (axis === "x") body.vx *= -1;
  else body.vy *= -1;

  applyBounceVariance(body);
  normalizeSpeed(body);
}

function applyBounceVariance(body) {
  const variance = body.bounceVariance ?? 0;
  if (variance <= 0) return;

  const angle = Math.atan2(body.vy, body.vx);
  const jitter = (Math.random() - 0.5) * 2 * variance;
  const speed = Math.hypot(body.vx, body.vy) || body.speed;

  body.vx = Math.cos(angle + jitter) * speed;
  body.vy = Math.sin(angle + jitter) * speed;
}

function normalizeSpeed(body) {
  const speed = Math.hypot(body.vx, body.vy);
  if (speed < 0.001) {
    const angle = Math.random() * Math.PI * 2;
    body.vx = Math.cos(angle) * body.speed;
    body.vy = Math.sin(angle) * body.speed;
    return;
  }

  const scale = body.speed / speed;
  body.vx *= scale;
  body.vy *= scale;
}

function isOffscreen(entity, level) {
  return (
    entity.x + entity.width < -OFFSCREEN_MARGIN
    || entity.x > level.worldWidth + OFFSCREEN_MARGIN
    || entity.y + entity.height < -OFFSCREEN_MARGIN
    || entity.y > level.worldHeight + OFFSCREEN_MARGIN
  );
}

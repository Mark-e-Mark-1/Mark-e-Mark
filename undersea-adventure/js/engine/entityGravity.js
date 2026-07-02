import { intersects } from "./geometry.js";
import { getEnabledEntities, getSolidEntities } from "../level.js";

export const GRAVITY_TARGETS = {
  player: "Player",
  object: "Object",
  both: "Player and Object",
};
export function initEntityGravity(state) {
  state.entityGravity = new Map();
}

export function applyChangeGravity(action, { entity, player, state }) {
  const gravity = action.gravity ?? player.settings.gravity;
  const target = action.target ?? "player";

  if (target === "player" || target === "both") {
    player.settings.gravity = gravity;
  }

  if (target === "object" || target === "both") {
    enableEntityGravity(state, entity, gravity);
  }
}

export function enableEntityGravity(state, entity, gravity) {
  const existing = state.entityGravity.get(entity.id);

  state.entityGravity.set(entity.id, {
    gravity,
    vy: existing?.vy ?? 0,
    vx: existing?.vx ?? 0,
    grounded: existing?.grounded ?? false,
  });

  state.entityHomes?.delete(entity.id);
  state.entityFollowers?.delete(entity.id);
}

export function hasEntityGravity(state, entityId) {
  return state.entityGravity?.has(entityId) ?? false;
}

export function updateEntityGravities(state, project, level, dt) {
  if (!state.entityGravity?.size) return;

  for (const entity of getEnabledEntities(level)) {
    const body = state.entityGravity.get(entity.id);
    if (!body) continue;

    const platforms = getSolidEntities(project, level).filter((tile) => tile.id !== entity.id);

    body.vy += body.gravity * dt;
    body.grounded = false;

    moveEntityAxis(entity, "x", body.vx * dt, platforms);
    moveEntityAxis(entity, "y", body.vy * dt, platforms, body);
  }
}

function moveEntityAxis(entity, axis, delta, platforms, body) {
  entity[axis] += delta;

  for (const tile of platforms) {
    if (!intersects(entity, tile)) continue;

    if (axis === "x") {
      if (delta > 0) entity.x = tile.x - entity.width;
      else if (delta < 0) entity.x = tile.x + tile.width;
      body.vx = 0;
    } else {
      if (delta > 0) {
        entity.y = tile.y - entity.height;
        body.grounded = true;
      } else if (delta < 0) {
        entity.y = tile.y + tile.height;
      }
      body.vy = 0;
    }
  }
}

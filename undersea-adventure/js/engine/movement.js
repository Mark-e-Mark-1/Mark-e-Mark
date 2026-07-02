import { hasEntityGravity } from "./entityGravity.js";
import { entityHasRandomBounceAction, hasEntityRandomBounce } from "./entityRandomBounce.js";
import { resolveEntityActions } from "./actions.js";
import { resolveEntityProperties } from "./entities.js";
import { getEnabledEntities } from "../level.js";

export const MOVEMENT_STYLES = {
  bob: "Bob Up/Down",
  sway: "Sway Left/Right",
  float: "Float",
  drift: "Slow Drift",
};

export function initEntityMovement(state, project, level) {
  state.movementTime = 0;
  state.entityHomes = new Map();

  for (const entity of getEnabledEntities(level)) {
    const movementActions = resolveEntityActions(project, entity).filter(
      (action) => action.type === "movement" && action.event === "onAlways",
    );

    if (movementActions.length === 0) continue;
    if (resolveEntityProperties(project, entity).followCharacter) continue;
    if (entityHasRandomBounceAction(project, entity)) continue;

    state.entityHomes.set(entity.id, {
      x: entity.x,
      y: entity.y,
      homePhase: entity.x * 0.04 + entity.y * 0.03,
      actions: movementActions,
    });
  }
}

export function updateEntityMovements(state, project, level, dt) {
  if (!state.entityHomes?.size) return;

  state.movementTime += dt;

  for (const entity of getEnabledEntities(level)) {
    const home = state.entityHomes.get(entity.id);
    if (!home) continue;
    if (hasEntityGravity(state, entity.id)) continue;
    if (hasEntityRandomBounce(state, entity.id)) continue;

    const offset = computeCombinedOffset(home.actions, state.movementTime, home.homePhase);
    entity.x = home.x + offset.x;
    entity.y = home.y + offset.y;
  }
}

function computeCombinedOffset(actions, time, homePhase) {
  let x = 0;
  let y = 0;

  for (const action of actions) {
    const delta = computeMovementOffset(action, time, homePhase);
    x += delta.x;
    y += delta.y;
  }

  return { x, y };
}

function computeMovementOffset(action, time, homePhase) {
  const speed = action.speed ?? 2;
  const phase = (action.phase ?? 0) + homePhase;
  const t = time * speed + phase;
  const amplitudeX = action.amplitudeX ?? 0;
  const amplitudeY = action.amplitudeY ?? 8;
  const style = action.style ?? "bob";

  switch (style) {
    case "sway":
      return { x: Math.sin(t) * (amplitudeX || 10), y: 0 };
    case "float":
      return {
        x: Math.sin(t) * (amplitudeX || 6),
        y: Math.cos(t) * (amplitudeY || 8),
      };
    case "drift":
      return {
        x: Math.sin(t * 0.6) * (amplitudeX || 14),
        y: Math.sin(t * 0.45 + 1.2) * (amplitudeY || 4),
      };
    case "bob":
    default:
      return { x: 0, y: Math.sin(t) * (amplitudeY || 8) };
  }
}

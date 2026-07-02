import { resolveEntityActions } from "./actions.js";
import { resolveEntityProperties } from "./entities.js";
import { getEnabledEntities } from "../level.js";

export const ONE_WAY_DIRECTIONS = {
  left: "Left (enter from left)",
  right: "Right (enter from right)",
  up: "Below (jump up through)",
  down: "Above (drop down through)",
};

export function getOneWayPassSurfaces(project, level) {
  const surfaces = [];

  for (const entity of getEnabledEntities(level)) {
    const action = resolveEntityActions(project, entity).find((item) => item.type === "oneWayPass");
    if (!action) continue;

    const props = resolveEntityProperties(project, entity);
    surfaces.push({
      ...props,
      id: entity.id,
      passThroughFrom: action.passThroughFrom ?? "left",
    });
  }

  return surfaces;
}

export function entityHasOneWayPassAction(project, entity) {
  return resolveEntityActions(project, entity).some((action) => action.type === "oneWayPass");
}

export function shouldBlockOneWayPass(axis, delta, passThroughFrom) {
  if (Math.abs(delta) < 0.0001) return false;

  if (passThroughFrom === "left") {
    return axis === "x" && delta > 0;
  }

  if (passThroughFrom === "right") {
    return axis === "x" && delta < 0;
  }

  if (passThroughFrom === "up") {
    return axis === "y" && delta > 0;
  }

  if (passThroughFrom === "down") {
    return axis === "y" && delta < 0;
  }

  return false;
}

export function applyOneWayBlock(entity, axis, delta, tile) {
  if (axis === "x") {
    if (delta > 0) entity.x = tile.x - entity.width;
    else if (delta < 0) entity.x = tile.x + tile.width;
    entity.vx = 0;
    return;
  }

  if (delta > 0) {
    entity.y = tile.y - entity.height;
    entity.grounded = true;
  } else if (delta < 0) {
    entity.y = tile.y + tile.height;
  }

  entity.vy = 0;
}

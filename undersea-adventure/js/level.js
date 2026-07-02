import { resolveEntityProperties } from "./engine/entities.js";
import { createDefaultBackgroundLayers } from "./engine/backgrounds.js";
import { getSpriteAsset, getSpriteImage } from "./engine/sprites.js";

export const PLAYTEST_MARKER_TOOL = "__playtestMarker__";

export function isPlaytestMarkerTool(tool) {
  return tool === PLAYTEST_MARKER_TOOL;
}

export function hasPlaytestMarker(level) {
  return Number.isFinite(level.playtestMarker?.x) && Number.isFinite(level.playtestMarker?.y);
}

export function getLevelSpawn(project, level, { usePlaytestMarker = false } = {}) {
  if (usePlaytestMarker && hasPlaytestMarker(level)) {
    return { x: level.playtestMarker.x, y: level.playtestMarker.y };
  }

  return { x: project.player.startX, y: project.player.startY };
}

export function getPlaytestMarkerBounds(project, marker) {
  return {
    x: marker.x,
    y: marker.y,
    width: project.player.width,
    height: project.player.height,
  };
}

export function pointInPlaytestMarker(project, level, x, y) {
  if (!hasPlaytestMarker(level)) return false;

  const bounds = getPlaytestMarkerBounds(project, level.playtestMarker);
  return x >= bounds.x && x <= bounds.x + bounds.width && y >= bounds.y && y <= bounds.y + bounds.height;
}

export function drawPlaytestMarker(ctx, project, marker) {
  const width = project.player.width;
  const height = project.player.height;
  const x = marker.x;
  const y = marker.y;

  ctx.save();
  ctx.setLineDash([8, 6]);
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 3;
  ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);

  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(251, 191, 36, 0.22)";
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.moveTo(x + width + 10, y - 4);
  ctx.lineTo(x + width + 10, y + 34);
  ctx.lineTo(x + width + 28, y + 12);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 12px system-ui, sans-serif";
  ctx.fillText("Playtest", x + width + 32, y + 16);
  ctx.restore();
}
export function getActiveLevel(project) {
  ensureLevelOrder(project);
  return project.levels.find((level) => level.id === project.activeLevelId) ?? project.levels[0];
}

export function getLevelById(project, levelId) {
  ensureLevelOrder(project);
  return project.levels.find((level) => level.id === levelId) ?? project.levels[0];
}

export function getOrderedLevels(project) {
  ensureLevelOrder(project);
  return project.levelOrder
    .map((id) => project.levels.find((level) => level.id === id))
    .filter(Boolean);
}

export function getOrderedLevelIds(project) {
  ensureLevelOrder(project);
  return [...project.levelOrder];
}

export function getNextLevelId(project, levelId) {
  ensureLevelOrder(project);
  const index = project.levelOrder.indexOf(levelId);
  if (index < 0 || index >= project.levelOrder.length - 1) return null;
  return project.levelOrder[index + 1];
}

export function ensureLevelOrder(project) {
  project.levels ??= [];

  if (!project.levelOrder?.length) {
    project.levelOrder = project.levels.map((level) => level.id);
  }

  for (const level of project.levels) {
    if (!project.levelOrder.includes(level.id)) {
      project.levelOrder.push(level.id);
    }
  }

  project.levelOrder = project.levelOrder.filter((id) => project.levels.some((level) => level.id === id));

  if (!project.activeLevelId || !project.levels.some((level) => level.id === project.activeLevelId)) {
    project.activeLevelId = project.levelOrder[0] ?? project.levels[0]?.id ?? "";
  }

  return project.levelOrder;
}

export function setActiveLevel(project, levelId) {
  if (!project.levels.some((level) => level.id === levelId)) return false;
  project.activeLevelId = levelId;
  return true;
}

export function createBlankLevel(name = "New Level") {
  return {
    id: `level_${crypto.randomUUID()}`,
    name,
    worldWidth: 3200,
    worldHeight: 720,
    tileSize: 48,
    durationSeconds: 0,
    musicId: "",
    musicLoop: false,
    musicVolume: 75,
    playtestMarker: null,
    entities: [],
    backgroundLayers: createDefaultBackgroundLayers(),
  };
}

export function duplicateLevel(project, levelId) {
  const source = getLevelById(project, levelId);
  const clone = structuredClone(source);
  clone.id = `level_${crypto.randomUUID()}`;
  clone.name = `${source.name} Copy`;
  clone.entities = (clone.entities ?? []).map((entity) => ({
    ...entity,
    id: `${entity.type}_${crypto.randomUUID()}`,
  }));

  project.levels.push(clone);

  const index = project.levelOrder.indexOf(levelId);
  if (index >= 0) {
    project.levelOrder.splice(index + 1, 0, clone.id);
  } else {
    project.levelOrder.push(clone.id);
  }

  return clone;
}

export function deleteLevel(project, levelId) {
  if (project.levels.length <= 1) return false;

  project.levels = project.levels.filter((level) => level.id !== levelId);
  project.levelOrder = project.levelOrder.filter((id) => id !== levelId);

  if (project.activeLevelId === levelId) {
    project.activeLevelId = project.levelOrder[0] ?? project.levels[0]?.id ?? "";
  }

  return true;
}

export function moveLevelInOrder(project, levelId, direction) {
  ensureLevelOrder(project);
  const index = project.levelOrder.indexOf(levelId);
  const newIndex = index + direction;

  if (index < 0 || newIndex < 0 || newIndex >= project.levelOrder.length) {
    return false;
  }

  const [id] = project.levelOrder.splice(index, 1);
  project.levelOrder.splice(newIndex, 0, id);
  return true;
}

export function getEnabledEntities(level) {
  return level.entities.filter((entity) => entity.enabled !== false);
}

export function getEntityLayerPosition(level, entityId) {
  const enabled = getEnabledEntities(level);
  const index = enabled.findIndex((entity) => entity.id === entityId);

  if (index < 0) {
    return { index: -1, total: enabled.length };
  }

  return { index: index + 1, total: enabled.length };
}

export function moveEntityToFront(level, entityId) {
  const index = level.entities.findIndex((entity) => entity.id === entityId);
  if (index < 0 || index === level.entities.length - 1) return false;

  const [entity] = level.entities.splice(index, 1);
  level.entities.push(entity);
  return true;
}

export function moveEntityToBack(level, entityId) {
  const index = level.entities.findIndex((entity) => entity.id === entityId);
  if (index <= 0) return false;

  const [entity] = level.entities.splice(index, 1);
  level.entities.unshift(entity);
  return true;
}

export function getSolidEntities(project, level) {
  return getEnabledEntities(level)
    .map((entity) => resolveEntityProperties(project, entity))
    .filter((entity) => entity.collision === "solid");
}

export function getTriggerEntities(project, level) {
  return getEnabledEntities(level)
    .filter((entity) => resolveEntityProperties(project, entity).collision === "trigger");
}

export function drawLevel(ctx, project, level, selectedEntityId = "") {
  for (const entity of getEnabledEntities(level)) {
    drawEntity(ctx, project, resolveEntityProperties(project, entity), entity.id === selectedEntityId);
  }
}

export function drawEntity(ctx, project, entity, selected = false) {
  ctx.fillStyle = entity.color;

  if (drawSprite(ctx, project, entity)) {
    // Sprite rendered successfully.
  } else if (entity.type === "spike") {
    ctx.beginPath();
    ctx.moveTo(entity.x, entity.y + entity.height);
    ctx.lineTo(entity.x + entity.width / 2, entity.y);
    ctx.lineTo(entity.x + entity.width, entity.y + entity.height);
    ctx.closePath();
    ctx.fill();
  } else if (entity.type === "coin") {
    ctx.beginPath();
    ctx.ellipse(
      entity.x + entity.width / 2,
      entity.y + entity.height / 2,
      entity.width / 2,
      entity.height / 2,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  } else {
    ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
  }

  if (selected) {
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 3;
    ctx.strokeRect(entity.x + 0.5, entity.y + 0.5, entity.width - 1, entity.height - 1);
    ctx.lineWidth = 1;
  }
}

function drawSprite(ctx, project, entity) {
  const asset = getSpriteAsset(project, entity.spriteId);
  const image = getSpriteImage(asset);

  if (!image?.complete || image.naturalWidth === 0) {
    return false;
  }

  if (entity.flipX) {
    ctx.save();
    ctx.translate(entity.x + entity.width, entity.y);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0, entity.width, entity.height);
    ctx.restore();
    return true;
  }

  ctx.drawImage(image, entity.x, entity.y, entity.width, entity.height);
  return true;
}

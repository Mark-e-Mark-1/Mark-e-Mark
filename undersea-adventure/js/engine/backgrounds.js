import { getSpriteAsset, getSpriteImage } from "./sprites.js";

export const DEFAULT_BACKGROUND_LAYERS = [
  { id: "farBack", label: "Far Back", position: "back", imageId: "", parallax: 0.18, y: 0, height: 720, opacity: 1, enabled: true, wrap: true },
  { id: "midBack", label: "Mid Back", position: "back", imageId: "", parallax: 0.45, y: 0, height: 720, opacity: 1, enabled: true, wrap: true },
  { id: "front", label: "Front", position: "front", imageId: "", parallax: 0.9, y: 0, height: 720, opacity: 1, enabled: true, wrap: true },
];

const patternCache = new Map();

export function clearBackgroundTileCache() {
  patternCache.clear();
}

export function createDefaultBackgroundLayers() {
  return structuredClone(DEFAULT_BACKGROUND_LAYERS);
}

export function normalizeLevelBackgroundLayers(level) {
  level.backgroundLayers ??= createDefaultBackgroundLayers();

  for (const defaultLayer of DEFAULT_BACKGROUND_LAYERS) {
    const layer = level.backgroundLayers.find((item) => item.id === defaultLayer.id);

    if (!layer) {
      level.backgroundLayers.push(structuredClone(defaultLayer));
      continue;
    }

    for (const [key, value] of Object.entries(defaultLayer)) {
      layer[key] ??= value;
    }
  }
}

export function migrateProjectBackgroundLayers(project) {
  const legacyLayers = project.game?.backgroundLayers;

  for (const level of project.levels ?? []) {
    if (!level.backgroundLayers?.length) {
      level.backgroundLayers = legacyLayers
        ? structuredClone(legacyLayers)
        : createDefaultBackgroundLayers();
    }

    normalizeLevelBackgroundLayers(level);
  }
}

export function drawBackgroundLayers(ctx, project, level, camera, position) {
  for (const layer of (level.backgroundLayers ?? []).filter((item) => item.position === position)) {
    drawBackgroundLayer(ctx, project, camera, layer);
  }
}

function drawBackgroundLayer(ctx, project, camera, layer) {
  if (!layer.enabled || !layer.imageId) return;

  const asset = getSpriteAsset(project, layer.imageId);
  const image = getSpriteImage(asset);

  if (!image?.complete || image.naturalWidth === 0) return;

  const drawHeight = Math.max(1, Math.round(layer.height));
  const drawWidth = Math.max(
    1,
    Math.round((image.naturalWidth * drawHeight) / image.naturalHeight),
  );
  const cameraX = Math.floor(camera.x);
  const scroll = Math.round(cameraX * layer.parallax);
  const drawY = Math.round(layer.y);

  ctx.save();
  ctx.globalAlpha = layer.opacity;

  if (layer.wrap === false) {
    drawScrollingBackground(ctx, image, drawWidth, drawHeight, scroll, drawY);
  } else {
    const pattern = getLayerPattern(ctx, asset.id, image, drawWidth, drawHeight);
    drawTiledBackground(ctx, pattern, drawWidth, drawHeight, scroll, drawY);
  }

  ctx.restore();
}

function drawTiledBackground(ctx, pattern, drawWidth, drawHeight, scroll, drawY) {
  const offset = ((scroll % drawWidth) + drawWidth) % drawWidth;

  ctx.fillStyle = pattern;
  ctx.save();
  ctx.translate(-offset, drawY);
  ctx.fillRect(-2, 0, ctx.canvas.width + drawWidth + 4, drawHeight);
  ctx.restore();
}

function drawScrollingBackground(ctx, image, drawWidth, drawHeight, scroll, drawY) {
  const firstIndex = Math.floor(scroll / drawWidth);
  const lastIndex = Math.ceil((scroll + ctx.canvas.width) / drawWidth);

  ctx.imageSmoothingEnabled = true;

  for (let index = firstIndex; index <= lastIndex; index += 1) {
    const x = index * drawWidth - scroll;
    if (x + drawWidth <= 0 || x >= ctx.canvas.width) continue;
    drawBackgroundImage(ctx, image, x, drawY, drawWidth, drawHeight);
  }
}

function drawBackgroundImage(ctx, image, x, y, width, height) {
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    Math.round(x),
    Math.round(y),
    width,
    height,
  );
}

function getLayerPattern(ctx, assetId, image, drawWidth, drawHeight) {
  const key = `${assetId}:${drawWidth}x${drawHeight}`;
  const cached = patternCache.get(key);

  if (cached) return cached;

  const tile = document.createElement("canvas");
  tile.width = drawWidth;
  tile.height = drawHeight;

  const tileCtx = tile.getContext("2d");
  tileCtx.imageSmoothingEnabled = true;
  tileCtx.imageSmoothingQuality = "high";
  tileCtx.drawImage(image, 0, 0, drawWidth, drawHeight);

  const pattern = ctx.createPattern(tile, "repeat");
  patternCache.set(key, pattern);
  return pattern;
}

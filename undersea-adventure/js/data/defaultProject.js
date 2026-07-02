import { DEFAULT_PROPERTY_KEYS, getDefaultProperties } from "../engine/entities.js";
import { normalizeProjectSounds } from "../engine/audio.js";
import { createDefaultBackgroundLayers, migrateProjectBackgroundLayers } from "../engine/backgrounds.js";
import { ensureLevelOrder } from "../level.js";

export const TILE_SIZE = 48;

export const OBJECT_LIBRARY = {
  block: {
    label: "Block",
    width: TILE_SIZE,
    height: TILE_SIZE,
    color: "#22c55e",
    collision: "solid",
    actions: [],
  },
  spike: {
    label: "Spike",
    width: TILE_SIZE,
    height: TILE_SIZE,
    color: "#ef4444",
    collision: "trigger",
    sound: "damage",
    actions: [
      { event: "onTouch", type: "damagePlayer", amount: 1 },
      { event: "onTouch", type: "resetPlayer" },
    ],
  },
  coin: {
    label: "Coin",
    width: 32,
    height: 32,
    color: "#facc15",
    collision: "trigger",
    scoreValue: 100,
    sound: "coin",
    actions: [
      { event: "onTouch", type: "addScore", amount: 100 },
      { event: "onTouch", type: "collect_sparklePop", sound: "coin" },
      { event: "onTouch", type: "destroySelf" },
    ],
  },
  bounce: {
    label: "Bounce Pad",
    width: TILE_SIZE,
    height: 16,
    color: "#a855f7",
    collision: "trigger",
    sound: "bounce",
    actions: [
      { event: "onTouch", type: "bouncePlayer", velocity: -900 },
      { event: "onTouch", type: "playSound", sound: "bounce" },
    ],
  },
  goal: {
    label: "Goal",
    width: TILE_SIZE,
    height: TILE_SIZE * 2,
    color: "#38bdf8",
    collision: "trigger",
    sound: "goal",
    actions: [
      { event: "onTouch", type: "completeLevel" },
      { event: "onTouch", type: "playSound", sound: "goal" },
    ],
  },
};

export function createEntity(type, x, y, project) {
  const definition = getObjectDefinition(project, type);
  const id = `${type}_${crypto.randomUUID()}`;

  return {
    id,
    type,
    name: definition.label,
    x,
    y,
    width: definition.width,
    height: definition.height,
    color: definition.color,
    collision: definition.collision,
    scoreValue: definition.scoreValue ?? 0,
    sound: definition.sound ?? "",
    spriteId: definition.spriteId ?? "",
    propertyMode: "inherit",
    actionMode: "inherit",
    actions: structuredClone(definition.actions),
    enabled: true,
  };
}

export function getObjectDefinitions(project) {
  return {
    ...OBJECT_LIBRARY,
    ...(project?.customObjectTypes ?? {}),
  };
}

export function getObjectDefinition(project, type) {
  return getObjectDefinitions(project)[type] ?? OBJECT_LIBRARY.block;
}

export function createCustomObjectType(project, asset) {
  const type = `object_${crypto.randomUUID()}`;
  const definition = {
    label: asset.name,
    width: TILE_SIZE,
    height: TILE_SIZE,
    color: "#ffffff",
    collision: "none",
    scoreValue: 0,
    sound: "",
    spriteId: asset.id,
    actions: [],
  };

  project.customObjectTypes[type] = definition;
  project.objectDefaults[type] = {
    label: definition.label,
    ...getDefaultProperties(definition),
    actions: structuredClone(definition.actions),
  };

  return type;
}

export function deleteCustomObjectType(project, type) {
  if (!project.customObjectTypes?.[type]) {
    return false;
  }

  delete project.customObjectTypes[type];
  delete project.objectDefaults[type];

  for (const level of project.levels ?? []) {
    level.entities = (level.entities ?? []).filter((entity) => entity.type !== type);
  }

  return true;
}

export function createObjectDefaults() {
  return Object.fromEntries(
    Object.entries(OBJECT_LIBRARY).map(([type, definition]) => [
      type,
      {
        label: definition.label,
        ...getDefaultProperties(definition),
        actions: structuredClone(definition.actions),
      },
    ]),
  );
}

export function normalizeProject(project) {
  project.objectDefaults ??= createObjectDefaults();
  project.customObjectTypes ??= {};
  project.game ??= {};
  project.game.sfxVolume ??= 85;
  project.assets ??= { images: [], sounds: [], music: [] };
  project.assets.images ??= [];
  project.assets.sounds ??= [];
  project.assets.music ??= [];
  migrateProjectBackgroundLayers(project);

  for (const [type, definition] of Object.entries(getObjectDefinitions(project))) {
    project.objectDefaults[type] ??= {
      label: definition.label,
      ...getDefaultProperties(definition),
      actions: structuredClone(definition.actions),
    };

    for (const key of DEFAULT_PROPERTY_KEYS) {
      project.objectDefaults[type][key] ??= getDefaultProperties(definition)[key];
    }

    project.objectDefaults[type].actions ??= structuredClone(definition.actions);
  }

  for (const level of project.levels ?? []) {
    level.name ??= "Untitled Level";
    level.durationSeconds ??= 0;
    level.musicId ??= "";
    level.musicLoop ??= false;
    level.musicVolume ??= 75;
    level.playtestMarker ??= null;

    for (const entity of level.entities ?? []) {
      entity.propertyMode ??= "inherit";
      entity.actionMode ??= "inherit";
      entity.flipX ??= false;
      entity.followCharacter ??= false;
      entity.followAngleMin ??= 0;
      entity.followAngleMax ??= 360;
      entity.followDistanceMin ??= 48;
      entity.followDistanceMax ??= 0;
      entity.actions ??= structuredClone(getObjectDefinition(project, entity.type).actions ?? []);
    }
  }

  project.player.spriteId ??= "";
  project.player.spriteIdleId ??= "";
  project.player.spriteRunId ??= "";
  project.player.spriteJumpId ??= "";
  project.player.spriteFallId ??= "";
  project.player.flipX ??= false;
  project.player.tiltEnabled ??= true;
  project.player.tiltAmount ??= 12;
  project.player.coyoteTime ??= 0.1;
  project.player.jumpBufferTime ??= 0.06;
  project.player.controlMode ??= "wasd";
  project.player.maxJumps ??= 1;
  project.player.moveSpeed ??= 320;
  project.player.jumpSound ??= "jump";
  project.player.deathSound ??= "hurt";
  project.player.resetSound ??= "";
  project.player.locomotionSound ??= "";
  project.player.locomotionRate ??= 2.5;
  project.player.respawns ??= project.player.lives ?? 3;
  project.player.dynamicIdleEnabled ??= true;
  project.player.idleAmplitude ??= 3;
  project.player.idleSpeed ??= 5;
  project.player.particlesEnabled ??= false;
  project.player.particlePreset ??= "bubbles";
  project.player.particleRate ??= 2;
  project.player.particleChance ??= 0.7;
  project.player.particleBurstCount ??= 1;
  project.player.particleOffsetX ??= -8;
  project.player.particleOffsetY ??= 24;

  normalizeProjectSounds(project);
  ensureLevelOrder(project);

  return project;
}

export function createDefaultProject() {
  const entities = [];

  for (let x = 0; x < 3200; x += TILE_SIZE) {
    entities.push(createEntity("block", x, 672));
  }

  [
    [384, 528],
    [432, 528],
    [480, 528],
    [768, 432],
    [816, 432],
    [864, 432],
    [1248, 528],
    [1296, 528],
    [1344, 528],
  ].forEach(([x, y]) => entities.push(createEntity("block", x, y)));

  entities.push(createEntity("coin", 432, 488));
  entities.push(createEntity("coin", 816, 392));
  entities.push(createEntity("spike", 624, 624));
  entities.push(createEntity("bounce", 1056, 656));
  entities.push(createEntity("goal", 3000, 576));

  return {
    version: 1,
    name: "Side Scroller Creator Kit",
    activeLevelId: "level_1",
    levelOrder: ["level_1"],
    game: {
      width: 1280,
      height: 720,
      backgroundColor: "#0ea5e9",
      scoreLabel: "Score",
      sfxVolume: 85,
    },
    player: {
      startX: 80,
      startY: 624,
      width: 32,
      height: 48,
      color: "#38bdf8",
      flipX: false,
      spriteIdleId: "",
      spriteRunId: "",
      spriteJumpId: "",
      spriteFallId: "",
      tiltEnabled: true,
      tiltAmount: 12,
      coyoteTime: 0.1,
      jumpBufferTime: 0.06,
      gravity: 1800,
      controlMode: "wasd",
      maxJumps: 1,
      moveSpeed: 320,
      jumpVelocity: -620,
      jumpSound: "jump",
      deathSound: "hurt",
      resetSound: "",
      locomotionSound: "",
      locomotionRate: 2.5,
      dynamicIdleEnabled: true,
      idleAmplitude: 3,
      idleSpeed: 5,
      particlesEnabled: false,
      particlePreset: "bubbles",
      particleRate: 2,
      particleChance: 0.7,
      particleBurstCount: 1,
      particleOffsetX: -8,
      particleOffsetY: 24,
      respawns: 3,
    },
    objectDefaults: createObjectDefaults(),
    customObjectTypes: {},
    levels: [
      {
        id: "level_1",
        name: "First Level",
        worldWidth: 3200,
        worldHeight: 720,
        tileSize: TILE_SIZE,
        entities,
        backgroundLayers: createDefaultBackgroundLayers(),
      },
    ],
    assets: {
      images: [],
      sounds: [],
      music: [],
    },
  };
}

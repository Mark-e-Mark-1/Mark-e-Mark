import { playSound } from "./audio.js";
import { applyPlayerDeath, respawnPlayer } from "./playerLife.js";
import {
  buildCollectActionTypes,
  buildExplosionActionTypes,
  getCollectEffectIdFromActionType,
  getExplosionEffectIdFromActionType,
  playCollectEffect,
  playExplosionEffect,
} from "./collectEffects.js";
import { emitParticles } from "./particles.js";
import { applyChangeGravity } from "./entityGravity.js";
import { getNextLevelId, getEnabledEntities } from "../level.js";
import { reversePlayerDirection, startSlopeAssist, endSlopeAssist } from "../player.js";

const COLLECT_ACTION_TYPES = buildCollectActionTypes();
const EXPLOSION_ACTION_TYPES = buildExplosionActionTypes();

export const ACTION_TYPES = {
  addScore: {
    label: "Add Score",
    fields: [{ key: "amount", label: "Amount", type: "number", defaultValue: 100 }],
  },
  subtractScore: {
    label: "Subtract Score",
    fields: [{ key: "amount", label: "Amount", type: "number", defaultValue: 100 }],
  },
  playSound: {
    label: "Play Sound",
    fields: [{ key: "sound", label: "Sound", type: "sound", defaultValue: "builtin:coin" }],
  },
  destroySelf: {
    label: "Destroy Self",
    fields: [],
  },
  explode: {
    label: "Explode",
    fields: [
      { key: "count", label: "Particle Count", type: "number", defaultValue: 28 },
      { key: "sound", label: "Sound", type: "sound", defaultValue: "builtin:explode" },
    ],
  },
  damagePlayer: {
    label: "Damage Player",
    fields: [{ key: "amount", label: "Damage", type: "number", defaultValue: 1 }],
  },
  resetPlayer: {
    label: "Reset Player",
    fields: [],
  },
  bouncePlayer: {
    label: "Bounce Player",
    fields: [{ key: "velocity", label: "Velocity", type: "number", defaultValue: -800 }],
  },
  changePlayerSpeed: {
    label: "Player Speed",
    fields: [{ key: "speed", label: "Speed", type: "number", defaultValue: 320, min: 0 }],
  },
  reversePlayerDirection: {
    label: "Reverse Direction",
    fields: [],
  },
  changeGravity: {
    label: "Change Gravity",
    fields: [
      { key: "gravity", label: "Gravity", type: "number", defaultValue: 1800 },
      {
        key: "target",
        label: "Apply To",
        type: "select",
        defaultValue: "player",
        options: ["player", "object", "both"],
      },
    ],
  },
  completeLevel: {
    label: "Complete Level",
    fields: [],
  },
  emitParticles: {
    label: "Emit Particles",
    fields: [
      { key: "preset", label: "Effect", type: "select", defaultValue: "sparks", options: ["bubbles", "sparks", "smoke"] },
      { key: "count", label: "Count", type: "number", defaultValue: 12 },
      { key: "offsetX", label: "Offset X", type: "number", defaultValue: 0 },
      { key: "offsetY", label: "Offset Y", type: "number", defaultValue: 0 },
      { key: "rate", label: "Rate / Sec", type: "number", defaultValue: 0 },
      { key: "duration", label: "Duration", type: "number", defaultValue: 0 },
    ],
  },
  movement: {
    label: "Movement",
    fields: [
      { key: "style", label: "Style", type: "select", defaultValue: "bob", options: ["bob", "sway", "float", "drift"] },
      { key: "amplitudeX", label: "Amount X", type: "number", defaultValue: 0 },
      { key: "amplitudeY", label: "Amount Y", type: "number", defaultValue: 8 },
      { key: "speed", label: "Speed", type: "number", defaultValue: 2, step: 0.1 },
      { key: "phase", label: "Phase Offset", type: "number", defaultValue: 0, step: 0.1 },
    ],
  },
  randomBounce: {
    label: "Random Bounce",
    fields: [
      { key: "speed", label: "Speed", type: "number", defaultValue: 200, min: 40 },
      { key: "bounceVariance", label: "Bounce Randomness", type: "number", defaultValue: 0.25, step: 0.05, min: 0 },
    ],
  },
  oneWayPass: {
    label: "One-Way Pass",
    fields: [
      {
        key: "passThroughFrom",
        label: "Pass Through From",
        type: "select",
        defaultValue: "left",
        options: ["left", "right", "up", "down"],
      },
    ],
  },
  startSlopeAssist: {
    label: "Start Slope Assist",
    fields: [
      { key: "angle", label: "Slope Angle", type: "number", defaultValue: 27, min: 5, max: 75 },
      {
        key: "direction",
        label: "Direction",
        type: "select",
        defaultValue: "right",
        options: ["right", "left"],
      },
      { key: "speed", label: "Speed", type: "number", defaultValue: 320, min: 40 },
    ],
  },
  endSlopeAssist: {
    label: "End Slope Assist",
    fields: [],
  },
  ...COLLECT_ACTION_TYPES,
  ...EXPLOSION_ACTION_TYPES,
};

export const ACTION_EVENTS = {
  onTouch: "On Touch",
  onAlways: "All the Time",
};

export function runActions(actions, context) {
  for (const [actionIndex, action] of (actions ?? []).entries()) {
    runAction(action, { ...context, actionIndex });
  }
}

export function resolveEntityActions(project, entity) {
  if (entity.actionMode === "custom") {
    return entity.actions ?? [];
  }

  return project.objectDefaults?.[entity.type]?.actions ?? entity.actions ?? [];
}

export function getEntitiesWithTouchActions(project, level) {
  return getEnabledEntities(level).filter((entity) =>
    resolveEntityActions(project, entity).some((action) => action.event === "onTouch"),
  );
}

function runAction(action, context) {
  const {
    actionIndex,
    collectEffects,
    effectiveEntity = context.entity,
    entity,
    level,
    particles,
    player,
    project,
    state,
  } = context;

  const collectEffectId = getCollectEffectIdFromActionType(action.type);
  if (collectEffectId) {
    const centerX = effectiveEntity.x + effectiveEntity.width / 2;
    const centerY = effectiveEntity.y + effectiveEntity.height / 2;
    playCollectEffect(collectEffects, particles, collectEffectId, centerX, centerY);
    if (action.sound) {
      playSound(action.sound, project);
    }
    return;
  }

  const explosionEffectId = getExplosionEffectIdFromActionType(action.type);
  if (explosionEffectId) {
    const centerX = effectiveEntity.x + effectiveEntity.width / 2;
    const centerY = effectiveEntity.y + effectiveEntity.height / 2;
    playExplosionEffect(collectEffects, particles, explosionEffectId, centerX, centerY);
    if (action.sound) {
      playSound(action.sound, project);
    }
    if (action.destroySelf !== "no") {
      entity.enabled = false;
    }
    return;
  }

  if (action.type === "addScore") {
    state.score += action.amount ?? effectiveEntity.scoreValue ?? 0;
  }

  if (action.type === "subtractScore") {
    state.score -= action.amount ?? effectiveEntity.scoreValue ?? 0;
  }

  if (action.type === "playSound") {
    playSound(action.sound || effectiveEntity.sound, project);
  }

  if (action.type === "destroySelf") {
    entity.enabled = false;
  }

  if (action.type === "explode") {
    const centerX = effectiveEntity.x + effectiveEntity.width / 2;
    const centerY = effectiveEntity.y + effectiveEntity.height / 2;
    const count = action.count ?? 28;

    emitParticles(particles, "explosion", centerX, centerY, count);
    emitParticles(particles, "smoke", centerX, centerY, Math.max(6, Math.floor(count / 4)));
    playSound(action.sound || "builtin:explode", project);
    entity.enabled = false;
  }

  if (action.type === "damagePlayer") {
    applyPlayerDeath(player, state, project, action.amount ?? 1);
  }

  if (action.type === "resetPlayer") {
    if (!state.gameOver) {
      respawnPlayer(player, state, project);
    }
  }

  if (action.type === "bouncePlayer") {
    player.vy = action.velocity ?? -800;
    player.grounded = false;
  }

  if (action.type === "changePlayerSpeed") {
    player.settings.moveSpeed = action.speed ?? player.settings.moveSpeed;
  }

  if (action.type === "reversePlayerDirection") {
    reversePlayerDirection(player);
  }

  if (action.type === "startSlopeAssist") {
    startSlopeAssist(player, action);
  }

  if (action.type === "endSlopeAssist") {
    endSlopeAssist(player);
  }

  if (action.type === "changeGravity") {
    applyChangeGravity(action, { entity, player, state });
  }

  if (action.type === "completeLevel") {
    state.completed = true;
    state.completedReason = "levelComplete";
    if (state.playSequence && level?.id) {
      state.hasNextLevel = Boolean(getNextLevelId(project, level.id));
      if (!state.hasNextLevel) {
        state.gameComplete = true;
        state.completedReason = "gameComplete";
      }
    }
  }

  if (action.type === "emitParticles" && action.event !== "onAlways" && (action.duration ?? 0) <= 0) {
    emitParticles(
      particles,
      action.preset,
      effectiveEntity.x + effectiveEntity.width / 2 + (action.offsetX ?? 0),
      effectiveEntity.y + effectiveEntity.height / 2 + (action.offsetY ?? 0),
      action.count ?? 12,
    );
  }

  if (action.type === "emitParticles" && (action.event === "onAlways" || (action.duration ?? 0) > 0)) {
    const key = `${entity.id}:${action.event}:${actionIndex}`;
    if (state.activeParticleEmitterKeys.has(key)) return;

    state.activeParticleEmitterKeys.add(key);
    state.particleEmitters.push({
      key,
      preset: action.preset,
      x: effectiveEntity.x + effectiveEntity.width / 2 + (action.offsetX ?? 0),
      y: effectiveEntity.y + effectiveEntity.height / 2 + (action.offsetY ?? 0),
      count: action.count ?? 1,
      rate: action.rate || 8,
      remaining: action.event === "onAlways" ? Infinity : action.duration,
      timer: 0,
    });
  }
}

export function createAction(type = "addScore") {
  const definition = ACTION_TYPES[type];
  const action = { event: type === "movement" || type === "randomBounce" || type === "oneWayPass" ? "onAlways" : "onTouch", type };

  for (const field of definition.fields) {
    action[field.key] = field.defaultValue;
  }

  return action;
}

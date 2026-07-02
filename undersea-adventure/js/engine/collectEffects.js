import { emitParticles } from "./particles.js";

export const COLLECT_EFFECTS = {
  sparklePop: {
    label: "Sparkle Pop",
    description: "A quick burst of tiny golden sparkles.",
  },
  coinGlint: {
    label: "Coin Glint",
    description: "Bright coin-colored sparks with a soft flash.",
  },
  jewelShimmer: {
    label: "Jewel Shimmer",
    description: "Gem-toned sparkles with twinkling stars.",
  },
  starShower: {
    label: "Star Shower",
    description: "Radiating stars that drift upward.",
  },
  goldenFountain: {
    label: "Golden Fountain",
    description: "A rising spray of gold that rains back down.",
  },
  rainbowBurst: {
    label: "Rainbow Burst",
    description: "A colorful burst in every direction.",
  },
  treasureFlash: {
    label: "Treasure Flash",
    description: "A bright flash, shock ring, and treasure sparks.",
  },
  magicSpiral: {
    label: "Magic Spiral",
    description: "A swirling spiral of magical particles.",
  },
  victoryNova: {
    label: "Victory Nova",
    description: "Twin shockwaves with a dense star nova.",
  },
  legendaryCrown: {
    label: "Legendary Crown",
    description: "A grand finale of rings, stars, rainbows, and confetti.",
  },
  megaShockwave: {
    label: "Mega Shockwave",
    description: "Colossal shock rings and a thunderous particle wave.",
  },
  solarSupernova: {
    label: "Solar Supernova",
    description: "A blazing sunburst with radiant beams and stellar debris.",
  },
  galacticCascade: {
    label: "Galactic Cascade",
    description: "Layered spirals, rainbow tides, and a galaxy of stars.",
  },
  cosmicRapture: {
    label: "Cosmic Rapture",
    description: "Heaven-splitting flashes, beam storms, and cascading novas.",
  },
  infinityApotheosis: {
    label: "Infinity Apotheosis",
    description: "The ultimate spectacle — an endless chain of world-shaking bursts.",
  },
};

const COLLECT_EFFECT_ORDER = [
  "sparklePop",
  "coinGlint",
  "jewelShimmer",
  "starShower",
  "goldenFountain",
  "rainbowBurst",
  "treasureFlash",
  "magicSpiral",
  "victoryNova",
  "legendaryCrown",
  "megaShockwave",
  "solarSupernova",
  "galacticCascade",
  "cosmicRapture",
  "infinityApotheosis",
];

export function buildCollectActionTypes() {
  const types = {};

  COLLECT_EFFECT_ORDER.forEach((effectId, index) => {
    const definition = COLLECT_EFFECTS[effectId];
    types[`collect_${effectId}`] = {
      label: `Collect: ${index + 1}. ${definition.label}`,
      fields: [
        {
          key: "sound",
          label: "Sound",
          type: "sound",
          defaultValue: "builtin:coin",
          allowEmpty: true,
          emptyLabel: "No sound",
        },
      ],
    };
  });

  return types;
}

export function getCollectEffectIdFromActionType(actionType) {
  if (!actionType?.startsWith("collect_")) return null;
  return actionType.slice("collect_".length);
}

export const EXPLOSION_EFFECTS = {
  burstFountain: {
    label: "Burst Fountain",
    description: "A rising geyser of fire and debris. About equal to Collect #5 Golden Fountain.",
    matchCollect: 5,
  },
  crownBlast: {
    label: "Crown Blast",
    description: "A massive fireball with shock rings and secondary blasts. About equal to Collect #10 Legendary Crown.",
    matchCollect: 10,
  },
  cosmicDetonation: {
    label: "Cosmic Detonation",
    description: "An apocalyptic chain of blasts, beams, and shockwaves. About equal to Collect #14 Cosmic Rapture.",
    matchCollect: 14,
  },
};

const EXPLOSION_EFFECT_ORDER = ["burstFountain", "crownBlast", "cosmicDetonation"];

export function buildExplosionActionTypes() {
  const types = {};

  EXPLOSION_EFFECT_ORDER.forEach((effectId) => {
    const definition = EXPLOSION_EFFECTS[effectId];
    types[`explode_${effectId}`] = {
      label: `Explosion: ${definition.label}`,
      fields: [
        {
          key: "sound",
          label: "Sound",
          type: "sound",
          defaultValue: "builtin:explode",
          allowEmpty: true,
          emptyLabel: "No sound",
        },
        {
          key: "destroySelf",
          label: "Destroy Object",
          type: "select",
          defaultValue: "yes",
          options: ["yes", "no"],
        },
      ],
    };
  });

  return types;
}

export function getExplosionEffectIdFromActionType(actionType) {
  if (!actionType?.startsWith("explode_")) return null;
  const effectId = actionType.slice("explode_".length);
  return EXPLOSION_EFFECTS[effectId] ? effectId : null;
}

export function playExplosionEffect(system, particles, effectId, x, y) {
  const play = EXPLOSION_PLAYERS[effectId] ?? EXPLOSION_PLAYERS.burstFountain;
  play(system, particles, x, y);
}

export function createCollectEffectSystem() {
  return { effects: [] };
}

export function playCollectEffect(system, particles, effectId, x, y) {
  const play = EFFECT_PLAYERS[effectId] ?? EFFECT_PLAYERS.sparklePop;
  play(system, particles, x, y);
}

export function updateCollectEffects(system, particles, dt) {
  for (const effect of system.effects) {
    effect.elapsed = (effect.elapsed ?? 0) + dt;

    if (effect.type === "ring") {
      effect.radius = effect.maxRadius * easeOut(effect.elapsed / effect.maxLife);
      effect.life = effect.maxLife - effect.elapsed;
    }

    if (effect.type === "flash") {
      const progress = effect.elapsed / effect.maxLife;
      effect.radius = effect.maxRadius * easeOut(progress);
      effect.alpha = (1 - progress) * effect.peakAlpha;
      effect.life = effect.maxLife - effect.elapsed;
    }

    if (effect.type === "star") {
      effect.x += effect.vx * dt;
      effect.y += effect.vy * dt;
      effect.vy += effect.gravity * dt;
      effect.rotation += effect.rotationSpeed * dt;
      effect.life = effect.maxLife - effect.elapsed;
    }

    if (effect.type === "popup") {
      effect.y += effect.vy * dt;
      effect.life = effect.maxLife - effect.elapsed;
    }

    if (effect.type === "spiralEmitter") {
      while (effect.emitted < effect.total && effect.elapsed >= effect.emitted * effect.interval) {
        const angle = effect.startAngle + effect.emitted * effect.angleStep;
        const speed = effect.speed;
        emitStyledParticle(particles, {
          x: effect.x + Math.cos(angle) * effect.spawnRadius,
          y: effect.y + Math.sin(angle) * effect.spawnRadius,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: effect.colors[effect.emitted % effect.colors.length],
          size: Array.isArray(effect.size)
            ? randomBetween(effect.size[0], effect.size[1])
            : effect.size,
          life: effect.particleLife,
          gravity: effect.gravity,
          shape: effect.shape,
        });
        effect.emitted += 1;
      }
      effect.life = effect.maxLife - effect.elapsed;
    }

    if (effect.type === "beam") {
      const progress = easeOut(effect.elapsed / effect.maxLife);
      effect.length = effect.maxLength * progress;
      effect.life = effect.maxLife - effect.elapsed;
    }

    if (effect.type === "delayedBurst") {
      if (effect.elapsed >= effect.delay && !effect.fired) {
        effect.fired = true;
        if ((effect.count ?? 0) > 0) {
          emitParticles(particles, effect.preset, effect.x, effect.y, effect.count);
        }
        if (effect.customBurst) {
          emitCustomBurst(particles, effect.x, effect.y, effect.customBurst.count, effect.customBurst);
        }
        if (effect.stars) spawnStars(system, effect.x, effect.y, effect.stars, effect.starOptions);
        if (effect.rings) {
          for (const ring of effect.rings) {
            spawnRing(system, effect.x, effect.y, ring);
          }
        }
        if (effect.beams) spawnRadialBeams(system, effect.x, effect.y, effect.beams);
        if (effect.flash) {
          spawnFlash(system, effect.x, effect.y, effect.flash);
        }
        if (effect.spiral) spawnSpiralEmitter(system, effect.x, effect.y, effect.spiral);
        if (effect.playLegendary) {
          EFFECT_PLAYERS.legendaryCrown(system, particles, effect.x, effect.y);
        }
      }
      effect.life = effect.maxLife - effect.elapsed;
    }
  }

  system.effects = system.effects.filter((effect) => effect.life > 0);
}

export function drawCollectEffects(ctx, system) {
  for (const effect of system.effects) {
    if (effect.type === "ring") {
      const alpha = Math.max(0, effect.life / effect.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha * effect.peakAlpha;
      ctx.strokeStyle = effect.color;
      ctx.lineWidth = effect.lineWidth;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, Math.max(0, effect.radius), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      continue;
    }

    if (effect.type === "flash") {
      ctx.save();
      ctx.globalAlpha = Math.max(0, effect.alpha ?? 0);
      const gradient = ctx.createRadialGradient(effect.x, effect.y, 0, effect.x, effect.y, effect.radius);
      gradient.addColorStop(0, effect.innerColor);
      gradient.addColorStop(1, effect.outerColor);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, Math.max(0, effect.radius), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      continue;
    }

    if (effect.type === "star") {
      const alpha = Math.max(0, effect.life / effect.maxLife);
      drawStar(ctx, effect.x, effect.y, effect.size, effect.rotation, effect.color, alpha);
      continue;
    }

    if (effect.type === "popup") {
      const alpha = Math.max(0, effect.life / effect.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = effect.color;
      ctx.font = `bold ${effect.fontSize}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(effect.text, effect.x, effect.y);
      ctx.restore();
      continue;
    }

    if (effect.type === "beam") {
      const alpha = Math.max(0, effect.life / effect.maxLife) * effect.peakAlpha;
      const endX = effect.x + Math.cos(effect.angle) * effect.length;
      const endY = effect.y + Math.sin(effect.angle) * effect.length;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = effect.color;
      ctx.lineWidth = effect.lineWidth;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(effect.x, effect.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.restore();
    }
  }
}

const EFFECT_PLAYERS = {
  sparklePop(system, particles, x, y) {
    emitParticles(particles, "sparks", x, y, 10);
    spawnStars(system, x, y, 4, { size: [4, 7], speed: [40, 90], colors: ["#fde68a", "#fbbf24"] });
  },

  coinGlint(system, particles, x, y) {
    emitParticles(particles, "sparks", x, y, 14);
    emitCustomBurst(particles, x, y, 8, {
      colors: ["#fef08a", "#facc15", "#f59e0b"],
      speedX: [-120, 120],
      speedY: [-140, 40],
      size: [3, 6],
      life: [0.25, 0.55],
    });
    spawnFlash(system, x, y, { maxRadius: 36, maxLife: 0.18, peakAlpha: 0.55 });
  },

  jewelShimmer(system, particles, x, y) {
    emitCustomBurst(particles, x, y, 16, {
      colors: ["#67e8f9", "#a78bfa", "#f0abfc", "#e879f9"],
      speedX: [-130, 130],
      speedY: [-150, 60],
      size: [3, 7],
      life: [0.35, 0.75],
    });
    spawnStars(system, x, y, 8, {
      size: [5, 9],
      speed: [50, 110],
      colors: ["#c4b5fd", "#22d3ee", "#f0abfc"],
    });
    spawnRing(system, x, y, { maxRadius: 42, color: "rgba(167, 139, 250, 0.85)", lineWidth: 2.5 });
  },

  starShower(system, particles, x, y) {
    spawnStars(system, x, y, 12, {
      size: [6, 11],
      speed: [70, 150],
      colors: ["#fef9c3", "#fde047", "#ffffff"],
      gravity: -40,
      speedY: [-180, -60],
    });
    emitCustomBurst(particles, x, y, 10, {
      colors: ["#fffbeb", "#fef08a"],
      speedX: [-80, 80],
      speedY: [-160, -40],
      size: [2, 5],
      life: [0.4, 0.8],
      gravity: -20,
    });
  },

  goldenFountain(system, particles, x, y) {
    emitCustomBurst(particles, x, y, 22, {
      colors: ["#fef08a", "#facc15", "#f59e0b", "#fffbeb"],
      speedX: [-70, 70],
      speedY: [-320, -180],
      size: [3, 8],
      life: [0.55, 1.1],
      gravity: 640,
    });
    spawnRing(system, x, y, { maxRadius: 28, maxLife: 0.25, color: "rgba(250, 204, 21, 0.7)", lineWidth: 2 });
  },

  rainbowBurst(system, particles, x, y) {
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#6366f1", "#d946ef"];
    colors.forEach((color, index) => {
      const angle = (Math.PI * 2 * index) / colors.length;
      for (let i = 0; i < 3; i += 1) {
        const speed = 120 + Math.random() * 80;
        emitStyledParticle(particles, {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          size: 4 + Math.random() * 4,
          life: 0.45 + Math.random() * 0.35,
          gravity: 280,
          shape: "square",
        });
      }
    });
    spawnFlash(system, x, y, { maxRadius: 48, maxLife: 0.22, peakAlpha: 0.35 });
  },

  treasureFlash(system, particles, x, y) {
    spawnFlash(system, x, y, { maxRadius: 72, maxLife: 0.28, peakAlpha: 0.75 });
    spawnRing(system, x, y, { maxRadius: 88, maxLife: 0.45, color: "rgba(251, 191, 36, 0.95)", lineWidth: 4 });
    spawnRing(system, x, y, { maxRadius: 56, maxLife: 0.32, color: "rgba(254, 243, 199, 0.85)", lineWidth: 2.5 });
    emitParticles(particles, "explosion", x, y, 18);
    emitCustomBurst(particles, x, y, 14, {
      colors: ["#fef08a", "#fbbf24", "#fffbeb"],
      speedX: [-180, 180],
      speedY: [-200, 80],
      size: [4, 9],
      life: [0.35, 0.8],
    });
    spawnPopup(system, x, y - 12, "✦", { color: "#fde68a", fontSize: 22 });
  },

  magicSpiral(system, particles, x, y) {
    spawnSpiralEmitter(system, x, y, {
      total: 28,
      interval: 0.02,
      maxLife: 0.65,
      speed: 150,
      angleStep: 0.55,
      colors: ["#c084fc", "#22d3ee", "#f472b6", "#a3e635"],
    });
    spawnRing(system, x, y, { maxRadius: 64, maxLife: 0.55, color: "rgba(34, 211, 238, 0.55)", lineWidth: 2 });
  },

  victoryNova(system, particles, x, y) {
    spawnFlash(system, x, y, { maxRadius: 96, maxLife: 0.3, peakAlpha: 0.65 });
    spawnRing(system, x, y, { maxRadius: 110, maxLife: 0.55, color: "rgba(250, 204, 21, 0.9)", lineWidth: 4 });
    spawnRing(system, x, y, { maxRadius: 72, maxLife: 0.4, color: "rgba(255, 255, 255, 0.85)", lineWidth: 2.5 });
    emitParticles(particles, "explosion", x, y, 26);
    spawnStars(system, x, y, 16, {
      size: [7, 13],
      speed: [100, 220],
      colors: ["#ffffff", "#fde047", "#fb923c"],
    });
    spawnDelayedBurst(system, x, y, 0.12, {
      preset: "sparks",
      count: 20,
      maxLife: 0.5,
      stars: 6,
      flash: { maxRadius: 52, maxLife: 0.18, peakAlpha: 0.45 },
    });
  },

  legendaryCrown(system, particles, x, y) {
    spawnFlash(system, x, y, { maxRadius: 120, maxLife: 0.35, peakAlpha: 0.85 });
    spawnRing(system, x, y, { maxRadius: 130, maxLife: 0.65, color: "rgba(250, 204, 21, 0.95)", lineWidth: 5 });
    spawnRing(system, x, y, { maxRadius: 92, maxLife: 0.5, color: "rgba(255, 255, 255, 0.9)", lineWidth: 3 });
    spawnRing(system, x, y, { maxRadius: 54, maxLife: 0.35, color: "rgba(244, 114, 182, 0.85)", lineWidth: 2.5 });

    const crownColors = ["#fde047", "#f472b6", "#38bdf8", "#a3e635", "#fb923c"];
    for (let i = 0; i < crownColors.length; i += 1) {
      const angle = -Math.PI / 2 + ((i - 2) * Math.PI) / 8;
      spawnStars(system, x + Math.cos(angle) * 18, y + Math.sin(angle) * 18 - 8, 2, {
        size: [8, 14],
        speed: [40, 80],
        colors: [crownColors[i]],
        gravity: -30,
        speedY: [-120, -50],
      });
    }

    EFFECT_PLAYERS.rainbowBurst(system, particles, x, y);
    EFFECT_PLAYERS.magicSpiral(system, particles, x, y);

    emitParticles(particles, "explosion", x, y, 34);
    emitCustomBurst(particles, x, y, 24, {
      colors: ["#fef08a", "#f472b6", "#38bdf8", "#ffffff", "#a3e635"],
      speedX: [-220, 220],
      speedY: [-280, 120],
      size: [4, 10],
      life: [0.5, 1],
      gravity: 420,
    });
    spawnPopup(system, x, y - 18, "★", { color: "#fde047", fontSize: 30 });
    spawnDelayedBurst(system, x, y, 0.18, {
      preset: "sparks",
      count: 24,
      maxLife: 0.55,
      rings: [{ maxRadius: 76, maxLife: 0.4, color: "rgba(56, 189, 248, 0.85)", lineWidth: 3 }],
      stars: 10,
    });
  },

  megaShockwave(system, particles, x, y) {
    EFFECT_PLAYERS.legendaryCrown(system, particles, x, y);

    spawnFlash(system, x, y, { maxRadius: 220, maxLife: 0.45, peakAlpha: 0.9 });
    spawnRingWave(system, x, y, 5, {
      maxRadius: 240,
      radiusStep: 36,
      maxLife: 0.85,
      lifeStep: 0.1,
      color: "rgba(251, 191, 36, 0.85)",
      lineWidth: 6,
    });

    emitParticles(particles, "explosion", x, y, 52);
    emitCustomBurst(particles, x, y, 48, {
      colors: ["#fef08a", "#fb923c", "#ffffff", "#f472b6"],
      speedX: [-340, 340],
      speedY: [-380, 160],
      size: [5, 14],
      life: [0.6, 1.3],
      gravity: 360,
    });
    spawnStars(system, x, y, 32, {
      size: [10, 18],
      speed: [140, 320],
      colors: ["#ffffff", "#fde047", "#fb923c", "#38bdf8"],
    });

    spawnDelayedBurst(system, x, y, 0.22, {
      count: 36,
      preset: "explosion",
      maxLife: 0.7,
      flash: { maxRadius: 160, maxLife: 0.32, peakAlpha: 0.7 },
      rings: [
        { maxRadius: 200, maxLife: 0.55, color: "rgba(255, 255, 255, 0.8)", lineWidth: 5 },
        { maxRadius: 280, maxLife: 0.75, color: "rgba(250, 204, 21, 0.65)", lineWidth: 4 },
      ],
      stars: 18,
    });
    spawnPopup(system, x, y - 28, "◆", { color: "#fde047", fontSize: 38 });
  },

  solarSupernova(system, particles, x, y) {
    spawnFlash(system, x, y, {
      maxRadius: 320,
      maxLife: 0.55,
      peakAlpha: 0.95,
      innerColor: "rgba(255, 251, 235, 1)",
      outerColor: "rgba(251, 146, 60, 0)",
    });
    spawnRadialBeams(system, x, y, {
      count: 16,
      maxLength: 280,
      maxLife: 0.65,
      lineWidth: 7,
      color: "rgba(253, 224, 71, 0.85)",
    });
    spawnRingWave(system, x, y, 6, {
      maxRadius: 300,
      radiusStep: 42,
      maxLife: 1,
      lifeStep: 0.12,
      color: "rgba(251, 146, 60, 0.75)",
      lineWidth: 5,
    });

    spawnSpiralEmitter(system, x, y, {
      total: 48,
      interval: 0.015,
      maxLife: 0.9,
      speed: 240,
      angleStep: 0.42,
      colors: ["#fde047", "#fb923c", "#ffffff", "#f97316"],
    });
    spawnSpiralEmitter(system, x, y, {
      total: 48,
      interval: 0.015,
      maxLife: 0.9,
      speed: 220,
      angleStep: -0.42,
      startAngle: Math.PI,
      colors: ["#fef08a", "#ffffff", "#fb923c"],
    });

    emitParticles(particles, "explosion", x, y, 64);
    emitCustomBurst(particles, x, y, 72, {
      colors: ["#fffbeb", "#fde047", "#fb923c", "#ef4444"],
      speedX: [-420, 420],
      speedY: [-460, 200],
      size: [6, 16],
      life: [0.7, 1.5],
      gravity: 280,
    });
    spawnStars(system, x, y, 44, {
      size: [12, 20],
      speed: [160, 360],
      colors: ["#ffffff", "#fde047", "#fb923c"],
    });

    spawnDelayedBurst(system, x, y, 0.35, {
      count: 44,
      preset: "explosion",
      maxLife: 0.85,
      beams: { count: 12, maxLength: 220, maxLife: 0.5, lineWidth: 5, color: "rgba(255, 255, 255, 0.75)" },
      stars: 28,
      starOptions: { size: [12, 20], speed: [160, 360], colors: ["#ffffff", "#fde047"] },
    });
    spawnPopup(system, x, y - 36, "☀", { color: "#fb923c", fontSize: 48 });
  },

  galacticCascade(system, particles, x, y) {
    spawnFlash(system, x, y, { maxRadius: 400, maxLife: 0.6, peakAlpha: 0.85 });
    spawnRingWave(system, x, y, 8, {
      maxRadius: 380,
      radiusStep: 48,
      maxLife: 1.15,
      lifeStep: 0.14,
      color: "rgba(167, 139, 250, 0.7)",
      lineWidth: 6,
    });

    const offsets = [
      { dx: -56, dy: -28 },
      { dx: 56, dy: -28 },
      { dx: 0, dy: 44 },
    ];
    for (const { dx, dy } of offsets) {
      EFFECT_PLAYERS.rainbowBurst(system, particles, x + dx, y + dy);
      spawnSpiralEmitter(system, x + dx, y + dy, {
        total: 36,
        interval: 0.018,
        maxLife: 0.85,
        speed: 200,
        angleStep: 0.5,
        colors: ["#6366f1", "#d946ef", "#22d3ee", "#a3e635"],
      });
    }

    emitParticles(particles, "explosion", x, y, 80);
    emitCustomBurst(particles, x, y, 96, {
      colors: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#6366f1", "#d946ef"],
      speedX: [-480, 480],
      speedY: [-520, 240],
      size: [6, 18],
      life: [0.8, 1.7],
      gravity: 240,
    });
    spawnStars(system, x, y, 56, {
      size: [12, 22],
      speed: [180, 400],
      colors: ["#c4b5fd", "#22d3ee", "#f0abfc", "#fde047", "#ffffff"],
    });

    spawnDelayedBurst(system, x, y, 0.45, {
      count: 60,
      preset: "explosion",
      maxLife: 1,
      flash: { maxRadius: 280, maxLife: 0.4, peakAlpha: 0.75 },
      rings: [
        { maxRadius: 340, maxLife: 0.7, color: "rgba(34, 211, 238, 0.75)", lineWidth: 6 },
        { maxRadius: 420, maxLife: 0.95, color: "rgba(217, 70, 239, 0.55)", lineWidth: 4 },
      ],
      stars: 36,
    });
    spawnPopup(system, x, y - 44, "✧", { color: "#c4b5fd", fontSize: 54 });
  },

  cosmicRapture(system, particles, x, y) {
    spawnFlash(system, x, y, {
      maxRadius: 520,
      maxLife: 0.75,
      peakAlpha: 1,
      innerColor: "rgba(255, 255, 255, 1)",
      outerColor: "rgba(139, 92, 246, 0)",
    });
    spawnRadialBeams(system, x, y, {
      count: 24,
      maxLength: 420,
      maxLife: 0.85,
      lineWidth: 9,
      color: "rgba(196, 181, 253, 0.9)",
    });
    spawnRingWave(system, x, y, 10, {
      maxRadius: 460,
      radiusStep: 52,
      maxLife: 1.35,
      lifeStep: 0.15,
      color: "rgba(255, 255, 255, 0.65)",
      lineWidth: 7,
    });

    for (let wave = 0; wave < 4; wave += 1) {
      spawnDelayedBurst(system, x, y, 0.2 + wave * 0.18, {
        count: 40,
        preset: "explosion",
        maxLife: 0.9,
        beams: { count: 8, maxLength: 300, maxLife: 0.55, lineWidth: 6, color: "rgba(253, 224, 71, 0.8)" },
        rings: [{ maxRadius: 360 + wave * 60, maxLife: 0.65, color: "rgba(56, 189, 248, 0.7)", lineWidth: 5 }],
        stars: 24,
        starOptions: { size: [14, 24], speed: [200, 440] },
        customBurst: {
          count: 40,
          colors: ["#ffffff", "#fde047", "#38bdf8", "#f472b6"],
          speedX: [-520, 520],
          speedY: [-560, 260],
          size: [8, 20],
          life: [0.9, 1.8],
          gravity: 200,
        },
      });
    }

    emitParticles(particles, "explosion", x, y, 90);
    emitCustomBurst(particles, x, y, 120, {
      colors: ["#ffffff", "#fde047", "#38bdf8", "#f472b6", "#a3e635"],
      speedX: [-560, 560],
      speedY: [-600, 300],
      size: [8, 22],
      life: [1, 2],
      gravity: 180,
    });
    spawnPopup(system, x, y - 52, "✦", { color: "#ffffff", fontSize: 64, maxLife: 1.1 });
    spawnPopup(system, x, y - 88, "Rapture!", { color: "#c4b5fd", fontSize: 28, maxLife: 1.2, vy: -60 });
  },

  infinityApotheosis(system, particles, x, y) {
    spawnFlash(system, x, y, {
      maxRadius: 680,
      maxLife: 0.95,
      peakAlpha: 1,
      innerColor: "rgba(255, 255, 255, 1)",
      outerColor: "rgba(250, 204, 21, 0)",
    });
    spawnRadialBeams(system, x, y, {
      count: 32,
      maxLength: 560,
      maxLife: 1.1,
      lineWidth: 11,
      color: "rgba(255, 255, 255, 0.95)",
    });
    spawnRingWave(system, x, y, 12, {
      maxRadius: 580,
      radiusStep: 58,
      maxLife: 1.6,
      lifeStep: 0.16,
      color: "rgba(250, 204, 21, 0.8)",
      lineWidth: 8,
    });

    for (let i = 0; i < 6; i += 1) {
      const angle = (Math.PI * 2 * i) / 6;
      const offsetX = x + Math.cos(angle) * 72;
      const offsetY = y + Math.sin(angle) * 72;
      spawnDelayedBurst(system, offsetX, offsetY, 0.15 + i * 0.12, {
        playLegendary: true,
        count: 0,
        maxLife: 0.5,
      });
    }

    for (let wave = 0; wave < 5; wave += 1) {
      spawnDelayedBurst(system, x, y, 0.25 + wave * 0.2, {
        count: 55,
        preset: "explosion",
        maxLife: 1.1,
        flash: { maxRadius: 360 + wave * 80, maxLife: 0.5, peakAlpha: 0.85 },
        beams: { count: 12, maxLength: 380 + wave * 40, maxLife: 0.65, lineWidth: 7, color: "rgba(255, 255, 255, 0.85)" },
        rings: [
          { maxRadius: 480 + wave * 70, maxLife: 0.85, color: "rgba(250, 204, 21, 0.8)", lineWidth: 7 },
          { maxRadius: 620 + wave * 70, maxLife: 1.1, color: "rgba(244, 114, 182, 0.55)", lineWidth: 5 },
        ],
        spiral: {
          total: 40,
          interval: 0.012,
          maxLife: 0.8,
          speed: 280,
          angleStep: wave % 2 === 0 ? 0.38 : -0.38,
          colors: ["#fde047", "#f472b6", "#38bdf8", "#ffffff", "#a3e635"],
        },
        stars: 40,
        starOptions: { size: [16, 28], speed: [220, 480], colors: ["#ffffff", "#fde047", "#f472b6", "#38bdf8"] },
        customBurst: {
          count: 60,
          colors: ["#ffffff", "#fde047", "#f472b6", "#38bdf8", "#a3e635", "#fb923c"],
          speedX: [-640, 640],
          speedY: [-680, 340],
          size: [10, 26],
          life: [1.1, 2.2],
          gravity: 160,
        },
      });
    }

    emitParticles(particles, "explosion", x, y, 100);
    emitCustomBurst(particles, x, y, 160, {
      colors: ["#ffffff", "#fde047", "#f472b6", "#38bdf8", "#a3e635", "#fb923c", "#c084fc"],
      speedX: [-700, 700],
      speedY: [-720, 360],
      size: [10, 28],
      life: [1.2, 2.4],
      gravity: 140,
    });
    spawnStars(system, x, y, 80, {
      size: [16, 30],
      speed: [240, 520],
      colors: ["#ffffff", "#fde047", "#f472b6", "#38bdf8", "#a3e635"],
    });

    spawnPopup(system, x, y - 64, "♛", { color: "#fde047", fontSize: 72, maxLife: 1.4 });
    spawnPopup(system, x, y - 110, "APOTHEOSIS", { color: "#ffffff", fontSize: 34, maxLife: 1.5, vy: -70 });
  },
};

const EXPLOSION_PLAYERS = {
  burstFountain(system, particles, x, y) {
    emitCustomBurst(particles, x, y, 22, {
      colors: ["#fb923c", "#ef4444", "#f97316", "#78716c", "#fef08a"],
      speedX: [-70, 70],
      speedY: [-320, -180],
      size: [3, 8],
      life: [0.55, 1.1],
      gravity: 640,
    });
    emitParticles(particles, "explosion", x, y, 14);
    emitParticles(particles, "smoke", x, y, 12);
    spawnRing(system, x, y, {
      maxRadius: 28,
      maxLife: 0.25,
      color: "rgba(249, 115, 22, 0.75)",
      lineWidth: 2,
    });
  },

  crownBlast(system, particles, x, y) {
    spawnFlash(system, x, y, {
      maxRadius: 120,
      maxLife: 0.35,
      peakAlpha: 0.85,
      innerColor: "rgba(255, 251, 235, 1)",
      outerColor: "rgba(239, 68, 68, 0)",
    });
    spawnRing(system, x, y, { maxRadius: 130, maxLife: 0.65, color: "rgba(249, 115, 22, 0.95)", lineWidth: 5 });
    spawnRing(system, x, y, { maxRadius: 92, maxLife: 0.5, color: "rgba(254, 243, 199, 0.75)", lineWidth: 3 });
    spawnRing(system, x, y, { maxRadius: 54, maxLife: 0.35, color: "rgba(120, 113, 108, 0.85)", lineWidth: 2.5 });

    emitParticles(particles, "explosion", x, y, 34);
    emitParticles(particles, "smoke", x, y, 20);
    emitCustomBurst(particles, x, y, 24, {
      colors: ["#fb923c", "#ef4444", "#78716c", "#fef08a", "#f97316"],
      speedX: [-220, 220],
      speedY: [-280, 120],
      size: [4, 10],
      life: [0.5, 1],
      gravity: 420,
    });
    spawnStars(system, x, y, 10, {
      size: [6, 12],
      speed: [80, 180],
      colors: ["#fb923c", "#ef4444", "#78716c"],
      gravity: 280,
    });

    spawnDelayedBurst(system, x, y, 0.18, {
      preset: "explosion",
      count: 24,
      maxLife: 0.55,
      rings: [{ maxRadius: 76, maxLife: 0.4, color: "rgba(239, 68, 68, 0.85)", lineWidth: 3 }],
      stars: 0,
    });
    emitParticles(particles, "smoke", x, y, 16);
  },

  cosmicDetonation(system, particles, x, y) {
    spawnFlash(system, x, y, {
      maxRadius: 520,
      maxLife: 0.75,
      peakAlpha: 1,
      innerColor: "rgba(255, 251, 235, 1)",
      outerColor: "rgba(239, 68, 68, 0)",
    });
    spawnRadialBeams(system, x, y, {
      count: 24,
      maxLength: 420,
      maxLife: 0.85,
      lineWidth: 9,
      color: "rgba(251, 146, 60, 0.9)",
    });
    spawnRingWave(system, x, y, 10, {
      maxRadius: 460,
      radiusStep: 52,
      maxLife: 1.35,
      lifeStep: 0.15,
      color: "rgba(239, 68, 68, 0.65)",
      lineWidth: 7,
    });

    for (let wave = 0; wave < 4; wave += 1) {
      spawnDelayedBurst(system, x, y, 0.2 + wave * 0.18, {
        count: 40,
        preset: "explosion",
        maxLife: 0.9,
        beams: { count: 8, maxLength: 300, maxLife: 0.55, lineWidth: 6, color: "rgba(254, 243, 199, 0.8)" },
        rings: [{ maxRadius: 360 + wave * 60, maxLife: 0.65, color: "rgba(249, 115, 22, 0.75)", lineWidth: 5 }],
        stars: 16,
        starOptions: {
          size: [10, 18],
          speed: [160, 360],
          colors: ["#fb923c", "#ef4444", "#78716c"],
          gravity: 240,
        },
        customBurst: {
          count: 40,
          colors: ["#fb923c", "#ef4444", "#78716c", "#fef08a"],
          speedX: [-520, 520],
          speedY: [-560, 260],
          size: [8, 20],
          life: [0.9, 1.8],
          gravity: 220,
        },
      });
    }

    emitParticles(particles, "explosion", x, y, 90);
    emitParticles(particles, "smoke", x, y, 48);
    emitCustomBurst(particles, x, y, 120, {
      colors: ["#fb923c", "#ef4444", "#f97316", "#78716c", "#fef08a"],
      speedX: [-560, 560],
      speedY: [-600, 300],
      size: [8, 22],
      life: [1, 2],
      gravity: 200,
    });
  },
};

function spawnRing(system, x, y, options = {}) {
  system.effects.push({
    type: "ring",
    x,
    y,
    radius: 0,
    maxRadius: options.maxRadius ?? 64,
    maxLife: options.maxLife ?? 0.4,
    life: options.maxLife ?? 0.4,
    elapsed: 0,
    color: options.color ?? "rgba(250, 204, 21, 0.85)",
    lineWidth: options.lineWidth ?? 3,
    peakAlpha: options.peakAlpha ?? 1,
  });
}

function spawnFlash(system, x, y, options = {}) {
  system.effects.push({
    type: "flash",
    x,
    y,
    radius: 0,
    maxRadius: options.maxRadius ?? 56,
    maxLife: options.maxLife ?? 0.22,
    life: options.maxLife ?? 0.22,
    elapsed: 0,
    peakAlpha: options.peakAlpha ?? 0.6,
    alpha: options.peakAlpha ?? 0.6,
    innerColor: options.innerColor ?? "rgba(255, 255, 255, 0.95)",
    outerColor: options.outerColor ?? "rgba(255, 255, 255, 0)",
  });
}

function spawnPopup(system, x, y, text, options = {}) {
  system.effects.push({
    type: "popup",
    x,
    y,
    text,
    vy: options.vy ?? -90,
    maxLife: options.maxLife ?? 0.7,
    life: options.maxLife ?? 0.7,
    elapsed: 0,
    color: options.color ?? "#fde68a",
    fontSize: options.fontSize ?? 20,
  });
}

function spawnStars(system, x, y, count, options = {}) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = randomBetween(options.speed?.[0] ?? 60, options.speed?.[1] ?? 140);
    const color = options.colors?.[i % (options.colors?.length ?? 1)] ?? "#fde047";

    system.effects.push({
      type: "star",
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: randomBetween(options.speedY?.[0] ?? -140, options.speedY?.[1] ?? 40),
      gravity: options.gravity ?? 180,
      size: randomBetween(options.size?.[0] ?? 5, options.size?.[1] ?? 10),
      rotation: Math.random() * Math.PI,
      rotationSpeed: randomBetween(-6, 6),
      color,
      maxLife: randomBetween(0.35, 0.85),
      life: randomBetween(0.35, 0.85),
      elapsed: 0,
    });
  }
}

function spawnDelayedBurst(system, x, y, delay, options = {}) {
  system.effects.push({
    type: "delayedBurst",
    x,
    y,
    delay,
    fired: false,
    preset: options.preset ?? "sparks",
    count: options.count ?? 12,
    customBurst: options.customBurst ?? null,
    stars: options.stars ?? 0,
    starOptions: options.starOptions ?? {},
    rings: options.rings ?? null,
    beams: options.beams ?? null,
    flash: options.flash ?? null,
    spiral: options.spiral ?? null,
    playLegendary: options.playLegendary ?? false,
    maxLife: options.maxLife ?? delay + 0.1,
    life: options.maxLife ?? delay + 0.1,
    elapsed: 0,
  });
}

function spawnRingWave(system, x, y, count, options = {}) {
  for (let i = 0; i < count; i += 1) {
    spawnRing(system, x, y, {
      maxRadius: (options.maxRadius ?? 200) + i * (options.radiusStep ?? 40),
      maxLife: (options.maxLife ?? 0.6) + i * (options.lifeStep ?? 0.08),
      color: options.color,
      lineWidth: Math.max(2, (options.lineWidth ?? 4) - i * 0.3),
      peakAlpha: options.peakAlpha ?? 1 - i * 0.06,
    });
  }
}

function spawnRadialBeams(system, x, y, options = {}) {
  const count = options.count ?? 12;
  for (let i = 0; i < count; i += 1) {
    system.effects.push({
      type: "beam",
      x,
      y,
      angle: (Math.PI * 2 * i) / count + (options.angleOffset ?? 0),
      length: 0,
      maxLength: options.maxLength ?? 180,
      maxLife: options.maxLife ?? 0.5,
      life: options.maxLife ?? 0.5,
      elapsed: 0,
      lineWidth: options.lineWidth ?? 4,
      color: options.color ?? "rgba(253, 224, 71, 0.85)",
      peakAlpha: options.peakAlpha ?? 1,
    });
  }
}

function spawnSpiralEmitter(system, x, y, options = {}) {
  system.effects.push({
    type: "spiralEmitter",
    x,
    y,
    elapsed: 0,
    maxLife: options.maxLife ?? 0.65,
    life: options.maxLife ?? 0.65,
    total: options.total ?? 28,
    emitted: 0,
    interval: options.interval ?? 0.02,
    startAngle: options.startAngle ?? 0,
    angleStep: options.angleStep ?? 0.55,
    speed: options.speed ?? 150,
    spawnRadius: options.spawnRadius ?? 4,
    size: options.size ?? [4, 7],
    particleLife: options.particleLife ?? 0.55,
    gravity: options.gravity ?? 120,
    shape: options.shape ?? "circle",
    colors: options.colors ?? ["#c084fc", "#22d3ee", "#f472b6", "#a3e635"],
  });
}

function emitCustomBurst(particles, x, y, count, preset) {
  for (let i = 0; i < count; i += 1) {
    emitStyledParticle(particles, {
      x,
      y,
      vx: randomBetween(preset.speedX[0], preset.speedX[1]),
      vy: randomBetween(preset.speedY[0], preset.speedY[1]),
      color: preset.colors[Math.floor(Math.random() * preset.colors.length)],
      size: randomBetween(preset.size[0], preset.size[1]),
      life: randomBetween(preset.life[0], preset.life[1]),
      gravity: preset.gravity ?? 320,
      shape: preset.shape ?? "square",
    });
  }
}

function emitStyledParticle(particles, options) {
  particles.particles.push({
    x: options.x,
    y: options.y,
    vx: options.vx,
    vy: options.vy,
    gravity: options.gravity ?? 320,
    life: options.life,
    maxLife: options.life,
    size: options.size,
    color: options.color,
    stroke: options.stroke,
    fade: options.fade ?? true,
    shape: options.shape ?? "square",
  });
}

function drawStar(ctx, x, y, size, rotation, color, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();

  for (let i = 0; i < 4; i += 1) {
    const angle = (Math.PI / 2) * i;
    const outerX = Math.cos(angle) * size;
    const outerY = Math.sin(angle) * size;
    const innerX = Math.cos(angle + Math.PI / 4) * size * 0.35;
    const innerY = Math.sin(angle + Math.PI / 4) * size * 0.35;

    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);
    ctx.lineTo(innerX, innerY);
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function easeOut(value) {
  const t = Math.max(0, Math.min(1, value));
  return 1 - (1 - t) * (1 - t);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

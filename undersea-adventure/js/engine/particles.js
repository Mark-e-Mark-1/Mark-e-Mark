export const PARTICLE_PRESETS = {
  none: {
    label: "None",
  },
  bubbles: {
    label: "Bubbles",
    color: "rgba(186, 230, 253, 0.85)",
    stroke: "rgba(240, 249, 255, 0.9)",
    life: [1.2, 2.2],
    size: [4, 12],
    speedX: [-18, 18],
    speedY: [-90, -35],
    gravity: -18,
    fade: true,
    shape: "circle",
  },
  sparks: {
    label: "Sparks",
    color: "rgba(251, 191, 36, 0.95)",
    life: [0.25, 0.65],
    size: [2, 5],
    speedX: [-160, 160],
    speedY: [-180, 80],
    gravity: 520,
    fade: true,
    shape: "square",
  },
  smoke: {
    label: "Smoke",
    color: "rgba(148, 163, 184, 0.45)",
    life: [0.8, 1.8],
    size: [8, 22],
    speedX: [-35, 35],
    speedY: [-70, -20],
    gravity: -8,
    fade: true,
    shape: "circle",
  },
  explosion: {
    label: "Explosion",
    colors: [
      "rgba(251, 146, 60, 0.95)",
      "rgba(239, 68, 68, 0.95)",
      "rgba(250, 204, 21, 0.95)",
      "rgba(254, 243, 199, 0.9)",
    ],
    life: [0.35, 0.95],
    size: [3, 11],
    speedX: [-260, 260],
    speedY: [-260, 140],
    gravity: 420,
    fade: true,
    shape: "square",
  },
};

export function createParticleSystem() {
  return {
    particles: [],
  };
}

export function emitParticles(system, presetName, x, y, count = 8) {
  const preset = PARTICLE_PRESETS[presetName];
  if (!preset || presetName === "none") return;

  for (let i = 0; i < count; i += 1) {
    const life = randomBetween(preset.life[0], preset.life[1]);
    const size = randomBetween(preset.size[0], preset.size[1]);

    system.particles.push({
      x,
      y,
      vx: randomBetween(preset.speedX[0], preset.speedX[1]),
      vy: randomBetween(preset.speedY[0], preset.speedY[1]),
      gravity: preset.gravity,
      life,
      maxLife: life,
      size,
      color: pickParticleColor(preset),
      stroke: preset.stroke,
      fade: preset.fade,
      shape: preset.shape,
    });
  }
}

export function updateParticles(system, dt) {
  for (const particle of system.particles) {
    particle.vy += particle.gravity * dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.life -= dt;
  }

  system.particles = system.particles.filter((particle) => particle.life > 0);
}

export function drawParticles(ctx, system) {
  for (const particle of system.particles) {
    const alpha = particle.fade ? Math.max(0, particle.life / particle.maxLife) : 1;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;

    if (particle.shape === "square") {
      ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
    } else {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
      ctx.fill();

      if (particle.stroke) {
        ctx.strokeStyle = particle.stroke;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    ctx.restore();
  }
}

function pickParticleColor(preset) {
  if (preset.colors?.length) {
    return preset.colors[Math.floor(Math.random() * preset.colors.length)];
  }

  return preset.color;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

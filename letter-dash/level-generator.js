const LevelGenerator = (() => {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const SPIKE_LETTERS = ["V", "X", "K", "Z", "A"];
  const SCROLL_PX_PER_SEC = GAME.SCROLL_SPEED * 60;
  const SNAP = 20;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(arr) {
    return arr[randInt(0, arr.length - 1)];
  }

  function snap(v) {
    return Math.round(v / SNAP) * SNAP;
  }

  function randomLetter() {
    return LETTERS[randInt(0, LETTERS.length - 1)];
  }

  function weightedPick(weights) {
    const entries = Object.entries(weights).filter(([, w]) => w > 0);
    const total = entries.reduce((sum, [, w]) => sum + w, 0);
    if (!total) return "skip";
    let roll = Math.random() * total;
    for (const [key, weight] of entries) {
      roll -= weight;
      if (roll <= 0) return key;
    }
    return entries[entries.length - 1][0];
  }

  function randomAirYOff(height, aboveGroundMin, aboveGroundMax) {
    const ceiling = platformMinYOff(height);
    const yOff = -randInt(aboveGroundMin, aboveGroundMax);
    return snap(Math.max(ceiling, yOff));
  }

  function generate(seconds, difficulty = "medium") {
    const duration = Math.max(15, Math.min(180, Number(seconds) || 45));
    const targetEnd = 400 + duration * SCROLL_PX_PER_SEC;

    const presets = {
      easy: {
        weights: {
          spike: 10,
          ceilingSpike: 6,
          block: 18,
          platform: 18,
          oneWayPlatform: 6,
          movingPlatform: 6,
          speedPad: 5,
          gap: 8,
          bonus: 10,
          bomb: 4,
          superbonus: 2,
          skip: 18,
        },
        spacing: [160, 240],
        bpm: [118, 138],
      },
      medium: {
        weights: {
          spike: 16,
          ceilingSpike: 10,
          block: 16,
          platform: 12,
          oneWayPlatform: 8,
          movingPlatform: 8,
          speedPad: 6,
          gap: 12,
          bonus: 12,
          bomb: 8,
          superbonus: 3,
          skip: 15,
        },
        spacing: [120, 200],
        bpm: [132, 152],
      },
      hard: {
        weights: {
          spike: 22,
          ceilingSpike: 14,
          block: 12,
          platform: 8,
          oneWayPlatform: 10,
          movingPlatform: 10,
          speedPad: 8,
          gap: 16,
          bonus: 12,
          bomb: 12,
          superbonus: 4,
          skip: 10,
        },
        spacing: [90, 160],
        bpm: [148, 168],
      },
    };
    const config = presets[difficulty] || presets.medium;

    const obstacles = [];
    let x = 400;
    let gapCooldown = 0;
    let spikeChainCooldown = 0;
    let bombCooldown = 0;
    let superBonusCooldown = 0;
    let superBonusCount = 0;
    const maxSuperBonus = Math.max(1, Math.floor(duration / 25));

    while (x < targetEnd - 280) {
      if (gapCooldown > 0) gapCooldown--;
      if (spikeChainCooldown > 0) spikeChainCooldown--;
      if (bombCooldown > 0) bombCooldown--;
      if (superBonusCooldown > 0) superBonusCooldown--;

      x += snap(randInt(config.spacing[0], config.spacing[1]));
      if (x >= targetEnd - 280) break;

      const weights = { ...config.weights };
      if (gapCooldown > 0) weights.gap = 0;
      if (spikeChainCooldown > 0) weights.spike = Math.floor(weights.spike * 0.4);
      if (bombCooldown > 0) weights.bomb = 0;
      if (superBonusCooldown > 0 || superBonusCount >= maxSuperBonus) weights.superbonus = 0;

      const choice = weightedPick(weights);

      if (choice === "skip") continue;

      if (choice === "spike") {
        const chain = Math.random() < (difficulty === "hard" ? 0.45 : 0.28) ? randInt(2, 4) : 1;
        for (let i = 0; i < chain; i++) {
          obstacles.push({
            x: snap(x + i * randInt(60, 80)),
            type: "spike",
            letter: pick(SPIKE_LETTERS),
            h: randInt(35, difficulty === "easy" ? 45 : 55),
          });
        }
        x += (chain - 1) * 70;
        spikeChainCooldown = chain > 1 ? 2 : 0;
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }

      if (choice === "ceilingSpike") {
        const chain = Math.random() < (difficulty === "hard" ? 0.35 : 0.2) ? randInt(2, 3) : 1;
        for (let i = 0; i < chain; i++) {
          obstacles.push({
            x: snap(x + i * randInt(60, 80)),
            type: "ceilingSpike",
            letter: pick(SPIKE_LETTERS),
            h: randInt(30, difficulty === "easy" ? 50 : 65),
            yOff: randInt(0, difficulty === "hard" ? 80 : 40),
          });
        }
        x += (chain - 1) * 70;
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }

      if (choice === "block") {
        obstacles.push({
          x: snap(x),
          type: "block",
          letter: randomLetter(),
          h: randInt(45, difficulty === "hard" ? 90 : 70),
          w: randInt(40, 60),
        });
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }

      if (choice === "platform") {
        obstacles.push({
          x: snap(x),
          type: "platform",
          letter: randomLetter(),
          h: 20,
          w: randInt(100, 180),
          yOff: -randInt(70, difficulty === "hard" ? 160 : 130),
        });
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }

      if (choice === "oneWayPlatform") {
        obstacles.push({
          x: snap(x),
          type: "oneWayPlatform",
          letter: randomLetter(),
          h: 20,
          w: randInt(90, 160),
          yOff: -randInt(60, difficulty === "hard" ? 180 : 140),
        });
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }

      if (choice === "movingPlatform") {
        obstacles.push({
          x: snap(x),
          type: "movingPlatform",
          letter: randomLetter(),
          h: 20,
          w: randInt(100, 160),
          yOff: -randInt(80, difficulty === "hard" ? 200 : 150),
          moveRange: randInt(40, difficulty === "hard" ? 100 : 70),
          moveSpeed: difficulty === "easy" ? 0.8 : difficulty === "hard" ? 1.4 : 1,
          moveAxis: "y",
          phase: Math.random() * Math.PI * 2,
        });
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }

      if (choice === "speedPad") {
        const boost = Math.random() < 0.72;
        obstacles.push({
          x: snap(x),
          type: "speedPad",
          letter: "»",
          h: 24,
          w: randInt(60, 90),
          yOff: Math.random() < 0.55 ? 0 : -randInt(20, 60),
          speedMult: boost ? (difficulty === "hard" ? 1.6 : 1.5) : 0.55,
          padDuration: randInt(60, 120),
        });
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }

      if (choice === "gap") {
        obstacles.push({
          x: snap(x),
          type: "gap",
          letter: "—",
          w: randInt(70, difficulty === "hard" ? 140 : 110),
        });
        gapCooldown = randInt(3, 5);
        x += randInt(40, 80);
        continue;
      }

      if (choice === "bonus") {
        obstacles.push({
          x: snap(x),
          type: "bonus",
          letter: "☺",
          h: 44,
          w: 44,
          yOff: randomAirYOff(44, 50, difficulty === "hard" ? 240 : 200),
        });
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }

      if (choice === "bomb") {
        obstacles.push({
          x: snap(x),
          type: "bomb",
          letter: "!",
          h: 40,
          w: 40,
          yOff: randomAirYOff(40, 35, difficulty === "hard" ? 160 : 130),
        });
        bombCooldown = randInt(3, 6);
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }

      if (choice === "superbonus") {
        obstacles.push({
          x: snap(x),
          type: "superbonus",
          letter: "★",
          h: 52,
          w: 52,
          yOff: randomAirYOff(52, 90, difficulty === "hard" ? 320 : 280),
        });
        superBonusCount++;
        superBonusCooldown = randInt(8, 14);
        gapCooldown = Math.max(gapCooldown, 1);
        continue;
      }
    }

    obstacles.push({ x: snap(targetEnd), type: "finish", letter: "★", w: 60 });
    obstacles.sort((a, b) => a.x - b.x);

    const bpm = randInt(config.bpm[0], config.bpm[1]);
    const name = `Random ${duration}s`;

    return { name, bpm, obstacles };
  }

  return { generate };
})();

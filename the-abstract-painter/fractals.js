const FractalEngine = (() => {
  function createRng(seed) {
    let s = seed >>> 0;
    return {
      next() {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      },
      range(min, max) {
        return min + this.next() * (max - min);
      },
      int(min, max) {
        return Math.floor(this.range(min, max + 1));
      },
      pick(arr) {
        return arr[this.int(0, arr.length - 1)];
      },
      chance(p) {
        return this.next() < p;
      },
    };
  }

  function buildColors(paletteState, rng) {
    const colors = [
      paletteState.primary,
      paletteState.secondary,
      ...paletteState.swatches,
    ];
    while (colors.length < 8) {
      const [h, s, l] = Palette.hexToHsl(rng.pick(colors));
      colors.push(Palette.hslToHex((h + rng.range(-60, 60) + 360) % 360, s, l * rng.range(0.7, 1.15)));
    }
    return colors;
  }

  function stamp(ctx, x, y, size, color, opacity) {
    BrushEngine.stamp(ctx, x, y, size, 0.35, color, opacity, 1, false);
  }

  function drawStrangeAttractor(ctx, w, h, colors, rng, createStep, opts) {
    const hubs = rng.int(2, 5);
    for (let n = 0; n < hubs; n++) {
      const cx = rng.range(w * 0.12, w * 0.88);
      const cy = rng.range(h * 0.12, h * 0.88);
      const scale = rng.range(Math.min(w, h) * 0.14, Math.min(w, h) * 0.38);
      const iterations = opts?.iterations ?? rng.int(6000, 14000);
      const skip = opts?.skip ?? rng.int(12, 28);
      const dotSize = rng.range(1.2, Math.max(2, Math.min(w, h) * 0.004));
      const step = createStep(rng);
      let x = rng.range(-0.2, 0.2);
      let y = rng.range(-0.2, 0.2);
      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 0; i < iterations; i++) {
        const next = step(x, y);
        x = next.x;
        y = next.y;
        if (i > skip) {
          const color = colors[i % colors.length];
          stamp(ctx, x * scale, y * scale, dotSize, color, rng.range(0.35, 0.9));
        }
      }
      ctx.restore();
    }
  }

  function clifford(ctx, w, h, colors, rng) {
    drawStrangeAttractor(ctx, w, h, colors, rng, (r) => {
      const a = r.range(1.2, 2.6);
      const b = r.range(-2.8, -1.1);
      const c = r.range(1.4, 2.9);
      const d = r.range(-2.9, -1.3);
      return (x, y) => ({
        x: Math.sin(a * y) - Math.cos(b * x),
        y: Math.sin(c * x) - Math.cos(d * y),
      });
    });
  }

  function deJong(ctx, w, h, colors, rng) {
    drawStrangeAttractor(ctx, w, h, colors, rng, (r) => {
      const a = r.range(-3, 3);
      const b = r.range(-3, 3);
      const c = r.range(-3, 3);
      const d = r.range(-3, 3);
      return (x, y) => ({
        x: Math.sin(a * y) - Math.cos(b * x),
        y: Math.sin(c * x) - Math.sin(d * y),
      });
    });
  }

  function hopalong(ctx, w, h, colors, rng) {
    drawStrangeAttractor(ctx, w, h, colors, rng, (r) => {
      const a = r.range(0.5, 1.8);
      const b = r.range(0.3, 0.9);
      const c = r.range(0.2, 0.85);
      return (x, y) => ({
        x: y - Math.sign(x || 0.001) * Math.sqrt(Math.abs(b * x - c)),
        y: a - x,
      });
    }, { skip: 20 });
  }

  function ikeda(ctx, w, h, colors, rng) {
    drawStrangeAttractor(ctx, w, h, colors, rng, (r) => {
      const u = r.range(0.85, 0.99);
      return (x, y) => {
        const t = 0.4 - u / (1 + x * x + y * y);
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);
        return {
          x: 1 + t * (x * cosT - y * sinT),
          y: t * (x * sinT + y * cosT),
        };
      };
    }, { iterations: rng.int(8000, 16000), skip: 24 });
  }

  function chaosGame(ctx, w, h, colors, rng, vertices, transform, iterations, mapPoint) {
    let x = rng.range(0, 1);
    let y = rng.range(0, 1);
    const pad = Math.min(w, h) * 0.04;
    const dotSize = rng.range(1, Math.max(1.5, Math.min(w, h) * 0.003));
    for (let i = 0; i < iterations; i++) {
      const vi = rng.int(0, vertices.length - 1);
      const v = vertices[vi];
      x = (x + v.x) * 0.5;
      y = (y + v.y) * 0.5;
      if (transform) {
        const t = transform(x, y);
        x = t.x;
        y = t.y;
      }
      if (i > 20) {
        const mapped = mapPoint(x, y, w, h, pad);
        stamp(ctx, mapped.x, mapped.y, dotSize, colors[vi % colors.length], rng.range(0.4, 0.95));
      }
    }
  }

  function sierpinski(ctx, w, h, colors, rng) {
    chaosGame(
      ctx, w, h, colors, rng,
      [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0.5, y: Math.sqrt(3) / 2 }],
      null,
      rng.int(25000, 45000),
      (x, y, width, height, pad) => ({
        x: pad + x * (width - pad * 2),
        y: height - pad - y * (height - pad * 2),
      })
    );
  }

  function barnsleyFern(ctx, w, h, colors, rng) {
    let x = 0;
    let y = 0;
    const iterations = rng.int(35000, 55000);
    const dotSize = rng.range(1, Math.max(1.5, Math.min(w, h) * 0.0025));
    const padX = w * 0.08;
    const padY = h * 0.06;
    for (let i = 0; i < iterations; i++) {
      const r = rng.next();
      let nx;
      let ny;
      if (r < 0.01) {
        nx = 0;
        ny = 0.16 * y;
      } else if (r < 0.86) {
        nx = 0.85 * x + 0.04 * y;
        ny = -0.04 * x + 0.85 * y + 1.6;
      } else if (r < 0.93) {
        nx = 0.2 * x - 0.26 * y;
        ny = 0.23 * x + 0.22 * y + 1.6;
      } else {
        nx = -0.15 * x + 0.28 * y;
        ny = 0.26 * x + 0.24 * y + 0.44;
      }
      x = nx;
      y = ny;
      if (i > 30) {
        const px = padX + ((x + 2.5) / 5.5) * (w - padX * 2);
        const py = h - padY - (y / 10.5) * (h - padY * 2);
        stamp(ctx, px, py, dotSize, colors[i % colors.length], rng.range(0.35, 0.85));
      }
    }
  }

  function julia(ctx, w, h, colors, rng) {
    const cr = rng.range(-0.85, 0.85);
    const ci = rng.range(-0.85, 0.85);
    const maxIter = rng.int(48, 96);
    const step = Math.max(1, Math.floor(Math.min(w, h) / 640));
    const img = ctx.createImageData(w, h);
    const data = img.data;
    const aspect = w / h;
    const zoom = rng.range(1.2, 2.4);

    function juliaColor(n) {
      const t = n / maxIter;
      const c = colors[n % colors.length];
      const hx = c.replace("#", "");
      const full = hx.length === 3 ? hx.split("").map((ch) => ch + ch).join("") : hx;
      const blend = 0.35 + t * 0.65;
      return [
        Math.round(parseInt(full.slice(0, 2), 16) * blend),
        Math.round(parseInt(full.slice(2, 4), 16) * blend),
        Math.round(parseInt(full.slice(4, 6), 16) * blend),
        255,
      ];
    }

    for (let py = 0; py < h; py += step) {
      for (let px = 0; px < w; px += step) {
        let zx = (px / w - 0.5) * 3 * aspect / zoom;
        let zy = (py / h - 0.5) * 3 / zoom;
        let n = 0;
        while (zx * zx + zy * zy <= 4 && n < maxIter) {
          const tmp = zx * zx - zy * zy + cr;
          zy = 2 * zx * zy + ci;
          zx = tmp;
          n++;
        }
        const col = juliaColor(n);
        for (let dy = 0; dy < step && py + dy < h; dy++) {
          for (let dx = 0; dx < step && px + dx < w; dx++) {
            const i = ((py + dy) * w + (px + dx)) * 4;
            data[i] = col[0];
            data[i + 1] = col[1];
            data[i + 2] = col[2];
            data[i + 3] = col[3];
          }
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function ifsFlame(ctx, w, h, colors, rng) {
    const transforms = [];
    const count = rng.int(3, 5);
    for (let i = 0; i < count; i++) {
      transforms.push({
        weight: rng.range(0.15, 1),
        a: rng.range(-1.2, 1.2),
        b: rng.range(-1.2, 1.2),
        c: rng.range(-1.2, 1.2),
        d: rng.range(-1.2, 1.2),
        e: rng.range(-1.5, 1.5),
        f: rng.range(-1.5, 1.5),
        color: colors[i % colors.length],
      });
    }
    const totalWeight = transforms.reduce((s, t) => s + t.weight, 0);
    let x = rng.range(-0.5, 0.5);
    let y = rng.range(-0.5, 0.5);
    const iterations = rng.int(12000, 22000);
    const scale = rng.range(Math.min(w, h) * 0.18, Math.min(w, h) * 0.42);
    const cx = w / 2 + rng.range(-w * 0.08, w * 0.08);
    const cy = h / 2 + rng.range(-h * 0.08, h * 0.08);
    const dotSize = rng.range(1.2, Math.max(2, Math.min(w, h) * 0.0035));

    for (let i = 0; i < iterations; i++) {
      let roll = rng.next() * totalWeight;
      let t = transforms[0];
      for (const tr of transforms) {
        roll -= tr.weight;
        if (roll <= 0) {
          t = tr;
          break;
        }
      }
      const nx = t.a * x + t.b * y + t.e;
      const ny = t.c * x + t.d * y + t.f;
      x = nx;
      y = ny;
      if (i > 30) {
        stamp(ctx, cx + x * scale, cy + y * scale, dotSize, t.color, rng.range(0.35, 0.92));
      }
    }
  }

  function drawBackground(ctx, w, h, colors, rng) {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.75);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[colors.length - 1] || "#0a0a12");
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  const FRACTAL_TYPES = [
    { name: "clifford", draw: clifford },
    { name: "deJong", draw: deJong },
    { name: "hopalong", draw: hopalong },
    { name: "ikeda", draw: ikeda },
    { name: "sierpinski", draw: sierpinski },
    { name: "fern", draw: barnsleyFern },
    { name: "julia", draw: julia },
    { name: "ifs", draw: ifsFlame },
  ];

  function fillLayer(ctx, width, height, paletteState, options) {
    const seed = options?.seed ?? (Date.now() ^ (Math.random() * 0xffffffff));
    const rng = createRng(seed);
    const colors = buildColors(paletteState, rng);
    const clearFirst = options?.clearFirst !== false;

    if (clearFirst) {
      ctx.clearRect(0, 0, width, height);
    }

    if (rng.chance(0.55)) {
      drawBackground(ctx, width, height, colors, rng);
    }

    const type = options?.type
      ? FRACTAL_TYPES.find((t) => t.name === options.type) || rng.pick(FRACTAL_TYPES)
      : rng.pick(FRACTAL_TYPES);

    ctx.save();
    type.draw(ctx, width, height, colors, rng);
    ctx.restore();

    if (rng.chance(0.22) && type.name !== "julia") {
      ctx.save();
      ctx.globalCompositeOperation = rng.pick(["screen", "lighter", "overlay"]);
      ctx.globalAlpha = rng.range(0.25, 0.5);
      const overlay = rng.pick(FRACTAL_TYPES.filter((t) => t.name !== type.name));
      overlay.draw(ctx, width, height, colors, rng);
      ctx.restore();
    }

    return { seed, type: type.name };
  }

  return { fillLayer, FRACTAL_TYPES };
})();

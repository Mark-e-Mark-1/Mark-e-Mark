const LEVELS = [
  {
    id: "alphabet-run",
    name: "Alphabet Run",
    bpm: 140,
    obstacles: [
      { x: 400, type: "spike", letter: "V", h: 40 },
      { x: 520, type: "spike", letter: "V", h: 40 },
      { x: 700, type: "block", letter: "B", h: 60, w: 50 },
      { x: 850, type: "spike", letter: "X", h: 50 },
      { x: 1000, type: "platform", letter: "P", h: 20, w: 120, yOff: -100 },
      { x: 1200, type: "spike", letter: "V", h: 40 },
      { x: 1280, type: "spike", letter: "V", h: 40 },
      { x: 1360, type: "spike", letter: "V", h: 40 },
      { x: 1500, type: "block", letter: "H", h: 80, w: 60 },
      { x: 1650, type: "gap", letter: "—", w: 100 },
      { x: 1850, type: "spike", letter: "A", h: 45 },
      { x: 1950, type: "block", letter: "M", h: 50, w: 50 },
      { x: 2100, type: "platform", letter: "L", h: 20, w: 150, yOff: -130 },
      { x: 2350, type: "spike", letter: "V", h: 40 },
      { x: 2430, type: "spike", letter: "V", h: 40 },
      { x: 2510, type: "spike", letter: "V", h: 40 },
      { x: 2590, type: "spike", letter: "V", h: 40 },
      { x: 2750, type: "block", letter: "W", h: 70, w: 55 },
      { x: 2900, type: "platform", letter: "T", h: 20, w: 200, yOff: -80 },
      { x: 3200, type: "spike", letter: "Z", h: 55 },
      { x: 3350, type: "block", letter: "N", h: 90, w: 50 },
      { x: 3500, type: "spike", letter: "V", h: 40 },
      { x: 3580, type: "spike", letter: "V", h: 40 },
      { x: 3660, type: "spike", letter: "V", h: 40 },
      { x: 3800, type: "finish", letter: "★", w: 60 },
    ],
  },
  {
    id: "spike-alley",
    name: "Spike Alley",
    bpm: 155,
    obstacles: [
      { x: 300, type: "spike", letter: "V", h: 35 },
      { x: 380, type: "spike", letter: "V", h: 35 },
      { x: 460, type: "spike", letter: "V", h: 35 },
      { x: 600, type: "block", letter: "S", h: 45, w: 40 },
      { x: 720, type: "spike", letter: "K", h: 50 },
      { x: 820, type: "spike", letter: "K", h: 50 },
      { x: 920, type: "spike", letter: "K", h: 50 },
      { x: 1100, type: "gap", letter: "—", w: 90 },
      { x: 1280, type: "spike", letter: "V", h: 40 },
      { x: 1340, type: "spike", letter: "V", h: 40 },
      { x: 1400, type: "spike", letter: "V", h: 40 },
      { x: 1460, type: "spike", letter: "V", h: 40 },
      { x: 1520, type: "spike", letter: "V", h: 40 },
      { x: 1700, type: "block", letter: "I", h: 55, w: 45 },
      { x: 1850, type: "spike", letter: "X", h: 55 },
      { x: 1950, type: "spike", letter: "X", h: 55 },
      { x: 2100, type: "platform", letter: "E", h: 18, w: 100, yOff: -90 },
      { x: 2300, type: "spike", letter: "V", h: 40 },
      { x: 2360, type: "spike", letter: "V", h: 40 },
      { x: 2420, type: "spike", letter: "V", h: 40 },
      { x: 2600, type: "gap", letter: "—", w: 120 },
      { x: 2800, type: "spike", letter: "Z", h: 60 },
      { x: 2950, type: "block", letter: "E", h: 70, w: 50 },
      { x: 3100, type: "spike", letter: "V", h: 35 },
      { x: 3160, type: "spike", letter: "V", h: 35 },
      { x: 3220, type: "spike", letter: "V", h: 35 },
      { x: 3280, type: "spike", letter: "V", h: 35 },
      { x: 3450, type: "finish", letter: "★", w: 60 },
    ],
  },
  {
    id: "sky-hop",
    name: "Sky Hop",
    bpm: 128,
    obstacles: [
      { x: 350, type: "platform", letter: "J", h: 20, w: 100, yOff: -60 },
      { x: 550, type: "platform", letter: "U", h: 20, w: 100, yOff: -110 },
      { x: 750, type: "platform", letter: "M", h: 20, w: 120, yOff: -150 },
      { x: 980, type: "spike", letter: "V", h: 40 },
      { x: 1100, type: "platform", letter: "P", h: 20, w: 140, yOff: -80 },
      { x: 1350, type: "gap", letter: "—", w: 80 },
      { x: 1500, type: "platform", letter: "L", h: 20, w: 100, yOff: -100 },
      { x: 1700, type: "platform", letter: "A", h: 20, w: 100, yOff: -140 },
      { x: 1920, type: "block", letter: "T", h: 50, w: 45 },
      { x: 2100, type: "platform", letter: "F", h: 20, w: 160, yOff: -70 },
      { x: 2380, type: "spike", letter: "V", h: 45 },
      { x: 2500, type: "platform", letter: "O", h: 20, w: 110, yOff: -120 },
      { x: 2720, type: "platform", letter: "R", h: 20, w: 110, yOff: -160 },
      { x: 2950, type: "gap", letter: "—", w: 100 },
      { x: 3150, type: "platform", letter: "K", h: 20, w: 200, yOff: -90 },
      { x: 3450, type: "block", letter: "D", h: 65, w: 55 },
      { x: 3600, type: "platform", letter: "Y", h: 20, w: 130, yOff: -110 },
      { x: 3850, type: "finish", letter: "★", w: 60 },
    ],
  },
  {
    id: "gap-runner",
    name: "Gap Runner",
    bpm: 148,
    obstacles: [
      { x: 400, type: "gap", letter: "—", w: 70 },
      { x: 580, type: "spike", letter: "V", h: 40 },
      { x: 700, type: "gap", letter: "—", w: 90 },
      { x: 880, type: "block", letter: "G", h: 50, w: 45 },
      { x: 1020, type: "gap", letter: "—", w: 110 },
      { x: 1220, type: "spike", letter: "V", h: 40 },
      { x: 1300, type: "spike", letter: "V", h: 40 },
      { x: 1450, type: "gap", letter: "—", w: 130 },
      { x: 1680, type: "platform", letter: "B", h: 20, w: 100, yOff: -70 },
      { x: 1880, type: "gap", letter: "—", w: 80 },
      { x: 2050, type: "block", letter: "R", h: 60, w: 50 },
      { x: 2200, type: "gap", letter: "—", w: 100 },
      { x: 2400, type: "spike", letter: "X", h: 50 },
      { x: 2550, type: "gap", letter: "—", w: 120 },
      { x: 2780, type: "platform", letter: "C", h: 20, w: 150, yOff: -100 },
      { x: 3020, type: "gap", letter: "—", w: 90 },
      { x: 3200, type: "spike", letter: "V", h: 40 },
      { x: 3280, type: "spike", letter: "V", h: 40 },
      { x: 3360, type: "spike", letter: "V", h: 40 },
      { x: 3520, type: "gap", letter: "—", w: 140 },
      { x: 3750, type: "finish", letter: "★", w: 60 },
    ],
  },
];

const CUSTOM_STORAGE_KEY = "letter-dash-custom-levels";

function getLevelLength(obstacles) {
  if (!obstacles.length) return 1000;
  const last = obstacles[obstacles.length - 1];
  return last.x + 200;
}

function loadCustomLevels() {
  try {
    const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCustomLevels(levels) {
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(levels));
}

function deleteCustomLevel(id) {
  const remaining = loadCustomLevels().filter((l) => l.id !== id);
  saveCustomLevels(remaining);
  return remaining;
}

function getAllLevels() {
  return [...LEVELS, ...loadCustomLevels()];
}

let audioContext;

const BUILTIN_SOUND_PREFIX = "builtin:";

const BUILTIN_SOUNDS = [
  "coin",
  "collect",
  "jump",
  "bounce",
  "spring",
  "damage",
  "hurt",
  "explode",
  "shoot",
  "laser",
  "powerup",
  "goal",
  "win",
  "level-complete",
  "game-over",
  "click",
  "blip",
  "confirm",
  "cancel",
  "whoosh",
  "footstep",
  "checkpoint",
  "unlock",
  "warning",
];

const SOUND_FREQUENCIES = {
  coin: 880,
  bounce: 440,
  goal: 660,
  damage: 160,
  jump: 520,
  explode: 95,
};

const soundCache = new Map();
const loadingSounds = new Map();

export function preloadBuiltinSounds() {
  return Promise.allSettled(BUILTIN_SOUNDS.map((name) => loadBuiltinSound(name)));
}

export function getSfxVolume(project) {
  return Math.max(0, Math.min(1, (project?.game?.sfxVolume ?? 85) / 100));
}

export function normalizeSoundRef(ref) {
  if (!ref) return "";
  if (ref.startsWith(BUILTIN_SOUND_PREFIX) || ref.startsWith("sound_")) return ref;
  if (BUILTIN_SOUNDS.includes(ref)) return `${BUILTIN_SOUND_PREFIX}${ref}`;
  return ref;
}

export function getBuiltinSoundAsset(name) {
  return {
    id: `${BUILTIN_SOUND_PREFIX}${name}`,
    name,
    fileName: `${name}.wav`,
    src: `assets/sfx/${name}.wav`,
    builtin: true,
  };
}

export function getSoundLibrary(project) {
  const builtins = BUILTIN_SOUNDS.map((name) => getBuiltinSoundAsset(name));
  return [...builtins, ...(project?.assets?.sounds ?? [])];
}

export function resolveSoundAsset(project, soundRef) {
  const normalized = normalizeSoundRef(soundRef);
  if (!normalized) return null;

  if (normalized.startsWith(BUILTIN_SOUND_PREFIX)) {
    const name = normalized.slice(BUILTIN_SOUND_PREFIX.length);
    if (BUILTIN_SOUNDS.includes(name)) {
      return getBuiltinSoundAsset(name);
    }
    return null;
  }

  return getSoundAsset(project, normalized);
}

export function playSound(soundRef, project) {
  if (!soundRef) return;

  const volume = getSfxVolume(project);
  const asset = resolveSoundAsset(project, soundRef);

  if (asset?.builtin) {
    const name = asset.id.slice(BUILTIN_SOUND_PREFIX.length);
    const cached = soundCache.get(name);
    if (cached) {
      playCachedSound(cached, volume);
      return;
    }

    loadBuiltinSound(name)
      .then((audio) => playCachedSound(audio, volume))
      .catch(() => playGeneratedSound(name, volume));
    return;
  }

  if (asset?.src) {
    playAudioSrc(asset.src, volume);
    return;
  }

  playGeneratedSound(soundRef, volume);
}

export function playGeneratedSound(name, volume = 0.85) {
  const BrowserAudioContext = window.AudioContext || window.webkitAudioContext;
  if (!BrowserAudioContext) return;

  audioContext ??= new BrowserAudioContext();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const frequencyKey = String(name).replace(BUILTIN_SOUND_PREFIX, "");

  oscillator.frequency.value = SOUND_FREQUENCIES[frequencyKey] ?? 320;
  oscillator.type = "square";
  const baseGain = frequencyKey === "explode" ? 0.12 : 0.08;
  const duration = frequencyKey === "explode" ? 0.22 : 0.12;
  gain.gain.setValueAtTime(baseGain * volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

export function getSoundAsset(project, soundRef) {
  if (!project?.assets?.sounds?.length || !soundRef) return null;

  return (
    project.assets.sounds.find((asset) => asset.id === soundRef || asset.name === soundRef) ?? null
  );
}

export function createSoundAsset(file, src) {
  return {
    id: `sound_${crypto.randomUUID()}`,
    name: file.name.replace(/\.[^.]+$/, ""),
    fileName: file.name,
    src,
  };
}

export function getMusicAsset(project, musicId) {
  if (!musicId) return null;
  return project.assets?.music?.find((asset) => asset.id === musicId) ?? null;
}

export function createMusicAsset(file, src) {
  return {
    id: `music_${crypto.randomUUID()}`,
    name: file.name.replace(/\.[^.]+$/, ""),
    fileName: file.name,
    src,
  };
}

export function readAudioFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function normalizeProjectSounds(project) {
  project.player.jumpSound = normalizeSoundRef(project.player.jumpSound ?? "jump");
  project.player.deathSound = normalizeSoundRef(project.player.deathSound ?? "hurt");
  project.player.resetSound = normalizeSoundRef(project.player.resetSound ?? "");
  project.player.locomotionSound = normalizeSoundRef(project.player.locomotionSound ?? "");

  for (const defaults of Object.values(project.objectDefaults ?? {})) {
    if (defaults.sound) defaults.sound = normalizeSoundRef(defaults.sound);
    normalizeActionSounds(defaults.actions);
  }

  for (const level of project.levels ?? []) {
    for (const entity of level.entities ?? []) {
      if (entity.sound) entity.sound = normalizeSoundRef(entity.sound);
      normalizeActionSounds(entity.actions);
    }
  }
}

function normalizeActionSounds(actions) {
  for (const action of actions ?? []) {
    if (action.sound) action.sound = normalizeSoundRef(action.sound);
  }
}

function playAudioSrc(src, volume) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {});
}

function playCachedSound(cached, volume) {
  const audio = cached.cloneNode();
  audio.volume = volume;
  audio.play().catch(() => {});
}

function loadBuiltinSound(name) {
  if (soundCache.has(name)) {
    return Promise.resolve(soundCache.get(name));
  }

  if (loadingSounds.has(name)) {
    return loadingSounds.get(name);
  }

  const promise = new Promise((resolve, reject) => {
    const audio = new Audio(`assets/sfx/${name}.wav`);
    audio.preload = "auto";
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      soundCache.set(name, audio);
      loadingSounds.delete(name);
      resolve(audio);
    };

    audio.addEventListener("canplaythrough", finish, { once: true });
    audio.addEventListener(
      "loadeddata",
      () => {
        if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          finish();
        }
      },
      { once: true },
    );

    audio.addEventListener(
      "error",
      () => {
        if (settled) return;
        settled = true;
        loadingSounds.delete(name);
        reject(new Error(`Failed to load sound: ${name}`));
      },
      { once: true },
    );

    audio.load();
  });

  loadingSounds.set(name, promise);
  return promise;
}

export { BUILTIN_SOUNDS };

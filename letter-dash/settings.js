const SETTINGS_KEY = "letter-dash-settings";
const DEFAULT_SETTINGS = {
  musicVolume: 0.5,
  sfxVolume: 0.7,
  playerName: "",
  character: "rocket",
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return {
      musicVolume:
        typeof parsed.musicVolume === "number"
          ? Math.min(1, Math.max(0, parsed.musicVolume))
          : DEFAULT_SETTINGS.musicVolume,
      sfxVolume:
        typeof parsed.sfxVolume === "number"
          ? Math.min(1, Math.max(0, parsed.sfxVolume))
          : DEFAULT_SETTINGS.sfxVolume,
      playerName: typeof parsed.playerName === "string" ? parsed.playerName : "",
      character:
        parsed.character === "jordan" ? "jordan" : DEFAULT_SETTINGS.character,
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(partial) {
  const next = { ...loadSettings(), ...partial };
  if (typeof next.musicVolume === "number") {
    next.musicVolume = Math.min(1, Math.max(0, next.musicVolume));
  }
  if (typeof next.sfxVolume === "number") {
    next.sfxVolume = Math.min(1, Math.max(0, next.sfxVolume));
  }
  if (typeof next.playerName === "string") {
    next.playerName = next.playerName.trim().slice(0, 20);
  }
  if (next.character !== "jordan") {
    next.character = "rocket";
  }
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  return next;
}

function getMusicVolume() {
  return loadSettings().musicVolume;
}

function setMusicVolume(volume) {
  saveSettings({ musicVolume: volume });
}

function getSfxVolume() {
  return loadSettings().sfxVolume;
}

function setSfxVolume(volume) {
  saveSettings({ sfxVolume: volume });
}

function getPlayerName() {
  return loadSettings().playerName;
}

function setPlayerName(name) {
  saveSettings({ playerName: name });
}

function getCharacter() {
  return loadSettings().character;
}

function setCharacter(character) {
  saveSettings({ character: character === "jordan" ? "jordan" : "rocket" });
}

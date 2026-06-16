const Palette = (() => {
  const state = {
    primary: CONFIG.DEFAULT_PRIMARY,
    secondary: CONFIG.DEFAULT_SECONDARY,
    swatches: CONFIG.DEFAULT_SWATCHES.slice(0, CONFIG.PALETTE_SIZE),
    multiColorMode: "solid",
    selectedSwatches: [],
    cycleIndex: 0,
    cycleEvery: 20,
    strokeDistance: 0,
    activePresetId: "classic",
  };

  function setPrimary(color) {
    state.primary = color;
    notifyChange();
  }

  function setSecondary(color) {
    state.secondary = color;
    notifyChange();
  }

  function swapColors() {
    const tmp = state.primary;
    state.primary = state.secondary;
    state.secondary = tmp;
    notifyChange();
  }

  function applyPreset(preset) {
    if (!preset) return;
    state.primary = preset.primary;
    state.secondary = preset.secondary;
    state.swatches = preset.swatches.slice(0, CONFIG.PALETTE_SIZE);
    state.selectedSwatches = [];
    state.activePresetId = preset.id || null;
    notifyChange();
  }

  function getPresets() {
    return CONFIG.PALETTE_PRESETS;
  }

  function getActivePresetId() {
    return state.activePresetId;
  }

  function setSwatch(index, color) {
    if (index >= 0 && index < state.swatches.length) {
      state.swatches[index] = color;
      state.activePresetId = null;
      notifyChange();
    }
  }

  function getSwatches() {
    return state.swatches.slice();
  }

  function setMultiColorMode(mode) {
    state.multiColorMode = mode;
    state.strokeDistance = 0;
    state.cycleIndex = 0;
    notifyChange();
  }

  function toggleSwatchSelection(index) {
    const idx = state.selectedSwatches.indexOf(index);
    if (idx >= 0) state.selectedSwatches.splice(idx, 1);
    else state.selectedSwatches.push(index);
    notifyChange();
  }

  function getActiveColors() {
    if (state.selectedSwatches.length === 0) {
      return [state.primary, state.secondary];
    }
    return state.selectedSwatches.map((i) => state.swatches[i]).filter(Boolean);
  }

  function lerpColor(c1, c2, t) {
    const parse = (c) => {
      if (c.startsWith("#")) {
        const h = c.slice(1);
        const n = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
        return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
      }
      const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
    };
    const a = parse(c1);
    const b = parse(c2);
    const r = Math.round(a[0] + (b[0] - a[0]) * t);
    const g = Math.round(a[1] + (b[1] - a[1]) * t);
    const bl = Math.round(a[2] + (b[2] - a[2]) * t);
    return `rgb(${r},${g},${bl})`;
  }

  function hexToHsl(hex) {
    const h = hex.replace("#", "");
    const n = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
    let r = parseInt(n.slice(0, 2), 16) / 255;
    let g = parseInt(n.slice(2, 4), 16) / 255;
    let b = parseInt(n.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let hVal = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: hVal = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: hVal = ((b - r) / d + 2) / 6; break;
        default: hVal = ((r - g) / d + 4) / 6;
      }
    }
    return [hVal * 360, s * 100, l * 100];
  }

  function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function generateHarmony(type) {
    const [h, s, l] = hexToHsl(state.primary);
    const colors = [state.primary];
    switch (type) {
      case "complementary":
        colors.push(hslToHex(h + 180, s, l));
        colors.push(hslToHex(h + 180, s * 0.7, l * 1.1));
        colors.push(hslToHex(h, s * 0.6, l * 0.85));
        break;
      case "analogous":
        colors.push(hslToHex(h + 30, s, l));
        colors.push(hslToHex(h - 30, s, l));
        colors.push(hslToHex(h + 60, s * 0.8, l));
        break;
      case "triadic":
        colors.push(hslToHex(h + 120, s, l));
        colors.push(hslToHex(h + 240, s, l));
        colors.push(hslToHex(h + 120, s * 0.7, l * 1.1));
        break;
      case "split":
        colors.push(hslToHex(h + 150, s, l));
        colors.push(hslToHex(h + 210, s, l));
        colors.push(hslToHex(h, s * 0.5, l * 0.9));
        break;
      default:
        break;
    }
    for (let i = 0; i < Math.min(colors.length, state.swatches.length); i++) {
      state.swatches[i] = colors[i];
    }
    notifyChange();
    return colors;
  }

  function colorResolver(x, y, distance, speed) {
    const colors = getActiveColors();
    switch (state.multiColorMode) {
      case "gradient": {
        if (colors.length < 2) return state.primary;
        const seg = distance / 100;
        const idx = seg % (colors.length - 1);
        const i = Math.floor(idx);
        return lerpColor(colors[i], colors[i + 1], idx - i);
      }
      case "random":
        return colors[Math.floor(Math.random() * colors.length)];
      case "cycle": {
        const step = Math.floor(distance / state.cycleEvery) % colors.length;
        return colors[step];
      }
      case "pressure": {
        const [h, s, l] = hexToHsl(state.primary);
        const shift = Math.min(speed * 2, 60);
        return hslToHex(h + shift, s, l);
      }
      default:
        return state.primary;
    }
  }

  function resetStrokeDistance() {
    state.strokeDistance = 0;
    state.cycleIndex = 0;
  }

  function addStrokeDistance(d) {
    state.strokeDistance += d;
  }

  function loadFromProject(data) {
    if (data.primary) state.primary = data.primary;
    if (data.secondary) state.secondary = data.secondary;
    if (data.swatches) state.swatches = data.swatches.slice(0, CONFIG.PALETTE_SIZE);
    if (data.multiColorMode) state.multiColorMode = data.multiColorMode;
    if (data.activePresetId) state.activePresetId = data.activePresetId;
    notifyChange();
  }

  function toJSON() {
    return {
      primary: state.primary,
      secondary: state.secondary,
      swatches: state.swatches.slice(),
      multiColorMode: state.multiColorMode,
      activePresetId: state.activePresetId,
    };
  }

  let onChange = null;
  function onPaletteChange(fn) {
    onChange = fn;
  }
  function notifyChange() {
    if (onChange) onChange();
  }

  return {
    getState: () => state,
    setPrimary,
    setSecondary,
    swapColors,
    setSwatch,
    getSwatches,
    setMultiColorMode,
    toggleSwatchSelection,
    getActiveColors,
    generateHarmony,
    colorResolver,
    resetStrokeDistance,
    addStrokeDistance,
    loadFromProject,
    toJSON,
    applyPreset,
    getPresets,
    getActivePresetId,
    onPaletteChange,
    lerpColor,
    hexToHsl,
    hslToHex,
  };
})();

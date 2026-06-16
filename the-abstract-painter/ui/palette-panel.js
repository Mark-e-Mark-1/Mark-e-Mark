const PalettePanel = (() => {
  let swatchGrid = null;
  let primaryEl = null;
  let secondaryEl = null;
  let presetGrid = null;
  let colorDialog = null;
  let swatchColorInput = null;
  let editSwatchIndex = null;
  let editSwatchOriginal = null;

  function init() {
    swatchGrid = document.getElementById("swatch-grid");
    presetGrid = document.getElementById("palette-presets");
    primaryEl = document.getElementById("color-primary");
    secondaryEl = document.getElementById("color-secondary");
    colorDialog = document.getElementById("swatch-color-dialog");
    swatchColorInput = document.getElementById("swatch-color-input");

    primaryEl.addEventListener("input", () => Palette.setPrimary(primaryEl.value));
    secondaryEl.addEventListener("input", () => Palette.setSecondary(secondaryEl.value));
    document.getElementById("swap-colors").addEventListener("click", () => {
      Palette.swapColors();
      render();
    });

    document.querySelectorAll("[data-harmony]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Palette.generateHarmony(btn.dataset.harmony);
        render();
      });
    });

    document.querySelectorAll("[data-multicolor]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Palette.setMultiColorMode(btn.dataset.multicolor);
        document.querySelectorAll("[data-multicolor]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    renderPresets();

    swatchColorInput.addEventListener("input", () => {
      if (editSwatchIndex === null) return;
      Palette.setSwatch(editSwatchIndex, swatchColorInput.value);
      render();
    });

    document.getElementById("swatch-color-form").addEventListener("submit", (e) => {
      e.preventDefault();
      editSwatchIndex = null;
      editSwatchOriginal = null;
      colorDialog.close();
    });

    document.getElementById("swatch-color-cancel").addEventListener("click", () => {
      if (editSwatchIndex !== null && editSwatchOriginal !== null) {
        Palette.setSwatch(editSwatchIndex, editSwatchOriginal);
        render();
      }
      editSwatchIndex = null;
      editSwatchOriginal = null;
      colorDialog.close();
    });

    Palette.onPaletteChange(render);
    render();
  }

  function renderPresets() {
    if (!presetGrid) return;
    presetGrid.innerHTML = "";
    const activeId = Palette.getActivePresetId();
    Palette.getPresets().forEach((preset) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "palette-preset-btn" + (preset.id === activeId ? " active" : "");
      btn.textContent = preset.name;
      btn.title = preset.name + " palette";
      btn.style.setProperty("--preset-a", preset.primary);
      btn.style.setProperty("--preset-b", preset.secondary);
      btn.style.setProperty("--preset-c", preset.swatches[2] || preset.primary);
      btn.addEventListener("click", () => {
        Palette.applyPreset(preset);
        render();
      });
      presetGrid.appendChild(btn);
    });
  }

  function openSwatchColorPicker(index, color) {
    editSwatchIndex = index;
    editSwatchOriginal = color;
    swatchColorInput.value = toHexInput(color);
    colorDialog.showModal();
    swatchColorInput.focus();
  }

  function render() {
    const state = Palette.getState();
    primaryEl.value = toHexInput(state.primary);
    secondaryEl.value = toHexInput(state.secondary);
    primaryEl.style.background = state.primary;
    secondaryEl.style.background = state.secondary;

    renderPresets();

    if (!swatchGrid) return;
    swatchGrid.innerHTML = "";
    state.swatches.forEach((color, i) => {
      const btn = document.createElement("button");
      btn.className = "swatch";
      btn.style.background = color;
      btn.title = color + " — right-click to edit";
      if (state.selectedSwatches.includes(i)) btn.classList.add("selected");
      btn.addEventListener("click", (e) => {
        if (e.shiftKey) Palette.toggleSwatchSelection(i);
        else if (e.altKey) Palette.setSecondary(color);
        else Palette.setPrimary(color);
        render();
      });
      btn.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        openSwatchColorPicker(i, color);
      });
      swatchGrid.appendChild(btn);
    });
  }

  function toHexInput(color) {
    if (color.startsWith("#")) return color.length === 7 ? color : "#000000";
    const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return "#000000";
    const h = (n) => (+n).toString(16).padStart(2, "0");
    return `#${h(m[1])}${h(m[2])}${h(m[3])}`;
  }

  return { init, render };
})();

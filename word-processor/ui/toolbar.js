const Toolbar = (() => {
  let onChange = null;

  function init() {
    document.getElementById("fmt-bold").addEventListener("click", () => {
      Formatting.toggleBold();
      if (onChange) onChange();
    });
    document.getElementById("fmt-italic").addEventListener("click", () => {
      Formatting.toggleItalic();
      if (onChange) onChange();
    });
    document.getElementById("fmt-underline").addEventListener("click", () => {
      Formatting.toggleUnderline();
      if (onChange) onChange();
    });
    document.getElementById("fmt-strike").addEventListener("click", () => {
      Formatting.toggleStrike();
      if (onChange) onChange();
    });

    document.querySelectorAll("[data-align]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Formatting.setAlignment(btn.dataset.align);
        if (onChange) onChange();
      });
    });

    document.getElementById("fmt-bullet").addEventListener("click", () => {
      Formatting.insertUnorderedList();
      if (onChange) onChange();
    });
    document.getElementById("fmt-number").addEventListener("click", () => {
      Formatting.insertOrderedList();
      if (onChange) onChange();
    });
    document.getElementById("fmt-indent").addEventListener("click", () => {
      Formatting.indent();
      if (onChange) onChange();
    });
    document.getElementById("fmt-outdent").addEventListener("click", () => {
      Formatting.outdent();
      if (onChange) onChange();
    });
    document.getElementById("fmt-clear").addEventListener("click", () => {
      Formatting.clearFormatting();
      if (onChange) onChange();
    });

    const styleSelect = document.getElementById("fmt-style");
    styleSelect.addEventListener("change", () => {
      const tag = styleSelect.value;
      Formatting.applyBlockStyle(tag);
      if (onChange) onChange();
    });

    const fontSelect = document.getElementById("fmt-font");
    CONFIG.FONT_FAMILIES.forEach((f) => {
      const opt = document.createElement("option");
      opt.value = f.value;
      opt.textContent = f.label;
      fontSelect.appendChild(opt);
    });
    fontSelect.addEventListener("change", () => {
      Formatting.setFontFamily(fontSelect.value);
      if (onChange) onChange();
    });

    const sizeSelect = document.getElementById("fmt-size");
    CONFIG.FONT_SIZES.forEach((size) => {
      const opt = document.createElement("option");
      opt.value = String(size);
      opt.textContent = size + " pt";
      sizeSelect.appendChild(opt);
    });
    sizeSelect.addEventListener("change", () => {
      Formatting.setFontSize(parseInt(sizeSelect.value, 10));
      if (onChange) onChange();
    });

    document.getElementById("fmt-color").addEventListener("input", (e) => {
      Formatting.setTextColor(e.target.value);
      if (onChange) onChange();
    });
    document.getElementById("fmt-highlight").addEventListener("input", (e) => {
      Formatting.setHighlight(e.target.value);
      if (onChange) onChange();
    });
  }

  function sync(doc) {
    const formats = Formatting.getActiveFormats();
    document.getElementById("fmt-bold").classList.toggle("active", formats.bold);
    document.getElementById("fmt-italic").classList.toggle("active", formats.italic);
    document.getElementById("fmt-underline").classList.toggle("active", formats.underline);
    document.getElementById("fmt-strike").classList.toggle("active", formats.strike);

    document.querySelectorAll("[data-align]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.align === formats.alignment);
    });

    const styleSelect = document.getElementById("fmt-style");
    if (styleSelect.value !== formats.blockTag) {
      styleSelect.value = formats.blockTag;
    }

    const fontSelect = document.getElementById("fmt-font");
    if (fontSelect.value !== doc.fontFamily) {
      fontSelect.value = doc.fontFamily;
    }

    const sizeSelect = document.getElementById("fmt-size");
    if (sizeSelect.value !== String(doc.fontSize)) {
      sizeSelect.value = String(doc.fontSize);
    }
  }

  function onFormatChange(fn) {
    onChange = fn;
  }

  return { init, sync, onFormatChange };
})();

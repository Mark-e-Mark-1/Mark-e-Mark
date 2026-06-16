const LayersPanel = (() => {
  let listEl = null;
  let onUpdate = null;

  function init(listElement) {
    listEl = listElement;
    document.getElementById("layer-add").addEventListener("click", () => {
      if (onUpdate) onUpdate("add");
    });
    document.getElementById("layer-remove").addEventListener("click", () => {
      if (onUpdate) onUpdate("remove");
    });
    document.getElementById("layer-up").addEventListener("click", () => {
      if (onUpdate) onUpdate("up");
    });
    document.getElementById("layer-down").addEventListener("click", () => {
      if (onUpdate) onUpdate("down");
    });
    document.getElementById("layer-duplicate").addEventListener("click", () => {
      if (onUpdate) onUpdate("duplicate");
    });
    document.getElementById("layer-merge").addEventListener("click", () => {
      if (onUpdate) onUpdate("merge");
    });
    document.getElementById("layer-blur").addEventListener("click", () => {
      if (onUpdate) onUpdate("blur-layer");
    });
    document.getElementById("layer-drawing").addEventListener("click", () => {
      if (onUpdate) onUpdate("drawing-filter");
    });
    document.getElementById("layer-flip-h").addEventListener("click", () => {
      if (onUpdate) onUpdate("flip-h");
    });
    document.getElementById("layer-flip-v").addEventListener("click", () => {
      if (onUpdate) onUpdate("flip-v");
    });
    document.getElementById("layer-rotate-cw").addEventListener("click", () => {
      if (onUpdate) onUpdate("rotate-cw");
    });
    document.getElementById("layer-rotate-ccw").addEventListener("click", () => {
      if (onUpdate) onUpdate("rotate-ccw");
    });
  }

  function stopRowBubble(el) {
    ["pointerdown", "mousedown", "click"].forEach((evt) => {
      el.addEventListener(evt, (e) => e.stopPropagation());
    });
  }

  function render(doc) {
    if (!listEl) return;
    listEl.innerHTML = "";
    const reversed = doc.layers.slice().reverse();
    reversed.forEach((layer) => {
      const row = document.createElement("div");
      row.className = "layer-row"
        + (layer.id === doc.activeLayerId ? " active" : "")
        + (layer.visible ? "" : " layer-hidden");
      row.dataset.id = layer.id;

      const topRow = document.createElement("div");
      topRow.className = "layer-top-row";

      const visBtn = document.createElement("button");
      visBtn.className = "layer-vis" + (layer.visible ? " layer-on" : " layer-off");
      visBtn.textContent = layer.visible ? "ON" : "OFF";
      visBtn.title = layer.visible ? "Layer visible — click to hide" : "Layer hidden — click to show";
      visBtn.setAttribute("aria-label", layer.visible ? "Layer visible" : "Layer hidden");
      visBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        layer.visible = !layer.visible;
        doc.dirty = true;
        if (onUpdate) onUpdate("refresh");
      });

      const name = document.createElement("span");
      name.className = "layer-name";
      name.textContent = layer.name;
      name.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        const input = document.createElement("input");
        input.value = layer.name;
        input.className = "layer-rename";
        input.addEventListener("blur", () => {
          layer.name = input.value || layer.name;
          if (onUpdate) onUpdate("refresh");
        });
        input.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") input.blur();
        });
        name.replaceWith(input);
        input.focus();
        input.select();
      });

      const blend = document.createElement("select");
      blend.className = "layer-blend";
      CONFIG.BLEND_MODES.forEach((m) => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        if (m === layer.blendMode) opt.selected = true;
        blend.appendChild(opt);
      });
      blend.addEventListener("change", (e) => {
        e.stopPropagation();
        layer.blendMode = blend.value;
        doc.dirty = true;
        if (onUpdate) onUpdate("render");
      });
      stopRowBubble(blend);

      topRow.appendChild(visBtn);
      topRow.appendChild(name);
      topRow.appendChild(blend);

      const opacityRow = document.createElement("div");
      opacityRow.className = "layer-opacity-row";

      const opacityLabel = document.createElement("label");
      opacityLabel.className = "layer-opacity-label";
      opacityLabel.textContent = "Opacity " + Math.round(layer.opacity * 100) + "%";

      const opacity = document.createElement("input");
      opacity.type = "range";
      opacity.className = "layer-opacity";
      opacity.min = "0";
      opacity.max = "100";
      opacity.value = Math.round(layer.opacity * 100);
      opacity.title = "Layer opacity";
      opacity.addEventListener("input", (e) => {
        e.stopPropagation();
        layer.opacity = +opacity.value / 100;
        opacityLabel.textContent = "Opacity " + opacity.value + "%";
        doc.dirty = true;
        if (onUpdate) onUpdate("render");
      });
      stopRowBubble(opacityRow);
      stopRowBubble(opacity);
      stopRowBubble(opacityLabel);

      opacityRow.appendChild(opacityLabel);
      opacityRow.appendChild(opacity);

      row.appendChild(topRow);
      row.appendChild(opacityRow);

      row.addEventListener("click", () => {
        DocumentModel.setActiveLayer(doc, layer.id);
        if (onUpdate) onUpdate("refresh");
      });
      listEl.appendChild(row);
    });
  }

  function onLayerAction(fn) {
    onUpdate = fn;
  }

  return { init, render, onLayerAction };
})();

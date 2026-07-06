import * as model from "./model.js";
import * as history from "./history.js";
import { DEFAULT_FONT_SIZE, FONT_SIZES } from "./format.js";

export function initFormatToolbar({
  fontSizeSelect,
  boldButton,
  selection,
  grid,
}) {
  if (!fontSizeSelect || !boldButton) {
    return;
  }

  fontSizeSelect.innerHTML = FONT_SIZES.map(
    (size) => `<option value="${size}">${size}</option>`,
  ).join("");
  fontSizeSelect.value = String(DEFAULT_FONT_SIZE);

  function syncControls() {
    const format = model.getFormat(selection.getActiveAddress());

    fontSizeSelect.value = String(format.fontSize);
    boldButton.setAttribute("aria-pressed", format.bold ? "true" : "false");
    boldButton.classList.toggle("is-active", format.bold);
  }

  function applyFormat(partial) {
    const changes = model.setFormatRange(selection.getBounds(), partial);

    if (changes.length > 0) {
      history.recordFormatBatch(changes);
    }

    model.refreshGridDisplay(grid);
    syncControls();
  }

  fontSizeSelect.addEventListener("change", () => {
    applyFormat({ fontSize: Number(fontSizeSelect.value) });
  });

  boldButton.addEventListener("click", () => {
    const current = model.getFormat(selection.getActiveAddress());
    applyFormat({ bold: !current.bold });
  });

  return {
    syncControls,
  };
}

import { COLUMN_COUNT, ROW_COUNT, cellAddress, parseAddress } from "./grid.js";

export function createSelection(grid, onSelect) {
  let anchor = { col: 0, row: 0 };
  let focus = { col: 0, row: 0 };

  function coordsFromAddress(address) {
    return parseAddress(address) ?? { col: 0, row: 0 };
  }

  function clampCol(col) {
    return Math.max(0, Math.min(COLUMN_COUNT - 1, col));
  }

  function clampRow(row) {
    return Math.max(0, Math.min(ROW_COUNT - 1, row));
  }

  function clampCoords(coords) {
    return {
      col: clampCol(coords.col),
      row: clampRow(coords.row),
    };
  }

  function getBounds() {
    return {
      colMin: Math.min(anchor.col, focus.col),
      colMax: Math.max(anchor.col, focus.col),
      rowMin: Math.min(anchor.row, focus.row),
      rowMax: Math.max(anchor.row, focus.row),
    };
  }

  function getActiveAddress() {
    return cellAddress(focus.col, focus.row);
  }

  function isMultiCell() {
    const bounds = getBounds();
    return bounds.colMin !== bounds.colMax || bounds.rowMin !== bounds.rowMax;
  }

  function clearSelectionClasses() {
    grid.table.querySelectorAll(".cell.is-selected, .cell.is-in-range").forEach((element) => {
      element.classList.remove("is-selected", "is-in-range");
      element.setAttribute("tabindex", "-1");
    });
  }

  function updateVisuals(options = {}) {
    clearSelectionClasses();

    const bounds = getBounds();
    const activeAddress = getActiveAddress();

    for (let row = bounds.rowMin; row <= bounds.rowMax; row += 1) {
      for (let col = bounds.colMin; col <= bounds.colMax; col += 1) {
        const address = cellAddress(col, row);
        const element = grid.getElement(address);

        if (!element) {
          continue;
        }

        if (address === activeAddress) {
          element.classList.add("is-selected");
          element.setAttribute("tabindex", "0");

          if (options.scrollIntoView !== false) {
            element.scrollIntoView({ block: "nearest", inline: "nearest" });
            element.focus({ preventScroll: true });
          }
        } else {
          element.classList.add("is-in-range");
        }
      }
    }

    onSelect(activeAddress);
  }

  function setSelection(nextAnchor, nextFocus, options = {}) {
    anchor = clampCoords(nextAnchor);
    focus = clampCoords(nextFocus);
    updateVisuals(options);
    return getActiveAddress();
  }

  function select(address, options = {}) {
    const coords = coordsFromAddress(address);

    if (options.extend) {
      return setSelection(anchor, coords, options);
    }

    return setSelection(coords, coords, options);
  }

  function selectRange(startAddress, endAddress, options = {}) {
    const start = coordsFromAddress(startAddress);
    const end = coordsFromAddress(endAddress);
    return setSelection(start, end, options);
  }

  function move(deltaCol, deltaRow, options = {}) {
    const nextFocus = clampCoords({
      col: focus.col + deltaCol,
      row: focus.row + deltaRow,
    });

    if (options.extend) {
      return setSelection(anchor, nextFocus, options);
    }

    return setSelection(nextFocus, nextFocus, options);
  }

  return {
    select,
    selectRange,
    move,
    getActiveAddress,
    getBounds,
    isMultiCell,
  };
}

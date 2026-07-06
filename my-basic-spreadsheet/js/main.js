import { createGrid } from "./grid.js";
import { createSelection } from "./selection.js";
import { createEditor } from "./editor.js";
import * as model from "./model.js";
import * as storage from "./storage.js";
import * as history from "./history.js";
import { initHelp } from "./help.js";
import { initFormatToolbar } from "./formatToolbar.js";

const gridContainer = document.getElementById("grid");
const formulaInput = document.getElementById("formula-input");
const saveLocalButton = document.getElementById("save-local");
const loadLocalButton = document.getElementById("load-local");
const exportJsonButton = document.getElementById("export-json");
const importJsonInput = document.getElementById("import-json");
const helpButton = document.getElementById("help-me");
const helpDialog = document.getElementById("help-dialog");
const helpCloseButton = document.getElementById("help-close");
const fontSizeSelect = document.getElementById("font-size");
const boldButton = document.getElementById("toggle-bold");

if (!gridContainer) {
  throw new Error("Grid container #grid was not found.");
}

if (!formulaInput) {
  throw new Error("Formula input #formula-input was not found.");
}

const grid = createGrid(gridContainer);
const editorRef = { current: null };

const selection = createSelection(grid, (address) => {
  editorRef.current?.handleCellSelected(address);
  formatToolbarRef.current?.syncControls();
});

const formatToolbarRef = { current: null };

formatToolbarRef.current = initFormatToolbar({
  fontSizeSelect,
  boldButton,
  selection,
  grid,
});

editorRef.current = createEditor({
  grid,
  selection,
  formulaInput,
  syncFormatControls: () => formatToolbarRef.current?.syncControls(),
});

const editor = editorRef.current;
const formatToolbar = formatToolbarRef.current;

let dragSelection = null;

function applyWorkbook(workbook) {
  history.clear();
  model.loadWorkbookData(workbook);
  model.refreshGridDisplay(grid);
  selection.select("A1");
  formatToolbar?.syncControls();
}

function handleStorageAction(action) {
  try {
    action();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    window.alert(message);
  }
}

grid.table.addEventListener("pointerdown", (event) => {
  const cell = event.target.closest(".cell");

  if (!cell || !grid.table.contains(cell)) {
    return;
  }

  if (editor.isEditing()) {
    editor.commit();
  }

  dragSelection = {
    startAddress: cell.dataset.address,
    moved: false,
    extend: event.shiftKey,
  };

  if (event.shiftKey) {
    selection.select(cell.dataset.address, { extend: true });
  } else {
    selection.select(cell.dataset.address);
  }

  if (typeof grid.table.setPointerCapture === "function") {
    grid.table.setPointerCapture(event.pointerId);
  }
});

grid.table.addEventListener("pointermove", (event) => {
  if (!dragSelection) {
    return;
  }

  const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest(".cell");

  if (!cell || !grid.table.contains(cell)) {
    return;
  }

  if (cell.dataset.address !== dragSelection.startAddress) {
    dragSelection.moved = true;
  }

  if (dragSelection.moved && !dragSelection.extend) {
    selection.selectRange(dragSelection.startAddress, cell.dataset.address, {
      scrollIntoView: false,
    });
  }
});

grid.table.addEventListener("pointerup", (event) => {
  if (!dragSelection) {
    return;
  }

  if (typeof grid.table.releasePointerCapture === "function") {
    grid.table.releasePointerCapture(event.pointerId);
  }

  dragSelection = null;
});

grid.table.addEventListener("dblclick", (event) => {
  const cell = event.target.closest(".cell");

  if (!cell || !grid.table.contains(cell)) {
    return;
  }

  selection.select(cell.dataset.address);
  editor.handleCellDoubleClick();
});

grid.table.addEventListener("keydown", (event) => {
  editor.handleGridKeyDown(event);
});

formulaInput.addEventListener("input", () => {
  editor.handleFormulaInput();
});

formulaInput.addEventListener("keydown", (event) => {
  editor.handleFormulaKeyDown(event);
});

formulaInput.addEventListener("focus", () => {
  editor.handleFormulaFocus();
});

formulaInput.addEventListener("blur", () => {
  editor.handleFormulaBlur();
});

saveLocalButton?.addEventListener("click", () => {
  handleStorageAction(() => {
    storage.saveToLocalStorage(model.getWorkbookData());
  });
});

loadLocalButton?.addEventListener("click", () => {
  handleStorageAction(() => {
    const workbook = storage.loadFromLocalStorage();

    if (!workbook) {
      window.alert("No saved workbook found in this browser.");
      return;
    }

    applyWorkbook(workbook);
  });
});

exportJsonButton?.addEventListener("click", () => {
  handleStorageAction(() => {
    storage.downloadWorkbook(model.getWorkbookData());
  });
});

importJsonInput?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  try {
    const workbook = await storage.readWorkbookFile(file);
    applyWorkbook(workbook);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    window.alert(message);
  }

  event.target.value = "";
});

initHelp({
  helpButton,
  helpDialog,
  helpCloseButton,
});

const savedWorkbook = storage.loadFromLocalStorage();

if (savedWorkbook) {
  applyWorkbook(savedWorkbook);
} else {
  selection.select("A1");
  formatToolbar?.syncControls();
}

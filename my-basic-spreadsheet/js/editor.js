import * as model from "./model.js";
import * as history from "./history.js";
import * as clipboard from "./clipboard.js";

export function createEditor({ grid, selection, formulaInput, syncFormatControls }) {
  let isEditing = false;

  function syncCellDisplay(address) {
    grid.setCellAppearance(address, {
      value: model.getDisplayValue(address),
      isError: model.hasError(address),
      format: model.getFormat(address),
    });
  }

  function refreshAllDisplays() {
    model.refreshGridDisplay(grid);
  }

  function syncFormulaBar(address) {
    formulaInput.value = model.getRaw(address);
  }

  function setFormulaBarEnabled(enabled) {
    formulaInput.disabled = !enabled;
  }

  function previewValue(value) {
    grid.setDisplay(selection.getActiveAddress(), value);
  }

  function startEdit(options = {}) {
    if (selection.isMultiCell()) {
      selection.select(selection.getActiveAddress());
    }

    const address = selection.getActiveAddress();

    if (options.replaceWith !== undefined) {
      formulaInput.value = options.replaceWith;
      previewValue(options.replaceWith);
    } else {
      syncFormulaBar(address);
    }

    isEditing = true;
    setFormulaBarEnabled(true);
    grid.getElement(address)?.classList.add("is-editing");
    formulaInput.focus();

    if (options.selectAll) {
      formulaInput.select();
    } else if (options.replaceWith !== undefined) {
      formulaInput.setSelectionRange(formulaInput.value.length, formulaInput.value.length);
    } else {
      formulaInput.setSelectionRange(formulaInput.value.length, formulaInput.value.length);
    }
  }

  function recordCellChange(address, before, after) {
    history.record({ address, before, after });
  }

  function applyHistoryEntry(entry, useBefore) {
    if (!entry) {
      return false;
    }

    if (isEditing) {
      cancel();
    }

    if (entry.type === "format" || entry.type === "formatBatch") {
      const changes = entry.type === "formatBatch" ? entry.changes : [entry];

      for (const change of changes) {
        model.setFormat(change.address, useBefore ? change.before : change.after);
      }

      refreshAllDisplays();
      syncFormulaBar(selection.getActiveAddress());
      syncFormatControls?.();
      grid.getElement(selection.getActiveAddress())?.focus();
      return true;
    }

    const changes = entry.type === "batch" ? entry.changes : [entry];

    for (const change of changes) {
      model.setCell(change.address, useBefore ? change.before : change.after);
    }

    refreshAllDisplays();

    if (changes.length === 1) {
      selection.select(changes[0].address);
      syncFormulaBar(changes[0].address);
      grid.getElement(changes[0].address)?.focus();
    } else {
      syncFormulaBar(selection.getActiveAddress());
      grid.getElement(selection.getActiveAddress())?.focus();
    }

    syncFormatControls?.();
    return true;
  }

  function undo() {
    return applyHistoryEntry(history.undo(), true);
  }

  function redo() {
    return applyHistoryEntry(history.redo(), false);
  }

  function handleClipboardKeyDown(event) {
    const modifier = event.ctrlKey || event.metaKey;

    if (!modifier || isEditing) {
      return false;
    }

    const key = event.key.toLowerCase();

    if (key === "c") {
      event.preventDefault();
      copySelection();
      return true;
    }

    if (key === "v") {
      event.preventDefault();
      pasteSelection();
      return true;
    }

    if (key === "x") {
      event.preventDefault();
      cutSelection();
      return true;
    }

    return false;
  }

  async function cutSelection() {
    await copySelection();
    clearSelectionCells();
  }

  function handleUndoRedoKeyDown(event) {
    const modifier = event.ctrlKey || event.metaKey;

    if (!modifier) {
      return false;
    }

    const key = event.key.toLowerCase();

    if (key === "z" && !event.shiftKey) {
      event.preventDefault();
      undo();
      return true;
    }

    if (key === "y" || (key === "z" && event.shiftKey)) {
      event.preventDefault();
      redo();
      return true;
    }

    return false;
  }

  async function copySelection() {
    try {
      await clipboard.copySelection(selection.getBounds());
    } catch {
      window.alert("Copy failed. Your browser may block clipboard access.");
    }
  }

  async function pasteSelection() {
    if (isEditing) {
      return;
    }

    let text = "";

    try {
      text = await navigator.clipboard.readText();
    } catch {
      window.alert("Paste failed. Your browser may block clipboard access.");
      return;
    }

    const matrix = clipboard.parseTsv(text);
    const active = selection.getActiveAddress();
    const activeElement = grid.getElement(active);

    if (!activeElement || matrix.length === 0) {
      return;
    }

    const startCol = Number(activeElement.dataset.col);
    const startRow = Number(activeElement.dataset.row);
    const changes = clipboard.pasteMatrix(startCol, startRow, matrix);

    if (changes.length > 0) {
      history.recordBatch(changes);
    }

    refreshAllDisplays();
    syncFormulaBar(active);
  }

  function clearSelectionCells() {
    const changes = clipboard.clearRange(selection.getBounds());

    if (changes.length > 0) {
      history.recordBatch(changes);
    }

    refreshAllDisplays();
    syncFormulaBar(selection.getActiveAddress());
    grid.getElement(selection.getActiveAddress())?.classList.remove("is-editing");
    isEditing = false;
  }

  function commit() {
    if (!isEditing) {
      return false;
    }

    const address = selection.getActiveAddress();
    const before = model.getRaw(address);
    const after = formulaInput.value;

    if (before !== after) {
      model.setCell(address, after);
      recordCellChange(address, before, after);
    }

    refreshAllDisplays();
    grid.getElement(address)?.classList.remove("is-editing");
    isEditing = false;
    setFormulaBarEnabled(true);
    return true;
  }

  function cancel() {
    if (!isEditing) {
      return false;
    }

    const address = selection.getActiveAddress();
    syncCellDisplay(address);
    syncFormulaBar(address);
    grid.getElement(address)?.classList.remove("is-editing");
    isEditing = false;
    setFormulaBarEnabled(true);
    return true;
  }

  function handleCellSelected(address) {
    if (!isEditing) {
      syncFormulaBar(address);
      setFormulaBarEnabled(true);
    }
  }

  function handleFormulaInput() {
    if (isEditing) {
      previewValue(formulaInput.value);
    }
  }

  function handleFormulaKeyDown(event) {
    if (handleUndoRedoKeyDown(event) || handleClipboardKeyDown(event)) {
      return;
    }

    if (!isEditing) {
      if (event.key === "Enter") {
        startEdit();
        event.preventDefault();
      }
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      commit();
      selection.move(0, 1);
      grid.getElement(selection.getActiveAddress())?.focus();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
      grid.getElement(selection.getActiveAddress())?.focus();
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      commit();
      selection.move(event.shiftKey ? -1 : 1, 0);
      grid.getElement(selection.getActiveAddress())?.focus();
    }
  }

  function handleFormulaBlur() {
    if (isEditing) {
      commit();
    }
  }

  function handleGridKeyDown(event) {
    if (handleUndoRedoKeyDown(event) || handleClipboardKeyDown(event)) {
      return;
    }

    if (isEditing) {
      return;
    }

    const isPrintable =
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey;

    if (isPrintable) {
      event.preventDefault();
      startEdit({ replaceWith: event.key });
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      startEdit();
      return;
    }

    if (event.key === "F2") {
      event.preventDefault();
      startEdit({ selectAll: false });
      return;
    }

    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      clearSelectionCells();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      selection.move(0, -1, { extend: event.shiftKey });
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      selection.move(0, 1, { extend: event.shiftKey });
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selection.move(-1, 0, { extend: event.shiftKey });
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selection.move(1, 0, { extend: event.shiftKey });
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      selection.move(event.shiftKey ? -1 : 1, 0);
    }
  }

  function handleCellDoubleClick() {
    if (selection.isMultiCell()) {
      selection.select(selection.getActiveAddress());
    }

    startEdit({ selectAll: true });
  }

  function handleFormulaFocus() {
    if (!isEditing) {
      startEdit();
    }
  }

  return {
    commit,
    undo,
    redo,
    handleCellSelected,
    handleFormulaInput,
    handleFormulaKeyDown,
    handleFormulaBlur,
    handleGridKeyDown,
    handleCellDoubleClick,
    handleFormulaFocus,
    isEditing: () => isEditing,
  };
}

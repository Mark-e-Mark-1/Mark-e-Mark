const undoStack = [];
const redoStack = [];
const MAX_HISTORY = 100;

export function record({ address, before, after }) {
  if (before === after) {
    return;
  }

  undoStack.push({ type: "single", address, before, after });

  if (undoStack.length > MAX_HISTORY) {
    undoStack.shift();
  }

  redoStack.length = 0;
}

export function recordBatch(changes) {
  const entries = changes.filter(({ before, after }) => before !== after);

  if (entries.length === 0) {
    return;
  }

  if (entries.length === 1) {
    record(entries[0]);
    return;
  }

  undoStack.push({ type: "batch", changes: entries });

  if (undoStack.length > MAX_HISTORY) {
    undoStack.shift();
  }

  redoStack.length = 0;
}

export function canUndo() {
  return undoStack.length > 0;
}

export function canRedo() {
  return redoStack.length > 0;
}

export function undo() {
  const entry = undoStack.pop();

  if (!entry) {
    return null;
  }

  redoStack.push(entry);
  return entry;
}

export function redo() {
  const entry = redoStack.pop();

  if (!entry) {
    return null;
  }

  undoStack.push(entry);
  return entry;
}

export function clear() {
  undoStack.length = 0;
  redoStack.length = 0;
}

export function recordFormatBatch(changes) {
  if (changes.length === 0) {
    return;
  }

  if (changes.length === 1) {
    undoStack.push({ type: "format", ...changes[0] });
  } else {
    undoStack.push({ type: "formatBatch", changes });
  }

  if (undoStack.length > MAX_HISTORY) {
    undoStack.shift();
  }

  redoStack.length = 0;
}

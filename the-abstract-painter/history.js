const History = (() => {
  const stacks = new Map();

  function getStack(doc) {
    if (!stacks.has(doc)) {
      stacks.set(doc, { undo: [], redo: [], pending: null });
    }
    return stacks.get(doc);
  }

  function beginStroke(doc, layerId, imageData) {
    const stack = getStack(doc);
    stack.pending = { layerId, before: imageData };
  }

  function commitStroke(doc) {
    const stack = getStack(doc);
    if (!stack.pending) return;
    stack.undo.push(stack.pending);
    if (stack.undo.length > CONFIG.MAX_UNDO) stack.undo.shift();
    stack.redo = [];
    stack.pending = null;
  }

  function cancelStroke(doc) {
    const stack = getStack(doc);
    stack.pending = null;
  }

  function undo(doc, restoreFn) {
    const stack = getStack(doc);
    if (!stack.undo.length) return false;
    const entry = stack.undo.pop();
    const layer = doc.layers.find((l) => l.id === entry.layerId);
    if (!layer) return false;
    const current = DocumentModel.snapshotLayer(layer);
    restoreFn(layer, entry.before);
    stack.redo.push({ layerId: entry.layerId, before: current });
    doc.dirty = true;
    return true;
  }

  function redo(doc, restoreFn) {
    const stack = getStack(doc);
    if (!stack.redo.length) return false;
    const entry = stack.redo.pop();
    const layer = doc.layers.find((l) => l.id === entry.layerId);
    if (!layer) return false;
    const current = DocumentModel.snapshotLayer(layer);
    restoreFn(layer, entry.before);
    stack.undo.push({ layerId: entry.layerId, before: current });
    doc.dirty = true;
    return true;
  }

  function canUndo(doc) {
    return getStack(doc).undo.length > 0;
  }

  function canRedo(doc) {
    return getStack(doc).redo.length > 0;
  }

  function clear(doc) {
    stacks.delete(doc);
  }

  return {
    beginStroke,
    commitStroke,
    cancelStroke,
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
  };
})();

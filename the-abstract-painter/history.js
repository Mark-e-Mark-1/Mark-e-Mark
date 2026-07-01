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

  function beginCompound(doc) {
    const stack = getStack(doc);
    stack.pending = {
      compound: true,
      docWidth: doc.width,
      docHeight: doc.height,
      layers: [],
    };
  }

  function addCompoundLayer(doc, layerId, imageData) {
    const stack = getStack(doc);
    if (!stack.pending?.compound) return;
    stack.pending.layers.push({ layerId, before: imageData });
  }

  function commitCompound(doc) {
    const stack = getStack(doc);
    if (!stack.pending?.compound) return;
    stack.undo.push(stack.pending);
    if (stack.undo.length > CONFIG.MAX_UNDO) stack.undo.shift();
    stack.redo = [];
    stack.pending = null;
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

  function restoreCompound(doc, entry, restoreFn) {
    const redoLayers = entry.layers.map(({ layerId }) => {
      const layer = doc.layers.find((l) => l.id === layerId);
      return { layerId, before: layer ? DocumentModel.snapshotLayer(layer) : null };
    }).filter((e) => e.before);
    const redoDoc = { width: doc.width, height: doc.height };
    entry.layers.forEach(({ layerId, before }) => {
      const layer = doc.layers.find((l) => l.id === layerId);
      if (layer) restoreFn(layer, before);
    });
    doc.width = entry.docWidth;
    doc.height = entry.docHeight;
    doc.dirty = true;
    return { docWidth: redoDoc.width, docHeight: redoDoc.height, layers: redoLayers };
  }

  function undo(doc, restoreFn) {
    const stack = getStack(doc);
    if (!stack.undo.length) return false;
    const entry = stack.undo.pop();
    if (entry.compound) {
      const redo = restoreCompound(doc, entry, restoreFn);
      stack.redo.push({ compound: true, docWidth: redo.docWidth, docHeight: redo.docHeight, layers: redo.layers });
      return true;
    }
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
    if (entry.compound) {
      const undo = restoreCompound(doc, entry, restoreFn);
      stack.undo.push({ compound: true, docWidth: undo.docWidth, docHeight: undo.docHeight, layers: undo.layers });
      return true;
    }
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
    beginCompound,
    addCompoundLayer,
    commitCompound,
    commitStroke,
    cancelStroke,
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
  };
})();

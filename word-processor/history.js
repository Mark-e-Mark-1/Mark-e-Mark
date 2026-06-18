const History = (() => {
  const stacks = new Map();

  function getStack(doc) {
    if (!stacks.has(doc)) {
      stacks.set(doc, { undo: [], redo: [], recording: true });
    }
    return stacks.get(doc);
  }

  function push(doc, html) {
    const stack = getStack(doc);
    if (!stack.recording) return;
    const last = stack.undo[stack.undo.length - 1];
    if (last === html) return;
    stack.undo.push(html);
    if (stack.undo.length > CONFIG.MAX_UNDO) stack.undo.shift();
    stack.redo = [];
  }

  function withoutRecording(doc, fn) {
    const stack = getStack(doc);
    const prev = stack.recording;
    stack.recording = false;
    try {
      return fn();
    } finally {
      stack.recording = prev;
    }
  }

  function undo(doc) {
    const stack = getStack(doc);
    if (stack.undo.length < 2) return null;
    const current = stack.undo.pop();
    stack.redo.push(current);
    return stack.undo[stack.undo.length - 1];
  }

  function redo(doc) {
    const stack = getStack(doc);
    if (!stack.redo.length) return null;
    const next = stack.redo.pop();
    stack.undo.push(next);
    return next;
  }

  function canUndo(doc) {
    return getStack(doc).undo.length > 1;
  }

  function canRedo(doc) {
    return getStack(doc).redo.length > 0;
  }

  function reset(doc, html) {
    stacks.set(doc, { undo: [html], redo: [], recording: true });
  }

  function clear(doc) {
    stacks.delete(doc);
  }

  return {
    push,
    withoutRecording,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
    clear,
  };
})();

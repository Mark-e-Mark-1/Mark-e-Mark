const VectorSelection = (() => {
  let selectedIds = [];
  let primaryId = null;
  let marquee = null;
  let snapGuides = [];

  function getSelectedIds() {
    return selectedIds.slice();
  }

  function getPrimaryId() {
    return primaryId || selectedIds[selectedIds.length - 1] || null;
  }

  function setSelectedIds(ids, primary) {
    selectedIds = [...new Set(ids.filter(Boolean))];
    primaryId = primary || selectedIds[selectedIds.length - 1] || null;
    if (primaryId && !selectedIds.includes(primaryId)) selectedIds.push(primaryId);
  }

  function clear() {
    selectedIds = [];
    primaryId = null;
    marquee = null;
    snapGuides = [];
  }

  function setSingle(id) {
    selectedIds = id ? [id] : [];
    primaryId = id || null;
  }

  function toggle(id) {
    if (!id) return;
    const idx = selectedIds.indexOf(id);
    if (idx >= 0) {
      selectedIds.splice(idx, 1);
      if (primaryId === id) primaryId = selectedIds[selectedIds.length - 1] || null;
    } else {
      selectedIds.push(id);
      primaryId = id;
    }
  }

  function isSelected(id) {
    return selectedIds.includes(id);
  }

  function getMarquee() {
    return marquee;
  }

  function setMarquee(m) {
    marquee = m;
  }

  function getSnapGuides() {
    return snapGuides;
  }

  function setSnapGuides(g) {
    snapGuides = g || [];
  }

  return {
    getSelectedIds,
    getPrimaryId,
    setSelectedIds,
    setSingle,
    toggle,
    clear,
    isSelected,
    getMarquee,
    setMarquee,
    getSnapGuides,
    setSnapGuides,
  };
})();

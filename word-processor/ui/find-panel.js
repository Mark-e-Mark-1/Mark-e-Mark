const FindPanel = (() => {
  let panelEl = null;
  let editorEl = null;
  let matches = [];
  let matchIndex = -1;
  let onUpdate = null;

  function init(panel, editor) {
    panelEl = panel;
    editorEl = editor;

    document.getElementById("find-query").addEventListener("input", () => findNext(false));
    document.getElementById("find-replace-query").addEventListener("keydown", (e) => {
      if (e.key === "Enter") replaceOne();
    });
    document.getElementById("btn-find-next").addEventListener("click", () => findNext(true));
    document.getElementById("btn-find-prev").addEventListener("click", findPrevious);
    document.getElementById("btn-replace-one").addEventListener("click", replaceOne);
    document.getElementById("btn-replace-all").addEventListener("click", replaceAll);
    document.getElementById("btn-find-close").addEventListener("click", hide);
  }

  function show() {
    if (!panelEl) return;
    panelEl.classList.remove("hidden");
    const input = document.getElementById("find-query");
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) input.value = sel.toString();
    input.focus();
    input.select();
    findNext(false);
  }

  function hide() {
    if (!panelEl) return;
    panelEl.classList.add("hidden");
    clearHighlights();
    matches = [];
    matchIndex = -1;
    updateCount();
  }

  function toggle() {
    if (panelEl.classList.contains("hidden")) show();
    else hide();
  }

  function clearHighlights() {
    if (!editorEl) return;
    editorEl.querySelectorAll("mark.find-match").forEach((mark) => {
      const parent = mark.parentNode;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
    });
  }

  function highlightMatches(query) {
    clearHighlights();
    matches = [];
    matchIndex = -1;
    if (!query || !editorEl) return;

    const walker = document.createTreeWalker(editorEl, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    const lowerQuery = query.toLowerCase();
    textNodes.forEach((node) => {
      const text = node.textContent;
      const lower = text.toLowerCase();
      let start = 0;
      let idx = lower.indexOf(lowerQuery, start);
      while (idx !== -1) {
        matches.push({ node, start: idx, length: query.length });
        start = idx + query.length;
        idx = lower.indexOf(lowerQuery, start);
      }
    });

    matches.reverse().forEach((m) => {
      const range = document.createRange();
      range.setStart(m.node, m.start);
      range.setEnd(m.node, m.start + m.length);
      const mark = document.createElement("mark");
      mark.className = "find-match";
      range.surroundContents(mark);
    });

    updateCount();
  }

  function selectMatch(index) {
    if (!matches.length) return;
    matchIndex = ((index % matches.length) + matches.length) % matches.length;
    const marks = editorEl.querySelectorAll("mark.find-match");
    marks.forEach((m, i) => m.classList.toggle("find-current", i === matchIndex));
    const current = marks[matchIndex];
    if (current) {
      const range = document.createRange();
      range.selectNodeContents(current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    updateCount();
  }

  function findNext(advance) {
    const query = document.getElementById("find-query").value;
    if (!query) {
      clearHighlights();
      matches = [];
      matchIndex = -1;
      updateCount();
      return;
    }
    if (!matches.length || advance) highlightMatches(query);
    if (!matches.length) {
      updateCount();
      return;
    }
    selectMatch(advance ? matchIndex + 1 : 0);
  }

  function findPrevious() {
    const query = document.getElementById("find-query").value;
    if (!query) return;
    if (!matches.length) highlightMatches(query);
    if (!matches.length) return;
    selectMatch(matchIndex - 1);
  }

  function replaceOne() {
    const query = document.getElementById("find-query").value;
    const replacement = document.getElementById("find-replace-query").value;
    if (!query) return;
    if (!matches.length) highlightMatches(query);
    if (!matches.length) return;
    if (matchIndex < 0) matchIndex = 0;

    const marks = editorEl.querySelectorAll("mark.find-match");
    const current = marks[matchIndex];
    if (!current) return;

    current.replaceWith(document.createTextNode(replacement));
    if (onUpdate) onUpdate();
    highlightMatches(query);
    if (matches.length) selectMatch(Math.min(matchIndex, matches.length - 1));
  }

  function replaceAll() {
    const query = document.getElementById("find-query").value;
    const replacement = document.getElementById("find-replace-query").value;
    if (!query || !editorEl) return;

    const plain = editorEl.innerHTML;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "gi");
    editorEl.innerHTML = plain.replace(re, replacement);
    if (onUpdate) onUpdate();
    hide();
    show();
  }

  function updateCount() {
    const countEl = document.getElementById("find-count");
    if (!countEl) return;
    if (!matches.length) {
      countEl.textContent = "No matches";
      return;
    }
    countEl.textContent = (matchIndex + 1) + " of " + matches.length;
  }

  function onContentChange(fn) {
    onUpdate = fn;
  }

  return { init, show, hide, toggle, onContentChange };
})();

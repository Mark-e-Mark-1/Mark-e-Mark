const OutlinePanel = (() => {
  let listEl = null;
  let onNavigate = null;

  function init(listElement) {
    listEl = listElement;
  }

  function render(html) {
    if (!listEl) return;
    const headings = Stats.collectHeadings(html);
    listEl.innerHTML = "";

    if (!headings.length) {
      const empty = document.createElement("p");
      empty.className = "outline-empty";
      empty.textContent = "Add headings to build an outline.";
      listEl.appendChild(empty);
      return;
    }

    headings.forEach((h) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "outline-item level-" + h.level;
      btn.textContent = h.text;
      btn.title = h.text;
      btn.addEventListener("click", () => {
        const target = document.getElementById(h.id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          if (onNavigate) onNavigate(target);
        }
      });
      listEl.appendChild(btn);
    });
  }

  function onHeadingClick(fn) {
    onNavigate = fn;
  }

  return { init, render, onHeadingClick };
})();

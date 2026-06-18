const Stats = (() => {
  function analyze(html) {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    const text = (div.textContent || "").replace(/\u00a0/g, " ").trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const paragraphs = div.querySelectorAll("p, h1, h2, h3, li").length || (text ? 1 : 0);
    const readingMinutes = Math.max(1, Math.ceil(words / CONFIG.WORDS_PER_MINUTE));

    return { words, chars, charsNoSpaces, paragraphs, readingMinutes };
  }

  function formatStatus(stats) {
    return `${stats.words} words · ${stats.chars} characters · ~${stats.readingMinutes} min read`;
  }

  function collectHeadings(html) {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    const headings = [];
    div.querySelectorAll("h1, h2, h3, .doc-h1, .doc-h2, .doc-h3").forEach((el, index) => {
      const tag = el.tagName.toLowerCase();
      const level = tag.startsWith("h") ? parseInt(tag[1], 10) : parseInt(el.className.replace(/\D/g, "") || "1", 10);
      const text = (el.textContent || "").trim();
      if (!text) return;
      headings.push({
        id: "heading-" + index,
        level,
        text,
        element: el,
      });
      el.id = "heading-" + index;
    });
    return headings;
  }

  return {
    analyze,
    formatStatus,
    collectHeadings,
  };
})();

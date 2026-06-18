const Formatting = (() => {
  let editorEl = null;

  function init(editor) {
    editorEl = editor;
  }

  function focusEditor() {
    if (editorEl) editorEl.focus();
  }

  function exec(command, value = null) {
    focusEditor();
    document.execCommand(command, false, value);
  }

  function toggleBold() { exec("bold"); }
  function toggleItalic() { exec("italic"); }
  function toggleUnderline() { exec("underline"); }
  function toggleStrike() { exec("strikeThrough"); }

  function setAlignment(align) {
    const map = { left: "justifyLeft", center: "justifyCenter", right: "justifyRight", justify: "justifyFull" };
    exec(map[align] || "justifyLeft");
  }

  function setFontFamily(family) {
    exec("fontName", family);
  }

  function setFontSize(pt) {
    exec("fontSize", "7");
    const fontElements = editorEl.querySelectorAll('font[size="7"]');
    fontElements.forEach((el) => {
      el.removeAttribute("size");
      el.style.fontSize = pt + "pt";
    });
  }

  function setTextColor(color) {
    exec("foreColor", color);
  }

  function setHighlight(color) {
    exec("hiliteColor", color);
  }

  function insertUnorderedList() { exec("insertUnorderedList"); }
  function insertOrderedList() { exec("insertOrderedList"); }
  function indent() { exec("indent"); }
  function outdent() { exec("outdent"); }

  function clearFormatting() {
    exec("removeFormat");
    exec("unlink");
  }

  function applyBlockStyle(tag) {
    focusEditor();
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const blockTags = ["P", "H1", "H2", "H3", "DIV", "LI"];
    let node = selection.anchorNode;
    if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;

    while (node && node !== editorEl && !blockTags.includes(node.tagName)) {
      node = node.parentElement;
    }

    if (!node || node === editorEl) {
      exec("formatBlock", tag === "p" ? "p" : tag);
      return;
    }

    const replacement = document.createElement(tag);
    const styleInfo = CONFIG.HEADING_STYLES.find((s) => s.tag === tag);
    if (styleInfo && styleInfo.className) replacement.className = styleInfo.className;
    replacement.innerHTML = node.innerHTML;
    node.replaceWith(replacement);

    const range = document.createRange();
    range.selectNodeContents(replacement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function insertHorizontalRule() {
    focusEditor();
    exec("insertHorizontalRule");
  }

  function insertDate() {
    focusEditor();
    const dateStr = new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    exec("insertText", dateStr);
  }

  function insertPageBreak() {
    focusEditor();
    const hr = document.createElement("div");
    hr.className = "page-break";
    hr.contentEditable = "false";
    hr.innerHTML = '<span class="page-break-label">Page Break</span>';
    const selection = window.getSelection();
    if (selection && selection.rangeCount) {
      const range = selection.getRangeAt(0);
      range.collapse(false);
      range.insertNode(hr);
      const spacer = document.createElement("p");
      spacer.innerHTML = "<br>";
      hr.after(spacer);
      range.setStart(spacer, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      editorEl.appendChild(hr);
    }
  }

  function getActiveFormats() {
    const formats = {
      bold: false,
      italic: false,
      underline: false,
      strike: false,
      alignment: "left",
      blockTag: "p",
    };
    if (!editorEl) return formats;

    try {
      formats.bold = document.queryCommandState("bold");
      formats.italic = document.queryCommandState("italic");
      formats.underline = document.queryCommandState("underline");
      formats.strike = document.queryCommandState("strikeThrough");
    } catch (_) {}

    if (document.queryCommandState("justifyCenter")) formats.alignment = "center";
    else if (document.queryCommandState("justifyRight")) formats.alignment = "right";
    else if (document.queryCommandState("justifyFull")) formats.alignment = "justify";
    else formats.alignment = "left";

    const selection = window.getSelection();
    if (selection && selection.anchorNode) {
      let node = selection.anchorNode.nodeType === Node.TEXT_NODE
        ? selection.anchorNode.parentElement
        : selection.anchorNode;
      while (node && node !== editorEl) {
        const tag = node.tagName && node.tagName.toLowerCase();
        if (["h1", "h2", "h3", "p"].includes(tag)) {
          formats.blockTag = tag;
          break;
        }
        node = node.parentElement;
      }
    }

    return formats;
  }

  function selectAll() {
    focusEditor();
    exec("selectAll");
  }

  return {
    init,
    focusEditor,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleStrike,
    setAlignment,
    setFontFamily,
    setFontSize,
    setTextColor,
    setHighlight,
    insertUnorderedList,
    insertOrderedList,
    indent,
    outdent,
    clearFormatting,
    applyBlockStyle,
    insertHorizontalRule,
    insertDate,
    insertPageBreak,
    getActiveFormats,
    selectAll,
  };
})();

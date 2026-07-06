export const COLUMN_COUNT = 26;
export const ROW_COUNT = 100;
export const DEFAULT_COLUMN_WIDTH = 96;
export const MIN_COLUMN_WIDTH = 48;
export const MAX_COLUMN_WIDTH = 480;
export const ROW_HEADER_WIDTH = 48;

export function columnLabel(index) {
  let label = "";
  let value = index;

  while (value >= 0) {
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26) - 1;
  }

  return label;
}

export function cellAddress(colIndex, rowIndex) {
  return `${columnLabel(colIndex)}${rowIndex + 1}`;
}

export function columnLabelToIndex(label) {
  let index = 0;

  for (let i = 0; i < label.length; i += 1) {
    index = index * 26 + (label.charCodeAt(i) - 64);
  }

  return index - 1;
}

export function parseAddress(address) {
  const match = /^([A-Z]+)(\d+)$/.exec(String(address).toUpperCase());

  if (!match) {
    return null;
  }

  const col = columnLabelToIndex(match[1]);
  const row = Number(match[2]) - 1;

  if (col < 0 || col >= COLUMN_COUNT || row < 0 || row >= ROW_COUNT) {
    return null;
  }

  return { col, row };
}

export function createGrid(container) {
  const table = document.createElement("table");
  table.className = "spreadsheet-table";

  const elements = new Map();
  const columnWidths = Array.from({ length: COLUMN_COUNT }, () => DEFAULT_COLUMN_WIDTH);
  const dataCols = [];

  const colgroup = document.createElement("colgroup");
  const cornerCol = document.createElement("col");
  cornerCol.className = "corner-col";
  cornerCol.style.width = `${ROW_HEADER_WIDTH}px`;
  colgroup.appendChild(cornerCol);

  for (let col = 0; col < COLUMN_COUNT; col += 1) {
    const colElement = document.createElement("col");
    colElement.style.width = `${DEFAULT_COLUMN_WIDTH}px`;
    dataCols.push(colElement);
    colgroup.appendChild(colElement);
  }

  table.appendChild(colgroup);

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const corner = document.createElement("th");
  corner.className = "corner-header";
  corner.scope = "col";
  headerRow.appendChild(corner);

  for (let col = 0; col < COLUMN_COUNT; col += 1) {
    const th = document.createElement("th");
    th.className = "column-header";
    th.scope = "col";
    th.dataset.col = String(col);

    const label = document.createElement("span");
    label.className = "column-header-label";
    label.textContent = columnLabel(col);

    const handle = document.createElement("span");
    handle.className = "column-resize-handle";
    handle.dataset.col = String(col);
    handle.setAttribute("role", "separator");
    handle.setAttribute("aria-orientation", "vertical");
    handle.setAttribute("aria-label", `Resize column ${columnLabel(col)}`);
    handle.tabIndex = -1;

    th.appendChild(label);
    th.appendChild(handle);
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  function setColumnWidth(colIndex, width) {
    const clamped = Math.max(MIN_COLUMN_WIDTH, Math.min(MAX_COLUMN_WIDTH, Math.round(width)));
    columnWidths[colIndex] = clamped;
    dataCols[colIndex].style.width = `${clamped}px`;
    return clamped;
  }

  function initColumnResize() {
    let activeCol = null;
    let startX = 0;
    let startWidth = 0;
    let activeHandle = null;

    function stopResize() {
      if (activeCol === null) {
        return;
      }

      activeHandle?.classList.remove("is-active");
      document.body.classList.remove("is-resizing-column");
      activeCol = null;
      activeHandle = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopResize);
    }

    function onPointerMove(event) {
      if (activeCol === null) {
        return;
      }

      setColumnWidth(activeCol, startWidth + (event.clientX - startX));
    }

    table.addEventListener("pointerdown", (event) => {
      const handle = event.target.closest(".column-resize-handle");

      if (!handle || !table.contains(handle)) {
        return;
      }

      event.preventDefault();
      activeCol = Number(handle.dataset.col);
      startX = event.clientX;
      startWidth = columnWidths[activeCol];
      activeHandle = handle;
      handle.classList.add("is-active");
      document.body.classList.add("is-resizing-column");
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", stopResize);
    });
  }

  initColumnResize();

  const tbody = document.createElement("tbody");

  for (let row = 0; row < ROW_COUNT; row += 1) {
    const tr = document.createElement("tr");

    const rowHeader = document.createElement("th");
    rowHeader.className = "row-header";
    rowHeader.scope = "row";
    rowHeader.textContent = String(row + 1);
    tr.appendChild(rowHeader);

    for (let col = 0; col < COLUMN_COUNT; col += 1) {
      const td = document.createElement("td");
      const address = cellAddress(col, row);

      td.className = "cell";
      td.dataset.address = address;
      td.dataset.col = String(col);
      td.dataset.row = String(row);
      td.setAttribute("role", "gridcell");
      td.setAttribute("tabindex", "-1");
      td.textContent = "";

      elements.set(address, td);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  container.replaceChildren(table);

  return {
    table,
    getElement(address) {
      return elements.get(address) ?? null;
    },
    setDisplay(address, value, isError = false) {
      const element = elements.get(address);

      if (element) {
        element.textContent = value;
        element.classList.toggle("has-error", isError);
      }
    },
    setCellAppearance(address, { value, isError = false, format }) {
      const element = elements.get(address);

      if (!element) {
        return;
      }

      element.textContent = value;
      element.classList.toggle("has-error", isError);
      element.classList.toggle("is-bold", Boolean(format?.bold));
      element.style.fontSize = `${format?.fontSize ?? 13}px`;
    },
    clearDisplays() {
      for (const element of elements.values()) {
        element.textContent = "";
        element.classList.remove("has-error", "is-bold");
        element.style.fontSize = "";
      }
    },
    getColumnWidth(colIndex) {
      return columnWidths[colIndex];
    },
    setColumnWidth,
  };
}

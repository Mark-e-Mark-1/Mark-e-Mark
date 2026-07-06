import { evaluate, extractDependencies, expandRange, FormulaError } from "./formula.js";
import { ROW_COUNT, cellAddress } from "./grid.js";
import { DEFAULT_FONT_SIZE, normalizeFormat, formatsEqual } from "./format.js";

const cells = new Map();
const formats = new Map();
const dependents = new Map();

function ensureDependents(address) {
  if (!dependents.has(address)) {
    dependents.set(address, new Set());
  }

  return dependents.get(address);
}

function removeDependencies(address) {
  const cell = cells.get(address);

  if (!cell?.dependencies) {
    return;
  }

  for (const reference of cell.dependencies) {
    dependents.get(reference)?.delete(address);
  }

  cell.dependencies = [];
}

function addDependencies(address, references) {
  const cell = cells.get(address);

  if (!cell) {
    return;
  }

  cell.dependencies = references;

  for (const reference of references) {
    ensureDependents(reference).add(address);
  }
}

function createContext(sourceAddress, visiting) {
  return {
    getNumeric(reference) {
      if (reference === sourceAddress || visiting.has(reference)) {
        throw new FormulaError("#CYCLE!");
      }

      const cell = cells.get(reference);

      if (!cell || cell.raw === "") {
        return 0;
      }

      if (!cell.raw.startsWith("=")) {
        const numeric = Number(cell.raw);

        if (Number.isNaN(numeric)) {
          throw new FormulaError("#ERROR!");
        }

        return numeric;
      }

      visiting.add(reference);
      const result = evaluate(cell.raw, createContext(reference, visiting));
      visiting.delete(reference);

      if (result.error) {
        throw new FormulaError(result.error);
      }

      const numeric = Number(result.value);

      if (Number.isNaN(numeric)) {
        throw new FormulaError("#ERROR!");
      }

      return numeric;
    },
    getRangeValues(start, end) {
      const addresses = expandRange(start, end);

      return addresses
        .filter((address) => {
          const cell = cells.get(address);
          return cell && cell.raw !== "";
        })
        .map((address) => this.getNumeric(address));
    },
  };
}

function recalcCell(address, visiting = new Set()) {
  const cell = cells.get(address);

  if (!cell) {
    return;
  }

  if (!cell.raw.startsWith("=")) {
    cell.computed = cell.raw;
    cell.error = null;
    return;
  }

  if (visiting.has(address)) {
    cell.computed = "#CYCLE!";
    cell.error = "#CYCLE!";
    return;
  }

  visiting.add(address);
  const result = evaluate(cell.raw, createContext(address, visiting));
  visiting.delete(address);

  cell.computed = result.value;
  cell.error = result.error;
}

function recalcFrom(address) {
  recalcCell(address, new Set());

  const queue = [...(dependents.get(address) ?? [])];
  const seen = new Set();

  while (queue.length > 0) {
    const next = queue.shift();

    if (seen.has(next)) {
      continue;
    }

    seen.add(next);
    recalcCell(next, new Set());

    for (const dependent of dependents.get(next) ?? []) {
      queue.push(dependent);
    }
  }
}

function recalcAll() {
  for (let pass = 0; pass < ROW_COUNT; pass += 1) {
    for (const address of cells.keys()) {
      recalcCell(address, new Set());
    }
  }
}

export function getCell(address) {
  return cells.get(address) ?? { raw: "", computed: "", error: null };
}

export function getFormat(address) {
  return normalizeFormat(formats.get(address));
}

export function getRaw(address) {
  return getCell(address).raw;
}

export function getDisplayValue(address) {
  const cell = getCell(address);

  if (cell.error) {
    return cell.error;
  }

  return cell.computed ?? "";
}

export function hasError(address) {
  return Boolean(getCell(address).error);
}

export function setCell(address, raw) {
  removeDependencies(address);

  if (raw === "") {
    cells.delete(address);
    recalcFrom(address);
    return;
  }

  cells.set(address, {
    raw,
    computed: "",
    error: null,
    dependencies: [],
  });

  addDependencies(address, extractDependencies(raw));
  recalcFrom(address);
}

export function setFormat(address, formatPartial) {
  const current = getFormat(address);
  const next = normalizeFormat({ ...current, ...formatPartial });

  if (formatsEqual(current, next)) {
    return null;
  }

  const isDefault = next.fontSize === DEFAULT_FONT_SIZE && !next.bold;

  if (isDefault) {
    formats.delete(address);
  } else {
    formats.set(address, next);
  }

  return { before: current, after: next };
}

export function setFormatRange(bounds, formatPartial) {
  const changes = [];

  for (let row = bounds.rowMin; row <= bounds.rowMax; row += 1) {
    for (let col = bounds.colMin; col <= bounds.colMax; col += 1) {
      const change = setFormat(cellAddress(col, row), formatPartial);

      if (change) {
        changes.push({
          address: cellAddress(col, row),
          before: change.before,
          after: change.after,
        });
      }
    }
  }

  return changes;
}

export function clearAll() {
  cells.clear();
  formats.clear();
  dependents.clear();
}

export function getWorkbookData() {
  const cellValues = {};
  const formatValues = {};

  for (const [address, cell] of cells.entries()) {
    cellValues[address] = cell.raw;
  }

  for (const [address, format] of formats.entries()) {
    formatValues[address] = format;
  }

  return {
    cells: cellValues,
    formats: formatValues,
  };
}

export function getAllRawValues() {
  const values = {};

  for (const [address, cell] of cells.entries()) {
    values[address] = cell.raw;
  }

  return values;
}

export function loadWorkbookData({ cells: cellValues = {}, formats: formatValues = {} }) {
  clearAll();

  for (const [address, raw] of Object.entries(cellValues)) {
    if (raw === "") {
      continue;
    }

    cells.set(address, {
      raw,
      computed: "",
      error: null,
      dependencies: [],
    });
  }

  for (const [address, format] of Object.entries(formatValues)) {
    const normalized = normalizeFormat(format);
    const isDefault = normalized.fontSize === DEFAULT_FONT_SIZE && !normalized.bold;

    if (!isDefault) {
      formats.set(address, normalized);
    }
  }

  for (const address of cells.keys()) {
    addDependencies(address, extractDependencies(cells.get(address).raw));
  }

  recalcAll();
}

export function loadRawValues(values) {
  loadWorkbookData({ cells: values, formats: {} });
}

export function refreshGridDisplay(grid) {
  grid.clearDisplays();

  const styledAddresses = new Set([...cells.keys(), ...formats.keys()]);

  for (const address of styledAddresses) {
    const cell = getCell(address);
    grid.setCellAppearance(address, {
      value: cell.error ?? cell.computed ?? "",
      isError: Boolean(cell.error),
      format: getFormat(address),
    });
  }
}

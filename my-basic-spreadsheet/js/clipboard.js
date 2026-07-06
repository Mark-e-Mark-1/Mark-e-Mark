import { cellAddress, COLUMN_COUNT, ROW_COUNT } from "./grid.js";
import * as model from "./model.js";

export function buildTsv(cells) {
  return cells
    .map((row) => row.map((value) => String(value ?? "")).join("\t"))
    .join("\n");
}

export function parseTsv(text) {
  if (!text) {
    return [];
  }

  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const rows = normalized.split("\n");

  while (rows.length > 0 && rows[rows.length - 1] === "") {
    rows.pop();
  }

  return rows.map((row) => row.split("\t"));
}

export function readRangeValues(bounds) {
  const rows = [];

  for (let row = bounds.rowMin; row <= bounds.rowMax; row += 1) {
    const values = [];

    for (let col = bounds.colMin; col <= bounds.colMax; col += 1) {
      values.push(model.getRaw(cellAddress(col, row)));
    }

    rows.push(values);
  }

  return rows;
}

export async function copySelection(bounds) {
  const tsv = buildTsv(readRangeValues(bounds));
  await navigator.clipboard.writeText(tsv);
  return tsv;
}

export function pasteMatrix(startCol, startRow, matrix) {
  const changes = [];

  for (let rowOffset = 0; rowOffset < matrix.length; rowOffset += 1) {
    for (let colOffset = 0; colOffset < matrix[rowOffset].length; colOffset += 1) {
      const col = startCol + colOffset;
      const row = startRow + rowOffset;

      if (col >= COLUMN_COUNT || row >= ROW_COUNT) {
        continue;
      }

      const address = cellAddress(col, row);
      const before = model.getRaw(address);
      const after = matrix[rowOffset][colOffset] ?? "";

      if (before !== after) {
        model.setCell(address, after);
        changes.push({ address, before, after });
      }
    }
  }

  return changes;
}

export function clearRange(bounds) {
  const changes = [];

  for (let row = bounds.rowMin; row <= bounds.rowMax; row += 1) {
    for (let col = bounds.colMin; col <= bounds.colMax; col += 1) {
      const address = cellAddress(col, row);
      const before = model.getRaw(address);

      if (before !== "") {
        model.setCell(address, "");
        changes.push({ address, before, after: "" });
      }
    }
  }

  return changes;
}

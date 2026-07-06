const STORAGE_KEY = "basic-spreadsheet-workbook";

export function serializeWorkbook(workbook) {
  return JSON.stringify(
    {
      version: 2,
      cells: workbook.cells ?? {},
      formats: workbook.formats ?? {},
    },
    null,
    2,
  );
}

export function parseWorkbook(json) {
  const data = JSON.parse(json);

  if (!data || typeof data !== "object" || typeof data.cells !== "object") {
    throw new Error("Invalid workbook file.");
  }

  return {
    cells: data.cells,
    formats: data.formats ?? {},
  };
}

export function saveToLocalStorage(workbook) {
  localStorage.setItem(STORAGE_KEY, serializeWorkbook(workbook));
}

export function loadFromLocalStorage() {
  const json = localStorage.getItem(STORAGE_KEY);

  if (!json) {
    return null;
  }

  return parseWorkbook(json);
}

export function downloadWorkbook(workbook, filename = "spreadsheet.json") {
  const blob = new Blob([serializeWorkbook(workbook)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function readWorkbookFile(file) {
  const text = await file.text();
  return parseWorkbook(text);
}

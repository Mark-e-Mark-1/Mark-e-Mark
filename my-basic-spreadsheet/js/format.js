export const DEFAULT_FONT_SIZE = 13;
export const FONT_SIZES = [10, 11, 12, 13, 14, 16, 18, 20, 24];

export function normalizeFormat(format = {}) {
  const fontSize = Number(format.fontSize);

  return {
    fontSize: FONT_SIZES.includes(fontSize) ? fontSize : DEFAULT_FONT_SIZE,
    bold: Boolean(format.bold),
  };
}

export function formatsEqual(a, b) {
  const left = normalizeFormat(a);
  const right = normalizeFormat(b);
  return left.fontSize === right.fontSize && left.bold === right.bold;
}

import { COLUMN_COUNT, ROW_COUNT, cellAddress, parseAddress } from "./grid.js";

export class FormulaError extends Error {
  constructor(message) {
    super(message);
    this.name = "FormulaError";
  }
}

const FUNCTIONS = {
  SUM(values) {
    return values.reduce((total, value) => total + value, 0);
  },
  AVERAGE(values) {
    if (values.length === 0) {
      throw new FormulaError("#ERROR!");
    }

    return values.reduce((total, value) => total + value, 0) / values.length;
  },
  MIN(values) {
    if (values.length === 0) {
      throw new FormulaError("#ERROR!");
    }

    return Math.min(...values);
  },
  MAX(values) {
    if (values.length === 0) {
      throw new FormulaError("#ERROR!");
    }

    return Math.max(...values);
  },
};

export function expandRange(start, end) {
  const from = parseAddress(start);
  const to = parseAddress(end);

  if (!from || !to) {
    throw new FormulaError("#REF!");
  }

  const colMin = Math.min(from.col, to.col);
  const colMax = Math.max(from.col, to.col);
  const rowMin = Math.min(from.row, to.row);
  const rowMax = Math.max(from.row, to.row);
  const addresses = [];

  for (let row = rowMin; row <= rowMax; row += 1) {
    for (let col = colMin; col <= colMax; col += 1) {
      addresses.push(cellAddress(col, row));
    }
  }

  return addresses;
}

export function extractDependencies(raw) {
  if (!raw || !raw.startsWith("=")) {
    return [];
  }

  const formula = raw.slice(1).toUpperCase();
  const deps = new Set();
  const rangePattern = /([A-Z]+\d+):([A-Z]+\d+)/g;
  let rangeMatch = rangePattern.exec(formula);

  while (rangeMatch) {
    expandRange(rangeMatch[1], rangeMatch[2]).forEach((address) => {
      deps.add(address);
    });
    rangeMatch = rangePattern.exec(formula);
  }

  const stripped = formula.replace(/([A-Z]+\d+):([A-Z]+\d+)/g, " ");
  const refPattern = /[A-Z]+\d+/g;
  let refMatch = refPattern.exec(stripped);

  while (refMatch) {
    if (parseAddress(refMatch[0])) {
      deps.add(refMatch[0]);
    }
    refMatch = refPattern.exec(stripped);
  }

  return [...deps];
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    throw new FormulaError("#ERROR!");
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  return String(Math.round(value * 1_000_000) / 1_000_000);
}

function tokenize(formula) {
  const tokens = [];
  let index = 0;

  while (index < formula.length) {
    const char = formula[index];

    if (char === " ") {
      index += 1;
      continue;
    }

    if ("+-*/():,".includes(char)) {
      tokens.push({ type: char });
      index += 1;
      continue;
    }

    if (/\d/.test(char) || char === ".") {
      let rawNumber = "";

      while (index < formula.length && /[\d.]/.test(formula[index])) {
        rawNumber += formula[index];
        index += 1;
      }

      const value = Number(rawNumber);

      if (Number.isNaN(value)) {
        throw new FormulaError("#ERROR!");
      }

      tokens.push({ type: "NUMBER", value });
      continue;
    }

    if (/[A-Z]/i.test(char)) {
      let letters = "";

      while (index < formula.length && /[A-Z]/i.test(formula[index])) {
        letters += formula[index].toUpperCase();
        index += 1;
      }

      if (index < formula.length && /\d/.test(formula[index])) {
        let digits = "";

        while (index < formula.length && /\d/.test(formula[index])) {
          digits += formula[index];
          index += 1;
        }

        tokens.push({ type: "CELL", value: `${letters}${digits}` });
        continue;
      }

      tokens.push({ type: "IDENT", value: letters });
      continue;
    }

    throw new FormulaError("#ERROR!");
  }

  return tokens;
}

class Parser {
  constructor(tokens, context) {
    this.tokens = tokens;
    this.context = context;
    this.index = 0;
  }

  peek(offset = 0) {
    return this.tokens[this.index + offset] ?? null;
  }

  consume(expectedType) {
    const token = this.tokens[this.index];

    if (!token || token.type !== expectedType) {
      throw new FormulaError("#ERROR!");
    }

    this.index += 1;
    return token;
  }

  parseExpression() {
    return this.parseAddSubtract();
  }

  parseAddSubtract() {
    let value = this.parseMultiplyDivide();

    while (this.peek()?.type === "+" || this.peek()?.type === "-") {
      const operator = this.consume(this.peek().type).type;
      const right = this.parseMultiplyDivide();
      value = operator === "+" ? value + right : value - right;
    }

    return value;
  }

  parseMultiplyDivide() {
    let value = this.parseUnary();

    while (this.peek()?.type === "*" || this.peek()?.type === "/") {
      const operator = this.consume(this.peek().type).type;
      const right = this.parseUnary();

      if (operator === "/" && right === 0) {
        throw new FormulaError("#ERROR!");
      }

      value = operator === "*" ? value * right : value / right;
    }

    return value;
  }

  parseUnary() {
    if (this.peek()?.type === "-") {
      this.consume("-");
      return -this.parseUnary();
    }

    if (this.peek()?.type === "+") {
      this.consume("+");
      return this.parseUnary();
    }

    return this.parsePrimary();
  }

  parsePrimary() {
    const token = this.peek();

    if (!token) {
      throw new FormulaError("#ERROR!");
    }

    if (token.type === "NUMBER") {
      this.index += 1;
      return token.value;
    }

    if (token.type === "CELL") {
      this.index += 1;

      if (!parseAddress(token.value)) {
        throw new FormulaError("#REF!");
      }

      return this.context.getNumeric(token.value);
    }

    if (token.type === "IDENT" && this.peek(1)?.type === "(") {
      return this.parseFunction(token.value);
    }

    if (token.type === "(") {
      this.consume("(");
      const value = this.parseExpression();
      this.consume(")");
      return value;
    }

    throw new FormulaError("#ERROR!");
  }

  parseFunction(name) {
    this.consume("IDENT");

    if (!FUNCTIONS[name]) {
      throw new FormulaError("#ERROR!");
    }

    this.consume("(");

    const startCell = this.consume("CELL").value;

    if (!parseAddress(startCell)) {
      throw new FormulaError("#REF!");
    }

    if (this.peek()?.type === ":") {
      this.consume(":");
      const endCell = this.consume("CELL").value;

      if (!parseAddress(endCell)) {
        throw new FormulaError("#REF!");
      }

      this.consume(")");
      const values = this.context.getRangeValues(startCell, endCell);
      return FUNCTIONS[name](values);
    }

    this.consume(")");
    return FUNCTIONS[name]([this.context.getNumeric(startCell)]);
  }

  expectEnd() {
    if (this.index !== this.tokens.length) {
      throw new FormulaError("#ERROR!");
    }
  }
}

export function evaluate(raw, context) {
  if (!raw.startsWith("=")) {
    return { value: raw, error: null };
  }

  try {
    const tokens = tokenize(raw.slice(1));
    const parser = new Parser(tokens, context);
    const result = parser.parseExpression();
    parser.expectEnd();

    return {
      value: formatNumber(result),
      error: null,
    };
  } catch (error) {
    const message = error instanceof FormulaError ? error.message : "#ERROR!";
    return { value: message, error: message };
  }
}

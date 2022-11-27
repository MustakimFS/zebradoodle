// Nerdle: guess an 8-character math equation.
// Allowed characters: digits 0-9, operators + - * /, and the equals sign =.
// Rules: exactly one '='. Both sides must evaluate to the same finite value.
// No leading zeros (except the literal 0). Division must be exact.

export const NERDLE_LEN = 8;
export const NERDLE_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '='];

function tokenize(side) {
  // Return tokens like [12, '+', 3, '*', 4] or null if malformed.
  if (!side.length) return null;
  if (/[^0-9+\-*/]/.test(side)) return null;
  if (/[+\-*/]{2,}/.test(side)) return null;
  if (/^[+*/]/.test(side) || /[+\-*/]$/.test(side)) return null;
  const tokens = [];
  let buf = '';
  for (let i = 0; i < side.length; i++) {
    const ch = side[i];
    if (ch >= '0' && ch <= '9') {
      buf += ch;
    } else {
      if (!buf.length) return null;
      tokens.push(buf);
      tokens.push(ch);
      buf = '';
    }
  }
  if (!buf.length) return null;
  tokens.push(buf);
  for (const t of tokens) {
    if (typeof t === 'string' && /^[0-9]+$/.test(t) && t.length > 1 && t[0] === '0') {
      return null;
    }
  }
  return tokens;
}

function evalTokens(tokens) {
  // First pass: collapse * and /.
  const pass1 = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t === '*' || t === '/') {
      const left = pass1.pop();
      const right = Number(tokens[i + 1]);
      if (!Number.isFinite(left) || !Number.isFinite(right)) return NaN;
      if (t === '/') {
        if (right === 0) return NaN;
        const q = left / right;
        if (!Number.isInteger(q)) return NaN;
        pass1.push(q);
      } else {
        pass1.push(left * right);
      }
      i += 2;
    } else if (typeof t === 'string' && /^[0-9]+$/.test(t)) {
      pass1.push(Number(t));
      i += 1;
    } else {
      pass1.push(t);
      i += 1;
    }
  }
  let acc = pass1[0];
  for (let j = 1; j < pass1.length; j += 2) {
    const op = pass1[j];
    const val = pass1[j + 1];
    if (op === '+') acc += val;
    else if (op === '-') acc -= val;
    else return NaN;
  }
  return acc;
}

export function isValidEquation(eq) {
  if (typeof eq !== 'string' || eq.length !== NERDLE_LEN) return false;
  const parts = eq.split('=');
  if (parts.length !== 2) return false;
  const [lhs, rhs] = parts;
  const lt = tokenize(lhs);
  const rt = tokenize(rhs);
  if (!lt || !rt) return false;
  const lv = evalTokens(lt);
  const rv = evalTokens(rt);
  if (!Number.isFinite(lv) || !Number.isFinite(rv)) return false;
  return lv === rv;
}

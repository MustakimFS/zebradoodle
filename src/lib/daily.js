// Date-seeded picks so every player gets the same puzzle on the same day.

const EPOCH = new Date(2022, 8, 1); // 1 Sep 2022 - day 0 in the catalogue

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function dayIndex(date = new Date()) {
  const here = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = here.getTime() - EPOCH.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

// Deterministic 32-bit hash so we can derive several picks from one key
// (sedecordle needs 16 distinct indices in one go).
export function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pickIndex(list, salt) {
  return hash32(salt) % list.length;
}

export function pickIndices(list, count, salt) {
  const picked = new Set();
  let n = 0;
  while (picked.size < count && n < count * 50) {
    const idx = hash32(`${salt}:${n}`) % list.length;
    picked.add(idx);
    n += 1;
  }
  return Array.from(picked);
}

const PREFIX = 'zebradoodle:v1:';

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    // quota or private mode - silently ignore, the game still plays
  }
}

const blankStats = () => ({
  played: 0,
  won: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastWonKey: null,
  distribution: {},
});

export function getStats(game) {
  return read(`stats:${game}`, blankStats());
}

export function recordResult(game, { won, attempts, dayKey }) {
  const stats = getStats(game);
  stats.played += 1;
  if (won) {
    stats.won += 1;
    stats.distribution[attempts] = (stats.distribution[attempts] || 0) + 1;
    if (stats.lastWonKey) {
      const prev = new Date(stats.lastWonKey);
      const curr = new Date(dayKey);
      const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
      stats.currentStreak = diffDays === 1 ? stats.currentStreak + 1 : 1;
    } else {
      stats.currentStreak = 1;
    }
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
    stats.lastWonKey = dayKey;
  } else {
    stats.currentStreak = 0;
  }
  write(`stats:${game}`, stats);
  return stats;
}

export function getDailyProgress(game, dayKey) {
  return read(`daily:${game}:${dayKey}`, null);
}

export function saveDailyProgress(game, dayKey, progress) {
  write(`daily:${game}:${dayKey}`, progress);
}

export function clearAllProgress() {
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX)) keys.push(k);
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
  } catch (e) {}
}

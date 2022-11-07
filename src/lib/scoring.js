// Port of the original Zebradoodle.java compare() method.
// Each tile gets a status: 'correct' (right letter, right spot),
// 'present' (in the word, wrong spot), or 'absent' (not in the word).
// Repeated letters are scored exactly the way Wordle does it:
// each occurrence in the answer can satisfy at most one tile in the guess,
// with correct-position matches consuming first.

export const STATUS = Object.freeze({
  CORRECT: 'correct',
  PRESENT: 'present',
  ABSENT: 'absent',
  EMPTY: 'empty',
});

export function scoreGuess(answer, guess) {
  const a = answer.toLowerCase();
  const g = guess.toLowerCase();
  const result = new Array(g.length).fill(STATUS.ABSENT);
  const remaining = {};

  for (let i = 0; i < a.length; i++) {
    if (g[i] === a[i]) {
      result[i] = STATUS.CORRECT;
    } else {
      remaining[a[i]] = (remaining[a[i]] || 0) + 1;
    }
  }

  for (let i = 0; i < g.length; i++) {
    if (result[i] === STATUS.CORRECT) continue;
    const ch = g[i];
    if (remaining[ch] > 0) {
      result[i] = STATUS.PRESENT;
      remaining[ch] -= 1;
    }
  }
  return result;
}

// Merge per-letter best status across many guesses so the keyboard
// can show the strongest hint we have for each key.
export function aggregateLetterStatus(guesses, statuses) {
  const rank = { [STATUS.CORRECT]: 3, [STATUS.PRESENT]: 2, [STATUS.ABSENT]: 1 };
  const map = {};
  for (let g = 0; g < guesses.length; g++) {
    const word = guesses[g];
    const row = statuses[g];
    if (!row) continue;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i].toLowerCase();
      const next = row[i];
      if (!map[ch] || rank[next] > rank[map[ch]]) {
        map[ch] = next;
      }
    }
  }
  return map;
}

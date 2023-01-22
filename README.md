# Zebradoodle

A small collection of word and math puzzle games, all in one place.

> Reconstructed in React from a Java CLI prototype I wrote between
> Sep 2022 and Jan 2023. The original (`legacy/Zebradoodle.java`) was a
> command-line Wordle clone that read 26 per-letter dictionary files off disk;
> this version brings it into the browser and adds Quordle, Sedecordle and
> Nerdle alongside it.

## Game modes

| Mode        | Boards | Word length | Guesses |
|-------------|:------:|:-----------:|:-------:|
| Wordle      |   1    |      5      |    6    |
| Quordle     |   4    |      5      |    9    |
| Sedecordle  |   16   |      5      |   21    |
| Nerdle      |   1    |   8 (eq.)   |    6    |

Each mode has a **daily** puzzle (everyone gets the same one, seeded by the
date) and a **practice** mode (unlimited fresh puzzles, no streak penalty).

## Stack

- React 17 + React Router 5
- Create React App (`react-scripts` 5)
- `canvas-confetti` for the win celebration
- Plain CSS - no design system, no Tailwind. Wordle-style palette, dark theme.
- `localStorage` for stats, streaks, and daily-puzzle resume

No backend. Everything runs in the browser, so it deploys as a static bundle.

## Running locally

```bash
npm install
npm start            # dev server on http://localhost:3000
npm run build        # production bundle in ./build
```

## How the scoring works

The original Java compared each guess against the answer with a two-pass
algorithm that correctly handles repeated letters:

1. First pass marks any letter that's in the right slot as **correct**.
2. Second pass walks the remaining guess letters. Each one can match an
   answer letter at most once, and correct-position matches consume first.

That's the same behaviour Wordle uses. The JS port lives in
[`src/lib/scoring.js`](src/lib/scoring.js).

## Nerdle rules

- Equations are exactly 8 characters.
- Allowed characters: `0-9 + - * / =`.
- Exactly one `=`. Both sides must evaluate to the same finite integer.
- Standard operator precedence (`*` and `/` before `+` and `-`).
- Division must be exact (no fractional results).
- No leading zeros except literal `0`.

A curated bank of equations lives in
[`src/data/nerdleAnswers.js`](src/data/nerdleAnswers.js) and is re-validated on
module load.

## Project layout

```
src/
  components/   Reusable UI: Board, Tile, Keyboard, Modal, Toast, Confetti
  data/         Word and equation banks
  lib/          Scoring, daily seeding, localStorage, game-state hook, nerdle
  pages/        Home, Wordle, Quordle, Sedecordle, Nerdle, Stats, HowToPlay
  styles/       index.css, App.css
legacy/         Original 2022 Java prototype
```

## Status

Reconstructed in 2026 from the 2022 prototype. Commit dates in this repo
reflect when each piece was originally written.

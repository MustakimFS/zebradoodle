import React from 'react';
import Tile from './Tile';
import { STATUS } from '../lib/scoring';

// Generic guess grid. Renders `rows` rows of `cols` tiles. The active row is
// optionally fed live input from `currentGuess`. Each scored guess in
// `guesses` has a matching status array in `statuses`.
function Board({
  rows,
  cols,
  guesses,
  statuses,
  currentGuess,
  currentRow,
  invalid,
  solved,
  compact,
}) {
  const display = [];
  for (let r = 0; r < rows; r++) {
    const rowTiles = [];
    let value = '';
    let scored = null;
    if (r < guesses.length) {
      value = guesses[r];
      scored = statuses[r];
    } else if (r === currentRow && !solved) {
      value = currentGuess || '';
    }
    const isInvalidRow = invalid && r === currentRow;
    for (let c = 0; c < cols; c++) {
      const letter = value[c] ? value[c].toUpperCase() : '';
      const status = scored ? scored[c] : STATUS.EMPTY;
      const animate = scored
        ? 'flip'
        : isInvalidRow
        ? 'shake'
        : letter && r === currentRow
        ? 'pop'
        : null;
      const delay = scored ? c * 220 : 0;
      rowTiles.push(
        <Tile
          key={`${r}-${c}`}
          value={letter}
          status={status}
          animate={animate}
          delay={delay}
          solved={solved && r === guesses.length - 1}
        />
      );
    }
    display.push(
      <div key={r} className="board__row">
        {rowTiles}
      </div>
    );
  }
  const cls = ['board'];
  if (compact) cls.push('board--compact');
  if (solved) cls.push('board--solved');
  return <div className={cls.join(' ')}>{display}</div>;
}

export default Board;

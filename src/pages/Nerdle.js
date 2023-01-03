import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Board from '../components/Board';
import Keyboard from '../components/Keyboard';
import Confetti from '../components/Confetti';
import Modal from '../components/Modal';
import StatsPanel from '../components/StatsPanel';
import useWordGame from '../lib/useWordGame';
import NERDLE_LIST from '../data/nerdleAnswers';
import { dayIndex, pickIndex, todayKey } from '../lib/daily';
import { isValidEquation, NERDLE_LEN } from '../lib/nerdle';
import { toast } from '../components/Toast';
import { getStats } from '../lib/storage';

const MAX_GUESSES = 6;

function pickDaily() {
  const idx = pickIndex(NERDLE_LIST, `nerdle:${dayIndex()}`);
  return NERDLE_LIST[idx];
}

function pickPractice() {
  return NERDLE_LIST[Math.floor(Math.random() * NERDLE_LIST.length)];
}

function validateEquation(guess) {
  if (!isValidEquation(guess)) return 'Equation must balance';
  return null;
}

function Nerdle() {
  const { mode } = useParams();
  const isDaily = mode === 'daily';
  const dayKey = isDaily ? todayKey() : null;
  const [seed, setSeed] = useState(0);

  const answer = useMemo(
    () => (isDaily ? pickDaily() : pickPractice()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDaily, seed]
  );

  const game = useWordGame({
    gameId: 'nerdle',
    answers: [answer],
    wordLength: NERDLE_LEN,
    maxGuesses: MAX_GUESSES,
    validate: validateEquation,
    mode: isDaily ? 'daily' : 'practice',
    dayKey,
  });

  const [showEnd, setShowEnd] = useState(false);
  useEffect(() => {
    if (game.won || game.lost) {
      const t = setTimeout(() => setShowEnd(true), 1900);
      return () => clearTimeout(t);
    }
    setShowEnd(false);
    return undefined;
  }, [game.won, game.lost]);

  useEffect(() => {
    if (game.error) toast(game.error, { kind: 'warn' });
  }, [game.error]);

  const onNew = () => {
    if (isDaily) return;
    setShowEnd(false);
    game.reset();
    setSeed((s) => s + 1);
  };

  const stats = getStats('nerdle');
  const currentRow = game.guesses.length;

  return (
    <div className="game game--nerdle">
      <p className="game__caption">
        {isDaily ? `Daily #${dayIndex()} · ${dayKey}` : 'Practice mode'} · 8-tile equation
      </p>
      <Board
        rows={MAX_GUESSES}
        cols={NERDLE_LEN}
        guesses={game.guesses}
        statuses={game.statusesPerBoard[0] || []}
        currentGuess={game.current}
        currentRow={currentRow}
        invalid={game.invalid}
        solved={game.won}
      />
      <Keyboard statusMap={game.keyboardStatus} onKey={game.handleKey} variant="nerdle" />
      <Confetti active={game.won} />
      <Modal
        open={showEnd}
        onClose={() => setShowEnd(false)}
        title={game.won ? 'Solved!' : 'So close.'}
        actions={
          <>
            {!isDaily ? (
              <button className="btn btn--primary" onClick={onNew}>Play again</button>
            ) : (
              <Link className="btn btn--primary" to="/">Home</Link>
            )}
            <Link className="btn btn--ghost" to="/stats">Stats</Link>
          </>
        }
      >
        <p>
          {game.won
            ? `Solved in ${game.guesses.length} ${game.guesses.length === 1 ? 'guess' : 'guesses'}.`
            : `The equation was `}
          {!game.won ? <strong>{answer}</strong> : null}
        </p>
        <StatsPanel stats={stats} attempts={MAX_GUESSES} />
      </Modal>
    </div>
  );
}

export default Nerdle;

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Board from '../components/Board';
import Keyboard from '../components/Keyboard';
import Confetti from '../components/Confetti';
import Modal from '../components/Modal';
import StatsPanel from '../components/StatsPanel';
import useWordGame from '../lib/useWordGame';
import ANSWERS from '../data/answers';
import { dayIndex, pickIndex, todayKey } from '../lib/daily';
import { toast } from '../components/Toast';
import { getStats } from '../lib/storage';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const ANSWER_SET = new Set(ANSWERS);

function pickPracticeAnswer() {
  return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
}

function pickDailyAnswer() {
  const idx = pickIndex(ANSWERS, `wordle:${dayIndex()}`);
  return ANSWERS[idx];
}

function validateWord(guess) {
  if (!ANSWER_SET.has(guess)) return 'Not in word list';
  return null;
}

function Wordle() {
  const { mode } = useParams();
  const isDaily = mode === 'daily';
  const [seed, setSeed] = useState(0);
  const dayKey = isDaily ? todayKey() : null;

  const answer = useMemo(
    () => (isDaily ? pickDailyAnswer() : pickPracticeAnswer()),
    // refresh practice answer when seed bumps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDaily, seed]
  );

  const game = useWordGame({
    gameId: 'wordle',
    answers: [answer],
    wordLength: WORD_LENGTH,
    maxGuesses: MAX_GUESSES,
    validate: validateWord,
    mode: isDaily ? 'daily' : 'practice',
    dayKey,
  });

  const [showEnd, setShowEnd] = useState(false);
  useEffect(() => {
    if (game.won || game.lost) {
      const t = setTimeout(() => setShowEnd(true), 1600);
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

  const stats = getStats('wordle');
  const currentRow = game.guesses.length;

  return (
    <div className="game game--wordle">
      <p className="game__caption">
        {isDaily ? `Daily #${dayIndex()} · ${dayKey}` : 'Practice mode'}
      </p>
      <Board
        rows={MAX_GUESSES}
        cols={WORD_LENGTH}
        guesses={game.guesses}
        statuses={game.statusesPerBoard[0] || []}
        currentGuess={game.current}
        currentRow={currentRow}
        invalid={game.invalid}
        solved={game.won}
      />
      <Keyboard statusMap={game.keyboardStatus} onKey={game.handleKey} variant="letters" />
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
            ? `Got it in ${game.guesses.length} ${game.guesses.length === 1 ? 'guess' : 'guesses'}.`
            : `The word was `}
          {!game.won ? <strong>{answer.toUpperCase()}</strong> : null}
        </p>
        {isDaily ? (
          <p className="muted">Come back tomorrow for a new word.</p>
        ) : null}
        <StatsPanel stats={stats} attempts={MAX_GUESSES} />
      </Modal>
    </div>
  );
}

export default Wordle;

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Board from '../components/Board';
import Keyboard from '../components/Keyboard';
import Confetti from '../components/Confetti';
import Modal from '../components/Modal';
import StatsPanel from '../components/StatsPanel';
import useWordGame from '../lib/useWordGame';
import ANSWERS from '../data/answers';
import { ALLOWED_GUESSES } from '../data/allowedGuesses';
import { dayIndex, pickIndices, todayKey } from '../lib/daily';
import { toast } from '../components/Toast';
import { getStats } from '../lib/storage';

const WORD_LENGTH = 5;
const MAX_GUESSES = 21;
const BOARD_COUNT = 16;
const ANSWER_SET = new Set(ANSWERS);

function pickDailyAnswers() {
  const idxs = pickIndices(ANSWERS, BOARD_COUNT, `sedecordle:${dayIndex()}`);
  return idxs.map((i) => ANSWERS[i]);
}

function pickPracticeAnswers() {
  const result = new Set();
  while (result.size < BOARD_COUNT) {
    result.add(ANSWERS[Math.floor(Math.random() * ANSWERS.length)]);
  }
  return Array.from(result);
}

function validateWord(guess) {
  if (ANSWER_SET.has(guess) || ALLOWED_GUESSES.has(guess)) return null;
  return 'Not in word list';
}

function Sedecordle() {
  const { mode } = useParams();
  const isDaily = mode === 'daily';
  const dayKey = isDaily ? todayKey() : null;
  const [seed, setSeed] = useState(0);

  const answers = useMemo(
    () => (isDaily ? pickDailyAnswers() : pickPracticeAnswers()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDaily, seed]
  );

  const game = useWordGame({
    gameId: 'sedecordle',
    answers,
    wordLength: WORD_LENGTH,
    maxGuesses: MAX_GUESSES,
    validate: validateWord,
    mode: isDaily ? 'daily' : 'practice',
    dayKey,
  });

  const [showEnd, setShowEnd] = useState(false);
  useEffect(() => {
    if (game.won || game.lost) {
      const t = setTimeout(() => setShowEnd(true), 2000);
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

  const stats = getStats('sedecordle');
  const currentRow = game.guesses.length;
  const solvedCount = game.solvedBoards.filter(Boolean).length;

  return (
    <div className="game game--sedecordle">
      <p className="game__caption">
        {isDaily ? `Daily #${dayIndex()} · ${dayKey}` : 'Practice mode'} · solved {solvedCount}/{BOARD_COUNT}
      </p>
      <div className="multi-grid multi-grid--4">
        {answers.map((ans, idx) => (
          <Board
            key={idx}
            rows={MAX_GUESSES}
            cols={WORD_LENGTH}
            guesses={game.guesses}
            statuses={game.statusesPerBoard[idx] || []}
            currentGuess={game.current}
            currentRow={currentRow}
            invalid={game.invalid}
            solved={game.solvedBoards[idx]}
            compact
          />
        ))}
      </div>
      <Keyboard statusMap={game.keyboardStatus} onKey={game.handleKey} variant="letters" />
      <Confetti active={game.won} />
      <Modal
        open={showEnd}
        onClose={() => setShowEnd(false)}
        title={game.won ? 'All sixteen solved!' : `Solved ${solvedCount}/${BOARD_COUNT}.`}
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
        <p>The words were:</p>
        <ul className="answer-list answer-list--columns">
          {answers.map((a, i) => (
            <li key={i}>
              <strong>{a.toUpperCase()}</strong>{' '}
              {game.solvedBoards[i] ? <span className="muted">&#10003;</span> : <span className="muted">&#10005;</span>}
            </li>
          ))}
        </ul>
        <StatsPanel stats={stats} attempts={MAX_GUESSES} />
      </Modal>
    </div>
  );
}

export default Sedecordle;

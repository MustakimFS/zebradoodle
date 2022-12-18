import { useCallback, useEffect, useMemo, useState } from 'react';
import { scoreGuess, aggregateLetterStatus, STATUS } from './scoring';
import { getDailyProgress, saveDailyProgress, recordResult } from './storage';

// Drives single-word and multi-board word games (Wordle, Quordle, Sedecordle).
// `answers` is an array of target words. `wordLength` is the tile count per
// board. `maxGuesses` is shared across all boards. `validate` is called on
// every submitted guess - return null if accepted, or a message string if not.
export default function useWordGame({
  gameId,
  answers,
  wordLength,
  maxGuesses,
  validate,
  mode,
  dayKey,
}) {
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [error, setError] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore daily progress on mount.
  useEffect(() => {
    if (mode !== 'daily' || !dayKey) {
      setHydrated(true);
      return;
    }
    const saved = getDailyProgress(gameId, dayKey);
    if (saved && Array.isArray(saved.guesses) && saved.answersKey === answers.join('|')) {
      setGuesses(saved.guesses);
      setWon(!!saved.won);
      setLost(!!saved.lost);
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusesPerBoard = useMemo(() => {
    return answers.map((ans) => guesses.map((g) => scoreGuess(ans, g)));
  }, [answers, guesses]);

  const solvedBoards = useMemo(() => {
    return answers.map((ans) => guesses.some((g) => g === ans));
  }, [answers, guesses]);

  const keyboardStatusByBoard = useMemo(() => {
    return answers.map((_, idx) =>
      aggregateLetterStatus(guesses, statusesPerBoard[idx])
    );
  }, [answers, guesses, statusesPerBoard]);

  // Merge all boards' keyboard states for the on-screen keyboard.
  const keyboardStatus = useMemo(() => {
    const rank = { [STATUS.CORRECT]: 3, [STATUS.PRESENT]: 2, [STATUS.ABSENT]: 1 };
    const merged = {};
    for (let i = 0; i < keyboardStatusByBoard.length; i++) {
      const map = keyboardStatusByBoard[i];
      // For solved boards we mark every letter in that board's answer as
      // 'correct' on the keyboard so the player can see what's still active.
      if (solvedBoards[i]) {
        for (const ch of answers[i]) {
          if (!merged[ch] || rank[STATUS.CORRECT] > rank[merged[ch]]) merged[ch] = STATUS.CORRECT;
        }
      } else {
        for (const k of Object.keys(map)) {
          if (!merged[k] || rank[map[k]] > rank[merged[k]]) merged[k] = map[k];
        }
      }
    }
    return merged;
  }, [keyboardStatusByBoard, solvedBoards, answers]);

  const handleKey = useCallback(
    (k) => {
      if (won || lost) return;
      if (k === 'ENTER') {
        if (current.length !== wordLength) {
          setInvalid(true);
          setError('Not enough letters');
          setTimeout(() => setInvalid(false), 600);
          setTimeout(() => setError(null), 1500);
          return;
        }
        const msg = validate ? validate(current) : null;
        if (msg) {
          setInvalid(true);
          setError(msg);
          setTimeout(() => setInvalid(false), 600);
          setTimeout(() => setError(null), 1500);
          return;
        }
        const nextGuesses = [...guesses, current];
        setGuesses(nextGuesses);
        setCurrent('');
        const allSolved = answers.every((ans) => nextGuesses.includes(ans));
        const exhausted = nextGuesses.length >= maxGuesses;
        if (allSolved) {
          setWon(true);
          if (mode === 'daily' && dayKey) {
            saveDailyProgress(gameId, dayKey, {
              guesses: nextGuesses,
              won: true,
              lost: false,
              answersKey: answers.join('|'),
            });
            recordResult(gameId, { won: true, attempts: nextGuesses.length, dayKey });
          }
        } else if (exhausted) {
          setLost(true);
          if (mode === 'daily' && dayKey) {
            saveDailyProgress(gameId, dayKey, {
              guesses: nextGuesses,
              won: false,
              lost: true,
              answersKey: answers.join('|'),
            });
            recordResult(gameId, { won: false, attempts: nextGuesses.length, dayKey });
          }
        } else if (mode === 'daily' && dayKey) {
          saveDailyProgress(gameId, dayKey, {
            guesses: nextGuesses,
            won: false,
            lost: false,
            answersKey: answers.join('|'),
          });
        }
        return;
      }
      if (k === 'BACK') {
        setCurrent((s) => s.slice(0, -1));
        return;
      }
      if (current.length >= wordLength) return;
      // Accept anything single-character that the keyboard component sent us.
      setCurrent((s) => s + k);
    },
    [answers, current, dayKey, gameId, guesses, lost, maxGuesses, mode, validate, won, wordLength]
  );

  const reset = useCallback(() => {
    setGuesses([]);
    setCurrent('');
    setInvalid(false);
    setError(null);
    setWon(false);
    setLost(false);
  }, []);

  return {
    guesses,
    current,
    statusesPerBoard,
    solvedBoards,
    keyboardStatus,
    keyboardStatusByBoard,
    invalid,
    error,
    won,
    lost,
    hydrated,
    handleKey,
    reset,
  };
}

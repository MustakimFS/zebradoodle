import React from 'react';

const LEGEND = [
  { status: 'correct', label: 'Right letter, right place' },
  { status: 'present', label: 'Right letter, wrong place' },
  { status: 'absent', label: 'Not in the answer' },
];

function HowToPlay() {
  return (
    <div className="how-to-play">
      <h2>How to play</h2>
      <p>
        Zebradoodle is a small collection of guess-the-thing puzzles. Each one shares the same idea:
        type a guess, hit enter, and the colours tell you how close you got.
      </p>
      <div className="legend">
        {LEGEND.map((l) => (
          <div className="legend__row" key={l.status}>
            <span className={`legend__chip tile tile--${l.status} tile--filled`}>A</span>
            <span>{l.label}</span>
          </div>
        ))}
      </div>

      <h3>Wordle</h3>
      <p>Guess the 5-letter word in six tries.</p>

      <h3>Quordle</h3>
      <p>Solve four words at once. Every guess goes on all four boards. You have nine tries.</p>

      <h3>Sedecordle</h3>
      <p>Sixteen boards. Twenty-one guesses. A real marathon.</p>

      <h3>Nerdle</h3>
      <p>
        Guess an 8-character math equation, like <code>12+34=46</code>. Use digits 0&ndash;9, the
        operators <code>+ - * /</code>, and the equals sign <code>=</code>. The equation must
        balance and division must be exact.
      </p>

      <h3>Daily vs. practice</h3>
      <p>
        Daily mode gives every player the same puzzle each day and counts toward your streak.
        Practice mode plays as many puzzles as you like without affecting stats.
      </p>
    </div>
  );
}

export default HowToPlay;

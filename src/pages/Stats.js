import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatsPanel from '../components/StatsPanel';
import { getStats, clearAllProgress } from '../lib/storage';

const GAMES = [
  { id: 'wordle', label: 'Wordle', attempts: 6 },
  { id: 'quordle', label: 'Quordle', attempts: 9 },
  { id: 'sedecordle', label: 'Sedecordle', attempts: 21 },
  { id: 'nerdle', label: 'Nerdle', attempts: 6 },
];

function Stats() {
  const [tick, setTick] = useState(0);

  const onReset = () => {
    if (!window.confirm('Clear all saved progress and stats?')) return;
    clearAllProgress();
    setTick((t) => t + 1);
  };

  return (
    <div className="stats-page">
      <h2>Your stats</h2>
      <p className="muted">Stored only in this browser. Clearing them is permanent.</p>
      <div className="stats-page__grid">
        {GAMES.map((g) => {
          const stats = getStats(g.id);
          return (
            <section key={`${g.id}-${tick}`} className="stats-card">
              <header className="stats-card__head">
                <h3>{g.label}</h3>
                <Link to={`/${g.id}/daily`} className="btn btn--ghost btn--small">Play</Link>
              </header>
              <StatsPanel stats={stats} attempts={g.attempts} />
            </section>
          );
        })}
      </div>
      <div className="stats-page__actions">
        <button type="button" className="btn btn--danger" onClick={onReset}>
          Reset all progress
        </button>
      </div>
    </div>
  );
}

export default Stats;

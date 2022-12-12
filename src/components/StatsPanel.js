import React from 'react';

function pct(num, denom) {
  if (!denom) return 0;
  return Math.round((num / denom) * 100);
}

function StatsPanel({ stats, attempts }) {
  const dist = stats.distribution || {};
  const max = Math.max(1, ...Object.values(dist));
  const buckets = [];
  for (let i = 1; i <= attempts; i++) {
    buckets.push({ key: i, value: dist[i] || 0 });
  }
  return (
    <div className="stats-panel">
      <div className="stats-panel__row">
        <div className="stat">
          <div className="stat__value">{stats.played}</div>
          <div className="stat__label">Played</div>
        </div>
        <div className="stat">
          <div className="stat__value">{pct(stats.won, stats.played)}</div>
          <div className="stat__label">Win %</div>
        </div>
        <div className="stat">
          <div className="stat__value">{stats.currentStreak}</div>
          <div className="stat__label">Streak</div>
        </div>
        <div className="stat">
          <div className="stat__value">{stats.maxStreak}</div>
          <div className="stat__label">Max</div>
        </div>
      </div>
      <h3 className="stats-panel__heading">Guess distribution</h3>
      <div className="stats-panel__dist">
        {buckets.map((b) => (
          <div className="dist-row" key={b.key}>
            <span className="dist-row__label">{b.key}</span>
            <div className="dist-row__bar" style={{ width: `${(b.value / max) * 100}%` }}>
              <span>{b.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsPanel;

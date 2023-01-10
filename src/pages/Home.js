import React from 'react';
import { Link } from 'react-router-dom';

const MODES = [
  {
    id: 'wordle',
    title: 'Wordle',
    subtitle: '1 word · 6 guesses',
    description: 'Guess a 5-letter word in six tries.',
    accent: 'mode-card--green',
    glyph: 'W',
  },
  {
    id: 'quordle',
    title: 'Quordle',
    subtitle: '4 words · 9 guesses',
    description: 'Four boards, one keyboard. Solve them all.',
    accent: 'mode-card--yellow',
    glyph: 'Q',
  },
  {
    id: 'sedecordle',
    title: 'Sedecordle',
    subtitle: '16 words · 21 guesses',
    description: 'The full marathon. Sixteen boards at once.',
    accent: 'mode-card--blue',
    glyph: 'S',
  },
  {
    id: 'nerdle',
    title: 'Nerdle',
    subtitle: '1 equation · 6 guesses',
    description: 'Guess the math equation. Numbers and operators only.',
    accent: 'mode-card--purple',
    glyph: 'N',
  },
];

function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <h2>Pick a puzzle.</h2>
        <p>
          Four flavours of guess-the-thing. Play today&rsquo;s shared puzzle for
          your streak, or jump into practice and play as many as you like.
        </p>
      </section>
      <div className="home__grid">
        {MODES.map((m) => (
          <article key={m.id} className={`mode-card ${m.accent}`}>
            <header className="mode-card__head">
              <span className="mode-card__glyph">{m.glyph}</span>
              <div>
                <h3>{m.title}</h3>
                <p className="mode-card__sub">{m.subtitle}</p>
              </div>
            </header>
            <p className="mode-card__desc">{m.description}</p>
            <div className="mode-card__actions">
              <Link className="btn btn--primary" to={`/${m.id}/daily`}>Play today</Link>
              <Link className="btn btn--ghost" to={`/${m.id}/practice`}>Practice</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;

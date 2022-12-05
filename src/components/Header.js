import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TITLES = {
  '/': 'Zebradoodle',
  '/stats': 'Stats',
  '/how-to-play': 'How to play',
};

function pageTitle(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith('/wordle')) return 'Wordle';
  if (pathname.startsWith('/quordle')) return 'Quordle';
  if (pathname.startsWith('/sedecordle')) return 'Sedecordle';
  if (pathname.startsWith('/nerdle')) return 'Nerdle';
  return 'Zebradoodle';
}

function Header() {
  const { pathname } = useLocation();
  const title = pageTitle(pathname);
  return (
    <header className="app-header">
      <Link to="/" className="app-header__logo" aria-label="Zebradoodle home">
        <span className="logo-tile logo-tile--correct">Z</span>
        <span className="logo-tile logo-tile--present">D</span>
      </Link>
      <h1 className="app-header__title">{title}</h1>
      <nav className="app-header__nav">
        <Link to="/how-to-play" title="How to play" aria-label="How to play">?</Link>
        <Link to="/stats" title="Stats" aria-label="Stats">&#9783;</Link>
      </nav>
    </header>
  );
}

export default Header;

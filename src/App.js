import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Wordle from './pages/Wordle';
import Quordle from './pages/Quordle';
import Sedecordle from './pages/Sedecordle';
import Nerdle from './pages/Nerdle';
import Stats from './pages/Stats';
import HowToPlay from './pages/HowToPlay';
import ToastHost from './components/Toast';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/wordle/:mode(daily|practice)" component={Wordle} />
          <Route path="/quordle/:mode(daily|practice)" component={Quordle} />
          <Route path="/sedecordle/:mode(daily|practice)" component={Sedecordle} />
          <Route path="/nerdle/:mode(daily|practice)" component={Nerdle} />
          <Route path="/stats" component={Stats} />
          <Route path="/how-to-play" component={HowToPlay} />
          <Redirect to="/" />
        </Switch>
      </main>
      <footer className="app-footer">
        <span>Zebradoodle &middot; reconstructed from a 2022 Java prototype</span>
      </footer>
      <ToastHost />
    </div>
  );
}

export default App;

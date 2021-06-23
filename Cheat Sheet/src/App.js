import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import CheatSheet from './screens/CheatSheet/CheatSheet';
import Subjects from './screens/Subjects/Subjects';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/application"><CheatSheet /></Route>
          <Route path="/" ><Subjects /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

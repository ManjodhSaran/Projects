import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { } from '@material-ui/core';
import SearchPage from './pages/SearchPage/SearchPage';

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;

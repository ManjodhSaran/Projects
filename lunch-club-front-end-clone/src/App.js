import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from './pages/Landing';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Meetings from './pages/Meetings';
import Connections from './pages/Connections';
import Chat from './pages/Chat';
import FAQ from './pages/FAQ';
import Invite from './pages/Invite';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path='/login'><Login /></Route>
          <Route path='/home'><Home /></Route>
          <Route path='/meetings'><Meetings /></Route>
          <Route path='/invite'><Invite /></Route>
          <Route path='/connections'><Connections /></Route>
          <Route path='/chat'><Chat /></Route>
          <Route path='/settings'><Settings /></Route>
          <Route path='/faq'><FAQ /></Route>
          <Route path='/'><Landing /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

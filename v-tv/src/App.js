import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';
import Signup from './pages/Signup';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';

function App() {
  const [user] = useAuthState(auth);
  console.log(user)
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/room/:id">
            <Room />
          </Route>
          <Route path="/room">
            <CreateRoom />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

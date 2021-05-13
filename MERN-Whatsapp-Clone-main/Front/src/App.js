import React from 'react';
import './App.css';

import Header from './Header/Header';

import MainApp from './MainApp/MainApp';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login/Login';
import { useStateValue } from './StateProvider';
function App() {

  const [{ user }] = useStateValue();

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/" exact>
            {user ? <MainApp /> : <Redirect to="/login" />}
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;

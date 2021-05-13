import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Header from "./Header/Header";
import Home from './Home/Home';
import Checkout from './Checkout/Checkout';

import './App.css';
import Login from './Login/Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {

        dispatch({
          type: "SET_USER",
          user: authUser
        })

      } else {

        dispatch({
          type: "SET_USER",
          user: null
        })

      }
    });

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path="/" exact>
            <Header />
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;

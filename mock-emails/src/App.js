import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';
import Dashboard from './pages/Dashboard';
import Loading from './components/Loading';
import './styles/global.scss'

function App() {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="app">
      {!loading ?
        <Router>
          <Switch>
            {!user ?
              <Route path="/"> <Login /> </Route>
              :
              <Route path="/"> <Dashboard /> </Route>
            }
          </Switch>
        </Router>
        :
        <Loading />
      }
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import routes from './config/route';
import { login, selectUser } from './features/appSlice';
import { auth, studentsRef, teachersRef } from './utils/firebase';

function App() {
  const userData = useSelector(selectUser);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  console.log(userData);
  console.log(user);

  useEffect(() => {
    if (user) {
      const email = user.email;
      const id = email.split('@')[0];
      if (email.includes('teacher')) {
        teachersRef.doc(id).get()
          .then(user => dispatch(login({ ...user.data(), timestamp: '' })));
      } else if (email.includes('student')) {
        studentsRef.doc(id).get()
          .then(user => dispatch(login({ ...user.data(), timestamp: '' })));
      } else {
        auth.signOut()
      }
    }
  }, [user])

  return (
    <div className="app">
      <Router>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => (
                  <route.component
                    name={route.name}
                    {...props}
                    {...route.props}
                  />
                )}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';

import './App.css';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import Widgets from './Widgets/Widgets';
import Login from './Login/Login';
import { useStateValue } from './StateProvider';

function App() {

  const [{ user }] = useStateValue();

  return (
    <div className="app">

      {!user ? <Login /> : (
        <>
          <Header />

          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        </>
      )}
      <div className="app__footer">
        <p>About • Help • Press • API • Jobs • Privacy • Terms • LocationsTop • Accounts • Hashtags • Language</p>
        <h4>© 2020 FACEBOOK</h4>
      </div>
    </div>
  );
}

export default App;

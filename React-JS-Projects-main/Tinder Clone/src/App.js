import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import TinderCard from 'react-tinder-card';

import './App.css';
import Chats from './Chats/Chats';
import ChatScreen from './ChatScreen/ChatScreen';
import Header from './Header/Header';
import SwipeButtons from './SwipeButtons/SwipeButtons';
import TinderCards from './TinderCards/TinderCards';


function App() {
  return (
    <div className="app">

      <Router>
        <Switch>
          <Route path="/chat/:person">
            <Header backButton="/chat" />
            <ChatScreen />
          </Route>
          <Route path="/chat">
            <Header backButton="/" />
            <Chats />
          </Route>

          <Route path="/" exact>
            <Header />
            <TinderCards />
            <SwipeButtons />
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;

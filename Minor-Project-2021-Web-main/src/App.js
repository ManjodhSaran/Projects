import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import NotesApp from './components/NotesApp/NotesApp';
import AdminBlock from './components/AdminBlock/AdminBlock';
import Home from './components/Home/Home';
import Notification from './components/Notification/Notification';
import StoreIP from './utils/storeIP';
import Online from './utils/Online';
import SetupApp from './components/SetupApp/SetupApp';
import LoginPage from './components/LoginPage/LoginPage';
import Contact from './components/Contact/Contact';
import UserPage from './components/UserPage/UserPage';
import Page404 from './components/Page404/Page404';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Messenger from './components/Messenger/Messenger';
import AppPin from './components/AppPin/AppPin';
import AndroidApp from './components/AndroidApp/AndroidApp';
import NotesFromId from './components/NotesApp/NotesFromId/NotesFromId';
function App() {
  return (
    <div className="app">
      <div className="circle1"></div>
      <div className="circle2"></div>
      <Router>
        <Header />
        <AppPin />
        <Switch>
          <Route path="/login" ><LoginPage /></Route>
          <Route path="/contact" ><Contact /></Route>
          <Route path="/admin" ><AdminBlock /></Route>
          <Route path="/setup application" ><SetupApp /></Route>
          <Route path="/android" ><AndroidApp /></Route>
          <Route path="/application">{props => <NotesApp {...props} />}</Route>
          <Route path="/user/favorites">{props => <Bookmarks {...props} />}</Route>
          <Route path="/user">{props => <UserPage {...props} />}</Route>
          <Route path="/notes" ><NotesFromId /></Route>
          <Route path="/404">{props => <Page404 {...props} />}</Route>
          <Route path="/">{props => <Home {...props} />}</Route>
        </Switch>
      </Router>
      <Messenger />
      <Notification />
      <Online />
    </div>
  );
}
export default App;
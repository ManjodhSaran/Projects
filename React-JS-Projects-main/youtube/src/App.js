import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Header from './Header/Header';
import Sidebar from "./Sidebar/Sidebar.js";
import RecommendedVideos from "./RecommendedVideos/RecommendedVideos.js";
import SearchPage from "./SearchPage/SearchPage.js";

import './App.css';

const App = () => {


  return (
    <div>
      <Router>
        <Header />

        <Switch>

          <Route path="/search/:query">
            <div className="app_page">
              <Sidebar />
              <SearchPage />
            </div>
          </Route>

          {/* HOME */}
          <Route path="/">
            <div className="app_page">
              <Sidebar />
              <RecommendedVideos />
            </div>
          </Route>

        </Switch>
      </Router>
    </div>
  )
};


export default App;

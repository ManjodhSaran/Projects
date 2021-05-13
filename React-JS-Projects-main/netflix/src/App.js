import React from 'react';

import Rows from './Rows/Rows'
import Header from './Header/Header'
import Banner from './Banner/Banner'

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Rows />
    </div>
  );
}

export default App;

// https://api.themoviedb.org/3/movie/550?api_key=3bf6926b8b40436e010dce6c7b6c8ede
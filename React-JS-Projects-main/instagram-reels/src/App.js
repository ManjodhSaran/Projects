import React, {useState ,useEffect} from 'react';

import VideoCard from './VideoCard/VideoCard.js'

import db from './firebase';
import './App.css';

function App() {
  const [reels, setReels] = useState([]);

  useEffect(() =>{
    db.collection("reels").onSnapshot(snapShot => {
      setReels(snapShot.docs.map(doc => doc.data()));
    })
  },[])

  return (
    <div className="App">
      <div className="app_top">
        <img className="app_logo" src="https://www.edigitalagency.com.au/wp-content/uploads/new-instagram-logo-png-transparent-light-858x857.png" alt="" />
        <h1>Reels</h1>
      </div>
      <div className="app_video">
      {reels.map(reel => <VideoCard 
          channel={reel.channel}
          avatar={reel.avatar}
          song={reel.song}
          url={reel.url}
          likes={reel.likes}
          shares={reel.shares}
      />)}
      {reels.map(reel => <VideoCard 
          channel={reel.channel}
          avatar={reel.avatar}
          song={reel.song}
          url={reel.url}
          likes={reel.likes}
          shares={reel.shares}
      />)}
      </div>
    </div>
  );
}

export default App;

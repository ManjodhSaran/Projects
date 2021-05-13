import React, { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import VideoCard from './VideoCard/VideoCard';

function App() {

  const [videos, setVideos] = useState([])

  useEffect(() => {

    db
      .collection("videos")
      .onSnapshot(snapshot =>
        setVideos(snapshot.docs.map(doc => doc.data()))
      )

  }, [])

  return (
    <div className="app">
      <div className="app__logo">
        <img className="app__logo1 invert" src="https://cdn.iconscout.com/icon/free/png-512/tiktok-2270636-1891163.png" alt="tiktok" />
        <img className="app__logo2" src="https://lh3.googleusercontent.com/proxy/tTzclSmU8-hOYdp9saHb5f12ilx-s9HAPvhU0Uaf1DYipg5PG7KMAawzMbPeatKCXIiP2qPmDGqaXP3Edic9JtDZDnZmDtrZ2uGSGkFVD2RefmxRtiE" alt="tiktok" />

      </div>
      <div className="app__videos">
        {videos.map(({ channel, url, desc, song, likes, messages, shares }) =>
          <VideoCard
            channel={channel}
            videoUrl={url}
            desc={desc}
            song={song}
            likes={likes}
            messages={messages}
            shares={shares}
          />
        )}
      </div>
    </div>
  );
}

export default App;
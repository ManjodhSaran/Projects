import React, {useState, useRef} from 'react';

import './VideoCard.css';

import VideoHeader from './VideoHeader/VideoHeader';
import VideoFooter from './VideoFooter/VideoFooter';

function VideoCard({channel,likes,shares,song, url ,avatar}) {
    const[isVideoPlaying ,setIsVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    const onVideoPress = () => {
        if(isVideoPlaying){
            videoRef.current.pause();
            setIsVideoPlaying(false);
        }else{
            videoRef.current.play();
            setIsVideoPlaying(true);
        }
    }

    return (
        <div className="videocard">
            <VideoHeader />

            <video 
            ref={videoRef}
            onClick={onVideoPress}
            className="videocard-video" 
            src={url}
            alt="Reels-videos" 
            loop />

            <VideoFooter 
                channel={channel}
                avatar={avatar}
                song={song}
                url={url}
                likes={likes}
                shares={shares}
            />
        </div>
    )
}

export default VideoCard;

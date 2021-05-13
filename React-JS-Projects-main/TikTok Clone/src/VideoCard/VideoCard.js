import React, { useRef, useState } from 'react'

import './VideoCard.css'

import Ticker from 'react-ticker'
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MessageIcon from "@material-ui/icons/Message";
import ShareIcon from "@material-ui/icons/Share";

const VideoCard = ({ channel, desc, videoUrl, song, likes, shares, messages }) => {
    const [playing, setPlaying] = useState(false);
    const [liked, setLiked] = useState(false);
    const videoRef = useRef(null);

    const onVideoPress = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false)
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    }


    return (
        <div className="videoCard">
            <video
                ref={videoRef}
                loop
                onClick={onVideoPress}
                src={videoUrl}
            ></video>

            <div className="videoCard__sidebar">
                <div className="sidebar__button">
                    {liked ?
                        <FavoriteIcon onClick={(e) => setLiked(false)} fontSize="large" />
                        :
                        <FavoriteBorderIcon onClick={(e) => setLiked(true)} fontSize="large" />
                    }
                    <p>{liked ? likes + 1 : likes}</p>
                </div>
                <div className="sidebar__button">
                    <MessageIcon fontSize="large" />
                    <p>{messages}</p>
                </div>
                <div className="sidebar__button">
                    <ShareIcon fontSize="large" />
                    <p>{shares}</p>
                </div>
            </div>

            <div className="videoCard__footer">
                <div className="videoCard__footerText">
                    <h3>@{channel}</h3>
                    <p className="footer__desc">{desc}</p>
                    <MusicNoteIcon className="footer__icon" />
                    <Ticker className="videoCard__ticker" mode="smooth">
                        {() => (
                            <p>{song}</p>
                        )}
                    </Ticker>
                </div>
                <img className={playing && "spin"} src="https://pngimg.com/uploads/vinyl/vinyl_PNG100.png" alt="record" />
            </div>
        </div>
    )
}

export default VideoCard

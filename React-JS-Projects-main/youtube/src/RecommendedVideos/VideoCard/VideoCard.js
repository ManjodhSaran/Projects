import React from 'react';

import { Avatar } from '@material-ui/core';

import "./VideoCard.css"

function VideoCard({ image, title, channelName, channelLogo, views, timestamp }) {
    return (
        <div className="videocard">
            <img src={image} alt="" />
            <div className="videocard_info">
                <Avatar className="videocard_avatar"
                    alt={channelName}
                    src={channelLogo}
                />
                <div className="video_text">
                    <h4>{title}</h4>
                    <p>{channelName}</p>
                    <p>{views} • {timestamp}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;

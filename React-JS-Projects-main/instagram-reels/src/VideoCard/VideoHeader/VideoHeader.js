import React from 'react';

import "./VideoHeader.css";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InstagramIcon from '@material-ui/icons/Instagram';

function VideoHeader() {
    return (
        <div className="videoheader">
            <ArrowBackIosIcon />
            <h3>Reels</h3>
            <InstagramIcon />
        </div>
    )
}

export default VideoHeader;

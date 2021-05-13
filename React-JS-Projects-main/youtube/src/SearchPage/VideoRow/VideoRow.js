import React from 'react';

import './VideoRow.css';

function VideoRow({ views, subs, desc, title, channel, image, timestamp }) {
    return (
        <div className="videorow">
            <img src={image} alt="" />
            <div className="videorow-text">
                <h4>{title}</h4>
                <p>{channel} • <span>{subs} subscribers</span> {views} views • {timestamp}</p>
                <p className="videorow-desc">{desc}</p>
            </div>
        </div>
    )
}

export default VideoRow;

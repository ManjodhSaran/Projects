import React from 'react';

import { Avatar } from "@material-ui/core"

import VerifiedIcon from '@material-ui/icons/CheckCircle';

import './ChannelRow.css'

function ChannelRow({ image, channel, verified, subs, noOfVideos, desc }) {
    return (
        <div className="channelrow">
            <Avatar className="channelrow-image" src={image} alt={channel} />
            <div className="channelrow-text">
                <h4>{channel}{verified && <VerifiedIcon />}</h4>
                <p> {subs} subscribers • {noOfVideos} videos </p>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default ChannelRow;

import React from 'react';

import "./VideoFooter.css";

import {Button , Avatar} from "@material-ui/core";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Ticker from 'react-ticker';

function VideoFooter({channel , song , likes , shares , avatar}) {
    return (
        <div className="videofooter">
            <div className="videofooter-text">
                <Avatar src={avatar} alt=""/>
                <h3>{channel} . <Button>Follow</Button></h3>
            </div>
            <div className="videofooter_ticker">
                <MusicNoteIcon className="videofooter-icon" />
                <Ticker mode="smooth">
                    {( {index }) => (
                        <>
                            <h1>{song}</h1>
                        </>
                    )}
                </Ticker>
            </div>
            <div className="videofooter-actions">
                <div className="videofooter-actions-left">
                    <FavoriteIcon fontSize="large"/>
                    <ModeCommentIcon fontSize="large" />
                    <SendIcon fontSize="large" />
                    <MoreHorizIcon fontSize="large" />
                </div>
                <div className="videofooter-actions-right">
                    <div className="videofooter-stat">
                        <FavoriteIcon />
                        <p>{likes}</p>
                    </div>
                    <div className="videofooter-stat">
                        <ModeCommentIcon />
                        <p>{shares}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoFooter

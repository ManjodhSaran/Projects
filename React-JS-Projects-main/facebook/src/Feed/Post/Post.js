import React from 'react'

import './Post.css'
import { Avatar } from '@material-ui/core'

// ICONS
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Post({ profilePic, image, username, timestamp, message }) {

    return (
        <div className="post">

            <div>
                <div className="post__top">
                    <Avatar src={profilePic} className="post__avatar" />
                    <div className="post__topInfo">
                        <h4 className="post__username">{username}</h4>
                        <p>{new Date(timestamp * 1000).toUTCString()}</p>
                    </div>
                </div>

                <div className="post__bottom">
                    <p>{message}</p>
                </div>
            </div>

            <div>
                <img className="post__image" src={image} alt="post__image" />
            </div>

            <div className="post__options">
                <div className="post__option">
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>
                <div className="post__option">
                    <ChatBubbleOutlineOutlinedIcon />
                    <p>Comment</p>
                </div>
                <div className="post__option">
                    <NearMeIcon />
                    <p>Share</p>
                </div>
                <div className="post__option">
                    <AccountCircleIcon />
                    <ExpandMoreIcon />
                </div>
            </div>

        </div>
    )
}

export default Post

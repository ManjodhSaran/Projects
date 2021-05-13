import React, { useEffect, useState } from 'react'

import './ChatHeader.css'
import { Avatar, IconButton } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import SearchIcon from '@material-ui/icons/Search';
import db from '../../../firebase/firebase';
import { useStateValue } from '../../../StateProvider';


function ChatHeader({ username, image }) {

    return (
        <div className="chat-header">
            <Avatar className="chat-header-avatar" src={image} />
            <div className="chat-header-user-info">
                <h3>{username}</h3>
                <p>Last Seen at...</p>
            </div>
            <div>
                <IconButton>
                    <SearchIcon className="chat-header-icon chat-header-search" />
                </IconButton>

                <IconButton>
                    <AttachFileIcon className="chat-header-icon chat-header-attach" />
                </IconButton>

                <IconButton>
                    <MoreVertIcon className="chat-header-icon chat-header-more" />
                </IconButton>
            </div>
        </div>
    )
}

export default ChatHeader

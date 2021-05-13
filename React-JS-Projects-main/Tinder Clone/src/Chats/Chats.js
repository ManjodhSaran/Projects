import React from 'react'
import Chat from './Chat/Chat'

import './Chats.css'
const Chats = () => {
    return (
        <div className="chats">
            <Chat
                name="Ethina"
                message="ok.."
                timestamp="35 minutes ago"
                profilePic={"https://cache.desktopnexus.com/thumbseg/850/850360-bigthumbnail.jpg"}
            />
            <Chat
                name="ellen"
                message="Whats up♥?"
                timestamp="3 hours ago"
                profilePic={"https://cache.desktopnexus.com/thumbseg/2420/2420197-bigthumbnail.jpg"}
            />
            <Chat
                name="Amber"
                message="meet at 3"
                timestamp="2 days ago"
                profilePic={"https://globalwhitepeoplehome.files.wordpress.com/2018/08/white-face-models-2.jpeg"}
            />
            <Chat
                name="Selena"
                message="ok bye."
                timestamp="1 week ago"
                profilePic={"https://i.pinimg.com/736x/95/28/4a/95284a3cbae38d4888fca0b75720138b.jpg"}
            />

        </div>
    )
}

export default Chats

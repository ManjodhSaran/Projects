import React from 'react'
import ChatHeader from './ChatHeader/ChatHeader'

import './Chat.css'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message/Message';

const Chat = () => {
    return (
        <div className="chat">
            <ChatHeader />

            <div className="chat__message">
                <Message />
                <Message />
                <Message />
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize="large" />

                <form>
                    <input placeholder="message" />
                    <button className="chat__inputButton" type="submit" hidden>send</button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>

            </div>

        </div>
    )
}

export default Chat

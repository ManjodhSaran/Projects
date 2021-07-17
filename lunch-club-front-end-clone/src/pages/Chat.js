import React from 'react'
import Header from '../components/Header'
import '../styles/Chat.scss'

const Chat = () => {
    return (
        <div className='chat'>
            <Header active={5} />
            <div className="chat__content">
                <p>Chat with users you meet on Lunchclub!</p>
                <h3>Sign up for a meeting!</h3>
            </div>
        </div>
    )
}

export default Chat

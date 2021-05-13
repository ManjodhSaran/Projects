import { Avatar } from '@material-ui/core';
import React, { useState } from 'react'

import './ChatScreen.css'
const ChatScreen = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            name: "Ellen",
            image: "...",
            message: "Hello"
        },
        {
            name: "ffsf",
            image: "...",
            message: "Whats up♥?"
        },
        {
            message: "hello there"
        }
    ]);

    const handleSend = (e) => {
        e.preventDefault();

        setMessages([...messages, { message: input }]);
        setInput("");
    }

    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">YOU MATCHED WITH ELLEN ON 10/10/20</p>

            {messages.map(message => (
                <div className="chatScreen__message">
                    {message.name && <Avatar />}
                    <p className={!message.name && "userMessage"}>{message.message}</p>
                </div>
            ))}

            <form className="charScreen__input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleSend} type="submit">Send</button>
            </form>
        </div>
    )
}

export default ChatScreen

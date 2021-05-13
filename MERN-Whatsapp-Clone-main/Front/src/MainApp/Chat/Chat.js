import React, { useState, useEffect } from 'react'

import ChatHeader from './ChatHeader/ChatHeader';
import ChatBody from './ChatBody/ChatBody';
import ChatInput from './ChatInput/ChatInput';

import './Chat.css'
import { useStateValue } from '../../StateProvider';
import db from '../../firebase/firebase';
function Chat() {

    const [{ user, otherUserId }, dispatch] = useStateValue();

    const [otherUser, setOtherUser] = useState([]);

    useEffect(() => {
        db.collection("uid_" + otherUserId)
            .doc("uid_" + otherUserId)
            .get()
            .then(res => setOtherUser(res.data()))

    }, [otherUserId])

    return (
        <div className="chat">
            <ChatHeader username={otherUser?.userInfo?.name} image={otherUser?.userInfo?.photoURL} />
            <ChatBody />
            <ChatInput />
        </div>
    )
}

export default Chat;

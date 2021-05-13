import React, { useState, useEffect } from 'react'

import FlipMove from 'react-flip-move';

import './ChatBody.css'
import Message from './Message/Message';
import db from '../../../firebase/firebase';
import { useStateValue } from '../../../StateProvider';

function ChatBody() {

    const [messages, setMessages] = useState([""])


    const [{ user, otherUserId }, dispatch] = useStateValue();


    useEffect(() => {

        db.collection("uid_" + user)
            .doc("uid_" + otherUserId).onSnapshot(snapshot => setMessages(snapshot.data()))

    }, [otherUserId])

    return (
        <div className="chat-body">
            {messages?.map(message => <Message key={`id`} user={true} username={`username`} message={`message`} timestamp={`2:30 pm`} />)}
            {/* <FlipMove>
                {messages.map(({ id, message, timestamp }) => <Message key={`id`} username={`username`} message={`message message message`} timestamp={`2:30 pm`} />)}
            </FlipMove> */}

        </div>
    )
}

export default ChatBody

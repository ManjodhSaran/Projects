import React, { useState, useEffect } from 'react'

import EmojiIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';


import './ChatInput.css'
import { IconButton } from '@material-ui/core';
import { useStateValue } from '../../../StateProvider';
import db from '../../../firebase/firebase';
import firebase from "firebase";

function ChatInput() {

    const [messageText, setMessageText] = useState("");

    const [messages, setMessages] = useState([]);

    const [userData, setUserData] = useState("");

    const [{ user, otherUserId }, dispatch] = useStateValue();

    const [serverTime, SetServerTime] = useState(firebase.firestore.FieldValue.serverTimestamp());

    useEffect(() => {

        db.collection("uid_" + user)
            .doc("uid_" + otherUserId).onSnapshot(snapshot => setMessages(snapshot.data()))

    }, [otherUserId]);

    console.log(user)

    const sendMessage = event => {

        event.preventDefault();
        SetServerTime(firebase.firestore.FieldValue.serverTimestamp())
        db.collection("uid_" + user.uid)
            .doc("uid_" + otherUserId)
            .set({
                userMessages: [
                    {
                        uid: user.uid,
                        username: user.name,
                        message: messageText,
                        timestamp: serverTime
                    }
                ]
            })

        setMessageText("");

    };

    // db.collection("Users").doc(user.uid).set({})


    return (
        <div className="chat-input">

            <IconButton>
                <EmojiIcon className="chat-input-emoji" />
            </IconButton>

            <form className="chat-input-form">
                <input
                    type="text"
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder="Type a message" />

                {messageText &&
                    <button onClick={sendMessage} type="submit" >
                        <SendIcon />
                    </button>
                }

            </form>

            <IconButton>
                <MicIcon className="chat-input-mic" />
            </IconButton>

        </div>
    )
}

export default ChatInput

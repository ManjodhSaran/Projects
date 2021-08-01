import { IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './ChatCardInput.css'

import EmojiIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/appSlice';
import { db, users } from '../../../../utils/firebase';
import firebase from 'firebase';

const ChatCardInput = ({ otherUserID }) => {
    const [messageText, setMessageText] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const user = useSelector(selectUser);

    const sendMessage = e => {
        e.preventDefault();

        if (user && otherUserID) {
            const ref = users.doc(user.uid).collection('chats').doc("data").collection(otherUserID);
            const ref2 = users.doc(otherUserID).collection('chats').doc("data").collection(user.uid);

            const messageBody = {
                uid: user.uid,
                username: user.displayName,
                message: messageText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }

            ref.add(messageBody)
            ref2.add(messageBody)
        }

        setMessageText("")
        setShowEmojis(false)
    };

    useEffect(() => {
        if (showEmojis) {
            document.onkeyup = e => {

                if (e.code === 'Escape')
                    setShowEmojis(false)
            };
        }
    }, [showEmojis])

    return (
        <div className="chatCardInput">
            <IconButton onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiIcon className="chatCardInput-emoji" />
            </IconButton>
            <div className="chatCardInput__emojiSelector">
                {showEmojis && <Picker
                    i18n={{
                        search: 'search',
                        categories: { search: '', recent: 'recent' },

                    }}
                    onClick={emoji => setMessageText(messageText.concat(emoji.native))}

                />}
            </div>
            <form className="chatCardInput-form">
                <input
                    type="text"
                    value={messageText}
                    autoFocus
                    onChange={e => setMessageText(e.target.value)}
                    placeholder="Type a message" />

                {messageText &&
                    <button
                        onClick={sendMessage}
                        type="submit" >
                        <SendIcon />
                    </button>
                }

            </form>

            <IconButton>
                {/* <MicIcon className="chatCardInput-mic" /> */}
            </IconButton>
        </div>
    )
}

export default ChatCardInput

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
import { appData } from '../../../../utils/firebase';
import firebase from 'firebase';

const ChatCardInput = () => {
    const [messageText, setMessageText] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const user = useSelector(selectUser);

    const sendMessage = e => {
        e.preventDefault();

        if (user) {
            const ref = appData.collection('serverChat');

            ref.add({
                uid: user.uid,
                username: user.role !== 'admin' ? `${user.displayName.toLowerCase()}${user.role === 'mod' ? '(mod)' : ''}` : "admin",
                message: messageText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }

        setMessageText("");
        setShowEmojis(false);
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
        </div>
    )
}

export default ChatCardInput

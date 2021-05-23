import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import MicIcon from '@material-ui/icons/Mic';
import firebase from "firebase"
import { useRef, useState } from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react"

function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const endOfMessageRef = useRef()
    const [input, setInput] = useState('')
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(chat.users, user)));

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{ ...message.data(), timestamp: message.data().timestamp?.toDate().getTime() }}
                />
            ))
        } else {
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={message} />
            ))
        }
    }

    const scrollToBottom = () => {
        endOfMessageRef.current?.scrollIntoView({
            behaviour: 'smooth',
            block: 'start'
        })
    }
    scrollToBottom();
    const sendMessage = e => {
        e.preventDefault();
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection('users')
            .doc(user.uid)
            .set(
                { lastSeen: timestamp },
                { merge: true }
            );

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: timestamp,
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput('');
        scrollToBottom();
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user)

    return (
        <Container>
            <Header>
                {recipient ?
                    <Avatar src={recipient.photoURL} />
                    :
                    <Avatar > {recipientEmail[0]}</Avatar>
                }
                <HeaderInfo>
                    <h3>{recipientEmail.charAt(0).toUpperCase() + recipientEmail.slice(1)}</h3>
                    {recipientSnapshot ?
                        <p>Last active:{" "}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            )
                                :
                                "Unavailable"
                            }
                        </p>
                        :
                        <p>Loading last active...</p>
                    }
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton><AttachFileIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef} />
            </MessageContainer>

            <InputContainer>
                <IconButton> <InsertEmoticonIcon /></IconButton>
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <IconButton> <MicIcon /></IconButton>
                <button type="submit" disabled={!input} onClick={sendMessage} hidden>send</button>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`

`;
const Input = styled.input`
    flex: 1;
    outline:0;
    border:none;
    border-radius:10px;
    background-color:whitesmoke;
    padding:20px;
    margin-left:15px;
    margin-right:15px;
`;
const InputContainer = styled.form`
    display:flex;
    align-items: center;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:white;
    z-index:100;
`;
const Header = styled.div`
    position:sticky;
    background-color:white;
    z-index:100;
    top:0;
    display:flex;
    padding:11px;
    height:80px;
    align-items: center;
    border-bottom:1px solid whitesmoke;
    justify-content:space-between
`;
const HeaderInfo = styled.div`
    flex:1;
    margin-left:15px;
    >h3 {
        margin-Bottom:3px;
    }
    >p{
        color:gray;
    }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
    padding:30px;
    background-image:url('https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png');
    background-color:rgba(229,222,216,.5);
    height:83.5vh;
    overflow:scroll;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overfle-style:none;
    scrollbar-width:none;
`;
const EndOfMessage = styled.div``;

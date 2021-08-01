import React, { useEffect, useState } from 'react'

import './ChatCard.css'

import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, CircularProgress, IconButton, withStyles } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ChatCardInput from './ChatCardInput/ChatCardInput';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../features/appSlice';
import { users } from '../../../utils/firebase';
import $ from "jquery"



const ChatCard = ({ query, user, index, activeManager, setActiveManager }) => {

    const [active, setActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const appUser = useSelector(selectUser);
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setActive(false)
        index === activeManager && setActive(true)
    }, [activeManager])

    const StyledBadge = withStyles((theme) => ({
        badge: {
            backgroundColor: user.state === "online" ? "#44b700" : "#FD2D00",
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: `${user.state === "online" ? "1px solid #44b700" : "0px"}`,
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }))(Badge);

    useEffect(() => {
        if (active && appUser) {
            users.doc(appUser.uid)
                .collection('chats').doc("data")
                .collection(user.userData.uid).orderBy("timestamp", 'asc')
                .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))

            setCounter(counter + 1)
        }
    }, [active]);

    // useEffect(() => {
    //     if (appUser && messages.length != 0) {
    //         (messages[messages.length - 1].uid === appUser.uid && counter > 0)
    //             && dispatch(showNotification(`New Messages`))
    //     }
    // }, [messages]);

    $("#chatBody").animate({ scrollTop: $('#chatBody').prop("scrollHeight") }, 400);

    const deleteChat = () => {
        if (active && appUser) {
            const ref = users.doc(appUser.uid).collection('chats').doc("data").collection(user.userData.uid);

            ref.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });
        }
    }

    return (
        <div className={`chatCard ${user.userData.uid === appUser?.uid && "chatCard--display"}`} >
            <div className="chatCard__header">
                <div className="chatCard__headerInfo" onClick={() => !active ? setActiveManager(index) : setActiveManager(false)}>
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                        variant="dot"
                    >
                        <Avatar src={user.userData.photoURL} />
                    </StyledBadge>
                    <div className="chatCard__headerTitle">
                        {query.lenght === 0 ?
                            <h4>{user.userData.displayName}{appUser?.uid === user.userData.uid && "(You)"}</h4>
                            :
                            <h4 dangerouslySetInnerHTML={{ __html: user.userData?.displayName?.toLowerCase().replace(new RegExp(query?.toLowerCase(), "g"), match => `<mark class="notesCard__titleHighlight">${match}</mark>`) }} />
                        }
                        {/* <h4>{ user.userData.displayName.toLowerCase().replace(new RegExp(query.toLowerCase(), "g"), match => `<mark class="notesCard__titleHighlight">${match}</mark>`)}}</h4> */}
                        {user.state !== 'online' && <p>{`last seen ${user.last_changed}`}</p>}
                    </div>
                </div>

                <div>
                    {/* <IconButton onClick={() => !active ? setActiveManager(index) : setActiveManager(false)}><ExpandMoreIcon className={`chatCard__headerIcon ${active && "chatCard__HeaderIcon--active"}`} /></IconButton> */}
                    {(active && messages.length !== 0) && <IconButton title={"Clear Chat"} onClick={deleteChat}><DeleteIcon /></IconButton>}
                </div>
            </div>


            {<div className={`chatCard__body ${active && "chatCard__body--active"} animate__animated animate__fadeIn`}>
                <div id="chatBody" className="chatCard__bodyMessages">

                    {messages ?
                        messages.map((message, index) =>
                            <div key={message.uid + index} className={`chatCard__bodyMessage animate__animated animate__fadeInUp ${appUser?.uid === message.uid && "chatCard__bodyMessage--user"}`}>
                                <h4>{message.message}</h4>
                                <p>{message.timestamp?.toDate()?.toTimeString().substr(0, 5)}</p>
                            </div>)
                        :
                        <CircularProgress />
                    }
                </div>
                {active && <ChatCardInput otherUserID={user.userData.uid} />}
            </div>}


        </div>
    )
}

export default ChatCard

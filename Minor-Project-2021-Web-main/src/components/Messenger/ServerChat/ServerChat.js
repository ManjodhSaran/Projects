import React, { useEffect, useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, CircularProgress, IconButton } from '@material-ui/core';
import ChatCardInput from './ChatCardInput/ChatCardInput';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../features/appSlice';
import { appData, db } from '../../../utils/firebase';
import $ from "jquery"

import './ServerChat.css'
const ServerChat = ({ user, index, activeManager, setActiveManager }) => {

    const [active, setActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const appUser = useSelector(selectUser);
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setActive(false)
        index === activeManager && setActive(true)
    }, [activeManager])

    useEffect(() => {
        if (active && appUser) {
            appData
                .collection('serverChat').orderBy("timestamp", 'asc')
                .onSnapshot(snapshot =>
                    setMessages(snapshot.docs.map(doc => doc.data()))
                )
            setCounter(counter + 1)
        }
    }, [active]);

    $("#chatBody").animate({ scrollTop: $('#chatBody').prop("scrollHeight") }, 400);

    const deleteChat = () => {
        if (active && appUser) {
            const ref = appData.collection('serverChat');

            ref.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });
        }
    }

    return (
        <div className={`chatCard chatCard__Server`} >
            <div className="chatCard__header">
                <div className="chatCard__headerInfo" onClick={() => !active ? setActiveManager(index) : setActiveManager(false)}>

                    <Avatar src={"https://image.flaticon.com/icons/png/512/1428/1428190.png"} />
                    <div className="chatCard__headerTitle">
                        <h4>Server Chat</h4>
                    </div>
                </div>

                <div>
                    {(active && messages.length !== 0 && appUser.role === 'admin') && <IconButton title={"Clear Chat"} onClick={deleteChat}><DeleteIcon /></IconButton>}
                </div>
            </div>


            {<div className={`chatCard__body ${active && "chatCard__body--active"} animate__animated animate__fadeIn`}>
                <div id="chatBody" className="chatCard__bodyMessages">

                    {messages ?
                        messages.map((message, index) =>
                            <div key={message.uid + index} className={`chatCard__bodyMessageServer animate__animated animate__fadeInUp ${appUser?.uid === message.uid ? "chatCard__bodyMessageServer--user" : "chatCard__bodyMessageServer--left0"}`}>
                                <h5>{message.username.toLowerCase()}</h5>
                                <h4>{message.message}</h4>
                                <p>{message.timestamp?.toDate()?.toTimeString().substr(0, 5)}</p>
                            </div>)
                        :
                        <CircularProgress />
                    }
                </div>
                {active && <ChatCardInput />}
            </div>}


        </div>
    )
}

export default ServerChat

import React, { forwardRef } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Done';
import SeenIcon from '@material-ui/icons/DoneAll';

import "./Message.css"


const Message = forwardRef(({ user, username, message, timestamp }, ref) => (

    <div className={`message ${user && "message-user"}`} >
        <span className={user ? "message-arrow-user" : "message-arrow"}>◤</span>
        <p className="message-text" > {message}</p>
        <p className="message-timestamp">{timestamp}{user && <SeenIcon className="message-icon" />}</p>
        {/* message-timestamp */}
    </div>



)
);

export default Message;

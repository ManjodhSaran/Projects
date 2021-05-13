import React, { useState } from 'react'

import './ContactsHeader.css'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import StatusIcon from '@material-ui/icons/DonutLarge';


import { useStateValue } from '../../../StateProvider';

function ContactsHeader() {

    const [{ user }, dispatch] = useStateValue();

    return (
        <div className="contact-header">
            <Avatar className="contact-header-avatar" src={user.photoURL} />

            <div className="contact-header-right">
                <IconButton>
                    <StatusIcon className="contact-header-icon contact-header-status" />
                </IconButton>

                <IconButton>
                    <ChatIcon className="contact-header-icon contact-header-message" />
                </IconButton>

                <IconButton>
                    <MoreVertIcon className="contact-header-icon contact-header-more" />
                </IconButton>
            </div>
        </div>
    )
}

export default ContactsHeader
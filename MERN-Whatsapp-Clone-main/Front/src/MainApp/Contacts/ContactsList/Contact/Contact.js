import React from 'react'

import './Contact.css'
import { Avatar } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Done';
import SeenIcon from '@material-ui/icons/DoneAll';

function Contact({ avatar, title, msgStatus, lastmsg, time }) {
    return (
        <div className="contact">
            <Avatar className="contact-avatar" src={avatar} />

            <div className="contact-info">
                <h2>{title}</h2>
                <p className="contact-msg">
                    <p className="contact-msgStatus">{
                        msgStatus === "send" ? <SendIcon /> : <SeenIcon className={msgStatus === "seen" && "contact-icon-seen"} />
                    }</p>
                    <p className="contact-msgMessage">{lastmsg}</p>
                </p>
            </div>

            <p className="contact-timestamp">{time}</p>
        </div>
    )
}

export default Contact

//     < Contact
// avatar = "Bhavkeerat Singh"
// title = "Bhavkeerat Singh"
// msgStatus = "seen"
// // seen || deliver  || send
// lastmsg = "kidna"
// time = "2:30"
//     />
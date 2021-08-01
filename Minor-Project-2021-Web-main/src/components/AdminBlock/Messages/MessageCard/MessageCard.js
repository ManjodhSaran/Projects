import { Button } from '@material-ui/core'
import React from 'react'

import './MessageCard.css'
const MessageCard = ({ data, docID }) => {
    return (
        <div className="messageCard">
            <div className="messageCard__info">
                <h3>From: {data.user}<span>{data.timestamp?.toDate()?.toDateString()}</span></h3>
                <p>Email: {data.email}</p>
                <p>Phone Number: {data.phoneNumber}</p>
                {data.bug && <p>Bug: {data.bug}</p>}
                {data.issue && <p>Issue: {data.issue}</p>}
                {data.other && <p>Other: {data.other}</p>}
                <p>{data.timestamp?.toDate()?.toDateString()}</p>
            </div>
            <div className="messageCard__action">
                <Button variant="contained" className="message__button  bg-danger text-light">Remove Notes</Button>
                <Button variant="contained" className="message__button " color="primary">Ignores</Button>
                <Button variant="contained" className="message__button ">Mark for Review</Button>
                <Button className="flag__button bg-warning text-dark ">Remove Flag</Button>
            </div>
        </div>
    )
}

export default MessageCard

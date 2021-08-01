import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../../../features/appSlice'
import { db } from '../../../../utils/firebase'

import './FlagCard.css'
const FlagCard = ({ doc, documentID }) => {

    const dispatch = useDispatch();

    const handleRemove = () => {
        db
            .collection("admin")
            .doc("appData")
            .collection("flags")
            .doc(documentID)
            .delete()
            .then(() => dispatch(showNotification(`Deleted `)))
    }


    return (
        <div className="flagCard">
            <div className="flagCard__Info">
                <h3>{doc.message}</h3>
                <p>Title: {doc.doc.title}</p>
                <p>App Name: {doc.appName}</p>
                <p>Description: {doc.doc.description}</p>
                <p>Uploaded by: {doc.doc.username} on {doc.doc.timestamp?.toDate()?.toDateString()}</p>
                <p>Report by: {doc.username} on {doc.timestamp?.toDate()?.toDateString()}</p>
            </div>
            <div className="flagCard__Action">
                <Button variant="contained" className="flag__button  bg-danger text-light">Remove Notes</Button>
                <Button variant="contained" className="flag__button " color="primary">Ignore</Button>
                <Button variant="contained" className="flag__button ">Mark for Review</Button>
                <Button onClick={handleRemove} className="flag__button bg-warning text-dark">Remove Flag</Button>
            </div>
        </div>
    )
}

export default FlagCard

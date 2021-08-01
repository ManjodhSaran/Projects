import { Button } from '@material-ui/core'
import React from 'react'
import { repos } from '../../../../utils/firebase'

const BinItem = ({ data }) => {
    const restore = () => {
        repos.doc(data.repoId).collection(data.doc.subjectID).add()
    }
    return (
        <div>
            <div className="flagCard">
                <div className="flagCard__Info">
                    <h3>Title: {data.doc.title}</h3>
                    <p>App Name: {data.appName}</p>
                    <p>Description: {data.doc.description}</p>
                    <p>Uploaded by: {data.doc.username} on {data.doc.timestamp?.toDate()?.toDateString()}</p>
                    <p>Deleted on: {data.username} on {data.timestamp?.toDate()?.toDateString()}</p>
                </div>
                <div className="flagCard__Action">
                    <Button variant="contained" className="flag__button  bg-danger text-light">Remove from Server</Button>
                    <Button variant="contained" onClick={restore} className="flag__button " color="primary">Restore</Button>
                </div>
            </div>
        </div>
    )
}

export default BinItem

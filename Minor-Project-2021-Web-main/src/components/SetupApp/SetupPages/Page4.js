import React, { useEffect, useState } from 'react'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { appData } from '../../../utils/firebase';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase'

const Page4 = ({ repoId, name, user, makePrivate, setActivePage }) => {

    const history = useHistory();

    useEffect(() => {
        if (!repoId || !name) {
            setActivePage(4)
        }
    }, [name, repoId])

    const handleNext = (e) => {
        appData.collection("recents")
            .add({
                name: name,
                repoId: repoId,
                message: `<strong>${user.displayName}</strong> created <strong>${name}</strong> App `,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }).then(() =>
                history.replace(`/application/${repoId}`)
            )
    }

    return (
        <div className="setupApp__page4  animate__animated animate__flipInX">
            {makePrivate ?
                <h3>New <span>Private</span> Repository Created</h3>
                :
                <h3>New <span>Public</span> Repository Created</h3>
            }
            <h4>{`${name.toUpperCase().substr(0, 1)}${name.substr(1)}`}</h4>
            <button onClick={handleNext} className="setupPage__formButton">Go to App<ArrowForwardIcon className="setupPage__formIcon" /></button>
        </div>
    )
}

export default Page4

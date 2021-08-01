import React, { useEffect, useState } from 'react'
import { repos, users } from '../../../utils/firebase';
import firebase from 'firebase';
import NotesCard from '../RightSide/NotesCard/NotesCard';
import { Button, CircularProgress } from '@material-ui/core';
import { selectUser } from '../../../features/appSlice';
import { useSelector } from 'react-redux';

import './NotesFromId.css'
import { useHistory } from 'react-router';

const NotesFromId = () => {

    const user = useSelector(selectUser);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const params = window.location.search.split('&')
    const repoId = params[0].split('rq=')[1];
    const docId = params[2].split('nq=')[1];
    const subjectID = params[1].split('sq=')[1];
    const [starredID, setStarredID] = useState([]);
    const history = useHistory();

    useEffect(() => {
        repos.doc(repoId).collection(subjectID).doc(docId).get().then(doc => {
            if (doc.exists) {
                setData(doc.data())
            } else {
                setError("Notes Not Found")
            }
        })
    }, [])

    useEffect(() => {
        user && users.doc(user.uid).collection("starred").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setStarredID(snapshot.docs.map(doc => doc.id))
        })
    }, [user])

    return (
        <div className="bookmarks">
            {data.length !== 0 ?
                <NotesCard
                    key={data.id}
                    id={data.id}
                    subjectID={data.subjectID}
                    title={data.title}
                    description={data.description}
                    file={data.file}
                    username={data.uploadedBy}
                    timestamp={data.timestamp}
                    subjectName={data.subject}
                    anonymous={data.anonymous}
                    userID={data.userID}
                    starredList={starredID}
                />
                : (!error && <CircularProgress />)
            }
            {error &&
                <div className="notesFromId__error">
                    <div>
                        <p>{error}</p>
                        <Button variant="contained" onClick={() => history.replace('/')}>Home</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default NotesFromId

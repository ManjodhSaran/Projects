import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/appSlice';
import { users } from '../../utils/firebase';
import NotesCard from '../NotesApp/RightSide/NotesCard/NotesCard'
import './Bookmarks.css'
const Bookmarks = () => {
    const user = useSelector(selectUser);
    const [starred, setStarred] = useState([]);
    const [starredID, setStarredID] = useState([]);
    useEffect(() => user && users.doc(user.uid).collection("starred").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        setStarred(snapshot.docs.map(doc => doc.data()))
        setStarredID(snapshot.docs.map(doc => doc.id))
    }), [user])

    return (
        <div className="bookmarks">
            <div className="bookmarks__list">
                <h3>Starred Notes</h3>
                {starred ? starred.map(note =>
                    <NotesCard
                        key={note.id}
                        id={note.id}
                        subjectID={note.subjectID}
                        title={note.title}
                        description={note.description}
                        file={note.file}
                        username={note.uploadedBy}
                        timestamp={note.timestamp}
                        subjectName={note.subject}
                        anonymous={note.anonymous}
                        userID={note.userID}
                        starredList={starredID}
                    />
                ) : <CircularProgress />
                }
            </div>
        </div>
    )
}
export default Bookmarks
import React, { useEffect, useState } from 'react'
import { Button, CircularProgress } from '@material-ui/core';

import './RightSide.css';
import UploadNotes from '../UploadNotes/UploadNotes';
import NotesCard from './NotesCard/NotesCard';
import { db, repos, users } from '../../../utils/firebase';
import { selectRepoId, selectUser } from '../../../features/appSlice';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NotesSearch from '../NotesSearch/NotesSearch';
import NotesCategory from '../NotesCategory/NotesCategory';

const RightSide = ({ subjectID, setSubjectID }) => {
    const user = useSelector(selectUser);
    const [file, setFile] = useState(null);
    const [subjectTitle, setSubjectTitle] = useState("")
    const [notes, setNotes] = useState([])
    const history = useHistory();
    const [openUpload, setOpenUpload] = useState(false);
    const [starred, setStarred] = useState([]);
    const repoId = useSelector(selectRepoId);
    const [searchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");
    const [query2, setQuery2] = useState("");

    useEffect(() => {
        if (user) {
            users.doc(user.uid).collection("starred").onSnapshot(snapshot => {
                setStarred(snapshot.docs.map(doc => doc.id))
            })
        }
    }, [user])

    useEffect(() => {
        if (repoId) {
            const ref = repos.doc(repoId)
            ref.collection("subjects").onSnapshot(snapshot =>
                snapshot.docs.map(doc =>
                    doc.data().id === subjectID && setSubjectTitle(doc.data().name))

            )
            subjectID && ref.collection(subjectID)
                .orderBy("timestamp", "desc")
                .onSnapshot(snapshot =>
                    setNotes(snapshot.docs.map(doc => ({ id: doc.id, note: doc.data() })))
                )
        }

    }, [subjectID, repoId]);
    console.log(searchResult)
    console.log(query2)
    return (
        <div className="rightSide" >
            <div className="rightSide__header">
                <h2>{subjectTitle || "Notes will display below"}</h2>
                {user && <Button onClick={() => setOpenUpload(true)} variant="contained">Upload Notes</Button>}
            </div>
            { user && <UploadNotes openUpload={openUpload} setOpenUpload={setOpenUpload} subjectIDRef={subjectID} fileRef={file} />}
            {notes.length === 0 &&
                <div className="emptyNotes">
                    <h3>no notes available</h3>
                </div>
            }
            {notes.length !== 0 &&
                <div className="rightSide__searchContainer">
                    <NotesCategory
                        notes={notes}
                        subjectID={subjectID}
                        searchResult={searchResult}
                        setSearchResult={setSearchResult}
                        query={query2}
                        setQuery={setQuery2}
                        setNotes={setNotes}
                    />
                    <NotesSearch
                        notes={notes}
                        subjectID={subjectID}
                        searchResult={searchResult}
                        setSearchResult={setSearchResult}
                        query={query}
                        setQuery={setQuery}
                    />
                </div>
            }
            <div className="rightSide__body">
                {notes.length !== 0 ?
                    (query || query2 ?
                        (searchResult.length !== 0 ?
                            searchResult.map(({ id, note }) =>
                                <NotesCard
                                    key={id}
                                    id={id}
                                    subjectID={subjectID}
                                    title={note.title.toLowerCase().replace(new RegExp(query.toLowerCase(), "g"), match => `<mark class="notesCard__titleHighlight">${match}</mark>`)}
                                    description={note.description}
                                    file={note.file}
                                    noteData={note}
                                    fileURL={note.fileURL}
                                    pageCount={note.pageCount}
                                    username={note.uploadedBy}
                                    timestamp={note.timestamp}
                                    subjectName={note.subject}
                                    anonymous={note.anonymous}
                                    userID={note.userID}
                                    starredList={starred}
                                />
                            )
                            :
                            <div className="emptyNotes">
                                <h3>No Result</h3>
                            </div>
                        ) :
                        notes.map(({ id, note }) =>
                            <NotesCard
                                key={id}
                                noteData={note}
                                id={id}
                                subjectID={subjectID}
                                title={note.title}
                                description={note.description}
                                file={note.file}
                                fileURL={note.fileURL}
                                pageCount={note.pageCount}
                                username={note.uploadedBy}
                                timestamp={note.timestamp}
                                subjectName={note.subject}
                                anonymous={note.anonymous}
                                userID={note.userID}
                                starredList={starred}
                            />
                        )
                    ) :
                    <div className={`circularProgress`}>
                        <CircularProgress color="primary" />
                    </div>
                }
            </div>
        </div>
    )
}
export default RightSide
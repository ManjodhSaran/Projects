import React, { useEffect, useState } from 'react'
import './NotesApp.css';
import Sidebar from './Sidebar/Sidebar';
import RightSide from './RightSide/RightSide';
import { Redirect, Route } from 'react-router-dom';
import { setRepoId } from '../../features/appSlice';
import { useDispatch } from 'react-redux';
// import PdfViewer from '../PdfViewer/PdfViewer';
import NotesFromId from './NotesFromId/NotesFromId';
function NotesApp(props) {
    const dispatch = useDispatch();
    const [subjectID, setSubjectID] = useState(null);
    useEffect(() => {
        window.location.pathname.split('/')[2] && dispatch(setRepoId(window.location.pathname.split('/')[2]))
        setSubjectID(window.location.pathname.split('/')[3])
    }, [props])
    return (
        <div
            // data-aos="fade-up" data-aos-duration="100000" 
            className="notesApp"
        >
            <Sidebar subjectID={subjectID} setSubjectID={setSubjectID} />
            <Route path="/application" exact><Redirect path="/" /></Route>
            {subjectID ?
                <Route path={`/application/:repoId/:subjectID`} exact><RightSide subjectID={subjectID} setSubjectID={setSubjectID} /></Route>
                :
                <Route path="/application/:repoId" exact><RightSide subjectID={subjectID} setSubjectID={setSubjectID} /></Route>
            }
            {/* <PdfViewer /> */}
        </div>
    )
}
export default NotesApp
import React, { useEffect } from 'react'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import AddIcon from '@material-ui/icons/Add';
import firebase from 'firebase'
import './Sidebar.css'
import SidebarOption from './SidebarOption/SidebarOption';
import { useState } from 'react';
import { repos, users } from '../../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectRepoId, selectUser, setAppSubjects, showNotification } from '../../../features/appSlice';
import { useHistory } from 'react-router-dom';
import AddSubjectModal from './AddSubjectModal';
const Sidebar = ({ subjectID, setSubjectID }) => {
    const [subjects, setSubjects] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [smallSidebar, setSmallSidebar] = useState(false);
    const [createdBy, setCreatedBy] = useState('');
    const [active, setActive] = useState(subjectID);
    const [addSubjectActive, setAddSubjectActive] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory()
    const repoId = useSelector(selectRepoId);
    const repoName = repoId && repoId.split('-')[1]
    const user = useSelector(selectUser);
    useEffect(() => {
        if (repoId) {
            repos.doc(repoId)
                .get().then((doc) => {
                    if (doc.exists) {
                        setCreatedBy(doc.data().createdBy);
                        !doc.data().active && users.doc(user.uid).set({ defaultApp: null }, { merge: true }).then(() => history.push('/'))
                    } else {
                        history.replace('/404')
                    }
                })
        }
    }, [repoId, history, user]);

    useEffect(() => {
        if (repoId) {
            const ref = repos.doc(repoId).collection("subjects")
            ref.orderBy('timestamp', 'asc').onSnapshot(snapshot =>
                setSubjects(snapshot.docs.map(doc => doc.data()))
            )
            subjects.length !== 0 && (subjects !== [] && dispatch(setAppSubjects(subjects)))
        }
        document.title = `${repoName && repoName.toUpperCase()} || Notes App`
    }, [repoId]);

    useEffect(() => {
        if (subjects[0]) {
            !subjectID && setActive(subjects[0].id)
            !subjectID && history.replace(`/application/${repoId}/${subjects[0].id}`);
        }
    }, [subjects])

    return (
        <div className="sidebar">
            <div onClick={() => showSidebar ? setShowSidebar(false) : setShowSidebar(true)} className="sidebar__header">
                {showSidebar ? <ArrowBackIosIcon className="sidebar__headerIcon sidebar__arrowIcon" /> : <MenuOpenIcon className="sidebar__headerIcon" />}
                {!smallSidebar ? <h2 className="sidebar__headertitle">Subjects</h2> : <h2 className="sidebar__headertitle sidebar__headertitle--small">Sub</h2>}
                {smallSidebar ? <FormatIndentIncreaseIcon className="smallSidebarIcon" onClick={() => setSmallSidebar(false)} /> : <FormatIndentDecreaseIcon className="smallSidebarIcon smallSidebarIcon-other" onClick={() => setSmallSidebar(true)} />}
            </div>
            <div className={`sidebar__body ${showSidebar && "showSidebar"}`}>
                {subjects.map(({ name, id }, index) =>
                    <SidebarOption
                        key={index, id}
                        title={smallSidebar ? id : name}
                        subjectID={id}
                        setShowSidebar={setShowSidebar}
                        active={active}
                        setActive={setActive}
                        setSubjectID={setSubjectID}
                    />
                )}
                {createdBy === user?.uid &&
                    <div className="sidebarOption  animate__animated animate__fadeInUp">
                        {smallSidebar ?
                            <h2 onClick={() => setAddSubjectActive(true)} className="sidebarOption__addSubject sidebarOption__addSubject-small"><AddIcon className="sidebarOption__addSubjectIcon " /></h2>
                            :
                            <h2 onClick={() => setAddSubjectActive(true)} className="sidebarOption__addSubject">Add Subject <AddIcon className="sidebarOption__addSubjectIcon " /></h2>
                        }
                    </div>
                }
            </div>
            {addSubjectActive && <AddSubjectModal addSubjectActive={addSubjectActive} subjects={subjects} setAddSubjectActive={setAddSubjectActive} />}
        </div>
    )
}
export default Sidebar
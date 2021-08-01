import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectRepoId } from '../../../../features/appSlice';

import './SidebarOption.css'
const SidebarOption = ({ title, subjectID, id, setShowSidebar, active, setActive, setSubjectID }) => {

    const repoId = useSelector(selectRepoId)

    const history = useHistory()

    const handleClick = () => {
        if (repoId) {
            history.push(`/application/${repoId}/${subjectID}`)
            setShowSidebar(false)
            setSubjectID(id)
        }
        setActive(subjectID)
    }

    return (
        <div onClick={handleClick} className={`sidebarOption ${active === subjectID && "sidebarOption--active animate__animated  animate__animated animate__fadeIn"}`}>
            <h2>{title}</h2>
        </div>
    )
}

export default SidebarOption

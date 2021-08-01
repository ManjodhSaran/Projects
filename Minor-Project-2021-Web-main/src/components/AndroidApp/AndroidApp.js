import { Button, CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { appData } from '../../utils/firebase';
import './AndroidApp.css'
const AndroidApp = () => {
    const [showProgress, setShowProgress] = useState(false);
    const handleClick = () => {
        setShowProgress(true)
        appData.get().then((doc) => doc.data().apkDownloadLink && window.location.replace(doc.data().apkDownloadLink)).then(() => setShowProgress(false));
    }
    return (
        <div className="androidApp">
            <div className='androidApp__left'>
                <h1>Download Android App</h1>
                <Button variant="contained" endIcon={showProgress && <CircularProgress size={17} color="white" />} onClick={handleClick} className="apkButton">Download APK</Button>
            </div>
            <div className='androidApp__right'>
                <img className="android__demo" src="https://firebasestorage.googleapis.com/v0/b/gne-notes.appspot.com/o/assests%2Fandroid__demo.png?alt=media&token=68302ad4-2dd9-48db-b095-adcdbb87e9aa" alt="" />
            </div>
        </div>
    )
}
export default AndroidApp
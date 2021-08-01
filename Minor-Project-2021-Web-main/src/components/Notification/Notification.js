import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectNotification, hideNotification } from '../../features/appSlice';
import ReactAudioPlayer from 'react-audio-player';
import './Notification.css'
const Notification = () => {
    const dispatch = useDispatch()
    const message = useSelector(selectNotification);
    useEffect(() => {
        message && setInterval(() => {
            dispatch(hideNotification())
            document.getElementById("notificationID") && document.getElementById("notificationID").remove()
        }, 3000);
    }, [message, dispatch])
    return (
        message &&
        <div id="notificationID" className="notification">
            <div className="notification__container">
                <p>{message}</p>
                <ReactAudioPlayer
                    src="/sound/sound2.ogg"
                    autoPlay
                />
            </div>
        </div>
    )
}
export default Notification
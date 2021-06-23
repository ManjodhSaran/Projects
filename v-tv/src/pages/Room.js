import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import Online from '../components/Online'
import Player from '../components/Player'
import SelectVideo from '../components/SelectVideo'
import { auth, rooms } from '../utils/firebase'

const Room = () => {
    const [user] = useAuthState(auth)
    const { id } = useParams()
    const [online, setOnline] = useState([]);
    const [roomData, setRoomData] = useState({});
    const [admin, setAdmin] = useState(false);
    const [videoFilePath, setVideoFilePath] = useState(null);
    const handleVideoUpload = (event) => {
        setVideoFilePath(URL.createObjectURL(event.target.files[0]));
    };

    console.log(id)

    useEffect(() => {
        const unsubscribe = rooms.doc(id).collection('live').onSnapshot(snapshot => setOnline(snapshot.docs.map(doc => doc.data())))
        rooms.doc(id).get().then(doc => setRoomData(doc.data()))

        return unsubscribe
    }, [user]);

    useEffect(() => {
        if (user) {
            rooms.doc(id).collection('live').doc(user.email).set(user.providerData[0])
        }
    }, [user]);

    useEffect(() => {
        if (roomData, user) {
            if (roomData.user === user.email)
                setAdmin(true)
        }
    }, [roomData, user]);
    return (
        <div>
            <SelectVideo onChange={handleVideoUpload} />
            <Player id={id} url={videoFilePath} admin={admin} />
            <Online />
        </div>
    )
}

export default Room

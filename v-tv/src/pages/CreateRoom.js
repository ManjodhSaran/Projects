import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { auth, rooms } from '../utils/firebase'
import { v4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const CreateRoom = () => {
    const [user] = useAuthState(auth)
    const [roomId, setRoomId] = useState('')
    const [roomPass, setRoomPass] = useState('')
    const history = useHistory();
    const create = () => {
        const id = v4();
        if (roomId) {
            rooms.doc(id).set({
                id, roomId, roomPass, user: user.email,
                pip: true,
                playing: true,
                controls: true,
                light: false,
                volume: 0,
                muted: false,
                played: 0,
                loaded: 0,
                duration: 0,
                playbackRate: 1.0,
                loop: false
            })
        } else {

        }
    }
    const join = () => {
        if (roomId) {
            rooms.where('roomId', '==', roomId).get().then(res => {
                const room = res.docs[0]
                if (room.exists) {
                    const data = res.docs[0].data();
                    const id = data.id;
                    const pass = data.roomPass;
                    console.log(pass)
                    console.log(id)
                    if (!pass) {
                        history.push(`/room/${id}`)
                    } else {
                        if (pass === roomPass) {
                            history.push(`/room/${id}`)
                        }
                    }
                }
            })
        } else {

        }
    }
    return (
        <div>
            <form>
                <TextField variant="outlined" label="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)} />
                <TextField variant="outlined" label="Pass" type="password" value={roomPass} onChange={e => setRoomPass(e.target.value)} />
                <Button disabled={!roomId} onClick={create} variant="contained">Create</Button>
            </form>
            <form>
                <TextField variant="outlined" label="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)} />
                <TextField variant="outlined" label="Pass" type="password" value={roomPass} onChange={e => setRoomPass(e.target.value)} />
                <Button disabled={!roomId} onClick={join} variant="contained" >Join</Button>
            </form>
        </div>
    )
}

export default CreateRoom

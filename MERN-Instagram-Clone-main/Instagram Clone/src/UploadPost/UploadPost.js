import React, { useState } from 'react'

import { Button, CircularProgress, Input } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import './UploadPost.css'
import { storage } from '../firebase';
import axios from '../axios';

const UploadPost = ({ username }) => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [progress, setProgress] = useState(0);

    const handleFile = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handlePost = (e) => {
        e.preventDefault();

        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on("state_changed", snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress)
        }, error => { console.log(error); alert(error.message) },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        axios.post('/upload', {
                            caption: caption,
                            image: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption("")
                        setImage(null)
                    });
            })
    }

    return (
        <div className="uploadPost">
            <div className="uploadPost__progress">
                <CircularProgress className="uploadPost__progressBar" variant="static" value={progress} />
            </div>
            <form className={`form ${progress != 0 && "opacity"}`}>
                <h2 className="uploadPost__heading">Add new Post</h2>
                <Input placeholder="What`s on your mind ?" value={caption} onChange={e => setCaption(e.target.value)} />
                <Input type="file" onChange={handleFile} />
                <Button type="submit" variant="contained" disabled={!image && true} color="primary" startIcon={<CloudUploadIcon />}
                    onClick={handlePost}>
                    Upload
                </Button>
            </form>

        </div>
    )
}

export default UploadPost

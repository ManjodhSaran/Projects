import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../../../utils/firebase';

import GetAppIcon from '@material-ui/icons/GetApp';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './DocView.css'
// import { useHistory } from 'react-router-dom';
const DocView = ({ subjectID, docID, open }) => {
    const [data, setData] = useState([]);

    // const history = useHistory();

    // const [URL, setURL] = useState("");

    const handleDownload = () => {
        storage
            .ref(`notes/${data.subject}/${data.file}`)
            .getDownloadURL()
            .then(url => {
                window.open(url, "_blank")
            }).catch(function (error) {
                switch (error.code) {
                    case 'storage/object-not-found':
                        alert(error.code)
                        break;

                    case 'storage/unauthorized':
                        alert(error.code)
                        break;

                    case 'storage/canceled':
                        alert(error.code)
                        break;

                    case 'storage/unknown':
                        alert(error.code)
                        break;
                }
            })
    }

    useEffect(() => {
        if (subjectID && docID) {
            db.collection(subjectID)
                .doc(docID)
                .onSnapshot(snapshot => setData(snapshot.data()))
        }
    }, [docID, subjectID]);

    return (
        open &&
        <div className="docView">
            <h3>{data.title}</h3>
            <p>{data.uploadedBy}</p>
            <p>{data.timestamp?.toDate()?.toDateString()}</p>
            <Button startIcon={<GetAppIcon />} onClick={handleDownload} className="notesCard__button" variant="contained" color="secondary">
                {window.innerWidth > 950 && "Download"}
            </Button>
        </div>
    )
}

export default DocView

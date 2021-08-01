import React, { useEffect, useRef, useState } from 'react'
// import GetAppIcon from '@material-ui/icons/GetApp';

import './UploadNotes.css'

import Modal from '@material-ui/core/Modal';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Select } from '@material-ui/core';

import firebase from 'firebase';
import { selectRepoId, selectUser, showNotification } from '../../../features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { appData, repos, storage, users } from '../../../utils/firebase';

import { v4 as uuid } from 'uuid';
// import { PDFDocument } from 'pdf-lib';
import { useHistory } from 'react-router';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "100%",
        maxWidth: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const UploadNotes = ({ openUpload, setOpenUpload, subjectIDRef }) => {

    const user = useSelector(selectUser);
    const repoId = useSelector(selectRepoId);
    const repoName = repoId && repoId.split('-')[1]
    const dispatch = useDispatch();
    const history = useHistory();

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const [title, setTitle] = useState('')
    const [subjectID, setSubjectID] = useState(subjectIDRef);
    const [type, setType] = useState('specificTopic');
    const [subjects, setSubjects] = useState([]);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [pageCount, setPageCount] = useState(null);
    const [checked, setChecked] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => setSubjectID(subjectIDRef), [subjectIDRef])
    // const readFile = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = error => reject(error);
    //         reader.readAsArrayBuffer(file);
    //     });
    // }

    // const getNumPages = async (file) => {
    //     const arrayBuffer = await readFile(file);
    //     const pdf = await PDFDocument.load(arrayBuffer);
    //     return pdf.getPages();
    // }

    useEffect(() => {
        if (repoId) {
            const ref = repos.doc(repoId).collection("subjects")

            ref.get().then(snapshot => {
                setSubjects(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [repoId])

    const handleFile = (e) => {
        e.preventDefault()

        const file0 = e.target.files[0]
        file0 && setFile(file0)
        setTitle(file0.name.split('.')[0])
        // file0 && getNumPages(file0).then(data => setPageCount(data.length))

    }

    // const handleFile2 = (file) => {
    //     const file0 = file
    //     file0 && setFile(file0)
    //     setTitle(file0.name.split('.')[0])
    //     // file0 && getNumPages(file0).then(data => setPageCount(data.length))
    // }

    const uploadPost = (e) => {
        setUploading(true)
        e.preventDefault()
        setError("")

        const docID = uuid();


        if (file && title && subjectID) {
            setProgress(10);
            const uploadTask = storage.ref(`repos/${repoId}/${subjectID}/${file.name}`).put(file);
            uploadTask.on("state_changed", snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress)
            }, (error) => {
                console.log(error);
                alert(error.message)
            }, () => {
                storage
                    .ref(`repos/${repoId}/${subjectID}/${file.name}`)
                    .getDownloadURL()
                    .then(url => {


                        const ref = repos.doc(repoId)

                        ref.collection(subjectID).doc(docID).set({
                            title: title,
                            subject: subjectID,
                            type: type,
                            fileInfo: {
                                name: file.name,
                                size: file.size,
                                type: file.type,
                                lastModified: file.lastModified,
                                lastModifiedDate: file.lastModifiedDate,
                                webkitRelativePath: file.webkitRelativePath,
                            },
                            file: file.name,
                            fileURL: url,
                            pageCount: pageCount,
                            description: description,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            uploadedBy: user.displayName,
                            userID: user.uid,
                            anonymous: checked,
                            approved: false
                        }).then(() => dispatch(showNotification(`Uploaded - ${parseFloat(user.contro) + parseFloat(1)} Contributions`)))
                            .then(() => history.push(`/application/${repoId}/${subjectID}`))
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
                            default:
                                alert("error Occured")
                                break;
                        }
                    })


                appData.collection("recents")
                    .add({
                        repoId: repoId,
                        repoName: repoName,
                        message: `<strong>${user.displayName}</strong> uploaded <strong>${title}</strong> on <strong>${subjectID}</strong> with docID: <strong>${docID}</strong>`,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })

                users.doc(user.uid).set(
                    { contro: parseFloat(user.contro) + parseFloat(1) },
                    { merge: true }
                )

                setProgress(0);
                setTitle("");
                setDescription("");
                setFile(null);
                setSubjectID("");
                setOpenUpload(false);
                setUploading(false);
            })
        } else {
            setError("Field Value Missing!!")
            !file && setError("Select File to upload")
            !subjectID && setError("Select subject")
            !title && setError("Set Title")
        }
    }

    // Drag && Drop
    // const handleFileDiv = useRef()

    // const [dragActive, setDragActive] = useState(false)


    // const dropArea = handleFileDiv.current

    // const dropZone = document.getElementById('dropZone');
    // useEffect(() => {
    //     if (dropZone) {

    //         dropZone.addEventListener('dragenter', () => setDragActive(true), false)
    //         dropZone.addEventListener('dragleave', () => setDragActive(false), false)

    //     }
    //     return () => {
    //         dropZone.removeEventListener('dragenter', () => setDragActive(true))
    //         dropZone.removeEventListener('dragleave', () => setDragActive(false))
    //     }
    // }, [])



    // dropZone && dropZone.addEventListener('dragover', function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     e.dataTransfer.dropEffect = 'copy';
    // });

    // dropZone && dropZone.addEventListener('drop', function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     var files = e.dataTransfer.files; // Array of all files
    //     console.log(files[0])
    //     handleFile2(files[0])
    // });


    return (
        <div className='uploadNotes'>


            <Modal open={openUpload} onClose={() => setOpenUpload(false)} >
                {
                    <div id="dropZone" style={modalStyle} className={classes.paper} >
                        {/* {dragActive &&
                            <div className="uploadNotes-dragActive">
                                <div className='uploadNotes__dragContainer' ref={handleFileDiv}>
                                    <h1>Drop Here</h1>
                                    <GetAppIcon className="uploadNotes-dragIcon" />
                                </div>
                            </div>
                        } */}
                        <div className="uploadNotes__progress">
                            <CircularProgress className="uploadPost__progressBar" variant="determinate" value={progress} />
                        </div>
                        <div className={progress !== 0 ? "opacity" : ""}>
                            <h2>Upload Notes</h2>
                            <HighlightOffIcon titleAccess="close" onClick={() => setOpenUpload(false)} fontSize="large" className="uploadNotes__close" />
                            <p className="uploadNotes__error">{error && error}</p>
                            <form className="uploadNotes__form">
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title / Topic" required={true} />
                                <div className="form__select">
                                    <FormControl className={`upload__formControl ${classes.formControl}`}>
                                        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={subjectID}
                                            onChange={(e) => setSubjectID(e.target.value)}
                                        >
                                            {subjects.map(subject =>
                                                <MenuItem key={`menu__item__${subject.id}`} value={subject.id}>{subject.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="form__select">
                                    <FormControl className={`upload__formControl ${classes.formControl}`}>
                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            onChange={e => setType(e.target.value)}
                                            defaultValue="specificTopic"
                                        >
                                            <MenuItem key={`menu__item2__${1}`} value="book" >Book</MenuItem>
                                            <MenuItem key={`menu__item2__${2}`} value="handWritten">Hand Written</MenuItem>
                                            <MenuItem key={`menu__item2__${3}`} value="specificTopic">Specific Topic</MenuItem>
                                            <MenuItem key={`menu__item2__${4}`} value="Unit/Chapter">Unit/Chapter</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <Input onChange={handleFile} type="file" />
                                <Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description/Keywords" />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={() => checked ? setChecked(false) : setChecked(true)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label="Upload Anonymously"
                                />
                                <Button type="submit" onClick={uploadPost} variant="contained" color="primary" disabled={uploading && true}>Upload</Button>
                            </form>
                        </div>
                    </div>
                }
            </Modal>
        </div>
    )
}
export default UploadNotes
import { Button, CircularProgress } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { useEffect, useRef, useState } from 'react'
import firebase from 'firebase'

// ICONS
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FlagIcon from '@material-ui/icons/Flag';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { db, repos, storage, users } from '../../../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';

import './NotesCard.css'

// import FileViewer from 'react-file-viewer';

import DocView from '../DocView/DocView';
import ReportModal from '../../../ReportModal/ReportModal';
import GetHardCopyModal from '../../../GetHardCopyModal/GetHardCopyModal';
import { selectRepoId, setPdfSrc, selectUser, showNotification } from '../../../../features/appSlice';

const NotesCard = ({ title, description, username, file, pageCount, fileURL, timestamp, subjectName, noteData, anonymous, id, subjectID, userID, starredList }) => {


    // Detect click outsite div

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setNoteCardMenu(false)
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    // 
    const user = useSelector(selectUser);
    const repoId = useSelector(selectRepoId);
    const repoName = repoId && repoId.split('-')[1]
    const [noteCardMenu, setNoteCardMenu] = useState(false);
    const [starred, setStarred] = useState(false);
    // const [URL, setURL] = useState("");
    const dispatch = useDispatch();
    const [downloadProgress, setDownloadProgress] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [openGetHardCopyModal, setOpenGetHardCopyModal] = useState(false);
    const [message, setMessage] = useState("");
    const [expand, setExpand] = useState(false);

    // const [fileLink, setFileLink] = useState(null);
    // const [type, setType] = useState(null);

    // const handleView = () => {
    //     storage
    //         .ref(`apps/${repoId}/${subjectID}/${file}`)
    //         .getDownloadURL()
    //         .then(url => {
    //             setFileLink(url);
    //             setType((/[.]/.exec(url)) ? /[^.]+$/.exec(url)[0].split('?')[0] : undefined)
    //         })
    // }


    useEffect(() => {
        if (starredList.includes(id)) {
            setStarred(true)
        } else {
            setStarred(false)
        }
    }, [starredList])

    const handleReport = () => {
        user && db
            .collection("admin")
            .doc("appData")
            .collection("flags")
            .add({
                docID: id,
                subjectID: subjectID,
                message: message,
                repoId: repoId,
                repoName: repoName,
                username: user.displayName,
                userID: user.uid,
                doc: {
                    title: title,
                    description: description,
                    username: username,
                    file: file,
                    timestamp: timestamp,
                    id: id,
                    subjectID: subjectID,
                },
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        setNoteCardMenu(false);
    }

    const handleDelete = () => {
        db
            .collection("admin")
            .doc("appData")
            .collection("bin")
            .doc(id)
            .set({
                docID: id,
                subjectID: subjectID,
                repoId: repoId,
                repoName: repoName,
                doc: {
                    title: title,
                    description: description,
                    username: username,
                    file: file,
                    timestamp: timestamp,
                    id: id,
                    subjectID: subjectID,
                },
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        if (repoId) {
            repos.doc(repoId)
                .collection(subjectID)
                .doc(id)
                .delete()
                .then(() => dispatch(showNotification(`Deleted `)))
        }

    }

    const handleStar = () => {
        if (user) {
            const ref = users.doc(user.uid).collection("starred")
            if (!starred) {
                ref.doc(id).set(noteData).then(setStarred(true)).then(() => dispatch(showNotification(`Notes added to favourites`)))
            } else {
                ref.doc(id).delete().then(setStarred(false));
            }
        }
    }

    const handleDownload = () => {
        setDownloadProgress(true);
        if (!fileURL) {
            storage
                .ref(`repos/${repoId}/${subjectID}/${file}`)
                .getDownloadURL()
                .then(url => {
                    window.open(url, "_blank")
                }).then(() => setDownloadProgress(false))
                .catch(function (error) {
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
        } else {
            window.open(fileURL)
            // window.location.href = fileURL;
            setDownloadProgress(false);
        }
    }

    const viewPdf = () => {
        dispatch(setPdfSrc({
            id: id,
            subjectID: subjectID,
            title: title,
            description: description,
            file: file,
            fileURL: fileURL,
            username: username,
            subjectName: subjectName,
            anonymous: anonymous,
            userID: userID,
        }))
    }

    const copyLink = () => {
        const link = `https://gne-notes.web.app/notes?rq=${repoId}&sq=${subjectID}&nq=${id}`
        copyToClipboard(link)
    }
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
    return (
        // to = {`/${subjectID}/${id}`}
        <div className="notesCard  animate__animated animate__fadeInUp">
            <div className="notesCard__container">
                {/* onClick={() => viewPdf()} */}
                <div className="notesCard__Details">

                    <h3 className={starred ? "h3__gold" : ""} dangerouslySetInnerHTML={{ __html: title }} />
                    <p>{description && description}</p>
                    <h4>uploaded by <span>{anonymous ? "Anonymous" : (userID === user?.uid ? "You" : username)}</span> on: {timestamp?.toDate()?.toDateString()}</h4>
                </div>
                <div className="notesCard__buttons">
                    {/* <Button startIcon={<MenuBookIcon />} onClick={handleView} className="notesCard__button" variant="contained" color="primary">View</Button> */}
                    <Button startIcon={!downloadProgress ? <GetAppIcon /> : <CircularProgress color="white" />} onClick={handleDownload} className="notesCard__button" variant="contained" color="secondary">
                        {window.innerWidth > 950 && "Download"}
                    </Button>
                    <Button startIcon={<FileCopyIcon />} onClick={copyLink} className="notesCard__button" variant="contained" color="primary">
                        Copy Link
                    </Button>
                    {/* <Button startIcon={<FileCopyIcon />} onClick={() => setOpenGetHardCopyModal(true)} className="notesCard__button" variant="contained" color="primary">
                        Get Hard Copy
                    </Button> */}
                </div>
                <div className="notesCard__menu">
                    {noteCardMenu
                        ?
                        <CloseIcon fontSize="large" onClick={() => setNoteCardMenu(false)} className="notesCard__menuIcon" />
                        :
                        <MoreVertIcon fontSize="large" onClick={() => setNoteCardMenu(true)} className="notesCard__menuIcon" />
                    }
                    {/* {expand ?
                        <ExpandLessIcon className="notesCard__menuIcon" onClick={() => setExpand(false)} />
                        :
                        <ExpandMoreIcon className="notesCard__menuIcon" onClick={() => setExpand(true)} />
                    } */}

                    {noteCardMenu &&
                        <div onFocus={() => setNoteCardMenu(false)} ref={wrapperRef} id="notesCard__dropdownID" className="notesCard__dropdown">
                            <p onClick={() => setOpenUpload(true)}>Report <FlagIcon /></p>
                            {starred ?
                                <p onClick={handleStar}>Unstar <StarIcon /></p>
                                :
                                <p onClick={handleStar}>Star <StarBorderIcon /></p>
                            }
                            {user &&
                                ((user.role === 'admin' || userID == user.uid) &&
                                    <>
                                        <p onClick={handleDelete}>Add to Bin <DeleteIcon /></p>
                                    </>
                                )
                            }
                        </div>
                    }
                </div>
            </div>

            <DocView open={expand} subjectID={subjectID} docID={id} />

            <ReportModal open={openUpload} setOpen={setOpenUpload} message={message} setMessage={setMessage} handleReport={handleReport} />
            <GetHardCopyModal open={openGetHardCopyModal} pageCount={pageCount} setOpen={setOpenGetHardCopyModal} message={message} setMessage={setMessage} handleReport={handleReport} />
            <hr />


            {/* {(type && fileLink) &&
                <FileViewer
                    fileType={type && type.toLowerCase()}
                    filePath={fileLink}
                />
            } */}
        </div>
    )
}

export default NotesCard

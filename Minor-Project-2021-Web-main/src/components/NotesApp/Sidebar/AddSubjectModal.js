import React, { useState } from 'react'
import { repos } from '../../../utils/firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { selectRepoId } from '../../../features/appSlice';
import { useSelector } from 'react-redux';
import firebase from "firebase";

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
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function AddSubjectModal({ addSubjectActive, subjects, setAddSubjectActive }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(false);

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const repoId = useSelector(selectRepoId);

    const nameExists = () => {
        return subjects.some(el => {
            return el.name === name;
        });
    }

    const idExists = () => {
        return subjects.some(el => {
            return el.id === id
        });
    }

    const addSubject = () => {
        setError(null)
        setProgress(true)

        const nameTaken = nameExists()
        const idTaken = idExists()

        if (name && id) {
            if (!nameTaken && !idTaken) {

                const doc = `${name}-${id}`
                const ref = repos.doc(repoId).collection('subjects').doc(doc.toLowerCase());

                ref.set({
                    name: name,
                    id: id,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => setAddSubjectActive(false))

            } else {
                nameTaken && setError("Name already taken.");
                idTaken && setError("ID already taken.");
                (idTaken && nameTaken) && setError("Name and ID already taken.");
            }
        } else {
            setError("Data fields missing");
        }
    }

    return (
        <div>
            <Modal open={addSubjectActive} onClose={() => setAddSubjectActive(false)} >
                {
                    <div style={modalStyle} className={classes.paper}>
                        <div className="report__container">
                            <h2>Add Subject</h2>
                            <Input
                                placeholder="Subject Name"
                                value={name}
                                onChange={e => setName(e.target.value)}

                            />
                            <Input
                                placeholder="Subject initials(short form)"
                                value={id}
                                onChange={e => setId(e.target.value)}

                            />
                            {error && <p className="setupApp__error">{error}</p>}
                            <Button variant={"solid"} onClick={addSubject}>Add</Button>
                            <div onClick={() => setAddSubjectActive(false)} className="report__close">
                                <HighlightOffIcon className="report__closeIcon" />
                            </div>
                        </div>
                    </div>
                }
            </Modal>
        </div>
    )
}

export default AddSubjectModal

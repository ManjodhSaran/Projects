import { Button, Divider, IconButton, TextField, makeStyles, Modal, TextareaAutosize } from '@material-ui/core'
import React, { useState } from 'react'
import { Alert } from '@material-ui/lab';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import HashLoader from "react-spinners/HashLoader";
import { auth, mails } from '../utils/firebase';
import { validateEmail } from '../functions/validation';
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';

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
        maxWidth: 1200,
        minHeight: 500,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 12,
        boxShadow: theme.shadows[5],
        outline: 0,
        padding: theme.spacing(2, 4, 3),
    },
}));

const ComposeModal = ({ open, setOpen }) => {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendMail = (e) => {
        e.preventDefault();
        if (message && to && validateEmail(to)) {
            setLoading(true);
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const text = JSON.stringify(message);
            const senderId = user.uid;
            const id = uuidv4();
            const from = user.email;
            mails.doc(id).set({ to, subject, text, timestamp, from, senderId, id })
                .then(() => setOpen(false));
        } else {
            !validateEmail(to) && setError('Email not Valid');
            !message && setError('Enter Message');
            !to && setError('Enter Recipient');
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <div className="composeModal">
                    <div className="composeModal__header">
                        <h2>Compose Mail</h2>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon className="composeModal__headerIcon" />
                        </IconButton>
                    </div>
                    <Divider />
                    <form>
                        <TextField
                            value={to}
                            onChange={e => setTo(e.target.value)}
                            placeholder="To"
                            name="email"
                            helperText={to !== '' && (validateEmail(to) !== true ? "Email not valid" : '')}
                            error={to !== '' && (validateEmail(to) === false && true)}
                        />
                        <TextField
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            placeholder="Subject"
                        />
                        <TextareaAutosize
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            rowsMin={15}
                            rowsMax={15}
                            placeholder="Type here..."
                        />
                        <Divider />
                        {error && <Alert variant="outlined" severity="error">{error}</Alert>}
                        <Button
                            endIcon={!loading && <SendIcon />}
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            type='submit'
                            onClick={sendMail}
                        >{!loading ? "Send" : <HashLoader size={25} />}</Button>
                        <Divider />
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ComposeModal

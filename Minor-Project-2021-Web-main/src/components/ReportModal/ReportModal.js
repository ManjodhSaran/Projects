import React, { useState } from 'react'
import { Button, makeStyles, Modal } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './ReportModal.css'

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

const ReportModal = ({ handleReport, open, setOpen, message, setMessage }) => {

    const handleSend = e => {
        e.preventDefault();
        if (message.length > 3) {
            handleReport();
            setOpen(false);
        } else {
            setError("Message is too Short")
        }
    }

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();


    const [error, setError] = useState('');

    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)} >
                {
                    <div style={modalStyle} className={classes.paper}>
                        <div className="report__container">
                            <h3>Report</h3>
                            <p className="uploadNotes__error">{error && error}</p>
                            <form className="report__form">
                                <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Write here" />
                                <button type="submit" onClick={handleSend}><Button>Report</Button></button>
                            </form>
                            <div onClick={() => setOpen(false)} className="report__close">
                                <HighlightOffIcon className="report__closeIcon" />
                            </div>
                        </div>
                    </div>
                }
            </Modal>
        </div>
    )
}

export default ReportModal

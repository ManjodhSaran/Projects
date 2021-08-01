import { Button, makeStyles, Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import './GetHardCopyModal.css'

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

const GetHardCopyModal = ({ handleReport, open, pageCount, setOpen, message, setMessage }) => {

    const handleSend = e => {
        e.preventDefault();
    }

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();


    const [error, setError] = useState('');
    const [place, setPlace] = useState("TS");
    const [paymentMode, setPaymentMode] = useState(null);

    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)} >
                {
                    <div style={modalStyle} className={classes.paper}>
                        <div className="getHardCopyModal__container">
                            <h3>Get Hard Copy</h3>
                            <p className="uploadNotes__error">{error && error}</p>
                            <form className="getHardCopyModal__form">
                                <h4>Collect Notes From :</h4>
                                <div className="getHardCopyModal__radio">
                                    <div onClick={() => setPlace("TS")} className="getHardCopyModal__radioButton">
                                        {!(place === "TS") ? <RadioButtonUncheckedIcon className="getHardCopyModal__radioButtonIcon" /> : <RadioButtonCheckedIcon className="getHardCopyModal__radioButtonIcon" />}
                                        <p>Tak Shop</p>
                                    </div>
                                    <div onClick={() => setPlace("JC")} className="getHardCopyModal__radioButton">
                                        {!(place === "JC") ? <RadioButtonUncheckedIcon className="getHardCopyModal__radioButtonIcon" /> : <RadioButtonCheckedIcon className="getHardCopyModal__radioButtonIcon" />}
                                        <p>Janta Cafe</p>
                                    </div>
                                </div>
                                <h5>Total Pages: {pageCount}</h5>
                                <h5>Appr Price: Rs.{pageCount} <span>(b/w)</span></h5>

                                <h4>Payment Method{paymentMode !== null && (paymentMode === "upi" ? "(UPI)" : "(Cash)")}</h4>
                                <div className="getHardCopyModal__Buttons">
                                    <Button className="getHardCopyModal__Button" onClick={() => setPaymentMode("upi")} variant={"contained"} color={paymentMode === "upi" ? "secondary" : "primary"}>UPI</Button>
                                    <Button className="getHardCopyModal__Button" onClick={() => setPaymentMode("cash")} variant={"outlined"} color={paymentMode === "cash" ? "secondary" : "primary"}>Cash</Button>
                                </div>
                                {/* <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Any " /> */}
                                <Button variant={"contained"} color="secondary" type="submit" onClick={handleSend}>Place Order</Button>
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

export default GetHardCopyModal

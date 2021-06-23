import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { login } from '../features/appSlice';
import { auth, teachersRef } from '../utils/firebase';

const TeacherSigninForm = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [progress, setProgress] = useState(false);
    const [staffId, setStaffId] = useState('')
    const [error2, setError] = useState({ id: "", message: "" });
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        if (staffId.length !== 0) {
            setProgress(true);
            teachersRef.doc(staffId).get().then((doc) => {
                if (doc.exists) {
                    const email = `${staffId}@teacher.com`;
                    signInWithEmailAndPassword(email, "password-set-by-dev");
                    dispatch(login({ ...user, timestamp: '' }))
                    setProgress(false);
                    history.replace('/application/dashboard');
                } else {
                    setProgress(false);
                    setError({ id: "main", message: "No Teacher Found" });
                }
            })
        } else {
            setError({ id: "main", message: "Staff Id Required" });
        }
    };

    return (
        <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <TextField
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    label="Staff Id"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                />
            </div>
            {error2.id === "main" && <p className="form__error">{error2.message}</p>}
            {error && <p>{error.message}</p>}
            <Button
                onClick={handleClick}
                className="btn"
                type="submit"
                // disabled={progress}
                variant="contained"
                color="primary" >
                {!progress ? (
                    "Sign In"
                ) : (
                    <CircularProgress size={22} color="inherit" />
                )}
            </Button>
        </form>
    )
}

export default TeacherSigninForm

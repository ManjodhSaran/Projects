import { Button, CircularProgress, TextField, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import GridInput from './GridInput'
import CakeIcon from '@material-ui/icons/Cake';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { auth, studentsRef } from '../utils/firebase';
import { login } from '../features/appSlice';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

const StudentSigninForm = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [progress, setProgress] = useState(false);
    const [error2, setError] = useState({ id: "", message: "" });
    const history = useHistory();
    const dispatch = useDispatch();
    const [signinCreds, setCreds] = useState({
        rollno: '',
        dob: '',
        class: '',
        section: '',
    });

    const handleClick = (e) => {
        e.preventDefault();
        setError({ id: "", message: "" });
        if (
            signinCreds.rollno !== "" &&
            signinCreds.dob !== ""
        ) {
            setProgress(true);
            const id = `${signinCreds.class}${signinCreds.section}-${signinCreds.rollno}`
            studentsRef.where('id', '==', id)
                .get().then(users => {
                    const user = users?.docs[0]?.data()
                    if (user !== undefined) {
                        const email = user.email;
                        signInWithEmailAndPassword(email, "password-set-by-dev");
                        dispatch(login({ ...user, timestamp: '' }))
                        setProgress(false);
                        history.replace('/application/dashboard');
                    } else {
                        setProgress(false);
                        setError({ id: "main", message: "No Student Found" });
                    }
                }

                )
        } else {
            signinCreds.dob === "" && setError({ id: "dob", message: "DOB is required" });
            signinCreds.class === "" && setError({ id: "class", message: "Class is required" });
            signinCreds.rollno === "" && setError({ id: "rollno", message: "Roll no is required" });
            setProgress(false);
        }
    };

    const classesArr = [
        { value: '6', label: '6th' },
        { value: '7', label: '7th' },
        { value: '8', label: '8th' },
        { value: '9', label: '9th' },
        { value: '10', label: '10th' },
    ];

    const sectionsArr = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C' },
    ];
    console.log(signinCreds)
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
                    id={"rollno"}
                    value={signinCreds.rollno}
                    onChange={(e) => setCreds({ ...signinCreds, rollno: e.target.value })}
                    label="Class Roll no"
                    error={error2.id === "rollno" ? true : false}
                    helperText={error2.id === "rollno" && error2.message}
                />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <TextField
                    select
                    id={"class"}
                    label="select your class"
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    value={signinCreds.class}
                    onChange={(e) => setCreds({ ...signinCreds, class: e.target.value })}
                    error={error2.id === "class" ? true : false}
                    helperText={error2.id === "class" && error2.message}
                >
                    {classesArr.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <TextField
                    select
                    id={"section"}
                    label="select your section"
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    value={signinCreds.section}
                    onChange={(e) => setCreds({ ...signinCreds, section: e.target.value })}
                    error={error2.id === "section" ? true : false}
                    helperText={error2.id === "section" && error2.message}
                >
                    {sectionsArr.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div className="input-field">
                <i className="fas fa-user"></i>
                <TextField
                    label="Date of Birth"
                    id={"dob"}
                    value={signinCreds.dob}
                    type="date"
                    error={error2.id === "dob" ? true : false}
                    helperText={error2.id === "dob" && error2.message}
                    onChange={(e) => setCreds({ ...signinCreds, dob: e.target.value })}
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,

                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
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

export default StudentSigninForm

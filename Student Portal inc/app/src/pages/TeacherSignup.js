import React, { useEffect, useRef, useState } from 'react'
import { Button, CircularProgress, MenuItem, TextField } from '@material-ui/core'
import '../styles/Signup.scss'
import firebase from 'firebase'
import AccountCircle from '@material-ui/icons/AccountCircle';
import CakeIcon from '@material-ui/icons/Cake';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import { auth, studentsRef, teachersRef } from '../utils/firebase';
// import { v4 as uuidv4 } from 'uuid';
import GridInput from '../components/GridInput';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../features/appSlice';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import TeacherSigninForm from '../components/TeacherSigninForm';
import logo1 from '../assests/img/register.svg'
import logo2 from '../assests/img/log.svg'

const TeacherSignup = () => {
    const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);

    const [progress, setProgress] = useState(false);
    const [error2, setError] = useState({ id: "", message: "" });
    const history = useHistory();
    const dispatch = useDispatch();
    const containerRef = useRef();

    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            history.replace('/applicaion/dashboard');
        }
    }, [user])

    const [signupCreds, setCreds] = useState({
        name: "",
        staffId: "",
        dob: '',
        role: 'teacher'
    });

    const handleClick = (e) => {
        e.preventDefault();
        setError({ id: "", message: "" });
        if (
            signupCreds.name !== "" &&
            signupCreds.staffId !== "" &&
            signupCreds.dob !== ""
        ) {
            setProgress(true);
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            // const id = uuidv4();
            const id = signupCreds.staffId
            const email = `${id}@teacher.com`
            teachersRef.doc(id).get().then((res) => {
                if (!res.exists) {
                    teachersRef
                        .doc(id)
                        .set({ ...signupCreds, timestamp, id, email })
                        .then(() => {
                            createUserWithEmailAndPassword(email, "password-set-by-dev");
                            setCreds({ name: "", rollno: "", dob: "", class: '' });
                            dispatch(login({ ...signupCreds, id: id }));
                            history.replace('/application/dashboard');
                            setProgress(false);
                        });
                } else {
                    setError({ id: "error", message: "Teacher already exists" });
                    setProgress(false);
                }
            })
        } else {
            signupCreds.dob === "" && setError({ id: "dob", message: "DOB is required" });
            signupCreds.staffId === "" && setError({ id: "staffid", message: "Staff ID is required" });
            signupCreds.name === "" && setError({ id: "name", message: "Name is required" });
            setProgress(false);
        }
    };

    return (
        <div className="signup no-select">
            <div className="container" ref={containerRef}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <TeacherSigninForm />
                        <form className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <TextField
                                    variant="standard"
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    id={"name"}
                                    value={signupCreds.name}
                                    onChange={(e) => setCreds({ ...signupCreds, name: e.target.value })}
                                    label="Name"
                                    error={error2.id === "name" ? true : false}
                                    helperText={error2.id === "name" && error2.message}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <TextField
                                    variant="standard"
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    id={"staffid"}
                                    value={signupCreds.rollno}
                                    onChange={(e) => setCreds({ ...signupCreds, staffId: e.target.value })}
                                    label="Staff Id"
                                    error={error2.id === "staffid" ? true : false}
                                    helperText={error2.id === "staffid" && error2.message}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <TextField
                                    label="Date of Birth"
                                    id={"dob"}
                                    value={signupCreds.dob}
                                    type="date"
                                    error={error2.id === "dob" ? true : false}
                                    helperText={error2.id === "dob" && error2.message}
                                    onChange={(e) => setCreds({ ...signupCreds, dob: e.target.value })}
                                    variant="standard"
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            {error2.id === 'error' && <p className="form__error">{error2.message}</p>}
                            <Button
                                onClick={handleClick}
                                type="submit"
                                className="btn"
                                disabled={progress}
                                variant="contained">
                                {!progress ? (
                                    "Sign up"
                                ) : (
                                    <CircularProgress size={22} color="inherit" />
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h2>Teacher</h2>
                            <br />
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button className="btn transparent" id="sign-up-btn" onClick={() => containerRef.current.classList.add("sign-up-mode")}>
                                Sign up
                            </button>
                        </div>
                        <img src={logo2} className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h2>Teacher</h2>
                            <br />
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn transparent" id="sign-in-btn" onClick={() => containerRef.current.classList.remove("sign-up-mode")}>
                                Sign in
                            </button>
                        </div>
                        <img src={logo1} className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherSignup

import React, { useEffect, useRef, useState } from 'react'
import { Button, CircularProgress, MenuItem, TextField } from '@material-ui/core'
import '../styles/Signup.scss'
import firebase from 'firebase'
import AccountCircle from '@material-ui/icons/AccountCircle';
import CakeIcon from '@material-ui/icons/Cake';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import { auth, studentsRef } from '../utils/firebase';
// import { v4 as uuidv4 } from 'uuid';
import GridInput from '../components/GridInput';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../features/appSlice';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import StudentSigninForm from '../components/StudentSigninForm';
import logo1 from '../assests/img/register.svg'
import logo2 from '../assests/img/log.svg'

const StudentSignup = () => {
    const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);

    const [progress, setProgress] = useState(false);
    const [error2, setError] = useState({ id: "", message: "" });
    const history = useHistory();
    const dispatch = useDispatch();

    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            history.replace('/applicaion/dashboard');
        }
    }, [user])

    const containerRef = useRef();
    const [signupCreds, setCreds] = useState({
        name: "",
        rollno: "",
        dob: "",
        class: '',
        section: '',
        role: 'student'
    });

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

    const handleClick = (e) => {
        e.preventDefault();
        setError({ id: "", message: "" });
        if (
            signupCreds.name !== "" &&
            signupCreds.rollno !== "" &&
            signupCreds.dob !== "" &&
            signupCreds.class !== ""
        ) {
            setProgress(true);
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const id = `${signupCreds.class}${signupCreds.section}-${signupCreds.rollno}`
            const email = `${id}@student.com`
            const classCode = `${signupCreds.class}${signupCreds.section.toLowerCase()}`
            studentsRef.doc(id).get().then((res) => {
                if (!res.exists) {
                    studentsRef
                        .doc(id)
                        .set({ ...signupCreds, classCode, timestamp, id, email })
                        .then(() => {
                            createUserWithEmailAndPassword(email, "password-set-by-dev");
                            setCreds({ name: "", rollno: "", dob: "", class: '' });
                            dispatch(login({ ...signupCreds, id: id }));
                            history.replace('/application/dashboard');
                            setProgress(false);
                        });
                } else {
                    setError({ id: "error", message: "Student already exists" });
                    setProgress(false);
                }
            })
        } else {
            signupCreds.dob === "" && setError({ id: "dob", message: "DOB is required" });
            signupCreds.class === "" && setError({ id: "section", message: "Section is required" });
            signupCreds.class === "" && setError({ id: "class", message: "Class is required" });
            signupCreds.rollno === "" && setError({ id: "rollno", message: "Roll no is required" });
            signupCreds.name === "" && setError({ id: "name", message: "Name is required" });
            setProgress(false);
        }
    };

    return (
        <div className="signup no-select">
            <div className="container" ref={containerRef}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <StudentSigninForm />
                        <form action="#" className="sign-up-form">
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
                                    id={"rollno"}
                                    value={signupCreds.rollno}
                                    onChange={(e) => setCreds({ ...signupCreds, rollno: e.target.value })}
                                    label="Class Roll no"
                                    error={error2.id === "rollno" ? true : false}
                                    helperText={error2.id === "rollno" && error2.message}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <TextField
                                    select
                                    id={"class"}
                                    variant="standard"
                                    InputProps={{
                                        disableUnderline: true,

                                    }}
                                    label="select your class"
                                    value={signupCreds.class}
                                    onChange={(e) => setCreds({ ...signupCreds, class: e.target.value })}
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
                                <i className="fas fa-envelope"></i>
                                <TextField

                                    select
                                    id={"section"}
                                    label="select your section"
                                    variant="standard"
                                    InputProps={{
                                        disableUnderline: true,

                                    }}
                                    value={signupCreds.section}
                                    onChange={(e) => setCreds({ ...signupCreds, section: e.target.value })}
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
                                <i className="fas fa-envelope"></i>
                                <TextField
                                    variant="standard"
                                    InputProps={{
                                        disableUnderline: true,

                                    }}
                                    label="Date of Birth"
                                    id={"dob"}
                                    value={signupCreds.dob}
                                    type="date"
                                    error={error2.id === "dob" ? true : false}
                                    helperText={error2.id === "dob" && error2.message}
                                    onChange={(e) => setCreds({ ...signupCreds, dob: e.target.value })}
                                    // defaultValue="dd-mm-yyyy"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
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
                                {/* <input type="submit" className="btn" value="Sign up" /> */}
                            </Button>

                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h2>Student</h2>
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
                            <h2>Student Register</h2>
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
                        <img src={logo1} className="image" alt="fgjsdfjnkl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentSignup

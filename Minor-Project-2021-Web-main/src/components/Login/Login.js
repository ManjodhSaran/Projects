import React, { useEffect, useState } from 'react'
import './Login.css'
import firebase from 'firebase'
import { CircularProgress, makeStyles, Modal } from '@material-ui/core';
import { login, logout, selectUser } from '../../features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db, provider, repos, users } from '../../utils/firebase';

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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Login = ({ openSignin, setOpenSignin }) => {

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // const [userArray, setUserArray] = useState();

    const signIn = () => {

        auth
            .signInWithPopup(provider)
            .then(result => setOpenSignin(false))
            .catch(e => alert(e))

    }

    openSignin && signIn()

    useEffect(() => {

        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                authUser = authUser.providerData[0]

                users.doc(authUser.uid)
                    .get()
                    .then(function (doc) {
                        if (!doc.exists) {
                            users.doc(authUser.uid).set({
                                uid: authUser.uid,
                                displayName: authUser.displayName,
                                email: authUser.email,
                                photoURL: authUser.photoURL,
                                contro: 0,
                                role: "user",
                                joined: firebase.firestore.FieldValue.serverTimestamp(),
                                theme: "light",
                                phoneNumber: authUser.phoneNumber || null
                            })
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });

                users.doc(authUser.uid)
                    .onSnapshot(snapshot => {

                        if (snapshot.exists) {
                            dispatch(login({
                                contro: snapshot.data().contro,
                                defaultApp: snapshot.data().defaultApp,
                                displayName: snapshot.data().displayName,
                                email: snapshot.data().email,
                                joined: JSON.stringify(snapshot.data().joined?.toDate()),
                                favApp: snapshot.data().favApp,
                                lastUsedApp: snapshot.data().lastUsedApp,
                                phoneNumber: snapshot.data().phoneNumber,
                                photoURL: snapshot.data().photoURL,
                                role: snapshot.data().role,
                                theme: snapshot.data().theme,
                                uid: snapshot.data().uid,
                                yourApps: snapshot.data().yourApps,
                            }))
                        }
                    })
            } else {
                dispatch(logout())
            }
        })
    }, [user])

    return (
        <div className="login">
            <Modal open={openSignin} onClose={() => setOpenSignin(false)} >
                {
                    <div style={modalStyle} className={classes.paper}>
                        <form className="login__form">
                            <p>Redirecting to Google Logins.....</p>
                            <CircularProgress />
                        </form>
                    </div>
                }
            </Modal>

        </div>
    )
}

export default Login

import React, { useState } from 'react'


import './Login.css'
import firebase, { auth, provider } from '../firebase/firebase';


import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { useStateValue } from '../StateProvider';
import { Redirect } from 'react-router-dom';
import db from '../firebase/firebase';

function Login() {

    const [{ user }, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: "SET_USER",
                    user: result.user.providerData[0]
                })
            })
            .catch(e => alert(e))
    }

    const saveData = () => {
        db.collection("uid_" + user.uid).doc("uid_" + user.uid).set({
            userInfo: {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
        })

        db.collection("allUsers").doc("uid_" + user.uid).set({
            userInfo: {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
        })

    }

    user && saveData();



    return (
        <div className="login">
            <h1>Sign-in</h1>
            <WhatsAppIcon className="login-icon" />
            <button onClick={signIn}>SIGN WITH <img src="https://cdn.iconscout.com/icon/free/png-256/google-453-569326.png" /></button>
            {user && <Redirect to="/" />}
        </div>
    )
}

export default Login

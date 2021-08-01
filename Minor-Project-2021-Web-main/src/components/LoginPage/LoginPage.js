import { Button } from '@material-ui/core'
import firebase from 'firebase';
import React, { useState } from 'react'
import { auth, provider, repos, users } from '../../utils/firebase';
import './LoginPage.css'
const LoginPage = () => {
    const [code, setCode] = useState(null);
    const signIn = () => auth.signInWithPopup(provider).then(({ user }) => {
        repos.doc(user.providerData[0].uid)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    users
                        .doc(user.providerData[0].uid).set({
                            uid: user.providerData[0].uid,
                            displayName: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                            contro: 0,
                            role: "user",
                            joined: firebase.firestore.FieldValue.serverTimestamp(),
                            theme: "light",
                            phoneNumber: user.phoneNumber || null
                        })
                }
            }).then(() => setCode(user.providerData[0].uid.slice(user.providerData[0].uid.length - 5)))
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }).catch(e => alert(e))

    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    return (
        <div id={`div1`} className="loginPage setupApp">
            <div>
                {code ?
                    <div className="loginPage__pin">
                        <h1>Sign in Pin</h1>
                        <h3 onClick={() => copyToClipboard(code)}>{code}</h3>
                        <p>Login to your account using this pin</p>
                        <h2>Keep your pin secret</h2>
                    </div>
                    :
                    <>
                        <h1 className="setupApp__header loginPage__header">Get Sign In Pin</h1>
                        <div className="loginPage__container">
                            <img className="" src="/image/google-logo.png" alt="" />
                            <Button variant="contained" onClick={signIn}>Create Pin</Button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
export default LoginPage
import React from 'react';

import './Login.css';

import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';

function Login() {

    const [{ user }, dispatch] = useStateValue();

    const signIn = event => {
        event.preventDefault()

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

    return (
        <div className="login">

            <div className="login__images">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="login_images" />
                <img className="login__text" src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="login_images" />
            </div>

            <div>
                <Button className="login__button" onClick={signIn} variant="contained" color="primary">Sign In</Button>
            </div>

        </div>
    )
}

export default Login

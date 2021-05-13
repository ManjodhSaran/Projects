import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../../firebase'

import './Login.css'
const Login = () => {

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .catch(err => alert(err.message));
    }

    return (
        <div className="login">
            <div className="login_logo">
                <img src="https://www.logo.wine/a/logo/Discord_(software)/Discord_(software)-Logo.wine.svg" alt="" />
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login

import React, { useState } from 'react'

import './Login.css'
import { Link } from '@material-ui/core'
import { auth } from '../firebase'
import { useHistory } from 'react-router'

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = event => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {

                history.push("/");
            })
            .catch(e => alert(e));
    }

    const register = event => {
        event.preventDefault()

        auth.createUserWithEmailAndPassword(email, password)
            .then(auth => {

                history.push("/");
            })
            .catch(e => alert(e));
    }

    return (
        <div className="login">

            <Link to="/">
                <img
                    className="login-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
                    alt="amazon"
                />
            </Link>

            <div className="login-container">
                <h1>Sign-in</h1>
                <form>
                    <h5 type="email">Email</h5>
                    <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                    <button onClick={login} type="submit" className="login-signInButton">Sign in</button>
                </form>

                <p>By signing in you are agreeing to the amazon`s conditions of Use and Sale.</p>
                <button onClick={register} className="login-registerButton">Create your Amazon Account</button>

            </div>

        </div>
    )
}

export default Login

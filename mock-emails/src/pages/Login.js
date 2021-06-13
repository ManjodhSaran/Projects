import { Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { strengthChecker, validateEmail } from '../functions/validation';
import '../styles/login.scss'
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import PacmanLoader from "react-spinners/PacmanLoader";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error2, setError] = useState(null);
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const signHook = useSignInWithEmailAndPassword(auth);

    const onSubmit = (e) => {
        e.preventDefault();
        setError(null)

        if (email && password) {
            if (validateEmail(email) !== false) {
                createUserWithEmailAndPassword(email, password)
            } else {
                setError('Email Not Valid')
            }
        } else {
            setError("Value Field Missing")
        }
    }

    useEffect(() => {
        error?.code === "auth/email-already-in-use" ?
            signHook[0](email, password)
            : setError(error?.message)

        if (signHook[3]) {
            setError(signHook[3])
        }

    }, [error, signHook[3]])

    return (
        <div className='login'>
            <form>

                <TextField
                    variant="outlined"
                    label="Create Email"
                    value={email}
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    helperText={email !== '' && (validateEmail(email) !== true ? "Email not valid" : '')}
                    error={email !== '' && (validateEmail(email) === false && true)}
                />

                <TextField
                    variant="outlined"
                    label="Create Password"
                    type='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    helperText={password !== '' && strengthChecker(password)}
                />

                {(error && !signHook[2]) && <Alert variant="outlined" severity="error">{error2}</Alert>}

                {!loading && !signHook[2] ?
                    <Button variant="outlined" type="submit" onClick={onSubmit}> Sign Up / In </Button>
                    :
                    <div className="loadingLogin">
                        <PacmanLoader size={15} color='#61799D' />
                    </div>
                }
            </form>
        </div>
    )
}

export default Login

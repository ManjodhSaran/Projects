import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider, users } from '../utils/firebase'

const Signup = () => {
    const signup = () => {
        auth.
            signInWithPopup(provider)
            .then(authUser => users.doc(authUser.user.email).set({ ...authUser.user.providerData[0] }))
    }
    return (
        <div>
            <Button onClick={signup}>Sign up / in</Button>
        </div>
    )
}

export default Signup

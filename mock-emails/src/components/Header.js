import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'
import HeaderMenu from './HeaderMenu'


const Header = () => {
    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false)

    return (
        <div className="header">
            <div className="left">
                <h2><span>M</span>ock <span>M</span>ails</h2>
            </div>
            <div className="right">
                <HeaderMenu user={user} />
            </div>
        </div>
    )
}

export default Header

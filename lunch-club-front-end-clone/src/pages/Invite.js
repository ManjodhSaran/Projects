import { Paper } from '@material-ui/core'
import React from 'react'
import Header from '../components/Header'
import '../styles/Invite.scss'

const Invite = () => {
    return (
        <div className='invite'>
            <Header active={3} />
            <div className="invite__content">
                <Paper elevation={3} className='invite__card' >
                    <h3>Build the Lunchclub community!</h3>
                    <p>Invite your friends, earn 5 Clubpoints when they sign up, and earn 5 more when they take their first meeting.</p>
                    <div className="sentInvite invite__cardInputs">
                        <input type="text" placeholder="Enter name or email" />
                        <button disabled>Send invite</button>
                    </div>
                    <div className="CopyInviteLink invite__cardInputs">
                        <input type="text" value='https://lunchclub.com/?invite_code=manjodh' disabled />
                        <button>Copy invite link</button>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default Invite

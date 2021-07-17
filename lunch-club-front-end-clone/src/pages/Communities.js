import { Paper } from '@material-ui/core'
import React from 'react'
import '../styles/Communities.scss'

const Communities = () => {
    return (
        <Paper className='communities'>
            <h3>Your communities</h3>
            <p>Lunchclub communities are invite-only communities meant to bring people with similar experiences closer together.</p>
            <p>You can adjust which ones you’d like to be a part of here.</p>
            <div className='communities__note'>
                <p>You’re not in any communities yet. Watch out for community invites from your connections!</p>
            </div>
        </Paper>
    )
}

export default Communities

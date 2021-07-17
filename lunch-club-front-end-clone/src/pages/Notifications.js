import { Paper } from '@material-ui/core'
import React from 'react'
import ToggleOption from '../components/ToggleOption'
import '../styles/Notifications.scss'

const Notifications = () => {
    return (
        <Paper className='notifications'>
            <h3>Email notifications</h3>
            <ToggleOption title='Instant Connect' text='Receive invites to special Instant Connect events' />
            <ToggleOption title='New features' text='Tell me when Lunchclub releases new features ' />
            <ToggleOption title='Chat' text='Let me know when I miss a new message on Lunchclub chat ' />
            <div className='notifications__buttons'>
                <button className='notifications__buttons1'>Unsubscribe from all emails</button>
                <button className='notifications__buttons2'>Delete my account</button>
            </div>
        </Paper>
    )
}

export default Notifications

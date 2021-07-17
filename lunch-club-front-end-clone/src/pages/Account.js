import { Paper } from '@material-ui/core'
import React from 'react'
import EditField from '../components/EditField'
import LocationIcon from '../assets/icons/Location.svg'
import GoogleIcon from '../assets/icons/google.png'
import '../styles/Account.scss'

const Account = () => {
    return (
        <Paper elevation={3} className='account'>
            <h3>Your main hub</h3>
            <p>Please select your physical location from the list below. You can update your location every six months. You can still receive global matches regardless of your physical location.</p>
            <EditField icon={LocationIcon} text={'Ludhiana, Punjab, India'} />

            <h3>Primary email</h3>
            <p>This is the email address for Lunchclub communications. For Google accounts, it is also where we place calendar holds and scheduled meetings.</p>
            <EditField text={'manjodhsaran39@gmail.com'} />

            <h3>Connected accounts</h3>
            <p>We recommend connecting as many Google accounts as possible to improve the relevance of your matches!</p>
            <EditField icon={GoogleIcon} text={'manjodhsaran39@gmail.com'} />
        </Paper>
    )
}

export default Account

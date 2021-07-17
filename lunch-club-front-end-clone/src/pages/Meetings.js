import React from 'react'
import Header from '../components/Header'
import ClippyIcon from '../assets/icons/clippy.svg'
import '../styles/Meetings.scss'
import { Paper } from '@material-ui/core'
import TimeSelector from '../components/TimeSelector'

const Meetings = () => {
    return (
        <div className='meetings'>
            <Header active={2} />
            <div className="meetings__content">
                <div className="meetings__note">
                    <img src={ClippyIcon} alt="" />
                    <div className="meetings__diamond"></div>
                    <p><span>Welcome to Lunchclub!</span>Sign up for your first match this week.</p>
                </div>
                <Paper elevation={3} className='meetings__card'>
                    <h3>Schedule your matches</h3>
                    <div className="meetings__timeSelector">
                        <TimeSelector day='Wed' date='Jul 14' notAvailable={'9:30am'} />
                        <TimeSelector day='Thu' date='Jul 15' />
                        <TimeSelector day='Fri' date='Jul 16' />
                    </div>
                    <hr />
                </Paper>
            </div>
        </div>
    )
}

export default Meetings

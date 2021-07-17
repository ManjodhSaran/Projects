import { Paper } from '@material-ui/core'
import React from 'react'
import ExploreIcon from '../assets/icons/explore.svg'
import '../styles/Goals.scss'

const Goals = () => {
    return (
        <Paper className='goals'>
            <h3>Your goals</h3>
            <p>Your goals will never be shared with anyone and are only used to make your matches relevant.</p>
            <p>Add more details to your goals to let us know what you are looking for!</p>
            <div className="goals__option">
                <img src={ExploreIcon} alt="" />
                <p>Explore other companies</p>
                <button>details</button>
            </div>
        </Paper>
    )
}

export default Goals

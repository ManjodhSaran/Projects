import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress, Paper } from '@material-ui/core';
import CelebrationIcon from '../assets/icons/celebration1.svg'
import '../styles/DailyPicks.scss'

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: '#CACAD0',
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#456ADD',
    },
}))(LinearProgress);

const DailyPicks = () => {
    return (
        <div className='dailyPicks'>
            <div className="dailyPicks__bar">
                <h6>6 out of 6 completed for today</h6>
                <BorderLinearProgress variant="determinate" value={100} />
            </div>
            <Paper elevation={3} className='dailyPicks__items'>
                <img src={CelebrationIcon} alt="" />
                <h3>You’re done for today!</h3>
                <p>Come back tomorrow to see your new Daily Picks!</p>
                <button>See activities from my connections</button>
            </Paper>
        </div>
    )
}

export default DailyPicks

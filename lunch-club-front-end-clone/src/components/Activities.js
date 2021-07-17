import { Paper } from '@material-ui/core'
import React from 'react'
import CelebrationIcon from '../assets/icons/celebration1.svg'
import MessageIcon from '../assets/icons/message.svg'
import '../styles/Activities.scss'
const Activities = () => {
    return (
        <div className='activities'>
            <Paper elevation={3} className='activities__content'>
                <h3><img src={CelebrationIcon} alt="" />That’s it for today, tell us what you think!</h3>
                <p>Have any suggestions on how we can improve our feed, or any insights you would like to see?</p>
                <button><img src={MessageIcon} alt="" />Send us feedback!</button>
            </Paper>
        </div>
    )
}

export default Activities

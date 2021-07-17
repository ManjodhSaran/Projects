import { Avatar, Paper } from '@material-ui/core'
import React from 'react'
import Header from '../components/Header'
import CoffeeIcon from '../assets/icons/coffee.svg'
import CoinIcon from '../assets/icons/coin.svg'
import LightingIcon from '../assets/icons/lighting.svg'
import UserActivityCard from '../components/UserActivityCard'
import '../styles/Connections.scss'

const Connections = () => {
    return (
        <div className='connections'>
            <Header active={4} />
            <div className="connections__content">
                <h3>Connection stats</h3>
                <Paper elevation={3} className='connections__card'>
                    <div className="connections__cardHeader">
                        <Avatar className='connection__avatar' />
                        <div className="user__activityCards">
                            <UserActivityCard icon={CoffeeIcon} title='Total meetings' score={0} />
                            <UserActivityCard icon={CoinIcon} title='Week streak' score={0} />
                            <UserActivityCard icon={LightingIcon} title='Clubpoints' score={0} />
                        </div>
                    </div>
                    <h3>Manjodh Saran</h3>
                </Paper>
                <h3>Past matches</h3>
                <Paper elevation={3} className='connections__card'>
                    <p>You have no past meetings, take a match and start a streak!</p>
                    <button>Sign up for match</button>
                </Paper>
            </div>
        </div>
    )
}

export default Connections

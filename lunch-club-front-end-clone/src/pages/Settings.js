import React, { useState } from 'react'
import Header from '../components/Header'
import Account from './Account'
import Communities from './Communities'
import Goals from './Goals'
import '../styles/Settings.scss'
import Notifications from './Notifications'

const Settings = () => {
    const [active, setActive] = useState(1)
    return (
        <div className='settings'>
            <Header />
            <div className="settings__content">
                <div className="home__nav">
                    <h3 className={active === 1 && 'home__nav--active'} onClick={() => setActive(1)}>Account</h3>
                    <h3 className={active === 2 && 'home__nav--active'} onClick={() => setActive(2)}>Goals</h3>
                    <h3 className={active === 3 && 'home__nav--active'} onClick={() => setActive(3)}>Communities</h3>
                    <h3 className={active === 4 && 'home__nav--active'} onClick={() => setActive(4)}>Notifications</h3>
                </div>
                {active === 1 && <Account />}
                {active === 2 && <Goals />}
                {active === 3 && <Communities />}
                {active === 4 && <Notifications />}
            </div>
        </div>
    )
}

export default Settings

import React, { useState } from 'react'
import Activities from '../components/Activities'
import DailyPicks from '../components/DailyPicks'
import Header from '../components/Header'
import '../styles/Home.scss'

const Home = () => {
    const [active, setActive] = useState(1)
    return (
        <div className="home">
            <Header active={1} />
            <div className="home__content">
                <div className="home__nav">
                    <h3 className={active === 1 && 'home__nav--active'} onClick={() => setActive(1)}>Daily Picks</h3>
                    <h3 className={active === 2 && 'home__nav--active'} onClick={() => setActive(2)}>Activities</h3>
                </div>
                {active === 1 ?
                    <DailyPicks />
                    :
                    <Activities />
                }
            </div>
        </div>
    )
}

export default Home

import React from 'react'

import './Header.css'

const Header = () => {
    return (
        <header>
            <div className="header__container">
                <img className='header__img' src="/assests/ip-image.png" alt="" />
                <h1 className="header__title">Tracker</h1>
            </div>
        </header>
    )
}

export default Header

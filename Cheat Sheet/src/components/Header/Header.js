import React from 'react'
import { useHistory } from 'react-router';
import './Header.css'
const Header = () => {
    const history = useHistory();
    return (
        <div className="header">
            <div className="header__container">
                <h1 onClick={() => history.push('/')}>Cheat Sheet</h1>
            </div>
        </div>
    )
}

export default Header

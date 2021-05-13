import React from 'react'

import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom'

import './Header.css'

function Header() {
    const history = useHistory();
    return (
        <div className="header">
            <Link to="/">
                <img className="header__logo" src="https://logodownload.org/wp-content/uploads/2016/10/Airbnb-Logo.png" alt="logo" />
            </Link>

            <div className="header__center">
                <input type="text" />
                <SearchIcon onClick={() => history.push('/search')} />
            </div>
            <div className="header__right">
                <p>Become a host</p>
                <LanguageIcon />
                <ExpandMoreIcon />
                <Avatar />
            </div>


        </div>
    )
}

export default Header

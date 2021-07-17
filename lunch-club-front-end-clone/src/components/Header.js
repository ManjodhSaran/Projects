import React from 'react'
import Logo from '../assets/icons/logo.svg'
import SearchIcon from '@material-ui/icons/Search';
import '../styles/Header.scss'
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';

const Header = ({ active }) => {
    const history = useHistory();
    return (
        <div className='header'>
            <div className='header__logo'>
                <img onClick={() => history.push('/home')} src={Logo} alt="appImage" />
                <div className="header__search">
                    <SearchIcon className="searchIcon" />
                    <input type="text" placeholder='Search  Lunchclub' />
                </div>
            </div>
            <Navbar active={active} />
        </div>
    )
}

export default Header

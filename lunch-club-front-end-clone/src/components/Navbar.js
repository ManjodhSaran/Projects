import React, { useState } from 'react'
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import HomeIcon from '@material-ui/icons/Home';
import TodayIcon from '@material-ui/icons/Today';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ScoreIcon from '../assets/icons/score.svg'
import { Avatar } from '@material-ui/core';
import NavbarItem from './NavbarItem';
import '../styles/Navbar.scss'

const Navbar = ({ active }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='navbar'>
            <NavbarItem to='/home' title="Home" active={active === 1} Icon={HomeIcon} />
            <NavbarItem to='/meetings' title="Meetings" active={active === 2} Icon={TodayIcon} />
            <NavbarItem to='/invite' title="Invite" active={active === 3} Icon={EmailOutlinedIcon} />
            <NavbarItem to='/connections' title="Connections" active={active === 4} Icon={PeopleAltIcon} />
            <NavbarItem to='/chat' title="Chat" active={active === 5} Icon={ChatBubbleRoundedIcon} />

            <div onClick={() => setShowMenu(!showMenu)} className="navbar__item navbar__dropDownIcon">
                <Avatar className="navbar__avatar" />
                <ArrowDropDownRoundedIcon fontSize='large' className='navbar__icon' />
            </div>

            {showMenu &&
                <ClickAwayListener onClickAway={() => setShowMenu(false)}>
                    <div className='navbar__dropDown'>
                        <div className='dropDown__userInfo'>
                            <Avatar className="dropDown__avatar" />
                            <div className="dropDown__name">
                                <h3>Manjodh Saran</h3>
                                <h4>View Profile</h4>
                            </div>
                            <div className='dropDown__score'>
                                <p>6</p>
                                <img src={ScoreIcon} alt="" />
                            </div>
                        </div>
                        <hr />
                        <NavbarItem to='/settings' title="Settings" Icon={SettingsIcon} small />
                        <NavbarItem to='/home' title="Give Feedback" Icon={ChatBubbleOutlineOutlinedIcon} small />
                        <NavbarItem to='/faq' title="FAQ" Icon={HelpOutlineRoundedIcon} small />
                        <NavbarItem to='/' title="Log Out" Icon={ExitToAppRoundedIcon} small />
                    </div>
                </ClickAwayListener>
            }
        </div>
    )
}

export default Navbar

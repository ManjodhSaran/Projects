import React from 'react'
import { Link } from 'react-router-dom'

const NavbarItem = ({ to, title, Icon, active, small }) => {
    return (
        small ?
            <Link to={to} className="dropDown__item">
                <div className="navbar__item dropDown__itemIconContainer">
                    <Icon className='navbar__icon navbar__itemIcon' fontSize='small' />
                </div>
                <p>{title}</p>
            </Link>
            :
            <Link to={to} title={title} className={`navbar__item ${active && 'navbar--active'}`}>
                <Icon className='navbar__icon' fontSize='small' />
            </Link>
    )
}

export default NavbarItem

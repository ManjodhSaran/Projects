import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Style
import "./Header.css";

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';

// Avatar
import { Avatar } from '@material-ui/core';

function Header() {
    const [search_query, setSearch_query] = useState("");

    return (
        <div className="header">
            <div className="left-header">
                <MenuIcon className="menu-icon" />

                <Link className="youtubeLogo" to="/">
                    <YouTubeIcon className="youtube-icon" />
                    <p className="txtYoutube">YouTube</p>
                </Link>

            </div>

            <div className="middle-header">
                <input
                    placeholder="Search"
                    type="text"
                    value={search_query}
                    onChange={e => setSearch_query(e.target.value)}
                />
                <Link to={`/search/${search_query}`}>
                    <SearchIcon disabled={!search_query} className="search-icon" />
                </Link>
            </div>

            <div className="right-header">
                <VideoCallIcon className="header_icon upload-icon" />
                <AppsIcon className="header_icon apps-icon" />
                <NotificationsIcon className="header_icon bell-icon" />
                <Avatar alt="username" src="https://lh3.googleusercontent.com/ogw/ADGmqu8bb-01SYM3FshpOuIaXK64PF3WEjfYcIhGikCx=s83-c-mo" />
            </div>

        </div>
    )
}

export default Header;

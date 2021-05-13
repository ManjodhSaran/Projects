import React from 'react'

import './Sidebar';
import SidebarRow from './SidebarRow/SidebarRow';

// ICONS
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStateValue } from '../StateProvider';

function Sidebar() {

    const [{ user }] = useStateValue();

    return (
        <div className="sidebar">
            <SidebarRow title={user.displayName} src={user.photoURL} />
            <SidebarRow title="COVID-19 Information Center" Icon={LocalHospitalIcon} />
            <SidebarRow title="Pages" Icon={EmojiFlagsIcon} />
            <SidebarRow title="Friends" Icon={PeopleIcon} />
            <SidebarRow title="Messenger" Icon={ChatIcon} />
            <SidebarRow title="Market Place" Icon={StorefrontIcon} />
            <SidebarRow title="Videos" Icon={VideoLibraryIcon} />
            <SidebarRow title="Marketplace" Icon={ExpandMoreIcon} />
        </div>
    )
}

export default Sidebar

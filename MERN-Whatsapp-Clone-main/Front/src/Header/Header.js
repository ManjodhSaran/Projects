import React from 'react'

import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import './Header.css'

function Header() {

    return (
        <div className="header">
            <div className="header-app-name">
                <WhatsAppIcon className="header-logo" />
                <h1>WHATSAPP WEB</h1>
            </div>
        </div>
    )
}

export default Header

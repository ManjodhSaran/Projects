import React from 'react'

import './MainApp.css'

import Contacts from './Contacts/Contacts'
import Chat from './Chat/Chat'

function MainApp() {
    return (
        <div className="main-app">
            <Contacts />
            <Chat />
        </div>
    )
}

export default MainApp

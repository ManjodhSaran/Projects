import React from 'react'
import EmailViewer from '../components/EmailViewer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import '../styles/Dashboard.scss'

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Header />
            <div className="body">
                <Sidebar />
                <EmailViewer />
            </div>
        </div>
    )
}

export default Dashboard

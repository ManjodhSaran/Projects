import React from 'react'

import './SidebarRow.css'

function SidebarRow({ title, Icon, selected }) {
    return (
        <div className={`sidebar-row ${selected && "selected"}`}>
            <Icon className="side-icon" />
            <h2 className="sidebar-title">{title}</h2>
        </div>
    )
}

export default SidebarRow

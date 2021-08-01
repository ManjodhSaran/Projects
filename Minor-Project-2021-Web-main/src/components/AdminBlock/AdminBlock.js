import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Switch, Route, Link, useHistory } from 'react-router-dom';
import { selectUser } from '../../features/appSlice';
import './AdminBlock.css'
import Bin from './Bin/Bin';
import Flags from './Flags/Flags'
import Messages from './Messages/Messages';
import RecentUpdates from './RecentUpdates/RecentUpdates';
import Staff from './Staff/Staff'
import Users from './Users/Users'
const AdminBlock = () => {
    const history = useHistory()
    const user = useSelector(selectUser);
    const [active, setActive] = useState("recent");
    useEffect(() => window.location.pathname == '/admin' && history.replace("/admin/recent%20update"), [])
    document.title = `${active.toUpperCase().substr(0, 1)}${active.substr(1)} || Admin Block`;
    return (
        <div className="adminBlock">
            {user?.role === "admin" || user?.role === "mod" ?
                <>
                    <div className="adminHeader">
                        <Link to="/"><p className={`${active === "home" ? "adminHeader--acive" : ""}`}>Home</p></Link>
                        <Link to="/admin/recent update"><p className={`${active === "recent" ? "adminHeader--acive" : ""}`}>Recent Updates</p></Link>
                        <Link to="/admin/flags"><p className={`${active === "flags" ? "adminHeader--acive" : ""}`}>Flags</p></Link>
                        <Link to="/admin/users"><p className={`${active === "users" ? "adminHeader--acive" : ""}`}>Users</p></Link>
                        <Link to="/admin/staff"><p className={`${active === "staff" ? "adminHeader--acive" : ""}`}>Staff</p></Link>
                        <Link to="/admin/bin"><p className={`${active === "bin" ? "adminHeader--acive" : ""}`}>Bin</p></Link>
                    </div>
                    <div className='adminBody'>
                        <Route path="/admin/recent update"><RecentUpdates setActive={setActive} /></Route>
                        <Route path="/admin/flags"><Flags setActive={setActive} /></Route>
                        <Route path="/admin/staff"><Staff setActive={setActive} /></Route>
                        <Route path="/admin/users"><Users setActive={setActive} /></Route>
                        <Route path="/admin/messages"><Messages setActive={setActive} /></Route>
                        <Route path="/admin/bin"><Bin setActive={setActive} /></Route>
                    </div>
                </>
                :
                <div className="notAccess">
                    <h2>Access Denied</h2>
                    <Link to="/">
                        <p>Go to Home</p>
                    </Link>
                </div>
            }
            {!user?.role && <CircularProgress />}
        </div>
    )
}
export default AdminBlock
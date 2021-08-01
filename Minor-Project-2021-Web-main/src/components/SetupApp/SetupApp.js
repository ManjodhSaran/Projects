import { Button, CircularProgress, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory, Link } from 'react-router-dom'
import { selectUser } from '../../features/appSlice'
import './SetupApp.css'
import Page1 from './SetupPages/Page1'
import Page4 from './SetupPages/Page4'
const SetupApp = () => {
    const user = useSelector(selectUser);
    const history = useHistory();
    const [name, setName] = useState("");
    const [repoId, setRepoId] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [makePrivate, setMakePrivate] = useState(false);
    useEffect(() => user && setRepoId(`${user.uid}-${name}`), [name, user])
    return (
        <div className="setupApp animate__animated animate__fadeInUp">
            {user ?
                user.role
                    ?
                    <div className="setupApp__admin">
                        <Route path="/setup application">{history.replace(`/setup application/page${activePage}`)}</Route>
                        <Route path="/setup application/page1"><Page1 repoId={repoId} makePrivate={makePrivate} setMakePrivate={setMakePrivate} name={name} user={user} setName={setName} setActivePage={setActivePage} user={user} /></Route>
                        <Route path="/setup application/page4"><Page4 repoId={repoId} makePrivate={makePrivate} name={name} setActivePage={setActivePage} user={user} /> </Route>
                    </div>
                    :
                    <div className="setupApp__accessDenied">
                        <Link to="/">
                            <Button variant="contained" color="default">Signin/Signup</Button>
                        </Link>
                    </div>
                :
                <CircularProgress />
            }
        </div>
    )
}
export default SetupApp
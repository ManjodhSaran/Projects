import { Avatar, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectUser, showNotification } from '../../features/appSlice';
import { repos as reposRef } from '../../utils/firebase';
import './UserPage.css'
const UserPage = () => {
    const user = useSelector(selectUser);
    const [repos, setRepos] = useState([]);
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        user && reposRef.onSnapshot((snapshot) => {
            let arr = [];
            snapshot.docs.map(doc => {
                if (doc.data().createdBy === user.uid) {
                    arr.push({ id: doc.id, data: doc.data() })
                }
            })
            setRepos(arr);
        })
    }, [user])
    let joined = null
    if (user) { joined = JSON.parse(user.joined) }
    const deleteApp = (id, name) => (window.confirm(`Are you sure to Delete '${id}' App.\n You can restore it anytime.`)) && reposRef.doc(id).set({ active: false }, { merge: true }).then(() => dispatch(showNotification(`${name} deleted. `)));
    const restoreApp = (id, name) => reposRef.doc(id).set({ active: true }, { merge: true }).then(() => dispatch(showNotification(`${name} Restored. `)));
    const makePrivate = (id, name) => reposRef.doc(id).set({ private: true }, { merge: true }).then(() => dispatch(showNotification(`${name} is Private Now. `)));
    const makePublic = (id, name) => reposRef.doc(id).set({ private: false }, { merge: true }).then(() => dispatch(showNotification(`${name} is Public Now. `)));
    return (
        <div className="userPage">
            <div className="userPage__container">
                {user ?
                    <>
                        <div className="userPage__info">
                            <Avatar className="userPage__avatar" src={user.photoURL} />
                            <div>
                                <h1>{user.displayName}</h1>
                                <p>Email: {user.email}</p>
                                <p>UID: {user.uid}<small>(provided by google)</small></p>
                                {user.phoneNumber && <p>Phone Number:  {user.phoneNumber}</p>}
                                <p>Contributions:  {user.contro}</p>
                                {user.defaultApp && <p>Default App:  {user.defaultApp.split('-')[1]}</p>}
                                {user.favApp && <p>Favourate App:  {user.favApp.split('-')[1]}</p>}
                                {user.role && <p>Role:  {user.role}</p>}
                                {user.theme && <p>Theme:  {user.theme}</p>}
                                <p>Joined: {joined.split('T').pop().split('.')[0]}, {joined.substr(0, 10)}</p>
                                <p className="userPage__note">This is all your data on our server.</p>
                            </div>
                        </div>
                        {repos &&
                            <div className="userApps">
                                <h3>Your Apps</h3>
                                {repos.map(({ id, data }, i) =>
                                    <div key={`app__${data.name}__${i}`}
                                        className="userApps__app">
                                        <h4>{data.name}</h4>
                                        <p>Made on: {data.madeOn?.toDate().toDateString()}</p>
                                        <button onClick={() => history.push(`/application/${id}`)} className="userApps__appButtonGoto">Go to App</button>
                                        {data.private ?
                                            <button onClick={() => makePublic(id, data.name)} className="userApps__appButton">Make Public</button>
                                            :
                                            <button onClick={() => makePrivate(id, data.name)} className="userApps__appButton userApps__appButton--Private">Make Private</button>
                                        }
                                        {data.active ?
                                            <button onClick={() => deleteApp(id, data.name)} className="userApps__appButtonDelete">Delete App</button>
                                            :
                                            <button onClick={() => restoreApp(id, data.name)} className="userApps__appButtonDelete userApps__appButtonDelete--restore">Restore App</button>
                                        }
                                    </div>
                                )}
                            </div>}
                    </> : <CircularProgress />
                }
            </div>
        </div>
    )
}
export default UserPage
import React, { useEffect, useState } from 'react'
import CallMissedIcon from '@material-ui/icons/CallMissed';
import { Button, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { selectUser, setRepoId, showNotification } from '../../../features/appSlice';
import { repos, users } from '../../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import './HomeBox.css'

const HomeBox = ({ repoId, repoName, createdBy, isPrivate, isActive }) => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory()
    const [starred, setStarred] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const setLastApp = () => {
        if (user) {
            users.doc(user.uid)
                .set(
                    { lastUsedApp: repoName },
                    { merge: true }
                )
        }
    }

    useEffect(() => {
        if (user) {
            user.favApp === repoName && setStarred(true)
        }
    }, [user, repoName])

    const handleStar = () => {
        if (user) {
            if (!starred) {
                users.doc(user.uid)
                    .set(
                        { favApp: repoName },
                        { merge: true }
                    ).then(() => setStarred(true))
                    .then(() => dispatch(showNotification(`Favourite App set to ${repoName}`)))
            } else {
                users.doc(user.uid)
                    .set(
                        { favApp: null },
                        { merge: true }
                    ).then(() => setStarred(false))
            }
        }
    }

    const setDefaultApp = () => {
        if (user) {
            users.doc(user.uid)
                .set(
                    { defaultApp: repoId },
                    { merge: true }
                ).then(() => dispatch(showNotification(`Default App set to ${repoName}`)))
                .then(() => {
                    dispatch(setRepoId(repoId))
                    history.replace(`/application/${repoId}`)
                })
        }
    }

    const deleteApp = () => {
        const ref = repos.doc(repoId);

        if (createdBy === user.uid || user.role === "admin") {
            if (window.confirm(`You are deleting '${repoName}' App,do you want to continue.\nYou can restore it anytime by visit user page by clicking on Profile Pic.`)) {
                ref.set({ active: false }, { merge: true }).then(() => dispatch(showNotification(`${repoName} App no longer exists`))).then(() => setDeleted(true));
            }
        }
    }

    return (
        isActive && (isPrivate ?
            (user && ((createdBy === user.uid || user.role === "admin" || user.role === "mod") &&
                <div onClick={() => dispatch(setRepoId(repoId))} className={`home__box animate__animated animate__backInUp ${isPrivate && "home__boxIsPrivate "} ${deleted && "animate__fadeOutDown"} `}>
                    {user &&
                        (starred ?
                            <IconButton className=" home__iconButton" onClick={handleStar}><StarIcon className="home__starIcon" /></IconButton>
                            :
                            <IconButton className="home__iconButton" onClick={handleStar}><StarBorderIcon className="home__starIcon" /></IconButton>
                        )
                    }
                    {user &&
                        ((user.role === "admin" || createdBy === user.uid) &&
                            <IconButton className=" home__iconButtonLeft home__iconButton" onClick={deleteApp}><CloseIcon className="home__closeIcon" /></IconButton>
                        )
                    }
                    <Link to={`/application/${repoId}`} className="home__buttonLink" onClick={setLastApp}>
                        <Button className="home__button">{repoName}<CallMissedIcon className="home__enterIcon" /></Button>
                    </Link>
                    {user &&
                        (user.defaultApp === repoId
                            ?
                            <div className="home__default" style={{ backgroundColor: 'black', color: 'whitesmoke' }}>
                                <p>Default</p>
                            </div>
                            :
                            <div onClick={setDefaultApp} className="home__default">
                                <p>set as default</p>
                            </div>
                        )

                    }
                </div>))
            :
            <div onClick={() => dispatch(setRepoId(repoId))} className={`home__box animate__animated animate__backInUp ${deleted && "animate__fadeOutDown"} `}>
                {user &&
                    (starred ?
                        <IconButton className=" home__iconButton" onClick={handleStar}><StarIcon className="home__starIcon" /></IconButton>
                        :
                        <IconButton className="home__iconButton" onClick={handleStar}><StarBorderIcon className="home__starIcon" /></IconButton>
                    )
                }
                {user &&
                    ((user.role === "admin" || createdBy === user.uid) &&
                        <IconButton className=" home__iconButtonLeft home__iconButton" onClick={deleteApp}><CloseIcon className="home__closeIcon" /></IconButton>
                    )
                }
                <Link to={`/application/${repoId}`} className="home__buttonLink" onClick={setLastApp}>
                    <Button className="home__button">{repoName}<CallMissedIcon className="home__enterIcon" /></Button>
                </Link>
                {user &&
                    (user.defaultApp === repoId
                        ?
                        <div className="home__default" style={{ backgroundColor: 'black', color: 'whitesmoke' }}>
                            <p>Default</p>
                        </div>
                        :
                        <div onClick={setDefaultApp} className="home__default">
                            <p>set as default</p>
                        </div>
                    )
                }
            </div>)
    )
}

export default HomeBox
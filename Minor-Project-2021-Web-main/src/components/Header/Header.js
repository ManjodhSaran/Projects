import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button } from '@material-ui/core';
import { Detector } from "react-detect-offline";
import './Header.css'
import Login from '../Login/Login';
import { Link, useHistory } from 'react-router-dom';
import { logout, resetRepoId, selectRepoId, selectUser, showNotification } from '../../features/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth, users } from '../../utils/firebase';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const Header = () => {

    // Detect click outsite div

    const wrapperRefHeader = useRef(null);
    useOutsideAlerter(wrapperRefHeader);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowMenu(false)
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    // 

    const user = useSelector(selectUser);
    const repoId = useSelector(selectRepoId);
    const repoName = repoId && repoId.split('-')[1]
    const dispatch = useDispatch()
    const history = useHistory();
    const [openSignin, setOpenSignin] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [usersList, setUsersList] = useState([]);
    useEffect(() => users.onSnapshot(snapshot => setUsersList(snapshot.docs.map(doc => doc.data()))), [])

    useEffect(() => {
        if (user) {
            if (user.theme) {
                if (user.theme === "dark") {
                    document.querySelector("body").style.filter = "invert(1)";
                    setDarkMode(true);
                }
            }
        }
    }, [user])

    const logoutApp = () => auth.signOut().then(() => dispatch(logout())).then(() => history.replace('/'))

    const handleDarkMode = () => {
        if (darkMode) {
            setDarkMode(false);
            document.querySelector("body").style.filter = "invert(0)";
            if (user) {
                users.doc(user.uid)
                    .set(
                        { theme: "light" },
                        { merge: true }
                    )
            }
        } else {
            setDarkMode(true);
            document.querySelector("body").style.filter = "invert(1)";
            if (user) {
                users.doc(user.uid)
                    .set(
                        { theme: "dark" },
                        { merge: true }
                    )
            }
        }
        setShowMenu(false)
    }

    const resetDefault = () => users.doc(user.uid).set({ defaultApp: null }, { merge: true }).then(() => dispatch(showNotification(`Default App Reset`)))
        .then(() => {
            dispatch(resetRepoId());
            history.replace(`/`);
            setShowMenu(false);
        })


    const handleHomeButton = () => {
        history.push('/');
        dispatch(resetRepoId());
    }

    return (
        <div className="header  animate__animated animate__zoomInDown">
            <div className="header__container">
                <h4>
                    <Link title={"Home"} to="/" onClick={handleHomeButton}>NOTES APP</Link>
                    <p style={{ color: "red", fontSize: "medium", marginLeft: "2px", marginTop: "10px" }}>Beta</p>
                    {repoId !== null ?
                        <span onClick={() => history.push(`/application/${repoId}`)}>• {repoName && repoName.toUpperCase()}</span>
                        :
                        <span onClick={() => history.push(`/`)}>•  Home</span>
                    }
                </h4>
                {user ?
                    (
                        <div className="app__user">
                            <Detector
                                render={({ online }) => (
                                    <div className={`connection ${online ? "connection__normal" : "connection__warning"}`}>
                                        {!online && <WifiOffIcon fontSize="large" />}
                                    </div>
                                )}
                            />
                            <div className="app__userDetails" ref={wrapperRefHeader}>
                                {showMenu &&
                                    <div onClick={() => setShowMenu(false)} className="app__dropdown">
                                        <div onClick={() => history.push(`/user/${user.displayName}`)} className="app__dropdown1">
                                            <Avatar className="userAvatar" src={user?.photoURL} />
                                            <div className="app__dropdownInfo">
                                                <h5>{user?.displayName}</h5>
                                                <p className={`role ${user.role === "admin" && "role__admin"}`}>{user.role}</p>
                                            </div>
                                        </div>
                                        <div className="app__dropdown2">
                                            {darkMode ?
                                                <p onClick={handleDarkMode}>Light Mode<Brightness7Icon className="app__dropdownIcon" /></p>
                                                :
                                                <p onClick={handleDarkMode}>Dark Mode<Brightness4Icon className="app__dropdownIcon" /></p>
                                            }

                                            <Link to="/user/favorites" >
                                                <p>Starred Notes<BookmarkIcon className="app__dropdownIcon" /></p>
                                            </Link>
                                            {(user.role === "admin" || user.role === "mod") &&
                                                <Link to="/admin" onClick={() => setShowMenu(false)}>
                                                    <p>Admin Block<SupervisorAccountIcon className="app__dropdownIcon" /></p>
                                                </Link>}
                                            {user?.defaultApp && <p onClick={resetDefault}>Reset Default({repoName && repoName.toUpperCase()})<RotateLeftIcon className="app__dropdownIcon" /></p>}
                                            <p onClick={() => history.push('/contact')}>Contact Us<ContactPhoneIcon className="app__dropdownIcon" /></p>
                                            <p onClick={logoutApp}>Logout<ExitToAppIcon className="app__dropdownIcon" /></p>
                                            {users && <p className="header__userCount"><span>{usersList.length} Users</span></p>}
                                            <Link to={'/android'} className="androidLink">
                                                <div onClick={() => setShowMenu(false)}>
                                                    <img src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/OS_Android.png" alt="" />
                                                    <p>Get App</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                }
                            </div>
                            <Avatar onClick={() => history.push(`/user/${user.displayName}`)} className={`userAvatar ${darkMode ? "userAvatarDark" : ""}`} src={user?.photoURL} />
                            {showMenu
                                ?
                                <CloseIcon className="dropdown__button" fontSize="large" onClick={() => setShowMenu(false)} />
                                :
                                <DragIndicatorIcon className="dropdown__button" fontSize="large" onClick={() => setShowMenu(true)} />
                            }
                        </div>
                    ) : (
                        <div className="app__sign">
                            <Detector
                                render={({ online }) => (
                                    <div className={`connection__login ${online ? "connection__normal" : "connection__warning"}`}>
                                        {!online && <WifiOffIcon fontSize="large" />}
                                    </div>
                                )}
                            />
                            <img onClick={() => setOpenSignin(true)} className="googleIcon" src="/image/google-logo.png" alt="" />
                            <Button variant="contained" onClick={() => setOpenSignin(true)}>Sign In</Button>
                            <Login openSignin={openSignin} setOpenSignin={setOpenSignin} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Header
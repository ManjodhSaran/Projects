import React, { useEffect, useRef, useState } from 'react'
import { rdb } from '../../utils/firebase';
import './Messenger.css'
import ChatCard from './ChatCard/ChatCard';
import { selectUser, selectOpenMessenger, setOpenMessenger, closeMessenger } from '../../features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress } from '@material-ui/core';
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ChatIcon from '@material-ui/icons/Chat';
import Login from '../Login/Login';
import ServerChat from './ServerChat/ServerChat';
const Messenger = () => {
    const [online, setOnline] = useState([]);
    const [activeManager, setActiveManager] = useState(null);
    const open = useSelector(selectOpenMessenger)
    const [openSignin, setOpenSignin] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    document.title = open ? "Messenger" : "Notes App"
    useEffect(() => {
        const rdbRef = rdb.ref('/onlineUsers/');
        user && rdbRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setOnline(Object.keys(data).map(key => data[key]))
        });
    }, [user]);
    const wrapperRefHeader = useRef(null);
    useOutsideAlerter(wrapperRefHeader);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    dispatch(closeMessenger())
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [ref]);
    }

    const searchFunction = () => {
        let arr = []
        if (online) {
            for (let i = 0; i < online.length; i++) {
                let str = online[i].userData.displayName.toLowerCase();
                if (str.match(query.toLowerCase())) {
                    arr.push(online[i]);
                }
                arr && setSearchResult(arr)
            }
        }
    }

    useEffect(() => query ? searchFunction() : setSearchResult([]), [query])

    return (
        <div className={`messenger ${open ? "messenger--open" : "messenger--close"}`} ref={wrapperRefHeader}>
            <div className="messenger__header">
                {open ?
                    <KeyboardArrowRightIcon onClick={() => dispatch(closeMessenger())} fontSize="large" className="messenger__headerIcon" />
                    :
                    <ChatIcon onClick={() => dispatch(setOpenMessenger())} fontSize="large" className="messenger__headerIcon messenger__headerIconChat" />
                }
                <h2>Messenger</h2>
            </div>
            {user ?
                <>
                    <div className="messenger__bodySearch">
                        <form className="notesSearch__form">
                            <Input
                                placeholder="Search..."
                                className="notesSearch__formInput animate__animated animate__bounceInRight"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                            />
                            <SearchIcon className="notesSearch__formSearchIcon notesSearch__formSearchIcon--messenger" />
                            {query && <ClearIcon onClick={() => setQuery("")} className=" notesSearch__formClearIcon--messenger " />}
                        </form>
                        {(query && searchResult.length === 0) && <p className="text-danger font-weight-bold">No User found</p>}
                    </div>
                    <div className="messenger__body">
                        <ServerChat index={1325} activeManager={activeManager} setActiveManager={setActiveManager} />
                        {online ?
                            (searchResult.length === 0 &&
                                online.map((user, index) =>
                                    <ChatCard query={query} index={index} key={user.userData.uid} user={user} activeManager={activeManager} setActiveManager={setActiveManager} />
                                ))
                            : <CircularProgress />
                        }
                        {searchResult &&
                            searchResult.map((user, index) =>
                                <ChatCard query={query} index={index} key={user.userData.uid} user={user} activeManager={activeManager} setActiveManager={setActiveManager} />
                            )
                        }
                    </div>
                </>
                :
                <div>
                    <Button variant="contained" onClick={() => setOpenSignin(true)}>Sign In</Button>
                    <Login openSignin={openSignin} setOpenSignin={setOpenSignin} />
                </div>
            }
        </div>
    )
}
export default Messenger
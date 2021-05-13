import React, { useState, useEffect } from 'react'

import ContactsHeader from './ContactsHeader/ContactsHeader'

import SearchIcon from '@material-ui/icons/Search';

import './Contacts.css'

import ContactsList from './ContactsList/ContactsList';
import db from '../../firebase/firebase';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../StateProvider';


function Contacts() {

    const [search, setSearch] = useState("");
    const [allUsers, setAllUsers] = useState([]);


    const [{ user, otherUserId }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection("allUsers").onSnapshot(snapshot => setAllUsers(snapshot.docs.map(doc => doc.data().userInfo)))
    }, [])

    const goToUserChat = (e) => {
        dispatch({
            type: "SET_OTHER_USER_ID",
            otherUserId: e.target.id
        })
    }

    return (
        <div className="contacts">
            <ContactsHeader />

            <div className="contacts-search-main">
                <div className="contacts-search-container">

                    <div className="contacts-search">

                        <SearchIcon className="contacts-search-icon" />

                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search or start new chat"
                        />
                    </div>
                </div>

                <div className="contacts-search-results">
                    {allUsers.map(user =>
                        <div id={user.uid} onClick={goToUserChat} className="contacts-search-result">
                            <Avatar id={user.uid} src={user.photoURL} />
                            <h3 id={user.uid} >{user.name}</h3>
                        </div>
                    )}
                </div>


            </div>
            <ContactsList />
        </div>
    )
}

export default Contacts

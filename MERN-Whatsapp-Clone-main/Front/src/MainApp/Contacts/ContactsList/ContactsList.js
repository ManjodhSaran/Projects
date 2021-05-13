import React, { useState, useEffect } from 'react'

import './ContactsList.css'
import Contact from './Contact/Contact'
import db from '../../../firebase/firebase';
import { useStateValue } from '../../../StateProvider';


function ContactsList() {

    const [contacts, setContacts] = useState([]);

    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {

        const userfromdb = db
            .collection('Users')
            .doc(user.uid)
            .get()
        // .then(doc => console.log(doc.data()))





        // db.collection("Users").add({ name: "here2" });

        // db.collection("Users").doc("uid_101282744790893230453").onSnapshot(doc => console.log(doc.data()))


    }, [])

    return (
        <div className="contacts-list">

            {contacts.map(contact =>

                <Contact
                    avatar={user.photoURL}
                    userId={user.uid}
                    title={contact}
                    msgStatus="seen"
                    // seen || delivered || send
                    lastmsg="kidna"
                    time="2:30 PM"
                />

            )}
        </div>
    )
}

export default ContactsList

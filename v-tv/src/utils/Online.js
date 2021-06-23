import React from 'react'
import firebase from 'firebase';
import { auth, rooms } from './firebase';
const Online = () => {
    const getDateTime = () => {
        const date = new Date()
        return (`${date.getHours()}:${date.getMinutes()}, ${date.getDate()}-${date.getMonth() + 1}`)
    }
    auth.onAuthStateChanged(authUser => {
        if (authUser) {
            const uid = authUser.providerData[0].uid;
            const userStatusDatabaseRef = firebase.database().ref('/onlineUsers/' + uid);
            const isOfflineForDatabase = { state: 'offline', last_changed: getDateTime(), userData: authUser.providerData[0] };
            const isOnlineForDatabase = { state: 'online', last_changed: getDateTime(), userData: authUser.providerData[0] };
            firebase.database().ref('.info/connected').on('value', function (snapshot) {
                if (snapshot.val() == false)
                    return;
                userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
                    userStatusDatabaseRef.set(isOnlineForDatabase);
                    rooms.doc
                });
            });
        }
    });
    return (<div className="online"></div>)
}
export default Online
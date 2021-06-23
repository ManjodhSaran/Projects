import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCClrDZntVgOhR38gJ1Nvrr42Hy5mybNCY",
    authDomain: "vtv-sync.firebaseapp.com",
    projectId: "vtv-sync",
    storageBucket: "vtv-sync.appspot.com",
    messagingSenderId: "770252678583",
    appId: "1:770252678583:web:41d272e3674fc3dcb6b432",
    measurementId: "G-EWDTJ9WHRK"
};

const app = !firebase.apps.length ?
    firebase.initializeApp(firebaseConfig)
    :
    firebase.app()

const db = app.firestore();
const auth = app.auth();
const users = db.collection('users');
const rooms = db.collection('rooms');

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, users, rooms }
import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9dp2JIoWM_BEoYdS9v4rg_yaOTG_oleI",
    authDomain: "whatsapp-2-next-js.firebaseapp.com",
    projectId: "whatsapp-2-next-js",
    storageBucket: "whatsapp-2-next-js.appspot.com",
    messagingSenderId: "1062690277203",
    appId: "1:1062690277203:web:3a9ff692815f7dcaf583a6",
    measurementId: "G-SYHHGRH4KB"
};

const app = !firebase.apps.length ?
    firebase.initializeApp(firebaseConfig)
    :
    firebase.app()

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }
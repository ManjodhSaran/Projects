import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCc0tJjP5mrnYXzYcnR7rKhhp8_aD94FnE",
    authDomain: "whatsapp-8.firebaseapp.com",
    databaseURL: "https://whatsapp-8.firebaseio.com",
    projectId: "whatsapp-8",
    storageBucket: "whatsapp-8.appspot.com",
    messagingSenderId: "295445575602",
    appId: "1:295445575602:web:66fa57ed5e38ec4b02d6ab",
    measurementId: "G-NZ697MSM5S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider };

export default db;
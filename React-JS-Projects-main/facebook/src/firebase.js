import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCdYYETpv9zKBXzjiOr8vgzjJG-jSlWS1I",
    authDomain: "facebook-1325.firebaseapp.com",
    databaseURL: "https://facebook-1325.firebaseio.com",
    projectId: "facebook-1325",
    storageBucket: "facebook-1325.appspot.com",
    messagingSenderId: "842355876258",
    appId: "1:842355876258:web:0404a3aefd3ae9780312fb",
    measurementId: "G-3E7N071JTK"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider };

export default db;
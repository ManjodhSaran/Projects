import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpubGQctKi41Z8uABIeLjgVo8_C9_9lvI",
    authDomain: "gne-notes.firebaseapp.com",
    databaseURL: "https://gne-notes-default-rtdb.firebaseio.com",
    projectId: "gne-notes",
    storageBucket: "gne-notes.appspot.com",
    messagingSenderId: "937814444582",
    appId: "1:937814444582:web:23df34029ba64c36c774e7",
    measurementId: "G-Z8D7G2K3CW"
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);

let firebaseApp;
if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
    firebaseApp = firebase.app();
}

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const rdb = firebase.database();
const storage = firebase.storage();

const repos = db.collection("repos");
const users = db.collection("Users");
const appData = db.collection('admin').doc("appData");

export { db, auth, provider, rdb, storage, repos, users, appData }
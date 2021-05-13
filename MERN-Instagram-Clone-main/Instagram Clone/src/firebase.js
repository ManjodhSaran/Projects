import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBSlJ0Gmg62kj0g4Mm8SMcFtP3mzGKDxo4",
    authDomain: "instagram-e4ed8.firebaseapp.com",
    databaseURL: "https://instagram-e4ed8.firebaseio.com",
    projectId: "instagram-e4ed8",
    storageBucket: "instagram-e4ed8.appspot.com",
    messagingSenderId: "494598440883",
    appId: "1:494598440883:web:ad62b90942a28e3e93adc6",
    measurementId: "G-EW57LFQ156"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
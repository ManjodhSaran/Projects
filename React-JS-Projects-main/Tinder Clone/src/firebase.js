import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyApPshAcyoG3T37GIIcR47HKCTvXPQwXrg",
    authDomain: "tinder-511c4.firebaseapp.com",
    databaseURL: "https://tinder-511c4.firebaseio.com",
    projectId: "tinder-511c4",
    storageBucket: "tinder-511c4.appspot.com",
    messagingSenderId: "397047500136",
    appId: "1:397047500136:web:a280de7f86411d2fe39add",
    measurementId: "G-KXBRG2YLP3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

export default database;

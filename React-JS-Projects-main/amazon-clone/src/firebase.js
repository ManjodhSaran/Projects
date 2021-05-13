import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBZywrCh3EuQxdOo1CKeU27AMemzDqF8hc",
    authDomain: "amazoon-1325.firebaseapp.com",
    databaseURL: "https://amazoon-1325.firebaseio.com",
    projectId: "amazoon-1325",
    storageBucket: "amazoon-1325.appspot.com",
    messagingSenderId: "886679323600",
    appId: "1:886679323600:web:7551f0d6ff84caf7b0afd5",
    measurementId: "G-9PZJJZZM4J"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export { db, auth };
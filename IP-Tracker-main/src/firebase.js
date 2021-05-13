import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCA2R7w6dMjvPyuyRnjWfNZXdUNkjI_bHk",
    authDomain: "ip-tracker-39.firebaseapp.com",
    projectId: "ip-tracker-39",
    storageBucket: "ip-tracker-39.appspot.com",
    messagingSenderId: "918734184733",
    appId: "1:918734184733:web:be46adcd0e2da3df6dc1f4",
    measurementId: "G-1YS4S51ZJ1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db
import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkNHhAUUE8BYB5J5_rWMFNyIQagNW21s8",
    authDomain: "cheat-sheet-01.firebaseapp.com",
    projectId: "cheat-sheet-01",
    storageBucket: "cheat-sheet-01.appspot.com",
    messagingSenderId: "475190597239",
    appId: "1:475190597239:web:dc90d1a7a523031adc5872",
    measurementId: "G-6MC0MHWRNH"
};

let firebaseApp;
if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
    firebaseApp = firebase.app();
}

const db = firebaseApp.firestore();
const appData = db.collection("appData");
const storage = firebase.storage();

export { db, appData, storage };
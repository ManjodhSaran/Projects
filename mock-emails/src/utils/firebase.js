import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAM61qTxUibu0ujwoI76t9tg5BCDt91Kdo",
    authDomain: "mock-mails.firebaseapp.com",
    projectId: "mock-mails",
    storageBucket: "mock-mails.appspot.com",
    messagingSenderId: "386105415321",
    appId: "1:386105415321:web:d2186f5af4ef08531e8a08",
    measurementId: "G-SF2Q5YGDQC"
};

const app = !firebase.apps.length ?
    firebase.initializeApp(firebaseConfig)
    :
    firebase.app()

const db = app.firestore();
const auth = app.auth();
const mails = db.collection('mails')

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, mails }
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB_gHBXiQVKqvGz6SRSMDrlI_vehb-Xv7A",
    authDomain: "discord-a4914.firebaseapp.com",
    databaseURL: "https://discord-a4914.firebaseio.com",
    projectId: "discord-a4914",
    storageBucket: "discord-a4914.appspot.com",
    messagingSenderId: "751536962268",
    appId: "1:751536962268:web:cf8e936c0ea8388ce05219",
    measurementId: "G-F7Q1X16N4Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
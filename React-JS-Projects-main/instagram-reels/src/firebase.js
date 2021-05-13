import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDaggPfr2XVif5AXi__xUcp5PdBwSKtLPk",
    authDomain: "instagrm-reels.firebaseapp.com",
    databaseURL: "https://instagrm-reels.firebaseio.com",
    projectId: "instagrm-reels",
    storageBucket: "instagrm-reels.appspot.com",
    messagingSenderId: "559029784252",
    appId: "1:559029784252:web:172404913d6588fba60ab9",
    measurementId: "G-9QLC7KL50Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;

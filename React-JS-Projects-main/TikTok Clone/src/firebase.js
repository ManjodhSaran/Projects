import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA1wAb1XRPWz7epsOcJ0MIBirhf_CZnwvQ",
    authDomain: "tiktok-b3ef2.firebaseapp.com",
    databaseURL: "https://tiktok-b3ef2.firebaseio.com",
    projectId: "tiktok-b3ef2",
    storageBucket: "tiktok-b3ef2.appspot.com",
    messagingSenderId: "704666525492",
    appId: "1:704666525492:web:34937528a1b7bf61accf61",
    measurementId: "G-1CSNSG3WCC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
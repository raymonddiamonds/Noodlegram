import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyDCb84aF0IpJcgwTIC6cbZLZf6kSKQnFIE",
    authDomain: "image-repo-efa7d.firebaseapp.com",
    projectId: "image-repo-efa7d",
    storageBucket: "image-repo-efa7d.appspot.com",
    messagingSenderId: "266434292742",
    appId: "1:266434292742:web:1690b5f0ebccc5d8fd6787"
   
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// exporting so we can access it
export {db, auth, storage};
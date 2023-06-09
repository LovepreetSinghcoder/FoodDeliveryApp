import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
    
    //Official Key 
    apiKey: "AIzaSyBOtJbUTaamWilHFGkV1IyM1gMs-TXK8g0",
    authDomain: "shovii-official.firebaseapp.com",
    projectId: "shovii-official",
    storageBucket: "shovii-official.appspot.com",
    messagingSenderId: "189852008024",
    appId: "1:189852008024:web:3f80a7092a3a41b317d42d",
    measurementId: "G-XDJSE0MVT7"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }
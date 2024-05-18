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

    // apiKey: "AIzaSyB_XAXC6xRpE7Wt9bgO3W-jjO9qH9CdNrY",
    // authDomain: "shoviiadmin.firebaseapp.com",
    // projectId: "shoviiadmin",
    // storageBucket: "shoviiadmin.appspot.com",
    // messagingSenderId: "716382872250",
    // appId: "1:716382872250:web:140a6e42f6e0e9ffcb5883"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }
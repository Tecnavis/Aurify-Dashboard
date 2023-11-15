// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz6lvz25SnnU4xNsRcwqWjg-2USXWc8E4",
    authDomain: "aurify-80af2.firebaseapp.com",
    projectId: "aurify-80af2",
    storageBucket: "aurify-80af2.appspot.com",
    messagingSenderId: "617970760313",
    appId: "1:617970760313:web:5374c034dca547879032a8",
    measurementId: "G-ZW6Y0TYSZT"
};

console.log('db connected');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
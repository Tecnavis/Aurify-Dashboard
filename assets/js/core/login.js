import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";

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


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit")
const emailInput = document.getElementById("emailInput")
const passwordInput = document.getElementById("passwordInput")


submitButton.addEventListener("click", function (e) {
    e.preventDefault()
    const email = emailInput.value;
    const password = passwordInput.value;

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Invalid!!')
        return
        // Don't continue running the code
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Success! Welcome back!");
            console.log(user);
            window.alert("Success! Welcome back!");
            // ...

            // Redirect to the dashboard page (change 'dashboard.html' to your actual dashboard page)
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error occurred. Try again.");
            console.log(errorMessage);
            window.alert("Invalid Login Credentials");
        });
});

// Validate Functions
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    return password.length >= 6;
}

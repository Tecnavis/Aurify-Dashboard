import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDocs,
    setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { app } from '../../../config/db.js';

document.addEventListener('DOMContentLoaded', function () {
    displayUserData()
});

const firestore = getFirestore(app);
const auth = getAuth(app);

var documentId = ''

// Attach event listener to the button with ID saveChangesBtn
document.addEventListener("DOMContentLoaded", function () {
    const saveChangesBtn = document.getElementById('saveChangesBtn');

    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', function () {
            saveChanges();
        });
    }
});

function saveChanges() {
    // Get the edited values
    const companyName = document.getElementById('company-name').textContent;
    const fullName = document.getElementById('full-name').textContent;
    const mobile = document.getElementById('mobile').textContent;
    const email = document.getElementById('email').textContent;
    const location = document.getElementById('location').textContent;
    const personalInfo = document.getElementById('personal-info').textContent;

    // Get the UID of the authenticated user
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
        console.error('User not authenticated');
        return Promise.reject('User not authenticated');
    }

    // Create an object with the data to be saved
    const dataToSave = {
        companyName: companyName,
        fullName: fullName,
        mobile: mobile,
        email: email,
        location: location,
        personalInfo: personalInfo,
    };

    // Reference to the user's profile collection
    const userCollectionRef = collection(firestore, `users/${uid}/profile`);

    // Reference to the specific document with ID 
    const userDocRef = documentId ? doc(userCollectionRef, documentId) : null;

    if (userDocRef) {
        // Update the existing document
        setDoc(userDocRef, dataToSave)
            .then(() => {
                console.log('Data successfully updated in Firestore');
            })
            .catch((error) => {
                console.error('Error updating data in Firestore: ', error);
            });
    } else {
        // Create a new document
        addDoc(userCollectionRef, dataToSave)
            .then(() => {
                console.log('Data successfully added to Firestore');
            })
            .catch((error) => {
                console.error('Error adding data to Firestore: ', error);
            });
    }
}


// Function to read data from Firestore
function displayUserData() {
    // Get the UID of the authenticated user
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
        console.error('User not authenticated');
        return Promise.reject('User not authenticated');
    }

    // Reference to the user's profile collection
    const userCollectionRef = collection(firestore, `users/${uid}/profile`);

    // Get all documents in the collection
    getDocs(userCollectionRef)
        .then((querySnapshot) => {
            // Display the data
            // Assuming your Firestore documents have fields like fullName, mobile, email, etc.
            querySnapshot.forEach((doc) => {
                const userData = doc.data();

                // Document ID
                documentId = doc.id

                // Update HTML elements with user data
                document.getElementById('company-name').textContent = userData.companyName;
                document.getElementById('full-name').textContent = userData.fullName;
                document.getElementById('mobile').textContent = userData.mobile;
                document.getElementById('email').textContent = userData.email;
                document.getElementById('location').textContent = userData.location;
                document.getElementById('personal-info').textContent = userData.personalInfo;

                
                document.getElementById('company-name-display').textContent = userData.companyName;
                document.getElementById('full-name-display').textContent = userData.fullName;
                document.getElementById('user-name').textContent = userData.fullName;  
            });
        })
        .catch((error) => {
            console.error('Error reading data from Firestore: ', error);
        });
}


// Example of calling the displayUserData function
displayUserData();

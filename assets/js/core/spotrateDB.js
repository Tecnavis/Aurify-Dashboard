import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { app } from '../../../config/db.js';

const firestore = getFirestore(app);
const auth = getAuth(app);




// Save data to Firestore function
function saveDataToFirestore(data) {
    // Get the UID of the authenticated user
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
        console.error('User not authenticated');
        return Promise.reject('User not authenticated');
    }

    return addDoc(collection(firestore, `users/${uid}/commodities`), data);
}


let spreadDocId = ''
// Save data to Firestore function
function saveSpreadValues(data) {
    // Get the UID of the authenticated user
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
        console.error('User not authenticated');
        return Promise.reject('User not authenticated');
    }

    // Create a reference to the Firestore collection
    const spreadCollection = collection(firestore, `users/${uid}/spread`);

    // Reference to the specific document with ID 
    const spreadDocRef = spreadDocId ? doc(spreadCollection, spreadDocId) : null;

    if (spreadDocRef) {
        // Update the existing document
        setDoc(spreadDocRef, data)
            .then(() => {
                console.log('Data successfully updated in Firestore');
            })
            .catch((error) => {
                console.error('Error updating data in Firestore: ', error);
            });
    } else {
        // Create a new document
        addDoc(spreadCollection, data)
            .then(() => {
                console.log('Data successfully added to Firestore');
            })
            .catch((error) => {
                console.error('Error adding data to Firestore: ', error);
            });
    }
}

// Read data from Firestore function
function readSpreadValues() {
    // Get the UID of the authenticated user
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
        console.error('User not authenticated');
        return Promise.reject('User not authenticated');
    }

    // Create a reference to the Firestore collection
    const spreadCollection = collection(firestore, `users/${uid}/spread`);

    // Get all documents in the collection
    return getDocs(spreadCollection)
        .then((querySnapshot) => {
            // Assuming you want an array of spreadData
            const spreadDataArray = [];

            querySnapshot.forEach((doc) => {
                const spreadData = doc.data();
                console.log(spreadData);

                // Document ID
                spreadDocId = doc.id;

                // Add spreadData to the array
                spreadDataArray.push({ id: spreadDocId, data: spreadData });
            });

            // Return the array of spreadData
            return spreadDataArray;
        })
        .catch((error) => {
            console.error('Error reading data from Firestore: ', error);
            throw error; // Throw the error to handle it in the calling code if needed
        });
}


// Update data in Firestore function
async function updateDataInFirestore(documentId, data) {
    // Get the UID of the authenticated user
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
        console.error('User not authenticated');
        return Promise.reject('User not authenticated');
    }

    try {
        const docRef = doc(firestore, `users/${uid}/commodities`, documentId);
        await updateDoc(docRef, data);
        console.log('Document successfully updated in Firestore');
    } catch (error) {
        console.error('Error updating document in Firestore: ', error);
        throw error;
    }
}

// Delete data from Firestore function
async function deleteDataFromFirestore(documentId) {
    // Get the UID of the authenticated user
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
        console.error('User not authenticated');
        return Promise.reject('User not authenticated');
    }

    try {
        const docRef = doc(firestore, `users/${uid}/commodities`, documentId);
        await deleteDoc(docRef);
        console.log('Document successfully deleted from Firestore');
    } catch (error) {
        console.error('Error deleting document from Firestore: ', error);
        throw error;
    }
}

// Function to read data from the Firestore collection
async function readData() {
    // Get the UID of the authenticated user
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
        console.error('User not authenticated');
        return Promise.reject('User not authenticated');
    }

    const querySnapshot = await getDocs(collection(firestore, `users/${uid}/commodities`));
    const result = [];
    querySnapshot.forEach((doc) => {
        result.push({
            id: doc.id,
            data: doc.data()
        });
    });
    return result;
}

export {
    saveDataToFirestore,
    updateDataInFirestore,
    deleteDataFromFirestore,
    readData,
    saveSpreadValues,
    readSpreadValues
};

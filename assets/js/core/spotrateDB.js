import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
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

export { saveDataToFirestore, updateDataInFirestore, deleteDataFromFirestore, readData };

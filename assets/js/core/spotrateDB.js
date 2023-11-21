import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { app } from '../../../config/db.js';

const firestore = getFirestore(app); // Get a Firestore instance

// Save data to Firestore function
function saveDataToFirestore(data) {
    return addDoc(collection(firestore, "commodities"), data);
}

// Update data in Firestore function
async function updateDataInFirestore(documentId, data) {
    console.log('Data to update:', documentId);
    try {
        const docRef = doc(firestore, "commodities", documentId);
        await updateDoc(docRef, data);
        console.log('Document successfully updated in Firestore');
    } catch (error) {
        console.error('Error updating document in Firestore: ', error);
        throw error; // Rethrow the error to propagate it to the calling function
    }
}

// Delete data from Firestore function
async function deleteDataFromFirestore(documentId) {
    try {
        const docRef = doc(firestore, "commodities", documentId);
        await deleteDoc(docRef);
        console.log('Document successfully deleted from Firestore');
    } catch (error) {
        console.error('Error deleting document from Firestore: ', error);
        throw error; // Rethrow the error to propagate it to the calling function
    }
}

// Function to read data from the Firestore collection
async function readData() {
    const querySnapshot = await getDocs(collection(firestore, "commodities"));
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

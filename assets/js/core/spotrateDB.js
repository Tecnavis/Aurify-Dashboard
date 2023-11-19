import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { app } from '../../../config/db.js'

const firestore = getFirestore(app); // Get a Firestore instance

// Save data to Firestore function
export function saveDataToFirestore(data) {
    return addDoc(collection(firestore, "commodities"), data);
}


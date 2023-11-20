import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { app } from '../../../config/db.js'

const firestore = getFirestore(app); // Get a Firestore instance

// Save data to Firestore function
function saveDataToFirestore(data) {
    return addDoc(collection(firestore, "commodities"), data);
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


export { saveDataToFirestore, readData };
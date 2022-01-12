import { doc, getDoc, getFirestore } from "firebase/firestore";

async function getOwner(uid) {
    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
    
}

export default getOwner
import { getFirestore, doc, getDoc } from 'firebase/firestore'
async function getAuthLikes(uid) {
    const db = getFirestore();
    const docRef = doc(db, "userLikes", uid);
    const userLikes = (await getDoc(docRef)).data().post;

    return userLikes;
}

export default getAuthLikes
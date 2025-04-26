import { collection, where, query, getDocs, addDoc, updateDoc, documentId, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { commentConverter } from "../converters/commentConverter";

export async function getComment(initiativeId) {
    let comments = [];
    try {
        const commentCollections = collection(db, 'comments').withConverter(commentConverter);
        const q = query(commentCollections, where("initiativeUID", '==', initiativeId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            comments.push(doc.data());
        })
        return comments;
    }
    catch(e) {
        throw(e);
    }
}
export async function postComment(comment) {
    try {
        const userCollections = collection(db, 'comments').withConverter(commentConverter);
        const docRef = await addDoc(userCollections, comment);
        const commentDoc = doc(db, 'comments', docRef.id);
        updateDoc(commentDoc, { UID: docRef.id });
    } catch(e) {
        throw(e);
    }
}
export async function deleteComment(id) {
    try {
        await deleteDoc(doc(db, 'comments', id));
    }
    catch(e) {
        throw(e);
    }
}

import { collection, where, query, getDocs, addDoc, updateDoc, documentId, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { Comment } from "../models/commentModel"
import { commentConverter } from "../converters/commentConverter";

export async function getComment(initiativeId) {
    const id = initiativeId;
    let comments = [];
    try {
        const commentCollections = collection(db, 'comments').withConverter(commentConverter);
        const q = query(commentCollections, where("initiativeUID", '==', id));
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
export async function postComment(userUID, initiativeUID, text) {
    try {
        const userCollections = collection(db, 'comments').withConverter(commentConverter);
        const docRef = await addDoc(userCollections, new Comment(null, userUID, initiativeUID, text));
        const commentDoc = doc(db, 'comments', docRef.id);
        updateDoc(commentDoc, { UID: docRef.id });
    } catch(e) {
        throw(e);
    }
}
export async function deleteComment(id) {
    const id = id;
    try {
        await deleteDoc(doc(db, 'comments', id));
    }
    catch(e) {
        throw(e);
    }
}

import { collection, where, query, getDocs, addDoc, updateDoc, documentId, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { tagConverter } from "../converters/tagConverter";

export async function checkIfTagExists(name) {
    try {
        const tagCollections = collection(db, 'tags').withConverter(tagConverter);
        const q = query(tagCollections, where("text", '==', name));
        const snap = await getDocs(q);
        if (snap.empty)
            return null;
        return snap.docs[0].data();
    }
    catch(e) {
        throw(e);
    }
}
export async function getTag(initiativeId) {
    let tags = [];
    try {
        const commentCollections = collection(db, 'tags').withConverter(tagConverter);
        const q = query(commentCollections, where("initiativeUID", '==', initiativeId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            tags.push(doc.data());
        })
        return tags;
    }
    catch(e) {
        throw(e);
    }
}
export async function getAllTag() {
    let tags = [];
    try {
        const commentCollections = collection(db, 'tags').withConverter(tagConverter);
        const q = query(commentCollections);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            tags.push(doc.data());
        })
        return tags;
    }
    catch(e) {
        throw(e);
    }
}
export async function postTag(tag) {
    try {
        const tagCollections = collection(db, 'tags').withConverter(tagConverter);
        const docRef = await addDoc(tagCollections, tag);
        const tagDoc = doc(db, 'tags', docRef.id);
        updateDoc(tagDoc, { UID: docRef.id });
        //console.log(docRef.id);
        return docRef.id;
    } catch(e) {
        throw(e);
    }
}
export async function deleteTag(id) {
    try {
        await deleteDoc(doc(db, 'tags', id));
    }
    catch(e) {
        throw(e);
    }
}

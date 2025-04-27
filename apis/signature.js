import { collection, where, query, getDocs, addDoc, updateDoc, documentId, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { signatureConverter } from "../converters/signatureConverter";

export async function getSignatures(id) {
    let signatures = [];
    try {
        const signatureCollections = collection(db, 'signatures').withConverter(signatureConverter);
        const q = query(signatureCollections, where("initiativeUID", '==', id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            signatures.push(doc.data());
        })
        return signatures;
    }
    catch(e) {
        throw(e);
    }
}
export async function getSignatureByUserUID(userUID) {
    try {
        const signatureCollections = collection(db, 'signatures').withConverter(signatureConverter);
        const q = query(signatureCollections, where("userUID", '==', userUID));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty)
            return null;
        const signature = querySnapshot.docs[0].data();
        return signature;
    }
    catch(e) {
        throw(e);
    }
}
export async function getSignatureByUserUIDandInitiativeUID(userUID, IUID) {
    try {
        const signatureCollections = collection(db, 'signatures').withConverter(signatureConverter);
        const q = query(signatureCollections, where("userUID", '==', userUID), where("initiativeUID", '==', IUID));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty)
            return null;
        const signature = querySnapshot.docs[0].data();
        return signature;
    }
    catch(e) {
        throw(e);
    }
}
export async function postSignature(signature) {
    try {
        const userCollections = collection(db, 'signatures').withConverter(signatureConverter);
        const docRef = await addDoc(userCollections, signature);
        const sigDoc = doc(db, 'signatures', docRef.id);
        updateDoc(sigDoc, { UID: docRef.id });
    } catch(e) {
        throw(e);
    }
}
export async function deleteSignature(id) {
    try {
        await deleteDoc(doc(db, 'signatures', id));
    }
    catch(e) {
        throw(e);
    }
}

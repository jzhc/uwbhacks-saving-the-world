import { collection, where, query, getDocs, addDoc, updateDoc, documentId, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { User } from "../models/userModel"
import { userConverter } from "../converters/userConverter";

export async function getUser(id) {
export async function getUserByEmail(email) {
    try {
        const userCollections = collection(db, 'users').withConverter(userConverter);
        const q = query(userCollections, where("email", '==', email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty)
            return true;
        return false;
    }
    catch(e) {
        throw(e);
    }
}
export async function getUser(id) {
    let users = [];
    try {
        const userCollections = collection(db, 'users').withConverter(userConverter);
        const q = query(userCollections, where("UID", '==', id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        })
        return users;
    }
    catch(e) {
        throw(e);
    }
}
export async function postUser(f, l) {
    const firstName = f;
    const lastName = l;
    console.log(firstName);
    try {
        const userCollections = collection(db, 'users').withConverter(userConverter);
        const docRef = await addDoc(userCollections, new User(null, firstName, lastName));
        const userDoc = doc(db, 'users', docRef.id);
        updateDoc(userDoc, { UID: docRef.id });
    } catch(e) {
        throw(e);
    }
}
export async function updateUser(i, f, l) {
    const id = i;
    const firstName = f;
    const lastName = l;
    try {
        const userDoc = doc(db, 'users', id);
        if (firstName != null) {
            updateDoc(userDoc, {
                firstName: firstName
            })
        }
        if (lastName != null) {
            updateDoc(userDoc, {
                lastName: lastName
            })
        }
    } catch(e) {
        throw(e);
    }
}
export async function deleteUser(i) {
    const id = i;
    try {
        await deleteDoc(doc(db, 'users', id));
    }
    catch(e) {
        throw(e);
    }
}

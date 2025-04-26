import { collection, where, query, getDocs, addDoc, updateDoc, documentId, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { Initiative } from "../models/initiativesModelModel"
import { initiativesConverter } from "../converters/initiativesConverter";

export async function getInitiative(i) {
    const id = i;
    let initiatives = [];
    try {
        const initiativeCollections = collection(db, 'initiatives').withConverter(initiativesConverter);
        const q = query(initiativeCollections, where('UID', '==', id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            initiatives.push(doc.data());
        })
        return initiatives;
    }
    catch(e) {
        throw(e);
    }
}
export async function getInitiative(userUID) {
    let initiatives = [];
    try {
        const initiativeCollections = collection(db, 'initiatives').withConverter(initiativesConverter);
        const q = query(initiativeCollections, where('ScrumMasterId', '==', userUID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            initiatives.push(doc.data());
        })
        return initiatives;
    }
    catch(e) {
        throw(e);
    }
}
export async function postInitiative(title, ScrumMasterId, description, year, month, day) {
    try {
        const initiativeCollections = collection(db, 'initiatives').withConverter(initiativeConverter);
        const docRef = await addDoc(initiativeCollections, new Initiative(null, title, ScrumMasterId, description, year, month, day));
        const initiativeDoc = doc(db, 'initiatives', docRef.id);
        updateDoc(initiativeDoc, { UID: docRef.id });
    } catch(e) {
        throw(e);
    }
}
export async function updateInitiative(i, title, ScrumMasterId, description, year, month, day) {
    const id = i;
    const title = title;
    const ScrumMasterId = ScrumMasterId;
    const description = description;
    const year = year;
    const month = month;
    const day = day;
    try {
        const userDoc = doc(db, 'initiatives', id);
        if (title != null) {
            updateDoc(userDoc, {
                title: title
            })
        }
        if (ScrumMasterId != null) {
            updateDoc(userDoc, {
                ScrumMasterId: ScrumMasterId
            })
        }
        if (description != null) {
            updateDoc(userDoc,  {
                description: description
            })
        }
        if (year != null) {
            updateDoc(userDoc,  {
                year: year
            })
        }
        if (month != null) {
            updateDoc(userDoc,  {
                month: month
            })
        }
        if (day != null) {
            updateDoc(userDoc,  {
                day: day
            })
        }
    } catch(e) {
        throw(e);
    }
}
export async function deleteInitiative(i) {
    const id = i;
    try {
        await deleteDoc(doc(db, 'initiatives', id));
    }
    catch(e) {
        throw(e);
    }
}

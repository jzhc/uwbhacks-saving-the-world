import { collection, where, query, getDocs, addDoc, updateDoc, documentId, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { Initiative } from "../models/initiativesModel"
import { initiativesConverter } from "../converters/initiativesConverter";

export async function getInitiative(id) {
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
export async function getInitiativeByUserUID(userUID) {
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
export async function getAllInitiative() {
    let initiatives = [];
    try {
        const initiativeCollections = collection(db, 'initiatives').withConverter(initiativesConverter);
        const q = query(initiativeCollections);
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

export async function postInitiative(initiative) {
    try {
        const initiativeCollections = collection(db, 'initiatives').withConverter(initiativesConverter);
        const docRef = await addDoc(initiativeCollections, initiative);
        const initiativeDoc = doc(db, 'initiatives', docRef.id);
        updateDoc(initiativeDoc, { UID: docRef.id });
    } catch(e) {
        throw(e);
    }
}
export async function updateInitiative(id, title, ScrumMasterId, description, year, month, day) {
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

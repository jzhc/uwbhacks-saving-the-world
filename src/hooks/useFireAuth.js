import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function useFireAuth() {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, u => {
            setUser(u);
        });
        return unsubscribe;
    }, []);

    return [user, setUser]
}
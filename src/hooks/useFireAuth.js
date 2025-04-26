// src/hooks/useFireAuth.js
import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function useFireAuth() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  return [user, initializing];
}

export function useFireAuthWithKick() {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const navigate = useNavigate()
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u);
        setInitializing(false);
      });
      return unsubscribe;
    }, []);

    if (user == null) {
        navigate("/dashboard", {replace: true})
    }
  
    return [user, initializing];
}
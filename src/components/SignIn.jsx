// src/components/SignIn.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  
  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div>
        <p>Welcome, {user.displayName}!</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleSignIn} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Sign in with Google
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
// src/components/SignIn.jsx
import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../../firebaseConfig";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doesNotExist } from "../../apis/user";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Subscribe to Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { email, uid } = result.user;
      const exists = !(await doesNotExist(email));
      if (!exists) {
        navigate("/create-account", { state: { uid, email }, replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      // ignore benign popup errors
      if (
        err.code !== "auth/cancelled-popup-request" &&
        err.code !== "auth/popup-closed-by-user"
      ) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setError(null);
    } catch (err) {
      console.error("Sign out error:", err);
      setError("Error signing out. Please try again.");
    }
  };

  // If we have a current user, show Sign Out
  if (user) {
    return (
      <div>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    );
  }

  // Otherwise show Sign In
  return (
    <div>
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Opening popup…" : "Sign in with Google"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
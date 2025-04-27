// src/components/SignIn.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { doesNotExist } from "../../apis/user";
import { useNavigate, Link } from "react-router-dom";
import useFireAuth from "../hooks/useFireAuth";


export default function SignIn() {
  const [user, initializing] = useFireAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error("Sign out error:", err);
      setError("Error signing out. Please try again.");
    }
  };

  if (initializing) {
    return <p>Loading auth…</p>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/profile"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Profile
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Opening popup…" : "Sign in with Google"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

// src/components/SignIn.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { doesNotExist } from "../../apis/user";
import { useNavigate, Link } from "react-router-dom";
import useFireAuth from "../hooks/useFireAuth";
import { User } from "lucide-react";



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
    return <p className="text-white">Logging in…</p>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="flex items-center bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded shadow hover:bg-gray-50 disabled:opacity-50 cursor-pointer text-sm"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="w-4 h-4 mr-2"
          />
          <span className="font-medium">
            {loading ? "Signing in…" : "Sign in with Google"}
          </span>
        </button>
        {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex text-white items-center gap-2">
        <Link
          to="/profile"
          className="flex items-center gap-1"
        >
          <User size={20} className="stroke-current" />

          Profile
        </Link>
      </div>
    );
  }

}

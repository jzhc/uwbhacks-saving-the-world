// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { getUser, getUserWithEmail } from "../../apis/user";

import NavBar from "../components/navbar";

export default function Profile() {
  const [firebaseUser, setFirebaseUser] = useState(auth.currentUser);
  const [authInitializing, setAuthInitializing] = useState(true);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Subscribe to Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthInitializing(false);
    });
    return unsubscribe;
  }, []);

  // Once authenticated, fetch Firestore profile
  useEffect(() => {
    if (authInitializing) return;

    if (!firebaseUser) {
      navigate("/signin", { replace: true });
      return;
    }

    getUserWithEmail(firebaseUser.email)
      .then((data) => {
        if (data) {
          console.log(data);
          setProfile(data);
        } else {
          setError("Profile not found.");
        }
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        setError("Could not load profile. Please try again.");
      })
      .finally(() => {
        setLoadingProfile(false);
      });
  }, [authInitializing, firebaseUser, navigate]);

  if (authInitializing || loadingProfile) {
    return <p>Loading profile…</p>;
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  // Now we have a Firestore-backed profile object
  const posts = [];
  const handleWritePost = () => navigate("/new-post");

  return (
    <>
    <NavBar />
    <ProfileCard
      user={profile} // why array adam..
      posts={posts}
      onWritePost={handleWritePost}
    />
    </>
  );
}

// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { getUserWithEmail } from "../../apis/user";
import useFireAuth from "../hooks/useFireAuth";

import NavBar from "../components/navbar";

export default function Profile() {
  const [firebaseUser, authInitializing] = useFireAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authInitializing) return;
    if (!firebaseUser) {
      navigate("/dashboard", { replace: true });
      return;
    }

    setLoadingProfile(true);
    getUserWithEmail(firebaseUser.email)
      .then((userData) => {
        if (userData) {
          setProfile(userData);
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

  if (authInitializing || loadingProfile) return <NavBar />;
  if (error) return <p className="text-red-600">{error}</p>;

  const posts = [];
  const handleWritePost = () => navigate("/new-post");

  return (
    <>
        <NavBar />
        <ProfileCard
        user={profile}
        posts={posts}
        onWritePost={handleWritePost}
        />
    </>
  );
}

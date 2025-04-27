// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/navbar";
import ProfileCard from "../components/ProfileCard";
import useFireAuth from "../hooks/useFireAuth";
import { getUser, getUserWithEmail } from "../../apis/user";
import { getInitiativeByUserUID } from "../../apis/initiative";   // fetch initiatives
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function Profile() {
  /* routing & auth --------------------------------------------------------- */
  const { uid } = useParams();            // undefined when path = /profile
  const navigate = useNavigate();
  const [firebaseUser, authInit] = useFireAuth();

  /* redirect /profile → /u/:uid -------------------------------------------- */
  useEffect(() => {
    if (authInit) return;                 // still waiting for Firebase
    if (!uid && firebaseUser) {
      (async () => {
        const me = await getUserWithEmail(firebaseUser.email);
        if (me && me.UID) {
          navigate(`/u/${me.UID}`, { replace: true });
        }
      })();
    }
  }, [uid, firebaseUser, authInit, navigate]);

  /* profile & posts state --------------------------------------------------- */
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);          // initiatives to display

  /* sign-out handler -------------------------------------------------------- */
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  };

  /* fetch Firestore profile ------------------------------------------------- */
  useEffect(() => {
    if (authInit) return;
    if (!uid && !firebaseUser) return;     // /profile will redirect

    setLoadingProfile(true);
    const load = uid
      ? getUser(uid).then(([u]) => u)      // /u/:uid
      : getUserWithEmail(firebaseUser.email);

    load
      .then(u => (u ? setProfile(u) : setError("Profile not found.")))
      .catch(err => {
        console.error(err);
        setError("Could not load profile.");
      })
      .finally(() => setLoadingProfile(false));
  }, [uid, firebaseUser, authInit]);

  /* fetch initiatives once profile is ready -------------------------------- */
  useEffect(() => {
    if (!profile) return;

    (async () => {
      try {
        const ivts = await getInitiativeByUserUID(profile.UID);
        setPosts(
          ivts.map(i => ({
            id: i.UID,
            title: i.title,
            desc: i.description,
            date: `${i.publishMonth}/${i.publishDay}/${i.publishYear}`,
          }))
        );
      } catch (e) {
        console.error("Failed to load initiatives", e);
      }
    })();
  }, [profile]);

  /* guards ------------------------------------------------------------------ */
  if (authInit || loadingProfile) return <NavBar />;
  if (error) {
    return (
      <>
        <NavBar />
        <p className="text-center text-red-600 mt-8">{error}</p>
      </>
    );
  }

  /* render ------------------------------------------------------------------ */
  const handleWritePost = () => navigate("/new-post");

  return (
    <>
      <NavBar />
      <ProfileCard
        user={profile}
        posts={posts}
        onWritePost={handleWritePost}
        onSignOut={handleSignOut}
      />
    </>
  );
}

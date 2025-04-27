// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar        from "../components/navbar";
import ProfileCard   from "../components/ProfileCard";
import useFireAuth   from "../hooks/useFireAuth";
import { getUser, getUserWithEmail } from "../../apis/user";

export default function Profile() {
  /* routing & auth --------------------------------------------------------- */
  const { uid } = useParams();             // undefined when path = /profile
  const navigate = useNavigate();
  const [firebaseUser, authInit] = useFireAuth();

  /* redirect /profile → /u/:uid -------------------------------------------- */
  useEffect(() => {
    if (authInit) return;                  // still waiting for Firebase
    if (!uid && firebaseUser) {
      (async () => {
        const me = await getUserWithEmail(firebaseUser.email);
        if (me && me.UID) {                // or me.uid, depending on your field
          navigate(`/u/${me.UID}`, { replace: true });
        }
      })();
    }
  }, [uid, firebaseUser, authInit, navigate]);

  /* load whichever user the URL points at ---------------------------------- */
  const [profile, setProfile]       = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError]           = useState(null);

  // Sign-out handler on Profile page
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  };

  // Once auth ready, fetch Firestore profile
  useEffect(() => {
    if (authInit) return;                  // still initialising
    if (!uid && !firebaseUser) return;     // anonymous visit to /profile (will redirect)

    setLoadingProfile(true);
    const load = uid
      ? getUser(uid).then(([u]) => u)      // /u/:uid
      : getUserWithEmail(firebaseUser.email); // own profile (rare: before redirect)

    load
      .then(u => (u ? setProfile(u) : setError("Profile not found.")))
      .catch(err => {
        console.error(err);
        setError("Could not load profile.");
      })
      .finally(() => setLoadingProfile(false));
  }, [uid, firebaseUser, authInit]);

  /* guards ----------------------------------------------------------------- */
  if (authInit || loadingProfile) return <NavBar />;
  if (error) return (
    <>
      <NavBar />
      <p className="text-center text-red-600 mt-8">{error}</p>
    </>
  );

  /* render ----------------------------------------------------------------- */
  const posts = [];
  const handleWritePost = () => navigate("/new-post");

  return (
    <>
      <NavBar />
      <ProfileCard user={profile} posts={posts} onWritePost={handleWritePost} />
    </>
  );
}





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ProfileCard from "../components/ProfileCard";
// import { getUserWithEmail } from "../../apis/user";
// import useFireAuth from "../hooks/useFireAuth";

// import NavBar from "../components/navbar";

// export default function Profile() {
//   const [firebaseUser, authInitializing] = useFireAuth();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [error, setError] = useState(null);
//   const { uid } = useParams();                 // route: /u/:uid

//   useEffect(() => {
//     if (authInitializing) return;
//     if (!firebaseUser) {
//       navigate("/dashboard", { replace: true });
//       return;
//     }

//     setLoadingProfile(true);
//     getUserWithEmail(firebaseUser.email)
//       .then((userData) => {
//         if (userData) {
//           setProfile(userData);
//         } else {
//           setError("Profile not found.");
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to load profile:", err);
//         setError("Could not load profile. Please try again.");
//       })
//       .finally(() => {
//         setLoadingProfile(false);
//       });
//   }, [authInitializing, firebaseUser, navigate]);

//   if (authInitializing || loadingProfile) return <NavBar />;
//   if (error) return <p className="text-red-600">{error}</p>;

//   const posts = [];
//   const handleWritePost = () => navigate("/new-post");

//   return (
//     <>
//         <NavBar />
//         <ProfileCard
//         user={profile}
//         posts={posts}
//         onWritePost={handleWritePost}
//         />
//     </>
//   );
// }

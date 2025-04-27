// src/components/ProfileCard.jsx
import React, { useState, useEffect } from "react";
import {
  User2,
  MapPin,
  PencilLine,
  MessageSquare,
  Phone,
  Mail,
} from "lucide-react";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import useFireAuth from "../hooks/useFireAuth";
import { getUserWithEmail } from "../../apis/user";


/**
 * Profile component
 *
 * Props
 * ──────────────────────────────────────────
 * {@link user} – Firestore-backed profile (null/undefined ➜ not-logged-in view)
 * {@link posts} – array of post objects { id, title, excerpt }
 */
export default function ProfileCard({ user, posts = [] }) {
  const { uid: routeUid } = useParams();
  const navigate = useNavigate();

  const [firebaseUser, authInit] = useFireAuth();
  const [profile, setProfile] = useState(null);
  const [canSignOut, setCanSignOut] = useState(false);

  // Load profile: if no user passed, fetch by email
  useEffect(() => {
    if (authInit) return;
    // if (user) {
    //   setProfile(user);
    //   return;
    // }
    if (firebaseUser) {
      getUserWithEmail(firebaseUser.email)
        .then((me) => {
          setProfile(me);
        })
        .catch(console.error);
    }
  }, [authInit, firebaseUser]);

  // Once profile is loaded, decide if sign-out should show
  useEffect(() => {
    if (profile && routeUid) {
      setCanSignOut(profile.UID === routeUid);
    }
  }, [profile, routeUid]);


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  };


  // Not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-[#EDEDF9] text-gray-900 font-sans flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#020082] flex items-center justify-center">
            <User2 size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-[#020082]">You’re not signed in</h1>
          <p className="text-gray-600">Please log in to view or edit your profile.</p>
        </div>
      </div>
    );
  }

  // Logged in
  const fullName = `${user.firstName ?? "First"} ${user.lastName ?? "Last"}`;

  return (
    <div className="min-h-screen bg-[#EDEDF9] text-gray-900 font-sans flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden mt-6 flex flex-col h-full">
        {/* Scrollable content */}
        <div className="flex-grow overflow-auto">
          {/* Banner */}
          <div className="relative h-48 bg-[#1873D3]">
            <div className="absolute -bottom-12 left-8 w-32 h-32 bg-[#020082] rounded-full ring-4 ring-white flex items-center justify-center shadow-lg">
              <User2 size={48} className="text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="pt-16 px-8 pb-6">
            <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
            <p className="text-[#1873D3] flex items-center gap-1 mt-1">
              <MapPin size={16} /> {user.districtID ?? "—"}
            </p>
            {user.profession && <p className="text-gray-600 mt-2">{user.profession}</p>}

            {/* Contact */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              {user.email && (
                <span className="flex items-center gap-1">
                  <Mail size={14} /> {user.email}
                </span>
              )}
              {user.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={14} /> {user.phone}
                </span>
              )}
            </div>

            {user.bio && <p className="mt-6 text-gray-700 italic">{user.bio}</p>}

            {/* Posts */}
            <div className="mt-6 px-8 py-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#020082]">{user.firstName}'s Initiatives</h2>
              </div>

              {posts.length === 0 ? (
                <div className="bg-[#F5F7FB] border border-gray-200 p-4 rounded-lg text-sm text-gray-700 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-base">No Initiatives yet</h3>
                    <p className="text-gray-500">Once you create initiatives, they’ll appear here.</p>
                  </div>
                  <MessageSquare size={20} className="text-gray-400" />
                </div>
              ) : (
              <div className="space-y-3">
                  {posts.map(p => (
                    <div
                    key={p.id}
                    onClick={() => navigate(`/initiative/${p.id}`)}   // row is clickable
                    className="bg-[#F5F7FB] border border-gray-200 p-4 rounded-lg
                              hover:bg-[#EEF1F8] transition flex items-start justify-between
                              cursor-pointer"
                  >
                    {/* left: title + description */}
                    <div className="pr-4">
                      <h3 className="text-base font-medium text-[#020082]">{p.title}</h3>
                      {p.desc && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {p.desc}
                        </p>
                      )}
                    </div>
                  
                    {/* right: date */}
                    <time
                      className="text-sm text-gray-500 whitespace-nowrap self-start pt-1"
                      dateTime={p.date.replace(/\//g, "-")}
                    >
                      {p.date}
                    </time>
                  </div>
                  
                  ))}
                </div>
              )}
            </div>
          </div>

        {/* Footer with Sign Out at bottom right */}
        {canSignOut && (
          <div className="px-8 py-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleSignOut}
              className="cursor-pointer text-sm text-red-600 hover:underline"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

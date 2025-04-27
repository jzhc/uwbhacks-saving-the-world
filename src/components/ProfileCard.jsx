// src/components/ProfileCard.jsx
import React from "react";
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
import { useNavigate } from "react-router-dom";

/**
 * Profile component
 *
 * Props
 * ──────────────────────────────────────────
 * {@link user}        – user object (null/undefined ➜ not-logged-in view)
 * {@link posts}       – array of post objects { id, title, excerpt }
 * {@link onWritePost} – callback when “Write Post” is clicked (e.g. opens modal)
 */
export default function ProfileCard({ user, posts = [], onWritePost }) {
  const isLoggedIn = user && Object.keys(user).length > 0;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  };

  /* ----------------------- NOT-LOGGED-IN ----------------------- */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#EDEDF9] text-gray-900 font-sans flex flex-col">
        <div className="w-full h-12 bg-[#00004E]" />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#020082] flex items-center justify-center">
              <User2 size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-[#020082]">You’re not signed in</h1>
            <p className="text-gray-600">Please log in to view or edit your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------- LOGGED-IN ------------------------- */
  const fullName = `${user.firstName ?? "First"} ${user.lastName ?? "Last"}`;

  return (
    <div className="min-h-screen bg-[#EDEDF9] text-gray-900 font-sans flex flex-col">
      {/* Top Navy Strip */}
      <div className="w-full h-12 bg-[#00004E]" />

      <div className="flex-grow flex justify-center px-4 pb-12">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
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

            {user.bio && (
              <p className="mt-6 text-gray-700 leading-relaxed italic">{user.bio}</p>
            )}
          </div>

          {/* Posts */}
          <div className="px-8 py-6 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#020082]">Recent Posts</h2>
              <button
                className="cursor-pointer flex items-center gap-2 text-sm text-[#1873D3] hover:underline"
                onClick={onWritePost}
              >
                <PencilLine size={16} /> Write Post
              </button>
            </div>

            {/* Posts list */}
            {posts.length === 0 ? (
              <div className="bg-[#F5F7FB] border border-gray-200 p-4 rounded-lg text-sm text-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-base">No posts yet</h3>
                  <p className="text-gray-500">Once you write posts, they’ll appear here.</p>
                </div>
                <MessageSquare size={20} className="text-gray-400" />
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#F5F7FB] border border-gray-200 p-4 rounded-lg text-sm text-gray-700 hover:bg-[#EEF1F8] transition"
                  >
                    <h3 className="font-medium text-base text-[#020082]">{post.title}</h3>
                    {post.excerpt && <p className="text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sign Out Button at Bottom - aligned right */}
          <div className="px-8 pb-8 flex justify-end">
            <button
              onClick={handleSignOut}
              className="cursor-pointer text-sm text-red-600 hover:underline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

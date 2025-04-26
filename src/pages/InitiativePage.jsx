import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../../apis/user";
import { Initiative } from "../../models/initiativesModel";

import NavBar from "../components/navbar";

export default function InitiativeDetail() {
  const { uid } = useParams();
  const [initiative, setInitiative] = useState(null);
  const [creator, setCreator] = useState(null);

  // Fetch initiative (replace with real API call)
  useEffect(() => {
    async function fetchInitiative() {
      try {
        const data = new Initiative(
          5,
          "Cybersecurity Enhancement Act",
          5,
          "Strengthening defenses against cyber threats and data breaches.",
          2024, 3, 14
        );
        setInitiative(data);
      } catch (e) {
        console.error("Failed to load initiative", e);
      }
    }
    fetchInitiative();
  }, [uid]);

  // Fetch creator once initiative is loaded
  useEffect(() => {
    if (!initiative) return;
    async function fetchCreator() {
      try {
        const users = await getUser(initiative.ScrumMasterId);
        setCreator(users[0]);
      } catch (e) {
        console.error("Failed to load creator", e);
      }
    }
    fetchCreator();
  }, [initiative]);

  if (!initiative) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-blue-800 animate-pulse">
          Loading initiative…
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* HEADER */}
      <header className="bg-blue-900 py-6 shadow-md">
        <div className="container mx-auto px-6">
          <h1 className="text-white text-4xl font-bold">
            {initiative.title}
          </h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-6 py-10 space-y-8">
        {/* Initiative Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600 mb-4">
            Published on{" "}
            <time dateTime={`${initiative.publishYear}-${initiative.publishMonth}-${initiative.publishDay}`}>
              {`${initiative.publishMonth}/${initiative.publishDay}/${initiative.publishYear}`}
            </time>
          </p>
          <p className="text-blue-800 text-lg leading-relaxed">
            {initiative.description}
          </p>
        </div>

        {/* Creator Card */}
        {creator ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-900">
                Created by
              </h2>
              <p className="mt-1 text-blue-800">
                {creator.firstName} {creator.lastName}
              </p>
              <p className="mt-1 italic text-gray-500">
                {creator.profession}
              </p>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              👤
            </div>
          </div>
        ) : (
          <div className="text-center text-blue-800 animate-pulse">
            Loading creator…
          </div>
        )}

        {/* Comment Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Comments
          </h2>
          <div className="border border-gray-200 rounded-lg p-4">
            {/* TODO: swap this out for your real CommentSection component */}
            <p className="text-gray-400">No comments yet. Be the first to respond!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

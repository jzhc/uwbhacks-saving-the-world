import React, { use, useState } from 'react';
import { postInitiative } from '../../apis/initiative';
import { useNavigate } from "react-router-dom";
import { Initiative } from '../../models/initiativesModel';
import { postTag, checkIfTagExists } from '../../apis/tag';
import { Tag } from '../../models/tagModel';
import { useFireAuthWithKick } from "../../src/hooks/useFireAuth"
import { getUserWithEmail } from '../../apis/user';

/**
 * A modern form for creating a new initiative.
 * Only asks for title, description, details, and rationale.
 * Relies on existing PostInitiative function for submission.
 */
export default function InitiativeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [rationale, setRationale] = useState('');
  const [tags, setTags] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, initializing] = useFireAuthWithKick();

  const navigate = useNavigate()
  const handleRemoveTag = (indexToRemove) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
    setTagNames((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };
  const handleAddTag = async (e) => {
    e.preventDefault();
    if (newTag.trim() !== "") {
      const tag = new Tag(null, newTag.trim());
      let tagUID = null;
      //console.log(newTag.trim());
      const t = await checkIfTagExists(newTag.trim());
      //console.log(t);
      if (t == null)
        tagUID = await postTag(tag);
      else
         tagUID = t.UID;
      setTags((prevTags) => [...prevTags, tagUID]); // push into array
      setTagNames((prevTags) => [...prevTags, newTag.trim()])
      setNewTag(""); // clear input box
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const date = new Date()
    const SM = (await getUserWithEmail(user.email));
    try {
      await postInitiative(
        new Initiative(
          null,
          title,
          SM.UID,
          description,
          details,
          rationale,
          0,
          tags,
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        )
      );
      // Clear form on success
      setTitle('');
      setDescription('');
      setDetails('');
      setRationale('');

      navigate("/dashboard")
    } catch (err) {
      console.error(err);
      setError('Failed to submit initiative. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl pt-6 px-8 pb-8 transform transition-transform hover:scale-105">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center border-b-2 border-gray-200 pb-2">
          Submit New Initiative
        </h2>
        {error && (
          <p className="text-center text-red-600 font-medium mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Details
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Rationale
            </label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              required
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-80 h-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              placeholder="Enter a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-indigo-600 hover:bg-indigo-700"
              style={{
                padding: "8px 16px",
                //backgroundColor: "#4F46E5",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "background-color 0.2s",
              }}
              //onMouseOver={(e) => (e.target.style.backgroundColor = "#4338CA")}
              //onMouseOut={(e) => (e.target.style.backgroundColor = "#4F46E5")}
            >
              Add Tag
            </button>

          </div>
          <div>
            {tagNames.map((tag, index) => (
              <span
              key={index}
              style={{
                padding: "8px 12px",
                backgroundColor: "#f0f0f0",
                borderRadius: "9999px", // full round
                fontSize: "14px",
                border: "1px solid #ccc",
                display: "inline-block",
              }}>
              {tag}
              <button
                onClick={() => handleRemoveTag(index)}
                style={{
                  marginLeft: "8px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#888",
                }}>
                ❌
              </button>
            </span>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:scale-95 transition-transform disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Initiative'}
          </button>
        </form>
      </div>
    </div>
  );
  
}

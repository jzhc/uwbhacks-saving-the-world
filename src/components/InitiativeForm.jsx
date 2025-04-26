import React, { useState } from 'react';
import { postInitiative } from '../../apis/initiative';
import { useNavigate } from "react-router-dom";
import { Initiative } from '../../models/initiativesModel';
import { postTag } from '../../apis/tag';
import { Tag } from '../../models/tagModel';

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
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (newTag.trim() !== "") {
      const tag = new Tag(null, newTag.trim());
      const tagUID = await postTag(tag);
      setTags((prevTags) => [...prevTags, tagUID]); // push into array
      setNewTag(""); // clear input box
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const date = new Date()

    try {
      await postInitiative(
        new Initiative(
          null,
          title,
          5,
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

          <div>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter a tag"
            />
            <button type="button" onClick={handleAddTag}>
              Add Tag
            </button>
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

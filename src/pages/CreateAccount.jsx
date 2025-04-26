// src/pages/CreateAccount.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { postUser } from "../../apis/user";
import { User } from "../../models/userModel";

export default function CreateAccount() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve uid and email passed via state from SignIn
  const { uid: passedUid, email: passedEmail } = location.state || {};

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect back if no auth and no passed UID
  useEffect(() => {
    if (!user && !passedUid) {
      navigate("/", { replace: true });
    }
  }, [user, passedUid, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // Ensure all fields filled
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !profession.trim() || !districtID.trim() || !bio.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    // Construct user object: use passed values first, fallback to context
    const newUser = new User(
      passedUid || user?.uid || "",
      firstName.trim(),
      lastName.trim(),
      passedEmail || user?.email || "",
      phone.trim(),
      profession.trim(),
      districtID.trim(),
      bio.trim()
    );

    setLoading(true);
    try {
      await postUser(newUser);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Could not create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Complete Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {/* UID and Email (read-only) */}
          <div>
            <label className="block text-sm font-medium mb-1">UID</label>
            <input
              type="text"
              value={passedUid || user?.uid || ""}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={passedEmail || user?.email || ""}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          {/* Editable fields */}
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profession</label>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">District ID</label>
            <input
              type="text"
              value={districtID}
              onChange={(e) => setDistrictID(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              rows={4}
              disabled={loading}
            />
          </div>
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>
    </div>
  );
}

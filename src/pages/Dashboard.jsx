import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/navbar";
import { Search } from 'lucide-react';
import { getAllInitiative } from "../../apis/initiative";
import { getUser } from "../../apis/user";

//import { initiatives } from "../assets/constants";

function InitiativeCard({ initiative }) {
  const [user, setUser] = useState(null)


  useEffect(() => {
    async function fetchUser() {
      const data = await getUser(initiative.ScrumMasterId)
      console.log(data[0])
      setUser(data[0])

    }
    fetchUser()
  }, [])

  return (
    <Link 
        to={`/initiative/${initiative.UID}`}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
    >
      <h2 className="text-xl font-semibold mb-2 text-[#00004E]">{initiative.title}</h2>
      <p className="text-[#020082] leading-relaxed">{initiative.description}</p>

      {user ? (
        <div className="mt-4 text-sm text-gray-700">
          <span className="font-medium">{user.firstName} {user.lastName} — {user.profession}</span>{" "}
        </div>
      ) : (
        <div className="mt-4 text-sm text-gray-500">Loading...</div>
      )}
    </Link>
  );
}

export default function Dashboard() {
  const [initiatives, setInitiatives] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchInitiatives() {
      const data = await getAllInitiative();
      setInitiatives(data);
    }
    fetchInitiatives();
  }, []);
  
  console.log(initiatives)

  const filteredInitiatives = initiatives.filter(initiative =>
    initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    initiative.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#EDEDF9]">
        <NavBar />

        <div className="container mx-auto px-8 pt-6">
            <div className="flex items-center max-w-md mx-auto bg-white rounded-full shadow-lg overflow-hidden">
            <div className="px-3 text-[#00004E]">
                <Search size={20} />
            </div>
            <input
                type="text"
                placeholder="Search Initiatives..."
                className="w-full px-4 py-2 text-[#00004E] focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredInitiatives.map((initiative) => (
            <InitiativeCard
                key={initiative.UID}
                initiative={initiative}
            />
          ))}
        </div>
        {filteredInitiatives.length === 0 && (
          <p className="text-center text-[#00004E] mt-12">No Initiatives match your search.</p>
        )}
      </main>
    </div>
  );
}

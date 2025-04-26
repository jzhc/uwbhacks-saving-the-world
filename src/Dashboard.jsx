import React, { useState } from "react";
import { Search } from 'lucide-react';

import { Link } from "react-router-dom";

import NavBar from "./components/navbar";

const initiatives = [
    { id: 5, title: "Cybersecurity Enhancement Act", description: "Strengthening defenses against cyber threats and data breaches." },
    { id: 6, title: "Renewable Energy Investment Initiative", description: "Subsidies for solar, wind, and other renewable energy sources." },
    { id: 7, title: "Small Business Support Act", description: "Tax breaks and grants for small and local businesses." },
    { id: 8, title: "Veterans' Healthcare Improvement Act", description: "Improving medical services for military veterans." },
    { id: 9, title: "Student Loan Relief Initiative", description: "Reducing interest rates and providing forgiveness options." },
    { id: 10, title: "Water Conservation Initiative", description: "Programs to promote sustainable water use and infrastructure repair." },
    { id: 11, title: "Workforce Development Act", description: "Funding job training programs and apprenticeship opportunities." },
    { id: 12, title: "Mental Health Access Initiative", description: "Expanding access to affordable mental health care services." },
    { id: 13, title: "Transportation Modernization Law", description: "Investments in public transit and eco-friendly transportation." },
    { id: 14, title: "Internet Accessibility Act", description: "Ensuring affordable, high-speed internet for rural communities." },
    { id: 15, title: "Climate Resilience Act", description: "Funding for communities to adapt to climate change impacts." },
    { id: 16, title: "Criminal Justice Reform Initiative", description: "Measures to promote fair sentencing and reduce incarceration rates." },
]

function InitiativeCard({ id, title, description }) {
  return (
    <Link 
        to={`/initiative/${id}`}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
    >
      <h2 className="text-xl font-semibold mb-2 text-[#00004E]">{title}</h2>
      <p className="text-[#020082] leading-relaxed">{description}</p>
    </Link>
  );
}



export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
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
                key={initiative.id}
                id={initiative.id}
                title={initiative.title}
                description={initiative.description}
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

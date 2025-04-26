import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";

import NavBar from "../components/navbar";
import InitiativeCard from "../components/InitiativeCard";
import { placeholderInitiatives } from "../assets/constants";

export default function Dashboard() {
  const [initiatives, setInitiatives] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchInitiatives() {
      // const data = await getAllInitiative();
      // setInitiatives(data);
      setInitiatives(placeholderInitiatives);
    }
    fetchInitiatives();
  }, []);

  const filtered = initiatives.filter((i) =>
    `${i.title} ${i.description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      {/* STICKY HEADER */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-4 space-y-3 md:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Initiatives
          </h1>

 <div className="relative w-full md:w-1/2 lg:w-1/3">
      <Search
        size={20}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
      />
      <input
        type="text"
        placeholder="Search initiatives..."
        className="
          w-full pl-12 pr-4 py-2
          bg-white border border-gray-300
          rounded-full shadow-sm
          focus:outline-none focus:shadow-md focus:border-blue-500
          transition
        "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

          <Link
            to="/initiative/new"
            className="
              inline-flex items-center
              bg-blue-600 hover:bg-blue-700
              text-white font-medium
              px-4 py-2 rounded-full
              shadow-md hover:shadow-lg
              transition
            "
          >
            <Plus className="mr-2" /> New Initiative
          </Link>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((initiative) => (
              <InitiativeCard
                key={initiative.UID}
                initiative={initiative}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20">
            No initiatives match your search.
          </p>
        )}
      </main>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import InitiativeCard from "../components/InitiativeCard";

// import NavBar from "../components/navbar";
// import { Search } from 'lucide-react';
// import { getAllInitiative } from "../../apis/initiative";
// import { getUser } from "../../apis/user";

// import { placeholderInitiatives } from "../assets/constants";
// import { User } from "../../models/userModel";

// export default function Dashboard() {
//   const [initiatives, setInitiatives] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     async function fetchInitiatives() {
//       //const data = await getAllInitiative();
//       //setInitiatives(data);

//       setInitiatives(placeholderInitiatives)
//     }
//     fetchInitiatives();
//   }, []);
  
//   const filteredInitiatives = initiatives.filter(initiative =>
//     initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     initiative.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen flex flex-col bg-[#EDEDF9]">
//         <NavBar />

//         <div className="container mx-auto px-8 pt-6">
//             <div className="flex items-center max-w-md mx-auto bg-white rounded-full shadow-lg overflow-hidden">
//             <div className="px-3 text-[#00004E]">
//                 <Search size={20} />
//             </div>
//             <input
//                 type="text"
//                 placeholder="Search Initiatives..."
//                 className="w-full px-4 py-2 text-[#00004E] focus:outline-none"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             </div>
//       </div>

//       {/* Main Content */}
//       <main className="flex-grow container mx-auto px-8 py-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {filteredInitiatives.map((initiative) => (
//             <InitiativeCard
//                 key={initiative.UID}
//                 initiative={initiative}
//             />
//           ))}
//         </div>
//         {filteredInitiatives.length === 0 && (
//           <p className="text-center text-[#00004E] mt-12">No Initiatives match your search.</p>
//         )}
//       </main>
//     </div>
//   );
// }

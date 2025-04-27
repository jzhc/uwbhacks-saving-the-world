import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";

import NavBar from "../components/navbar";
import InitiativeCard from "../components/InitiativeCard";

import useFireAuth from "../hooks/useFireAuth";

import { getAllInitiative } from "../../apis/initiative";
import InitiativeFilter from "../components/InitiativeFilter";

import { getUser } from "../../apis/user";
import { getTag } from "../../apis/tag";

export default function Dashboard() {
  const [initial, setInitial] = useState([])
  const [initiatives, setInitiatives] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [user, initializing] = useFireAuth()

  const handleFilterChange = (selectedFilters) => {
      if (selectedFilters.length != 0) {
        const filtered = initial.filter((initiative) => 
          selectedFilters.every((tag) => 
            initiative.data.tagsUID.includes(tag.UID)
          )
        )
        setInitiatives(filtered)
      } else {
        setInitiatives(initial)
      }
  };

  useEffect(() => {
    async function enrichInitiatives() {
      const data = await getAllInitiative();
      const res = await Promise.all(
        data.map(async (d) => {
          const user = await getUser(d.ScrumMasterId);
          let tags = [];
          if (Array.isArray(d.tagsUID) && d.tagsUID.length > 0) {
            tags = await Promise.all(
              d.tagsUID.map((uid) => getTag(uid))
            );
          }
    
          return { data: d, user: user[0], tags: tags[0] };
        })
      );

      console.log(res)
      setInitial(res)
      setInitiatives(res)
    }
    enrichInitiatives()
  }, []);

  const searched = initiatives.filter((i) =>
      `${i.data.title} ${i.data.description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

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

          {
            user ? (
              <Link
                to="/create-initiative"
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
            ) : (
              <p
              to="/create-initiative"
              className="
                select-none
                cursor-not-allowed
                inline-flex items-center
                bg-blue-600 hover:bg-blue-700
                text-white font-medium
                px-4 py-2 rounded-full
                shadow-md hover:shadow-lg
                transition
              "
            >
              <Plus className="mr-2" /> New Initiative
            </p>
            )

          }


          <InitiativeFilter onChange={handleFilterChange}/>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searched.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searched.map((initiative) => (
              <InitiativeCard
                key={initiative.data.UID}
                initiative={initiative.data} user={initiative.user} tags={initiative.tags}
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
// src/components/InitiativeFilter.jsx
import React, { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import { getAllTag } from "../../apis/tag";

const placeholderFilters = [
  "Status: Open",
  "Status: Closed",
  "Category: A",
  "Category: B",
];

export default function InitiativeFilter({ onChange }) {
    const [filters, setFilters] = useState([])

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const containerRef = useRef();

    useEffect(() => {
        async function fetchAllTags() {
            const data = await getAllTag()
            setFilters(data)
        }
        fetchAllTags()
    }, [])

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (filter) => {
    let next = [];
    if (selected.includes(filter)) {
      next = selected.filter((f) => f !== filter);
    } else {
      next = [...selected, filter];
    }
    setSelected(next);
    onChange && onChange(next);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="
          cursor-pointer
          inline-flex items-center
          bg-white border border-gray-300
          text-gray-700 font-medium
          px-4 py-2 rounded-full
          shadow-sm hover:shadow-md
          focus:outline-none transition
        "
      >
        <Filter className="mr-2" size={16} />
        Filters
      </button>

      {open && (
        <div className="absolute mt-2 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <ul className="p-2">
            {filters.map((filter) => (
              <li key={filter.UID}>
                <label className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="text-gray-800">{filter.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

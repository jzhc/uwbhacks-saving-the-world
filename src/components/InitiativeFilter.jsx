// src/components/InitiativeFilter.jsx
import React, { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import { getAllTag } from "../../apis/tag";

export default function InitiativeFilter({ onChange }) {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef();

  // now each district is a tag object
  const placeholderDistricts = Array.from({ length: 13 }, (_, i) => ({
    UID: i + 1,
    text: `District ${i + 1}`,
  }));

  useEffect(() => {
    async function fetchAllTags() {
      const data = await getAllTag();
      setFilters(data);
    }
    fetchAllTags();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // notify parent with all tag-objects
  const notifyChange = (newFilters, newDistricts) => {
    onChange && onChange([...newFilters, ...newDistricts]);
  };

  const toggleFilter = (filter) => {
    const next = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(next);
    notifyChange(next, selectedDistricts);
  };

  const toggleDistrict = (district) => {
    const exists = selectedDistricts.some((d) => d.UID === district.UID);
    const next = exists
      ? selectedDistricts.filter((d) => d.UID !== district.UID)
      : [...selectedDistricts, district];
    setSelectedDistricts(next);
    notifyChange(selectedFilters, next);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="
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
        <div className="absolute mt-2 right-0 w-64 min-w-[40rem] bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <div className="p-2 flex space-x-2">
            {/* Tags Column */}
            <ul className="w-1/2 max-h-60 overflow-auto">
              {filters.map((filter) => (
                <li key={filter.UID}>
                  <label className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter)}
                      onChange={() => toggleFilter(filter)}
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="text-gray-800">{filter.text}</span>
                  </label>
                </li>
              ))}
            </ul>

            {/* Districts Column */}
            <ul className="w-1/2 max-h-60 overflow-auto">
              {placeholderDistricts.map((district) => (
                <li key={district.UID}>
                  <label className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDistricts.some((d) => d.UID === district.UID)}
                      onChange={() => toggleDistrict(district)}
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="text-gray-800">{district.text}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

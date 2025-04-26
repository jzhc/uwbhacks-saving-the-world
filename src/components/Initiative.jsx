// src/components/Initiative.jsx
import React from 'react';

export default function Initiative({ id, title, description }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
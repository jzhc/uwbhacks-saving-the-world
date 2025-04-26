// src/pages/BillsList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BillsList() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // TODO: replace with your Firebase fetch
    // e.g. getDocs(collection(db, 'bills')).then(snapshot => ...)
    setBills([
      { id: 'a1', title: 'Clean Energy Act', description: 'Boost renewables…' },
      { id: 'b2', title: 'Education Reform', description: 'Increase funding…' },
      // …
    ]);
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {bills.map(bill => (
        <Link
          key={bill.id}
          to={`/bills/${bill.id}`}
          className="block hover:scale-[1.02] transition-transform"
        >
          <div className="p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{bill.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
// src/pages/InitiativePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Initiative from '../components/Initiative';

export default function InitiativePage() {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    // TODO: fetch the single bill from Firebase by ID
    // e.g. getDoc(doc(db, 'bills', billId)).then(docSnap => ...)
    // For now, fake it:
    setBill({
      id: billId,
      title: `Loaded bill ${billId}`,
      description: 'Full text and details of this bill will appear here…'
    });
  }, [billId]);

  if (!bill) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6">
      <Initiative {...bill} />
    </div>
  );
}
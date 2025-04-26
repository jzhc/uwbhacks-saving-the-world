// src/pages/InitiativePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Initiative from '../components/Initiative';

export default function InitiativePage() {
  const { initiativeId } = useParams();
  const [initiative, setInitiative] = useState(null);

  useEffect(() => {
    // TODO: fetch the single bill from Firebase by ID
    // e.g. getDoc(doc(db, 'bills', billId)).then(docSnap => ...)
    // For now, fake it:
    setInitiative({
      id: initiativeId,
      title: `Loaded bill ${initiativeId}`,
      description: 'Full text and details of this bill will appear here…'
    });
  }, [initiativeId]);

  if (!initiative) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6">
      <Initiative {...initiative} />
    </div>
  );
}
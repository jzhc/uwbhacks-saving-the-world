import React from "react";

const bills = [
  { id: 1, title: "Education Reform Act", description: "A bill to improve public school funding." },
  { id: 2, title: "Healthcare Access Bill", description: "Expanding access to healthcare in rural areas." },
  { id: 3, title: "Environmental Protection Law", description: "Measures to reduce carbon emissions by 2030." },
  { id: 4, title: "Affordable Housing Initiative", description: "Grants and incentives for affordable housing projects." },
];

function BillCard({ title, description }) {
  return (
    <div className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      {children}
    </button>
  );
}

export default function Dashboard() {
  const handleSignIn = () => {
    alert("Sign In clicked");
  };

  const handleSignOut = () => {
    alert("Sign Out clicked");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold">All Bills</div>
        <div className="flex gap-4">
          <Button onClick={handleSignIn}>Sign In</Button>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <BillCard key={bill.id} title={bill.title} description={bill.description} />
        ))}
      </main>
    </div>
  );
}
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import Home from "./pages/Home.jsx";
import BillsList from "./pages/BillsList.jsx";
import InitiativePage from "./pages/InitiativePage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect “/” → “/bills” (optional) */}
        <Route path="/" element={<Navigate to="/bills" replace />} />

        {/* Main pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />

        {/* Bills list & detail */}
        <Route path="/bills" element={<BillsList />} />
        <Route path="/bills/:billId" element={<InitiativePage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<h2 className="p-6">Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
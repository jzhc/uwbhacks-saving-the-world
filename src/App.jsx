// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import Home from "./pages/Home";
import InitiativePage from "./pages/InitiativePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />

        {/* Bills list & detail */}
        <Route path="/initiative" element={<Navigate to="/dashboard" replace />} />
        <Route path="/initiative/:initiativeId" element={<InitiativePage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<h2 className="p-6">Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
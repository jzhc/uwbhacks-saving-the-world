// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import InitiativePage from "./pages/InitiativePage";
import Profile from "./pages/Profile";
import CreateAccount from "./pages/CreateAccount";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        

        {/* Bills list & detail */}
        <Route path="/initiative" element={<Navigate to="/dashboard" replace />} />
        <Route path="/initiative/:initiativeId" element={<InitiativePage />} />

        {/* Other stuff */}
        <Route path="/create-account" element={<CreateAccount />} />


        {/* Catch-all 404 */}
        <Route path="*" element={<h2 className="p-6">Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
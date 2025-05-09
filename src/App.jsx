// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import InitiativePage from "./pages/InitiativePage";
import Profile from "./pages/Profile";
import CreateAccount from "./pages/CreateAccount";
import CreateInitiative from "./pages/CreateInitiative";
import NotFound from "./pages/NotFound";
import HANNI from "./pages/queens";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Main pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />

        {/*individual user pages*/}
        <Route path="/profile" element={<Profile />} />
        <Route path="/u/:uid" element={<Profile />} />

        
        <Route path="/idols" element={<HANNI />} />


        {/* Bills list & detail */}
        <Route path="/initiative" element={<Navigate to="/dashboard" replace />} />
        <Route path="/initiative/:uid" element={<InitiativePage />} />

        {/* Create */}
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-initiative" element={<CreateInitiative  />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
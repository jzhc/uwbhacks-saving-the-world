import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard"
import Home from "./pages/Home"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
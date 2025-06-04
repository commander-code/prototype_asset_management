import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Assets from "./pages/Assets";
import Compliance from "./pages/Compliance";
import Users from "./pages/Users";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
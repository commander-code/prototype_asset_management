import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 p-6 overflow-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">Asset Manager</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/assets" className="text-blue-600 hover:underline">Assets</Link>
        <Link to="/compliance" className="text-blue-600 hover:underline">Compliance</Link>
        <Link to="/users" className="text-blue-600 hover:underline">Users</Link>
      </nav>
    </div>
  );
}
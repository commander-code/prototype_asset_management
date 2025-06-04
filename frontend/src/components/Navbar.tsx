import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-primary text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">
        BankAssets
      </Link>
      <button onClick={logout} className="hover:underline">
        Logout
      </button>
    </nav>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <Link to="/" className="text-primary hover:underline">
        Go back to Dashboard
      </Link>
    </div>
  );
}

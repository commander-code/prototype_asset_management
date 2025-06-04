import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">BankAssets Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            className="mt-1 block w-full border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            className="mt-1 block w-full border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
        >
          Login
        </button>
      </form>
    </div>
  );
}

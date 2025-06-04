import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateAssetPage() {
  const [form, setForm] = useState({
    name: "",
    type: "HARDWARE",
    riskLevel: "LOW",
    location: "",
    assignedToId: "",
    purchaseDate: "",
    expiryDate: "",
    complianceFlag: false,
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/assets", {
        ...form,
        assignedToId: form.assignedToId || undefined,
      });
      navigate("/", { replace: true });
    } catch (err: any) {
      setError("Failed to create asset");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">New Asset</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          >
            <option value="HARDWARE">Hardware</option>
            <option value="SOFTWARE">Software</option>
            <option value="DOCUMENT">Document</option>
            <option value="INTELLECTUAL_PROPERTY">IP</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Risk Level</label>
          <select
            name="riskLevel"
            value={form.riskLevel}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Assigned To (User ID)</label>
          <input
            name="assignedToId"
            type="number"
            value={form.assignedToId}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Purchase Date</label>
          <input
            name="purchaseDate"
            type="date"
            value={form.purchaseDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Expiry Date</label>
          <input
            name="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center">
          <input
            name="complianceFlag"
            type="checkbox"
            checked={form.complianceFlag}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Requires Compliance Review</label>
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/90"
        >
          Create Asset
        </button>
      </form>
    </div>
  );
}

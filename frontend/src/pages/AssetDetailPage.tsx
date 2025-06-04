import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface AssetDetail {
  id: number;
  name: string;
  type: string;
  riskLevel: string;
  location: string;
  assignedTo?: { id: number; name: string } | null;
  purchaseDate: string;
  expiryDate?: string;
  complianceFlag: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<AssetDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await api.get<AssetDetail>(`/assets/${id}`);
        setAsset(res.data);
      } catch (err: any) {
        setError("Asset not found");
      } finally {
        setLoading(false);
      }
    };
    fetchAsset();
  }, [id]);

  if (loading) return <p>Loading asset...</p>;
  if (error || !asset) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{asset.name}</h2>
      <ul className="space-y-2">
        <li>
          <strong>Type:</strong> {asset.type}
        </li>
        <li>
          <strong>Risk Level:</strong> {asset.riskLevel}
        </li>
        <li>
          <strong>Location:</strong> {asset.location}
        </li>
        <li>
          <strong>Assigned To:</strong>{" "}
          {asset.assignedTo ? asset.assignedTo.name : "Unassigned"}
        </li>
        <li>
          <strong>Purchase Date:</strong>{" "}
          {new Date(asset.purchaseDate).toLocaleDateString()}
        </li>
        <li>
          <strong>Expiry Date:</strong>{" "}
          {asset.expiryDate
            ? new Date(asset.expiryDate).toLocaleDateString()
            : "N/A"}
        </li>
        <li>
          <strong>Compliance Flag:</strong>{" "}
          {asset.complianceFlag ? "Yes" : "No"}
        </li>
        <li>
          <strong>Created At:</strong>{" "}
          {new Date(asset.createdAt).toLocaleString()}
        </li>
        <li>
          <strong>Last Updated:</strong>{" "}
          {new Date(asset.updatedAt).toLocaleString()}
        </li>
      </ul>
    </div>
  );
}

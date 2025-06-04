import React from "react";
import AssetCard from "../components/AssetCard";
import { useFetchAssets } from "../hooks/useFetchAssets";
import { Link } from "react-router-dom";

export default function AssetListPage() {
  const { assets, loading, error } = useFetchAssets();

  if (loading) return <p>Loading assets...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">All Assets</h1>
        <Link
          to="/assets/new"
          className="bg-secondary text-white px-4 py-2 rounded"
        >
          + New Asset
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
}

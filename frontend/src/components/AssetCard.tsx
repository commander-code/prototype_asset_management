import React from "react";
import { Link } from "react-router-dom";
import { Asset } from "../hooks/useFetchAssets";

interface Props {
  asset: Asset;
}

export default function AssetCard({ asset }: Props) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col">
      <h3 className="text-lg font-semibold">{asset.name}</h3>
      <p className="text-sm text-gray-600">Type: {asset.type}</p>
      <p className="text-sm text-gray-600">Risk: {asset.riskLevel}</p>
      <p className="text-sm text-gray-600">Location: {asset.location}</p>
      <Link
        to={`/assets/${asset.id}`}
        className="mt-2 text-sm text-secondary hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
}

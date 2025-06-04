import { useEffect, useState } from "react";
import api from "../services/api";

export interface Asset {
  id: number;
  name: string;
  type: string;
  riskLevel: string;
  location: string;
  assignedTo?: { id: number; name: string } | null;
  purchaseDate: string;
  expiryDate?: string | null;
  complianceFlag: boolean;
}

export function useFetchAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await api.get<Asset[]>("/assets");
        setAssets(res.data);
      } catch (err: any) {
        setError(err.message || "Error fetching assets");
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  return { assets, loading, error };
}

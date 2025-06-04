import { Request, Response } from "express";
import * as assetService from "../services/assetService";

export async function listAssets(req: Request, res: Response) {
  try {
    const assets = await assetService.getAllAssets();
    return res.json(assets);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch assets" });
  }
}

export async function getAsset(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const asset = await assetService.getAssetById(id);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    return res.json(asset);
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving asset" });
  }
}

export async function createAsset(req: Request, res: Response) {
  const {
    name,
    type,
    riskLevel,
    location,
    assignedToId,
    purchaseDate,
    expiryDate,
    complianceFlag,
  } = req.body;

  try {
    const newAsset = await assetService.createAsset({
      name,
      type,
      riskLevel,
      location,
      assignedToId,
      purchaseDate: new Date(purchaseDate),
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      complianceFlag,
    });
    return res.status(201).json(newAsset);
  } catch (err) {
    return res.status(500).json({ message: "Error creating asset" });
  }
}

export async function updateAsset(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updates = { ...req.body };
  if (updates.purchaseDate) updates.purchaseDate = new Date(updates.purchaseDate);
  if (updates.expiryDate) updates.expiryDate = new Date(updates.expiryDate);

  try {
    const updated = await assetService.updateAsset(id, updates);
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Error updating asset" });
  }
}

export async function deleteAsset(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await assetService.deleteAsset(id);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: "Error deleting asset" });
  }
}

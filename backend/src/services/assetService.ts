import { PrismaClient, Asset, AssetType, RiskLevel } from "@prisma/client";
import { logError, logInfo } from "../utils/logger";

const prisma = new PrismaClient();

export async function getAllAssets(): Promise<Asset[]> {
  try {
    return await prisma.asset.findMany({
      include: { assignedTo: true },
    });
  } catch (error) {
    logError("Error fetching all assets", error);
    throw error;
  }
}

export async function getAssetById(id: number): Promise<Asset | null> {
  try {
    return await prisma.asset.findUnique({
      where: { id },
      include: { assignedTo: true },
    });
  } catch (error) {
    logError(`Error fetching asset with ID ${id}`, error);
    throw error;
  }
}

export async function createAsset(data: {
  name: string;
  type: AssetType;
  riskLevel: RiskLevel;
  location: string;
  assignedToId?: number;
  purchaseDate: Date;
  expiryDate?: Date;
  complianceFlag: boolean;
}): Promise<Asset> {
  try {
    const newAsset = await prisma.asset.create({ data });
    logInfo(`Created new asset: ${newAsset.id}`);
    return newAsset;
  } catch (error) {
    logError("Error creating asset", error);
    throw error;
  }
}

export async function updateAsset(
  id: number,
  data: Partial<{
    name: string;
    type: AssetType;
    riskLevel: RiskLevel;
    location: string;
    assignedToId?: number;
    purchaseDate: Date;
    expiryDate?: Date;
    complianceFlag: boolean;
  }>
): Promise<Asset> {
  try {
    const updated = await prisma.asset.update({
      where: { id },
      data,
    });
    logInfo(`Updated asset: ${id}`);
    return updated;
  } catch (error) {
    logError(`Error updating asset ${id}`, error);
    throw error;
  }
}

export async function deleteAsset(id: number): Promise<void> {
  try {
    await prisma.asset.delete({ where: { id } });
    logInfo(`Deleted asset: ${id}`);
  } catch (error) {
    logError(`Error deleting asset ${id}`, error);
    throw error;
  }
}

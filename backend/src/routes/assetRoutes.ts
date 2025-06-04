import { Router } from "express";
import {
  listAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../controllers/assetController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

// All asset routes require authentication
router.get("/", requireAuth, listAssets);
router.get("/:id", requireAuth, getAsset);
router.post("/", requireAuth, createAsset);
router.put("/:id", requireAuth, updateAsset);
router.delete("/:id", requireAuth, deleteAsset);

export default router;

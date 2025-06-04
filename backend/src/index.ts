import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import assetRoutes from "./routes/assetRoutes";
import { PrismaClient } from "@prisma/client";
import { logInfo, logError } from "./utils/logger";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/assets", assetRoutes);

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logError("Unhandled error", err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  logInfo(`Server running on http://localhost:${PORT}`);
});

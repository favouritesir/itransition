import { Router } from "express";
import authRoutes from "./auth.route";

const router = Router();

// Define the routes
router.use("/auth", authRoutes);

export default router;

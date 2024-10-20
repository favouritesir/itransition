import { Router } from "express";
const router = Router();

// Define routes
router.get("/", (req, res) => {
  res.send("mashaAllah");
});

export default router;

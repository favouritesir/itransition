import { Router } from "express";
import authRoutes from "./auth.route";

const router = Router();

// Define the routes
router.use("/auth", authRoutes);
router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`
      document.addEventListener('DOMContentLoaded', function() {
          console.log('Dynamic JavaScript loaded from server!');
          alert('This JavaScript is coming from the server!');
      });
    `); 
});

export default router;

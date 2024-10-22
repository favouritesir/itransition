import {
  Router,
  Response,
  Request,
  ErrorRequestHandler,
  NextFunction,
} from "express";

import authRoutes from "./auth.route";
import $response from "../services/response.services";
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

/***************************************************************************************************** GLOBAL PAGE NOT FOUND */
router.use((req, res, next) => {
  $response(res).status(404).send({
    msg: "address not found",
    hint: "try different address",
  });
});

export default router;

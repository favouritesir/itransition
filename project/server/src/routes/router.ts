import {
  Router,
  Response,
  Request,
  ErrorRequestHandler,
  NextFunction,
} from "express";

import $response from "../services/response.services";
import authRoutes from "./auth.route";
import devRoutes from "./dev.route";
import { API } from "../controllers/api.controller";
const router = Router();

// Define the routes
router.use("/auth", authRoutes);
router.use("/dev", devRoutes);
router.get("/", API);

/***************************************************************************************************** GLOBAL PAGE NOT FOUND */
router.use((req, res, next) => {
  $response(res).status(404).send({
    msg: "address not found",
    hint: "try different address",
  });
});

export default router;

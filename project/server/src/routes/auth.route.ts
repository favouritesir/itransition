import { Router } from "express";
import {
  error,
  initDataRequest,
  login,
  logout,
  register,
} from "../controllers/auth.controller";
const router = Router();

/************************************************************************************************* ROUTES */

router.post("/login", login);
router.post("/signup", register);
router.get("/logout", logout);
router.get("/", initDataRequest);

/************************************************************************************************* ERROR HANDLER */
router.use(error);

export default router;

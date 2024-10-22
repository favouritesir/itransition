import { Router } from "express";
import { error, login, logout, register } from "../controllers/auth.controller";
const router = Router();

/************************************************************************************************* ROUTES */

router.post("/login", login);
router.post("/signup", register);
router.get("/logout", logout);

/************************************************************************************************* ERROR HANDLER */
/***************************************************************************************************** GLOBAL PAGE NOT FOUND */
router.use(error);

export default router;

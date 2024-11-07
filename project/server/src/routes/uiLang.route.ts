/*
 * Title: UILANG ROUTE
 * Description: for sending or receiving languages data
 * Author: Ashikur Rahman SA
 * Date: Monday, 28 -October-2024 (15:23:31)
 *
 */

import { Router } from "express";
import { getLanguages } from "../controllers/uiLang.controller";

const langRoute = Router();

// get languages data
langRoute.get("/:code", getLanguages);

/*
 * Title: Application
 * Description: export the express application
 * Author: Ashikur Rahman SA
 * Date: Monday, 21 -October-2024 (16:49:58)
 *
 */
/************************************************************************************************* DEPENDENCIES */
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import router from "./routes/router";
import $response from "./services/response.services";
import cors from "cors";
import cookieParser from "cookie-parser";

/***************************************************************************************************** APP SETUP OR CONFIGURATION */
const app = express();

/***************************************************************************************************** GLOBAL MIDDLEWARE */
app.use(cors());
app.use(cookieParser());
app.use(express.json());

/***************************************************************************************************** ROUTES */
app.use("/api/", router);

/***************************************************************************************************** GLOBAL ERROR HANDLER MIDDLEWARE */
router.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    $response(res).status(500).send({
      msg: "internal server error",
      hint: "Please contact with developer",
    });
  }
);

/***************************************************************************************************** EXPORTING THE APP */
export default app;

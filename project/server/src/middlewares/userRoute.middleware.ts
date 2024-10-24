import { Request, Response, NextFunction } from "express";
import $response from "../services/response.services";
import authService from "../services/auth.services";

const userRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      $response(res).status(401).send({
        msg: "No token found.",
        hint: "Redirect user to your login page",
      });
    }

    const data = authService.getTokenData(token);
    if (!data) {
      $response(res).status(401).send({
        msg: "Invalid token.",
        hint: "Redirect user to your login page",
      });
    }

    if (await authService.inValidUser) {
      $response(res).status(401).send({
        msg: "Invalid user.",
        hint: "Redirect user to your login page",
      });
    }
    next();
  } catch (e) {
    $response(res).status(500).send({
      msg: "unexpected error occurred to verify the user",
      hint: "try again or contact the administrator",
    });
  }
};

export default userRoute;

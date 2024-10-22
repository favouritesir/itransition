import $response from "../services/response.services";
import { NextFunction, Request, Response } from "express";

/************************************************************************************************* LOGIN */
export const login = (req: Request, res: Response) => {
  $response(res).send();
};

/************************************************************************************************* REGISTER */
export const register = (req: Request, res: Response) => {
  $response(res).send();
};

/************************************************************************************************* LOGOUT*/
export const logout = (req: Request, res: Response) => {
  $response(res).send();
};

/************************************************************************************************* ERROR */
export const error = (req: Request, res: Response, next: NextFunction) => {
  $response(res).status(404).send({
    msg: "address not found",
    hint: "you can use api/auth/{login:post|signup:post|logout:get}",
  });
};

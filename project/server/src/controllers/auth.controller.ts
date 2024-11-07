import authService from "../services/auth.services";
import $response from "../services/response.services";
import { NextFunction, Request, Response } from "express";

/************************************************************************************************* LOGIN */
export const login = async (req: Request, response: Response) => {
  const { name, identifier, password } = req.body;
  let username = "";
  let email = "";

  if (identifier.includes("@")) email = identifier;
  else username = identifier;

  if ((username || email) && password) {
    const res = await authService.userLogin({ username, email, password });
    if (res.err) return response.status(res.code!).json(res);
    //todo:need to return data
    $response(response)
      .status(200)
      .send({
        msg: "success message",
        data: {
          user: { id: res.data!.id, email: "mashaAllah" },
        },
      });
  } else
    $response(response).status(401).send({
      msg: "Please provide username, email or password",
      hint: "Please give all the required data",
    });
};

/************************************************************************************************* REGISTER */
export const register = async (req: Request, response: Response) => {
  const { name, identifier, password } = req.body;

  if (name && identifier && password) {
    const res = await authService.userRegister({ name, identifier, password });
    if (res.err) return response.status(res.code!).json(res);
  } else
    $response(response).status(401).send({
      msg: "Please provide username, email or password",
      hint: "Please give all the required data",
    });
};

/************************************************************************************************* LOGOUT*/
export const logout = (req: Request, res: Response) => {
  $response(res).send();
};

/************************************************************************************************* INIT DATA REQUEST */
export const initDataRequest = (req: Request, res: Response) => {
  authService;

  $response(res)
    .status(200)
    .send({
      msg: "success message",
      data: {
        user: { id: "alhamdulillah", email: "mashaAllah" },
      },
    });
};

/************************************************************************************************* FORGOT PASSWORD */

/************************************************************************************************* ERROR */
export const error = (req: Request, res: Response, next: NextFunction) => {
  $response(res).status(404).send({
    msg: "address not found",
    hint: "you can use api/auth/{login:post|signup:post|logout:get}",
  });
};

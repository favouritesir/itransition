import { NextFunction, Request, Response } from "express";
import { Api } from "../services/API.services";
import $response from "../services/response.services";

export const API = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "application/javascript");

  $response(res)
    .status(200)
    .send({
      data: {
        user: { obj: true },
        api: Api,
      },
    });
};

import { NextFunction, Request, Response } from "express";
import { Api } from "../services/API.services";

export const API = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "application/javascript");
  res.send(new Api());
};

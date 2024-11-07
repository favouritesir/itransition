/*
 * Title: api user auth middleware
 * Description: when client requests appeared then check the api key to verify the client
 * Author: Ashikur Rahman SA
 * Date: Sunday, 27 -October-2024 (11:26:39)
 *
 */

/************************************************************************************************* DEPEDDENCIES */
import { Request, Response, NextFunction } from "express";

export const apiUserAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers.authorization;
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).send({ msg: "Invalid API Key." });
  }
};

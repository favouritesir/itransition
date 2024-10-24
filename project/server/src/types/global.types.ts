/*
 * Title: Global Interface
 * Description: Global inerface declaration for typeScript support over the application
 * Author: Ashikur Rahman SA
 * Date: Tuesday, 22 -October-2024 (13:08:42)
 *
 */
import { Request } from "express";
import { UserType } from "../services/DB/Users.db";
declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}

export interface ShareType {
  editors: number[];
  viewers: number[];
  anyone: "editor" | "viewer" | "none";
}

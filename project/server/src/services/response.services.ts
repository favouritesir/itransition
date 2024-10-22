/*
 * Title: http status list
 * Description: all status for the application
 * Author: Ashikur Rahman SA
 * Date: Monday, 21 -October-2024 (21:26:11)
 *
 */
import { Response } from "express";

export const allStatus: { [key: number]: string } = {
  200: "OK",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
  501: "Not Implemented",
  503: "Service Unavailable",
};

export interface ResType {
  msg?: string;
  data?: object;
  hint?: string;
  err?: boolean;
  code?: number;
  status?: string;
  links?: object;
}

class Result {
  private res: Response;
  private code: number;
  private statusStr: string;
  constructor(res: Response) {
    this.res = res;
    this.code = 200;
    this.statusStr = allStatus[200];
    Object.seal(this);
  }
  status(c: number = 200) {
    this.code = c;
    this.statusStr = allStatus[c];
    return this;
  }
  send(obj: ResType = {}) {
    this.res.status(this.code).json({
      message: obj.msg || "",
      status: this.statusStr,
      code: this.code,
      data: obj.data || null,
      err: obj.err || false,
      hint: obj.hint || "",
      links: obj.links || null,
    });
  }
}

export const $response = (res: Response) => new Result(res);

export default $response;

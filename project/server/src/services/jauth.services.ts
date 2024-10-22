import { Request } from "express";
class AuthService {
  private req: Request;
  constructor(req: Request) {
    this.req = req;
  }
}

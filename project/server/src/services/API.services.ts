import { UserType } from "../types/Users.type";

export class Api {
  protected _user?: UserType;
  constructor(user?: UserType) {
    this._user = user;
  }
  get user() {
    return this._user;
  }
  login() {}
  logout() {}
  register() {}
}

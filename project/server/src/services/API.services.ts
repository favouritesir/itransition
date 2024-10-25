import { UserType } from "../types/Users.type";

export const Api = {
  user: null,
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  register: "/api/auth/register",
  profile: "/api/users/:id",
  settings: "/api/users/:id/settings",
};

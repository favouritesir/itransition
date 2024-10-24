import { decodeJWT } from "../utils/crypto.utils";
import { userDB } from "./DB/Users.db";

const authService: any = {};

authService.getTokenData = (token: string) => {
  return decodeJWT(token);
};
authService.inValidUser = async (id: string) => {
  const user = await userDB
    .getUserById(id)
    .select(["blocked", "deleted"])
    .fetch();
  if (!user) return true;
  else (await user.blocked) || (await user.deleted);
};

export default authService;

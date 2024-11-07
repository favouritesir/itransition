import { decodeJWT, passHash, passVerify } from "../utils/crypto.utils";
import DB from "./DB/db";
import prisma from "./DB/prismaClient";
import $response, { $Response, ResType } from "./response.services";
import { getUserInitData } from "./users.services";

interface LoginParams {
  username?: string;
  email?: string;
  password: string;
}

class authService {
  getTokenData(token: string) {
    return decodeJWT(token);
  }

  async userLogin({ username, email, password }: LoginParams): Promise<any> {
    //find the user
    const user = await DB.getUsers()
      .getIfErr(false)
      .when(username ? `username=${username}` : `email=${email}`)
      .fetch(["id", "password"]);

    // if user is not found
    if (!user) {
      return $Response({
        code: 404,
        msg: "User not found",
      });
    }

    // verify the password
    const { isVerified } = passVerify(password, user.password);
    if (!isVerified) {
      return $Response({
        code: 401,
        msg: "Invalid password",
      });
    }

    // if valid user
    return $Response({
      data: { id: user.id },
    });
  }

  /************************************************************************************************* USER REGISTER */
  async userRegister({ name, email, password }: any): Promise<ResType> {
    //push the user
    const user = await DB.getUsers()
      .getIfErr("")
      .getIfDone(["id"])
      .push({ email: email, password: passHash(password) });

    // if error arises
    if (!user) {
      return $Response({
        code: 501,
        msg: "Operation not complete",
      });
    }

    // create user profile settings workspaces

    // if create the user
    return $Response({
      data: { id: user.id },
    });
  }

  verifyUserPassword() {}
}

export default new authService();

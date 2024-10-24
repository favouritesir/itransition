import { Router } from "express";
import { error, login, logout, register } from "../controllers/dev.contorller";
import $response from "../services/response.services";
import prisma from "../services/DB/prismaClient";
import { userDB } from "../services/DB/Users.db";
const devRoutes = Router();

/************************************************************************************************* ROUTES */
// todo: for future needs inShaAllah
devRoutes.post("/login", login);
devRoutes.post("/signup", register);
devRoutes.get("/logout", logout);
// devRoutes.get("/api-key")

devRoutes.get("/", (req, res) => {
  async function test() {
    const res = await userDB
      .getUserById("111")
      .select(["email", "blocked", "deleted"])
      .fetch();
    // const res2 = await prisma.users.findMany();
    console.log(await res);
  }
  test();

  $response(res).send({ code: 200, data: prisma.users.fields });
});

/************************************************************************************************* ERROR HANDLER */
devRoutes.use(error);

export default devRoutes;

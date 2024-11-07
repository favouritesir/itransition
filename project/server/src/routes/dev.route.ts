import { Router } from "express";
import { error, login, logout, register } from "../controllers/dev.controller";
import $response from "../services/response.services";
import prisma from "../services/DB/prismaClient";
import DB from "../services/DB/db";
import { createOn } from "../services/DB/V2/ppp.type.db";

const devRoutes = Router();

/************************************************************************************************* ROUTES */
// todo: for future needs inShaAllah
devRoutes.post("/login", login);
devRoutes.post("/signup", register);
devRoutes.get("/logout", logout);
// devRoutes.get("/api-key")

devRoutes.get("/", (req, res) => {
  async function test() {
    let resp = await DB.getUsers()
      // .for(["email", "password"])
      // .if("13<=id<=16")
      .descBy(["id"])
      // .getQuery();
      .fetchAll();
    // .push({ deleted: true });
    // .getQueryFilter(["where", "select", "include"]);
    let val = createOn("API").data({});

    $response(res).send({ code: 200, data: resp });
  }

  test();
});

/************************************************************************************************* ERROR HANDLER */
devRoutes.use(error);

export default devRoutes;

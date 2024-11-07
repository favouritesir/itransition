import { PrismaClient } from "@prisma/client";
import { DBTable } from "./table";

const prisma = new PrismaClient();

const usersTable = new DBTable({ table: prisma.users });

(async () => {
  let data;

  /********************************************** Get User with partial fields */
  data = await usersTable.if(`email='10@mail.com'`).fetch(["id", "password"]);
  console.log(data);

  // or in prisma
  data = await prisma.users.findUnique({
    where: { email: "10@mail.com" },
    select: {
      id: true,
      password: true,
    },
  });

  /********************************************** Get All Users with partial fields */
  data = await usersTable.fetchAll(["id", "verified", "proUser"]);
  console.log(data);

  //   or in prisma-
  data = await prisma.users.findMany({
    select: { id: true, verified: true, proUser: true },
  });
  console.log(data);

  /************************************************ get all user with specific field from 5th page */
  data = await usersTable
    .setPageSize(10)
    .getPage(5)
    .fetchAll(["id", "email", "password"]);

  console.log(data);

  // or in prisma
  data = await prisma.users.findMany({
    skip: 40,
    take: 10,
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  /**************************************************** Make page for a range of data & select some field with multipe order */
  const pages = usersTable.setPageSize(10).if("4<id<=75"); // we can save specific pages
  const orderById = pages.ascBy(["id"]);
  const dsecOrderById = pages.descBy(["id"]);

  // all email for id 5 to 75 in ascending order
  data = await orderById.fetchAll(["email"]);
  console.log(data);

  // or in prisma
  data = await prisma.users.findMany({
    where: {
      id: {
        gt: 4,
        lte: 75,
      },
    },
    orderBy: [{ id: "asc" }],
    select: {
      email: true,
    },
  });

  // all id and deleted fields for 25 to 30 in ase order
  data = await orderById.getPage(3).fetchAll(["id", "deleted"]);
  console.log(data);

  //or in prisma
  data = await prisma.users.findMany({
    skip: 24,
    take: 10,
    where: {
      id: {
        gt: 4,
        lte: 75,
      },
    },
    orderBy: [{ id: "asc" }],
    select: {
      id: true,
      deleted: true,
    },
  });

  // all fields for id 35 to 45 if they are deleted
  data = await dsecOrderById.getPage(4).if("deleted=true").fetchAll(["id"]);
  console.log(data);

  // or in prisma
  data = await prisma.users.findMany({
    skip: 34,
    take: 10,
    where: {
      id: {
        gt: 4,
        lte: 75,
      },
      deleted: true,
    },
    orderBy: [{ id: "asc" }],
    select: {
      id: true,
    },
  });
})();

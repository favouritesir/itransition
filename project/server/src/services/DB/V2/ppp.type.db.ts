// ============================================================================================
// PPP TYPES
// ============================================================================================
// AUTHOR       : Ashikur Rahman
// DESCRIPTION  : All types of prisma++ will be exported from here inShaAllah.
// Date         : Wednesday, 30 -October-2024 (09:54:46)
// ============================================================================================

const u = "Users";
import All, { Prisma, PrismaClient } from "@prisma/client";
import { toCamelCase } from "../../../utils/string.utils";

const prisma = new All["PrismaClient"]();

const name = "users";
let table = prisma[name];
let Name = "users";
let table2 = prisma[name];

class Ppp<T extends keyof PrismaClient> {
  protected client: PrismaClient[T];

  constructor(name: Prisma.ModelName) {
    const Name = toCamelCase(name);
    this.client = prisma[Name as T];
  }
  get(
    args?: Prisma.XOR<Prisma.UsersCreateInput, Prisma.UsersUncheckedCreateInput>
  ) {
    return this.client;
  }
}
// new Ppp("Users").get({});
class A<T> {
  data(arg: T) {
    return arg;
  }
}

export function createOn<T extends Prisma.ModelName>(us: T) {
  const fields = { ...Prisma[`${us}ScalarFieldEnum`] };
  type fieldsType = { [k in keyof typeof fields]?: any };

  return new A<fieldsType>();
}

// function ppp(nm: string) {}

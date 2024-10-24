import { Request } from "express";
import prisma from "./prismaClient";
import { UserType } from "../../types/Users.type";
import { DBTable } from "./table";
import { Prisma } from "@prisma/client";

export const Users = prisma.users;

class UserDB extends DBTable {
  private state: UserType = {};
  constructor() {
    super(prisma.users);
  }

  getUserById(id: string) {
    this.currentUser = id;
    this.flag = "one";
    return this.where(`id=${id}`);
  }
  getUsers() {}
}

const getUser = (obj: UserDB) => {
  return {
    getProfile() {
      // return obj.getProfile();
    },
    fetch() {
      obj.fetch();
    },
    getSettings() {},
    getWorkSpaces() {},
    getSpaces() {},
    getFolders() {},
    getDocuments() {},
  };
};

export const userDB = new UserDB();

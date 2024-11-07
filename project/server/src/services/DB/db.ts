import prisma from "./prismaClient";
import { DBTable } from "./table";

// Database table manager
class DataBase {
  getUsers() {
    return new DBTable({ table: prisma.users });
  }
  getResponses() {
    return new DBTable({ table: prisma.responses });
  }
  getDocuments() {
    return new DBTable({ table: prisma.documents });
  }
  getComments() {
    return new DBTable({ table: prisma.comments });
  }
  getThemes() {
    return new DBTable({ table: prisma.themes });
  }
}
const DB = new DataBase();
export default DB;

import { Prisma } from "@prisma/client";
import { UserType } from "../../types/Users.type";
import { DBTableType } from "../../types/table.type";
import prisma from "./prismaClient";
import { buildWhere } from "./utils.db";

export interface QueryType {
  where?: any;
  select?: any;
  skip?: number;
  take?: number;
  orderBy?: any;
  data?: object;
  cursor?: any;
  distinct?: any;
  include?: object;
}

export class DBTable {
  protected currentUser: string = "";
  protected query: QueryType = {};
  protected fields?: {} = {}; // columns for the table
  protected totalRows: number = 0; // total rows in the table
  protected table: DBTableType;
  protected flag: string = "";
  constructor(table: DBTableType) {
    this.table = table;
    this.query.select = {};
  }

  getFields() {
    return this.fields;
  }
  select(columns: string[]) {
    columns.forEach((column: string) => (this.query.select[column] = true));
    return this;
  }
  where(cond: string | object) {
    const { where } = this.query;
    cond = typeof cond == "string" ? buildWhere(cond) : cond;
    this.query.where = where ? { ...where, ...cond } : { ...cond };
    return this;
  }

  fetch() {
    switch (this.flag) {
      case "first":
        return this.table.findFirst(this.query);
        break;
      case "one":
        return this.table.findUnique(this.query);
        break;
      default:
        return this.table.findMany(this.query);
    }
  }
  push(data: object[]) {
    if (data.length > 1) this.table.updateMany(this.query);
    else this.table.updateMany(this.query);
  }

  getRow() {}
  getRows() {}
  setRow() {}
  setRows() {}
  delRow() {}
  delRows() {}
}

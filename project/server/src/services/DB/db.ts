import { UserType } from "../../types/Users.type";
import {} from "./Users.db";

class QueryBuilder {
  private model: any;
  private whereConditions: any = {};
  private selectFields: any = null;
  private pagination: { skip?: number; take?: number } = {};
  private orderBy: any = null;

  constructor(model: any) {
    this.model = model;
  }

  // Get all records
  getAll() {
    return this;
  }

  // Apply pagination
  pageSize(size: number) {
    this.pagination.take = size;
    return this;
  }

  // Get a specific page
  get(pageNumber: number) {
    this.pagination.skip = (pageNumber - 1) * (this.pagination.take || 0);
    return this;
  }

  // Apply filtering
  find(text: string) {
    this.whereConditions = {
      OR: Object.keys(this.model.fields).map((field) => ({
        [field]: {
          contains: text,
          mode: "insensitive",
        },
      })),
    };
    return this;
  }

  // Apply filtering on specific fields
  in(...fields: string[]) {
    this.whereConditions = {
      OR: fields.map((field) => ({
        [field]: {
          contains: this.whereConditions.OR[0][field].contains, // re-use the previous search term
          mode: "insensitive",
        },
      })),
    };
    return this;
  }

  // Select specific fields
  //   get(...fields: string[]) {
  //     this.selectFields = fields.reduce((acc, field) => {
  //       acc[field] = true;
  //       return acc;
  //     }, {});
  //     return this;
  //   }

  // Filter by specific field values
  for(field: string, value: string) {
    this.whereConditions[field] = value;
    return this;
  }

  // Return only first few records
  getFirst(limit: number) {
    this.pagination.take = limit;
    return this;
  }

  // Return the actual data, execute the query
  async data() {
    return await this.model.findMany({
      where: this.whereConditions,
      select: this.selectFields,
      skip: this.pagination.skip,
      take: this.pagination.take,
      orderBy: this.orderBy,
    });
  }
}

// Database table manager
class DataBase {
  getUserById(id: string) {
    // return new UserDB().getUser(user);
  }
  getUsers() {}
  getResponses() {}
  getDocuments() {}
  getComments() {}
  getThemes() {}
}
const DB = new DataBase();
export default DB;

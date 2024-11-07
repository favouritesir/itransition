import All, { Prisma, PrismaClient } from "@prisma/client";
import { toCamelCase } from "../../../utils/string.utils";
const prisma = new PrismaClient();

// class Model <>{
//   protected model: PrismaClient[keyof PrismaClient];
//   constructor(name: Prisma.ModelName) {
//     this.model = new PrismaClient()[toCamelCase(name) as keyof PrismaClient];
//   }
//   t() {
//     return prisma["users"];
//   }
// }

const abc = {};

// class CreateOn<U> {
//   private userData?: U;
//   private tableName: Prisma.ModelName;

//   constructor(name: Prisma.ModelName) {
//     this.tableName = name;
//   }
//   data(data: U) {
//     this.userData = data;
//   }
// }

// function createOn(name:Prisma.ModelName){
//   return new CreateOn<typeof Prisma[`${name}ScalarFieldEnum`]>(name);
// }
class CreateOn<objType> {
  data(nam: objType) {
    return this;
  }
}
class DelOn<objType> {
  where(nam: objType) {
    return this;
  }
}
function PPP<name extends Prisma.ModelName>(forTable: name) {
  const fields = { ...Prisma[`${forTable}ScalarFieldEnum`] };
  type fieldsType = { [k in keyof typeof fields]?: any };

  return {
    Create: CreateOn<fieldsType>,
    Update: DelOn<fieldsType>,
    Get: DelOn<fieldsType>,
    Del: DelOn<fieldsType>,
  };
}

export const createOn = (tableName: Prisma.ModelName) => {
  return new (PPP(tableName).Del)();
};

createOn("Users").where({});

/************************************************************************************************* comment */

class Ppp<T extends keyof PrismaClient> {
  protected client: PrismaClient[T];

  constructor(name: Prisma.ModelName) {
    const Name = toCamelCase(name);
    this.client = prisma[Name as T];
  }
  get(args?: Prisma.SelectSubset<PrismaClient[T], PrismaClient[T]>) {
    return this.client;
  }
}
new Ppp("Users").get({});

/************************************************************************************************* comment */

type Chainable<T = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<T & { [P in K]: V }>;
  get(): T;
};

// উদাহরণ ব্যবহার
const config = {} as Chainable;

const result = config;
// .option('abc', true).get().abc
// .option("name", "Alice")
// .option("age", 25)
// .option("isAdmin", true)
// .get();

console.log(result); // { name: "Alice", age: 25, isAdmin: true }

/************************************************************************************************* comment */

/************************************************************************************************* comment */

// type MethodNames<T> = {
//   [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
// }[keyof T];

// type ChainableMethods<T, UsedMethod extends keyof T> = Omit<T, UsedMethod>;

// // টেবিল ম্যানেজার ক্লাস
// class TableManager<T extends Prisma.ModelName> {
//   private model: any;

//   constructor(name: T) {
//     this.model = prisma[name as keyof PrismaClient];
//   }

//   // প্রথম মেথড call করার পর তা বাদ দিয়ে অন্যগুলোর অ্যাক্সেস রাখবে
//   findMany(args?: Parameters<typeof this.model.findMany>[0]): ChainableMethods<this, 'findMany'> {
//     console.log("findMany called with args:", args);
//     return this as any;
//   }

//   create(args: Parameters<typeof this.model.create>[0]): ChainableMethods<this, 'create'> {
//     console.log("create called with args:", args);
//     return this as any;
//   }

//   update(args: Parameters<typeof this.model.update>[0]): ChainableMethods<this, 'update'> {
//     console.log("update called with args:", args);
//     return this as any;
//   }

//   delete(args: Parameters<typeof this.model.delete>[0]): ChainableMethods<this, 'delete'> {
//     console.log("delete called with args:", args);
//     return this as any;
//   }
// }

// // টেবিল ম্যানেজার ফাংশন (ডায়নামিক টেবিলের নাম ইনপুট হিসেবে নেয়)
// function tb<T extends Prisma.ModelName>(name: T) {
//   return new TableManager(name);
// }

// // উদাহরণ ব্যবহার:
// async function main() {
//   // প্রথমে findMany কল করলে এটি পরের চেইনে আর থাকবে না
//   tb("Users").findMany({ where: { active: true } }).create({
//     data: { email: "test@example.com", password: "hashedPassword123" },
//   });

//   // create কল করার পর চেইনে create বাদে বাকি মেথড দেখাবে
//   tb("Users").create({
//     data: { email: "new@example.com", password: "hashedPassword456" },
//   }).findMany();

//   tb("Users").create({})
//   // prisma.users.create({})
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect());

/************************************************************************************************* comment */

// // Using a generic type `T` to represent the model type
// class TableManager<TModel> {
//   private model: TModel;

//   constructor(model: TModel) {
//     this.model = model;
//   }

//   // findMany - will provide suggestions based on the model type
//   findMany(args?: Prisma.SelectSubset<Parameters<TModel["findMany"]>[0], TModel>): this {
//     console.log("findMany called with args:", args);
//     return this;
//   }

//   // create - will provide suggestions based on the model type
//   create(args: Prisma.SelectSubset<Parameters<TModel["create"]>[0], TModel>): this {
//     console.log("create called with args:", args);
//     return this;
//   }

//   // Other methods can be added in the same way...
// }

// // Table manager function
// function tb<T extends keyof PrismaClient>(name: T) {
//   const model = prisma[name];
//   return new TableManager<typeof model>(model);
// }

// // Example usage:
// async function main() {
//   // Here you'll get suggestions based on the table
//   tb("users").findMany({
//     where: { email: "test@example.com" },
//   });

//   tb("users").create({
//     data: { email: "new@example.com", password: "hashedPassword123" },
//   });
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect());

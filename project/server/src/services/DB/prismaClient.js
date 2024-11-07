"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
// export const DB = async (fun) => await fun(prisma);
exports.default = prisma;
// // Atomic transaction with Prisma
// await prisma.$transaction(async (prisma) => {
//     // First, find the current maximum id for a specific owner
//     const maxIdResult = await prisma.spaces.aggregate({
//       _max: {
//         id: true,
//       },
//       where: {
//         owner: ownerId,
//       },
//     });
//     // Then, calculate the next id
//     const nextId = (maxIdResult._max.id || 0) + 1;
//     // Finally, create the new space with the calculated id
//     const newSpace = await prisma.spaces.create({
//       data: {
//         id: nextId,
//         owner: ownerId,
//         name: "New Space",
//         settings: {},
//       },
//     });
//     return newSpace;
//   });

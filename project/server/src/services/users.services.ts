/*
 * Title: user services
 * Description: all the services related to the user
 * Author: Ashikur Rahman SA
 * Date: Sunday, 27 -October-2024 (14:51:35)
 *
 */
import prisma from "./DB/prismaClient";

export const getUserInitData = async (id: bigint) => {
  // fetch user data from database using the
  const user = await prisma.users;
  return {};
};

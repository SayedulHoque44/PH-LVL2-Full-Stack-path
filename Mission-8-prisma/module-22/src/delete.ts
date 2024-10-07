import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteFn = async () => {
  // **Delete single row
  //   const deleteSingle = await prisma.post.delete({
  //     where: {
  //       id: 8,// it's also have to unique field
  //     },
  //   });
  //   console.log(deleteSingle);

  // **Delete multi row
  //   const deleteMulti = await prisma.post.deleteMany({
  //     where: {
  //       //   id: 5,
  //       published: false, // delete those row which are published false matched
  //     },
  //   });
  //   console.log(deleteMulti);

  //**Delete all
  const deleteAll = await prisma.post.deleteMany({}); // this will delete all row from table

  console.log(deleteAll);
};

deleteFn();

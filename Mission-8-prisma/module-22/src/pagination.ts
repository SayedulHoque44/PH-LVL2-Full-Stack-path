import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pagination = async () => {
  // paginatino + sorting
  // offset pagination
  const offsetData = await prisma.post.findMany({
    skip: 5, //skip
    take: 2, // it's limit
    orderBy: {
      // sorting
      id: "asc", // 'asc'/'desc'
    },
  });
  console.log(offsetData);

  // cursor pagination
  const cursorData = await prisma.post.findMany({
    skip: 5,
    take: 2,
    cursor: {
      id: 25, // that's mean data will start from 25
    },
  });
  //console.log(cursorData);
};
pagination();

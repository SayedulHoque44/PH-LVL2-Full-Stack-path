import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // **Insert Data to table
  //   const result = await prisma.post.create({//prismaClient.tableName.create({data:{...row}})
  //     data: {
  //       title: "This is title",
  //       content: "This is content",
  //       authorName: "",
  //     },
  //   });
  //   console.log(result);
};

main();

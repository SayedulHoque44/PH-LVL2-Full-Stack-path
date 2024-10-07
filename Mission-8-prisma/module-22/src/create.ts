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

  const createMany = await prisma.post.createMany({
    data: [
      {
        title: "This is title 1",
        content: "This is content 1",
        authorName: "sayed 1",
      },
      {
        title: "This is title 2",
        content: "This is content 2",
        authorName: "sayed 2",
      },
      {
        title: "This is title 3",
        content: "This is content 3",
        authorName: "sayed 3",
      },
    ],
  });

  console.log(createMany);
};

main();

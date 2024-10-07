import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updates = async () => {
  // --------------------- Single Update
  //   const singleUpdate = await prisma.post.update({
  //     where: {
  //       id: 6,
  //     },
  //     data: {
  //       title: "This is title 6",
  //       content: "This is content 6",
  //       authorName: "sayed 6",
  //     },
  //   });
  //   console.log(singleUpdate);

  // --------------------- multi Update
  // const multiUpdate = await prisma.post.updateMany({
  //   where: {
  //     title: "This is title 2", //update those where title value matched
  //   },
  //   data: {
  //     published: true, //update this
  //   },
  // });
  // console.log(multiUpdate);

  // --------------------- multi Update
  const upsertData = await prisma.post.upsert({
    where: {
      id: 9, // have to unique field // if id:1 found then it will just update
    },
    update: {
      authorName: "Sayed 9", // updated the found row of this field
    },
    create: {
      // or if this row not found for update then create new one following this
      title: "title 1",
      content: "content 1",
    },
  });
  console.log(upsertData);
};

updates();

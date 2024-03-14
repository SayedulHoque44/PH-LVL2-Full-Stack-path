import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const TransactionInteractive = async () => {
  // if user created then must update the user which selected
  // Interactive Transaction -- given all query have to success then all then database will modified or else no query will execute
  const result = await prisma.$transaction(async (TransactionClient) => {
    // Query 1
    const getAllPost = await TransactionClient.post.findMany({
      where: {
        published: true,
      },
    });
    // Query 2
    const countUser = await TransactionClient.post.count({
      where: {
        published: true,
      },
    });
    // Query 3
    const updatedUer = await TransactionClient.user.update({
      where: {
        id: 1,
      },
      data: {
        age: 44,
      },
    });

    //
    return {
      getAllPost,
      countUser,
      updatedUer,
    };
  });
  console.log(result);
  //
};
TransactionInteractive();

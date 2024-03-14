import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const TransactionBatch = async () => {
  // if user created then must update the user which selected

  const createUser = prisma.user.create({
    // without await query will not execute
    data: {
      username: "sayedul",
      email: "sayedul@gmail.com",
    },
  });
  const udpateUserAge = prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      age: 78,
    },
  });
  const udpateUserRole = prisma.user.update({
    where: {
      id: 4,
    },
    data: {
      role: "admin",
    },
  });

  // Batch Transaction -- given all query have to success then all then database will modified or else no query will execute
  const [userData, updatedData] = await prisma.$transaction([
    createUser,
    udpateUserAge,
    udpateUserRole,
  ]);

  console.log(userData, updatedData);
};
TransactionBatch();

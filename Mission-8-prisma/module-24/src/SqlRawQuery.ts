import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const SqlRawQuery = async () => {
  // prisma cannot perform complex query, then we can use raw query
  // we have to call orginal table name which is defined in sqlMigration &&map()

  const post = await prisma.$queryRaw`SELECT * FROM "posts"`; //@@map(orginal table name is posts in DB)
  console.log(post);
  await prisma.$queryRaw`TRUNCATE TABLE "Users" CASCADE`; // delete user with there reletion also
  await prisma.test.create({
    data: {
      name: "named 1",
    },
  });
};
SqlRawQuery();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", (event) => {
  console.log("Query :", event.query);
  console.log("Duration :", event.duration, "ms");
  console.log("Date & Time :", event.timestamp);
});

const logging = async () => {
  const getAll = await prisma.user.findMany();
};
logging();

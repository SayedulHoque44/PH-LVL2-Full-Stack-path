import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //  **Get all row form post table ------------------------- findMany
  const getAllFromDB = await prisma.post.findMany({
    select: {
      title: true, //only title will be return of row
    },
  });
  //console.log(getAllFromDB);

  // **Get first row matched -------------------------------- findFirst
  const getFindFirstMatchedRow = await prisma.post.findFirst({
    where: {
      published: true, //published:false matched first row will be return or else return null
    },
  });
  //console.log(getFindFirstMatchedRow);

  // **Get first row matched if not found then throw error------findFirstOrThrow
  const getFindFirstMatchedRowOrError = await prisma.post.findFirstOrThrow({
    where: {
      published: false, // give true //published:false matched first row will be return if not found the reuturn an error
    },
  });

  // ** Get row with unique field ,other field not use able, field have to unique identifier-----------findUnique
  const FindUnique = await prisma.post.findUnique({
    where: {
      id: 1, // must use only unique field
    },
  });

  //console.log(FindUnique);

  // ** Get row with unique field ,other field not use able, field have to unique identifier if not found then will be an error-----------findUniqueOrThrow
  const FindUniqueOrThrowError = await prisma.post.findUniqueOrThrow({
    where: {
      id: 1, // give 10(which is not exits then it will thorw error) // must use only unique field
    },
  });
  //console.log(FindUnique);
};

main();

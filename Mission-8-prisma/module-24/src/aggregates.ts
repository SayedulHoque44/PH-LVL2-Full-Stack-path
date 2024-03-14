import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const aggregates = async () => {
  //  we only can use aggreagete a number fields
  //find avrag age
  const avgAge = await prisma.user.aggregate({
    _avg: {
      age: true,
    },
  });
  // find sum of age
  const sumAge = await prisma.user.aggregate({
    _sum: {
      age: true,
    },
  });
  // find count of age fields
  const countAge = await prisma.post.aggregate({
    _count: {
      title: true, // totoal titile have in a row from tables
    },
    where: {
      // we also can use where in aggregate for filltaring
      published: true,
    },
  });

  // find number of records -- total table row
  const countData = await prisma.user.count();

  // find max age - return age max value from all age
  const maxAge = await prisma.user.aggregate({
    _max: {
      age: true,
    },
  });

  // find min age - return age min value form all age
  const minAge = await prisma.user.aggregate({
    _min: {
      age: true,
    },
  });

  // --------------- Group By
  const groupPost = await prisma.post.groupBy({
    by: ["published"], // we can group in multiple field using array like this
    _count: {
      title: true, // total count title in the every group
    },
    having: {
      // we also can filtaring using having or where
      authorId: {
        _sum: {
          gt: 2, // give me those which group authorId sum total getter then 2
        },
      },
    },
  });

  console.log(groupPost);
};
aggregates();

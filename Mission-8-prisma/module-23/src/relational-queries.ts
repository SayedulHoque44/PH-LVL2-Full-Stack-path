import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const relationalQueries = async () => {
  // get user all post -- fluent api
  //   const result = await prisma.user
  //     .findUnique({
  //       where: {
  //         id: 3,
  //       },
  //     })
  //     .Post(); // getting post()/profile() - fluent Api
  //   console.log(result);
  // get user with all post
  //   const result = await prisma.user.findUnique({
  //     where: {
  //       id: 3,
  //     },
  //     include: {
  //       Post: true, // add field true inside the included // it's like populate
  //     },
  //   });
  //   console.log(result);
  // relational filter -- Q: In post published:true those post return in the user
  //   const publishedPostUsers = await prisma.user.findMany({
  //     include: {
  //       // at first include the Post[]
  //       // cannot use where cz its's reference table we have use it inside the post
  //       Post: {
  //         //it's also table// condition run on Post table
  //         where: {
  //           published: true,
  //         },
  //       },
  //     },
  //   });
  //   console.dir(publishedPostUsers, { depth: Infinity }); // console.log(publishedPostUsers) giving post[{object},{object}] like this
};
relationalQueries();

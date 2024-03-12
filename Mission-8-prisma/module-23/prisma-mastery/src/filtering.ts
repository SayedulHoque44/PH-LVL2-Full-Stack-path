import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const filtaring = async () => {
  // ** ------- Advane filtaring AND & OR & Not --------------

  // Q: get post where in title field have title and that have to also published true.

  //    AND
  //   const andFiltering = await prisma.post.findMany({
  //     where: {
  //       AND: [
  //         {
  //           title: {
  //             contains: "title",
  //           },
  //         },
  //         {
  //           published: true,
  //         },
  //       ],
  //     },
  //   });
  //   console.log(andFiltering);

  //   Or
  const orFiltering = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: "title",
          },
        },
        {
          published: true,
        },
      ],
    },
  });

  //   Not equal
  const notEqualFiltering = await prisma.post.findMany({
    where: {
      NOT: [
        {
          title: {
            contains: "title", // give those where titile has no title
          },
        },
      ],
    },
  });

  // startWith & endwith
  const startWith = await prisma.post.findMany({
    where: {
      title: {
        // startsWith: "this",
        endsWith: "5",
      },
    },
  });

  // equal
  const equal = await prisma.post.findMany({
    where: {
      title: {
        equals: "this is subTite 5",
      },
    },
  });

  // search from array - if you have data inside an array and you have to perform query using this array then :
  const categoryArray = ["web dev", "Programming"];
  const getCategroyFromAnArray = await prisma.category.findMany({
    where: {
      name: {
        in: categoryArray, // it will loop and try to match this array ele from categroy if matched than it will return.
      },
    },
  });

  // get all information in depth using there relation
  const getInDepthUsingRltn = await prisma.user.findUnique({
    where: {
      id: 1, //select specific an user
    },
    include: {
      //nesting relation field of post
      Post: {
        include: {
          // post has also nesting rltn name postCategory
          postCategory: {
            include: {
              // postCategroy has also category and post rltn, select only category cz we have post info already
              category: true,
            },
          },
        },
      },
    },
  });

  console.dir(getInDepthUsingRltn, { depth: Infinity });
};
filtaring();

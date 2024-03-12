import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // user
  // const createUser = await prisma.user.create({
  //   data: {
  //     username: "user 2",
  //     email: "user2@gmail.com",
  //     role: UserRole.user, // we can use like this which is used in creating prisma model
  //   },
  // });
  // console.log(createUser);
  //profile
  // const createProfile = await prisma.profile.create({
  //   data: {
  //     bio: "this is my bio",
  //     userId: 1,
  //   },
  // });
  //Category
  // const createCategory = await prisma.category.create({
  //   data: {
  //     name: "Software Engineering",
  //   },
  // });
  //Creating Post using category Connect
  // const createPost = await prisma.post.create({
  //   data: {
  //     title: "this is title",
  //     content: "this is content of the post",
  //     authorId: 1,
  //     postCategory: {
  //       // creating referenced postCategory, postCategory need postId and categoryId , postId will be found from present post cz it's creating inside the post, and now\\\\\\\\\\\\\\\\ we need to connect the categoryId
  //       create: {
  //         category: {
  //           connect: {
  //             id: 1,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  // console.log(createPost);
  //Creating Post using category ID + include like populate
  // const createPost = await prisma.post.create({
  //   data: {
  //     title: "this is title",
  //     content: "this is content of the post",
  //     authorId: 1,
  //     postCategory: {
  //       create: {
  //         categoryId: 3, // if without connect we can use providing category id
  //       },
  //     },
  //   },
  //   include: {
  //     postCategory: true, // by this there will be provid postcatgory value also, it's populate of mongodb
  //   },
  // });
  // console.log(createPost);
  //Creating Post using multiple category ID - one to many
  // const createPost = await prisma.post.create({
  //   data: {
  //     title: "this is title 5",
  //     content: "this is content of the post 5",
  //     authorId: 3,
  //     postCategory: {// many category id
  //       create: [
  //         {
  //           categoryId: 1,
  //         },
  //         {
  //           categoryId: 3,
  //         },
  //         {
  //           categoryId: 4,
  //         },
  //       ],
  //     },
  //   },
  //   include: {
  //     postCategory: true, // by this there will be provid postcatgory value also, it's populate of mongodb
  //   },
  // });
  // console.log(createPost);
};

main();

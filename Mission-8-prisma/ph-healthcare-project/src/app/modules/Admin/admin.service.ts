import { Admin, Prisma, UserStatus } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { adminSearchAbleFields } from "./admin.constant";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../interface/pagination";

const getAllAdmin = async (
  params: IAdminFilterRequest,
  option: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(option);
  const { searchTerm, ...restQuery } = params;
  const andConditions: Prisma.AdminWhereInput[] = []; // conditon will be added in array using AND operator

  // For searchTerm
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
        // [name: {
        //   contains: params.searchTerm,
        //   mode: "insensitive",
        // }, more...]
      })),
    });
  }

  if (Object.keys(restQuery).length > 0) {
    andConditions.push({
      AND: Object.keys(restQuery).map((key) => ({
        [key]: {
          equals: (restQuery as any)[key],
        },
      })),
    });
  }

  // user have to isDeleted in false
  andConditions.push({
    isDeleted: false,
  });
  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.log(params, skip, limit);

  // Query
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      option.sortBy && option.sortOrder
        ? {
            [option.sortBy]: option.sortOrder, //access object
          }
        : {
            createdAt: "desc",
          },
  });

  // pagination
  /*
  data = 1 2 3 (4 5) 6
  page = 2
  limit = 2
  formula page-1 * limit
  (2-1)*3 = 3
  */

  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};
//
const updateById = async (id: string, data: Partial<Admin>): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const updated = await prisma.admin.update({
    where: {
      id,
    },
    data, // note that you cann't updated a foreign key like email which is connected to user.
  });

  return updated;
};
//
const hardDeleteFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    // admin
    const adminDeleted = await transactionClient.admin.delete({
      where: {
        id,
        isDeleted: false,
      },
    });
    // user
    await transactionClient.user.delete({
      where: {
        email: adminDeleted.email,
      },
    });

    //
    return adminDeleted;
  });

  return result;
};

//
const softDelete = async (id: string): Promise<Admin | null> => {
  const user = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    // admin
    const adminDeleted = await transactionClient.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    // user
    const userDeleted = await transactionClient.user.update({
      where: {
        email: adminDeleted.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    //
    return adminDeleted;
  });

  return result;
};

export const adminServices = {
  getAllAdmin,
  getByIdFromDB,
  updateById,
  hardDeleteFromDB,
  softDelete,
};

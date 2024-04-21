import { Prisma, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interface/file";
import { Request } from "express";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { adminSearchAbleFields } from "../Admin/admin.constant";
import { userSearchableFields } from "./user.constant";
import { IAuthUser } from "../../interface/common";
import { userRoutes } from "./user.routes";
import ApiError from "../../Errors/ApiError";
import httpStatus from "http-status";

const createAdmin = async (req: Request) => {
  // file uploade
  const file: IFile = req.file;
  if (file) {
    const uploadToColudinary = await fileUploader.uploadToColudinary(file);
    req.body.admin.profilePhoto = uploadToColudinary?.secure_url;
  }
  const { password, admin } = req.body;
  //hashPassword
  const hashPassword = await bcrypt.hash(password, 10);

  //user data
  const userData = {
    email: admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  // Transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    // create user
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    // create admin
    const createdAdminData = await transactionClient.admin.create({
      data: admin,
    });

    return { createdAdminData };
  });

  return result;
};
//
const createDoctor = async (req: Request) => {
  // file uploade
  const file: IFile = req.file;
  if (file) {
    const uploadToColudinary = await fileUploader.uploadToColudinary(file);
    req.body.doctor.profilePhoto = uploadToColudinary?.secure_url;
  }
  const { password, doctor } = req.body;
  //hashPassword
  const hashPassword = await bcrypt.hash(password, 10);

  //user data
  const userData = {
    email: doctor.email,
    password: hashPassword,
    role: UserRole.DOCTOR,
  };

  // Transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    // create user
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    // create doctor
    const createdDoctorData = await transactionClient.doctor.create({
      data: doctor,
    });

    return { createdDoctorData };
  });

  return result;
};
//
const createPatient = async (req: Request) => {
  // file uploade
  const file: IFile = req.file;
  if (file) {
    const uploadToColudinary = await fileUploader.uploadToColudinary(file);
    req.body.patient.profilePhoto = uploadToColudinary?.secure_url;
  }
  const { password, patient } = req.body;
  //hashPassword
  const hashPassword = await bcrypt.hash(password, 10);

  //user data
  const userData = {
    email: patient.email,
    password: hashPassword,
    role: UserRole.PATIENT,
  };

  // Transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    // create user
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    // create doctor
    const createdPatientData = await transactionClient.patient.create({
      data: patient,
    });

    return { createdPatientData };
  });

  return result;
};

const getAllFromDb = async (params: any, option: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(option);
  const { searchTerm, ...restQuery } = params;
  const andConditions: Prisma.UserWhereInput[] = []; // conditon will be added in array using AND operator

  // For searchTerm
  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.log(params, skip, limit);

  // Query
  const result = await prisma.user.findMany({
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
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      // Admin:true // as like include
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

  const total = await prisma.user.count({
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

const changeProfileStatus = async (id: string, status: UserRole) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });

  return updateUserStatus;
};

const getMyProfile = async (payload: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload?.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      needPasswordChange: true,
      role: true,
      status: true,
    },
  });
  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN || UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUniqueOrThrow({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUniqueOrThrow({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUniqueOrThrow({
      where: {
        email: userInfo.email,
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

//
const updateMyProfile = async (authUser: any, req: Request) => {
  console.log(authUser);
  const userData = await prisma.user.findUnique({
    where: {
      id: authUser.userId,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exists!");
  }

  const file = req.file as IFile;

  if (file) {
    const uploadedProfileImage = await fileUploader.uploadToColudinary(file);
    req.body.profilePhoto = uploadedProfileImage?.secure_url;
  }

  let profileData;
  if (userData?.role === UserRole.ADMIN) {
    profileData = await prisma.admin.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  } else if (userData?.role === UserRole.DOCTOR) {
    profileData = await prisma.doctor.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  } else if (userData?.role === UserRole.PATIENT) {
    profileData = await prisma.patient.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  }
  return { ...profileData, ...userData };
};

export const userServices = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDb,
  getMyProfile,
  changeProfileStatus,
  updateMyProfile,
};

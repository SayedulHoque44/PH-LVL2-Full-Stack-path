import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../Errors/ApiError";
import { IAuthUser } from "../../interface/common";
import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { skip } from "node:test";

const insertIntoDB = async (
  user: any,
  payload: {
    scheduleIds: string[];
  }
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  if (payload.scheduleIds.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Input atlest 1 schedule");
  }

  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    scheduleId,
    doctorId: doctorData.id,
  }));

  const result = prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });

  return result;
};

const getMySchedule = async (
  filters: any,
  options: IPaginationOptions,
  user: IAuthUser
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { startDate, endDate, ...filterData } = filters;
  console.log(filterData);

  const andConditions: Prisma.DoctorSchedulesWhereInput[] = [];

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          schedule: {
            startDateTime: {
              gte: startDate,
            },
          },
        },
        {
          schedule: {
            endDateTime: {
              lte: endDate,
            },
          },
        },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "true"
    ) {
      filterData.isBooked = true;
    } else if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "false"
    ) {
      filterData.isBooked = false;
    }

    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.DoctorSchedulesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user?.email,
      },
      ...whereConditions,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });
  const total = await prisma.doctorSchedules.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const deleteFromDB = async (user: IAuthUser, scheduleId: string) => {
  const userData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const isBookedSchedule = await prisma.doctorSchedules.findUnique({
    where: {
      doctorId_scheduleId: {
        doctorId: userData.id,
        scheduleId,
      },
      isBooked: true,
    },
  });
  if (isBookedSchedule) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Your can't delete booked schedule"
    );
  }

  const result = await prisma.doctorSchedules.delete({
    where: {
      doctorId_scheduleId: {
        doctorId: userData.id,
        scheduleId,
      },
    },
  });

  return result;
};

const getAllFromDB = async (
  filters: {
    searchTerm?: string | undefined;
    isBooked?: boolean | undefined;
  },
  options: IPaginationOptions
) => {
  const { skip, limit, page } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.DoctorSchedulesWhereInput[] = [];

  if (Object.keys(filterData).length > 0) {
    if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "true"
    ) {
      filterData.isBooked = true;
    } else if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "false"
    ) {
      filterData.isBooked = false;
    }
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));

    andConditions.push(...filterConditions);
  }
  //
  const whereConditions: Prisma.DoctorSchedulesWhereInput = {
    AND: andConditions,
  };
  //
  const result = await prisma.doctorSchedules.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
    include: {
      schedule: true,
      doctor: true,
    },
  });
  //
  const total = await prisma.doctorSchedules.count({});
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const DoctorScheduleService = {
  insertIntoDB,
  getMySchedule,
  deleteFromDB,
  getAllFromDB,
};

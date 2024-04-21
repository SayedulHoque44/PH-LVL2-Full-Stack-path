import { Prisma, Schedule } from "@prisma/client";
import { IFilterRequest, ISchedule } from "./schedule.interface";
import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma";
import { number } from "zod";
import { IPaginationOptions } from "../../interface/pagination";
import { IAuthUser } from "../../interface/common";
import { paginationHelper } from "../../../helpers/paginationHelper";

// convert local to UTC
const convertDateTime = async (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
};

const inserIntoDB = async (payload: ISchedule): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;

  const interverlTime = 30;

  const schedules = [];

  const currentDate = new Date(startDate); // 12-1-27 with no hour
  const lastDate = new Date(endDate); // 12-1-28 with no hour

  //   loop on currentDate to lastDate
  while (currentDate <= lastDate) {
    // set timestap of date with start time with hour // 12-1-27 9:00
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );
    // set timestap of date with end time with hour // 12-1-27 15:00
    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    // loop on startDateTime to endDateTime till: 12-1-27 9:00 < 12-1-27 15:00
    while (startDateTime < endDateTime) {
      // const scheduleData = {
      //     startDateTime: startDateTime,
      //     endDateTime: addMinutes(startDateTime, interverlTime)
      // }

      const s = await convertDateTime(startDateTime);
      const e = await convertDateTime(addMinutes(startDateTime, interverlTime));

      const scheduleData = {
        startDateTime: s,
        endDateTime: e,
      };

      const exitstingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });
      if (!exitstingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }
      //   increment startDateTime
      startDateTime.setMinutes(startDateTime.getMinutes() + interverlTime);
    }
    // increment currentDate with Day // to increment 12-1-27 to 12-1-28
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules as Schedule[];
};

const deleteSchedules = async () => {
  await prisma.schedule.deleteMany();
};

const getAllFromDB = async (
  filters: IFilterRequest,
  options: IPaginationOptions,
  user: IAuthUser
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { startDate, endDate, ...filterData } = filters;

  const andConditions = [];

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          startDateTime: {
            gte: startDate,
          },
        },
        {
          endDateTime: {
            lte: endDate,
          },
        },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
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

  const whereConditions: Prisma.ScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const doctorSchedules = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user?.email,
      },
    },
  });

  const doctorScheduleIds = doctorSchedules.map(
    (schedule) => schedule.scheduleId
  );
  console.log(user, doctorScheduleIds);

  const result = await prisma.schedule.findMany({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.schedule.count({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
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

export const ScheduleService = {
  inserIntoDB,
  deleteSchedules,
  getAllFromDB,
};

import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interface/common";
import { v4 as uuidv4 } from "uuid";
import { IPaginationOptions } from "../../interface/pagination";
import {
  AppointmentStatus,
  PaymentStatus,
  Prisma,
  UserRole,
} from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import ApiError from "../../Errors/ApiError";
import httpStatus from "http-status";

const createAppointment = async (user: IAuthUser, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
    },
  });

  await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId: string = uuidv4();

  const result = await prisma.$transaction(async (tx) => {
    const appointmentData = await tx.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: payload.scheduleId,
        videoCallingId,
      },
      include: {
        patient: true,
        doctor: true,
        schedule: true,
      },
    });

    await tx.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointmentData.id,
      },
    });

    // PH-HealthCare-datatime
    const today = new Date();

    const transactionId =
      "PH-HealthCare-" +
      today.getFullYear() +
      "-" +
      today.getMonth() +
      "-" +
      today.getDay() +
      "-" +
      today.getHours() +
      "-" +
      today.getMinutes();

    await tx.payment.create({
      data: {
        appointmentId: appointmentData.id,
        amount: doctorData.appointmentFee,
        transactionId,
      },
    });

    return appointmentData;
  });

  return result;
};

const getMyAppointment = async (
  user: IAuthUser,
  filters: any,
  options: IPaginationOptions
) => {
  const { ...filterData } = filters;
  const { skip, limit, page } = paginationHelper.calculatePagination(options);

  const andCondition: Prisma.AppointmentWhereInput[] = [];

  if (user?.role === UserRole.PATIENT) {
    andCondition.push({
      patient: {
        email: user.email,
      },
    });
  }
  if (user?.role === UserRole.DOCTOR) {
    andCondition.push({
      doctor: {
        email: user.email,
      },
    });
  }

  // filter by field
  if (Object.keys(filterData).length > 0) {
    const filterCondition = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: filterData[key],
      },
    }));

    andCondition.push(...filterCondition);
  }
  console.log(andCondition);

  const result = await prisma.appointment.findMany({
    where: { AND: andCondition },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include:
      user?.role === UserRole.PATIENT
        ? { doctor: true, schedule: true }
        : {
            patient: {
              include: { MedicalReport: true, PatientHealthData: true },
            },
            schedule: true,
          },
  });

  return result;
};

const changeAppointmentStatus = async (
  id: string,
  status: AppointmentStatus,
  user: IAuthUser
) => {
  console.log(user);
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      doctor: true,
    },
  });

  if (user?.role === UserRole.DOCTOR) {
    if (user.email !== appointmentData.doctor.email) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This is not your appointment!"
      );
    }
  }

  const res = await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return res;
};

const cancelUnPaidAppointments = async () => {
  const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000); // convert to milisecound,
  // console.log(new Date(Date.now()));

  const unPaidAppointments = await prisma.appointment.findMany({
    where: {
      createdAt: {
        lte: thirtyMinAgo,
      },
      paymentStatus: PaymentStatus.UNPAID,
    },
  });
  const appointmentIdsToCancel = unPaidAppointments.map(
    (appointment) => appointment.id
  );
  // console.log(appointmentIdsToCancel);

  await prisma.$transaction(async (tx) => {
    // delete from relation payment
    await tx.payment.deleteMany({
      where: {
        appointmentId: {
          in: appointmentIdsToCancel, // all found 30 min ago cancel id
        },
      },
    });
    // delete from appointment
    await tx.appointment.deleteMany({
      where: {
        id: {
          in: appointmentIdsToCancel,
        },
      },
    });

    await tx.doctorSchedules.updateMany({
      where: {
        appointmentId: {
          in: appointmentIdsToCancel,
        },
      },
      data: {
        isBooked: false,
      },
    });
    // update isBooked true to false
    // for(const unPaidAppointment of unPaidAppointments){
    //   await tx.doctorSchedules.update({
    //     where:{

    //     }
    //   })
    // }
  });
};

export const AppointmentService = {
  createAppointment,
  changeAppointmentStatus,
  getMyAppointment,
  cancelUnPaidAppointments,
  // getAllFromDB
};

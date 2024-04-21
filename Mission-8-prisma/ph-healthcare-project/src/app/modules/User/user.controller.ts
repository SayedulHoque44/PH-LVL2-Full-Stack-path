import { Request, Response } from "express";
import { userServices } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import {
  userFilterableFields,
  userOptionFields,
  userSearchableFields,
} from "./user.constant";
import { IAuthUser } from "../../interface/common";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created successfuly!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createDoctor(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Created successfuly!",
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createPatient(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Created successfuly!",
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  // Pick those which are exits in our model to perform query
  const filtersQuery = pick(req.query, userFilterableFields);
  const optionsQuery = pick(req.query, userOptionFields);
  const result = await userServices.getAllFromDb(filtersQuery, optionsQuery);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrive successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

const getMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await userServices.getMyProfile(req.user as IAuthUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrive successfully",
      data: result,
    });
  }
);
const updateMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await userServices.updateMyProfile(user, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile data Updated!",
      data: result,
    });
  }
);
export const userControllers = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDb,
  getMyProfile,
  changeProfileStatus,
  updateMyProfile,
};

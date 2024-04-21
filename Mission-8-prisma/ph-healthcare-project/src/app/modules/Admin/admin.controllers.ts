import { NextFunction, Request, RequestHandler, Response } from "express";
import pick from "../../../shared/pick";
import { adminFilterAbleFields, adminOptionFields } from "./admin.constant";
import { adminServices } from "./admin.service";
import { Admin } from "@prisma/client";
import { send } from "process";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const getAllAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Pick those which are exits in our model to perform query
    const filtersQuery = pick(req.query, adminFilterAbleFields);
    const optionsQuery = pick(req.query, adminOptionFields);
    const result = await adminServices.getAllAdmin(filtersQuery, optionsQuery);

    //
    // res.send({
    //   success: true,
    //   message: "Admins retrive successfully",
    //   meta: result.meta,
    //   data: result.data,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins retrive successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
//
const getById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getByIdFromDB(req.params.id);
    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins retrive successfully",
      data: result,
    });
  }
);
//
const updateById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { params, body } = req;
    const result = await adminServices.updateById(params.id, body);

    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins update successfully",
      data: result,
    });
  }
);
//
const hardDeleteFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const result = await adminServices.hardDeleteFromDB(params.id);

    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin hard deleted successfully",
      data: result,
    });
  }
);
//
const softDeleteFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const result = await adminServices.softDelete(params.id);

    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins soft deletd successfully",
      data: result,
    });
  }
);

export const adminControllers = {
  getAllAdmin,
  getById,
  updateById,
  hardDeleteFromDB,
  softDeleteFromDB,
};

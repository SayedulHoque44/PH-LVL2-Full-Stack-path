import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paymentServices } from "./payment.service";

const initPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { appointmentId } = req.params;
    const result = await paymentServices.initPayment(appointmentId);
    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment Initiate successfully",
      data: result,
    });
  }
);

const validatePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await paymentServices.validatePayment(req.query);
    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment validate successfully",
      data: result,
    });
  }
);

export const paymentControllers = {
  initPayment,
  validatePayment,
};

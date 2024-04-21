import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userServices } from "../User/user.service";
import { authServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../Errors/ApiError";
import { jwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.loginUser(req.body);
    //
    const { refreshToken, ...restResult } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
    });
    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Login successfully",
      data: restResult,
    });
  }
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const result = await authServices.refreshToken(refreshToken);
    //
    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Refresh Token sent successfully",
      data: result,
    });
  }
);

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const { user, body } = req;
    const result = await authServices.changePassword(user, body);
    //
    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password changed successfully!",
      data: null,
    });
  }
);

const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const result = await authServices.forgetPassword(body.email);
    //
    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Check Your Mail!",
      data: result,
    });
  }
);
const resetPassword = catchAsync(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const { body } = req;
    const decodedData = jwtHelper.verifyToken(
      req.headers.authorization as string,
      config.jwt.reset_pass_secret as string
    );
    const result = await authServices.resetPassword(decodedData.email, body);
    //
    //
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password Reset Successfully!",
      data: result,
    });
  }
);
export const authControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};

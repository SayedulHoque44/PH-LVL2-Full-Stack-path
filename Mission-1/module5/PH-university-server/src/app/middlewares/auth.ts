import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../error/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    // checking if the given token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      //
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "unAuthorized!");
    }
    const { role, userId, iat } = decoded;
    // checking if the user is exist
    const user = await UserModel.isUserExistsByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
    }
    //
    if (
      user.passwordChangedAt &&
      UserModel.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }
    //   check role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized  hi!",
      );
    }
    //

    (req as any).user = decoded;

    next();
  });
  //
};
export default auth;

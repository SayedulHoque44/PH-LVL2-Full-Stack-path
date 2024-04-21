import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const Success = false;
  let Message = err.message || "Somthing Went Wrong";
  let Error = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    Message = "Validation Error";
    Error = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      Message = "Duplicate Key error";
      Error = err.meta;
    }
  }

  res.status(statusCode).json({
    Success,
    Message,
    Error,
  });
};

export default globalErrorHandler;

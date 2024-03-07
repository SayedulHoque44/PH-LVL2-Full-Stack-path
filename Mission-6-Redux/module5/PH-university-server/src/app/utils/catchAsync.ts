import { NextFunction, Request, RequestHandler, Response } from "express";

// replacement of try catch
// interface CustomReq extends Request {
//   user: JwtPayload;
// }
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };
};

export default catchAsync;

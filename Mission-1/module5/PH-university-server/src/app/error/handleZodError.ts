import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

// Handl zod error
export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issus: ZodIssue) => {
    return {
      path: issus?.path[issus.path.length - 1],
      message: issus?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

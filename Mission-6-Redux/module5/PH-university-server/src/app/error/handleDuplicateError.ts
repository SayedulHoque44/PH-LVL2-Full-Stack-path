import { TErrorSources, TGenericErrorResponse } from "../interface/error";

//  for this must remove pre "save" error handle in model which created before
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // extract using regex from chatgpt
  const match = err.message.match(/"([^"]*)"/);
  //
  const extractMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractMessage} is already exists!`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleDuplicateError;

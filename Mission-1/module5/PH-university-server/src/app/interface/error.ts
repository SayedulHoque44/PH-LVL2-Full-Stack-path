//error sources
export type TErrorSources = {
  path: string | number;
  message: string;
}[];
// return respone
export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources; //
};

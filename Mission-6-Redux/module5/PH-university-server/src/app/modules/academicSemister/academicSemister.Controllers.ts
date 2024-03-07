import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemisterServices } from "./academicSemister.Service";

// create academic semister
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.createAcademicSemisterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is created successfull!",
    data: result,
  });
});
// get all academic semister
const getAllAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAllAcademicSemisterFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic semester Retrive successfull!",
    meta: result.meta,
    data: result.result,
  });
});

// getAcademicSemisterById
const getAcademicSemisterById = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAcademicSemisterByIDFromDB(
    req.params.semisterId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.name} Academic semester Retrive successfull!`,
    data: result,
  });
});
// updateAcademicSemister
const updateAcademicSemisterByID = catchAsync(async (req, res) => {
  const result =
    await AcademicSemisterServices.updateAcademicSemisterByIDFromDB(
      req.params.semisterId,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.name} Academic semester Updated successfull!`,
    data: result,
  });
});

export const AcademicSemisterControllers = {
  createAcademicSemester,
  getAllAcademicSemister,
  getAcademicSemisterById,
  updateAcademicSemisterByID,
};

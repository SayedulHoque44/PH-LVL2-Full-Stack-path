import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.serveice";

// createAcademicDepartmentIntoDB
const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department Created successfully!",
    data: result,
  });
});
// getAllAcademicDepartmeFromDB
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Departments Retrive successfully!",
    meta: result.meta,
    data: result.result,
  });
});
// getAcademicDepartmentById
const getAcademicDepartmentById = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAcademicDepartmentById(
    req.params.departmentId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department Retrive successfully!",
    data: result,
  });
});
// updateAcademicDepartmentById
const updateAcademicDepartmentById = catchAsync(async (req, res) => {
  const { params, body } = req;

  const result = await AcademicDepartmentServices.updateAcademicDepartmentById(
    params.departmentId,
    body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department updated successfully!",
    data: result,
  });
});

// controllers
export const AcadmicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartmentById,
};

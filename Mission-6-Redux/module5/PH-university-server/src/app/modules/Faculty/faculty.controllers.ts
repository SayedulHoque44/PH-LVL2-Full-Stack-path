import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from "./faculty.service";

//
const getAllFaculty = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultyFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty are retrive succsesfully",
    meta: result.meta,
    data: result.result,
  });
});
//
const getSingleFacultyById = catchAsync(async (req, res) => {
  const result = await facultyServices.getSingleFacultyByIdFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is retrive succsesfully",
    data: result,
  });
});
//
const updateFaculty = catchAsync(async (req, res) => {
  const { params, body } = req;
  const result = await facultyServices.updateFacultyFromDB(
    params.id,
    body.faculty,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty updated succsesfully",
    data: result,
  });
});
//
const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Deleted succsesfully",
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculty,
  getSingleFacultyById,
  updateFaculty,
  deleteFaculty,
};

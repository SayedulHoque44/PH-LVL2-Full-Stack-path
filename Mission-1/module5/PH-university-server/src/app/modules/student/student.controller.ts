// Req Res er jabotio kaj ba control ta hbe ai controller e
import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

//

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const getAllStudent = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrive succsesfully",
    meta: result.meta,
    data: result.result,
  });
});
// update student
const updateStudent = catchAsync(async (req, res) => {
  const { student } = req.body;
  const { id } = req.params;
  const result = await StudentServices.updateStudentIntoDB(id, student);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated succsesfully",
    data: result,
  });
});

// get all student

// get single std
const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);

    // response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is retrive succsesfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
// get single std
const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentIntoDB(id);

  // response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is Deleted succsesfully",
    data: result,
  });
});

// delete a single student

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteSingleStudent,
};

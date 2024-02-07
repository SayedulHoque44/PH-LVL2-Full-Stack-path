import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../error/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageCloudinary";
import { Admin } from "../Admin/admin.model";
import { TFaculty } from "../Faculty/faculty.interface";
import { FacultyModel } from "../Faculty/faculty.model";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { TAcademicSemister } from "../academicSemister/academicSemister.Interface";
import { AcademicSemisterModel } from "../academicSemister/academicSemister.Model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";

// create student
const createStudentIntoDB = async (
  file: any,
  password: string,
  paylode: TStudent,
) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if admin not gaved pass then it will user default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = "student";
  // set student email
  userData.email = paylode.email;

  // find academic semister info
  const admissionSemester = await AcademicSemisterModel.findById(
    paylode.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic semester not found!");
  }
  // find department
  const academicDepartment = await AcademicDepartmentModel.findById(
    paylode.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, "Aademic department not found");
  }
  // add academic faculty
  paylode.academicFaculty = academicDepartment.academicFaculty;
  // --- Create Session
  const session = await mongoose.startSession();

  try {
    session.startTransaction(); // start session
    //   set mannually generate it
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemister,
    );

    // send image to cloudinary
    if (file) {
      const imageName = `${userData.id}${paylode?.name?.firstName}`;
      const path = file.path;
      const cloudinarySecureUrl = await sendImageToCloudinary(imageName, path);
      paylode.profileImg = cloudinarySecureUrl;
    }

    //create a user (Transaction-1) --> isolated enviroment
    const newUser = await UserModel.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create User!");
    }
    // set id,_id a user
    paylode.id = newUser[0].id;
    paylode.user = newUser[0]._id; // reference id

    // create Student (Transaction-2) --> isolated enviroment ([data],{sessionName})

    const newStudent = await Student.create([paylode], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create Student!");
    }

    // Success!
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    // if not sucess abort session
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

// create faculty
const createFacultyIntoDB = async (
  password: string,
  paylode: TFaculty,
  file: any,
) => {
  const userData: Partial<TUser> = {};
  // password
  userData.password = password || (config.default_pass as string);
  // role
  userData.role = "faculty";
  // set faculty email
  userData.email = paylode.email;
  // find gaven academic department info
  //
  const academicDepartment = await AcademicDepartmentModel.findById(
    paylode.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not Found!");
  }

  // add academic Faculty
  paylode.academicFaculty = academicDepartment.academicFaculty;

  //
  const session = await mongoose.startSession();

  try {
    // start session
    session.startTransaction();
    // set user id
    userData.id = await generateFacultyId();

    // send image to cloudinary
    if (file) {
      const imageName = `${userData.id}${paylode?.name?.firstName}`;
      const path = file.path;
      const cloudinarySecureUrl = await sendImageToCloudinary(imageName, path);
      paylode.profileImg = cloudinarySecureUrl;
    }
    //
    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create New User!");
    }

    // set id + user(_id) to faculty
    paylode.id = newUser[0].id;
    paylode.user = newUser[0]._id; // reference id

    // create new faculty (transaction-2)
    const newFaculty = await FacultyModel.create([paylode], { session });

    if (!newFaculty.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Faild to create New Faculty!",
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
// createStudent
const createAdminIntoDB = async (
  password: string,
  payload: TFaculty,
  file: any,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not Found!");
  }

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "admin";

  // set student email
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // send image to cloudinary
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file.path;
      const cloudinarySecureUrl = await sendImageToCloudinary(imageName, path);
      payload.profileImg = cloudinarySecureUrl;
    }
    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

//
const getMe = async (userId: string, role: string) => {
  let result;
  if (role === "student") {
    result = await Student.findOne({ id: userId });
  }
  if (role === "admin") {
    result = await Admin.findOne({ id: userId });
  }
  if (role === "faculty") {
    result = await FacultyModel.findOne({ id: userId });
  }

  // const result = await UserModel.find();
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};

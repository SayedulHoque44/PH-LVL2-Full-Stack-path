import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { UserModel } from "../user/user.model";
import { FacultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { FacultyModel } from "./faculty.model";
//
const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    FacultyModel.find().populate("academicDepartment academicFaculty"),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  const meta = await facultyQuery.countTotal();
  return {
    result,
    meta,
  };
};
//
const getSingleFacultyByIdFromDB = async (id: string) => {
  const res = await FacultyModel.findById(id);
  return res;
};
//
const updateFacultyFromDB = async (id: string, paylode: Partial<TFaculty>) => {
  const { name, ...remainingAdminData } = paylode;

  const modifiedData: Record<string, unknown> = { ...remainingAdminData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      // [key,value]=for loop [['property','value']]
      modifiedData[`name.${key}`] = value;
    }
  }

  const res = await FacultyModel.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return res;
};
//
const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // transaction -1
    const deleteFaculty = await FacultyModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteFaculty) {
      throw new Error("Faild to Delete Faculty");
    }

    const userId = deleteFaculty.user;

    // transaction -1
    const deleteUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new Error("Faild to Delete User");
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

//
export const facultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyByIdFromDB,
  updateFacultyFromDB,
  deleteFacultyFromDB,
};

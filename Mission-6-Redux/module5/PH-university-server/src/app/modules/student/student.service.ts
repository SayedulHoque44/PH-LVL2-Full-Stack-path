// buisness logic will be know only service fn

import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { UserModel } from "../user/user.model";
import { studenSearchAbleFields } from "./student.constant";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// get all student
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // // copy
  // const queryObj = { ...query };
  // //
  // const studenSearchAbleFields = ["email", "name.firstName", "presentAddress"];
  // //
  // let searchTerm = ""; // if not given query
  // //
  // if (query?.searchTerm) {
  //   // if given :
  //   searchTerm = query?.searchTerm as string;
  // }
  // // phase -> 1 ->search by text on multiple filed in db
  // const searchQuery = Student.find({
  //   // check this search word in any field if matched $or, -> $regex for match and -> options i for inCaseSensative,
  //   $or: studenSearchAbleFields.map(field => ({
  //     [field]: { $regex: searchTerm, $options: "i" }, //email:{$regex:'rav',$options:i}
  //   })),
  // });
  // // filltering -> deleting query fields which should ignore in db operation.
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeFields.forEach(ele => delete queryObj[ele]);
  // // phase -> 2,...chaining -> find without baseQuery fields
  // const filterdQuery = searchQuery.find(queryObj);

  // // sorting:
  // let sort = "createdAt";

  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // // phase -> 3,...chaining -> sorting
  // const sortQuery = filterdQuery.sort(sort);

  // limit:
  // let limit = 1;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // phase -> 4,...chaining -> limiting
  // const limiQuery = await sortQuery.limit(limit);

  // pagination -> limit,skip :
  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // phase -> 4,...chaining -> limiting
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // Select: -->model.find().select('title author') -->(fields -fields)
  // fields name return,but - means never return this fields

  // let fields = "-__v"; // - dile sob - hbe, + hole sob +
  // if (query.fields) {
  //   const listedFields = (query.fields as string).split(",").join(" ");
  //   fields = listedFields;
  // }
  // phase -> 4,...chaining Execution -> less bandwith using select to response only selected fields
  // const selectedFields = await limitQuery.select(fields);

  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studenSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};
// get single std
const getSingleStudentFromDB = async (id: string) => {
  // const res = await Student.findOne({ id });
  // const result = await Student.aggregate([
  //   {
  //     $match: {
  //       id: id,
  //     },
  //   },
  // ]);
  const result = await Student.findById(id)
    .populate("user")
    .populate("admissionSemester")
    .populate("academicDepartment academicFaculty");

  return result;
};

// update a student
const updateStudentIntoDB = async (id: string, paylod: Partial<TStudent>) => {
  const { name, gurdian, localGurdian, ...remainingStudent } = paylod;
  const modifiedUpdatedData: Record<string, unknown> = { ...remainingStudent };

  /*
  client -> gurdian :{
    fatherOcupation:"Techder"
  }
  
  database ->gurdian.fatherOcupation = Teacher

  Object.keys(name) = [firstname,middleName.lastname]

  Object.entries(name) = [
  ['firstname','sayed'],
  ['middleName','ul']
  ....
]
  */
  // name
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  //  gurdian
  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdatedData[`gurdian.${key}`] = value;
    }
  }
  //  localGurdian
  if (localGurdian && Object.keys(localGurdian).length) {
    for (const [key, value] of Object.entries(localGurdian)) {
      modifiedUpdatedData[`localGurdian.${key}`] = value;
    }
  }

  const res = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true, // to run again mongoose validator
  });
  return res;
};
// delete a student
const deleteStudentIntoDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    // start session
    session.startTransaction();
    // delete std
    const deletedStd = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStd) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to delete student!");
    }
    //
    const userId = deletedStd.user;
    // delete user
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to delete student!");
    }

    // success session
    await session.commitTransaction();
    await session.endSession();
    return deletedStd;
  } catch (error) {
    // not success session
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Faild to Delete student");
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentIntoDB,
};

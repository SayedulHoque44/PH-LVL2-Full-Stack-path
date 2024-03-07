import { TAcademicSemister } from "../academicSemister/academicSemister.Interface";
import { UserModel } from "./user.model";

// year -> semisterCode -> 4 digit number
//
const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

//
export const generateStudentId = async (paylode: TAcademicSemister) => {
  // find last student id

  //first time 0000
  let currentId = (0).toString();

  // 2023 01 0001
  const lastStudent = await findLastStudentId();
  const lastStdSemisterCode = lastStudent?.substring(4, 6); //01
  const lastStdSemisterYear = lastStudent?.substring(0, 4); //2023

  if (
    lastStudent &&
    lastStdSemisterCode === paylode.code &&
    lastStdSemisterYear === paylode.year
  ) {
    currentId = lastStudent.substring(6); //0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  // console.log(incrementId);
  incrementId = `${paylode.year}${paylode.code}${incrementId}`;
  return incrementId;
};

// get last faculty id
const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

// generat facultyId
export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFaculty = await findLastFacultyId();

  if (lastFaculty) {
    currentId = lastFaculty;
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};

import { Types } from "mongoose";

export type TFacultyName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";
export type TFacultyGender = "male" | "female" | "other";
export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  role: string;
  designation: string;
  name: TFacultyName;
  gender: TFacultyGender;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};

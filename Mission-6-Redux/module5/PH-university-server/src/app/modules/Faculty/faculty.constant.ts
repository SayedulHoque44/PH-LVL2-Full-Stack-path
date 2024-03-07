import { TBloodGroup, TFacultyGender } from "./faculty.interface";

export const facultyBloodGroup: TBloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];
export const FacultySearchableFields = [
  "email",
  "id",
  "contactNo",
  "emergencyContactNo",
  "name.firstName",
  "name.lastName",
  "name.middleName",
];

export const facultyGender: TFacultyGender[] = ["male", "female", "other"];

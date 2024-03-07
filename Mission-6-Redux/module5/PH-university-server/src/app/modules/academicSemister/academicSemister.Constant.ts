import {
  TAcademicSemisterCode,
  TAcademicSemisterName,
  TAcademicSemisterNameCodeMapper,
  TMonths,
} from "./academicSemister.Interface";

export const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemisterName: TAcademicSemisterName[] = [
  "Autum",
  "Summer",
  "Fall",
];
export const AcademicSemisterCode: TAcademicSemisterCode[] = ["01", "02", "03"];

export const AcademicSemisterNameCodeMapper: TAcademicSemisterNameCodeMapper = {
  Autum: "01",
  Summer: "02",
  Fall: "03",
  Winter: "04",
};
export const AcademicSemesterSearchableFields = ["name", "year"];

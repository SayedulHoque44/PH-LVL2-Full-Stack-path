import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "academicFaculty",
  },
});

// check alredy exits department
// academicDepartmentSchema.pre("save", async function (next) {
//   const isDepartmentExits = await AcademicDepartmentModel.findOne({
//     name: this.name,
//   });
//   if (isDepartmentExits) {
//     throw new Error(`${this.name} is Already exists!`);
//   }
//   next();
// });

//model
export const AcademicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);

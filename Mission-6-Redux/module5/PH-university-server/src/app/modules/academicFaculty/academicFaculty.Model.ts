import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.Interface";

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, "Academic Faculty Name is required!"],
      unique: true,
    },
  },
  { timestamps: true },
);

// model
export const AcademicFacultyModel = model<TAcademicFaculty>(
  "academicFaculty",
  academicFacultySchema,
);

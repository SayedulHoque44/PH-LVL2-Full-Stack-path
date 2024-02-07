import { Schema, model } from "mongoose";
import { facultyBloodGroup, facultyGender } from "./faculty.constant";
import { TFaculty, TFacultyName } from "./faculty.interface";

// faculty Name Schema
const facultyNameSchema = new Schema<TFacultyName>({
  firstName: {
    type: String,
    require: [true, "firstName is required!"],
  },
  middleName: {
    type: String,
    require: [true, "middleName is required!"],
  },
  lastName: {
    type: String,
    require: [true, "lastName is required!"],
  },
});

// Faculty Sceham
const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, "faculty id is required!"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required!"],
      ref: "User",
    },
    designation: {
      type: String,
      required: [true, "Designation is required!"],
    },
    name: {
      type: facultyNameSchema,
      required: [true, "Name is required!"],
    },
    gender: {
      type: String,
      enum: {
        values: facultyGender,
        message: `{VALUE} is not valid Gender`,
      },
    },
    dateOfBirth: String,
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact is required!"],
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency Contact is required!"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: facultyBloodGroup,
        message: "{VALUE} is not valid blood group",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present Address is required!"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent Address is required!"],
    },
    profileImg: {
      type: String,
      default: "",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic department is required!"],
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic Faculty is required!"],
      ref: "academicFaculty",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// model
export const FacultyModel = model<TFaculty>("Faculty", facultySchema);

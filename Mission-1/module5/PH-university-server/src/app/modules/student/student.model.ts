// 2. Create a Schema corresponding to the document interface. --> next (create model) -> line 85

import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import validator from "validator";
import AppError from "../../error/AppError";
import {
  StudentModel,
  TGurdian,
  TLocalGurdian,
  TStudent,
  TUserName,
} from "./student.interface";

/*
// Note to be down ->
1. string mongoose e String capital letter S
2. mongoose let us as a gurd of uncontrolled data input 
3. mongoose type declared in this like prps:{type:T}
4.eNum used for preDefinded value or as like type of union

*/

// sub userNameschema of StudentSchema --> UserName from sub interface
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name required!"],
    maxlength: [20, "{VALUE} length must be less than 20"],
    trim: true,
    validate: {
      // mongoose e custom validate korte hole validate use krte hbe
      validator: function (val: string) {
        const firstNameStr = val.charAt(0).toUpperCase() + val.slice(1);
        return firstNameStr === val; //true/false
      },
      message: `{VALUE} is not in capitalize format`, //if validator got false then this message will be shown
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, "Last name required!"],
    validate: {
      validator: (value: string) => validator.isAlpha(value), // same as our coustom mongoose validator,just give us extra fn and features but working method same
      message: `{VALUE} is not valid`,
    },
    trim: true,
  },
});
// sub gurdianSchema of StudentSchema --> Gurdian from sub interface
const gurdianSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});
// sub localGurdianSchema of StudentSchema--> LocalGurdian from sub interface
const localGurdianSchema = new Schema<TLocalGurdian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Main StudentSchema
const StudentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      unique: true, // indexing kore
      required: [true, "ID is Required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      require: [true, "user Id is Required"],
      unique: true,
      ref: "User", // referecne hobe User collection er sathe
    },
    name: {
      type: userNameSchema,
      required: [true, "Name Requierd"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `The gender field can only be on of the following: 'male','female' or 'other'`,
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, "Email is Requeird!"],
      unique: true,
      // validate: {
      //   validator: (email: string) => validator.isEmail(email),
      //   message: `{VALUE} is not valid Email`,
      // },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: `{VALUE} is not valid!`,
      },
      required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    gurdian: {
      type: gurdianSchema,
      required: true,
    },
    localGurdian: {
      type: localGurdianSchema,
      required: true,
    },
    profileImg: {
      type: String,
      default: "",
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemister",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "academicFaculty",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// ----------> find middleware
StudentSchema.pre("find", function (next) {
  // console.log(this);
  // current query --> mongodb query run howar age ei quray kore fillter kore pelbe
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre("aggregate", function (next) {
  // mane studentschema er upore kono aggregate calaile age diye ata duke jabe
  // console.log(  this.pipeline())
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // array er suru te dukai dicci amder query aggregate er
  next();
});

//
StudentSchema.pre("updateOne", async function name(next) {
  const query = this.getQuery();
  const isStudentExits = await Student.findOne(query);
  if (!isStudentExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${query[Object.keys(query)[0]]} is not exits`,
    );
  }
  //
  next();
});
// coustom static method
StudentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>("Student", StudentSchema);

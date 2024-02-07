import { Schema, model } from "mongoose";
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from "./academicSemister.Constant";
import { TAcademicSemister } from "./academicSemister.Interface";

const academicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      enum: {
        values: AcademicSemisterName,
        message: `{VALUE} is not valid`,
      },
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: AcademicSemisterCode,
        message: `{VALUE} is not valid`,
      },
      required: true,
    },
    startMonth: {
      type: String,
      enum: {
        values: Months,
        message: `{VALUES} is not valid months`,
      },
      required: true,
    },
    endMonth: {
      type: String,
      enum: {
        values: Months,
        message: `{VALUES} is not valid months`,
      },
      required: true,
    },
  },
  { timestamps: true },
);

// Schema protoType (Pre)

academicSemisterSchema.pre("save", async function (next) {
  // cheking same year -> semister exits
  const isSemisterExits = await AcademicSemisterModel.findOne({
    year: this.year,
    name: this.name,
  });
  // if got the doc
  if (isSemisterExits) {
    throw new Error(`${this.name} is already exits in ${isSemisterExits.year}`);
  }
  //else let countine mongoose
  next();
});

// model
export const AcademicSemisterModel = model<TAcademicSemister>(
  "AcademicSemister",
  academicSemisterSchema,
);

import { z } from "zod";
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from "./academicSemister.Constant";

const creaetAcademicSemisterValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemisterName] as [string, ...string[]], {
      required_error: "Semister Name is required",
      invalid_type_error: "{VALUES} is not valid",
    }),
    code: z.enum([...AcademicSemisterCode] as [string, ...string[]], {
      required_error: "Semister Code is required",
    }),
    year: z.string({ required_error: "Year is required!" }),
    startMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: "Semister Start months is required!",
      invalid_type_error: "{VALUES} is not valid",
    }),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: "Semister End months is required!",
    }),
  }),
});
// update
const updateAcademicSemisterValidation = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemisterName] as [string, ...string[]], {
        invalid_type_error: "{VALUES} is not valid",
      })
      .optional(),
    code: z
      .enum([...AcademicSemisterCode] as [string, ...string[]], {
        invalid_type_error: "{VALUES} is not valid",
      })
      .optional(),
    year: z.string({ required_error: "Year is required!" }),
    startMonth: z
      .enum([...Months] as [string, ...string[]], {
        invalid_type_error: "{VALUES} is not valid",
      })
      .optional(),
    endMonth: z
      .enum([...Months] as [string, ...string[]], {
        invalid_type_error: "{VALUES} is not valid",
      })
      .optional(),
  }),
});
export const AcademicSemisterZodValidation = {
  creaetAcademicSemisterValidation,
  updateAcademicSemisterValidation,
};

import { z } from "zod";

const createAcademicDepartmentVal = z.object({
  body: z.object({
    name: z.string({
      required_error: "Academic Department Name is required!",
      invalid_type_error: "Academic Department Name must be in string type! ",
    }),
    academicFaculty: z.string({
      required_error: "Academic Department Id is required!",
      invalid_type_error: "Academic Faculty Id must be in string type! ",
    }),
  }),
});
const updateAcademicDepartmentVal = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Academic Department Name is required!",
        invalid_type_error: "Academic Department Name must be in string type! ",
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: "Academic Department Id is required!",
        invalid_type_error: "Academic Faculty Id must be in string type! ",
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidationSchemas = {
  createAcademicDepartmentVal,
  updateAcademicDepartmentVal,
};

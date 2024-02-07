import { z } from "zod";

const createAcademicFacultyValiSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty type must be string",
    }),
  }),
});
const updateAcademicFacultyValiSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Faculty type must be string",
      })
      .optional(),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyValiSchema,
  updateAcademicFacultyValiSchema,
};

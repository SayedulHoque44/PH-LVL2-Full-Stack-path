import { z } from "zod";
import { facultyBloodGroup, facultyGender } from "./faculty.constant";

// faculty name create Schema
const createFacultyNameValidation = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string(),
  lastName: z.string(),
});

// faculty create validation Schema
const createFacultyValidation = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      designation: z.string({ required_error: "Designation is required!" }),
      name: createFacultyNameValidation,
      gender: z.enum([...facultyGender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum([...facultyBloodGroup] as [string, ...string[]])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

// faculty name update Schema
const updateFacultyNameValidation = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// faculty create validation Schema
const updateFacultyValidation = z.object({
  body: z.object({
    faculty: z.object({
      id: z.string().optional(),
      designation: z.string().optional(),
      name: updateFacultyNameValidation.optional(),
      gender: z.enum([...facultyGender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum([...facultyBloodGroup] as [string, ...string[]])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const facultyValidations = {
  createFacultyValidation,
  updateFacultyValidation,
};

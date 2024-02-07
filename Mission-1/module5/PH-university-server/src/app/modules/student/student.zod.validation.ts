import { z } from "zod";

// Zod schema for UserName
const UserNameZodSchema = z.object(
  {
    firstName: z
      .string()
      .min(1, { message: "First name is required!" })
      .max(20, { message: "First name must be less than 20 characters" })
      .refine(
        value => {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return firstNameStr === value;
        },
        { message: "First name must be in capitalize format" },
      ),
    middleName: z.string(),
    lastName: z
      .string()
      .min(1, { message: "Last name is required!" })
      .refine(value => /^[A-Za-z]+$/.test(value), {
        message: "Field must contain only alphabetic characters",
      }),
  },
  { required_error: "User Name Must be required" },
);

// Zod schema for Gurdian
const GurdianZodSchema = z.object({
  fatherName: z.string().min(1, { message: "Father name is required!" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father occupation is required!" }),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father contact number is required!" }),
  motherName: z.string().min(1, { message: "Mother name is required!" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother occupation is required!" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother contact number is required!" }),
});

// Zod schema for LocalGurdian
const LocalGurdianZodSchema = z.object(
  {
    name: z.string().min(1, { message: "Local gurdian name is required!" }),
    occupation: z
      .string()
      .min(1, { message: "Local gurdian occupation is required!" }),
    contactNo: z
      .string()
      .min(1, { message: "Local gurdian contact number is required!" }),
    address: z
      .string()
      .min(1, { message: "Local gurdian address is required!" }),
  },
  { required_error: "Local Gudian field must be required" },
);

// Zod schema for Student
const StudentZodSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: "Password must be required!",
      })
      .optional(),
    student: z.object({
      name: UserNameZodSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, { message: "Email is required!" })
        .email({ message: "Invalid email format" }),
      contactNo: z.string().min(1, { message: "Contact number is required!" }),
      emergencyContactNo: z
        .string()
        .min(1, { message: "Emergency contact number is required!" }),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z
        .string()
        .min(1, { message: "Present address is required!" }),
      permanentAddress: z
        .string()
        .min(1, { message: "Permanent address is required!" }),
      gurdian: GurdianZodSchema,
      localGurdian: LocalGurdianZodSchema.required(),
      // profileImg: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});
// Zod schema for UserName
const UpdateUserNameZodSchema = z.object(
  {
    firstName: z
      .string()
      .min(1, { message: "First name is required!" })
      .max(20, { message: "First name must be less than 20 characters" })
      .refine(
        value => {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return firstNameStr === value;
        },
        { message: "First name must be in capitalize format" },
      )
      .optional(),
    middleName: z.string().optional(),
    lastName: z
      .string()
      .min(1, { message: "Last name is required!" })
      .refine(value => /^[A-Za-z]+$/.test(value), {
        message: "Field must contain only alphabetic characters",
      })
      .optional(),
  },
  { required_error: "User Name Must be required" },
);

// Zod schema for Gurdian
const updateGurdianZodSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: "Father name is required!" })
    .optional(),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father occupation is required!" })
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father contact number is required!" }),
  motherName: z
    .string()
    .min(1, { message: "Mother name is required!" })
    .optional(),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother occupation is required!" })
    .optional(),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother contact number is required!" })
    .optional(),
});

// Zod schema for LocalGurdian
const updateLocalGurdianZodSchema = z.object(
  {
    name: z
      .string()
      .min(1, { message: "Local gurdian name is required!" })
      .optional(),
    occupation: z
      .string()
      .min(1, { message: "Local gurdian occupation is required!" })
      .optional(),
    contactNo: z
      .string()
      .min(1, { message: "Local gurdian contact number is required!" })
      .optional(),
    address: z
      .string()
      .min(1, { message: "Local gurdian address is required!" })
      .optional(),
  },
  { required_error: "Local Gudian field must be required" },
);

// Zod schema for Student
const updateStudentZodSchema = z.object({
  body: z.object({
    student: z.object({
      name: UpdateUserNameZodSchema.optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, { message: "Email is required!" })
        .email({ message: "Invalid email format" })
        .optional(),
      contactNo: z
        .string()
        .min(1, { message: "Contact number is required!" })
        .optional(),
      emergencyContactNo: z
        .string()
        .min(1, { message: "Emergency contact number is required!" })
        .optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: "Present address is required!" })
        .optional(),
      permanentAddress: z
        .string()
        .min(1, { message: "Permanent address is required!" })
        .optional(),
      gurdian: updateGurdianZodSchema.optional(),
      localGurdian: updateLocalGurdianZodSchema.required().optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const studentValidationSchema = {
  StudentZodSchema,
  updateStudentZodSchema,
};

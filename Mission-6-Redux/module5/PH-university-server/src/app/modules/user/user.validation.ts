import { z } from "zod";
import { UserStatus } from "./user.constant";

const UserValidationSchema = z.object({
  password: z
    .string({
      required_error: "Password must be String",
    })
    .max(10, "Password cannot more than 20 characters"),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  changeStatusValidationSchema,
};

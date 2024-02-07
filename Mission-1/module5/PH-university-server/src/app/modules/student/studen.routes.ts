// routing handle
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateReq";
import { USER_ROLE } from "../user/user.constant";
import { StudentControllers } from "./student.controller";
import { studentValidationSchema } from "./student.zod.validation";

// create Route from express
const router = express.Router();

// get all std
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.getAllStudent,
);
// get single std
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent,
);
// delete single std
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.deleteSingleStudent,
);
// update single std
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(studentValidationSchema.updateStudentZodSchema),
  StudentControllers.updateStudent,
);

// for app.ts
export const StudentRoutes = router;

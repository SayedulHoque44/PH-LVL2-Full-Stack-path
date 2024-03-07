import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateReq";
import { upload } from "../../utils/sendImageCloudinary";
import { AdminValidations } from "../Admin/admin.validation";
import { facultyValidations } from "../Faculty/faculty.validation";
import { studentValidationSchema } from "../student/student.zod.validation";
import { USER_ROLE } from "./user.constant";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

//
const router = express.Router();

//create student
router.post(
  "/create-student",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidationSchema.StudentZodSchema),
  UserControllers.createStudent,
);
//create faculty
router.post(
  "/create-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facultyValidations.createFacultyValidation),
  UserControllers.createFaculty,
);
// create student
router.post(
  "/create-admin",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);
//
router.get(
  "/me",
  auth(
    USER_ROLE.student,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.superAdmin,
  ),
  UserControllers.getMe,
);

router.post(
  "/change-status/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

export const UserRoutes = router;

import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateReq";
import { USER_ROLE } from "../user/user.constant";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";

const router = express.Router();

router.post(
  "/create-semester-registration",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.get(
  "/:id",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.get(
  "/",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getAllSemesterRegistrations,
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  SemesterRegistrationController.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;

import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateReq";
import { USER_ROLE } from "../user/user.constant";
import { AcademicSemisterControllers } from "./academicSemister.Controllers";
import { AcademicSemisterZodValidation } from "./academicSemister.validation";

const router = express.Router();

// create single academic semister
router.post(
  "/create-academic-semester",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    AcademicSemisterZodValidation.creaetAcademicSemisterValidation,
  ),
  AcademicSemisterControllers.createAcademicSemester,
);
// get all academic semister
router.get(
  "/",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemisterControllers.getAllAcademicSemister,
);
// get academic semister by id
router.get(
  "/:semisterId",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemisterControllers.getAcademicSemisterById,
);
// update academic semister by id
router.patch(
  "/:semisterId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    AcademicSemisterZodValidation.updateAcademicSemisterValidation,
  ),
  AcademicSemisterControllers.updateAcademicSemisterByID,
);

export const AcademicSemisterRoutes = router;

import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateReq";
import { USER_ROLE } from "../user/user.constant";
import { AcadmicDepartmentControllers } from "./academicDepartment.controllers";
import { AcademicDepartmentValidationSchemas } from "./academicDepartment.validaiton";

const router = express.Router();

// createAcademicDepartmentIntoDB
router.post(
  "/create-academic-department",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidationSchemas.createAcademicDepartmentVal,
  ),
  AcadmicDepartmentControllers.createAcademicDepartment,
);
// getAllAcademicDepartmeFromDB
router.get("/", AcadmicDepartmentControllers.getAllAcademicDepartment);
// getAcademicDepartmentById
router.get(
  "/:departmentId",
  AcadmicDepartmentControllers.getAcademicDepartmentById,
);
// updateAcademicDepartmentById
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidationSchemas.updateAcademicDepartmentVal,
  ),
  AcadmicDepartmentControllers.updateAcademicDepartmentById,
);
export const AcademicDepartmentRoutes = router;

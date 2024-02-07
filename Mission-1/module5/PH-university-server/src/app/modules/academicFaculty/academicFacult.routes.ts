import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateReq";
import { USER_ROLE } from "../user/user.constant";
import { academicFacultyControllers } from "./academicFaculty.controllers";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

// create academic-faculty
router.post(
  "/create-academic-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(academicFacultyValidation.createAcademicFacultyValiSchema),
  academicFacultyControllers.createAcademicFaculty,
);
// get all academic-faculty
router.get("/", academicFacultyControllers.getAllAcademicFaculty);
//get academic-faculty by id
router.get("/:facultyId", academicFacultyControllers.getAcademicFacultyById);
// update academic-faculty by id
router.patch(
  "/:facultyId",
  validateRequest(academicFacultyValidation.updateAcademicFacultyValiSchema),
  academicFacultyControllers.updateAcademicFacultyById,
);

export const AcademicFacultysRoutes = router;

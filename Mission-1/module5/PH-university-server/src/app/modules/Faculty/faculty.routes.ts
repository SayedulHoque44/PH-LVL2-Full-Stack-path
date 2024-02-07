import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateReq";
import { USER_ROLE } from "../user/user.constant";
import { facultyControllers } from "./faculty.controllers";
import { facultyValidations } from "./faculty.validation";

//
const router = express.Router();

// get all router
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  facultyControllers.getAllFaculty,
);
//
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  facultyControllers.getSingleFacultyById,
);
//
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(facultyValidations.updateFacultyValidation),
  facultyControllers.updateFaculty,
);
//
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  facultyControllers.deleteFaculty,
);

//
export const facultyRoutes = router;

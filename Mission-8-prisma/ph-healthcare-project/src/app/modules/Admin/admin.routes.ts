import express from "express";
import { adminControllers } from "./admin.controllers";
import validateRequest from "../../middlware/validateRequest";
import { adminValidation } from "./admin.validation";
import auth from "../../middlware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminControllers.getAllAdmin
);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminControllers.getById
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(adminValidation.update),
  adminControllers.updateById
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminControllers.hardDeleteFromDB
);

router.delete(
  "/soft/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminControllers.softDeleteFromDB
);

export const adminRoutes = router;

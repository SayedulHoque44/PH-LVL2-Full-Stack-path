import express from "express";

import { UserRole } from "@prisma/client";
import auth from "../../middlware/auth";
import { MetaController } from "./meta.controllers";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  MetaController.fetchDashboardMetaData
);

export const MetaRoutes = router;

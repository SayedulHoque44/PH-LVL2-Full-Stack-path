import express from "express";

import { UserRole } from "@prisma/client";
import { ScheduleController } from "./schedule.controllers";
import auth from "../../middlware/auth";

const router = express.Router();

// router.get(
//     '/',
//     auth(UserRole.DOCTOR),
//     ScheduleController.getAllFromDB
// );

/**
 * API ENDPOINT: /schedule/:id
 *
 * Get schedule data by id
 */
// router.get(
//     '/:id',
//     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
//     ScheduleController.getByIdFromDB
// );

router.post(
  "/",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.inserIntoDB
);

/**
 * API ENDPOINT: /schdeule/:id
 *
 * Delete schedule data by id
 */

// router.delete(
//     '/:id',
//     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//     ScheduleController.deleteFromDB
// );
router.delete("/", ScheduleController.deleteSchedules);
router.get("/", auth(UserRole.DOCTOR), ScheduleController.getAllFromDB);
export const ScheduleRoutes = router;

import express from "express";

import { UserRole } from "@prisma/client";

import { ReviewValidation } from "./review.validation";
import { ReviewController } from "./review.controllers";
import auth from "../../middlware/auth";
import validateRequest from "../../middlware/validateRequest";

const router = express.Router();

router.get("/", ReviewController.getAllFromDB);

router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(ReviewValidation.create),
  ReviewController.insertIntoDB
);

export const ReviewRoutes = router;

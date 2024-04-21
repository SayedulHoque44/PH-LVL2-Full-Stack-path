import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import ApiError from "../../Errors/ApiError";
import httpStatus from "http-status";
import { jwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config";
import { UserRole } from "@prisma/client";
import auth from "../../middlware/auth";
import multer from "multer";
import path from "path";
import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validation";
import prisma from "../../../shared/prisma";
import validateRequest from "../../middlware/validateRequest";

const router = express.Router();

router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userControllers.createAdmin(req, res, next);
  }
);
//
router.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data));
    return userControllers.createDoctor(req, res, next);
  }
);
//
router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatient.parse(JSON.parse(req.body.data));
    return userControllers.createPatient(req, res, next);
  }
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userControllers.getAllFromDb
);
//
router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  userControllers.getMyProfile
);

router.patch(
  "/:id/status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(userValidation.updateStatus),
  userControllers.changeProfileStatus
);

router.patch(
  "/update-my-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userControllers.updateMyProfile(req, res, next);
  }
);

export const userRoutes = router;

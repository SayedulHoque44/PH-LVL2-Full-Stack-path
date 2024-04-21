import { UserRole } from "@prisma/client";
import express from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { NextFunction, Request, Response } from "express";
import { SpecialtiesValidation } from "./specialties.validations";
import { SpecialtiesController } from "./specialties.controller";
import auth from "../../middlware/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.create.parse(JSON.parse(req.body.data));
    return SpecialtiesController.insertIntoDB(req, res, next);
  }
);

router.get("/", SpecialtiesController.getAllFromDB);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SpecialtiesController.deleteFromDB
);

export const SpecialtiesRoutes = router;

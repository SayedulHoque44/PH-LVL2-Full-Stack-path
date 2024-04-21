import express from "express";
import auth from "../../middlware/auth";
import { paymentControllers } from "./payment.controllers";
const router = express.Router();

router.get("/ipn", paymentControllers.validatePayment);

router.post(
  "/init-payment/:appointmentId",

  paymentControllers.initPayment
);
export const paymentRoutes = router;

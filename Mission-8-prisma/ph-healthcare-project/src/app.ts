import cors from "cors";
import cron from "node-cron";
import express, { Application, Request, Response, NextFunction } from "express";
import { adminRoutes } from "./app/modules/Admin/admin.routes";
import { userRoutes } from "./app/modules/User/user.routes";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlware/globalErrorHandler";
import cookieParser from "cookie-parser";
import { AppointmentService } from "./app/modules/Appointment/appointment.service";

const app: Application = express();
// middleware
app.use(cors());

// parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //

cron.schedule("* * * * *", () => {
  try {
    AppointmentService.cancelUnPaidAppointments();
  } catch (err) {
    console.error(err);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Ph health care server.",
  });
});
//
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/admin", adminRoutes);
// routes middlware
app.use("/api/v1", router);
// next handle those routes error middleware
app.use(globalErrorHandler); // it will execute if router middler execute a next function insted of response.send(must be 4 params)

app.use((req: Request, res: Response, next: NextFunction) => {
  // console.log(req) // more info here
  res.status(httpStatus.NOT_FOUND).json({
    Success: false,
    message: "API NOT FOUND",
    Error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;

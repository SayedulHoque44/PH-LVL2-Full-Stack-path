import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import router from "./app/routes";
const app = express();
// const port = 3000;

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// application routes -->
// jkn url `/api/v1/students` ata req pabe tkn StudentRoutes e cole jabe
app.use("/api/v1/", router);
// app.use("/api/v1/students", StudentRoutes);
// app.use("/api/v1/users", UserRoutes);

const getStartRes = async (req: Request, res: Response) => {
  res.send("Hello World!");
};
app.get("/", getStartRes);

// test route
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.get("/test", (req: Request, res: Response) => {
  Promise.reject();
});

// console.log(process.cwd());

// ErrorHandler
app.use(globalErrorHandler);
// notFound or API crash
app.use(notFoundHandler);
export default app;

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      // user: "e" | "a" | "a";
      user: JwtPayload;
    }
  }
}

import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (payload: any, secrect: Secret, expiresIn: string) => {
  const token = jwt.sign(payload, secrect, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};

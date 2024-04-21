import { UserStatus } from "@prisma/client";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { urlencoded } from "express";
import { jwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config";
import emailSender from "./emailSender";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password Incorret!");
  }

  const accessToken = jwtHelper.generateToken(
    {
      userId: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.generateToken(
    {
      userId: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });
  const accessToken = jwtHelper.generateToken(
    {
      userId: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (
  decodedUser: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // check is valid user
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedUser?.email,
      status: UserStatus.ACTIVE,
    },
  });

  // check password
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password Incorret!");
  }

  // hashPassword
  const hashPassword = await bcrypt.hash(payload.newPassword, 10);

  // change password
  const changedUserPass = await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

//
const forgetPassword = async (email: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetToken = jwtHelper.generateToken(
    { email, role: userData.role },
    config.jwt.reset_pass_secret as string,
    config.jwt.reset_pass_token_expires_in as string
  );

  const resetPassLink = `${config.reset_pass_link}?id=${userData.id}&token=${resetToken}`;

  await emailSender(
    userData.email,
    `
    <div>
        <p>Dear User,</p>
        <p>Your password reset link 
            <a href=${resetPassLink}>
                <button>
                    Reset Password
                </button>
            </a>
        </p>

    </div>
    `
  );

  return null;
};
//
const resetPassword = async (email: string, payload: { password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  const hashPassword = await bcrypt.hash(payload.password, 10);

  await prisma.user.update({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
    data: {
      password: hashPassword,
    },
  });

  return null;
};

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  resetPassword,
  forgetPassword,
};

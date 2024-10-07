"use client";
import { getUserInfo, removeUser } from "@/service/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export type IUserAuthDecodedData =
  | {
      userId: string;
      role: string;
      email: string;
      iat: number;
      exp: number;
    }
  | undefined
  | null;

const AuthButton = () => {
  const userInfo: IUserAuthDecodedData = getUserInfo();
  const router = useRouter();
  //   console.log(userInfo);
  const handleLogout = () => {
    removeUser();
    router.refresh();
  };
  return (
    <>
      {userInfo?.userId ? (
        <Button onClick={handleLogout} color="error">
          Logout
        </Button>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;

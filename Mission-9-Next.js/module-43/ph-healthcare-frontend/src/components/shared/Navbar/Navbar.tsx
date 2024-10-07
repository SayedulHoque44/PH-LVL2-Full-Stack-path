"use server";

import { loginUser } from "@/service/actions/loginUser";
import { getUserInfo, removeUser } from "@/service/auth.service";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = () => {
  const AuthButtonWithLazyLoading = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );
  return (
    <Container>
      <Stack
        py={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5" component={Link} href={"/"} fontWeight={600}>
          P
          <Box component={"span"} color={"primary.main"}>
            H
          </Box>{" "}
          Health Care
        </Typography>
        {/* menu */}
        <Stack direction={"row"} justifyContent={"space-between"} gap={4}>
          <Typography component={Link} href={"/consultation"}>
            Consultation
          </Typography>
          <Typography component={Link} href={"/consultation"}>
            Health Plans
          </Typography>
          <Typography component={Link} href={"/consultation"}>
            Medicine
          </Typography>
          <Typography component={Link} href={"/consultation"}>
            Diagonstics
          </Typography>
          <Typography component={Link} href={"/consultation"}>
            NGOs
          </Typography>
        </Stack>
        <AuthButtonWithLazyLoading />
      </Stack>
    </Container>
  );
};

export default Navbar;

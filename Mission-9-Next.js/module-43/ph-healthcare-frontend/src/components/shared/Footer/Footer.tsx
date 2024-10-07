import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import facebookIcon from "@/assets/landing_page/facebook.png";
import Image from "next/image";

const Footer = () => {
  return (
    <Box bgcolor={"rgb(17,26,34)"} py={5}>
      <Container>
        <Stack direction={"row"} justifyContent={"center"} gap={4}>
          <Typography color={"#fff"} component={Link} href={"/consultation"}>
            Consultation
          </Typography>
          <Typography color={"#fff"} component={Link} href={"/consultation"}>
            Health Plans
          </Typography>
          <Typography color={"#fff"} component={Link} href={"/consultation"}>
            Medicine
          </Typography>
          <Typography color={"#fff"} component={Link} href={"/consultation"}>
            Diagonstics
          </Typography>
          <Typography color={"#fff"} component={Link} href={"/consultation"}>
            NGOs
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={2} justifyContent={"center"} py={2}>
          <Image width={30} height={30} src={facebookIcon} alt="facebook" />
          <Image width={30} height={30} src={facebookIcon} alt="facebook" />
          <Image width={30} height={30} src={facebookIcon} alt="facebook" />
          <Image width={30} height={30} src={facebookIcon} alt="facebook" />
        </Stack>

        <div className="border-b-[1px] border-dashed"></div>
        <Stack
          direction={"row"}
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}
          py={2}
        >
          <Typography component="p" color={"white"}>
            &copy;2024 ph healthCare. All RIght Reserved.
          </Typography>
          <Typography
            variant="h5"
            component={Link}
            href={"/"}
            fontWeight={600}
            color={"white"}
          >
            P
            <Box component={"span"} color={"primary.main"}>
              H
            </Box>{" "}
            Health Care
          </Typography>
          <Typography component="p" color={"white"}>
            Privacy Policy
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Specialist = async () => {
  const res = await fetch("http://localhost:5000/api/v1/specialties", {
    next: {
      revalidate: 30,
    },
  });
  const { data: specialties } = await res.json();
  //   console.log(specialties);
  return (
    <Container>
      <Box
        sx={{
          margin: "40px 0px",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "start",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Explore Treatments Across Specialites
          </Typography>
          <Typography component={"p"} fontWeight={300} fontSize={18}>
            Experience Doctors Accross All Specialities
          </Typography>
          <Stack direction={"row"} gap={4} mt={5}>
            {specialties.map((Speciality: any) => (
              <Box
                key={Speciality.id}
                sx={{
                  flex: 1,
                  width: "150px",
                  backgroundColor: "rgba(245,245,245,1)",
                  border: "1px solid rgba(250,250,250,1)",
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "24px 10px",
                  "& img": {
                    width: "50px",
                    height: "50px",
                    mx: "auto",
                  },
                  "&:hover": {
                    border: "1px solid #1586FD",
                  },
                }}
              >
                <Image
                  src={Speciality.icon}
                  alt="specility"
                  height={100}
                  width={100}
                />
                <Box>
                  <Typography
                    component={"p"}
                    fontSize={18}
                    fontWeight={600}
                    mt={2}
                  >
                    {Speciality.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
          <Button
            variant="outlined"
            sx={{ display: "block", mx: "auto", mt: 2 }}
          >
            View All
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Specialist;

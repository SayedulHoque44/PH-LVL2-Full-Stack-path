import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        direction: "row",
        my: 16,
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            top: "-90px",
            left: "-120px",
          }}
        >
          <Image src={assets.svgs.grid} alt="grid" />
        </Box>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Healthier Hearts
        </Typography>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Come Form
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          color={"primary.main"}
          fontWeight={600}
        >
          Preventive Care
        </Typography>

        <Typography
          variant="h6"
          component="p"
          fontWeight={400}
          sx={{
            my: "20px",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          perspiciatis illum ut odio sit labore ipsum rem, incidunt assumenda
          eveniet porro iste
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button>Make Appointment</Button>
          <Button variant="outlined">Contact Us</Button>
        </Box>
      </Box>
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "200px",
            top: "-30px",
          }}
        >
          <Image src={assets.svgs.arrow} alt="arrow" width={100} height={100} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Box mt={4}>
            <Image
              src={assets.images.doctor1}
              alt="doc1"
              width={240}
              height={380}
            />
          </Box>
          <Box>
            <Image
              src={assets.images.doctor2}
              alt="doc2"
              width={240}
              height={350}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "220px",
              left: "200px",
            }}
          >
            <Image
              src={assets.images.doctor3}
              alt="doc3"
              height={240}
              width={240}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "-50px",
              right: 0,
              zIndex: "-1",
            }}
          >
            <Image
              src={assets.images.stethoscope}
              alt="doc3"
              height={180}
              width={180}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;

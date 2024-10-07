import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";

const TopRatedDoctors = async () => {
  const res = await fetch(
    "http://localhost:5000/api/v1/doctor?page=1&limit=3",
    {
      cache: "no-store",
    }
  );
  const { data: doctors } = await res.json();
  // console.log(doctors);
  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20,20,20,0.1)",
        clipPath: "polygon(0 0,100% 25%,100% 100%,0 75%)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" component={"h1"} fontWeight={600}>
          Our Top Rated Doctors
        </Typography>
        <Typography component={"p"} fontWeight={300} fontSize={18} mt={2}>
          Access to expert physicians and surgeons, advanced technologies
        </Typography>
        <Typography component={"p"} fontWeight={300} fontSize={18}>
          and top-quality surgery facilites right here.
        </Typography>
      </Box>

      <Container sx={{ margin: "30px auto" }}>
        <Grid container spacing={2}>
          {doctors.map((doctor: any) => (
            <Grid item key={doctor.id} md={4}>
              <Card>
                <Box>
                  <Image
                    src={doctor.profilePhoto}
                    alt="doctor"
                    height={100}
                    width={500}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.qualification}, {doctor.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <PlaceIcon /> {doctor.address}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", mb: 1 }}>
                  <Button>Book Now</Button>
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;

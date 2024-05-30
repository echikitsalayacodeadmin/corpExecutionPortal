import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import BANNERIMG from "../../src/assets/images/banner2.jpg";
import UNOCARELOGO from "/unocare-logo.png";
import LoginCorp from "../corpexecutionportal/pages/loginCorp";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LandingIndex = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log({ navigate, location });
  const [accessToken, setAccessToken] = useState(false);

  const _accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("AUTHHEADER_CORP_EXECUTION")
      : null;

  useEffect(() => {
    setAccessToken(_accessToken ? true : false);
  }, [_accessToken]);

  useEffect(() => {
    if (accessToken) {
      const currentRoute = location.pathname;
      if (
        currentRoute === "/" &&
        localStorage.getItem("AUTHHEADER_CORP_EXECUTION")
      ) {
        navigate("/corp/home");
      }
    }
  }, [accessToken, navigate]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          minHeight: "86vh",
          display: "flex",
          alignItems: "center",
          border: 1,
          py: 5,
          px: { lg: 5, xs: 1 },
          borderRadius: 2,
          borderColor: "lightblue",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid
            item
            lg={6}
            xs={12}
            display="flex"
            justifyContent={{ lg: "flex-start", xs: "center" }}
          >
            <Box
              component="img"
              sx={{
                height: { lg: 100, xs: 100 },
                width: { lg: 400, xs: 300 },
              }}
              alt="UNOCARE LOGO"
              src={UNOCARELOGO}
            />
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
            display="flex"
            justifyContent={{ lg: "flex-end", xs: "center" }}
          ></Grid>
          <Grid item lg={7}>
            <Box
              sx={{
                display: { lg: "flex", xs: "none" },
                height: "61vh",
                backgroundImage: `url(${BANNERIMG})`,
                borderRadius: 2,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid container>
                <Grid item lg={8}>
                  <Box sx={{ px: 2, py: 10 }}>
                    <Typography variant="h3" color="#127DDD">
                      Join The Healthcare Revolution
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={5}>
            <Grid container spacing={5}>
              <Grid item lg={12}>
                <LoginCorp />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LandingIndex;

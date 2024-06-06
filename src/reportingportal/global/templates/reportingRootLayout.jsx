import { Container, ThemeProvider, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import TopNavbar from "../topNavbars/topNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import ReportingCustomTheme from "../theme/reportingCustomTheme";
import LandingIndex from "../../../landing/landingIndex";

const ReportingRootLayout = ({
  children,
  authHeader_reporting = localStorage.getItem("AUTHHEADER_REPORTING"),
}) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  console.log({ matches });

  let navigate = useNavigate();

  if (!authHeader_reporting) {
    return (
      <Fragment>
        <ThemeProvider theme={ReportingCustomTheme}>
          <TopNavbar />
          <Container sx={{ mt: 10 }} maxWidth={false} disableGutters={matches}>
            {/* <Outlet /> */}
          </Container>
          <Container maxWidth={false} disableGutters={matches}>
            <LandingIndex />
          </Container>
        </ThemeProvider>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <ThemeProvider theme={ReportingCustomTheme}>
        <TopNavbar />
        <Container sx={{ mt: 10 }} maxWidth={false} disableGutters={!matches}>
          <Outlet />
        </Container>
        <Container maxWidth={false} disableGutters={!matches}>
          {children}
        </Container>
      </ThemeProvider>
    </Fragment>
  );
};

export default ReportingRootLayout;

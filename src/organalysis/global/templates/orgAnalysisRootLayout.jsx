import { Container, ThemeProvider, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import TopNavbar from "../topNavbars/topNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import OrgAnalysisCustomTheme from "../theme/orgAnalysisCustomTheme";
import LandingIndex from "../../../landing/landingIndex";

const OrgAnalysisRootLayout = ({
  children,
  authHeader_orgAnalysis = localStorage.getItem("AUTHHEADER_ORG_ANALYSIS"),
}) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  console.log({ matches });

  let navigate = useNavigate();

  if (!authHeader_orgAnalysis) {
    return (
      <Fragment>
        <ThemeProvider theme={OrgAnalysisCustomTheme}>
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
      <ThemeProvider theme={OrgAnalysisCustomTheme}>
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

export default OrgAnalysisRootLayout;

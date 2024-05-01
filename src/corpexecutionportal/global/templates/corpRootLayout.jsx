import { Container, ThemeProvider, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import TopNavbar from "../topNavbars/topNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import LandingIndex from "../../../landing/landingIndex";
import CorpCustomTheme from "../theme/corpCustomTheme";

const CorpRootLayout = ({
  children,
  authHeader_corp = localStorage.getItem("AUTHHEADER_CORP_EXECUTION"),
}) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  let navigate = useNavigate();

  if (!authHeader_corp) {
    return (
      <Fragment>
        <ThemeProvider theme={CorpCustomTheme}>
          <TopNavbar />
          <Container sx={{ mt: 10 }} maxWidth={false} disableGutters={!matches}>
            {/* <Outlet /> */}
          </Container>
          <Container maxWidth={false} disableGutters={!matches}>
            <LandingIndex />
          </Container>
        </ThemeProvider>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <ThemeProvider theme={CorpCustomTheme}>
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

export default CorpRootLayout;

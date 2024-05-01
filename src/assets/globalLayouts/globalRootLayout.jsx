import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import GlobalTopNavbars from "../globalTopNavbars/globalTopNavbars";

const GlobalRootLayout = ({ children }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <Fragment>
      <GlobalTopNavbars />
      <Container
        sx={{ mt: { lg: 10, xs: 8 } }}
        maxWidth={false}
        disableGutters={!matches}
      >
        <Outlet />
      </Container>
      <Container maxWidth={false} disableGutters={!matches}>
        {children}
      </Container>
    </Fragment>
  );
};

export default GlobalRootLayout;

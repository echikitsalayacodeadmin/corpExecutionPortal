import { Container } from "@mui/material";
import { Fragment } from "react";
import TopNavbar from "../topNavbars/topNavbar";
import { Outlet } from "react-router-dom";

const CorpAuthLayout = ({ children }) => {
  return (
    <Fragment>
      <TopNavbar />
      <Container sx={{ mt: 10 }} maxWidth={false}>
        <Outlet />
      </Container>
      <Container maxWidth={false}>{children}</Container>
    </Fragment>
  );
};

export default CorpAuthLayout;

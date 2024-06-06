import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Fragment, useState } from "react";
import TopNavbar from "../topNavbars/topNavbar";
import { Outlet } from "react-router-dom";
import { CorpNameContext } from "../context/context";

const ReportingAuthLayout = ({ children }) => {
  const [corpName, setCorpName] = useState(
    localStorage.getItem("CORP_NAME_REPORTING")
  );
  const [corpId, setCorpId] = useState(
    localStorage.getItem("CORP_ID_REPORTING")
  );

  const updateCorpName = (newCorpName) => {
    setCorpName(newCorpName);
  };
  const updateCorpId = (newCorpId) => {
    setCorpId(newCorpId);
  };

  const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  console.log({ matchesAuth: !matches });

  return (
    <CorpNameContext.Provider
      value={{ corpName, updateCorpName, corpId, updateCorpId }}
    >
      <TopNavbar />
      <Container maxWidth={false} disableGutters={matches} sx={{ mt: 10 }}>
        <Outlet />
      </Container>
      <Container maxWidth={false} disableGutters={matches}>
        {children}
      </Container>
    </CorpNameContext.Provider>
  );
};

export default ReportingAuthLayout;

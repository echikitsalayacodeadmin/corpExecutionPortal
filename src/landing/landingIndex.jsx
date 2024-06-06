import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import BANNERIMG from "../../src/assets/images/banner2.jpg";
import UNOCARELOGO from "/unocare-logo.png";
import LoginCorp from "../corpexecutionportal/pages/loginCorp";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LandingIndexDynamic from "./landingIndexDynamic";
import LoginIndex from "../corpexecutionportal/modules/login/loginIndex";

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
    <Fragment>
      <LandingIndexDynamic>
        <LoginIndex />
      </LandingIndexDynamic>
    </Fragment>
  );
};

export default LandingIndex;

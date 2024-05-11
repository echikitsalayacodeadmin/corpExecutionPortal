import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { authenticateUser } from "../../services/loginservices";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import CustomButtonWhite from "../../../assets/customButtonWhite";
import LoginWithMobile from "./subComp/loginWithMobile";
import LoginWithUserName from "./subComp/loginWithUserName";

const LoginIndex = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isMobileLogin, setIsMobileLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleToggleLogin = () => {
    setIsMobileLogin(!isMobileLogin);
    setUserName("");
    setPassword("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: userName?.trim(),
      password: isMobileLogin ? otp : password,
      role: "CORPSALES_ADMIN",
      portal: "CORP_SALES",
    };
    authenticateUser(payload, navigate, enqueueSnackbar);
  };

  return (
    <Fragment>
      {isMobileLogin ? <LoginWithMobile /> : <LoginWithUserName />}
      <Box display="flex" justifyContent="center" mt={2}>
        <CustomButtonBlue
          onClick={handleToggleLogin}
          title={isMobileLogin ? "Login with Username" : "Login with Mobile"}
        />
      </Box>
    </Fragment>
  );
};

export default LoginIndex;

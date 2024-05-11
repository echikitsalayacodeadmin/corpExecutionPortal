import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from "@mui/material";
import {
  authenticateMobileUser,
  sendOTP,
} from "../../../services/loginservices";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomButtonWhite from "../../../../assets/customButtonWhite";

const LoginWithMobile = ({ setIsMobileLogin, isMobileLogin }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const payload = {
      username: mobileNumber,
      role: "CORPSALES_ADMIN",
      portal: "CORP_SALES",
    };
    sendOTP(payload, enqueueSnackbar, setOtpSent);
    setOtpSentTime(Date.now());
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      username: mobileNumber,
      password: otp,
      role: "CORPSALES_ADMIN",
      portal: "CORP_SALES",
    };
    authenticateMobileUser(payload, navigate, enqueueSnackbar);
  };
  return (
    <Fragment>
      <Box>
        <Card
          sx={{
            px: { lg: 10, xs: 1 },
            // minHeight: { lg: "60.5vh", xs: "40vh" },
          }}
          elevation={0}
        >
          <CardHeader
            // sx={{ mb: { lg: 20, xs: 1 } }}
            title="Login to Corp Execution Portal"
            titleTypographyProps={{
              color: "rgb(0, 0, 255)",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <CardContent>
            <form onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField
                  placeholder={"Mobile Number"}
                  required
                  value={mobileNumber}
                  onChange={(e) => {
                    if (!isNaN(e.target.value) && e.target.value.length < 11) {
                      setMobileNumber(e.target.value.replace(/\s/g, ""));
                    }
                  }}
                  size="small"
                  sx={{
                    fieldset: { border: "none ! important" },
                    input: {
                      background:
                        "linear-gradient(to right, rgb(240, 240, 240), rgb(120, 190, 255))",
                      borderRadius: 2,
                    },
                  }}
                />
                <Box display="flex" justifyContent="space-between">
                  <CustomButtonWhite
                    styles={{ width: "45%" }}
                    title={`Resend `}
                  />

                  <CustomButtonBlue
                    onClick={handleSendOTP}
                    styles={{ width: "45%" }}
                    title="Send OTP"
                  />
                </Box>

                <TextField
                  placeholder="OTP"
                  required
                  value={otp}
                  onChange={(e) => {
                    const inputVal = e.target.value.replace(/\D/g, "");
                    if (inputVal.length <= 6) {
                      setOtp(inputVal);
                    }
                  }}
                  size="small"
                  inputProps={{ maxLength: 6 }}
                  sx={{
                    fieldset: { border: "none ! important" },
                    input: {
                      background:
                        "linear-gradient(to right, rgb(240, 240, 240), rgb(120, 190, 255))",
                      borderRadius: 2,
                    },
                  }}
                />

                <Box display="flex" justifyContent="center" sx={{ px: 10 }}>
                  <Button fullWidth variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
};

export default LoginWithMobile;

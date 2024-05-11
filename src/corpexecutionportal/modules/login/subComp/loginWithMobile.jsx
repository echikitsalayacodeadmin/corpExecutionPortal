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
import { authenticateUser } from "../../../services/loginservices";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomButtonWhite from "../../../../assets/customButtonWhite";

const LoginWithMobile = ({ setIsMobileLogin, isMobileLogin }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const handleSendOTP = () => {
    // Logic to send OTP
    // Set otpSent to true and set otpSentTime to current time
    setOtpSent(true);
    setOtpSentTime(Date.now());
  };

  const handleResendOTP = () => {
    // Logic to resend OTP
    // Set otpSent to true and set otpSentTime to current time
    setOtpSent(true);
    setOtpSentTime(Date.now());
  };

  const calculateRemainingTime = () => {
    if (!otpSent) return 0; // Return 0 if OTP is not sent
    const currentTime = Date.now();
    const elapsedTime = currentTime - otpSentTime;
    const remainingTime = 60 * 1000 - elapsedTime; // 60 seconds in milliseconds
    return remainingTime < 0 ? 0 : remainingTime; // Ensure remaining time is not negative
  };

  const handleFormSubmit = () => {};
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
            <form onSubmit={handleFormSubmit}>
              <Stack spacing={2}>
                <TextField
                  placeholder={"Mobile Number"}
                  label={"Mobile Number"}
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
                    disabled={!otpSent || calculateRemainingTime() > 0} // Enable if OTP is sent and remaining time is 0
                    onClick={handleResendOTP} // Function to resend OTP
                    styles={{ width: "45%" }}
                    title={`Resend ${
                      calculateRemainingTime() > 0
                        ? `(${Math.ceil(calculateRemainingTime() / 1000)}s)`
                        : ""
                    }`}
                  />

                  <CustomButtonBlue
                    disabled={mobileNumber.length !== 10} // Disable if mobile number is not 10 digits long
                    onClick={handleSendOTP} // Function to send OTP
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

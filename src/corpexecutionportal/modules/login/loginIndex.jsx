import React, { useEffect, useState } from "react";
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

const LoginIndex = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isPassword, setIsPassword] = useState(true);
  const [isMobileLogin, setIsMobileLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleToggleLogin = () => {
    setIsMobileLogin(!isMobileLogin);
    setUserName("");
    setPassword("");
    setMobileNumber("");
    setOtp("");
    setOtpSentTime(null);
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

  return (
    <Box>
      <Card
        sx={{ px: { lg: 10, xs: 1 }, minHeight: { lg: "60.5vh", xs: "40vh" } }}
        elevation={0}
      >
        <CardHeader
          sx={{ mb: { lg: 20, xs: 1 } }}
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
                placeholder={isMobileLogin ? "Mobile Number" : "User Name"}
                required
                value={isMobileLogin ? mobileNumber : userName}
                onChange={(e) =>
                  isMobileLogin
                    ? /^[0-9]{0,10}$/.test(e.target.value.replace(/\s/g, ""))
                      ? setMobileNumber(e.target.value.replace(/\s/g, ""))
                      : null
                    : setUserName(e.target.value)
                }
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
              {isMobileLogin && (
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
              )}
              {isMobileLogin ? (
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
              ) : (
                <FormControl
                  size="small"
                  sx={{
                    background:
                      "linear-gradient(to right, rgb(240, 240, 240), rgb(120, 190, 255))",
                    borderRadius: 2,
                    fieldset: { border: "none ! important" },
                  }}
                  variant="outlined"
                >
                  <OutlinedInput
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    type={isPassword ? "password" : "text"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setIsPassword(!isPassword)}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {isPassword ? (
                            <VisibilityOff sx={{ color: "red" }} />
                          ) : (
                            <Visibility sx={{ color: "red" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}
              <Box display="flex" justifyContent="center" sx={{ px: 10 }}>
                <Button fullWidth variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </Stack>
          </form>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button onClick={handleToggleLogin} variant="text">
              {isMobileLogin ? "Login with Username" : "Login with Mobile"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginIndex;

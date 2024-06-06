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

const LoginWithUserName = ({ setIsMobileLogin, isMobileLogin }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isPassword, setIsPassword] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
            title="Login to Sales & OPS"
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
                  placeholder={"User Name"}
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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

export default LoginWithUserName;

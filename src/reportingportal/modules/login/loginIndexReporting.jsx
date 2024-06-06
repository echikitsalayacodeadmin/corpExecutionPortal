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
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../services/loginservices";

const LoginIndexReporting = () => {
  let navigate = useNavigate();

  const [isPassword, setIsPassword] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const _fetchUser = async (e) => {
    e.preventDefault();
    const payload = {
      username: userName?.trim(),
      password: password,
      portal: "REPORTING",
    };
    authenticateUser(navigate, payload);
  };
  return (
    <Box>
      <Card
        sx={{ px: { lg: 1, xs: 1 }, minHeight: { lg: "45vh", xs: "40vh" } }}
        elevation={0}
      >
        <CardHeader
          sx={{ mb: { lg: 5, xs: 1 } }}
          title="Login to Reporting Portal"
          titleTypographyProps={{
            color: "rgb(0, 0, 255)",
            display: "flex",
            justifyContent: "center",
          }}
        />

        <CardContent>
          <form onSubmit={_fetchUser}>
            <Stack spacing={2}>
              <TextField
                placeholder="User Name"
                //label="Username"
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
                inputProps={{ style: { color: "red" } }}
              />

              <FormControl
                size="small"
                sx={{
                  background:
                    "linear-gradient(to right, rgb(240, 240, 240), rgb(120, 190, 255))",
                  borderRadius: 2,
                  fieldset: {
                    border: "none ! important",
                  },
                  input: {
                    color: "red ! important",
                  },
                }}
                variant="outlined"
              >
                <OutlinedInput
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  type={isPassword ? "password" : "text"}
                  id="campPassword"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setIsPassword(!isPassword)}
                        onMouseDown={(event) => {
                          event.preventDefault();
                        }}
                        edge="end"
                      >
                        {!isPassword ? (
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
  );
};

export default LoginIndexReporting;

import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeyIcon from "@mui/icons-material/Key";
import { BASE_URL } from "../../../../../assets/constants";
import { saveData } from "../../../../assets/corpServices";

const ChangePassword = (props) => {
  const [editPassword, setEditPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationFailed, setValidationFailed] = useState(false);

  const saveNewPassword = (e) => {
    let isValidated = false;
    if (password && confirmPassword && password === confirmPassword) {
      setValidationFailed(false);
      isValidated = true;
    } else {
      setValidationFailed(true);
      isValidated = false;
    }
    if (isValidated) {
      const data = {
        username: props.userName,
        newPassword: password,
      };
      updatePassword(data);
    }
  };

  const updatePassword = async (data) => {
    console.log({ data });
    const url = BASE_URL + "clinic/resetDoctorPassword";
    const password = await saveData(url, data);

    if (password.error) {
      console.log(password.error);
    } else {
      setEditPassword(false);
      console.log(password.data);
    }
  };

  return (
    <Box>
      {!editPassword ? (
        <Grid container spacing={2}>
          <Grid item lg={1} xs={12} display="flex" alignItems="center">
            <KeyIcon fontSize="small" />
          </Grid>
          <Grid item lg={5} xs={12}>
            <TextField
              disabled
              type="password"
              size={"small"}
              fullWidth
              label="Password:"
              variant="outlined"
              value="xxxxxxxxxx"
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Button onClick={(e) => setEditPassword(true)}>Change</Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item lg={10} xs={12}>
            <TextField
              autoComplete="new-password"
              error={validationFailed && !password}
              name="newPassword"
              size={"small"}
              fullWidth
              label="New Password*:"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password || ""}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              helperText={
                validationFailed && !password
                  ? "password can not be empty."
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      onMouseDown={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg={2} xs={12}></Grid>
          <Grid item lg={10} xs={12}>
            <TextField
              error={
                (validationFailed && !confirmPassword) ||
                (validationFailed && confirmPassword !== password)
              }
              type="password"
              name="confirmPassword"
              size={"small"}
              fullWidth
              label="Confirm New Password*:"
              variant="outlined"
              value={confirmPassword || ""}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              helperText={
                validationFailed && !confirmPassword
                  ? "Confirm password can not be empty."
                  : validationFailed && confirmPassword !== password
                  ? "password and confirm password must be same."
                  : ""
              }
            />
          </Grid>
          <Grid item lg={2} xs={12}></Grid>
          <Grid item lg={10} xs={12}>
            <Button onClick={(e) => saveNewPassword()}>Save</Button>
          </Grid>
          <Grid item lg={2} xs={12}></Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ChangePassword;

import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { Fragment } from "react";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import BranchForDoc from "../registration/registrationFormElements/branchForDoc";
import { BASE_URL, BASE_URL_AUTH } from "../../../../../assets/constants";
import { saveData } from "../../../../assets/corpServices";
import { genderList } from "../../../../../assets/utils";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DoctorSignUpForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const [openNotice, setOpenNotice] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");

  const handleClickNotice = () => {
    setOpenNotice(true);
  };

  const handleCloseNotice = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotice(false);
  };

  const [validationFailed, setValidationFailed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("MALE");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branchId, setBranchId] = useState("");
  const [specialization, setSpecialization] = useState("");

  const submitHandlerDR = (event) => {
    event.preventDefault();

    let isValidated = false;
    const formValues = {
      password: password,
      firstName: firstName,
      lastName: lastName,
      confirmPassword: confirmPassword,
      gender: gender,
      email: email,
      mobile: mobile,
      branchId: branchId,
      specialization: specialization,
    };
    isValidated = [formValues].some(validateFields);
    console.log({ isValidated: isValidated });

    if (!isValidated) {
      setValidationFailed(false);
      const doctorObj = {
        password: password,
        firstName: firstName,
        lastName: lastName,
        //dateOfBirth: "",
        gender: gender,
        //age: 44,
        email: email,
        mobile: mobile,
        role: "DOCTOR",
        specialization: specialization,
      };
      console.log({ dcotor_registration_formValues: doctorObj });

      saveDoctor(doctorObj);
    } else {
      setValidationFailed(true);
    }
  };

  const saveDoctor = async (obj) => {
    //saveData

    const url = BASE_URL_AUTH + "register";

    const regDoctor = await saveData(url, obj, "");

    if (regDoctor.error) {
      console.log(regDoctor.error);
      setSeverity("error");
      setMessage("your registration failed!");
      setOpenNotice(true);
    } else {
      setSeverity("success");
      setMessage("You have registred successfully");
      setOpenNotice(true);
      const userId = await regDoctor.data.userId;
      goToDcotorDetailedRegistration(userId);
      console.log(regDoctor.data);
      console.log(userId);
      assignBranch(regDoctor.data.userId);
    }
  };

  const validateFields = (data) => {
    let validate = 0;
    data.branchId &&
    data.firstName &&
    data.lastName &&
    data.email &&
    data.mobile &&
    data.password &&
    data.confirmPassword &&
    data.password === data.confirmPassword
      ? (validate = 1)
      : (validate = 0);
    return validate === 0;
  };

  const goToDcotorDetailedRegistration = (data) => {
    localStorage.setItem("DOCDATA_NEW", data);
    navigate("/doctorDetails");
    // props.onClickAction("FILLDETAILS");
    console.log({ data: data });
  };

  const goBackHandler = () => {
    props.onClickAction("BACK");
  };

  const assignBranch = async (docId) => {
    const obj = {
      docId: docId,
      branchId: branchId,
    };
    const url = BASE_URL + "clinic/onboard";

    const connectDoctorToBranch = await saveData(url, obj, "");

    if (connectDoctorToBranch.error) {
      console.log("error connecting branch");
    } else {
      console.log("success connecting branch");
    }
  };
  console.log({ branchId: branchId });

  return (
    <Fragment>
      <Snackbar
        open={openNotice}
        autoHideDuration={3000}
        onClose={handleCloseNotice}
      >
        <Alert
          onClose={handleCloseNotice}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Box
            sx={{ p: 3 }}
            component={Stack}
            direction="row"
            justifyContent={"center"}
          >
            <Typography variant="h6">Doctor On-Boarding Form</Typography>
          </Box>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Box
            sx={{
              background: "#fff",
              minHeight: "63vh",
              borderRadius: 2,
              pl: 20,
              pr: 20,
              pb: 2,
              pt: 3,
            }}
          >
            <form id="patientData" onSubmit={submitHandlerDR}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container columnSpacing={2} rowSpacing={3}>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <TextField
                      error={validationFailed && !firstName}
                      hiddenLabel
                      name="firstName"
                      size={"small"}
                      fullWidth
                      label="First Name*:"
                      variant="outlined"
                      value={firstName || ""}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      helperText={
                        validationFailed && !firstName
                          ? "first name can not be empty."
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <TextField
                      error={validationFailed && !lastName}
                      name="lastName"
                      size={"small"}
                      fullWidth
                      label="Last Name*:"
                      variant="outlined"
                      value={lastName || ""}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      helperText={
                        validationFailed && !lastName
                          ? "last name can not be empty."
                          : ""
                      }
                    />
                  </Grid>

                  <Grid item lg={2} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      size={"small"}
                      select
                      label="Gender"
                      name="gender"
                      value={gender || ""}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      SelectProps={{
                        native: true,
                      }}
                      helperText=""
                    >
                      {genderList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12} xs={12}>
                    <TextField
                      error={validationFailed && !mobile}
                      fullWidth
                      name="mobile"
                      size={"small"}
                      label="Phone Number*:"
                      variant="outlined"
                      value={mobile || ""}
                      onChange={(e) => {
                        if (
                          !isNaN(e.target.value) &&
                          e.target.value < 10000000000 &&
                          e.target.value.length < 11
                        )
                          setMobile(e.target.value);

                        console.log(e.target.value.length);
                      }}
                      helperText={
                        validationFailed && !mobile
                          ? "phone number can not be empty."
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <TextField
                      error={validationFailed && !email}
                      name="email"
                      size={"small"}
                      fullWidth
                      label="Email ID*:"
                      variant="outlined"
                      value={email || ""}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      helperText={
                        validationFailed && !email
                          ? "email id can not be empty."
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <BranchForDoc
                      branchId={branchId}
                      setBranchId={setBranchId}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12} md={12} sm={12}>
                    <TextField
                      name="specialization"
                      size={"small"}
                      fullWidth
                      label="Doctor's Specialization*:"
                      variant="outlined"
                      value={specialization || ""}
                      onChange={(e) => {
                        setSpecialization(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      autoComplete="new-password"
                      error={validationFailed && !password}
                      name="password"
                      size={"small"}
                      fullWidth
                      label="Password*:"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      value={password || ""}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      helperText={
                        validationFailed && !password
                          ? "password name can not be empty."
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      error={
                        (validationFailed && !confirmPassword) ||
                        (validationFailed && confirmPassword !== password)
                      }
                      type="password"
                      name="confirmPassword"
                      size={"small"}
                      fullWidth
                      label="Confirm Password*:"
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
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item lg={12} xs={12}>
          <Box
            sx={{ minHeight: "5vh", p: 2, background: "#fff" }}
            component={Stack}
            direction="row"
            spacing={2}
            justifyContent={"center"}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ color: "white" }}
              onClick={goBackHandler}
            >
              Back
            </Button>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              form="patientData"
              sx={{ color: "white" }}
            >
              Submit Application
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DoctorSignUpForm;

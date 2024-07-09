import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadProfilePhoto from "./uploadProfilePhoto";
import UploadSignature from "./uploadSignature";
import { getData, updateData } from "../../../../assets/corpServices";
import { BASE_URL } from "../../../../../assets/constants";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/lab";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const NewDocForm = (props) => {
  let navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    dateOfBirth: "",
    age: "",
    aboutMe: "",
    imageURL: "",

    //specialization: "",
    fees: "",
    degree: "",
    department: "",
    experience: "",
    unit: "",
    languages: "",
    workingTime: "",
    rmpNo: "",
    signatureURL: "",
  });

  let handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const submitHandlerPR = (event) => {
    event.preventDefault();

    const doctorObj = {
      docId: localStorage.getItem("DOCDATA_NEW"),
      //firstName: formValues.firstName,
      //lastName: formValues.lastName,
      //middleName: formValues.middleName,
      dateOfBirth: formValues.dateOfBirth,
      //gender: "MALE",
      //email: formValues.email,
      //mobile: formValues.mobile,
      age: formValues.age,
      //specialization: formValues.specialization,
      fees: formValues.fees,
      degree: formValues.degree,
      department: formValues.department,
      experience: formValues.experience,
      unit: formValues.unit,
      languages: formValues.languages,
      workingTime: formValues.workingTime,
      //imageURL: formValues.imageURL,
      aboutMe: formValues.aboutMe,
      //fullName: formValues.fullName,
      rmpNo: formValues.rmpNo,
      //signatureURL: formValues.signatureURL,
    };
    console.log({ dcotor_registration_formValues: doctorObj });
    saveDoctor(doctorObj);
  };

  const saveDoctor = async (obj) => {
    //saveData

    const regDoctor = await updateData(BASE_URL + "doctor", obj, "");

    if (regDoctor.error) {
      console.log(regDoctor.error);
    } else {
      console.log({ success: regDoctor.data });
      goToDoctorSummary();
    }
  };

  const goToDoctorSummary = () => {
    navigate("/doctorSummary");
  };
  const [specializationList, setSpecializationList] = useState([]);
  const fetchSpecializationHandler = useCallback(async () => {
    const user = await getData(
      BASE_URL +
        "clinic/getSpecializations/fe355d95-721b-4d36-b5b1-4b7c9a2290e7"
    );

    if (user.error) {
    } else {
      const data1 = user.data;
      setSpecializationList(data1);
      console.log({ setSpecializationList: data1 });
    }
  }, []);

  useEffect(() => {
    fetchSpecializationHandler();
  }, [fetchSpecializationHandler]);
  console.log({ sdsfdsfsdf: localStorage.getItem("DOCDATA_NEW") });
  return (
    <Fragment>
      <Box sx={{ pt: 2 }}>
        <form id="patientData" onSubmit={submitHandlerPR}>
          <Grid container>
            <Grid item lg={12} xs={12}>
              <Divider>Personal details</Divider>
            </Grid>
            <Grid item lg={12} xs={12}>
              <Box
                sx={{
                  background: "#fff",
                  minHeight: "20vh",
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disableFuture
                          inputFormat="dd MMM yyyy"
                          disableMaskedInput={true}
                          label="Date"
                          openTo="year"
                          views={["year", "month", "day"]}
                          value={formValues.dateOfBirth}
                          name="dateOfBirth"
                          onChange={(newValue) => {
                            setFormValues({
                              ...formValues,
                              dateOfBirth: newValue,
                              age:
                                new Date().getFullYear() -
                                new Date(newValue).getFullYear(),
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              fullWidth
                              sx={{ fontSize: 10 }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                      <TextField
                        fullWidth
                        name="age"
                        size={"small"}
                        label="Age:"
                        variant="outlined"
                        value={formValues.age || ""}
                        onChange={(e) => {
                          if (e.target.value >= 0 && e.target.value < 100) {
                            handleChange(e);
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                      <TextField
                        name="aboutMe"
                        size={"small"}
                        fullWidth
                        label="AboutMe:"
                        variant="outlined"
                        value={formValues.aboutMe || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                      <UploadProfilePhoto
                        docId={localStorage.getItem("DOCDATA_NEW")}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={12} xs={12}>
              <Divider>Professional details</Divider>
            </Grid>
            <Grid item lg={12} xs={12}>
              <Box
                sx={{
                  background: "#fff",
                  minHeight: "45vh",
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {/* <Grid item xs={12} lg={4}>
                      <TextField
                        name="specialization"
                        size={"small"}
                        fullWidth
                        label="Doctor's Specialization:"
                        variant="outlined"
                        value={formValues.specialization || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid> */}
                    <Grid item xs={12} lg={4}>
                      <TextField
                        name="fees"
                        size={"small"}
                        fullWidth
                        label="Fees:"
                        variant="outlined"
                        value={formValues.fees || ""}
                        onChange={(e) => {
                          if (e.target.value >= 0 && e.target.value < 10000) {
                            handleChange(e);
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextField
                        name="degree"
                        size={"small"}
                        fullWidth
                        label="Degree:"
                        variant="outlined"
                        value={formValues.degree || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextField
                        name="department"
                        size={"small"}
                        fullWidth
                        label="Department:"
                        variant="outlined"
                        value={formValues.department || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextField
                        name="experience"
                        size={"small"}
                        fullWidth
                        label="Experience:"
                        variant="outlined"
                        value={formValues.experience || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextField
                        name="unit"
                        size={"small"}
                        fullWidth
                        label="Unit:"
                        variant="outlined"
                        value={formValues.unit || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextField
                        name="languages"
                        size={"small"}
                        fullWidth
                        label="Languages:"
                        variant="outlined"
                        value={formValues.languages || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextField
                        name="workingTime"
                        size={"small"}
                        fullWidth
                        label="WorkingTime:"
                        variant="outlined"
                        value={formValues.workingTime || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                      <TextField
                        name="rmpNo"
                        size={"small"}
                        fullWidth
                        label="Reg No:"
                        variant="outlined"
                        value={formValues.rmpNo || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                      <UploadSignature
                        docId={localStorage.getItem("DOCDATA_NEW")}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
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
              type="submit"
              form="patientData"
            >
              Save
            </Button>

            <Button fullWidth variant="contained" href="/doctorSummary">
              Skip
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default NewDocForm;

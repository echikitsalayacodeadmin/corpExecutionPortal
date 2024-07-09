import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import UploadProfilePhoto from "../RegistrationForms/uploadProfilePhoto";
import UploadSignature from "../RegistrationForms/uploadSignature";
import ChangePassword from "./changePassword";
import BranchForDoc from "../registration/registrationFormElements/branchForDoc";
import { BASE_URL } from "../../../../../assets/constants";
import { getData, saveData, updateData } from "../../../../assets/corpServices";
import { genderList } from "../../../../../assets/utils";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const EditDcotorMainComp = (props) => {
  let navigate = useNavigate();
  const [docDetail, setDocDetail] = useState("");
  const getDocInfo = async (dId) => {
    const user = await getData(BASE_URL + "doctor/" + dId);

    if (user.error) {
    } else {
      const data = user.data;
      setDocDetail(data);
    }
  };

  useEffect(() => {
    getDocInfo(props.docId);
  }, [props.docId]);

  const goBackHandler = () => {
    props.onClickAction("BACKTOSEARCH", props.docId, props.docList);
  };

  const [editProfilePic, setEditProfilePic] = useState(false);
  const [editSignNature, setEditSignNature] = useState(false);
  const [formValues, setFormValues] = useState({
    docId: docDetail.docId,
    firstName: docDetail.firstName,
    lastName: docDetail.lastName,
    middleName: docDetail.middleName,
    dateOfBirth: docDetail.dateOfBirth,
    gender: docDetail.gender,
    email: docDetail.email,
    mobile: docDetail.mobile,
    age: docDetail.age,
    specialization: docDetail.specialization ? docDetail.specialization : "",
    fees: docDetail.fees,
    degree: docDetail.degree,
    department: docDetail.department,
    experience: docDetail.experience,
    unit: docDetail.unit,
    languages: docDetail.languages,
    workingTime: docDetail.workingTime,
    imageURL: docDetail.imageURL,
    aboutMe: docDetail.aboutMe,
    fullName: docDetail.fullName,
    rmpNo: docDetail.rmpNo,
    signatureURL: docDetail.signatureURL,
  });

  const [branchId, setBranchId] = useState("");

  useEffect(() => {
    setFormValues({
      docId: docDetail.docId,
      firstName: docDetail.firstName,
      lastName: docDetail.lastName,
      middleName: docDetail.middleName,
      dateOfBirth: docDetail.dateOfBirth,
      gender: docDetail.gender,
      email: docDetail.email,
      mobile: docDetail.mobile,
      age: docDetail.age,
      specialization: docDetail.specialization ? docDetail.specialization : "",
      fees: docDetail.fees,
      degree: docDetail.degree,
      department: docDetail.department,
      experience: docDetail.experience,
      unit: docDetail.unit,
      languages: docDetail.languages,
      workingTime: docDetail.workingTime,
      imageURL: docDetail.imageURL,
      aboutMe: docDetail.aboutMe,
      fullName: docDetail.fullName,
      rmpNo: docDetail.rmpNo,
      signatureURL: docDetail.signatureURL,
    });
  }, [docDetail]);

  let handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const submitHandlerDR = (event) => {
    event.preventDefault();
    props.onClickAction("UPDATEDOCTOR");
    const doctorObj = {
      docId: docDetail.docId,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      middleName: formValues.middleName,
      dateOfBirth: formValues.dateOfBirth,
      gender: formValues.gender,
      //email: formValues.email,
      //mobile: formValues.mobile,
      age: formValues.age,
      specialization: formValues.specialization,
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

      if (branchId) {
        assignBranch(regDoctor.data.docId);
      }

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
      const data1 = await user.data;
      setSpecializationList(data1);
      console.log({ setSpecializationList: data1 });
    }
  }, []);

  useEffect(() => {
    fetchSpecializationHandler();
  }, [fetchSpecializationHandler]);

  const updateProfilePicHandler = (data, ImageData) => {
    console.log({ ImageData });
    if (data === "SUCCESS") {
      setEditProfilePic(false);
      setFormValues({
        ...formValues,
        imageURL: ImageData.imageURL,
      });
    }
  };

  const updateSignatureHandler = (data, ImageData) => {
    console.log({ ImageData });
    if (data === "SUCCESS") {
      setEditSignNature(false);
      setFormValues({
        ...formValues,
        signatureURL: ImageData.signatureURL,
      });
    }
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

  console.log({ "formValues.specialization ": formValues.specialization });
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Box
            sx={{ p: 1 }}
            component={Stack}
            direction="row"
            justifyContent={"center"}
          >
            <Typography variant="h6">Edit Doctor Information</Typography>
          </Box>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Box sx={{ pt: 1 }}>
            <form id="patientData" onSubmit={submitHandlerDR}>
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
                      pl: 4,
                      pr: 4,
                      pt: 2,
                      pb: 2,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                          <TextField
                            fullWidth
                            name="firstName"
                            size={"small"}
                            label="First Name:"
                            variant="outlined"
                            value={formValues.firstName || ""}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                          <TextField
                            fullWidth
                            name="middleName"
                            size={"small"}
                            label="Middle Name:"
                            variant="outlined"
                            value={formValues.middleName || ""}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                          <TextField
                            fullWidth
                            name="lastName"
                            size={"small"}
                            label="Last Name:"
                            variant="outlined"
                            value={formValues.lastName || ""}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </Grid>
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
                        <Grid item xs={12} sm={12} md={12} lg={1}>
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

                        <Grid item lg={1} md={12} sm={12} xs={12}>
                          <TextField
                            fullWidth
                            size={"small"}
                            select
                            label="Gender"
                            name="gender"
                            value={formValues.gender || ""}
                            onChange={(e) => {
                              handleChange(e);
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

                        <Grid item xs={12} sm={12} md={12} lg={2}>
                          <TextField
                            disabled
                            fullWidth
                            name="mobile"
                            size={"small"}
                            label="Mobile:"
                            variant="outlined"
                            value={formValues.mobile || ""}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={2}>
                          <TextField
                            disabled
                            fullWidth
                            name="email"
                            size={"small"}
                            label="Email:"
                            variant="outlined"
                            value={formValues.email || ""}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={2}>
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

                        <Grid item xs={12} sm={12} md={12} lg={2}>
                          <BranchForDoc
                            branchId={branchId}
                            setBranchId={setBranchId}
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
                      minHeight: "20vh",
                      borderRadius: 2,
                      pl: 4,
                      pr: 4,
                      pt: 2,
                      pb: 2,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} lg={4}>
                          <TextField
                            name="specialization"
                            size={"small"}
                            fullWidth
                            label="Doctor's Specialization:"
                            variant="outlined"
                            value={formValues.specialization || ""}
                            onChange={(e) => handleChange(e)}
                          />
                        </Grid>
                        <Grid item xs={12} lg={1}>
                          <TextField
                            name="fees"
                            size={"small"}
                            fullWidth
                            label="Fees:"
                            variant="outlined"
                            value={formValues.fees || ""}
                            onChange={(e) => {
                              if (
                                e.target.value >= 0 &&
                                e.target.value < 10000
                              ) {
                                handleChange(e);
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} lg={3}>
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

                        <Grid item xs={12} lg={3}>
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
                        <Grid item xs={12} lg={1}>
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
                        <Grid item xs={12} lg={3}>
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

                        <Grid item xs={12} lg={3}>
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
                        <Grid item xs={12} lg={3}>
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
                        <Grid item xs={12} lg={3}>
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
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Divider>Security details</Divider>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Box
                    sx={{
                      background: "#fff",
                      minHeight: "7vh",
                      borderRadius: 2,
                      pl: 4,
                      pr: 4,
                      pt: 1,
                      pb: 0,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item lg={4} xs={12}>
                          <Box>
                            <ChangePassword userName={formValues.email} />
                          </Box>
                        </Grid>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Grid item lg={4} xs={12}>
                          {editProfilePic ? (
                            <Box>
                              <UploadProfilePhoto
                                docId={formValues.docId}
                                onProfilePicImage={updateProfilePicHandler}
                              />
                            </Box>
                          ) : (
                            <Box
                              component={Stack}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Typography variant="body2">
                                Profile Image
                              </Typography>

                              <Box
                                component="img"
                                sx={{
                                  height: 100,
                                  width: 100,
                                  maxHeight: { xs: 45, md: 45 },
                                  maxWidth: { xs: 45, md: 45 },
                                }}
                                alt=""
                                src={formValues.imageURL}
                              />
                              <Button onClick={(e) => setEditProfilePic(true)}>
                                Edit
                              </Button>
                            </Box>
                          )}
                        </Grid>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Grid item lg={3} xs={12}>
                          {editSignNature ? (
                            <Box>
                              <UploadSignature
                                docId={formValues.docId}
                                onSignatureUpdate={updateSignatureHandler}
                              />
                            </Box>
                          ) : (
                            <Box
                              component={Stack}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Typography variant="body2">Signature</Typography>

                              <Box
                                component="img"
                                sx={{
                                  height: 100,
                                  width: 100,
                                  maxHeight: { xs: 45, md: 45 },
                                  maxWidth: { xs: 45, md: 45 },
                                }}
                                alt=""
                                src={formValues.signatureURL}
                              />
                              <Button onClick={(e) => setEditSignNature(true)}>
                                Edit
                              </Button>
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item lg={12} xs={12}>
          <Divider />
        </Grid>

        <Grid item lg={12} xs={12}>
          <Box
            sx={{
              minHeight: "4vh",
              pt: 2,
              pb: 1,
              pl: 2,
              pr: 2,
              background: "#fff",
            }}
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
              Go Back to Search
            </Button>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              form="patientData"
              sx={{ color: "white" }}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditDcotorMainComp;

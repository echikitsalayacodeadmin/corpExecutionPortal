import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import CompanyName from "./subComp/companyName";
import SelectLocation from "../../../global/selectLocation/selectLocation";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import GlobalTimeLayout from "../../../../assets/globalTimeLayout/globalTimeLayout";
import AddPotentialServices from "./subComp/addPotentialServices";
import AddSpocComp from "./subComp/addSpocComp";
import SelectKam from "../../../global/selectKam/selectKam";
import CustomSelect from "../../../../assets/customSelect";
import { IOSSwitch } from "../../../../assets/customSwitch";
import UploadFile from "../../../global/uploadFIle";
import { useFileUpload } from "use-file-upload";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { saveData, uploadFile } from "../../../assets/corpServices";

const CorpSalesRegistration = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [files, selectFiles] = useFileUpload();
  const userId = localStorage.getItem("USER_ID_CORP_SALES");
  const userName = localStorage.getItem("USER_NAME_CORP_SALES");
  const [formValues, setFormValues] = useState({
    corpSalesId: "",
    corpName: "",
    corpType: "",
    address: "",
    noOfPlants: "",
    timeField: new Date()?.toISOString().split("T")[0],
    onRollEmployees: "",
    offRollEmployees: "",
    prospectiveServices: [],
    auditMonth: "",
    photoUrl: "",
    interested: false,
    quotationAsked: false,
    anoterVisitRequired: false,
    interestedRemark: "",
    spocList: [],
    visitType: "",
    userId: 0,
    childUserId: [0],
    registrationDate: new Date()?.toISOString().split("T")[0],
    userName: "",
    location: "",
    priority: "",
    nextVisitDate: new Date()?.toISOString().split("T")[0],
  });

  const obj = {
    corpName: formValues.corpName,
    corpType: formValues.corpType,
    address: formValues.address,
    noOfPlants: formValues.noOfPlants,
    onRollEmployees: formValues.onRollEmployees,
    offRollEmployees: formValues.offRollEmployees,
    auditMonth: formValues.auditMonth,
    prospectiveServices: formValues.prospectiveServices,
    interested: formValues.interested,
    quotationAsked: formValues.quotationAsked,
    anoterVisitRequired: formValues.anoterVisitRequired,
    interestedRemark: formValues.interestedRemark,
    spocList: formValues.spocList,
    userId: userId,
    childUserId: formValues.childUserId.map((item) => item.id) || [],
    registrationDate: formValues.registrationDate,
    userName: userName,
    location: formValues.location,
    priority: formValues.priority || null,
    visitType: formValues.visitType || null,
    nextVisitDate: new Date()?.toISOString().split("T")[0],
  };

  if (formValues?.nextVisitDate) {
    obj.corpSalesVisitEntities = [
      {
        nextVisitDate: formValues.nextVisitDate,
        userId: userId,
      },
    ];
  }

  const handleUpload = async (corpSalesId) => {
    const formData = new FormData();
    formValues.photoUrl.file
      ? formData.append("file", formValues.photoUrl.file)
      : null;
    const url =
      BASE_URL +
      "corpSales/upload?corpSalesId=" +
      corpSalesId +
      "&fileType=PHOTO";
    const result = await uploadFile(url, formData);
    if (result.data) {
      enqueueSnackbar("Successfully Uploaded!", { variant: "success" });
      navigate(-1);
    } else {
      enqueueSnackbar("An error occured while uploading photo", {
        variant: "error",
      });
    }
  };

  const handleSubmit = async () => {
    const url = BASE_URL + "corpSales/register";
    const result = await saveData(url, obj);
    if (result && result.data) {
      if (result?.data && formValues.photo !== "") {
        handleUpload(result?.data?.corpSalesId);
      } else {
        navigate(-1);
      }
      enqueueSnackbar("Successfully Saved", { variant: "success" });
    } else {
      enqueueSnackbar("An error occured while saving Data", {
        variant: "error",
      });
    }
  };

  console.log({ formValues });

  return (
    <Fragment>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ backgroundColor: "#F5F5F5", minHeight: "80vh", borderRadius: 5 }}
      >
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <CompanyName
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
                size="small"
                label={"Company Address"}
                placeholder={"Enter Company Address"}
                value={formValues.address || ""}
                onChange={(e) => {
                  setFormValues({ ...formValues, address: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
                size="small"
                label={"No Of Plants"}
                placeholder={"No Of Plants"}
                value={formValues.noOfPlants || ""}
                onChange={(e) => {
                  setFormValues({ ...formValues, noOfPlants: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
                size="small"
                label={"Company Type"}
                placeholder={"Enter Company Type"}
                value={formValues.corpType || ""}
                onChange={(e) => {
                  setFormValues({ ...formValues, corpType: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <SelectLocation
                freeSolo={true}
                fontWeight={"600"}
                formValues={formValues}
                setFormValues={setFormValues}
                property={"location"}
                label={"Select Location"}
                placeholder={"Select Location"}
              />
            </Grid>
            <Grid item xs={6} lg={3}>
              <GlobalDateLayout
                label={"Date"}
                initialDate={formValues.registrationDate}
                formValues={formValues}
                setFormValues={setFormValues}
                property={"registrationDate"}
                disableFuture={true}
              />
            </Grid>
            <Grid item xs={6} lg={3}>
              <GlobalTimeLayout
                label={"Time"}
                initialDate={formValues.timeField}
                formValues={formValues}
                setFormValues={setFormValues}
                property={"timeField"}
                disableFuture={true}
              />
            </Grid>

            <Grid item xs={6} lg={3}>
              <TextField
                sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
                fullWidth
                label="#On Roll Employee"
                placeholder="#On Roll Employee"
                variant="outlined"
                size="small"
                value={formValues?.onRollEmployees || ""}
                onChange={(e) => {
                  if (!isNaN(e.target.value) && e.target.value.length >= 0) {
                    setFormValues({
                      ...formValues,
                      onRollEmployees: e.target.value,
                    });
                  }
                }}
              />
            </Grid>
            <Grid item xs={6} lg={3}>
              <TextField
                sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
                fullWidth
                label="#Off Roll Employee"
                variant="outlined"
                placeholder="#Off Role Employee"
                size="small"
                value={formValues?.offRollEmployees || ""}
                onChange={(e) => {
                  if (!isNaN(e.target.value) && e.target.value.length >= 0) {
                    setFormValues({
                      ...formValues,
                      offRollEmployees: e.target.value,
                    });
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <AddPotentialServices
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <SelectKam
                formValues={formValues}
                setFormValues={setFormValues}
                property={"childUserId"}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <AddSpocComp
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <CustomSelect
                options={[
                  { value: "", label: "Select Visit Type" },
                  { value: "TELEPHONIC", label: "Telephonic Visit" },
                  { value: "IN_PERSON", label: "In Person Visit" },
                ]}
                required={true}
                helperText={"Please Select Visit Type its mandatory"}
                placeholder="Type Of Visit"
                value={formValues.visitType || ""}
                property={"visitType"}
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <CustomSelect
                placeholder={"Select Priority"}
                value={formValues.priority || ""}
                formValues={formValues}
                setFormValues={setFormValues}
                property={"priority"}
                options={[
                  { value: "", label: "Select Priority" },
                  { value: "P0", label: "P0" },
                  { value: "P1", label: "P1" },
                  { value: "P2", label: "P2" },
                  { value: "P3", label: "P3" },
                  { value: "P4", label: "P4" },
                ]}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <GlobalDateLayout
                label={"Audit Date"}
                initialDate={formValues.auditMonth}
                formValues={formValues}
                setFormValues={setFormValues}
                property={"auditMonth"}
              />
            </Grid>
            <Grid item xs={6} lg={3}>
              <GlobalDateLayout
                label={"Next Visit Date"}
                initialDate={formValues?.nextVisitDate}
                formValues={formValues}
                setFormValues={setFormValues}
                property={"nextVisitDate"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Typography>Interested ?</Typography>
              <RadioGroup
                value={
                  formValues.interested === true
                    ? "Yes"
                    : formValues.interested === false
                    ? "No"
                    : ""
                }
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    interested:
                      e.target.value === "Yes"
                        ? true
                        : e.target.value === "No"
                        ? false
                        : "",
                  });
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </Box>
              </RadioGroup>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Box sx={{ marginBlock: 2 }}>
                <FormControlLabel
                  label="Another Visit Asked"
                  labelPlacement="start"
                  control={
                    <Box sx={{ marginInline: "10px" }}>
                      <IOSSwitch
                        checked={formValues.anoterVisitRequired}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            anoterVisitRequired: e.target.checked,
                          });
                        }}
                      />
                    </Box>
                  }
                />
              </Box>
              <Box sx={{ marginBlock: 2 }}>
                <FormControlLabel
                  label="Quotation Required"
                  labelPlacement="start"
                  control={
                    <Box sx={{ marginInline: "10px" }}>
                      <IOSSwitch
                        checked={formValues.quotationAsked}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            quotationAsked: e.target.checked,
                          });
                        }}
                      />
                    </Box>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <UploadFile
                title="Upload Photo"
                styles={{ height: "40px", borderRadius: "15px" }}
                formValues={formValues}
                setFormValues={setFormValues}
                property={"photoUrl"}
                onClick={() =>
                  selectFiles(
                    { accept: "*" },
                    ({ name, size, source, file }) => {
                      const filedata = { name, size, source, file };
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        photoUrl: filedata,
                      }));
                    }
                  )
                }
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <TextField
                multiline
                label="Remark"
                size="small"
                fullWidth
                placeholder="Enter Remark"
                value={formValues.interestedRemark}
                sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    interestedRemark: e.target.value,
                  })
                }
                inputProps={{
                  style: {
                    height: "110px",
                  },
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              lg={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ width: "150px", borderRadius: "15px" }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
};

export default CorpSalesRegistration;

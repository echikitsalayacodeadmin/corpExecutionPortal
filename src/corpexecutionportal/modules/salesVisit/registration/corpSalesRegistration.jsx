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
import React, { Fragment, useEffect, useState } from "react";
import CompanyName from "./subComp/companyName";
import SelectLocation from "../../../global/selectLocation/selectLocation";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import GlobalTimeLayout from "../../../../assets/globalTimeLayout/globalTimeLayout";
import AddPotentialServices from "./subComp/addPotentialServices";
import AddSpocComp from "./subComp/addSpocComp";
import SelectKam from "../../../global/selectKam/selectKam";
import CustomSelect from "../../../../assets/customSelect";
import { IOSSwitch } from "../../../../assets/customSwitch";
import UploadFile from "../../../global/uploadFile";
import { useFileUpload } from "use-file-upload";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { saveData, uploadFile } from "../../../assets/corpServices";
import dayjs from "dayjs";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import VisitType from "./subComp/visitType";
import Priority from "./subComp/priority";
import SubLocation from "./subComp/subLocation";

const CorpSalesRegistration = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [files, selectFiles] = useFileUpload();
  const userId = localStorage.getItem("USER_ID_CORP_SALES");
  const userName = localStorage.getItem("USER_NAME_CORP_SALES");

  const [isDisabled, setIsDisabled] = useState(false);
  const [formValues, setFormValues] = useState({
    corpSalesId: "",
    corpName: "",
    corpType: "",
    address: "",
    noOfPlants: "",
    onRollEmployees: "",
    offRollEmployees: "",
    photoUrl: "",
    userId: 0,
    userName: "",
    priority: "",
    location: "",
    subLocation: "",
    remark: "",
  });

  const obj = {
    corpName: formValues.corpName,
    corpType: formValues.corpType,
    address: formValues.address,
    noOfPlants: formValues.noOfPlants,
    onRollEmployees: formValues.onRollEmployees,
    offRollEmployees: formValues.offRollEmployees,
    userId: userId,
    userName: userName,
    location: formValues.location,
    subLocation: formValues.subLocation,
    priority: formValues.priority,
    remark: formValues.remark,
  };

  const handleSubmit = async () => {
    setIsDisabled(true);
    const url = BASE_URL + "corpSales/register";
    const result = await saveData(url, obj);
    if (result && result.data) {
      setIsDisabled(false);
      if (result?.data && formValues.photoUrl !== "") {
        handleUpload(result?.data?.corpSalesId);
      } else {
        navigate.replace(
          `/corp/salesvisit/detail/${result?.data?.corpSalesId}`,
          { replace: true }
        );
      }
      enqueueSnackbar("Successfully Saved", { variant: "success" });
    } else {
      setIsDisabled(false);
      enqueueSnackbar("An error occured while saving Data", {
        variant: "error",
      });
    }
  };

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
      navigate(`/corp/salesvisit/detail/${result?.data?.corpSalesId}`, {
        replace: true,
      });
    } else {
      enqueueSnackbar("An error occured while uploading photo", {
        variant: "error",
      });
    }
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <CompanyName formValues={formValues} setFormValues={setFormValues} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <TextField
            fullWidth
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            size="small"
            label={"Address"}
            placeholder={"Address"}
            value={formValues.address || ""}
            onChange={(e) => {
              setFormValues({ ...formValues, address: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <TextField
            fullWidth
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            size="small"
            label={"#Plants"}
            placeholder={"#Plants"}
            value={formValues.noOfPlants || ""}
            onChange={(e) => {
              if (!isNaN(e.target.value) && e.target.value.length >= 0) {
                setFormValues({ ...formValues, noOfPlants: e.target.value });
              }
            }}
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <Priority formValues={formValues} setFormValues={setFormValues} />
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

        <Grid item xs={12} lg={6}>
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
        <Grid item xs={12} lg={6}>
          <SubLocation
            formValues={formValues}
            setFormValues={setFormValues}
            property={"subLocation"}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <AddSpocComp formValues={formValues} setFormValues={setFormValues} />
        </Grid>
        <Grid item xs={6} lg={6}>
          <TextField
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            fullWidth
            label="#On Roll"
            placeholder="#On Roll"
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
        <Grid item xs={6} lg={6}>
          <TextField
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            fullWidth
            label="#Off Roll"
            variant="outlined"
            placeholder="#Off Role"
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

        <Grid item xs={12} lg={6}>
          <UploadFile
            title="Upload Photo"
            styles={{ height: "40px", borderRadius: "15px" }}
            formValues={formValues}
            setFormValues={setFormValues}
            property={"photoUrl"}
            onClick={() =>
              selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
                const filedata = { name, size, source, file };
                setFormValues((prevFormValues) => ({
                  ...prevFormValues,
                  photoUrl: filedata,
                }));
              })
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
            value={formValues.remark}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                remark: e.target.value,
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
            disabled={
              isDisabled === true || formValues.corpName === "" ? true : false
            }
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
    </Fragment>
  );
};

export default CorpSalesRegistration;

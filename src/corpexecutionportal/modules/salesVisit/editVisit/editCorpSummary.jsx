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
import UploadFile from "../../../global/uploadFile";
import { useFileUpload } from "use-file-upload";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { saveData, updateData, uploadFile } from "../../../assets/corpServices";
import { fetchCorpDetails } from "../../../services/salesVisitServices";
import CompanyVisitDetails from "../detail/subComp/companyVisitDetails";
import dayjs from "dayjs";
import Priority from "../registration/subComp/priority";
import SubLocation from "../registration/subComp/subLocation";

const EditCorpSummary = () => {
  const { itemId } = useParams();
  const corpSalesId = itemId;
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
    timeField: dayjs().format("YYYY-MM-DD"),
    onRollEmployees: "",
    offRollEmployees: "",
    prospectiveServices: [],
    auditMonth: dayjs().format("YYYY-MM-DD"),
    photoUrl: "",
    interested: false,
    quotationAsked: false,
    anoterVisitRequired: false,
    interestedRemark: "",
    spocList: [],
    visitType: "",
    userId: 0,
    childUserId: [0],
    registrationDate: dayjs().format("YYYY-MM-DD"),
    userName: "",
    location: "",
    priority: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCorpDetails(setFormValues, setIsLoading, corpSalesId);
  }, [corpSalesId]);

  const Obj2 = {
    corpSalesId: formValues?.corpSalesId,
    corpName: formValues.corpName,
    corpType: formValues.corpType,
    noOfPlants: formValues.noOfPlants,
    address: formValues.address,
    childUserId: formValues?.childUserId?.map((item) => item.id) || [],
    onRollEmployees: formValues.onRollEmployees,
    offRollEmployees: formValues.offRollEmployees,
    auditMonth: formValues.auditMonth,
    prospectiveServices: formValues.prospectiveServices || [],
    location: formValues?.location || null,
    priority: formValues?.priority || null,
  };

  const handleUpdate = async () => {
    const url = BASE_URL + "corpSales/edit";
    const result = await updateData(url, Obj2);
    if (result && result.data) {
      enqueueSnackbar("Successfully Saved", {
        variant: "success",
      });
      fetchCorpDetails(setFormValues, setIsLoading, corpSalesId);
      navigate(-1);
    } else if (result && result?.error) {
      enqueueSnackbar("An Error Occured", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      photoUrl: { source: formValues.photoUrl || "" },
    });
  }, [isLoading]);

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
            label={"Company Address"}
            placeholder={"Enter Company Address"}
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
              setFormValues({ ...formValues, noOfPlants: e.target.value });
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
            value={formValues.interestedRemark || ""}
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
              handleUpdate();
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditCorpSummary;

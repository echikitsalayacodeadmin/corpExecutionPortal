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
import UploadFile from "../../../global/uploadFIle";
import { useFileUpload } from "use-file-upload";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { saveData, updateData, uploadFile } from "../../../assets/corpServices";
import { fetchCorpDetails } from "../../../services/salesVisitServices";
import CompanyVisitDetails from "../detail/subComp/companyVisitDetails";
import dayjs from "dayjs";
import Priority from "../registration/subComp/priority";

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

  const handleDownload = (url) => {
    if (url !== "" || url !== null || url !== undefined) {
      window.open(url, "_blank");
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
          <GlobalDateLayout
            label={"Date"}
            initialDate={formValues.registrationDate}
            formValues={formValues}
            setFormValues={setFormValues}
            property={"registrationDate"}
            disableFuture={true}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
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

        <Grid item xs={12} lg={12}>
          <AddPotentialServices
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <CompanyVisitDetails data={formValues} onlyView={true} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <AddSpocComp formValues={formValues} setFormValues={setFormValues} />
        </Grid>
        <Grid item xs={6} lg={6}>
          <Priority formValues={formValues} setFormValues={setFormValues} />
        </Grid>
        <Grid item xs={6} lg={6}>
          <GlobalDateLayout
            label={"Sales Date"}
            initialDate={formValues.auditMonth}
            formValues={formValues}
            setFormValues={setFormValues}
            property={"auditMonth"}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Button
            disabled={formValues?.photoUrl ? false : true}
            onClick={() => {
              handleDownload(formValues?.photoUrl);
            }}
          ></Button>
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

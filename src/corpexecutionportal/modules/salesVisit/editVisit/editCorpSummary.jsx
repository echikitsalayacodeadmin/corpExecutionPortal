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
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCorpDetails(setFormValues, setIsLoading, corpSalesId);
  }, [corpSalesId]);

  const Obj2 = {
    corpSalesId: formValues?.corpSalesId,
    corpName: formValues.corpName,
    corpType: formValues.corpType,
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
              <CompanyVisitDetails data={formValues} />
            </Grid>
            <Grid item xs={12} lg={12}>
              <AddSpocComp
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
            <Grid item xs={6} lg={6}>
              <GlobalDateLayout
                label={"Audit Date"}
                initialDate={formValues.auditMonth}
                formValues={formValues}
                setFormValues={setFormValues}
                property={"auditMonth"}
                disableFuture={true}
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
        </Box>
      </Container>
    </Fragment>
  );
};

export default EditCorpSummary;

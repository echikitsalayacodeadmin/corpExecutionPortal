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
import SelectLocation from "../../../global/selectLocation/selectLocation";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import GlobalTimeLayout from "../../../../assets/globalTimeLayout/globalTimeLayout";
import SelectKam from "../../../global/selectKam/selectKam";
import CustomSelect from "../../../../assets/customSelect";
import { IOSSwitch } from "../../../../assets/customSwitch";
import { useFileUpload } from "use-file-upload";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { fetchCorpDetails } from "../../../services/salesVisitServices";
import {
  getData,
  saveData,
  updateData,
  uploadFile,
} from "../../../assets/corpServices";
import CompanyVisitDetails from "../detail/subComp/companyVisitDetails";
import CustomButtonBlue from "../../../../assets/customButtonBlue";

import AddPotentialServices from "../registration/subComp/addPotentialServices";
import AddSpocComp from "../registration/subComp/addSpocComp";
import CompanyName from "../editVisit/subComp/companyName";
import UploadFile from "../../../global/uploadFIle";
import dayjs from "dayjs";
import VisitType from "../registration/subComp/visitType";
import Priority from "../registration/subComp/priority";

const CorpSalesNewVisit = () => {
  const { itemId } = useParams();
  const corpSalesId = itemId;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [files, selectFiles] = useFileUpload();
  const userId = localStorage.getItem("USER_ID_CORP_SALES");
  const userName = localStorage.getItem("USER_NAME_CORP_SALES");
  const [corpDetail, setCorpDetail] = useState("");
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
    visitPhotoUrl: "",
    nextVisitDate: dayjs().format("YYYY-MM-DD"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const fetchCorpData = async () => {
    if (fetchCorpData) {
      const url = BASE_URL + "corpSales/" + corpSalesId;
      const result = await getData(url);
      if (result?.data) {
        setCorpDetail(result.data);
        setFormValues({
          ...formValues,
          corpSalesId: result?.data.corpSalesId,
          corpName: result?.data.corpName || "",
          corpType: result?.data.corpType || "",
          address: result?.data.address || "",
          noOfPlants: result?.data.noOfPlants || "",
          timeField: new Date(),
          onRollEmployees: result?.data.onRollEmployees || "",
          offRollEmployees: result?.data.offRollEmployees || "",
          prospectiveServices: result?.data.prospectiveServices || [],
          auditMonth: result?.data.auditMonth,
          photoUrl: result?.data.photoUrl || "",
          spocList: result?.data.spocList || [],
          visitType: result?.data.visitType || "",
          userId: result?.data.userId || userId,
          childUserId: result?.data.childUserId || [],
          registrationDate: result?.data?.registrationDate,
          userName: result?.data.userName || userName,
          location: result?.data.location || "",
          priority: result?.data.priority || "",
          interested: false,
          quotationAsked: false,
          anoterVisitRequired: false,
          interestedRemark: "",
          visitPhotoUrl: "",
          nextVisitDate: dayjs().format("YYYY-MM-DD"),
        });
      } else {
        console.log("SUCCESS", result?.error);
      }
    }
  };

  useEffect(() => {
    fetchCorpData();
  }, [corpSalesId]);

  console.log({ formValues });

  const formData = new FormData();
  formData.append("corpSalesId", formValues.corpSalesId);
  formData.append("interested", formValues.interested);
  formData.append("quotationAsked", formValues.quotationAsked);
  formData.append("anotherVisitRequired", formValues.anoterVisitRequired);
  formData.append("interestedRemark", formValues?.interestedRemark);
  formData.append("visitType", formValues?.visitType || null);
  formData.append("userId", userId);
  formData.append(
    "nextVisitDate",
    new Date(formValues?.nextVisitDate)?.toISOString().slice(0, 10)
  );
  formData.append(
    "childUserId",
    formValues?.childUserId?.map((item) => item.id).join(",")
  );
  formData.append("file", formValues.visitPhotoUrl.file);

  const handleSubmit = async () => {
    setIsDisabled(true);
    const url = BASE_URL + "corpSales/addVisit";
    const result = await uploadFile(url, formData);
    if (result && result.data) {
      console.log("SUCCESS POST", result?.data);
      setIsDisabled(true);
      enqueueSnackbar("Successfully Saved", {
        variant: "success",
      });
      handleUpdate();
    } else if (result && result?.error) {
      enqueueSnackbar("An error occured", {
        variant: "error",
      });
      setIsDisabled(false);
    }
  };
  const Obj2 = {
    corpSalesId: formValues?.corpSalesId,
    corpName: formValues.corpName,
    address: formValues.address,
    onRollEmployees: formValues.onRollEmployees,
    offRollEmployees: formValues.offRollEmployees,
    auditMonth: formValues.auditMonth === null ? null : formValues.auditMonth,
    prospectiveServices: formValues.prospectiveServices,
    location: formValues?.location || null,
    priority: formValues?.priority || null,
  };

  const handleUpdate = async () => {
    const url = BASE_URL + "corpSales/edit";
    const result = await updateData(url, Obj2);
    if (result && result.data) {
      console.log("SUCCESS POST", result?.data);
      enqueueSnackbar("Successfully Saved", {
        variant: "success",
      });
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } else if (result && result?.error) {
      enqueueSnackbar("An error occured", {
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
          <SelectKam
            formValues={formValues}
            setFormValues={setFormValues}
            property={"childUserId"}
          />
        </Grid>

        <Grid item xs={12} lg={12}>
          <CompanyVisitDetails data={corpDetail} onlyView={true} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <AddSpocComp
            formValues={formValues}
            setFormValues={setFormValues}
            removeEdit={true}
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <VisitType formValues={formValues} setFormValues={setFormValues} />
        </Grid>
        <Grid item xs={6} lg={6}>
          <Priority formValues={formValues} setFormValues={setFormValues} />
        </Grid>

        <Grid
          item
          xs={12}
          lg={6}
          sx={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Typography>Interested</Typography>
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
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </Box>
          </RadioGroup>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControlLabel
            label="Another Visit Asked"
            labelPlacement="start"
            sx={{ marginLeft: "2px" }}
            control={
              <Box sx={{ marginRight: "10px" }}>
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
        <Grid item xs={6} lg={6}>
          <GlobalDateLayout
            label={"Next Visit Date"}
            initialDate={formValues.nextVisitDate}
            formValues={formValues}
            setFormValues={setFormValues}
            property={"nextVisitDate"}
            disablePast={true}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <UploadFile
            title="Upload Visit Photo"
            styles={{ height: "40px", borderRadius: "15px" }}
            formValues={formValues}
            setFormValues={setFormValues}
            property={"visitPhotoUrl"}
            onClick={() =>
              selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
                const filedata = { name, size, source, file };
                setFormValues((prevFormValues) => ({
                  ...prevFormValues,
                  visitPhotoUrl: filedata,
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
            onClick={() => handleSubmit()}
            disabled={isDisabled || formValues.visitType === "" ? true : false}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CorpSalesNewVisit;

import {
  Box,
  Button,
  Checkbox,
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
import { getData, uploadFile } from "../../../assets/corpServices";
import UploadFile from "../../../global/uploadFile";
import dayjs from "dayjs";
import VisitType from "../registration/subComp/visitType";

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
    auditMonth: null,
    interested: false,
    quotationAsked: false,
    anoterVisitRequired: false,
    interestedRemark: "",
    visitType: "",
    userId: 0,
    childUserId: [0],
    userName: "",
    visitPhotoUrl: "",
    nextVisitDate: null,
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
          auditMonth: result?.data.auditMonth,
          visitType: result?.data.visitType || "",
          userId: result?.data.userId || userId,
          childUserId: result?.data?.childUserId || [],
          userName: result?.data.userName || userName,
          interested: false,
          quotationAsked: false,
          anoterVisitRequired: false,
          interestedRemark: "",
          visitPhotoUrl: "",
          nextVisitDate: null,
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
  formData.append("interestedRemark", formValues?.interestedRemark);
  formData.append("visitType", formValues?.visitType || null);
  formData.append("userId", userId);
  formData.append(
    "nextVisitDate",
    formValues.nextVisitDate === null
      ? dayjs().add(3, "day").format("YYYY-MM-DD")
      : dayjs(formValues?.nextVisitDate).format("YYYY-MM-DD")
  );
  formData.append(
    "childUserId",
    formValues?.childUserId?.map((item) => item.id).join(",")
  );
  formValues.visitPhotoUrl.file
    ? formData.append("file", formValues.visitPhotoUrl.file)
    : null;

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
      navigate(-1);
    } else if (result && result?.error) {
      enqueueSnackbar("An error occured", {
        variant: "error",
      });
      setIsDisabled(false);
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
          <SelectKam
            formValues={formValues}
            setFormValues={setFormValues}
            property={"childUserId"}
          />
        </Grid>

        <Grid item xs={7} lg={6}>
          <VisitType formValues={formValues} setFormValues={setFormValues} />
        </Grid>

        <Grid item xs={5} lg={6}>
          <GlobalDateLayout
            label={"Next Visit Date"}
            initialDate={formValues.nextVisitDate}
            formValues={formValues}
            setFormValues={setFormValues}
            property={"nextVisitDate"}
            disablePast={true}
            maxNextDays={15}
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
            label="Key Higlights"
            size="small"
            fullWidth
            placeholder="Key Higlights"
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

import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCorpDetails } from "../../../services/salesVisitServices";
import { saveData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import CompanySummaryInfo from "./subComp/companySummaryInfo";
import CompanyVisitDetails from "./subComp/companyVisitDetails";
import AddSpocInVisitDetail from "./subComp/addSpocInVisitDetail";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ServiceInfo from "./subComp/serviceInfo";
import MarkAsLostBtn from "../../../global/markAsLost/markAsLostBtn";

const SalesVisitDetail = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const corpSalesId = itemId;
  const { enqueueSnackbar } = useSnackbar();
  const [corpDetails, setCorpDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showServicesList, setShowServicesList] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [quotationRequired, setQuotationRequired] = useState(false);

  useEffect(() => {
    fetchCorpDetails(setCorpDetails, setIsLoading, corpSalesId);
  }, [corpSalesId, fetch]);

  const handleSubmit = async () => {
    const Obj = {
      quotationRequired: quotationRequired,
      corpSalesId: corpSalesId,
    };
    const url = BASE_URL + "corpSales/markQuotationRequired";
    const result = await saveData(url, Obj);
    if (result && result.data) {
      setQuotationRequired(false);
      enqueueSnackbar("Successfully Saved", {
        variant: "success",
      });

      navigate(-1);
    } else if (result && result.error) {
      enqueueSnackbar("An error occured", {
        variant: "error",
      });
    }
  };
  return (
    <Fragment>
      <CompanySummaryInfo data={corpDetails} />

      <CompanyVisitDetails data={corpDetails} />

      <AddSpocInVisitDetail
        formValues={corpDetails}
        setFormValues={setCorpDetails}
      />

      {/* <Grid
        container
        sx={{
          boxSizing: "border-box",
          background: "#FFFFFF",
          border: "0.5px solid #A6A6A6",
          borderRadius: 5,
          padding: 1,
          marginBlock: 2,
          alignItems: "center",
        }}
      >
        <Grid item xs={8} lg={6}>
          <FormControlLabel
            label="Quotation Required"
            labelPlacement="start"
            control={
              <Box sx={{ marginInline: "10px" }}>
                <IOSSwitch
                  checked={quotationRequired}
                  onChange={(e) => {
                    setQuotationRequired(e.target.checked);
                  }}
                />
              </Box>
            }
          />
        </Grid>
        <Grid
          item
          xs={4}
          lg={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <CustomButtonBlue
            title="Mark"
            onClick={() => {
              handleSubmit();
            }}
          />
        </Grid>
      </Grid> */}
      {/* <Box
        onClick={() => {
          setShowServicesList(!showServicesList);
        }}
        sx={{
          display: "flex",
          minWidth: "300px",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Service Information</Typography>
        <IconButton
          onClick={() => {
            setShowServicesList(!showServicesList);
          }}
        >
          {showServicesList === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Box> */}
      {/* <Box sx={{ marginBottom: 2 }}>
        {showServicesList && ( */}
      <ServiceInfo
        data={corpDetails?.mapOfServiceIdAndInfo}
        setFetch={setFetch}
      />
      {/* )}
      </Box> */}
      <MarkAsLostBtn corpSalesId={corpSalesId} />
    </Fragment>
  );
};

export default SalesVisitDetail;

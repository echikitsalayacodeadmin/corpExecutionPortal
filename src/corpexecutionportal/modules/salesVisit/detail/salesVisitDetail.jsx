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
    setFetch(false);
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
        setFetch={setFetch}
      />

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

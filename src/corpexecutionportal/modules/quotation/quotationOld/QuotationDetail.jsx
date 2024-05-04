import BackButton from "../comps/BackButton";
import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MarkAsLost from "../comps/markAsLost/MarkAsLost";
import { useRouter } from "next/router";
import MarkQuotation from "../comps/MarkQuotation";
import QuotationCompanyDetail from "../comps/QuotationCompanyDetail";
import { useFileUpload } from "use-file-upload";
import { BASE_URL } from "../../../../assets/constants";
import { getData, uploadFile } from "../../../assets/corpServices";
import { useSnackbar } from "notistack";
import CustomButtonBlue from "../../../../assets/customButtonBlue";

const QuotationDetail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [corpSalesId, setCorpSalesId] = useState("");
  const [corpSalesVisitId, setCorpSalesVisitId] = useState("");
  const [quotationId, setQuotationId] = useState("");
  const [fetch, setFetch] = useState(false);
  const [details, setDetails] = useState("");

  useEffect(() => {
    setCorpSalesId(router?.query?.corpSalesId);
  }, [router?.query?.corpSalesId]);

  const fetchData = async () => {
    if (corpSalesId) {
      const url = BASE_URL + "corpSales/" + corpSalesId;
      const result = await getData(url);
      if (result?.data) {
        console.log("SUCCESS", result?.data);
        setDetails(result?.data);
        setFetch(false);
      } else {
        console.log("SUCCESS", result?.error);
      }
    }
  };

  useEffect(() => {
    if (corpSalesId) {
      fetchData();
    }
  }, [corpSalesId, router, fetch]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formValues, setFormValues] = useState({
    quotationApproved: false,
    quotationRemark: "",
  });

  const [files, selectFiles] = useFileUpload();

  const handleUpload = async (name, size, source, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", name);
    const url =
      BASE_URL +
      "corpSales/upload?corpSalesId=" +
      corpSalesId +
      "&fileType=QUOTATION";
    console.log(url);
    const result = await uploadFile(url, formData);
    if (result && result?.data) {
      console.log("SUCCESS POST", result?.data);
      enqueueSnackbar("Succesfully Uploaded", { variant: "success" });
      fetchData();
    } else if (result && result?.error) {
      console.log("ERROR POST", result?.error);
    }
  };

  return (
    <Fragment>
      <QuotationCompanyDetail
        details={details}
        handleOpen={handleOpen}
        setCorpSalesVisitId={setCorpSalesVisitId}
        setQuotationId={setQuotationId}
        setFetch={setFetch}
      />

      <CustomButtonWhite
        title="Add New Visit"
        onClick={() =>
          router.push({
            pathname: "/corpSales/addNewVisit",
            query: { corpSalesId: corpSalesId },
          })
        }
      />

      <CustomButtonBlue
        title="Add Quotation"
        onClick={() =>
          selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
            handleUpload(name, size, source, file);
            console.log("Files Selected", {
              name,
              size,
              source,
              file,
            });
          })
        }
      />

      <MarkAsLost textAlign="center" marginBlock="10px" />

      <MarkQuotation
        open={open}
        handleClose={handleClose}
        corpSalesId={corpSalesId}
        setFetch={setFetch}
        // corpSalesVisitId={corpSalesVisitId}
        quotationId={quotationId}
      />
    </Fragment>
  );
};

export default QuotationDetail;

const styles = {
  heading: {
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "15px",
    color: "#6B6B6B",
    marginBottom: "5px",
  },
  data: {
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "15px",
    color: "#000000",
    marginBottom: "5px",
    marginLeft: "5px",
  },
};

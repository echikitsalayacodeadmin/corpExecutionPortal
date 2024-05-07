import React, { Fragment, useEffect, useRef, useState } from "react";
import Ahc from "./subComp/ahc";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Fab,
  Grid,
  Portal,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BasicInfo from "./subComp/basicInfo";
import Ohc from "./subComp/ohc";
import PdfMain from "./pdfComp/pdfMain";
import { useReactToPrint } from "react-to-print";
import { pdf } from "@react-pdf/renderer";
import MyDocument from "./pdfComp/myDocument";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import { useParams } from "react-router-dom";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomButtonWhite from "../../../../assets/customButtonWhite";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import {
  getData,
  saveData,
  updateData,
  updateDataFile,
} from "../../../assets/corpServices";

const calculateTestListRowFields = (dialogData) => {
  const pricePerEmp = dialogData?.testList?.reduce(
    (total, test) => total + parseInt(test?.quotePrice || 0),
    0
  );

  const totalCost = Math.floor(
    parseInt(dialogData?.noOfEmp) * parseInt(pricePerEmp)
  );

  const updatedTestList = dialogData?.testList?.map((testItem) => {
    const noOfEmp = parseInt(testItem?.noOfEmp) || "";
    const throwAwayPrice = parseInt(testItem?.throwAwayPrice) || "";
    const bestPrice = parseInt(testItem?.bestPrice) || "";
    const quotePrice = parseInt(testItem?.quotePrice) || "";
    const revenue = isNaN(noOfEmp) ? 0 : Math.floor(quotePrice * noOfEmp) || "";
    const marginPercent =
      isNaN(quotePrice) || isNaN(bestPrice)
        ? 0
        : Math.floor(((quotePrice - bestPrice) / quotePrice) * 100);
    const marginPercentTAP =
      isNaN(quotePrice) || isNaN(bestPrice)
        ? 0
        : Math.floor(((throwAwayPrice - bestPrice) / throwAwayPrice) * 100);

    return {
      ...testItem,
      noOfEmp,
      throwAwayPrice,
      bestPrice,
      quotePrice,
      revenue,
      marginPercent,
      marginPercentTAP,
    };
  });

  const updatedTotalCost = Math.floor(
    parseInt(dialogData?.noOfEmp) * parseInt(pricePerEmp)
  );
  const totalRevenue = updatedTestList?.reduce(
    (total, testItem) => total + testItem?.revenue,
    0
  );
  const sumOfCost = updatedTestList?.reduce(
    (total, testItem) => total + testItem?.noOfEmp * testItem?.bestPrice,
    0
  );
  const totalMarginPercent =
    totalRevenue === 0
      ? 0
      : Math.floor(((totalRevenue - sumOfCost) / totalRevenue) * 100);

  return {
    ...dialogData,
    testList: updatedTestList,
    finalPrice: updatedTotalCost || "",
    pricePerEmp,
    totalMarginPercent,
  };
};

const QuotationCreateForm = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { itemId } = useParams();
  const query = JSON.parse(decodeURIComponent(itemId));
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [routerDetail, setRouterDetail] = useState("");
  const [responseId, setResponseId] = useState("");

  console.log({ query });

  useEffect(() => {
    const detail = query;
    setRouterDetail(detail);
    setFormValues({
      ...formValues,
      corpAddress: detail.address,
      corpName: detail.companyName,
      id: detail.quotationId,
    });
    setRole(
      typeof localStorage !== "undefined"
        ? localStorage.getItem("ROLE_CORP_SALES")
        : null
    );
    setUserId(
      typeof localStorage !== "undefined"
        ? localStorage.getItem("USER_ID_CORP_SALES")
        : null
    );
    setUserName(
      typeof localStorage !== "undefined"
        ? localStorage.getItem("USER_NAME_CORP_SALES")
        : null
    );
    setResponseId(
      typeof localStorage !== "undefined"
        ? localStorage.getItem("QUOTATION_ID_RESPONSE_CORPSALES") || ""
        : ""
    );
  }, [itemId]);

  const [formValues, setFormValues] = useState({
    id: "",
    title: "",
    details: `As per our discussion, we have prepared a detailed proposal cum quotation. The proposal consists of the below-mentioned services provided by Uno Care

    1) Annual health check-ups for all employees & canteen staff
    2) Health awareness program
    3) OHC Furniture and Equipment
    4) OHC staff - Doctor and nursing staff
    5) Ambulance Services
    6) First-Aid Kit (including Monthly Medicines)
    7) First-Aid training
    8) Emergency services
    9) Care coordination`,
    finalPrice: "",
    systemPrice: "",
    corpName: "",
    corpAddress: "",
    corpSpoc: "",
    noOfEmp: "",
    noOfStaff: "",
    createdBy: "",
    createdByName: "",
    approvedBy: "",
    approvedByName: "",
    quotationDate: null,
    quotationExpirationDate: null,
    quotationStatus: "",
    quotationTableDataVMS: [
      {
        details: `1) Annual Health Checkup

    (i) All the tests will be conducted via Authorized laboratory only.
    (ii) All tests will be conducted at the company’s premises on the company's decided schedule.
    (iii) All the test reports will be available DIGITALLY at Uno Care’s Health Dashboard.

Please call us at 1800-889-0189 to experience  Uno Care’s Digital Platform, which enables efficient medical health record keeping and provides visible insights regarding employees’ health status.`,
        disclaimer: "",
        sequence: "",
        tableUrl: "",
        tableTitle: "",
        disclaimer: "",
        quotationDataType: "AHC",
        noOfEmp: "",
        systemPrice: "",
        bestPrice: "",
        quotationDataVMS: [],
      },
    ],
    ohcVM: {
      title: "",
      details: "",
      disclaimer: "",
      ohcTableUrl: "",
      ohcCategoryVMS: [],
    },
    corpId: "",
    quotationUrl: "",
    createdDate: "",
    lastModifiedDate: "",
    isActive: true,
  });

  console.log({ routerDetail, responseId });

  const [qoutationDetails, setQoutationDetails] = useState("");
  const fetchQouatationForm = async () => {
    if (responseId || routerDetail?.quotationId) {
      setIsLoading(true);
      const url =
        BASE_URL +
        `quotation/id?quotationId=${responseId || routerDetail?.quotationId}`;
      const response = await getData(url);
      if (response?.data) {
        setQoutationDetails(response?.data);
        const formData = response?.data;
        setFormValues({
          ...formValues,
          id: routerDetail.copyQuotation === "true" ? null : formData.id,
          title: formData.title,
          details: formData.details,
          corpName: formData.corpName,
          corpAddress: formData.corpAddress,
          corpSpoc: formData.corpSpoc,
          noOfEmp: formData.noOfEmp,
          noOfStaff: formData.noOfStaff,
          quotationDate: formData.quotationDate,
          quotationExpirationDate: formData.quotationExpirationDate,
          createdBy: formData.createdBy,
          createdByName: formData.createdByName,
          approvedBy: formData.approvedBy,
          approvedByName: formData.approvedByName,
          quotationStatus:
            routerDetail.copyQuotation === "true"
              ? "PENDING"
              : formData.quotationStatus || null,
          createdDate: formData.createdDate,
          lastModifiedDate: formData.lastModifiedDate,
          quotationTableDataVMS: formData.quotationTableDataVMS,
          ohcVM: {
            title: formData.ohcVM.title,
            details: formData.ohcVM.details,
            disclaimer: formData.ohcVM.disclaimer,
            ohcTableUrl: formData.ohcVM.ohcTableUrl,
            ohcCategoryVMS: formData.ohcVM.ohcCategoryVMS.map(
              (item, index) => ({
                id: index,
                categoryTitle: item.categoryTitle,
                sequence: item.sequence,
                ohcPackageVMS: item.ohcPackageVMS.map((subItem, subIndex) => ({
                  id: subIndex,
                  packageTitle: subItem.packageTitle,
                  packageName: subItem.packageName,
                  packageDescription: subItem.packageDescription,
                  noOfStaff: subItem.noOfStaff,
                  perMonthCost: subItem.perMonthCost,
                  totalCostPerMonth: subItem.totalCostPerMonth,
                  sequence: subItem.sequence,
                })),
              })
            ),
          },
          quotationUrl: formData.quotationUrl || "",
        });
        setIsLoading(false);
        setFormValues((formValues) => ({
          ...formValues,
          quotationTableDataVMS: [
            {
              ...formValues.quotationTableDataVMS[0],
              quotationDataVMS:
                formValues.quotationTableDataVMS[0].quotationDataVMS?.map(
                  (item) => calculateTestListRowFields(item)
                ),
            },
          ],
        }));
      } else {
        console.error("Error fetching data:", response?.error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (responseId || routerDetail?.quotationId) {
      fetchQouatationForm();
    }
  }, [responseId, routerDetail]);

  const handleSave = async () => {
    setIsLoading(true);
    const url = BASE_URL + "quotation/service/corp/addquotation";
    const Obj = {
      id: formValues.id === "" ? null : formValues.id,
      title: formValues.title,
      corpName: formValues.corpName,
      details: formValues.details,
      corpAddress: formValues.corpAddress,
      corpSpoc: formValues.corpSpoc,
      noOfEmp: formValues.noOfEmp,
      noOfStaff: formValues.noOfStaff,
      createdBy: userId,
      createdByName: userName,
      quotationDate: formValues.quotationDate,
      quotationExpirationDate: formValues.quotationExpirationDate,
      quotationStatus: "PENDING",
      quotationTableDataVMS: formValues.quotationTableDataVMS,
      ohcVM: formValues.ohcVM,
      corpId: routerDetail?.corpId,
      quotationUrl: formValues.quotationUrl,
      isActive: true,
    };
    const result = await saveData(url, Obj);
    if (result && result.data) {
      localStorage.setItem("QUOTATION_ID_RESPONSE_CORPSALES", result?.data?.id);
      setResponseId(result.data.id || "");
      fetchQouatationForm();
      enqueueSnackbar("Successfully Saved!", {
        variant: "success",
      });
      setIsLoading(false);
    } else if (result && result.error) {
      enqueueSnackbar("An Error Occured!", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  const handleMarkApprovalStatus = async (status) => {
    const url =
      BASE_URL +
      `quotation/update/status?quotationStatus=${status}&quotationId=${responseId}&authId=${userId}&name=${userName}`;

    const result = await updateData(url, "");
    if (result && result?.data) {
      enqueueSnackbar("Approved Successfully!", {
        variant: "success",
      });
      fetchQouatationForm();
    } else {
      enqueueSnackbar("An error Occured!", {
        variant: "error",
      });
    }
  };

  const handleUpload = async (name, size, source, file, type) => {
    const formData = new FormData();
    formData.append("files", file);
    const url =
      BASE_URL +
      `quotation/upload/quotationimages?quotationId=${quotationId}&corpId=${corpId}&quotationDataTypes=${type}`;
    const result = await updateDataFile(url, formData);
    if (result && result?.data) {
      console.log("SUCCESS POST", result?.data);
      enqueueSnackbar("Successfully Saved!", {
        variant: "success",
      });
      fetchQouatationForm();
    } else if (result && result?.error) {
      console.log("ERROR POST", result?.error);
      enqueueSnackbar("An Error Occured!", {
        variant: "error",
      });
    }
  };

  const [openPdf, setOpenPdf] = useState(false);
  const handleOpenPdf = () => {
    setOpenPdf(true);
  };
  const handleClosePdf = () => {
    setOpenPdf(false);
  };

  console.log({ formValues });

  const handleConvertToBlob = async () => {
    const blob = await pdf(<MyDocument data={formValues} />).toBlob();
    const url =
      BASE_URL +
      `quotation/upload?quotationId=${
        routerDetail?.quotationId || responseId
      }&corpId=${routerDetail?.corpId}`;
    const formData = new FormData();
    formData.append("file", blob, "filename.pdf");

    const result = await updateDataFile(url, formData);
    if (result && result.data) {
      enqueueSnackbar("Successfully Uploaded Quotation PDF!", {
        variant: "success",
      });
      fetchQouatationForm();
    } else {
      enqueueSnackbar("An error Occurred!", {
        variant: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Quotation Create">
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => {
            handleOpenPdf();
          }}
          sx={{
            position: "fixed",
            top: 100,
            right: 10,
            zIndex: 1000,
          }}
        >
          <RemoveRedEyeIcon />
        </Fab>
        {/* <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={() => {
          handlePrint();
        }}
        sx={{
          position: "fixed",
          top: 100,
          right: 10,
          zIndex: 1000,
        }}
      >
        <RemoveRedEyeIcon />
      </Fab> */}
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <BasicInfo
              data={qoutationDetails}
              corpSalesId={routerDetail?.corpId}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Ahc
              handleUpload={handleUpload}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Ohc
              handleUpload={handleUpload}
              formValues={formValues}
              setFormValues={setFormValues}
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
            <CustomButtonBlue
              title={"Save"}
              onClick={handleSave}
              styles={{ width: "200px" }}
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
            <CustomButtonBlue
              title={"View PDF"}
              onClick={handleOpenPdf}
              styles={{ width: "200px" }}
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
            <CustomButtonBlue
              disabled={responseId ? false : true}
              title={"Upload Quotation PDF"}
              onClick={() => handleConvertToBlob()}
              styles={{ width: "200px" }}
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
            {role === "CORPSALES_USER" && (
              <CustomButtonWhite
                disabled={
                  responseId === "" ||
                  formValues.quotationStatus === null ||
                  formValues.quotationStatus !== "PENDING"
                    ? true
                    : false
                }
                textColor={
                  responseId === "" ||
                  formValues.quotationStatus === null ||
                  formValues.quotationStatus !== "PENDING"
                    ? "lightgrey"
                    : "#127DDD"
                }
                title={"Send To Approval"}
                onClick={() => {
                  handleMarkApprovalStatus("PENDING_APPROVAL");
                }}
                styles={{ width: "200px" }}
              />
            )}
          </Grid>
        </Grid>

        <Portal>
          <Dialog
            fullWidth={true}
            maxWidth={false}
            open={openPdf}
            onClose={handleClosePdf}
          >
            <DialogContent sx={{ height: "80vh" }}>
              <PdfMain data={formValues} />
            </DialogContent>
          </Dialog>
        </Portal>
        <Box component={"iframe"} sx={{ width: 0, height: 0, display: "none" }}>
          <Box
            ref={componentRef}
            sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }}
          >
            {/* <MobileQuotationTemplate data={formValues} /> */}
          </Box>
        </Box>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default QuotationCreateForm;

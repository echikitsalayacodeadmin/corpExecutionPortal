import React, { Fragment, useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Fab,
  Grid,
  IconButton,
  Modal,
  Portal,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { pdf } from "@react-pdf/renderer";
import BasicInfo from "./subComp/basicInfo";
import CloseIcon from "@mui/icons-material/Close";
import Ahc from "./subComp/ahc";
import Ohc from "./subComp/ohc";
import MyDocument from "./pdfComp/myDocument";
import PdfMain from "./pdfComp/pdfMain";
import {
  getData,
  updateData,
  updateDataFile,
} from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomButtonWhite from "../../../../assets/customButtonWhite";

import { useParams } from "react-router-dom";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { isMobile } from "react-device-detect";

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
        : Math.floor(((quotePrice - bestPrice) / quotePrice) * 100) || "";
    const marginPercentTAP =
      isNaN(quotePrice) || isNaN(bestPrice)
        ? 0
        : Math.floor(((throwAwayPrice - bestPrice) / throwAwayPrice) * 100) ||
          "";

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
    pricePerEmp: totalMarginPercent || "",
    totalMarginPercent: totalMarginPercent || "",
  };
};

const QuotationUpdateForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { itemId } = useParams();
  const query = JSON.parse(decodeURIComponent(itemId));
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [routerDetail, setRouterDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  }, [itemId]);

  const [formValues, setFormValues] = useState({
    id: "",
    title: "",
    details: "",
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
        details: "",
        disclaimer: "",
        sequence: "",
        tableUrl: "",
        tableTitle: "",
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

  const [qoutationDetails, setQoutationDetails] = useState("");
  const fetchQouatationForm = async () => {
    if (routerDetail?.quotationId) {
      setIsLoading(true);
      const url =
        BASE_URL + "quotation/id?quotationId=" + routerDetail.quotationId;
      const response = await getData(url);
      if (response?.data) {
        setQoutationDetails(response?.data);
        const formData = response?.data;
        setFormValues({
          ...formValues,
          id: routerDetail.copyQuotation === "true" ? null : formData.id,
          title: formData.title,
          corpName: formData.corpName,
          details: formData.details,
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
          quotationStatus: formData.quotationStatus,
          createdDate: formData.createdDate,
          lastModifiedDate: formData.lastModifiedDate,
          quotationTableDataVMS: formData?.quotationTableDataVMS,
          ohcVM: formData?.ohcVM && {
            title: formData?.ohcVM?.title,
            details: formData?.ohcVM?.details,
            disclaimer: formData?.ohcVM?.disclaimer,
            ohcTableUrl: formData?.ohcVM?.ohcTableUrl,
            ohcCategoryVMS: formData?.ohcVM?.ohcCategoryVMS?.map(
              (item, index) => ({
                id: index,
                categoryTitle: item.categoryTitle,
                sequence: item.sequence,
                ohcPackageVMS: item?.ohcPackageVMS?.map(
                  (subItem, subIndex) => ({
                    id: subIndex,
                    packageTitle: subItem.packageTitle,
                    packageName: subItem.packageName,
                    packageDescription: subItem.packageDescription,
                    noOfStaff: subItem.noOfStaff,
                    perMonthCost: subItem.perMonthCost,
                    totalCostPerMonth: subItem.totalCostPerMonth,
                    sequence: subItem.sequence,
                  })
                ),
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
              ...formValues?.quotationTableDataVMS?.[0],
              quotationDataVMS:
                formValues?.quotationTableDataVMS?.[0]?.quotationDataVMS?.map(
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
    fetchQouatationForm();
  }, [routerDetail?.quotationId]);

  const handleUpdateQouatation = async () => {
    const url = BASE_URL + "quotation/service/corp/updatequotation";
    const Obj = {
      id: formValues.id,
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
      quotationStatus: formValues.quotationStatus,
      quotationTableDataVMS:
        formValues?.quotationTableDataVMS?.[0]?.quotationDataVMS?.length > 0
          ? formValues?.quotationTableDataVMS
          : null,
      ohcVM:
        formValues?.ohcVM?.ohcCategoryVMS?.length > 0
          ? formValues?.ohcVM
          : null,
      corpId: routerDetail?.corpId,
      quotationUrl: formValues.quotationUrl,
      isActive: true,
    };
    const result = await updateData(url, Obj);
    if (result && result.data) {
      enqueueSnackbar("Successfully Saved!", {
        variant: "success",
      });

      fetchQouatationForm();
    } else if (result && result.error) {
      enqueueSnackbar("An Error Occured!", {
        variant: "error",
      });
    }
  };

  const [selectedStaus, setSelectedStatus] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);
  const handleOpenStatus = () => {
    setOpenStatus(true);
  };

  const handleCloseStatus = () => {
    setOpenStatus(false);
  };

  const handleMarkApprovalStatus = async (status) => {
    const url =
      BASE_URL +
      `quotation/update/status?quotationStatus=${
        selectedStaus?.value || status
      }&quotationId=${qoutationDetails?.id}&authId=${userId}&name=${userName}`;

    const result = await updateData(url, "");
    if (result && result?.data) {
      enqueueSnackbar("Approved Successfully!", {
        variant: "success",
      });
      fetchQouatationForm();
      setSelectedStatus(null);
      handleCloseStatus();
    } else {
      enqueueSnackbar("An error Occured!", {
        variant: "error",
      });
    }
  };

  const handleConvertToBlob = async () => {
    const blob = await pdf(<MyDocument data={formValues} />).toBlob();
    const url =
      BASE_URL +
      `quotation/upload?quotationId=${routerDetail?.quotationId}&corpId=${routerDetail?.corpId}`;
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

  const handleMarkSendToApproval = async (status) => {
    const url =
      BASE_URL +
      `quotation/update/status?quotationStatus=${status}&quotationId=${routerDetail?.quotationId}&authId=${userId}&name=${userName}`;

    const result = await updateData(url, "");
    if (result && result?.data) {
      enqueueSnackbar("Sent For Approval!", {
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
      `quotation/upload/quotationimages?quotationId=${qoutationDetails.id}&corpId=${qoutationDetails.corpId}&quotationDataTypes=${type}`;
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

  const generatePdfUrlForMobile = async () => {
    const blob = await pdf(<MyDocument data={formValues} />).toBlob();
    const blobURL = URL.createObjectURL(blob);
    if (blobURL) {
      window.open(blobURL, "_blank");
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
      <MainPageLayoutWithBack title="Quotation Update">
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => {
            if (isMobile) {
              generatePdfUrlForMobile();
            } else {
              handleOpenPdf();
            }
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
              onClick={handleUpdateQouatation}
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
              onClick={() => {
                if (isMobile) {
                  generatePdfUrlForMobile();
                } else {
                  handleOpenPdf();
                }
              }}
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
            {role === "CORPSALES_ADMIN" && (
              <CustomButtonWhite
                title={"Mark Quotation Status"}
                onClick={() => {
                  handleOpenStatus();
                }}
                styles={{ width: "200px" }}
              />
            )}
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
            {role === "CORPSALES_USER" &&
              formValues.quotationStatus === "PENDING" && (
                <CustomButtonWhite
                  disabled={
                    formValues.quotationStatus === null ||
                    formValues.quotationStatus !== "PENDING"
                      ? true
                      : false
                  }
                  textColor={
                    formValues.quotationStatus === null ||
                    formValues.quotationStatus !== "PENDING"
                      ? "lightgrey"
                      : "#127DDD"
                  }
                  title={"Send To Approval"}
                  onClick={() => {
                    handleMarkSendToApproval("PENDING_APPROVAL");
                  }}
                  styles={{ width: "200px" }}
                />
              )}
          </Grid>
        </Grid>

        <Portal>
          <Modal
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            open={openStatus}
            onClose={handleCloseStatus}
            sx={{
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(187, 187, 187, 0.1)",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                padding: "15px",
                width: "365px",
              }}
            >
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={handleCloseStatus}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Typography
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "13px",
                  lineHeight: "15px",
                  color: "#000000",
                  marginTop: "-25px",
                  marginBottom: "10px",
                }}
              >
                Mark Quotation Status
              </Typography>
              <Grid
                container
                sx={{ justifyContent: "space-between", marginTop: "20px" }}
                spacing={2}
              >
                <Grid item xs={12} lg={12}>
                  <CustomAutocomplete
                    options={[
                      { label: "Approved", value: "APPROVED" },
                      { label: "Rejected", value: "REJECTED" },
                      // { label: "Pending", value: "PENDING" },
                    ]}
                    placeholder={"Select Status"}
                    label={"Select Status"}
                    value={selectedStaus || null}
                    onChange={(event, newValue, reason) => {
                      setSelectedStatus(newValue);
                      if (reason === "clear") {
                        setSelectedStatus(null);
                      }
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
                  {role === "CORPSALES_ADMIN" && (
                    <CustomButtonBlue
                      title={"Save"}
                      onClick={() => handleMarkApprovalStatus()}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Portal>
        <Portal>
          <Dialog
            fullWidth={true}
            maxWidth={false}
            open={openPdf}
            onClose={handleClosePdf}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <IconButton onClick={handleClosePdf}>
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent sx={{ height: "80vh" }}>
              <PdfMain data={formValues} />
            </DialogContent>
          </Dialog>
        </Portal>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default QuotationUpdateForm;

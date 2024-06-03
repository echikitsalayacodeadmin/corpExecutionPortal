import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Portal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SaveIcon from "@mui/icons-material/Save";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import ViewAllQuotation from "./viewAllQuotation";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../../assets/constants";
import { getData, saveData } from "../../../../assets/corpServices";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";
import { CustomTypographyBold } from "../../../../../assets/customTypography";
import GlobalDateLayout from "../../../../../assets/globalDateLayout/globalDateLayout";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";
import dayjs from "dayjs";
import { isBrowser, isDesktop, isMobile } from "react-device-detect";

const ServiceInfo = ({ data }) => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const corpSalesId = itemId;
  const userId = localStorage.getItem("USER_ID_CORP_SALES");
  const userName = localStorage.getItem("USER_NAME_CORP_SALES");
  const { enqueueSnackbar } = useSnackbar();
  // const [selectedRow, setSelectedRow] = useState("");
  const [showServices, setShowServices] = useState(false);
  const [rows, setRows] = useState([]);

  const fetchServices = async () => {
    const url = BASE_URL + "corpSales/services";
    const result = await getData(url);
    if (result.data) {
      console.log({ data });
      const temp = result.data.map((item) => ({
        ...item,
        testName: item.serviceName,
        user: data?.[item.id]?.user,
        list: data?.[item.id]?.list,
        userSelectedDate: data?.[item.id]?.userSelectedDate
          ? data?.[item.id]?.userSelectedDate
          : null, //
        decisionMakingCriteria: data?.[item.id]?.decisionMakingCriteria,
        monthlyInflowNoOfEmp: data?.[item.id]?.monthlyInflowNoOfEmp,
        closureProcedure: data?.[item.id]?.closureProcedure,
        dueDate: data?.[item.id]?.dueDate,
        frequency: data?.[item.id]?.frequency,
        location: data?.[item.id]?.location,
        serviceProvider: data?.[item.id]?.serviceProvider,
        oldRate: data?.[item.id]?.oldRate,
        interestReason: data?.[item.id]?.interestReason,
        decisionOwner: data?.[item.id]?.decisionOwner,
        painPoint: data?.[item.id]?.painPoint,
        reasonForStarting: data?.[item.id]?.reasonForStarting,
        tentativeBudget: data?.[item.id]?.tentativeBudget,
        degree: data?.[item.id]?.degree,
        timings: data?.[item.id]?.timings,
        monthlyConsumption: data?.[item.id]?.monthlyConsumption,
        orderCycle: data?.[item.id]?.orderCycle,
        reasonForShift: data?.[item.id]?.reasonForShift,
        remark: data?.[item.id]?.remark,
        csrExecutedBy: data?.[item.id]?.csrExecutedBy,
        typeOfTraining: data?.[item.id]?.typeOfTraining,
        noOfPeople: data?.[item.id]?.noOfPeople,
        typeOfService: data?.[item.id]?.typeOfService,
        typeOfPolicy: data?.[item.id]?.typeOfPolicy,
        numberOfLives: data?.[item.id]?.numberOfLives,
        insuranceRequestType: data?.[item.id]?.insuranceRequestType,
        status: data?.[item.id]?.status,
        userId: data?.[item.id]?.userId,
        userName: data?.[item.id]?.userName,
        confidenceLeveLStatus: data?.[item.id]?.confidenceLeveLStatus,
        revenueType: data?.[item.id]?.revenueType,
        approxRevenueAmount: data?.[item.id]?.approxRevenueAmount,
      }));
      setRows(temp);
    } else {
      setRows([]);
    }
  };
  useEffect(() => {
    fetchServices();
  }, [data]);

  const handleSave = async (data) => {
    const obj = {
      user: data.user || null,
      list: data.list || null,
      userSelectedDate: data?.userSelectedDate ? data?.userSelectedDate : null, //
      decisionMakingCriteria: data.decisionMakingCriteria || null,
      closureProcedure: data.closureProcedure || null,
      monthlyInflowNoOfEmp: data.monthlyInflowNoOfEmp || null,
      dueDate: data.dueDate || null,
      frequency: data.frequency || null,
      location: data.location || null,
      serviceProvider: data.serviceProvider || null,
      oldRate: data.oldRate || null,
      interestReason: data.interestReason || null,
      decisionOwner: data.decisionOwner || null,
      painPoint: data.painPoint || null,
      reasonForStarting: data.reasonForStarting || null,
      tentativeBudget: data.tentativeBudget || null,
      degree: data.degree || null,
      timings: data.timings || null,
      monthlyConsumption: data.monthlyConsumption || null,
      orderCycle: data.orderCycle || null,
      reasonForShift: data.reasonForShift || null,
      remark: data.remark || null,
      csrExecutedBy: data.csrExecutedBy || null,
      typeOfTraining: data.typeOfTraining || null,
      noOfPeople: data.noOfPeople || null,
      typeOfService: data.typeOfService || null,
      typeOfPolicy: data.typeOfPolicy || null,
      numberOfLives: data.numberOfLives || null,
      insuranceRequestType: data.insuranceRequestType || null,
      status: data.status || null,
      userId: userId || null,
      userName: userName || null,
      confidenceLeveLStatus: data.confidenceLeveLStatus || null,
      revenueType: data.revenueType || null,
      approxRevenueAmount: data.approxRevenueAmount || null,
    };

    const url =
      BASE_URL +
      `corpSales/service/info?corpId=${corpSalesId}&serviceId=${data?.id}`;
    const result = await saveData(url, obj);
    if (result.data) {
      enqueueSnackbar("Successfully Saved", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("An Error Occured.", {
        variant: "error",
      });
    }
  };

  console.log({ rows });

  const checkFields = (data) => {
    const fieldsNotToCheck = [
      "serviceName",
      "id",
      "testName",
      "status",
      "confidenceLeveLStatus",
      "userId",
      "userName",
      "userSelectedDate",
    ];
    console.log({ Hello: data });
    const fieldsToCheck = Object.keys(data).filter(
      (field) => !fieldsNotToCheck.includes(field)
    );
    const allFieldsNull = fieldsToCheck.every(
      (field) => data[field] === undefined
    );
    console.log({ allFieldsNull });
    return allFieldsNull;
  };

  return (
    <Fragment>
      <Box sx={{}}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <Box
              onClick={() => {
                setShowServices(!showServices);
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
              <Typography sx={{ fontWeight: "bold" }}>
                Services Information
              </Typography>

              <IconButton
                onClick={() => {
                  setShowServices(!showServices);
                }}
              >
                {showServices === false ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )}
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {showServices &&
          rows.map((obj) => (
            <Grid
              container
              columnSpacing={1}
              rowSpacing={2}
              key={obj.id}
              sx={{
                background: "#FFFFFF",
                border: "1px solid #000",
                marginBlock: "20px",
                padding: "10px",
                alignItems: "center",
                borderRadius: "15px",
              }}
            >
              <Grid item xs={12} lg={12}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {obj.testName}
                </Typography>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {obj?.user?.replace(/_/g, " ")?.toLowerCase()}
                </Typography>
              </Grid>

              <Grid item xs={8} lg={2}>
                <GlobalDateLayout
                  label={"Date"}
                  property={"userSelectedDate"}
                  initialDate={obj?.userSelectedDate}
                  onChange={(newValue) => {
                    console.log({ DATESERVICE: newValue.format("YYYY-MM-DD") });
                    const updatedRows = rows.map((row) =>
                      row.id === obj.id
                        ? {
                            ...obj,
                            userSelectedDate: newValue.format("YYYY-MM-DD"),
                          }
                        : row
                    );
                    setRows(updatedRows);
                  }}
                  disableFuture={true}
                />
              </Grid>

              <Grid item xs={8} lg={2}>
                <CustomAutocomplete
                  fullWidth
                  size="small"
                  options={[
                    "INTERESTED",
                    "NOT_INTERESTED",
                    "ONE_MORE_MEETING",
                    "QUOTATION_ASKED",
                    "QUOTATION_SENT",
                    "NEGOTIATION",
                    "QUOTATION_APPROVED",
                    "QUOTATION_REJECTED",
                    "CENTRAL_DECISION_MAKING",
                    "ORDER_LOST",
                    "DATA_AWAITED",
                    ...(obj.id === 145889
                      ? [
                          "AGREEMENT_SENT",
                          "AGREEMENT_SIGNED",
                          "DISCUSSED",
                          "YET_TO_DISCUSSED",
                        ]
                      : []),
                  ]}
                  getOptionLabel={(option) => option}
                  value={obj?.status || ""}
                  onChange={(event, newValue, reason) => {
                    const updatedRows = rows.map((row) =>
                      row.id === obj.id ? { ...obj, status: newValue } : row
                    );
                    setRows(updatedRows);
                    if (reason === "clear") {
                      const updatedRows = rows.map((row) =>
                        row.id === obj.id
                          ? {
                              ...obj,
                              status: null,
                            }
                          : row
                      );
                      setRows(updatedRows);
                    }
                  }}
                  label="Status"
                  placeholder="Status"
                />
              </Grid>
              {isMobile && (
                <Grid
                  item
                  xs={4}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tooltip title="More Info">
                    <IconButton
                      onClick={() => {
                        console.log({ obj });
                        const query = {
                          data: obj,
                          corpId: corpSalesId,
                        };
                        navigate(
                          `/corp/salesvisit/serviceform/${encodeURIComponent(
                            JSON.stringify(query)
                          )}`
                        );
                      }}
                    >
                      <InfoIcon
                        style={{ color: checkFields(obj) ? "red" : "#127DDD" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <CustomButtonBlue
                    onClick={() => {
                      const query = {
                        serviceId: obj.id,
                        corpId: corpSalesId,
                        serviceName: obj.testName,
                      };
                      navigate(
                        `/corp/salesvisit/serviceslogs/${encodeURIComponent(
                          JSON.stringify(query)
                        )}`
                      );
                    }}
                    title="View"
                  />
                </Grid>
              )}
              <Grid item xs={8} lg={2}>
                <CustomAutocomplete
                  fullWidth
                  size="small"
                  options={[
                    "CONFIRMED",
                    "GOOD_CONFIDENCE",
                    "MAY_BE",
                    "DIFFICULT",
                    "LOST",
                    "DONE",
                    "JUST_A_LEAD",
                    "VENDOR_REGISTRATION_STARTED",
                    "DUE_LATER",
                  ]}
                  getOptionLabel={(option) => option}
                  value={obj?.confidenceLeveLStatus || ""}
                  onChange={(event, newValue, reason) => {
                    const updatedRows = rows.map((row) =>
                      row.id === obj.id
                        ? { ...obj, confidenceLeveLStatus: newValue }
                        : row
                    );
                    setRows(updatedRows);
                    if (reason === "clear") {
                      const updatedRows = rows.map((row) =>
                        row.id === obj.id
                          ? {
                              ...obj,
                              confidenceLeveLStatus: null,
                            }
                          : row
                      );
                      setRows(updatedRows);
                    }
                  }}
                  label="Confidence level"
                  placeholder="Confidence level"
                />
              </Grid>

              <Grid item xs={4} lg={2}>
                <IconButton
                  sx={{
                    ":disabled": {
                      backgroundColor: obj.status ? null : "lightgray",
                    },
                  }}
                  disabled={obj.status ? false : true}
                  onClick={() => {
                    handleSave(obj);
                  }}
                >
                  <SaveIcon
                    style={{
                      color: obj.status ? "#127DDD" : "#FFF",
                    }}
                  />
                </IconButton>
              </Grid>
              {isDesktop && (
                <Grid
                  item
                  lg={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tooltip title="More Info">
                    <IconButton
                      onClick={() => {
                        console.log({ obj });
                        const query = {
                          data: obj,
                          corpId: corpSalesId,
                        };
                        navigate(
                          `/corp/salesvisit/serviceform/${encodeURIComponent(
                            JSON.stringify(query)
                          )}`
                        );
                      }}
                    >
                      <InfoIcon
                        style={{ color: checkFields(obj) ? "red" : "#127DDD" }}
                      />
                    </IconButton>
                  </Tooltip>

                  <CustomButtonBlue
                    onClick={() => {
                      const query = {
                        serviceId: obj.id,
                        corpId: corpSalesId,
                        serviceName: obj.testName,
                      };
                      navigate(
                        `/corp/salesvisit/serviceslogs/${encodeURIComponent(
                          JSON.stringify(query)
                        )}`
                      );
                    }}
                    title="View"
                  />
                </Grid>
              )}
            </Grid>
          ))}
      </Box>
    </Fragment>
  );
};

export default ServiceInfo;

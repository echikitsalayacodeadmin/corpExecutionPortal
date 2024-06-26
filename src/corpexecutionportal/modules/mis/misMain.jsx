import React, { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import { Box, CircularProgress, Grid } from "@mui/material";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import GlobalDateLayout from "../../../assets/globalDateLayout/globalDateLayout";
import { fetchServices } from "../../services/misServices";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/corpServices";
import { useSnackbar } from "notistack";
import { downloadCsv } from "../../../assets/utils";
import dayjs from "dayjs";
import SelectCorp from "./subComp/selectCorp";
import SelectFeedbackType from "./subComp/selectFeedbackType";

const columns = {
  62502: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "list",
    "closureProcedure",
    "decisionMakingCriteria",
    "dueDate",
    "frequency",
    "location",
    "decisionOwner",
    "user",
    "serviceProvider",
    "oldRate",
    "interestReason",
    "painPoint",
    "reasonForStarting",
    "tentativeBudget",
    "confidenceLeveLStatus",
    "status",
  ],
  62503: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "list",
    "closureProcedure",
    "decisionMakingCriteria",
    "monthlyInflowNoOfEmp",
    "dueDate",
    "frequency",
    "location",
    "decisionOwner",
    "user",
    "serviceProvider",
    "oldRate",
    "interestReason",
    "painPoint",
    "reasonForStarting",
    "tentativeBudget",
    "confidenceLeveLStatus",
    "status",
  ],
  62507: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "degree",
    "closureProcedure",
    "decisionMakingCriteria",
    "dueDate",
    "timings",
    "frequency",
    "location",
    "decisionOwner",
    "user",
    "serviceProvider",
    "reasonForShift",
    "tentativeBudget",
    "painPoint",
    "reasonForStarting",
    "tentativeBudget",
    "confidenceLeveLStatus",
    "status",
  ],
  62506: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "degree",
    "closureProcedure",
    "decisionMakingCriteria",
    "dueDate",
    "timings",
    "frequency",
    "location",
    "decisionOwner",
    "user",
    "serviceProvider",
    "reasonForShift",
    "tentativeBudget",
    "painPoint",
    "reasonForStarting",
    "tentativeBudget",
    "confidenceLeveLStatus",
    "status",
  ],
  62508: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "serviceProvider",
    "reasonForShift",
    "closureProcedure",
    "decisionMakingCriteria",
    "list",
    "monthlyConsumption",
    "orderCycle",
    "dueDate",
    "decisionOwner",
    "confidenceLeveLStatus",
    "status",
  ],
  62510: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "typeOfService",
    "csrExecutedBy",
    "tentativeBudget",
    "frequency",
    "decisionMakingCriteria",
    "dueDate",
    "remark",
    "decisionOwner",
    "user",
    "serviceProvider",
    "oldRate",
    "interestReason",
    "painPoint",
    "reasonForStarting",
    "tentativeBudget",
    "confidenceLeveLStatus",
    "status",
  ],
  62511: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "list",
    "closureProcedure",
    "decisionMakingCriteria",
    "frequency",
    "decisionOwner",
    "user",
    "serviceProvider",
    "oldRate",
    "interestReason",
    "painPoint",
    "reasonForStarting",
    "tentativeBudget",
    "confidenceLeveLStatus",
    "status",
  ],
  62509: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "typeOfTraining",
    "closureProcedure",
    "decisionMakingCriteria",
    "frequency",
    "noOfPeople",
    "decisionOwner",
    "user",
    "serviceProvider",
    "oldRate",
    "interestReason",
    "painPoint",
    "reasonForStarting",
    "tentativeBudget",
    "confidenceLeveLStatus",
    "status",
  ],
  62505: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "typeOfService",
    "remark",
    "tentativeBudget",
    "confidenceLeveLStatus",
    "status",
  ],
  62504: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "typeOfService",
    "insuranceRequestType",
    "numberOfLives",
    "typeOfPolicy",
    "decisionOwner",
    "user",
    "serviceProvider",
    "oldRate",
    "dueDate",
    "interestReason",
    "painPoint",
    "reasonForStarting",
    "tentativeBudget",
    "confidenceLeveLStatus",
    "status",
  ],
  default: [
    "corpName",
    "address",
    "onRollEmployees",
    "offRollEmployees",
    "noOfPlants",
    "serviceProvider",
    "oldRate",
    "Due Date",
    "remark",
    "confidenceLeveLStatus",
    "status",

    // "user",
    // "list",
    // "decisionMakingCriteria",
    // "closureProcedure",
    // "dueDate",
    // "date",
    // "monthlyInflowNoOfEmp",
    // "frequency",
    // "location",
    // "serviceProvider",
    // "oldRate",
    // "interestReason",
    // "decisionOwner",
    // "painPoint",
    // "reasonForStarting",
    // "tentativeBudget",
    // "degree",
    // "timings",
    // "monthlyConsumption",
    // "orderCycle",
    // "reasonForShift",
    // "remark",
    // "csrExecutedBy",
    // "typeOfTraining",
    // "noOfPeople",
    // "typeOfService",
    // "typeOfPolicy",
    // "numberOfLives",
    // "insuranceRequestType",
    // "status",
    // "userId",
    // "userName",
    // "confidenceLeveLStatus",
  ],
};

const transformCorpSalesDumpData = (data) => {
  return data?.map((item) => ({
    isActive: item.isActive,
    id: item.id,
    corpName: item.corpName,
    corpId: item.corpId,
    photoUrl: item.photoUrl,
    onRollEmployees: item.onRollEmployees,
    offRollEmployees: item.offRollEmployees,
    noOfPlants: item.noOfPlants,
    auditMonth: item.auditMonth,
    address: item.address,
    interested: item.interested,
    interestedRemark: item.interestedRemark,
    status: item.status,
    userId: item.userId,
    date: item.date,
    lastVisitDate: item.lastVisitDate,
    lastvisitDateTimeStamp: item.lastvisitDateTimeStamp,
    totalVisits: item.totalVisits,
    location: item.location,
    subLocation: item.subLocation,
    priority: item.priority,
    industryType: item.industryType,
  }));
};

const getListFromMap = (data) => {
  let list = Object.entries(data?.mapOfStatusLogsByKam);
  console.log({ list });
  let newObject = {};
  list.map((value) => {
    let tempObj = { ...newObject };
    tempObj[`${value[0]}_Kam Name`] = value[1]?.kamName || null;
    tempObj[`${value[0]}_Date`] = value[1]?.date || null;
    newObject = { ...newObject, ...tempObj };
  });
  return newObject;
};
const getFormattedData = (data) => {
  let updatedList = [];

  updatedList = data?.map((val) => ({
    companyName: val.companyName,
    serviceName: val.serviceName,
    ...getListFromMap(val),
  }));

  return updatedList;
};

const MisMain = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCorpId, setSelectedCorpId] = useState("");
  const [selectedCorpName, setSelectedCorpName] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    typeOfMisReport: "",
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    serviceType: "",
  });

  useEffect(() => {
    fetchServices(setServicesList, setIsLoading);
  }, []);

  const [misReport, setMisReport] = useState([]);
  const fetchSalesServicesMISReport = async () => {
    let url = "https://apibackend.uno.care/api/";
    if (filters.typeOfMisReport === "Reports for KAM Productivity") {
      url += `corpSales/mis/kamProductivity?startDate=${filters?.startDate}&endDate=${filters?.endDate}`;
    } else if (
      filters.typeOfMisReport === "Reports for services" &&
      filters?.serviceType?.id
    ) {
      url += `corpSales/mis/salesservice/${filters?.serviceType?.id}?startDate=${filters?.startDate}&endDate=${filters?.endDate}`;
    } else if (
      filters.typeOfMisReport === "Report for Corp Current Sales Service Status"
    ) {
      url += `corpSales/mis/corp/latestStatus?startDate=${filters.startDate}&endDate=${filters.endDate}`;
    }

    if (url !== "https://apibackend.uno.care/api/") {
      const result = await getData(url);
      if (result.data) {
        if (filters.typeOfMisReport === "Reports for services") {
          const specificColumns = columns?.[filters?.serviceType?.id] || [];
          const csvData = result.data.map((item) => {
            const filteredItem = {};
            specificColumns.forEach((field) => {
              if (item.hasOwnProperty(field)) {
                filteredItem[field] = item[field];
              }
            });
            return filteredItem;
          });
          console.log({ csvData });
          setMisReport(csvData);
        } else {
          setMisReport(result.data);
        }
      } else {
        enqueueSnackbar(`${result.error.response.data.message}`, {
          variant: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchSalesServicesMISReport();
  }, [
    filters.startDate,
    filters.endDate,
    filters.serviceType,
    filters.typeOfMisReport,
  ]);

  const downloadCompanyLogHandler = async () => {
    const url = BASE_URL + `corpSales/companyServiceLog`;
    const response = await getData(url);

    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      console.log({ data: response.data });
      //const formattedData = getFormattedData(response.data);
      //console.log({ formattedData });
      const formattedData = response.data?.map((item) => ({
        ...item,
        dateOfChange: item.dateOfChange
          ? dayjs(item.dateOfChange).format("LL")
          : "",
        dateOfLastVisit: item?.dateOfLastVisit
          ? dayjs(item.dateOfLastVisit).format("LL")
          : "",
      }));
      downloadCsv(formattedData, "company_log");
    }
  };

  const downloadCompanyLogHandlerGroupedByStatus = async () => {
    const url = BASE_URL + `corpSales/companyServiceLogGroupedByStatus`;
    const response = await getData(url);

    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      console.log({ data: response.data });
      const formattedData = getFormattedData(response.data);
      //console.log({ formattedData });
      downloadCsv(formattedData, "company_log_status");
    }
  };

  const downloadCorpSalesDump = async () => {
    const url =
      BASE_URL +
      `corpSales/mis/corpsalesdump?startDate=${filters.startDate}&endDate=${filters.endDate}`;
    const response = await getData(url);

    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      const temp = transformCorpSalesDumpData(response.data);
      downloadCsv(temp, "Corp_Sales_Dump");
    }
  };
  const downloadAttendanceMisReport = async () => {
    const url =
      BASE_URL +
      `staff/mis/reports?fromDate=${filters.startDate}&toDate=${filters.endDate}`;
    const response = await getData(url);

    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      downloadCsv(response.data, "Attendance_Mis_Report");
    }
  };

  const downloadCCFeedbackMisReport = async () => {
    const url =
      BASE_URL +
      `feedback/mis/getAllFeedback/?corpId=${selectedCorpId}&serviceTypes=${"CARE_COORDINATION"}&startDate=${
        filters.startDate
      }&endDate=${filters.endDate}`;
    const response = await getData(url);
    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      const temp = response.data.map((item, index) => ({
        name: item.name,
        corpName: selectedCorpName || item.corpName,
        [item.questionsWithRatingsList[0].question]:
          item.questionsWithRatingsList[0].rating ||
          item.questionsWithRatingsList[0].textRating,

        [item.questionsWithRatingsList[1].question]:
          item.questionsWithRatingsList[1].rating ||
          item.questionsWithRatingsList[1].textRating,

        [item.questionsWithRatingsList[2].question]:
          item.questionsWithRatingsList[2].rating ||
          item.questionsWithRatingsList[2].textRating,
        suggestion: item.suggestions,
        serviceTypes: item.serviceTypes,
        date: item.date,
      }));
      if (temp.length === 0) {
        enqueueSnackbar("No Data Found", { variant: "info" });
      } else {
        downloadCsv(
          temp,
          `${selectedCorpName}_Care_Coordination_Feedback_Mis_Report`
        );
      }
    }
  };
  const downloadASFeedbackMisReport = async () => {
    const url =
      BASE_URL +
      `feedback/mis/getAllFeedback/?corpId=${selectedCorpId}&serviceTypes=${"AWARENESS_SESSION"}&startDate=${
        filters.startDate
      }&endDate=${filters.endDate}`;
    const response = await getData(url);
    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      const temp = response.data.map((item, index) => ({
        name: item.name,
        corpName: selectedCorpName || item.corpName,
        [item.questionsWithRatingsList[0].question]:
          item.questionsWithRatingsList[0].rating ||
          item.questionsWithRatingsList[0].textRating,

        [item.questionsWithRatingsList[1].question]:
          item.questionsWithRatingsList[1].rating ||
          item.questionsWithRatingsList[1].textRating,

        [item.questionsWithRatingsList[2].question]:
          item.questionsWithRatingsList[2].rating ||
          item.questionsWithRatingsList[2].textRating,
        [item.questionsWithRatingsList[3].question]:
          item.questionsWithRatingsList[3].rating ||
          item.questionsWithRatingsList[3].textRating,
        suggestion: item.suggestions,
        serviceTypes: item.serviceTypes,
        date: item.date,
      }));
      if (temp.length === 0) {
        enqueueSnackbar("No Data Found", { variant: "info" });
      } else {
        downloadCsv(
          temp,
          `${selectedCorpName}_Awareness_Session_Feedback_Mis_Report`
        );
      }
    }
  };
  const downloadCampFeedbackMisReport = async () => {
    const url =
      BASE_URL +
      `feedback/mis/getAllFeedback/?corpId=${selectedCorpId}&serviceTypes=${"CAMP"}&startDate=${
        filters.startDate
      }&endDate=${filters.endDate}`;
    const response = await getData(url);
    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      const temp = response.data.map((item, index) => ({
        name: item.name,
        corpName: selectedCorpName || item.corpName,
        [item.questionsWithRatingsList[0].question]:
          item.questionsWithRatingsList[0].rating ||
          item.questionsWithRatingsList[0].textRating,

        [item.questionsWithRatingsList[1].question]:
          item.questionsWithRatingsList[1].rating ||
          item.questionsWithRatingsList[1].textRating,

        [item.questionsWithRatingsList[2].question]:
          item.questionsWithRatingsList[2].rating ||
          item.questionsWithRatingsList[2].textRating,
        [item.questionsWithRatingsList[3].question]:
          item.questionsWithRatingsList[3].rating ||
          item.questionsWithRatingsList[3].textRating,
        suggestion: item.suggestions,
        serviceTypes: item.serviceTypes,
        date: item.date,
      }));
      if (temp.length === 0) {
        enqueueSnackbar("No Data Found", { variant: "info" });
      } else {
        downloadCsv(temp, `${selectedCorpName}_Camp_Feedback_Mis_Report`);
      }
    }
  };
  const downloadFFSFeedbackMisReport = async () => {
    const url =
      BASE_URL +
      `feedback/mis/getAllFeedback/?corpId=${selectedCorpId}&serviceTypes=${"FIRSTAID_OR_FIRESAFETYTRAINING"}&startDate=${
        filters.startDate
      }&endDate=${filters.endDate}`;
    const response = await getData(url);
    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      const temp = response.data.map((item, index) => ({
        name: item.name,
        corpName: selectedCorpName || item.corpName,
        [item.questionsWithRatingsList[0].question]:
          item.questionsWithRatingsList[0].rating ||
          item.questionsWithRatingsList[0].textRating,

        [item.questionsWithRatingsList[1].question]:
          item.questionsWithRatingsList[1].rating ||
          item.questionsWithRatingsList[1].textRating,

        [item.questionsWithRatingsList[2].question]:
          item.questionsWithRatingsList[2].rating ||
          item.questionsWithRatingsList[2].textRating,
        [item.questionsWithRatingsList[3].question]:
          item.questionsWithRatingsList[3].rating ||
          item.questionsWithRatingsList[3].textRating,
        suggestion: item.suggestions,
        serviceTypes: item.serviceTypes,
        date: item.date,
      }));

      if (temp.length === 0) {
        enqueueSnackbar("No Data Found", { variant: "info" });
      } else {
        downloadCsv(
          temp,
          `${selectedCorpName}_FirstAid_FireSafety_Feedback_Mis_Report`
        );
      }
    }
  };

  const downloadPAHCDocFeedbackMisReport = async () => {
    const url =
      BASE_URL +
      `feedback/mis/getAllFeedback/?corpId=${selectedCorpId}&serviceTypes=${"POST_AHC_DOCTOR_CONSULTATION"}&startDate=${
        filters.startDate
      }&endDate=${filters.endDate}`;
    const response = await getData(url);
    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      const temp = response.data.map((item, index) => ({
        name: item.name,
        corpName: selectedCorpName || item.corpName,
        [item.questionsWithRatingsList[0].question]:
          item.questionsWithRatingsList[0].rating ||
          item.questionsWithRatingsList[0].textRating,

        [item.questionsWithRatingsList[1].question]:
          item.questionsWithRatingsList[1].rating ||
          item.questionsWithRatingsList[1].textRating,

        [item.questionsWithRatingsList[2].question]:
          item.questionsWithRatingsList[2].rating ||
          item.questionsWithRatingsList[2].textRating,
        suggestion: item.suggestions,
        serviceTypes: item.serviceTypes,
        date: item.date,
      }));
      if (temp.length === 0) {
        enqueueSnackbar("No Data Found", { variant: "info" });
      } else {
        downloadCsv(
          temp,
          `${selectedCorpName}_POST_AHC_DOC_Feedback_Mis_Report`
        );
      }
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
      <MainPageLayoutWithBack title="Mis">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CustomAutocomplete
              label="MIS Report"
              placeholder="Select MIS Report"
              options={[
                "Reports for services",
                "Reports for KAM Productivity",
                "Report for Corp Current Sales Service Status",
                "Company service log",
                "Company service log By Status",
                "Corp Sales Dump",
                "Attendance Mis Report",
                "Care Coordination Feedback Mis Report",
                "Awareness Session Feedback Mis Report",
                "First Aid Fire Safety Feedback Mis Report",
                "Post Ahc Doctor Consultation Feedback Mis Report",
                "Camp Feedback Mis Report",
              ]}
              getOptionLabel={(option) => option || ""}
              value={filters.typeOfMisReport || ""}
              onChange={(event, newValue) => {
                setFilters({ ...filters, typeOfMisReport: newValue });
                setMisReport([]);
              }}
            />
          </Grid>
          {(filters.typeOfMisReport ===
            "Care Coordination Feedback Mis Report" ||
            filters.typeOfMisReport ===
              "Awareness Session Feedback Mis Report" ||
            filters.typeOfMisReport ===
              "First Aid Fire Safety Feedback Mis Report" ||
            filters.typeOfMisReport ===
              "Post Ahc Doctor Consultation Feedback Mis Report" ||
            filters.typeOfMisReport === "Camp Feedback Mis Report") && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <SelectCorp
                setSelectedCorpId={setSelectedCorpId}
                setSelectedCorpName={setSelectedCorpName}
              />
            </Grid>
          )}
          {filters.typeOfMisReport && (
            <>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <GlobalDateLayout
                  label="Start Date"
                  placeholder="Start Date"
                  initialDate={filters.startDate}
                  formValues={filters}
                  setFormValues={setFilters}
                  property={"startDate"}
                  disableFuture={true}
                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <GlobalDateLayout
                  label="End Date"
                  placeholder="End Date"
                  initialDate={filters.endDate}
                  formValues={filters}
                  setFormValues={setFilters}
                  property={"endDate"}
                  disableFuture={true}
                />
              </Grid>
              {filters.typeOfMisReport === "Reports for services" && (
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <CustomAutocomplete
                    label="Service Type"
                    placeholder="Select Service Type"
                    options={servicesList}
                    getOptionLabel={(option) => option.serviceName || ""}
                    value={filters.serviceType}
                    onChange={(event, newValue) => {
                      setFilters({ ...filters, serviceType: newValue });
                    }}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>

        <Box
          sx={{
            border: "1px solid lightgray",
            p: 2,
            backgroundColor: "#FFFFFF",
            display: "flex",
            borderRadius: "15px",
            marginBlock: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButtonBlue
            title="Download Report"
            disabled={
              misReport.length > 0 ||
              filters.typeOfMisReport === "Company service log" ||
              filters.typeOfMisReport === "Company service log By Status" ||
              filters.typeOfMisReport === "Corp Sales Dump" ||
              filters.typeOfMisReport === "Attendance Mis Report" ||
              filters.typeOfMisReport ===
                "Care Coordination Feedback Mis Report" ||
              filters.typeOfMisReport ===
                "Awareness Session Feedback Mis Report" ||
              filters.typeOfMisReport === "Camp Feedback Mis Report" ||
              filters.typeOfMisReport ===
                "First Aid Fire Safety Feedback Mis Report" ||
              filters.typeOfMisReport ===
                "Post Ahc Doctor Consultation Feedback Mis Report"
                ? false
                : true
            }
            onClick={() => {
              if (filters.typeOfMisReport === "Reports for services") {
                downloadCsv(
                  misReport,
                  `Reports_For_services_${filters?.serviceType?.serviceName}`
                );
              } else if (
                filters.typeOfMisReport === "Reports for KAM Productivity"
              ) {
                downloadCsv(misReport, `Reports_for_KAM_Productivity`);
              } else if (
                filters.typeOfMisReport ===
                "Report for Corp Current Sales Service Status"
              ) {
                downloadCsv(misReport, `Report_for_Corp_Current_Sales_Service`);
              } else if (filters.typeOfMisReport === "Company service log") {
                downloadCompanyLogHandler();
              } else if (
                filters.typeOfMisReport === "Company service log By Status"
              ) {
                downloadCompanyLogHandlerGroupedByStatus();
              } else if (filters.typeOfMisReport === "Corp Sales Dump") {
                downloadCorpSalesDump();
              } else if (filters.typeOfMisReport === "Attendance Mis Report") {
                downloadAttendanceMisReport();
              } else if (
                filters.typeOfMisReport ===
                "Care Coordination Feedback Mis Report"
              ) {
                downloadCCFeedbackMisReport();
              } else if (
                filters.typeOfMisReport ===
                "Awareness Session Feedback Mis Report"
              ) {
                downloadASFeedbackMisReport();
              } else if (
                filters.typeOfMisReport === "Camp Feedback Mis Report"
              ) {
                downloadCampFeedbackMisReport();
              } else if (
                filters.typeOfMisReport ===
                "First Aid Fire Safety Feedback Mis Report"
              ) {
                downloadFFSFeedbackMisReport();
              } else if (
                filters.typeOfMisReport ===
                "Post Ahc Doctor Consultation Feedback Mis Report"
              ) {
                downloadPAHCDocFeedbackMisReport();
              }
            }}
          />
        </Box>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default MisMain;

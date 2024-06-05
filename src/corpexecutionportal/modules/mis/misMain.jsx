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
      downloadCsv(response.data, "company_log");
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
      // console.log({ data: response.data });
      // const formattedData = getFormattedData(response.data);
      //console.log({ formattedData });
      downloadCsv(response.data, "Corp_Sales_Dump");
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
              ]}
              getOptionLabel={(option) => option || ""}
              value={filters.typeOfMisReport || ""}
              onChange={(event, newValue) => {
                setFilters({ ...filters, typeOfMisReport: newValue });
                setMisReport([]);
              }}
            />
          </Grid>
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
              filters.typeOfMisReport === "Corp Sales Dump"
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
              }
            }}
          />
        </Box>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default MisMain;

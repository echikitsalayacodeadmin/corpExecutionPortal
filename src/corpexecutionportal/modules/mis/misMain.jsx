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
      `feedback/getAllFeedback/${selectedCorpId}?serviceTypes=${"CARE_COORDINATION"}&startDate=${
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
        isActive: item.isActive,
        id: item.id,
        name: item.name,
        corpName: selectedCorpName,
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
      `feedback/getAllFeedback/${selectedCorpId}?serviceTypes=${"AWARENESS_SESSION"}&startDate=${
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
        isActive: item.isActive,
        id: item.id,
        name: item.name,
        corpName: selectedCorpName,
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
      `feedback/getAllFeedback/${selectedCorpId}?serviceTypes=${"CAMP"}&startDate=${
        filters.startDate
      }&endDate=${filters.endDate}`;
    const response = await getData(url);
    if (response.error) {
      console.log({ error: response.err });
      enqueueSnackbar("Failed to get data.", {
        variant: "error",
      });
    } else {
      const temp2 = [
        {
          id: 156328,
          created_date: "2024-06-20 09:40:05.262",
          is_active: true,
          last_modified_date: "2024-06-20 09:40:05.262",
          corp_id: "15f6b1de-093f-4490-9e11-8d06904404f8",
          name: "Saroja chettri",
          questions_with_ratings_list: [
            {
              rating: 0,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-20",
        },
        {
          id: 156330,
          created_date: "2024-06-20 09:45:07.725",
          is_active: true,
          last_modified_date: "2024-06-20 09:45:07.725",
          corp_id: "15f6b1de-093f-4490-9e11-8d06904404f8",
          name: "Rajesh jakodiya",
          questions_with_ratings_list: [
            {
              rating: 4,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "AVERAGE",
            },
            {
              rating: 4,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 4,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-20",
        },
        {
          id: 156332,
          created_date: "2024-06-20 09:49:34.136",
          is_active: true,
          last_modified_date: "2024-06-20 09:49:34.136",
          corp_id: "15f6b1de-093f-4490-9e11-8d06904404f8",
          name: "Shilaraj",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-20",
        },
        {
          id: 155513,
          created_date: "2024-06-19 05:39:35.409",
          is_active: true,
          last_modified_date: "2024-06-19 05:39:35.409",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Vijay Kumar modi",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Very nice",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-19",
        },
        {
          id: 155512,
          created_date: "2024-06-19 05:38:25.436",
          is_active: true,
          last_modified_date: "2024-06-19 05:38:25.436",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "",
          questions_with_ratings_list: [
            {
              rating: 0,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 0,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 0,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-19",
        },
        {
          id: 155525,
          created_date: "2024-06-19 06:06:51.192",
          is_active: true,
          last_modified_date: "2024-06-19 06:06:51.192",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Shyam patidar",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-19",
        },
        {
          id: 155510,
          created_date: "2024-06-19 05:36:27.905",
          is_active: true,
          last_modified_date: "2024-06-19 05:36:27.905",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Sonu Kushwah",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-19",
        },
        {
          id: 155524,
          created_date: "2024-06-19 05:57:00.195",
          is_active: true,
          last_modified_date: "2024-06-19 05:57:00.195",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Rahul prajapat",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-19",
        },
        {
          id: 155511,
          created_date: "2024-06-19 05:38:25.144",
          is_active: true,
          last_modified_date: "2024-06-19 05:38:25.144",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 0,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 0,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-19",
        },
        {
          id: 155520,
          created_date: "2024-06-19 05:49:44.848",
          is_active: true,
          last_modified_date: "2024-06-19 05:49:44.848",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "",
          questions_with_ratings_list: [
            {
              rating: 0,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 0,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 0,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-19",
        },
        {
          id: 155519,
          created_date: "2024-06-19 05:49:44.588",
          is_active: true,
          last_modified_date: "2024-06-19 05:49:44.588",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Shashikant pal",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Berybgood",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-19",
        },
        {
          id: 155379,
          created_date: "2024-06-18 07:33:11.703",
          is_active: true,
          last_modified_date: "2024-06-18 07:33:11.703",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Good",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155380,
          created_date: "2024-06-18 07:33:31.999",
          is_active: true,
          last_modified_date: "2024-06-18 07:33:31.999",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Rajesh pandey",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Good",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155383,
          created_date: "2024-06-18 07:51:56.107",
          is_active: true,
          last_modified_date: "2024-06-18 07:51:56.107",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Subha jain",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155391,
          created_date: "2024-06-18 08:57:26.775",
          is_active: true,
          last_modified_date: "2024-06-18 08:57:26.775",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Mohan Vinaykya",
          questions_with_ratings_list: [
            {
              rating: 0,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 0,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 0,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155393,
          created_date: "2024-06-18 09:00:35.102",
          is_active: true,
          last_modified_date: "2024-06-18 09:00:35.102",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Rakesh dubey",
          questions_with_ratings_list: [
            {
              rating: 4,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "ABOVE_AVERAGE",
            },
            {
              rating: 4,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 3,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155395,
          created_date: "2024-06-18 09:03:45.125",
          is_active: true,
          last_modified_date: "2024-06-18 09:03:45.125",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Gaurav udasi",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "All good",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155397,
          created_date: "2024-06-18 09:05:12.329",
          is_active: true,
          last_modified_date: "2024-06-18 09:05:12.329",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Santosh chandak",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 4,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 4,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155402,
          created_date: "2024-06-18 09:15:28.878",
          is_active: true,
          last_modified_date: "2024-06-18 09:15:28.878",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Sumit sethi",
          questions_with_ratings_list: [
            {
              rating: 4,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 4,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Very good",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155404,
          created_date: "2024-06-18 09:19:48.662",
          is_active: true,
          last_modified_date: "2024-06-18 09:19:48.662",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Nanhe lal",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "ABOVE_AVERAGE",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155406,
          created_date: "2024-06-18 09:29:59.925",
          is_active: true,
          last_modified_date: "2024-06-18 09:29:59.925",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Milton",
          questions_with_ratings_list: [
            {
              rating: 1,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Please send well trained staff",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155408,
          created_date: "2024-06-18 09:48:12.836",
          is_active: true,
          last_modified_date: "2024-06-18 09:48:12.836",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Vipin patni",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "GOOD",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155410,
          created_date: "2024-06-18 10:01:47.998",
          is_active: true,
          last_modified_date: "2024-06-18 10:01:47.998",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "",
          questions_with_ratings_list: [
            {
              rating: 0,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 0,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 0,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155411,
          created_date: "2024-06-18 10:04:18.022",
          is_active: true,
          last_modified_date: "2024-06-18 10:04:18.022",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Nitish Kumhar",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "ABOVE_AVERAGE",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 4,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Good",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155425,
          created_date: "2024-06-18 11:34:23.627",
          is_active: true,
          last_modified_date: "2024-06-18 11:34:23.627",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Jayant",
          questions_with_ratings_list: [
            {
              rating: 0,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "AVERAGE",
            },
            {
              rating: 3,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 2,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155426,
          created_date: "2024-06-18 11:35:20.158",
          is_active: true,
          last_modified_date: "2024-06-18 11:35:20.158",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Ritesh Gangwal",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155434,
          created_date: "2024-06-18 11:44:09.014",
          is_active: true,
          last_modified_date: "2024-06-18 11:44:09.014",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Dinesh sharma",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155437,
          created_date: "2024-06-18 11:49:10.852",
          is_active: true,
          last_modified_date: "2024-06-18 11:49:10.852",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Vikas Sharma",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "ABOVE_AVERAGE",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Good compliment",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155438,
          created_date: "2024-06-18 11:49:11.284",
          is_active: true,
          last_modified_date: "2024-06-18 11:49:11.284",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "",
          questions_with_ratings_list: [
            {
              rating: 0,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 0,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 0,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155444,
          created_date: "2024-06-18 12:17:02.392",
          is_active: true,
          last_modified_date: "2024-06-18 12:17:02.392",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Ayush wagh",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "BELOW_AVERAGE",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155453,
          created_date: "2024-06-18 13:44:05.848",
          is_active: true,
          last_modified_date: "2024-06-18 13:44:05.848",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Suresh tiwari",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Good",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155409,
          created_date: "2024-06-18 10:01:45.178",
          is_active: true,
          last_modified_date: "2024-06-18 10:01:45.178",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Ashok kumar Trivedi",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "ABOVE_AVERAGE",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155392,
          created_date: "2024-06-18 08:58:04.217",
          is_active: true,
          last_modified_date: "2024-06-18 08:58:04.217",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Mohan Vinaykya",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155394,
          created_date: "2024-06-18 09:03:45.123",
          is_active: true,
          last_modified_date: "2024-06-18 09:03:45.123",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Gaurav udasi",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "All good",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155368,
          created_date: "2024-06-18 06:54:12.819",
          is_active: true,
          last_modified_date: "2024-06-18 06:54:12.819",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Shishir",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 4,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 4,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155369,
          created_date: "2024-06-18 06:55:29.338",
          is_active: true,
          last_modified_date: "2024-06-18 06:55:29.338",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Rahul lahoti",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155370,
          created_date: "2024-06-18 06:56:56.349",
          is_active: true,
          last_modified_date: "2024-06-18 06:56:56.349",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Ravi jhanjhri",
          questions_with_ratings_list: [
            {
              rating: 4,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "ABOVE_AVERAGE",
            },
            {
              rating: 4,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 4,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155371,
          created_date: "2024-06-18 06:59:55.627",
          is_active: true,
          last_modified_date: "2024-06-18 06:59:55.627",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Ajinkya patil",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "UNTRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155372,
          created_date: "2024-06-18 07:03:30.947",
          is_active: true,
          last_modified_date: "2024-06-18 07:03:30.947",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Shatrughan singh",
          questions_with_ratings_list: [
            {
              rating: 0,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 0,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 0,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155375,
          created_date: "2024-06-18 07:07:40.491",
          is_active: true,
          last_modified_date: "2024-06-18 07:07:40.491",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Manoj Sharma",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Over-all good experience",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155377,
          created_date: "2024-06-18 07:22:06.209",
          is_active: true,
          last_modified_date: "2024-06-18 07:22:06.209",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Manoj Singh",
          questions_with_ratings_list: [
            {
              rating: 0,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 0,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 155378,
          created_date: "2024-06-18 07:25:36.588",
          is_active: true,
          last_modified_date: "2024-06-18 07:25:36.588",
          corp_id: "c13430a2-77e1-4036-9354-c67d319ef128",
          name: "Avinash pawar",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Good",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-18",
        },
        {
          id: 153610,
          created_date: "2024-06-11 09:18:29.584",
          is_active: true,
          last_modified_date: "2024-06-11 09:18:29.584",
          corp_id: "c6027796-37d6-4bfc-a9ab-c2c69187cdd7",
          name: "",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "All good",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-11",
        },
        {
          id: 152092,
          created_date: "2024-06-06 11:36:17.742",
          is_active: true,
          last_modified_date: "2024-06-06 11:36:17.742",
          corp_id: "dd5c0e00-19e7-4cc3-a498-495107eb44dd",
          name: "Kuldeep bairwa",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "WELL_TRAINED",
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Well done",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-06",
        },
        {
          id: 151181,
          created_date: "2024-06-01 05:50:39.907",
          is_active: true,
          last_modified_date: "2024-06-01 05:50:39.907",
          corp_id: "872cd841-9f7a-432d-b8e9-422b780bca10",
          name: "Dummy",
          questions_with_ratings_list: [
            {
              rating: 1,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "BELOW_AVERAGE",
            },
            {
              rating: 2,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 1,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "Dummy",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-01",
        },
        {
          id: 151175,
          created_date: "2024-06-01 05:35:15.577",
          is_active: true,
          last_modified_date: "2024-06-01 05:35:15.577",
          corp_id: "3b5cdfbf-06ce-4b42-ace9-0d9722a3388a",
          name: "",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-01",
        },
        {
          id: 151174,
          created_date: "2024-06-01 05:35:05.071",
          is_active: true,
          last_modified_date: "2024-06-01 05:35:05.071",
          corp_id: "3b5cdfbf-06ce-4b42-ace9-0d9722a3388a",
          name: "",
          questions_with_ratings_list: [
            {
              rating: 5,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: null,
            },
            {
              rating: 5,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-01",
        },
        {
          id: 151170,
          created_date: "2024-06-01 04:55:14.202",
          is_active: true,
          last_modified_date: "2024-06-01 04:55:14.202",
          corp_id: "872cd841-9f7a-432d-b8e9-422b780bca10",
          name: "hello",
          questions_with_ratings_list: [
            {
              rating: 3,
              question: "Overall Experience at Camp",
              questionId: 1,
              textRating: null,
            },
            {
              rating: 0,
              question: "Rate our Staff",
              questionId: 2,
              textRating: "ABOVE_AVERAGE",
            },
            {
              rating: 2,
              question: "Behaviour of Staff",
              questionId: 3,
              textRating: null,
            },
            {
              rating: 5,
              question: "Uniform of Staff",
              questionId: 4,
              textRating: null,
            },
          ],
          suggestions: "okoko",
          service_type: "",
          service_types: "CAMP",
          date: "2024-06-01",
        },
      ];
      const temp = temp2.map((item, index) => ({
        id: item.item,
        created_date: item.created_date,
        is_active: item.is_active,
        last_modified_date: item.last_modified_date,
        corp_id: item.corp_id,
        name: item.name,
        [item.questions_with_ratings_list[0].question]:
          item.questions_with_ratings_list[0].rating ||
          item.questions_with_ratings_list[0].textRating,

        [item.questions_with_ratings_list[1].question]:
          item.questions_with_ratings_list[1].rating ||
          item.questions_with_ratings_list[1].textRating,

        [item.questions_with_ratings_list[2].question]:
          item.questions_with_ratings_list[2].rating ||
          item.questions_with_ratings_list[2].textRating,
        [item.questions_with_ratings_list[3].question]:
          item.questions_with_ratings_list[3].rating ||
          item.questions_with_ratings_list[3].textRating,
        suggestions: item.suggestions,
        service_type: item.service_type,
        service_types: item.service_types,
        date: item.date,
      }));
      // const temp3 = response.data.map((item, index) => ({
      //   isActive: item.isActive,
      //   id: item.id,
      //   name: item.name,
      //   corpName: selectedCorpName,
      //   [item.questionsWithRatingsList[0].question]:
      //     item.questionsWithRatingsList[0].rating ||
      //     item.questionsWithRatingsList[0].textRating,

      //   [item.questionsWithRatingsList[1].question]:
      //     item.questionsWithRatingsList[1].rating ||
      //     item.questionsWithRatingsList[1].textRating,

      //   [item.questionsWithRatingsList[2].question]:
      //     item.questionsWithRatingsList[2].rating ||
      //     item.questionsWithRatingsList[2].textRating,
      //   [item.questionsWithRatingsList[3].question]:
      //     item.questionsWithRatingsList[3].rating ||
      //     item.questionsWithRatingsList[3].textRating,
      //   suggestion: item.suggestions,
      //   serviceTypes: item.serviceTypes,
      //   date: item.date,
      // }));
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
      `feedback/getAllFeedback/${selectedCorpId}?serviceTypes=${"FIRSTAID_OR_FIRESAFETYTRAINING"}&startDate=${
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
        isActive: item.isActive,
        id: item.id,
        name: item.name,
        corpName: selectedCorpName,
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
      `feedback/getAllFeedback/${selectedCorpId}?serviceTypes=${"POST_AHC_DOCTOR_CONSULTATION"}&startDate=${
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
        isActive: item.isActive,
        id: item.id,
        name: item.name,
        corpName: selectedCorpName,
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

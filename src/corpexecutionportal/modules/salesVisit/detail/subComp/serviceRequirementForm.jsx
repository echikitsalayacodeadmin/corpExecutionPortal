import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainPageLayoutWithBack from "../../../../global/templates/mainPageLayoutWithBack";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import GlobalDateLayout from "../../../../../assets/globalDateLayout/globalDateLayout";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";
import { BASE_URL } from "../../../../../assets/constants";
import { saveData } from "../../../../assets/corpServices";
import { useSnackbar } from "notistack";

const servicesFields = {
  62502: [
    {
      label: "List Of Tests",
      fieldName: "list",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Procedure of closure",
      fieldName: "closureProcedure",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Decision Making Criteria",
      fieldName: "decisionMakingCriteria",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Due/Tentative Date",
      fieldName: "dueDate",
      type: "date",
    },
    {
      label: "Frequency",
      fieldName: "frequency",
      type: "dropdown",
      options: ["ONE_TIME", "QUATERLY", "SEMI_ANNUALLY", "ANNUALY", "ALL_YEAR"],
    },
    {
      label: "Location",
      fieldName: "location",
      type: "dropdown",
      options: ["ONSITE", "OFFSITE"],
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR_HEAD", "ER_HEAD", "PLANT_HEAD", "PURCHASE_HEAD"],
    },
    {
      label: "Type Of User",
      fieldName: "user",
      type: "radioButton",
      REGULAR_USER: [
        {
          label: "Service Provider",
          fieldName: "serviceProvider",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Old Rate",
          fieldName: "oldRate",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Interest Reason",
          fieldName: "interestReason",
          type: "dropdown",
          options: ["JUST_FOR_QUOTATION", "EXPLORING", "INTERESTED", "ALL_IN"],
        },
        {
          label: "Pain Point",
          fieldName: "painPoint",
          type: "textField",
          dataType: "string",
        },
      ],
      FIRST_TIME_USER: [
        {
          label: "Reason For Starting",
          fieldName: "reasonForStarting",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Tentative Budget",
          fieldName: "tentativeBudget",
          type: "textField",
          dataType: "string",
        },
      ],
      NON_USER: [],
    },
  ],
  62503: [
    {
      label: "List Of Tests",
      fieldName: "list",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Procedure of closure",
      fieldName: "closureProcedure",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Decision Making Criteria",
      fieldName: "decisionMakingCriteria",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Due/Tentative Date",
      fieldName: "dueDate",
      type: "date",
    },
    {
      label: "Frequency",
      fieldName: "frequency",
      type: "dropdown",
      options: ["ONE_TIME", "QUATERLY", "SEMI_ANNUALLY", "ANNUALY", "ALL_YEAR"],
    },
    {
      label: "Location",
      fieldName: "location",
      type: "dropdown",
      options: ["ON_SITE", "OFF_SITE"],
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR_HEAD", "ER_HEAD", "PLANT_HEAD", "PURCHASE_HEAD"],
    },
    {
      label: "Type Of User",
      fieldName: "user",
      type: "radioButton",
      REGULAR_USER: [
        {
          label: "Service Provider",
          fieldName: "serviceProvider",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Old Rate",
          fieldName: "oldRate",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Interest Reason",
          fieldName: "interestReason",
          type: "dropdown",
          options: ["Just for Quotation", "Exploring", "Interested", "All In"],
        },
        {
          label: "Pain Point",
          fieldName: "painPoint",
          type: "textField",
          dataType: "string",
        },
      ],
      FIRST_TIME_USER: [
        {
          label: "Reason For Starting",
          fieldName: "reasonForStarting",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Tentative Budget",
          fieldName: "tentativeBudget",
          type: "textField",
          dataType: "string",
        },
      ],
      NON_USER: [],
    },
  ],
  62507: [
    {
      label: "Degree",
      fieldName: "degree",
      type: "dropdown",
      options: ["MBBS", "AFIH", "MBBS_AND_AFIH"],
    },
    {
      label: "Procedure of closure",
      fieldName: "closureProcedure",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Decision Making Criteria",
      fieldName: "decisionMakingCriteria",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Due/Tentative Date",
      fieldName: "dueDate",
      type: "date",
    },
    {
      label: "Timing",
      fieldName: "timings",
      type: "dropdown",
      options: ["ONE_HOUR", "TWO_HOUR", "THREE_HOUR", "EIGHT_HOUR"],
    },
    {
      label: "Frequency",
      fieldName: "frequency",
      type: "dropdown",
      options: [
        "ONE_PER_WEEK",
        "TWO_PER_WEEK",
        "THREE_PER_WEEK",
        "FOUR_PER_WEEK",
        "FIVE_PER_WEEK",
        "FULL_TIME",
      ],
    },
    {
      label: "Location",
      fieldName: "location",
      type: "dropdown",
      options: ["Onesite", "Offsite"],
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR_HEAD", "ER_HEAD", "PLANT_HEAD", "PURCHASE_HEAD"],
    },
    {
      label: "Type Of User",
      fieldName: "user",
      type: "radioButton",
      REGULAR_USER: [
        {
          label: "Service Provider",
          fieldName: "serviceProvider",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Old Rate",
          fieldName: "oldRate",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Interest Reason",
          fieldName: "interestReason",
          type: "dropdown",
          options: ["Just for Quotation", "Exploring", "Interested", "All In"],
        },
        {
          label: "Pain Point",
          fieldName: "painPoint",
          type: "textField",
          dataType: "string",
        },
      ],
      FIRST_TIME_USER: [
        {
          label: "Reason For Starting",
          fieldName: "reasonForStarting",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Tentative Budget",
          fieldName: "tentativeBudget",
          type: "textField",
          dataType: "string",
        },
      ],
      NON_USER: [],
    },
  ],
  62506: [
    {
      label: "Degree",
      fieldName: "degree",
      type: "dropdown",
      options: ["MBBS", "AFIH", "BOTH"],
    },
    {
      label: "Procedure of closure",
      fieldName: "closureProcedure",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Decision Making Criteria",
      fieldName: "decisionMakingCriteria",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Due/Tentative Date",
      fieldName: "dueDate",
      type: "date",
    },
    {
      label: "Timing",
      fieldName: "timings",
      type: "dropdown",
      options: ["1hr", "2hr", "4hr", "8hr"],
    },
    {
      label: "Frequency",
      fieldName: "frequency",
      type: "dropdown",
      options: ["1/week", "2/week", "3/week", "4/week", "5/week", "Full Time"],
    },
    {
      label: "Location",
      fieldName: "location",
      type: "dropdown",
      options: ["Onesite", "Offsite"],
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR_HEAD", "ER_HEAD", "PLANT_HEAD", "PURCHASE_HEAD"],
    },
    {
      label: "Type Of User",
      fieldName: "user",
      type: "radioButton",
      REGULAR_USER: [
        {
          label: "Service Provider",
          fieldName: "serviceProvider",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Old Rate",
          fieldName: "oldRate",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Interest Reason",
          fieldName: "interestReason",
          type: "dropdown",
          options: ["Just for Quotation", "Exploring", "Interested", "All In"],
        },
        {
          label: "Pain Point",
          fieldName: "painPoint",
          type: "textField",
          dataType: "string",
        },
      ],
      FIRST_TIME_USER: [
        {
          label: "Reason For Starting",
          fieldName: "reasonForStarting",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Tentative Budget",
          fieldName: "tentativeBudget",
          type: "textField",
          dataType: "string",
        },
      ],
      NON_USER: [],
    },
  ],
  62508: [
    {
      label: "Service Provider",
      fieldName: "serviceProvider",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Reason For Shift",
      fieldName: "reasonForShift",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Procedure of closure",
      fieldName: "closureProcedure",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Decision Making Criteria",
      fieldName: "decisionMakingCriteria",
      type: "textField",
      dataType: "string",
    },
    {
      label: "List Of Medicines",
      fieldName: "list",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Monthly Consumption",
      fieldName: "monthlyConsumption",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Order Cycle",
      fieldName: "orderCycle",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Due/Tentative Date",
      fieldName: "dueDate",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR_HEAD", "ER_HEAD", "PLANT_HEAD", "PURCHASE_HEAD"],
    },
  ],
  62510: [
    {
      label: "Type of CSR",
      fieldName: "typeOfService",
      type: "dropdown",
      options: ["EDUCATION", "HEALTHCARE", "ENVIRONMENT", "OTHER"],
    },
    {
      label: "Executed By",
      fieldName: "csrExecutedBy",
      type: "dropdown",
      options: ["SELF", "OUTSOURCED"],
    },

    {
      label: "Budget",
      fieldName: "tentativeBudget",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Frequency",
      fieldName: "frequency",
      type: "dropdown",
      options: ["ONE_TIME", "QUATERLY", "SEMI_ANNUALLY", "ANNUALY", "ALL_YEAR"],
    },
    {
      label: "Decision Making Criteria",
      fieldName: "decisionMakingCriteria",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Due/Tentative Date",
      fieldName: "dueDate",
      type: "date",
    },
    {
      label: "Remark",
      fieldName: "remark",
      type: "textFieldMultiline",
      dataType: "string",
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR_HEAD", "ER_HEAD", "PLANT_HEAD", "PURCHASE_HEAD"],
    },
    {
      label: "Type Of User",
      fieldName: "user",
      type: "radioButton",
      REGULAR_USER: [
        {
          label: "Service Provider",
          fieldName: "serviceProvider",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Old Rate",
          fieldName: "oldRate",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Interest Reason",
          fieldName: "interestReason",
          type: "dropdown",
          options: ["Just for Quotation", "Exploring", "Interested", "All In"],
        },
        {
          label: "Pain Point",
          fieldName: "painPoint",
          type: "textField",
          dataType: "string",
        },
      ],
      FIRST_TIME_USER: [
        {
          label: "Reason For Starting",
          fieldName: "reasonForStarting",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Tentative Budget",
          fieldName: "tentativeBudget",
          type: "textField",
          dataType: "string",
        },
      ],
      NON_USER: [],
    },
  ],
  62511: [
    {
      label: "List of Services",
      fieldName: "list",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Procedure of closure",
      fieldName: "closureProcedure",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Decision Making Criteria",
      fieldName: "decisionMakingCriteria",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Frequency",
      fieldName: "frequency",
      type: "dropdown",
      options: ["ONE_TIME", "QUATERLY", "SEMI_ANNUALLY", "ANNUALY", "ALL_YEAR"],
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR_HEAD", "ER_HEAD", "PLANT_HEAD", "PURCHASE_HEAD"],
    },
    {
      label: "Type Of User",
      fieldName: "user",
      type: "radioButton",
      REGULAR_USER: [
        {
          label: "Service Provider",
          fieldName: "serviceProvider",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Old Rate",
          fieldName: "oldRate",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Interest Reason",
          fieldName: "interestReason",
          type: "dropdown",
          options: ["Just for Quotation", "Exploring", "Interested", "All In"],
        },
        {
          label: "Pain Point",
          fieldName: "painPoint",
          type: "textField",
          dataType: "string",
        },
      ],
      FIRST_TIME_USER: [
        {
          label: "Reason For Starting",
          fieldName: "reasonForStarting",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Tentative Budget",
          fieldName: "tentativeBudget",
          type: "textField",
          dataType: "string",
        },
      ],
      NON_USER: [],
    },
  ],
  62509: [
    {
      label: "Type of Training",
      fieldName: "typeOfTraining",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Procedure of closure",
      fieldName: "closureProcedure",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Decision Making Criteria",
      fieldName: "decisionMakingCriteria",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Frequency",
      fieldName: "frequency",
      type: "dropdown",
      options: ["ONE_TIME", "QUATERLY", "SEMI_ANNUALLY", "ANNUALY", "ALL_YEAR"],
    },
    {
      label: "No Of People",
      fieldName: "noOfPeople",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR_HEAD", "ER_HEAD", "PLANT_HEAD", "PURCHASE_HEAD"],
    },
    {
      label: "Type Of User",
      fieldName: "user",
      type: "radioButton",
      REGULAR_USER: [
        {
          label: "Service Provider",
          fieldName: "serviceProvider",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Old Rate",
          fieldName: "oldRate",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Interest Reason",
          fieldName: "interestReason",
          type: "dropdown",
          options: ["Just for Quotation", "Exploring", "Interested", "All In"],
        },
        {
          label: "Pain Point",
          fieldName: "painPoint",
          type: "textField",
          dataType: "string",
        },
      ],
      FIRST_TIME_USER: [
        {
          label: "Reason For Starting",
          fieldName: "reasonForStarting",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Tentative Budget",
          fieldName: "tentativeBudget",
          type: "textField",
          dataType: "string",
        },
      ],
      NON_USER: [],
    },
  ],
  62505: [
    {
      label: "OHC",
      fieldName: "typeOfService",
      type: "dropdown",
      options: ["NEW", "OLD"],
    },
    {
      label: "Remark",
      fieldName: "remark",
      type: "textFieldMultiline",
      dataType: "string",
    },
    {
      label: "Budget",
      fieldName: "tentativeBudget",
      type: "textField",
      dataType: "string",
    },
  ],
  62504: [
    {
      label: "Type Of Insurance",
      fieldName: "typeOfService",
      type: "dropdown",
      options: ["GHI", "GPA", "WORKMEN", "GTI"],
    },
    {
      label: "Request Type",
      fieldName: "insuranceRequestType",
      type: "drowpDown",
      options: ["RENEWAL", "NEW"],
    },
    {
      label: "# Lifes",
      fieldName: "numberOfLives",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Type Of Policy",
      fieldName: "typeOfPolicy",
      type: "dropdown",
      options: ["INDIVIDUAL", "FAMILY", "PARENTS", "OTHERS"],
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR_HEAD", "ER_HEAD", "PLANT_HEAD", "PURCHASE_HEAD"],
    },
    {
      label: "Type Of User",
      fieldName: "user",
      type: "radioButton",
      REGULAR_USER: [
        {
          label: "Service Provider",
          fieldName: "serviceProvider",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Old Rate",
          fieldName: "oldRate",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Interest Reason",
          fieldName: "interestReason",
          type: "dropdown",
          options: ["Just for Quotation", "Exploring", "Interested", "All In"],
        },
        {
          label: "Pain Point",
          fieldName: "painPoint",
          type: "textField",
          dataType: "string",
        },
      ],
      FIRST_TIME_USER: [
        {
          label: "Reason For Starting",
          fieldName: "reasonForStarting",
          type: "textField",
          dataType: "string",
        },
        {
          label: "Tentative Budget",
          fieldName: "tentativeBudget",
          type: "textField",
          dataType: "string",
        },
      ],
      NON_USER: [],
    },
  ],
  default: [
    {
      label: "Service Provider",
      fieldName: "serviceProvider",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Last Amount",
      fieldName: "oldRate",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Due Date",
      fieldName: "dueDate",
      type: "date",
    },
    {
      label: "Remark",
      fieldName: "remark",
      type: "textFieldMultiline",
      dataType: "string",
    },
  ],
};

const getServiceFields = (serviceId) => {
  return servicesFields.hasOwnProperty(serviceId)
    ? servicesFields[serviceId]
    : servicesFields.default;
};

const ServiceRequirementForm = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const userId = localStorage.getItem("USER_ID_CORP_SALES");
  const userName = localStorage.getItem("USER_NAME_CORP_SALES");
  const { data, corpId } = JSON.parse(decodeURIComponent(itemId));
  console.log({ data, corpId });
  const [formValues, setFormValues] = useState({
    user: "",
    list: "",
    decisionMakingCriteria: "",
    closureProcedure: "",
    dueDate: null,
    frequency: "",
    location: "",
    serviceProvider: "",
    oldRate: "",
    interestReason: "",
    decisionOwner: "",
    painPoint: "",
    reasonForStarting: "",
    tentativeBudget: "",
    degree: "",
    timings: "",
    monthlyConsumption: "",
    orderCycle: "",
    reasonForShift: "",
    remark: "",
    csrExecutedBy: "",
    typeOfTraining: "",
    noOfPeople: "",
    typeOfService: "",
    typeOfPolicy: "",
    numberOfLives: "",
    insuranceRequestType: "",
    status: "",
    userId: "",
    userName: "",
    confidenceLeveLStatus: "",
  });

  useEffect(() => {
    setFormValues({
      ...formValues,
      user: data.user || "",
      list: data.list || "",
      decisionMakingCriteria: data.decisionMakingCriteria || "",
      closureProcedure: data.closureProcedure || "",
      dueDate: data.dueDate || "",
      frequency: data.frequency || "",
      location: data.location || "",
      serviceProvider: data.serviceProvider || "",
      oldRate: data.oldRate || "",
      interestReason: data.interestReason || "",
      decisionOwner: data.decisionOwner || "",
      painPoint: data.painPoint || "",
      reasonForStarting: data.reasonForStarting || "",
      tentativeBudget: data.tentativeBudget || "",
      degree: data.degree || "",
      timings: data.timings || "",
      monthlyConsumption: data.monthlyConsumption || "",
      orderCycle: data.orderCycle || "",
      reasonForShift: data.reasonForShift || "",
      remark: data.remark || "",
      csrExecutedBy: data.csrExecutedBy || "",
      typeOfTraining: data.typeOfTraining || "",
      noOfPeople: data.noOfPeople || "",
      typeOfService: data.typeOfService || "",
      typeOfPolicy: data.typeOfPolicy || "",
      numberOfLives: data.numberOfLives || "",
      insuranceRequestType: data.insuranceRequestType || "",
      status: data.status || "",
      userId: userId || "",
      userName: userName || "",
      confidenceLeveLStatus: data.confidenceLeveLStatus || "",
    });
  }, []);

  const handleSave = async () => {
    const obj = {
      user: formValues.user || null,
      list: formValues.list || null,
      decisionMakingCriteria: formValues.decisionMakingCriteria || null,
      closureProcedure: formValues.closureProcedure || null,
      dueDate: formValues.dueDate || null,
      frequency: formValues.frequency || null,
      location: formValues.location || null,
      serviceProvider: formValues.serviceProvider || null,
      oldRate: formValues.oldRate || null,
      interestReason: formValues.interestReason || null,
      decisionOwner: formValues.decisionOwner || null,
      painPoint: formValues.painPoint || null,
      reasonForStarting: formValues.reasonForStarting || null,
      tentativeBudget: formValues.tentativeBudget || null,
      degree: formValues.degree || null,
      timings: formValues.timings || null,
      monthlyConsumption: formValues.monthlyConsumption || null,
      orderCycle: formValues.orderCycle || null,
      reasonForShift: formValues.reasonForShift || null,
      remark: formValues.remark || null,
      csrExecutedBy: formValues.csrExecutedBy || null,
      typeOfTraining: formValues.typeOfTraining || null,
      noOfPeople: formValues.noOfPeople || null,
      typeOfService: formValues.typeOfService || null,
      typeOfPolicy: formValues.typeOfPolicy || null,
      numberOfLives: formValues.numberOfLives || null,
      insuranceRequestType: formValues.insuranceRequestType || null,
      status: formValues.status || null,
      userId: userId || null,
      userName: userName || null,
      confidenceLeveLStatus: formValues.confidenceLeveLStatus || null,
    };

    const url =
      BASE_URL +
      `corpSales/service/info?corpId=${corpId}&serviceId=${data?.id}`;
    const result = await saveData(url, obj);
    if (result.data) {
      enqueueSnackbar("Successfully Saved", {
        variant: "success",
      });
      navigate(-1);
    } else {
      enqueueSnackbar("An Error Occured.", {
        variant: "error",
      });
    }
  };

  console.log({ formValues });

  return (
    <Fragment>
      <MainPageLayoutWithBack title={`${data?.serviceName} Form`}>
        <Grid container sx={{ justifyContent: "space-between" }} spacing={2}>
          {getServiceFields(data?.id)?.map((val, index) => (
            <Grid item xs={12} lg={12} key={index}>
              {val.type === "dropdown" && (
                <CustomAutocomplete
                  label={val?.label}
                  placeholder={val?.label}
                  options={val?.options || []}
                  getOptionLabel={(option) => option || ""}
                  value={formValues?.[val?.fieldName] || ""}
                  onChange={(event, newValue, reason) => {
                    setFormValues({
                      ...formValues,
                      [val?.fieldName]: newValue,
                    });
                    if (reason === "clear") {
                      setFormValues({
                        ...formValues,
                        [val?.fieldName]: "",
                      });
                    }
                  }}
                />
              )}
              {val.type === "textField" && val.dataType === "string" && (
                <TextField
                  fullWidth
                  size="small"
                  label={val?.label}
                  placeholder={val?.label}
                  value={formValues?.[val?.fieldName] || ""}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      [val?.fieldName]: e.target.value,
                    });
                  }}
                />
              )}
              {val.type === "textField" && val.dataType === "number" && (
                <TextField
                  fullWidth
                  size="small"
                  label={val?.label}
                  placeholder={val?.label}
                  value={formValues?.[val?.fieldName] || ""}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (
                      inputValue === "" ||
                      (!isNaN(inputValue) && parseInt(inputValue))
                    ) {
                      setFormValues({
                        ...formValues,
                        [val?.fieldName]: inputValue,
                      });
                    }
                  }}
                />
              )}
              {val.type === "textFieldMultiline" && (
                <TextField
                  multiline
                  maxRows={5}
                  fullWidth
                  size="small"
                  label={val?.label}
                  placeholder={val?.label}
                  value={formValues?.[val?.fieldName] || ""}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      [val?.fieldName]: e.target.value,
                    });
                  }}
                  inputProps={{
                    style: {
                      minHeight: "130px",
                    },
                  }}
                />
              )}
              {val.type === "date" && (
                <GlobalDateLayout
                  label={val?.label}
                  placeholder={val?.label}
                  property={val.fieldName}
                  initialDate={formValues?.[val?.fieldName] || null}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  disablePast={true}
                />
              )}
              {val.type === "radioButton" && (
                <>
                  <FormControl>
                    <Typography>{val.label}</Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="radio-buttons-group"
                      value={formValues?.[val?.fieldName] || ""}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          [val?.fieldName]: e.target.value,
                        });
                      }}
                    >
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <FormControlLabel
                          value="REGULAR_USER"
                          control={<Radio />}
                          label="Regular User"
                        />
                        <FormControlLabel
                          value="FIRST_TIME_USER"
                          control={<Radio />}
                          label="First Time User"
                        />
                        <FormControlLabel
                          value="NON_USER"
                          control={<Radio />}
                          label="Non User"
                        />
                      </Box>
                    </RadioGroup>
                  </FormControl>
                  {val?.[formValues?.user]?.map((subVal, subIndex) => (
                    <Grid
                      sx={{
                        marginBottom:
                          subIndex === val?.[formValues.user]?.length - 1
                            ? -2
                            : 2,
                      }}
                      container
                      key={subIndex}
                    >
                      <Grid item xs={12} lg={12}>
                        {subVal.type === "dropdown" && (
                          <CustomAutocomplete
                            label={subVal?.label}
                            placeholder={subVal?.label}
                            options={subVal?.options || []}
                            getOptionLabel={(option) => option}
                            value={formValues[subVal.fieldName] || ""}
                            onChange={(event, newValue, reason) => {
                              setFormValues({
                                ...formValues,
                                [subVal.fieldName]: newValue,
                              });
                              if (reason === "clear") {
                                setFormValues({
                                  ...formValues,
                                  [subVal.fieldName]: "",
                                });
                              }
                            }}
                          />
                        )}
                        {subVal.type === "textField" &&
                          subVal.dataType === "string" && (
                            <TextField
                              fullWidth
                              size="small"
                              label={subVal?.label}
                              placeholder={subVal?.label}
                              value={formValues[subVal.fieldName] || ""}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  [subVal.fieldName]: e.target.value,
                                });
                              }}
                            />
                          )}
                      </Grid>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <CustomButtonBlue
              title="Save"
              onClick={() => {
                handleSave();
              }}
            />
          </Grid>
        </Grid>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default ServiceRequirementForm;

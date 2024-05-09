import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
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

const servicesFields = {
  62502: [
    {
      label: "List Of Tests",
      fieldName: "listOfTests",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Procedure of closure",
      fieldName: "procedureOfClosure",
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
      options: ["One Time", "Quaterly", "Semi Annually", "Throughout the year"],
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
      options: ["HR/ER Head", "Plant Head", "Purchase"],
    },
    {
      label: "Type Of User",
      fieldName: "typeOfUser",
      type: "radioButton",
      "Regular User": [
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
      "First Time User": [
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
      "None User": [],
    },
  ],
  62503: [
    {
      label: "List Of Tests",
      fieldName: "listOfTests",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Procedure of closure",
      fieldName: "procedureOfClosure",
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
      options: ["One Time", "Quaterly", "Semi Annually", "Throughout the year"],
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
      options: ["HR/ER Head", "Plant Head", "Purchase"],
    },
    {
      label: "Type Of User",
      fieldName: "typeOfUser",
      type: "radioButton",
      "Regular User": [
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
      "First Time User": [
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
      "None User": [],
    },
  ],
  62507: [
    {
      label: "Degree",
      fieldName: "degree",
      type: "dropdown",
      options: ["MBBS", "AFIH", "BOTH"],
    },
    {
      label: "Procedure of closure",
      fieldName: "procedureOfClosure",
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
      fieldName: "timing",
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
      options: ["HR/ER Head", "Plant Head", "Purchase"],
    },
    {
      label: "Type Of User",
      fieldName: "typeOfUser",
      type: "radioButton",
      "Regular User": [
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
      "First Time User": [
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
      "None User": [],
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
      fieldName: "procedureOfClosure",
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
      fieldName: "timing",
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
      options: ["HR/ER Head", "Plant Head", "Purchase"],
    },
    {
      label: "Type Of User",
      fieldName: "typeOfUser",
      type: "radioButton",
      "Regular User": [
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
      "First Time User": [
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
      "None User": [],
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
      fieldName: "procedureOfClosure",
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
      fieldName: "listOfMedicines",
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
      options: ["HR/ER Head", "Plant Head", "Purchase"],
    },
  ],
  62510: [
    {
      label: "Type of CSR",
      fieldName: "typeOfCSR",
      type: "dropdown",
      options: ["Education", "Healthcare", "Environment", "Other"],
    },
    {
      label: "Executed By",
      fieldName: "executedBy",
      type: "dropdown",
      options: ["Self", "Outsourced"],
    },

    {
      label: "Budget",
      fieldName: "budget",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Frequency",
      fieldName: "frequency",
      type: "dropdown",
      options: ["One Time", "Quaterly", "Semi Annually", "Throughout the year"],
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
      label: "Remarks",
      fieldName: "remarks",
      type: "textFieldMultiline",
      dataType: "string",
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR/ER Head", "Plant Head", "Purchase"],
    },
    {
      label: "Type Of User",
      fieldName: "typeOfUser",
      type: "radioButton",
      "Regular User": [
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
      "First Time User": [
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
      "None User": [],
    },
  ],
  62511: [
    {
      label: "List of Services",
      fieldName: "listOfServices",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Procedure of closure",
      fieldName: "procedureOfClosure",
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
      options: ["One Time", "Quaterly", "Semi Annually", "Throughout the year"],
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR/ER Head", "Plant Head", "Purchase"],
    },
    {
      label: "Type Of User",
      fieldName: "typeOfUser",
      type: "radioButton",
      "Regular User": [
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
      "First Time User": [
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
      "None User": [],
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
      fieldName: "procedureOfClosure",
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
      options: ["One Time", "Quaterly", "Semi Annually", "Throughout the year"],
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
      options: ["HR/ER Head", "Plant Head", "Purchase"],
    },
    {
      label: "Type Of User",
      fieldName: "typeOfUser",
      type: "radioButton",
      "Regular User": [
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
      "First Time User": [
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
      "None User": [],
    },
  ],
  62505: [
    {
      label: "OHC",
      fieldName: "ohc",
      type: "dropdown",
      options: ["New", "Old"],
    },
    {
      label: "Remark",
      fieldName: "remark",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Budget",
      fieldName: "budget",
      type: "textField",
      dataType: "string",
    },
  ],
  62504: [
    {
      label: "Type Of Insurance",
      fieldName: "typeOfInsurance",
      type: "dropdown",
      options: ["GHI", "GPA", "Workmen", "GTI"],
    },
    {
      label: "Request Type",
      fieldName: "requestType",
      type: "drowpDown",
      options: ["Renewal", "New"],
    },
    {
      label: "# Lifes",
      fieldName: "lifes",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Type Of Policy",
      fieldName: "typeOfPolicy",
      type: "dropdown",
      options: ["Individual", "Family", "Parents", "Others"],
    },
    {
      label: "Decision Owner",
      fieldName: "decisionOwner",
      type: "dropdown",
      options: ["HR/ER Head", "Plant Head", "Purchase"],
    },
    {
      label: "Type Of User",
      fieldName: "typeOfUser",
      type: "radioButton",
      "Regular User": [
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
      "First Time User": [
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
      "None User": [],
    },
  ],
  default: [
    {
      label: "Current Service Provider",
      fieldName: "currentServiceProvider",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Last Amount",
      fieldName: "lastAmount",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Due Date",
      fieldName: "dueDate",
      type: "date",
    },
    {
      label: "Remarks",
      fieldName: "remarks",
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
  const { itemId } = useParams();
  const data = JSON.parse(decodeURIComponent(itemId));

  const [formValues, setFormValues] = useState({
    listOfTests: "",
    procedureOfClosure: "",
    decisionMakingCriteria: "",
    dueDate: "",
    frequency: "",
    location: "",
    decisionOwner: "",
    typeOfUser: "",
    serviceProvider: "",
    oldRate: "",
    interestReason: "",
    painPoint: "",
    tentativeBudget: "",
    degree: "",
    timing: "",
    reasonForStarting: "",
    reasonForShift: "",
    listOfMedicines: "",
    monthlyConsumption: "",
    orderCycle: "",
    typeOfCSR: "",
    executedBy: "",
    budget: "",
    remark: "",
    listOfServices: "",
    noOfPeople: "",
    typeOfTraining: "",
    ohc: "",
    typeOfInsurance: "",
    requestType: "",
    noOfLives: "",
    typeOfPolicy: "",
  });

  const data1 =
    servicesFields &&
    servicesFields[62502] &&
    servicesFields[62502][7].type === "radioButton";
  const data2 =
    servicesFields &&
    servicesFields[62502][7] &&
    formValues &&
    formValues.typeOfUser &&
    servicesFields[62502][7].hasOwnProperty(formValues.typeOfUser);
  const data3 =
    servicesFields &&
    servicesFields[62502][7] &&
    formValues &&
    formValues.typeOfUser &&
    servicesFields[62502][7][formValues.typeOfUser];

  console.log({ data1, data2, data3, servicesFields });

  return (
    <Fragment>
      <MainPageLayoutWithBack title={`${data.serviceName} Form`}>
        <Grid container sx={{ justifyContent: "space-between" }} spacing={2}>
          {getServiceFields(data.id)?.map((val, index) => (
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
                  initialDate={formValues?.[val?.fieldName]}
                  formValues={formValues}
                  setFormValues={setFormValues}
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
                          value="Regular User"
                          control={<Radio />}
                          label="Regular User"
                        />
                        <FormControlLabel
                          value="First Time User"
                          control={<Radio />}
                          label="First Time User"
                        />
                        <FormControlLabel
                          value="None User"
                          control={<Radio />}
                          label="None User"
                        />
                      </Box>
                    </RadioGroup>
                  </FormControl>
                  {val[formValues.typeOfUser]?.map((subVal, subIndex) => (
                    <Grid
                      sx={{
                        marginBottom:
                          subIndex === val[formValues.typeOfUser].length - 1
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
            }}
          >
            <CustomButtonBlue title="Save" onClick={() => {}} />
          </Grid>
        </Grid>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default ServiceRequirementForm;

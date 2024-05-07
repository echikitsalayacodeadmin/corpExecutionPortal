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

const servicesFields = {
  62502: [
    {
      label: "AHC Interested Yes or No",
      fieldName: "corpRequirementStatus",
      type: "dropdown",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
      ],
    },
    {
      label: "Due Date",
      fieldName: "dueDate",
      type: "date",
    },
    {
      label: "Confidence level",
      fieldName: "confidenceLeveLStatus",
      type: "dropdown",
      options: [
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "GOOD_CONFIDENCE", label: "Good Confidence" },
        { value: "MAY_BE", label: "May Be" },
        { value: "DIFFICULT", label: "Difficult" },
        { value: "LOST", label: "Lost" },
        { value: "DONE", label: "Done" },
        { value: "JUST_A_LEAD", label: "Just a Lead" },
        {
          value: "VENDOR_REGISTRATION_STARTED",
          label: "Vendor Registration Started",
        },
        { value: "DUE_LATER", label: "Due Later" },
      ],
    },
    {
      label: "Estimated Business Size",
      fieldName: "estimatedBusinessSize",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Remarks",
      fieldName: "remarks",
      type: "textFieldMultiline",
      dataType: "string",
    },
  ],
  62503: [
    {
      label: "Pre Emp Interested Yes or No",
      fieldName: "corpRequirementStatus",
      type: "dropdown",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
      ],
    },
    {
      label: "Monthly Influx",
      fieldName: "required",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Current Service Provider",
      fieldName: "currentServiceProvider",
      type: "textField",
      dataType: "string",
    },

    {
      label: "Confidence level",
      fieldName: "confidenceLeveLStatus",
      type: "dropdown",
      options: [
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "GOOD_CONFIDENCE", label: "Good Confidence" },
        { value: "MAY_BE", label: "May Be" },
        { value: "DIFFICULT", label: "Difficult" },
        { value: "LOST", label: "Lost" },
        { value: "DONE", label: "Done" },
        { value: "JUST_A_LEAD", label: "Just a Lead" },
        {
          value: "VENDOR_REGISTRATION_STARTED",
          label: "Vendor Registration Started",
        },
        { value: "DUE_LATER", label: "Due Later" },
      ],
    },
    {
      label: "Estimated Business Size",
      fieldName: "estimatedBusinessSize",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Remarks",
      fieldName: "remarks",
      type: "textFieldMultiline",
      dataType: "string",
    },
  ],
  62504: [
    {
      label: "Insurance Interested Yes or No",
      fieldName: "corpRequirementStatus",
      type: "dropdown",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
      ],
    },
    {
      label: "Type of Policy",
      fieldName: "typeOfPolicy",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Number of Lives",
      fieldName: "numberOfLives",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Due Date",
      fieldName: "dueDate",
      type: "date",
    },
    {
      label: "Current Player",
      fieldName: "currentServiceProvider",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Descision Making",
      fieldName: "decisionMaking",
      type: "textField",
      dataType: "string",
    },

    {
      label: "Confidence level",
      fieldName: "confidenceLeveLStatus",
      type: "dropdown",
      options: [
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "GOOD_CONFIDENCE", label: "Good Confidence" },
        { value: "MAY_BE", label: "May Be" },
        { value: "DIFFICULT", label: "Difficult" },
        { value: "LOST", label: "Lost" },
        { value: "DONE", label: "Done" },
        { value: "JUST_A_LEAD", label: "Just a Lead" },
        {
          value: "VENDOR_REGISTRATION_STARTED",
          label: "Vendor Registration Started",
        },
        { value: "DUE_LATER", label: "Due Later" },
      ],
    },

    {
      label: "Remarks",
      fieldName: "remarks",
      type: "textFieldMultiline",
      dataType: "string",
    },
  ],
  62512: [
    {
      label: "OHC Stafff Interested Yes or No",
      fieldName: "corpRequirementStatus",
      type: "dropdown",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
      ],
    },
    {
      label: "Current Player",
      fieldName: "currentServiceProvider",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Number of Staff Needed",
      fieldName: "noOfStaffNeeded",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Doctor Type Required",
      fieldName: "doctorTypeRequired",
      type: "textField",
      dataType: "string",
    },

    {
      label: "Confidence level",
      fieldName: "confidenceLeveLStatus",
      type: "dropdown",
      options: [
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "GOOD_CONFIDENCE", label: "Good Confidence" },
        { value: "MAY_BE", label: "May Be" },
        { value: "DIFFICULT", label: "Difficult" },
        { value: "LOST", label: "Lost" },
        { value: "DONE", label: "Done" },
        { value: "JUST_A_LEAD", label: "Just a Lead" },
        {
          value: "VENDOR_REGISTRATION_STARTED",
          label: "Vendor Registration Started",
        },
        { value: "DUE_LATER", label: "Due Later" },
      ],
    },
    {
      label: "Estimated Business Size",
      fieldName: "estimatedBusinessSize",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Remarks",
      fieldName: "remarks",
      type: "textFieldMultiline",
      dataType: "string",
    },
  ],
  62508: [
    {
      label: "Interested in Medicines or Not",
      fieldName: "corpRequirementStatus",
      type: "dropdown",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
      ],
    },
    {
      label: "Current Player",
      fieldName: "currentServiceProvider",
      type: "textField",
      dataType: "string",
    },

    {
      label: "Confidence level",
      fieldName: "confidenceLeveLStatus",
      type: "dropdown",
      options: [
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "GOOD_CONFIDENCE", label: "Good Confidence" },
        { value: "MAY_BE", label: "May Be" },
        { value: "DIFFICULT", label: "Difficult" },
        { value: "LOST", label: "Lost" },
        { value: "DONE", label: "Done" },
        { value: "JUST_A_LEAD", label: "Just a Lead" },
        {
          value: "VENDOR_REGISTRATION_STARTED",
          label: "Vendor Registration Started",
        },
        { value: "DUE_LATER", label: "Due Later" },
      ],
    },
    {
      label: "Estimated Business Size",
      fieldName: "estimatedBusinessSize",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Remarks",
      fieldName: "remarks",
      type: "textFieldMultiline",
      dataType: "string",
    },
  ],
  62505: [
    {
      label: "Interested or Not",
      fieldName: "corpRequirementStatus",
      type: "dropdown",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
      ],
    },
    {
      label: "Type of Request",
      fieldName: "typeOfRequest",
      type: "textField",
      dataType: "string",
    },

    {
      label: "Confidence level",
      fieldName: "confidenceLeveLStatus",
      type: "dropdown",
      options: [
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "GOOD_CONFIDENCE", label: "Good Confidence" },
        { value: "MAY_BE", label: "May Be" },
        { value: "DIFFICULT", label: "Difficult" },
        { value: "LOST", label: "Lost" },
        { value: "DONE", label: "Done" },
        { value: "JUST_A_LEAD", label: "Just a Lead" },
        {
          value: "VENDOR_REGISTRATION_STARTED",
          label: "Vendor Registration Started",
        },
        { value: "DUE_LATER", label: "Due Later" },
      ],
    },
    {
      label: "Estimated Business Size",
      fieldName: "estimatedBusinessSize",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Remarks",
      fieldName: "remarks",
      type: "textFieldMultiline",
      dataType: "string",
    },
  ],
  62509: [
    {
      label: "Interested or Not",
      fieldName: "corpRequirementStatus",
      type: "dropdown",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
      ],
    },
    {
      label: "# of training needed",
      fieldName: "noOfTrainingNeeded",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Confidence level",
      fieldName: "confidenceLeveLStatus",
      type: "dropdown",
      options: [
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "GOOD_CONFIDENCE", label: "Good Confidence" },
        { value: "MAY_BE", label: "May Be" },
        { value: "DIFFICULT", label: "Difficult" },
        { value: "LOST", label: "Lost" },
        { value: "DONE", label: "Done" },
        { value: "JUST_A_LEAD", label: "Just a Lead" },
        {
          value: "VENDOR_REGISTRATION_STARTED",
          label: "Vendor Registration Started",
        },
        { value: "DUE_LATER", label: "Due Later" },
      ],
    },
    {
      label: "Estimated Business Size",
      fieldName: "estimatedBusinessSize",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Remarks",
      fieldName: "remarks",
      type: "textFieldMultiline",
      dataType: "string",
    },
  ],
  62497: [
    {
      label: "Interested or Not",
      fieldName: "corpRequirementStatus",
      type: "dropdown",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
      ],
    },
    {
      label: "Type of Request",
      fieldName: "typeOfRequest",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Emergency Tie up",
      fieldName: "emergencyTieUp",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Current Service Provider",
      fieldName: "currentServiceProvider",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Number of accidents in month",
      fieldName: "noOfAccidentsInMonth",
      type: "textField",
      dataType: "number",
    },

    {
      label: "Confidence level",
      fieldName: "confidenceLeveLStatus",
      type: "dropdown",
      options: [
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "GOOD_CONFIDENCE", label: "Good Confidence" },
        { value: "MAY_BE", label: "May Be" },
        { value: "DIFFICULT", label: "Difficult" },
        { value: "LOST", label: "Lost" },
        { value: "DONE", label: "Done" },
        { value: "JUST_A_LEAD", label: "Just a Lead" },
        {
          value: "VENDOR_REGISTRATION_STARTED",
          label: "Vendor Registration Started",
        },
        { value: "DUE_LATER", label: "Due Later" },
      ],
    },
    {
      label: "Estimated Business Size",
      fieldName: "estimatedBusinessSize",
      type: "textField",
      dataType: "number",
    },
    {
      label: "Remarks",
      fieldName: "remarks",
      type: "textFieldMultiline",
      dataType: "string",
    },
  ],
  default: [
    {
      label: "Required",
      fieldName: "required",
      type: "textField",
      dataType: "string",
    },
    {
      label: "Last Player",
      fieldName: "lastPlayer",
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

const ServiceInfo = ({ data, setFetch }) => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const corpSalesId = itemId;
  const userId = localStorage.getItem("USER_ID_CORP_SALES");
  const userName = localStorage.getItem("USER_NAME_CORP_SALES");
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRow, setSelectedRow] = useState("");
  const [rows, setRows] = useState([]);

  const fetchServices = async () => {
    const url = BASE_URL + "corpSales/services";
    const result = await getData(url);
    if (result.data) {
      console.log({ data });
      const temp = result.data.map((item) => ({
        ...item,
        testName: item.serviceName,
        status: data?.[item.id]?.status || null,
        modalType:
          item.serviceName === "Paramedical Staff"
            ? "3"
            : item.serviceName === "Doctor's visit"
            ? "2"
            : "1",
        servicesInfoVM:
          {
            required: data?.[item.id]?.required || "",
            lastPlayer: data?.[item.id]?.lastPlayer || "",
            lastAmount: data?.[item.id]?.lastAmount || "",
            dueDate: data?.[item.id]?.dueDate
              ? new Date(data?.[item.id]?.dueDate)
              : null,
            remarks: data?.[item.id]?.remarks || "",
            confidenceLeveLStatus: data?.[item.id]?.confidenceLeveLStatus || "",
            corpRequirementStatus: data?.[item.id]?.corpRequirementStatus || "",
            estimatedBusinessSize: data?.[item.id]?.estimatedBusinessSize || "",
            typeOfPolicy: data?.[item.id]?.typeOfPolicy || "",
            numberOfLives: data?.[item.id]?.numberOfLives || "",
            decisionMaking: data?.[item.id]?.decisionMaking || "",
            currentServiceProvider:
              data?.[item.id]?.currentServiceProvider || "",
            noOfStaffNeeded: data?.[item.id]?.noOfStaffNeeded || "",
            doctorTypeRequired: data?.[item.id]?.doctorTypeRequired || "",
            typeOfRequest: data?.[item.id]?.typeOfRequest || "",
            noOfTrainingNeeded: data?.[item.id]?.noOfTrainingNeeded || "",
            emergencyTieUp: data?.[item.id]?.emergencyTieUp || "",
            noOfAccidentsInMonth: data?.[item.id]?.noOfAccidentsInMonth || "",
          } || "",
      }));
      setRows(temp);
    } else {
      setRows([]);
    }
  };
  useEffect(() => {
    fetchServices();
  }, [data]);

  const [openModal, setOpenModal] = useState(false);
  const [openModalQuote, setOpenModalQuote] = useState(false);

  const [moreInfoObject, setMoreInfoObject] = useState({
    status: "",
    required: "",
    lastPlayer: "",
    lastAmount: "",
    dueDate: dayjs().format("YYYY-MM-DD"),
    remarks: "",
    confidenceLeveLStatus: { label: "", value: "" },
    corpRequirementStatus: { label: "", value: "" },
    estimatedBusinessSize: "",
    typeOfPolicy: "",
    numberOfLives: "",
    decisionMaking: "",
    currentServiceProvider: "",
    noOfStaffNeeded: "",
    doctorTypeRequired: "",
    typeOfRequest: "",
    noOfTrainingNeeded: "",
    emergencyTieUp: "",
    noOfAccidentsInMonth: "",
    isEdit: false,
  });
  const handleSave = async (data) => {
    const obj = {
      status: data?.status,
      required: data.servicesInfoVM.required,
      lastPlayer: data.servicesInfoVM.lastPlayer,
      lastAmount: data.servicesInfoVM.lastAmount,
      dueDate: data.servicesInfoVM.dueDate,
      remarks: data.servicesInfoVM.remarks,
      userId: userId,
      userName: userName,
      confidenceLeveLStatus:
        data.servicesInfoVM.confidenceLeveLStatus.value || null,
      corpRequirementStatus:
        data.servicesInfoVM.corpRequirementStatus.value || null,
      estimatedBusinessSize: data.servicesInfoVM.estimatedBusinessSize,
      typeOfPolicy: data.servicesInfoVM.typeOfPolicy,
      numberOfLives: data.servicesInfoVM.numberOfLives,
      decisionMaking: data.servicesInfoVM.decisionMaking,
      currentServiceProvider: data.servicesInfoVM.currentServiceProvider,
      noOfStaffNeeded: data.servicesInfoVM.noOfStaffNeeded,
      doctorTypeRequired: data.servicesInfoVM.doctorTypeRequired,
      typeOfRequest: data.servicesInfoVM.typeOfRequest,
      noOfTrainingNeeded: data.servicesInfoVM.noOfTrainingNeeded,
      emergencyTieUp: data.servicesInfoVM.emergencyTieUp,
      noOfAccidentsInMonth: data.servicesInfoVM.noOfAccidentsInMonth,
    };

    const url =
      BASE_URL +
      `corpSales/service/info?corpId=${corpSalesId}&serviceId=${data?.id}`;
    const result = await saveData(url, obj);
    if (result.data) {
      enqueueSnackbar("Successfully Saved", {
        variant: "success",
      });
      setFetch(true);
    } else {
      enqueueSnackbar("An Error Occured.", {
        variant: "error",
      });
    }
  };

  console.log({ rows, data, selectedRow, moreInfoObject });

  return (
    <Fragment>
      {rows.map((obj) => (
        <Grid
          columnSpacing={0.5}
          container
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
          <Grid item xs={9} lg={5}>
            <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              {obj.testName}
            </Typography>
          </Grid>
          <Grid item xs={1.5} lg={1}>
            <Tooltip title="More Info">
              <IconButton
                onClick={() => {
                  const servicesInfo = obj?.servicesInfoVM || null;
                  console.log({ servicesInfo });
                  setOpenModal(true);
                  setSelectedRow(obj);
                  setMoreInfoObject({
                    required: servicesInfo.required || "",
                    lastPlayer: servicesInfo.lastPlayer || "",
                    lastAmount: servicesInfo.lastAmount || "",
                    dueDate: servicesInfo.dueDate
                      ? new Date(servicesInfo.dueDate)
                      : dayjs().format("YYYY-MM-DD"),
                    remarks: servicesInfo.remarks || "",
                    confidenceLeveLStatus: {
                      value: servicesInfo?.confidenceLeveLStatus || "",
                      label:
                        servicesInfo?.confidenceLeveLStatus
                          ?.replace(/_/g, " ")
                          ?.toLowerCase()
                          ?.replace(/^\w/, (c) => c?.toUpperCase()) || "",
                    },

                    corpRequirementStatus: {
                      value: servicesInfo?.corpRequirementStatus || "",
                      label:
                        servicesInfo?.corpRequirementStatus
                          ?.replace(/_/g, " ")
                          ?.toLowerCase()
                          ?.replace(/^\w/, (c) => c?.toUpperCase()) || "",
                    },
                    estimatedBusinessSize:
                      servicesInfo.estimatedBusinessSize || "",
                    typeOfPolicy: servicesInfo.typeOfPolicy || "",
                    numberOfLives: servicesInfo.numberOfLives || "",
                    decisionMaking: servicesInfo.decisionMaking || "",
                    currentServiceProvider:
                      servicesInfo.currentServiceProvider || "",
                    noOfStaffNeeded: servicesInfo.noOfStaffNeeded || "",
                    doctorTypeRequired: servicesInfo.doctorTypeRequired || "",
                    typeOfRequest: servicesInfo.typeOfRequest || "",
                    noOfTrainingNeeded: servicesInfo.noOfTrainingNeeded || "",
                    emergencyTieUp: servicesInfo.emergencyTieUp || "",
                    noOfAccidentsInMonth:
                      servicesInfo.noOfAccidentsInMonth || "",
                  });
                }}
              >
                <InfoIcon style={{ color: "#127DDD" }} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1.5} lg={1}>
            <Tooltip title="View Quotation">
              <IconButton
                onClick={() => {
                  const query = {
                    corpId: corpSalesId,
                    serviceName: obj.testName,
                  };
                  navigate(
                    `/corp/salesvisit/quotationlist/${encodeURIComponent(
                      JSON.stringify(query)
                    )}`
                  );
                }}
                size="small"
                variant="contained"
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={8} lg={3}>
            <CustomAutocomplete
              fullWidth
              size="small"
              options={[
                {
                  label: "INTERESTED",
                  value: "INTERESTED",
                },
                {
                  label: "NOT INTERESTED",
                  value: "NOT_INTERESTED",
                },

                {
                  label: "ONE_MORE_MEETING",
                  value: "ONE_MORE_MEETING",
                },
                {
                  label: "QUOTATION_ASKED",
                  value: "QUOTATION_ASKED",
                },
                {
                  label: "QUOTATION_SENT",
                  value: "QUOTATION_SENT",
                },
                {
                  label: "NEGOTIATION",
                  value: "NEGOTIATION",
                },
                {
                  label: "QUOTATION_APPROVED",
                  value: "QUOTATION_APPROVED",
                },
                {
                  label: "QUOTATION_REJECTED",
                  value: "QUOTATION_REJECTED",
                },
                {
                  label: "ORDER_LOST",
                  value: "ORDER_LOST",
                },
              ]}
              value={{
                label: obj.status || "",
                value: obj.status || "",
              }}
              onChange={(event, newValue, reason) => {
                const updatedRows = rows.map((row) =>
                  row.id === obj.id ? { ...obj, status: newValue.value } : row
                );
                setRows(updatedRows);
                if (reason === "clear") {
                  const updatedRows = rows.map((row) =>
                    row.id === obj.id ? { ...obj, status: null } : row
                  );
                  setRows(updatedRows);
                }
              }}
              label="Mark Status"
              placeholder="Mark Status"
            />
          </Grid>
          <Grid
            item
            xs={4}
            lg={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              disabled={obj.status ? false : true}
              onClick={() => {
                handleSave(obj);
              }}
              size="small"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      ))}

      <ViewAllQuotation
        openModal={openModalQuote}
        setOpenModal={setOpenModalQuote}
        selectedRow={selectedRow}
      />

      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setMoreInfoObject({
              id: "",
              required: "",
              lastPlayer: "",
              lastAmount: "",
              dueDate: dayjs().format("YYYY-MM-DD"),
              remarks: "",
              confidenceLeveLStatus: { label: "", value: "" },
              corpRequirementStatus: { label: "", value: "" },
              estimatedBusinessSize: "",
              typeOfPolicy: "",
              numberOfLives: "",
              decisionMaking: "",
              currentServiceProvider: "",
              noOfStaffNeeded: "",
              doctorTypeRequired: "",
              typeOfRequest: "",
              noOfTrainingNeeded: "",
              emergencyTieUp: "",
              noOfAccidentsInMonth: "",
              isEdit: false,
            });
          }}
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
              minHeight: "70vh",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                onClick={() => {
                  setOpenModal(false);
                  setMoreInfoObject({
                    id: "",
                    required: "",
                    lastPlayer: "",
                    lastAmount: "",
                    dueDate: dayjs().format("YYYY-MM-DD"),
                    remarks: "",
                    confidenceLeveLStatus: { label: "", value: "" },
                    corpRequirementStatus: { label: "", value: "" },
                    estimatedBusinessSize: "",
                    typeOfPolicy: "",
                    numberOfLives: "",
                    decisionMaking: "",
                    currentServiceProvider: "",
                    noOfStaffNeeded: "",
                    doctorTypeRequired: "",
                    typeOfRequest: "",
                    noOfTrainingNeeded: "",
                    emergencyTieUp: "",
                    noOfAccidentsInMonth: "",
                    isEdit: false,
                  });
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{ textAlign: "center", marginTop: "-30px", marginBottom: 2 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {selectedRow?.testName}
              </Typography>
            </Box>

            <Grid
              container
              sx={{ justifyContent: "space-between" }}
              spacing={2}
            >
              {getServiceFields(selectedRow.id)?.map((val, index) => (
                <Grid item xs={12} lg={12} key={index}>
                  {val.type === "dropdown" && (
                    <CustomAutocomplete
                      label={val?.label}
                      placeholder={val?.label}
                      options={val?.options || []}
                      value={moreInfoObject?.[val?.fieldName]}
                      onChange={(event, newValue, reason) => {
                        setMoreInfoObject({
                          ...moreInfoObject,
                          [val.fieldName]: newValue || "",
                        });
                        if (reason === "clear") {
                          setMoreInfoObject({
                            ...moreInfoObject,
                            [val.fieldName]: "",
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
                      value={moreInfoObject?.[val?.fieldName] || ""}
                      onChange={(e) => {
                        setMoreInfoObject({
                          ...moreInfoObject,
                          [val.fieldName]: e.target.value,
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
                      value={moreInfoObject?.[val?.fieldName] || ""}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (
                          inputValue === "" ||
                          (!isNaN(inputValue) && parseInt(inputValue))
                        ) {
                          setMoreInfoObject({
                            ...moreInfoObject,
                            [val.fieldName]: inputValue,
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
                      value={moreInfoObject?.[val?.fieldName]}
                      onChange={(e) => {
                        setMoreInfoObject({
                          ...moreInfoObject,
                          [val.fieldName]: e.target.value,
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
                      initialDate={moreInfoObject?.[val?.fieldName]}
                      formValues={moreInfoObject}
                      setFormValues={setMoreInfoObject}
                      property={val.fieldName}
                    />
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
                <CustomButtonBlue
                  title="Save"
                  onClick={() => {
                    const newRow = { ...moreInfoObject };
                    // console.log({ newRow });
                    const updatedRows = rows.map((row) =>
                      row.id === selectedRow.id
                        ? { ...row, servicesInfoVM: newRow }
                        : row
                    );
                    // console.log({ updatedRows });
                    const modifiedRow = updatedRows.find(
                      (item) => item.id === selectedRow.id
                    );
                    // console.log({ modifiedRow });
                    handleSave(modifiedRow);
                    setRows(updatedRows);
                    setOpenModal(false);
                    setMoreInfoObject({
                      id: "",
                      required: "",
                      lastPlayer: "",
                      lastAmount: "",
                      dueDate: dayjs().format("YYYY-MM-DD"),
                      remarks: "",
                      confidenceLeveLStatus: { label: "", value: "" },
                      corpRequirementStatus: { label: "", value: "" },
                      estimatedBusinessSize: "",
                      typeOfPolicy: "",
                      numberOfLives: "",
                      decisionMaking: "",
                      currentServiceProvider: "",
                      noOfStaffNeeded: "",
                      doctorTypeRequired: "",
                      typeOfRequest: "",
                      noOfTrainingNeeded: "",
                      emergencyTieUp: "",
                      noOfAccidentsInMonth: "",
                      isEdit: false,
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default ServiceInfo;

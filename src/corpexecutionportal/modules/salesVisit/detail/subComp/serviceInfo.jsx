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
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../../assets/constants";
import { getData, saveData } from "../../../../assets/corpServices";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";
import { CustomTypographyBold } from "../../../../../assets/customTypography";
import GlobalDateLayout from "../../../../../assets/globalDateLayout/globalDateLayout";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";

const ServiceInfo = ({ data }) => {
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
            required: data?.[item.id]?.required,
            lastPlayer: data?.[item.id]?.lastPlayer,
            lastAmount: data?.[item.id]?.lastAmount,
            dueDate: new Date(data?.[item.id]?.dueDate),
            comments: data?.[item.id]?.comments,
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
    required: "",
    lastPlayer: "",
    lastAmount: "",
    dueDate: new Date()?.toISOString().split("T")[0],
    comments: "",
    isEdit: false,
  });
  const handleSave = async (data) => {
    const obj = {
      status: data?.status,
      required: data.servicesInfoVM.required,
      lastPlayer: data.servicesInfoVM.lastPlayer,
      lastAmount: data.servicesInfoVM.lastAmount,
      dueDate: data.servicesInfoVM.dueDate,
      comments: data.servicesInfoVM.comments,
      userId: userId,
      userName: userName,
    };

    const url =
      BASE_URL +
      `corpSales/service/info?corpId=${corpSalesId}&serviceId=${data?.id}`;
    const result = await saveData(url, obj);
    if (result.data) {
      enqueueSnackbar("Uploaded successfully.", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("An Error Occured.", {
        variant: "error",
      });
    }
  };

  console.log({ rows, data });

  return (
    <Fragment>
      <Grid
        container
        sx={{
          boxSizing: "border-box",
          background: "#FFFFFF",
          border: "0.5px solid #A6A6A6",
          borderRadius: 5,
          padding: 1,
          marginBlock: 2,
          alignItems: "center",
        }}
      >
        <Grid item xs={12}>
          {rows.map((obj) => (
            <Grid
              container
              key={obj.id}
              sx={{
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
              <Grid item xs={3} lg={1}>
                <Tooltip title="More Info">
                  <IconButton
                    onClick={() => {
                      const servicesInfo = obj.servicesInfoVM;
                      setOpenModal(true);
                      setSelectedRow(obj);
                      setMoreInfoObject({
                        required: servicesInfo.required,
                        lastPlayer: servicesInfo.lastPlayer,
                        lastAmount: servicesInfo.lastAmount,
                        dueDate: servicesInfo.dueDate
                          ? new Date(servicesInfo.dueDate)
                          : null,
                        comments: servicesInfo.comments,
                      });
                    }}
                  >
                    <InfoIcon style={{ color: "#127DDD" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
              {/* <Grid item xs={1.5} lg={1}>
                <Tooltip title="View Quotation">
                  <IconButton
                    onClick={() => {
                      setOpenModalQuote(true);
                    }}
                    size="small"
                    variant="contained"
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                </Tooltip>
              </Grid> */}

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
                      row.id === obj.id
                        ? { ...obj, status: newValue.value }
                        : row
                    );
                    setRows(updatedRows);
                    if (reason === "clear") {
                      const updatedRows = rows.map((row) =>
                        row.id === obj.id ? { ...obj, status: null } : row
                      );
                      setRows(updatedRows);
                    }
                  }}
                  styles={{ width: "200px" }}
                  label="Mark Status"
                  placeholder="Mark Status"
                />
              </Grid>
              <Grid item xs={4} lg={2}>
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
        </Grid>
      </Grid>

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
              dueDate: new Date()?.toISOString().split("T")[0],
              comments: "",
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
                    dueDate: new Date()?.toISOString().split("T")[0],
                    comments: "",
                    isEdit: false,
                  });
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ textAlign: "center", marginTop: "-30px" }}>
              <Typography>{selectedRow?.testName}</Typography>
            </Box>

            <Grid
              container
              sx={{ justifyContent: "space-between" }}
              spacing={2}
            >
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  size="small"
                  label={
                    selectedRow.modalType === "1"
                      ? "#Required"
                      : selectedRow.modalType === "2"
                      ? "#Doctors"
                      : selectedRow.modalType === "3"
                      ? "Paramedical Staff"
                      : null
                  }
                  placeholder={
                    selectedRow.modalType === "1"
                      ? "#Required"
                      : selectedRow.modalType === "2"
                      ? "#Doctors"
                      : selectedRow.modalType === "3"
                      ? "Paramedical Staff"
                      : null
                  }
                  value={moreInfoObject.required || ""}
                  onChange={(e) => {
                    setMoreInfoObject({
                      ...moreInfoObject,
                      required: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Last Player"
                  placeholder="Last Player"
                  value={moreInfoObject.lastPlayer || ""}
                  onChange={(e) => {
                    setMoreInfoObject({
                      ...moreInfoObject,
                      lastPlayer: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Existing Amount"
                  placeholder="Last Amount"
                  value={moreInfoObject.lastAmount || ""}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (
                      inputValue === "" ||
                      (!isNaN(inputValue) && parseInt(inputValue))
                    ) {
                      setMoreInfoObject({
                        ...moreInfoObject,
                        lastAmount: inputValue,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <GlobalDateLayout
                  label={"Due Date"}
                  initialDate={moreInfoObject.dueDate}
                  formValues={moreInfoObject}
                  setFormValues={setMoreInfoObject}
                  property="dueDate"
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  multiline
                  maxRows={5}
                  fullWidth
                  size="small"
                  label="Comments"
                  placeholder="Comments"
                  value={moreInfoObject.comments || ""}
                  onChange={(e) => {
                    setMoreInfoObject({
                      ...moreInfoObject,
                      comments: e.target.value,
                    });
                  }}
                  inputProps={{
                    style: {
                      minHeight: "130px",
                    },
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
                <CustomButtonBlue
                  title="Save"
                  onClick={() => {
                    const newRow = { ...moreInfoObject };
                    const updatedRows = rows.map((row) =>
                      row.id === selectedRow.id
                        ? { ...row, servicesInfoVM: newRow }
                        : row
                    );

                    const modifiedRow = updatedRows.find(
                      (item) => item.id === selectedRow.id
                    );
                    handleSave(modifiedRow);
                    setRows(updatedRows);
                    setOpenModal(false);
                    setMoreInfoObject({
                      id: "",
                      required: "",
                      lastPlayer: "",
                      lastAmount: "",
                      dueDate: new Date()?.toISOString().split("T")[0],
                      comments: "",
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

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Portal,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomDate } from "./comps/customDateComps";
import CustomTextField from "./comps/customTextField";
import SingleUpload from "./comps/singleUpload";
import PaymentStatusFilter from "./comps/PaymentStatusFilter";
import { uploadFile } from "../../../assets/corpServices";
import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import dayjs from "dayjs";
import { getCompanyList } from "../../../services/genericTicketingSystem";
import ChooseCompanyForm from "./comps/chooseCompanyForm";
import {
  PaymentStatusColor,
  PaymentStatusList,
} from "../../../assets/corpConstants";

const AddInvoiceForm = ({
  label,
  formValues,
  setFormValues,
  formData,
  authId = localStorage.getItem("USER_ID_CORP_SALES"),
  getInvoiceList,
  corpId,
}) => {
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    getCompanyList(setCompanyList);
  }, []);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = BASE_URL + `invoice/corp/addInvoice`;

    formData.append("corpId", formValues.company?.corpId);
    formData.append(
      "invoiceDate",
      formValues.inVoiceDate
        ? dayjs(formValues.inVoiceDate).format("YYYY-MM-DD")
        : ""
    );
    formData.append("serviceDetails", formValues.serviceDetails);
    formData.append("paymentStatus", formValues.paymentStatus);
    formData.append("totalInvoiceAmount", formValues.totalInvoiceAmount);
    formData.append("totalReceivedAmount", formValues.totalReceivedAmount);
    formData.append("addedBy", authId);

    const res = await uploadFile(url, formData);
    if (res.error) {
      enqueueSnackbar("Failed to create invoice!", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Successfully created invoice.", {
        variant: "success",
      });
      handleClose();
      setFormValues({});
      getInvoiceList();
      console.log({ success: res.data });
    }
  };

  return (
    <Fragment>
      <Box>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "inherit", background: "#0463FA" }}
          onClick={handleClickOpen}
        >
          {label}
        </Button>
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Portal>
              <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleClose}
              >
                <DialogTitle
                  component={Paper}
                  textAlign="center"
                  sx={{
                    fill: "#FFF",
                    filter: "drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25))",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Box
                      width="100%"
                      component={Stack}
                      direction="column"
                      display="flex"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Typography
                        sx={{
                          color: " #000",
                          fontFamily: "Poppins",
                          fontSize: 22,
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "normal",
                        }}
                      >
                        {companyList.find((v) => v.corpId === corpId)
                          ?.orgName || ""}
                      </Typography>
                      <Typography
                        sx={{
                          color: " #000",
                          fontFamily: "Poppins",
                          fontSize: 15,
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                        }}
                      >
                        Add New Invoice
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton onClick={handleClose} sx={{ p: 0, m: 0 }}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Stack>
                </DialogTitle>

                <DialogContent>
                  <form onSubmit={submitHandler}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "fit-content",
                        my: 5,
                        mx: 5,
                      }}
                    >
                      <Grid container spacing={3}>
                        <Grid item lg={12}>
                          <Stack
                            direction="row"
                            spacing={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Typography
                              sx={{
                                color: " #000",
                                fontFamily: "Poppins",
                                fontSize: 12,
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                opacity: 0.8,
                              }}
                            >
                              Invoice File (Attachment)
                            </Typography>
                            <SingleUpload
                              title="Choose File"
                              formData={formData}
                            />
                          </Stack>
                        </Grid>

                        <Grid item lg={6}>
                          <CustomDate
                            formValues={formValues}
                            setFormValues={setFormValues}
                            label="Invoice Date"
                          />
                        </Grid>

                        <Grid item lg={6}>
                          <CustomTextField
                            required
                            fullWidth
                            size="small"
                            label="Service Details"
                            placeholder="eg : enter details..."
                            value={formValues.serviceDetails || ""}
                            onChange={(e) =>
                              setFormValues({
                                ...formValues,
                                serviceDetails: e.target.value,
                              })
                            }
                          />
                        </Grid>

                        <Grid item lg={6}>
                          <CustomTextField
                            required
                            fullWidth
                            // type="number"
                            size="small"
                            label="Total Invoice Amount"
                            placeholder="eg : enter total invoice amount..."
                            value={formValues.totalInvoiceAmount || ""}
                            onChange={(e) => {
                              if (!isNaN(e.target.value)) {
                                setFormValues({
                                  ...formValues,
                                  totalInvoiceAmount: e.target.value,
                                });
                              }
                            }}
                          />
                        </Grid>

                        <Grid item lg={6}>
                          <CustomTextField
                            // type="number"
                            onFocus={(event) => {
                              event.target.select();
                            }}
                            required
                            fullWidth
                            size="small"
                            label="Total Received Amount"
                            placeholder="eg : enter total received amount..."
                            value={formValues.totalReceivedAmount}
                            onChange={(e) => {
                              if (
                                (!isNaN(e.target.value) &&
                                  parseInt(e.target.value) <=
                                    parseInt(formValues.totalInvoiceAmount)) ||
                                e.target.value === ""
                              ) {
                                setFormValues({
                                  ...formValues,
                                  totalReceivedAmount: e.target.value,
                                  paymentStatus:
                                    parseInt(formValues.totalInvoiceAmount) -
                                      parseInt(e.target.value) ===
                                    0
                                      ? "FULL_PAYMENT_RECEIVED"
                                      : parseInt(e.target.value) > 0 &&
                                        parseInt(
                                          formValues.totalInvoiceAmount
                                        ) -
                                          parseInt(e.target.value) >
                                          0
                                      ? "PARTIAL_PAYMENT_RECEIVED"
                                      : "FULL_PAYMENT_PENDING",
                                });
                              }
                            }}
                            helperText={
                              formValues.paymentStatus
                                ? `Payment Status: ${
                                    PaymentStatusList.find(
                                      (v) =>
                                        v.value === formValues.paymentStatus
                                    )?.label
                                  }`
                                : ""
                            }
                            FormHelperTextProps={{
                              sx: {
                                fontWeight: 600,
                                color:
                                  PaymentStatusColor[formValues.paymentStatus],
                              },
                            }}
                          />
                        </Grid>

                        {/* <Grid item lg={6}>
                          <PaymentStatusFilter
                            formValues={formValues}
                            setFormValues={setFormValues}
                          />
                        </Grid> */}

                        <Grid
                          item
                          lg={12}
                          display="flex"
                          justifyContent="center"
                        >
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ minWidth: 140 }}
                            type="submit"
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                </DialogContent>
              </Dialog>
            </Portal>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default AddInvoiceForm;

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
import PaymentStatusFilter from "./comps/PaymentStatusFilter";
import { uploadFile } from "../../../assets/corpServices";
import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import dayjs from "dayjs";
import { getCompanyList } from "../../../services/genericTicketingSystem";
import { GridActionsCellItem } from "@mui/x-data-grid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const UpdateInvoiceForm = ({
  formValues,
  setFormValues,
  formData,
  authId = localStorage.getItem("USER_ID_CORP_SALES"),
  getInvoiceList,
  params,
}) => {
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

    // formData.append("corpId", formValues.company?.corpId);
    // formData.append(
    //   "invoiceDate",
    //   formValues.inVoiceDate
    //     ? dayjs(formValues.inVoiceDate).format("YYYY-MM-DD")
    //     : ""
    // );
    // formData.append("serviceDetails", formValues.serviceDetails);
    formData.append("id", params.row.id);
    formData.append("paymentStatus", formValues.paymentStatus);
    // formData.append("addedBy", authId);

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

  console.log({ params });

  return (
    <Fragment>
      <Box>
        <GridActionsCellItem
          icon={<ModeEditOutlineIcon />}
          label="edit"
          onClick={handleClickOpen}
        />
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
                        Demo Uno
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
                        Edit Invoice Details
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
                              Invoice File (Attachment):
                            </Typography>
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
                              {params?.row?.invoiceUrl}
                            </Typography>
                          </Stack>
                        </Grid>

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
                              Invoice Date:
                            </Typography>
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
                              {params?.row?.invoiceDate}
                            </Typography>
                          </Stack>
                        </Grid>

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
                              Service Details:
                            </Typography>
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
                              {params?.row?.serviceDetails}
                            </Typography>
                          </Stack>
                        </Grid>

                        <Grid item lg={6}>
                          <PaymentStatusFilter
                            formValues={formValues}
                            setFormValues={setFormValues}
                          />
                        </Grid>

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

export default UpdateInvoiceForm;

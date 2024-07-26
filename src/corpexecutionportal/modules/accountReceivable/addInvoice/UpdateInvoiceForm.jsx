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
import { updateDataFile, uploadFile } from "../../../assets/corpServices";
import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import dayjs from "dayjs";
import { getCompanyList } from "../../../services/genericTicketingSystem";
import { GridActionsCellItem } from "@mui/x-data-grid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CustomTextField from "./comps/customTextField";
import { CustomDate } from "./comps/customDateComps";
import SingleUpload from "./comps/singleUpload";
import { PhotoViewer } from "../../../../assets/customPhotoViewer/photoViewer";
import SubmitAlert from "./comps/submitAlert";

const UpdateInvoiceForm = ({
  formValues,
  setFormValues,
  formData,
  authId = localStorage.getItem("USER_ID_CORP_SALES"),
  getInvoiceList,
  params,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [disableClick, setDisableClick] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisableClick(true);

    const url = BASE_URL + `invoice/updateInvoice/${params.row.id}`;
    formData.append(
      "invoiceDate",
      formValues.inVoiceDate
        ? dayjs(formValues.inVoiceDate).format("YYYY-MM-DD")
        : ""
    );
    formData.append("serviceDetails", formValues.serviceDetails);
    formData.append("paymentStatus", formValues.paymentStatus);
    // formData.append("addedBy", authId);

    const res = await updateDataFile(url, formData);
    if (res.error) {
      enqueueSnackbar("Failed to create invoice!", {
        variant: "error",
      });
      setDisableClick(false);
    } else {
      enqueueSnackbar("Successfully created invoice.", {
        variant: "success",
      });
      handleClose();
      setFormValues({});
      getInvoiceList();
      setDisableClick(false);
      console.log({ success: res.data });
    }
  };

  console.log({ params });

  const [openPhoto, setOpenPhoto] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const handleClickOpenPhoto = (url) => {
    setOpenPhoto(true);
    setImageUrl(url);
  };

  const handleClosePhtoto = () => {
    setOpenPhoto(false);
    setImageUrl(null);
  };

  const [isConfirm, setIsConfirm] = useState(false);

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
                    {!isConfirm ? (
                      <Fragment>
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
                            <Grid
                              item
                              lg={12}
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => setIsEditMode(!isEditMode)}
                              >
                                {isEditMode
                                  ? "Cancel Editing"
                                  : "Edit Invoice Details"}
                              </Button>
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
                                    flex: 1,
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

                                {isEditMode ? (
                                  <Box
                                    component={Stack}
                                    sx={{ flex: 4 }}
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <Box>
                                      <SingleUpload
                                        title="Choose File"
                                        formData={formData}
                                      />
                                    </Box>

                                    {formValues?.invoiceUrl ? (
                                      <Box component={Stack}>
                                        <img
                                          src={formValues?.invoiceUrl}
                                          alt="preview"
                                          height={100}
                                          width={100}
                                        />
                                      </Box>
                                    ) : null}
                                  </Box>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      handleClickOpenPhoto(
                                        formValues?.invoiceUrl
                                      )
                                    }
                                  >
                                    <Typography
                                      sx={{
                                        flex: 4,
                                        color: "#127DDD",
                                        fontFamily: "Poppins",
                                        fontSize: 12,
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal",
                                        opacity: 0.8,
                                      }}
                                    >
                                      {formValues?.invoiceUrl}
                                    </Typography>
                                  </Button>
                                )}
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
                                    flex: 1,
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
                                {isEditMode ? (
                                  <Box sx={{ flex: 4 }}>
                                    <CustomDate
                                      formValues={formValues}
                                      setFormValues={setFormValues}
                                      label="Invoice Date"
                                    />
                                  </Box>
                                ) : (
                                  <Typography
                                    sx={{
                                      flex: 4,
                                      color: " #000",
                                      fontFamily: "Poppins",
                                      fontSize: 12,
                                      fontStyle: "normal",
                                      fontWeight: "600",
                                      lineHeight: "normal",
                                      opacity: 0.8,
                                    }}
                                  >
                                    {formValues?.inVoiceDate
                                      ? dayjs(formValues?.inVoiceDate).format(
                                          "LL"
                                        )
                                      : ""}
                                  </Typography>
                                )}
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
                                    flex: 1,
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

                                {isEditMode ? (
                                  <Box sx={{ flex: 4 }}>
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
                                  </Box>
                                ) : (
                                  <Typography
                                    sx={{
                                      flex: 4,
                                      color: " #000",
                                      fontFamily: "Poppins",
                                      fontSize: 12,
                                      fontStyle: "normal",
                                      fontWeight: "600",
                                      lineHeight: "normal",
                                      opacity: 0.8,
                                    }}
                                  >
                                    {formValues?.serviceDetails}
                                  </Typography>
                                )}
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
                                    flex: 1,
                                    color: " #000",
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "normal",
                                    opacity: 0.8,
                                  }}
                                >
                                  Payment Status:
                                </Typography>
                                <Box sx={{ flex: 4 }}>
                                  <PaymentStatusFilter
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                  />
                                </Box>
                              </Stack>
                            </Grid>

                            <Grid
                              item
                              lg={12}
                              display="flex"
                              justifyContent="center"
                            >
                              {/* <SubmitAlert disableClick={disableClick} /> */}
                              <Stack direction="row" spacing={1}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{ minWidth: 140 }}
                                  onClick={() => setIsConfirm(true)}
                                >
                                  Save
                                </Button>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Box>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Stack
                          minHeight={200}
                          flex={1}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                        >
                          <Typography variant="button" sx={{ color: "red" }}>
                            Do you want to confirm changes?
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ minWidth: 140 }}
                              onClick={() => setIsConfirm(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              disabled={disableClick}
                              variant="contained"
                              size="small"
                              sx={{ minWidth: 140 }}
                              type="submit"
                            >
                              Confirm
                            </Button>
                          </Stack>
                        </Stack>
                      </Fragment>
                    )}
                  </form>
                </DialogContent>
              </Dialog>
            </Portal>
          </Grid>
        </Grid>
      </Box>

      <PhotoViewer
        url={imageUrl}
        open={openPhoto}
        handleClose={handleClosePhtoto}
      />
    </Fragment>
  );
};

export default UpdateInvoiceForm;

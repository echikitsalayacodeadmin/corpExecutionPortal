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
import { uploadFile } from "../../../assets/corpServices";
import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { getCompanyList } from "../../../services/genericTicketingSystem";
import CustomTextField from "../../accountReceivable/addInvoice/comps/customTextField";

const AddNewStaffForm = ({ label, formValues, setFormValues }) => {
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

    const res = await uploadFile(url, formValues);
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
      console.log({ success: res.data });
    }
  };

  return (
    <Fragment>
      <Box>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "inherit", background: "#0463FA", width: 300 }}
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
                        {label}
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
                      ></Typography>
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
                        //width: "fit-content",
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
                              Employee ID
                            </Typography>
                            <Box flex={3}>
                              <CustomTextField
                                required
                                fullWidth
                                size="small"
                                placeholder="eg : enter employee id..."
                                value={formValues.employeeID || ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    employeeID: e.target.value,
                                  })
                                }
                              />
                            </Box>
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
                              Employee Name
                            </Typography>
                            <Box flex={3}>
                              <CustomTextField
                                required
                                fullWidth
                                size="small"
                                placeholder="eg : enter employee name..."
                                value={formValues.employeeName || ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    employeeName: e.target.value,
                                  })
                                }
                              />
                            </Box>
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
                              Employee Team
                            </Typography>
                            <Box flex={3}>
                              <CustomTextField
                                required
                                fullWidth
                                size="small"
                                placeholder="eg : enter employee name..."
                                value={formValues.employeeName || ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    employeeName: e.target.value,
                                  })
                                }
                              />
                            </Box>
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
                              Mobile Number
                            </Typography>
                            <Box flex={3}>
                              <CustomTextField
                                required
                                fullWidth
                                size="small"
                                placeholder="eg : enter employee name..."
                                value={formValues.employeeName || ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    employeeName: e.target.value,
                                  })
                                }
                              />
                            </Box>
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
                              Employee Role
                            </Typography>
                            <Box flex={3}>
                              <CustomTextField
                                required
                                fullWidth
                                size="small"
                                placeholder="eg : enter employee name..."
                                value={formValues.employeeName || ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    employeeName: e.target.value,
                                  })
                                }
                              />
                            </Box>
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
                              Employee Manager
                            </Typography>
                            <Box flex={3}>
                              <CustomTextField
                                required
                                fullWidth
                                size="small"
                                placeholder="eg : enter employee name..."
                                value={formValues.employeeName || ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    employeeName: e.target.value,
                                  })
                                }
                              />
                            </Box>
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
                              Associate Company
                            </Typography>
                            <Box flex={3}>
                              <CustomTextField
                                required
                                fullWidth
                                size="small"
                                placeholder="eg : enter employee name..."
                                value={formValues.employeeName || ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    employeeName: e.target.value,
                                  })
                                }
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
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ minWidth: 140 }}
                            type="submit"
                          >
                            Submit
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

export default AddNewStaffForm;

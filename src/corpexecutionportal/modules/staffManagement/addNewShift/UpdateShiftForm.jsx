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
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { saveData, updateData } from "../../../assets/corpServices";
import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import CustomTextField from "../../accountReceivable/addInvoice/comps/customTextField";
import CustomSelectNew from "../../../../assets/customSelectNew";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";

const StaffRoleList = [{ id: 1, label: "OHC Staff", value: "OHC_STAFF" }];

const UpdateShiftForm = ({
  corpId,
  formValues,
  setFormValues,
  companyList,
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

    const url = BASE_URL + `staff/corp/updateshift/${formValues.id}`;

    //dayjs(newValue).format("h:mm:ss"),

    const payload = {
      shiftStartTime: dayjs(formValues.shiftStartTime).format("HH:mm:ss"),
      shiftEndTime: dayjs(formValues.shiftEndTime).format("HH:mm:ss"),
      shiftName: formValues.shiftName,
      corpId: corpId,
      staffRole: formValues.staffRole,
    };

    const res = await updateData(url, payload);
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
      //getAllShifts();
      console.log({ success: res.data });
    }
  };

  return (
    <Fragment>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Portal>
              <Dialog
                aria-modal={true}
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
                        {companyList.find((v) => v.corpId === corpId)?.orgName}
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
                        {"Update Shift Details"}
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
                              Shift Name
                            </Typography>
                            <Box flex={3}>
                              <TextField
                                required
                                fullWidth
                                size="small"
                                placeholder="eg : enter shift name..."
                                value={formValues.shiftName || ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    shiftName: e.target.value,
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
                              Staff Role
                            </Typography>
                            <Box flex={3}>
                              <CustomSelectNew
                                width={"100%"}
                                placeholder="Select staff role..."
                                formValues={formValues}
                                setFormValues={setFormValues}
                                borderRadius={3.5}
                                options={StaffRoleList}
                                property="staffRole"
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
                              Shift Start Time
                            </Typography>
                            <Box flex={3}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  views={["hours", "minutes", "seconds"]}
                                  ampm={false}
                                  //label="Controlled picker"
                                  value={formValues.shiftStartTime || null}
                                  onChange={(newValue) =>
                                    setFormValues({
                                      ...formValues,
                                      shiftStartTime: newValue,
                                    })
                                  }
                                  slotProps={{
                                    textField: {
                                      size: "small",
                                      fullWidth: true,
                                    },
                                  }}
                                />
                              </LocalizationProvider>
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
                              Shift End Time
                            </Typography>
                            <Box flex={3}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  views={["hours", "minutes", "seconds"]}
                                  ampm={false}
                                  //label="Controlled picker"
                                  value={formValues.shiftEndTime || null}
                                  onChange={(newValue) =>
                                    setFormValues({
                                      ...formValues,
                                      shiftEndTime: newValue,
                                    })
                                  }
                                  slotProps={{
                                    textField: {
                                      size: "small",
                                      fullWidth: true,
                                    },
                                  }}
                                />
                              </LocalizationProvider>
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

export default UpdateShiftForm;

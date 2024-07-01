import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
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
import { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DepartmentFilter from "./departmentFilter";
import TestTypeFilter from "./testTypeFilter";
import PackageAutocomplete from "./packageAutocomplete";
import CustomTextField from "../../../../global/components/customTextField";
import dayjs from "dayjs";
import { BASE_URL } from "../../../../../assets/constantsFile";
import { enqueueSnackbar } from "notistack";
import { uploadFile } from "../../../../../services/api/postApi";
import SingleUpload from "./singleUpload";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const NewFormComp = ({
  corpId = localStorage.getItem("CORPID"),
  orgName = localStorage.getItem("CORP_NAME"),
  userIDAuth = localStorage.getItem("ORGUSERIDAUTH"),
  userMobile = localStorage.getItem("ORGUSERMOBILE"),
  userName = localStorage.getItem("ORGUSERNAME"),
  source,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formValues, setFormValues] = useState({});
  const [startDate, setStartDate] = useState(dayjs());
  const [testType, setTestType] = useState("PRE_EMPLOYMENT");
  const [selectDepartment, setSelectDepartment] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  let formData = new FormData();

  console.log({
    formValues,
    startDate,
    testType,
    selectDepartment,
    selectedFile,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = BASE_URL + `org/v2/raiseTicket`;
    formData.append("userAuthId", userIDAuth || "");
    formData.append("raisedBy", userName || "");
    formData.append("raisedById", userIDAuth || "");
    formData.append("raisedByMobileNo", userMobile || "");
    formData.append("ticketType", "PRE_EMPLOYMENT");

    formData.append("corpId", corpId || "");
    formData.append("corpName", orgName || "");
    formData.append("ticketCategory", "CORP");
    formData.append("status", "TICKET_RAISED");

    formData.append(
      "ticketInfo",
      JSON.stringify({
        name: formValues.name,
        date: dayjs(startDate).format("YYYY-MM-DD"),
        testType: testType,
        department: selectDepartment,
        empId: formValues.empId,
        address: formValues.address,
        mobile: formValues.mobile,
        hrmobile: formValues.hrmobile,
        package: formValues.packageName,
      })
    );

    const res = await uploadFile(url, formData);
    if (res.error) {
      console.warn({ error: res.error });
      enqueueSnackbar("Failed to raise ticket!", {
        variant: "error",
      });
    } else {
      console.log({ success: res.data });
      enqueueSnackbar("Successfully raised ticket.", {
        variant: "success",
      });
      fetchTicketList();
      handleClose();
    }
  };

  return (
    <Fragment>
      <Box>
        {source === "TICKETSDASHBOARD" ? (
          <Card
            sx={{ minWidth: 275, background: "#efefff", height: 170 }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <CardActionArea>
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <img height={120} width={200} src={value?.imageUrl} />

                  <Box
                    sx={{
                      position: "absolute ",
                      top: 20,
                      right: -20,
                      height: 180,
                      width: 180,
                      borderRadius: 100,
                      mt: 100,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack
                      direction="row"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {value?.title}
                      </Typography>
                      <Box
                        sx={{
                          height: 30,
                          width: 30,
                          borderRadius: 15,
                          background: "#efefff",
                        }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <ArrowRightAltIcon fontSize="10" />
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ) : (
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "inherit", background: "#0463FA" }}
            onClick={handleClickOpen}
          >
            New form
          </Button>
        )}
      </Box>
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
                direction="row"
                display="flex"
                justifyContent="center"
              >
                <Typography
                  sx={{
                    color: " #000",
                    fontFamily: "Poppins",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  Pre employment form
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
                  <Grid item lg={6}>
                    <CustomTextField
                      required
                      fullWidth
                      size="small"
                      label="Name"
                      placeholder="eg : Akash varma"
                      value={formValues.name || ""}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label=""
                        value={(date = { startDate })}
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{ textField: { size: "small" } }}
                        format="LL"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item lg={6}>
                    <TestTypeFilter
                      testType={testType}
                      setTestType={setTestType}
                      label={"Test type*"}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <DepartmentFilter
                      selectDepartment={selectDepartment}
                      setSelectDepartment={setSelectDepartment}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <CustomTextField
                      fullWidth
                      size="small"
                      label="Employee ID or temporary ID"
                      placeholder="eg : APR001"
                      value={formValues.empId || ""}
                      onChange={(e) =>
                        setFormValues({ ...formValues, empId: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <CustomTextField
                      fullWidth
                      size="small"
                      label="Place"
                      placeholder=""
                      value={formValues.address || ""}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          address: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <CustomTextField
                      fullWidth
                      size="small"
                      label="Employee contact no."
                      placeholder="eg : 97896 54532"
                      value={formValues.mobile || ""}
                      onChange={(e) => {
                        if (
                          !isNaN(e.target.value) &&
                          e.target.value.length < 11
                        )
                          setFormValues({
                            ...formValues,
                            mobile: e.target.value,
                          });
                      }}
                      helperText={
                        !formValues.mobile || formValues.mobile.length === 10
                          ? ""
                          : "enter 10 digit mobile number"
                      }
                      error={
                        !formValues.mobile || formValues.mobile.length === 10
                          ? false
                          : true
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <CustomTextField
                      fullWidth
                      size="small"
                      label="HR contact no."
                      placeholder="eg : 97896 54532"
                      value={formValues.hrmobile || ""}
                      onChange={(e) => {
                        if (
                          !isNaN(e.target.value) &&
                          e.target.value.length < 11
                        ) {
                          setFormValues({
                            ...formValues,
                            hrmobile: e.target.value,
                          });
                        }
                      }}
                      helperText={
                        !formValues.hrmobile ||
                        formValues.hrmobile.length === 10
                          ? ""
                          : "enter 10 digit mobile number"
                      }
                      error={
                        !formValues.hrmobile ||
                        formValues.hrmobile.length === 10
                          ? false
                          : true
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <PackageAutocomplete
                      formValues={formValues}
                      setFormValues={setFormValues}
                      testType={testType}
                    />
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
                        ID proof of employee (Attachment)
                      </Typography>
                      <SingleUpload title="Upload" formData={formData} />
                    </Stack>
                  </Grid>
                  <Grid item lg={12} display="flex" justifyContent="center">
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
    </Fragment>
  );
};

export default NewFormComp;

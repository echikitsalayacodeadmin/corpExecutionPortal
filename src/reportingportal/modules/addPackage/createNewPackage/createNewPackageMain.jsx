import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomSelect from "../../../../assets/customSelect";
import CustomSelectNew from "../../../../assets/customSelectNew";
import { BASE_URL } from "../../../../assets/constants";
import { saveData } from "../../../assets/reportingServices";
import { enqueueSnackbar } from "notistack";

const booleanFields = [
  {
    id: 1,
    label: "X-Ray",
    field: "xray",
  },
  {
    id: 2,
    label: "CBC",
    field: "cbc",
  },
  {
    id: 3,
    label: "Urine",
    field: "urine",
  },
  {
    id: 4,
    label: "Fitness",
    field: "fitness",
  },
  {
    id: 5,
    label: "Eye",
    field: "eye",
  },
  {
    id: 6,
    label: "Audiometry",
    field: "audiometry",
  },
  {
    id: 7,
    label: "PFT",
    field: "pft",
  },
  {
    id: 8,
    label: "ECG",
    field: "ecg",
  },
  {
    id: 9,
    label: "Sugar",
    field: "sugar",
  },
  {
    id: 10,
    label: "S. Bilirubin",
    field: "sbilirubin",
  },
  {
    id: 11,
    label: "Test Code",
    field: "testCode",
  },
  {
    id: 12,
    label: "Stool Sample",
    field: "stoolSample",
  },
];

const CreateNewPackageMain = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formValues, setFormValues] = useState({
    xray: false,
    cbc: false,
    urine: false,
    fitness: false,
    eye: false,
    audiometry: false,
    pft: false,
    ecg: false,
    sugar: false,
    sbilirubin: false,
    testCode: false,
    stoolSample: false,
    vaccination: false,
    packageName: "",
    bloodPackageName: "",
    employmentType: "AHC",
  });

  console.log({ formValues });

  const handleAddPackagesMannualy = async (e) => {
    e.preventDefault();
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    const url =
      BASE_URL +
      `org/addBulkPackageDetails/${corpId}?campCycleId=${campCycleId || ""}`;

    let payload = [formValues];
    const result = await saveData(url, payload);
    if (result.error) {
      enqueueSnackbar(`${result.error.response.data.message}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Successfully Saved`, {
        variant: "success",
      });
      handleClose();
      setResponse(result.data);
    }
  };

  return (
    <Fragment>
      <Box>
        <Button size="small" variant="contained" onClick={handleClickOpen}>
          Add New Package
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        //PaperProps={{ style: { paddingBlock: 3 } }}
        //sx={{ marginInline: 30 }}
      >
        <DialogTitle textAlign="center" sx={{ textTransform: "capitalize" }}>
          {formValues.packageName || "...Package Name"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 5 }}>
            <form onSubmit={handleAddPackagesMannualy}>
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ flex: 1.2 }}>Package Name:</Typography>
                    <TextField
                      sx={{ flex: 3 }}
                      size="small"
                      fullWidth
                      ///label="Packge Name"
                      required
                      placeholder="Enter package name..."
                      value={formValues.packageName}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          packageName: e.target.value,
                        });
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ flex: 1.2 }}>Employment Type:</Typography>
                    <Box sx={{ flex: 3 }}>
                      <CustomSelectNew
                        formValues={formValues}
                        setFormValues={setFormValues}
                        property="employmentType"
                        options={[
                          { id: 1, label: "AHC", value: "AHC" },
                          {
                            id: 1,
                            label: "PRE EMPLOYMENT",
                            value: "PRE_EMPLOYMENT",
                          },
                        ]}
                        placeholder="Select employment type..."
                        width={"100%"}
                      />
                    </Box>
                  </Stack>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ flex: 1.2 }}>Employment Type:</Typography>

                    <TextField
                      sx={{ flex: 3 }}
                      size="small"
                      fullWidth
                      //label="Blood Packge Name"
                      placeholder="Enter blood package name..."
                      value={formValues.bloodPackageName}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          bloodPackageName: e.target.value,
                        });
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ flex: 1.2 }}>Blood Detail:</Typography>
                    <TextField
                      sx={{ flex: 3 }}
                      size="small"
                      fullWidth
                      //label="Blood Packge Details"
                      placeholder="Enter blood details..."
                      value={formValues.pathPackageDetails}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          pathPackageDetails: e.target.value,
                        });
                      }}
                    />
                  </Stack>
                </Grid>

                {booleanFields.map((data, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues[data.field] || false}
                          onChange={(event) => {
                            setFormValues({
                              ...formValues,
                              [event.target.name]: event.target.checked,
                            });
                          }}
                          name={data.field}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box
                component={Stack}
                spacing={2}
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 5,
                }}
              >
                <Button variant="contained" size="small" type="submit">
                  Submit
                </Button>

                <Button variant="contained" size="small" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CreateNewPackageMain;

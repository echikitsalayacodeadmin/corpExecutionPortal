import { Fragment, useEffect, useState } from "react";
import MainPageLayout from "../../global/templates/mainPageLayout";
import EmployeeBiodata from "../home/comps/employeeBiodata";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  _fetchEmployeeByEmpIdNew,
  _fetchEmployeeByVitalsId,
} from "../../services/homeservices";
import { BASE_URL } from "../../../assets/constants";
import { saveData } from "../../assets/campServices";
import { enqueueSnackbar } from "notistack";

const CheckboxList = [
  { id: 1, label: "Blood", property: "bloodReport" },
  { id: 2, label: "Urine", property: "urineReport" },
  { id: 3, label: "Form 32", property: "form32" },
  { id: 4, label: "Form 35", property: "form35" },
  { id: 6, label: "PFT", property: "pft" },
  { id: 7, label: "Audiometry", property: "audiometry" },
  { id: 8, label: "Ecg", property: "ecg" },
  { id: 5, label: "Fitness Form", property: "physicalFitnessForm" },
  { id: 9, label: "X Ray", property: "xrayCert" },
  { id: 10, label: "Fitness Certificate", property: "fitnessCert" },
];

const EmployeeDetails = ({
  corpId = localStorage.getItem("CORPID"),
  empId,
  vitalsId,
}) => {
  let navigate = useNavigate();

  const [formValues, setFormValues] = useState({});
  const [employee, setEmployee] = useState({});

  const findEmployee = async () => {
    _fetchEmployeeByEmpIdNew(corpId, empId, setEmployee);
  };

  const findEmployeeByVitalsId = async () => {
    _fetchEmployeeByVitalsId(vitalsId, setFormValues);
  };
  useEffect(() => {
    findEmployee();
    findEmployeeByVitalsId();
  }, []);

  console.log({ formValues });

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = BASE_URL + `org/reporting/masterPdfSummary`;

    const response = await saveData(url, {
      ...formValues,
      orgEmployeeVitalsId: vitalsId,
    });

    if (response.error) {
      enqueueSnackbar("Failed to save!", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Successfully Saved!!", {
        variant: "success",
      });

      setTimeout(() => {
        navigate("/camp/analysis");
      }, 1000);
    }
  };

  return (
    <Fragment>
      <MainPageLayout title="Analysis">
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            backgroundColor: "#F5F5F5",
            minHeight: "81vh",
            borderRadius: 5,
          }}
        >
          <Box sx={{ pt: 0.1, mb: 5 }}>
            <Grid container spacing={1}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box
                  sx={{
                    p: 3,
                    background: "#fff",
                    border: "1px solid lightgray",
                  }}
                  borderRadius={2}
                >
                  <EmployeeBiodata formValues={employee} />
                </Box>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                display="flex"
                justifyContent="center"
              >
                <FormControl
                  sx={{ m: { lg: 3, xs: 0 } }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend"></FormLabel>
                  <FormGroup row>
                    {CheckboxList.map((value, index) => (
                      <FormControlLabel
                        sx={{
                          mx: { lg: 4, xs: 0 },
                          my: { lg: 3, xs: 1 },
                          minWidth: { lg: 100, xs: 140 },
                        }}
                        labelPlacement={"end"}
                        key={index}
                        control={
                          <Checkbox
                            checked={formValues[value.property] || false}
                            onChange={(event) => {
                              let newFormValues = { ...formValues };
                              newFormValues[value.property] =
                                event.target.checked;
                              setFormValues(newFormValues);
                            }}
                            name={value.property}
                          />
                        }
                        label={value.label}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText sx={{ textAlign: "center" }} variant="filled">
                    Carefully select all applicable fields.
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                display="flex"
                justifyContent="center"
              >
                <Stack
                  direction="row"
                  spacing={3}
                  width={{ lg: "30%", xs: "90%" }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    onClick={submitHandler}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => navigate("/camp/analysis")}
                  >
                    Reset
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </MainPageLayout>
    </Fragment>
  );
};

export default EmployeeDetails;

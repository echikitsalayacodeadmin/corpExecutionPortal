import { Fragment, useEffect, useState } from "react";
import MainPageLayout from "../../global/templates/mainPageLayout";
import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import EmployeeDetailsNew from "./comps/employeeDetailsNew";
import {
  _fetchEmployeeByEmpIdNew,
  _fetchEmployeeByVitalsId,
} from "./comps/service";
import EmployeeBiodata from "./comps/employeeBiodata";
import { saveData } from "../../assets/corpServices";
import { BASE_URL } from "../../../assets/constants";

const EmployeeDetailMain = ({
  corpId = localStorage.getItem("CORPID"),
  empId,
  vitalsId,
  name,
}) => {
  let navigate = useNavigate();

  const [data, setData] = useState({});
  const [formValues, setFormValues] = useState([]);
  const [employee, setEmployee] = useState({});

  const findEmployee = async () => {
    _fetchEmployeeByEmpIdNew(corpId, empId, setEmployee);
  };

  const findEmployeeByVitalsId = async () => {
    _fetchEmployeeByVitalsId(vitalsId, setData, setFormValues);
  };
  useEffect(() => {
    //findEmployee();
    findEmployeeByVitalsId();
  }, []);

  console.log({ data, formValues });

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = BASE_URL + `org/reporting/masterPdfSummary`;

    let tempData = { ...data };
    tempData["qcDetails"] = Object.fromEntries(formValues);

    const response = await saveData(url, {
      ...tempData,
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
        navigate("/corp/analysis");
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
                  <EmployeeBiodata formValues={{ name: name, empId: empId }} />
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
                <EmployeeDetailsNew
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
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
                    onClick={() => navigate("/corp/analysis")}
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

export default EmployeeDetailMain;

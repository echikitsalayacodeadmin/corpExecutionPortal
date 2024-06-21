import React, { Fragment, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Tab,
  Toolbar,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { isMobile } from "react-device-detect";
import ParseCSV from "../../../assets/parseCSV";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../assets/constants";
import { saveData } from "../../assets/reportingServices";
import CsvFileDataInDataGrid from "./subComp/csvFileDataInDataGrid";
import InvalidEmpIdList from "./subComp/invalidEmpIdList";
import DuplicateEntryInList from "./subComp/duplicateEntryInList";
import InvalidPackageNameList from "./subComp/invalidPackageNameList";

const AddEmpPkgDefinition = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [packageDetail, setPackageDetail] = useState([]);
  const [packageDetailUpdated, setPackageDetailUpdated] = useState([]);
  const [savedFile, setSavedFile] = useState("");

  useEffect(() => {
    if (packageDetail) {
      setPackageDetailUpdated(
        packageDetail.map((item, index) => ({
          id: index,
          empId: item.employeeid,
          packageName: item.pack,
        }))
      );
    }
  }, [packageDetail]);

  const [response, setResponse] = useState("");
  const handleUploadBulkPackages = async () => {
    const url = BASE_URL + `org/empIdAndPackageDefinition/${corpId}`;
    const payload = packageDetailUpdated.map(({ id, ...rest }) => rest);
    const result = await saveData(url, payload);
    if (result.error) {
      enqueueSnackbar(`${result.error.response.data.message}`, {
        variant: "error",
      });
      setResponse("");
    } else {
      enqueueSnackbar(`Successfully Saved`, {
        variant: "success",
      });
      setResponse(result.data);
    }
  };

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Box sx={{ marginBlock: 1 }}>
        <Paper
          sx={{
            borderRadius: 5,
            paddingInline: 3,
            boxShadow: 3,
            height: isMobile ? "100%" : "84vh",
            paddingBlock: "10px",
          }}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Preview" value="1" />
                  <Tab label="Invalid EmpID List" value="2" />
                  <Tab label="Duplicate Entry In List" value="3" />
                  <Tab label="Invalid Package Name List" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: 0 }}>
                <CsvFileDataInDataGrid rows={packageDetailUpdated} />
              </TabPanel>
              <TabPanel value="2" sx={{ p: 0 }}>
                <InvalidEmpIdList rows={response.invalidEmpIdList} />
              </TabPanel>
              <TabPanel value="3" sx={{ p: 0 }}>
                <DuplicateEntryInList rows={response.duplicateEntryInList} />
              </TabPanel>
              <TabPanel value="4" sx={{ p: 0 }}>
                <InvalidPackageNameList
                  rows={response.invalidPackageNameList}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>
      </Box>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          top: "auto",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth={false}>
          <Toolbar>
            <Grid
              container
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                lg={7}
                md={7}
                sm={12}
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Stack direction={{ lg: "row", xs: "column" }}>
                  <ParseCSV
                    setList={setPackageDetail}
                    corpId={corpId}
                    setSavedFile={setSavedFile}
                    testPackage={true}
                  />
                  <Button
                    variant="contained"
                    disabled={packageDetailUpdated.length === 0}
                    onClick={handleUploadBulkPackages}
                  >
                    Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default AddEmpPkgDefinition;

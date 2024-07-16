import React, { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../../corpexecutionportal/global/templates/mainPageLayoutWithBack";
import ParseCSV from "../../../assets/parseCSV";
import { BASE_URL } from "../../../assets/constants";
import AddBulkPackage from "./subComp/addBulkPackage";
import AddPackageManually from "./subComp/addPackageManually";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Tab,
  Toolbar,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useSnackbar } from "notistack";
import { saveData } from "../../assets/reportingServices";
import PackageNameNotFoundListInFile from "./subComp/packageNameNotFoundListInFile";
import DuplicatePackageNameListInFile from "./subComp/duplicatePackageNameListInFile";
import DuplicatePackageNameListInDB from "./subComp/duplicatePackageNameListInDB";
import dayjs from "dayjs";
import GetPackages from "./subComp/getPackages";

const AddPackageMain = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [packageDetail, setPackageDetail] = useState([]);
  const [packageDetailUpdated, setPackageDetailUpdated] = useState([]);
  const [savedFile, setSavedFile] = useState("");

  const [selectedEmpType, setSelectedEmpType] = useState(null);

  useEffect(() => {
    if (packageDetail) {
      setPackageDetailUpdated(
        packageDetail.map((item, index) => ({
          id: index,
          packageName: item.packagename,
          bloodPackageName: item.bloodpackagename === "TRUE" ? "Blood" : "",
          xray: item.xray === "TRUE" ? true : false,
          cbc: item.cbc === "TRUE" ? true : false,
          urine: item.urine === "TRUE" ? true : false,
          fitness: item.fitness === "TRUE" ? true : false,
          eye: item.eye === "TRUE" ? true : false,
          audiometry: item.audiometry === "TRUE" ? true : false,
          pft: item.pft === "TRUE" ? true : false,
          ecg: item.ecg === "TRUE" ? true : false,
          sugar: item.sugar === "TRUE" ? true : false,
          sbilirubin: item.sbilirubin === "TRUE" ? true : false,
          vaccination: item.vaccination === "TRUE" ? true : false,
          testCode: item.testCode === "TRUE" ? true : false,
          stoolSample: item.stoolsample === "TRUE" ? true : false,
          date: dayjs().format("YYYY-MM-DD"),
        }))
      );
    }
  }, [packageDetail]);

  const [response, setResponse] = useState("");

  const handleUploadBulkPackages = async () => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    const url =
      BASE_URL +
      `org/addBulkPackageDetails/${corpId}?campCycleId=${
        campCycleId || ""
      }&employmentType=${selectedEmpType}`;
    const payload = packageDetailUpdated.map(({ id, ...rest }) => rest);
    const result = await saveData(url, payload);
    if (result.error) {
      enqueueSnackbar(`${result.error.response.data.message}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Successfully Saved`, {
        variant: "success",
      });
      setResponse(result.data);
    }
  };

  console.log({ packageDetail, packageDetailUpdated });
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Add packages">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Get Packages" value="1" />
                <Tab label="Add Package Manually" value="2" />
                <Tab label="Add Bulk Package" value="3" />
                <Tab label="Package Name Not Found List In File" value="4" />
                <Tab label="Duplicate Package Name List In File" value="5" />
                <Tab label="Duplicate Package Name List In DB" value="6" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: 0 }}>
              <GetPackages
                selectedEmpType={selectedEmpType}
                setSelectedEmpType={setSelectedEmpType}
                rows={packageDetailUpdated}
              />
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              <AddPackageManually setResponse={setResponse} />
            </TabPanel>
            <TabPanel value="3" sx={{ p: 0 }}>
              <AddBulkPackage
                selectedEmpType={selectedEmpType}
                setSelectedEmpType={setSelectedEmpType}
                rows={packageDetailUpdated}
              />
            </TabPanel>
            <TabPanel value="4" sx={{ p: 0 }}>
              <PackageNameNotFoundListInFile
                rows={response.packageNameNotFoundListInFile}
              />
            </TabPanel>
            <TabPanel value="5" sx={{ p: 0 }}>
              <DuplicatePackageNameListInFile
                rows={response.duplicatePackageNameListInFile}
              />
            </TabPanel>
            <TabPanel value="6" sx={{ p: 0 }}>
              <DuplicatePackageNameListInDB
                rows={response.duplicatePackageNameListInDB}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </MainPageLayoutWithBack>
      {value === "3" && (
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
                      disabled={selectedEmpType === null ? true : false}
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
      )}
    </Fragment>
  );
};

export default AddPackageMain;

import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  Stack,
  Tab,
  Toolbar,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ParseCSV from "../../../assets/parseCSV";
import MainPageLayout from "../../global/templates/mainPageLayout";
import RegistrationDatagrid from "./comps/registrationDatagrid";
import { BASE_URL } from "../../../assets/constants";
import { saveData, uploadFile } from "../../assets/reportingServices";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RegisteredEmployees from "./registeredEmployees";
import FailedToRegisteredEmployee from "./failedToRegisteredEmployee";
import dayjs from "dayjs";

const samplePDFurl =
  "https://storage-echikitsalaya.s3.ap-south-1.amazonaws.com/CORP_SAMPLE_FILES/Bulk+registration+sample+file+corps.csv";

const BulkUploadIndex = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeListUpdated, setEmployeeListUpdated] = useState([]);
  const [failedToRegisterEmployees, setFailedToRegisterEmployees] = useState(
    []
  );
  const [savedFile, setSavedFile] = useState("");

  const [mapperID, setMapperID] = useState(null);

  console.log({ employeeList });

  useEffect(() => {
    if (employeeList) {
      setEmployeeListUpdated(
        employeeList.map((item, index) => ({
          id: index,
          name: item["name"],
          empId: item["employeeid"],
          department: item["department"],
          mobile: item["mobile"],
          dateOfBirth: item["dateofbirth"],
          dateOfJoiningTypeString: item["dateofjoining"],
          gender: item["gender"],
          age: item["age"],
          designation: item["designation"],
          city: item["city"],
          plant: item["plant"],
          bloodGroup: item["bloodgroup"],
          employmentType: item["employmenttype"],
          fathersName: item["fathername"],
          packageName: item["packagename"],
          grade: item["grade"],
          contractorName: item["contractorname"],
          formNo: item["formno"],
          pathPackage: item["pathpackage"],
          assignedToCorpId: item["assignedtocorpid"],
          employeeTeam: item["employeeteam"],
        }))
      );
    }
  }, [employeeList]);

  console.log({ employeeListUpdated });

  const _uploadData = async () => {
    const url = BASE_URL + `org/register/bulk`;

    const payloadTemp = employeeListUpdated
      .filter((item) => item.empId)
      .map((item, index) => ({
        name: item.name?.trim(),
        empId: item.empId?.trim(),
        department: item.department?.trim(),
        mobile: item.mobile?.trim(),
        genderTypeString: item.gender?.trim(),
        age: item.age?.trim(),
        designation: item.designation?.trim(),
        city: item.city?.trim(),
        plant: item.plant?.trim(),
        corpId: corpId,
        bloodGroup: item.bloodGroup?.trim(),
        employmentTypeString: item.employmentType?.trim(),
        fathersName: item.fathersName?.trim(),
        dateOfBirth: item.dateOfBirth?.trim(),
        dateOfJoiningTypeString: item.dateOfJoiningTypeString?.trim(),
        packageName: item.packageName?.trim(),
        grade: item.grade?.trim(),
        contractorName: item.contractorName?.trim(),
        formNo: item.formNo?.trim(),
        pathPackage: item.pathPackage?.trim(),
        assignedToCorpId: item?.assignedToCorpId?.trim(),
        employeeTeam: item?.employeeTeam?.trim(),
      }));

    let payload = {
      orgEmployeeVMS: payloadTemp,
      corpId: corpId,
    };
    const response = await saveData(url, payload);

    if (response.error) {
      console.log({ error: response.error });
      setSeverity("error");
      setMessage(response.error?.response?.data?.message);
      setOpenNotice(true);
      setMapperID(null);
    } else {
      console.log("success");
      setSeverity("success");

      setOpenNotice(true);
      setMapperID(response.data.mapperId);

      const data = response.data;

      const duplicateEmpInFile = data?.duplicateEmpInFile.map((val, index) => ({
        ...val,
        reason: "Duplicate In File",
      }));
      const duplicateEmpInFileForDB = data?.duplicateEmpInFileForDB.map(
        (val, index) => ({
          ...val,
          reason: "Duplicate In DB",
        })
      );
      const mapperId = data?.mapperId;
      const empInDB = data?.empInDB;

      const failedToRegister = [
        ...duplicateEmpInFile,
        ...duplicateEmpInFileForDB,
      ];
      setFailedToRegisterEmployees(
        failedToRegister.map((item, index) => ({
          ...item,
          id: index,
        }))
      );

      saveImage(mapperId);
      setMessage(
        `Action Successfull: Failed in File ${duplicateEmpInFile?.length}, Failed in Database: ${duplicateEmpInFileForDB?.length}, Successfully saved: ${empInDB?.length}`
      );
    }
  };

  const saveImage = async (id) => {
    const formData = new FormData();
    formData.append("file", savedFile);
    formData.append("fileName", savedFile.name);

    const url =
      BASE_URL +
      `org/register/bulk/upload?id=${id}&corpId=${corpId}&corpUploadType=EMPLOYMENT`;
    const csvFile = await uploadFile(url, formData);

    if (csvFile.error) {
      console.log("error");
    } else {
      console.log("success112File");
    }
  };

  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");
  const [openNotice, setOpenNotice] = useState(false);

  const handleClickNotice = () => {
    setOpenNotice(true);
  };

  const handleCloseNotice = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotice(false);
  };

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log({ failedToRegisterEmployees });
  return (
    <Fragment>
      <Snackbar
        open={openNotice}
        autoHideDuration={2000}
        onClose={handleCloseNotice}
      >
        <Alert
          onClose={handleCloseNotice}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <MainPageLayout title="Bulk upload">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Preview" value="1" />
                <Tab label="Registred Employees" value="2" />
                <Tab label="Failed To Register Employees" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: 0 }}>
              <Box>
                <Grid container>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <RegistrationDatagrid rows={employeeListUpdated} />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              <RegisteredEmployees />
            </TabPanel>
            <TabPanel value="3" sx={{ p: 0 }}>
              <FailedToRegisteredEmployee rows={failedToRegisterEmployees} />
            </TabPanel>
          </TabContext>
        </Box>
      </MainPageLayout>

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
                justifyContent="flex-end"
                alignItems="center"
              >
                <Stack direction={{ lg: "row", xs: "column" }}>
                  <ParseCSV
                    setList={setEmployeeList}
                    corpId={corpId}
                    setSavedFile={setSavedFile}
                  />
                  <Button onClick={_uploadData}>Submit</Button>
                </Stack>
              </Grid>

              <Grid
                item
                lg={5}
                md={5}
                sm={12}
                xs={12}
                display="flex"
                justifyContent={{ lg: "flex-end", xs: "center" }}
              >
                <Button onClick={() => window.open(samplePDFurl)}>
                  Download Sample CSV
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default BulkUploadIndex;

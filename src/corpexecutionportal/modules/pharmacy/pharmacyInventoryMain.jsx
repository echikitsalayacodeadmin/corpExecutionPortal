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
import React, { Fragment, useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UploadInventory from "./upload/uploadInventory";
import InventoryDashboard from "./dashboard/inventoryDashboard";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import ParseCSV from "../../../assets/parseCSV";
import DuplicateInCsv from "./upload/duplicateInCsv";
import DuplicateInDb from "./upload/duplicateInDb";
import { BASE_URL } from "../../../assets/constants";
import { saveData } from "../../assets/corpServices";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

const PharmacyInventoryMain = ({
  corpId = localStorage.getItem("CORPID"),
  userAuthID = localStorage.getItem("ORGUSERIDAUTH"),
}) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { enqueueSnackbar } = useSnackbar();
  const [medicineList, setMedicineList] = useState([]);
  const [medicineListUpdated, setMedicineListUpdated] = useState([]);
  const [response, setResponse] = useState("");
  const [savedFile, setSavedFile] = useState("");

  //   {"duplicateInCSV":[],"duplicateInDB":[]}

  useEffect(() => {
    if (medicineList) {
      setMedicineListUpdated(
        medicineList.map((item, index) => ({
          id: index,
          productCode: item.productcode,
          productName: item.productname,
          brand: item.brand,
          secondaryPackingUnitName: item.secondarypackagingunitname,
          primaryPackingUnitName: item.primarypackagingunitname,
          baseUnit: item.baseunit,
          secondaryConversionUnit: item.secondarypackagingunitconversion,
          primaryConversionUnit: item.primarypackagingunitconversion,
          nearExpiryDuration: item.nearexpiryshelflife,
          minimumUnit: item.reorderpoint,
          // medicineUsage: item.medicineusage,
          addedDate: dayjs().format("YYYY-MM-DD"),
        }))
      );
    }
  }, [medicineList]);

  const handleSubmit = async () => {
    const url = BASE_URL + `inventory/saveProducts`;
    const payload = medicineListUpdated.map(({ id, ...rest }) => rest);
    const result = await saveData(url, payload);
    if (result.error) {
      enqueueSnackbar(`${result.error.response.data.message}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Successfully Uploaded", {
        variant: "success",
      });
      setResponse(result.data);
    }
  };

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Pharmacy Inventory">
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderColor: "divider" }}>
              <TabList
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Inventory Dashboard" value="1" />
                <Tab label="Upload Inventory" value="2" />
                <Tab label="Duplicate In CSV" value="3" />
                <Tab label="Duplicate In DB" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: 0 }}>
              <InventoryDashboard />
            </TabPanel>

            <TabPanel value="2" sx={{ p: 0 }}>
              <UploadInventory rows={medicineListUpdated} />
            </TabPanel>
            <TabPanel value="3" sx={{ p: 0 }}>
              <DuplicateInCsv rows={response?.duplicateInCSV} />
            </TabPanel>
            <TabPanel value="4" sx={{ p: 0 }}>
              <DuplicateInDb rows={response?.duplicateInDB} />
            </TabPanel>
          </TabContext>
        </Box>

        {value === "2" && (
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
                        setList={setMedicineList}
                        corpId={corpId}
                        setSavedFile={setSavedFile}
                        testPackage={true}
                      />
                      <Button
                        variant="contained"
                        disabled={
                          medicineListUpdated.length === 0 ? true : false
                        }
                        onClick={handleSubmit}
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
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default PharmacyInventoryMain;

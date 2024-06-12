import React, { Fragment, useState } from "react";
import MainPageLayoutWithBack from "../../../corpexecutionportal/global/templates/mainPageLayoutWithBack";
import ParseCSV from "../../../assets/parseCSV";
import { BASE_URL } from "../../../assets/constants";
import AddBulkPackage from "./subComp/addBulkPackage";
import AddPackageManually from "./subComp/addPackageManually";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const AddPackageMain = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Add packages">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Add Bulk Package" value="1" />
                <Tab label="Add Package Manually" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: 0 }}>
              <AddBulkPackage />
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              <AddPackageManually />
            </TabPanel>
          </TabContext>
        </Box>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default AddPackageMain;

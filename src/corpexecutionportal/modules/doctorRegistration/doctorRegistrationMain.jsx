import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { Fragment, useState } from "react";
import DashboardIndex from "./dashboard/dashboardIndex";
import DocRegistrationIndex from "./doctorRegistration/docRegistrationIndex";

const DoctorRegistrationMain = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: "divider" }}>
            <TabList
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Dashboard" value="1" />
              <Tab label="Doctor Registration" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <DashboardIndex />
          </TabPanel>

          <TabPanel value="2" sx={{ p: 0 }}>
            <DocRegistrationIndex />
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default DoctorRegistrationMain;

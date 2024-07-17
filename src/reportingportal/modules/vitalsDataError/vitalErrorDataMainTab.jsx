import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Paper, Tab } from "@mui/material";
import React, { Fragment, useState } from "react";
import VitalsDataErrorMain from "./vitalsDataErrorMain";
import BloodTestDetails from "./bloodTestDetails";
import { isMobile } from "react-device-detect";
import VitalsErrorWithAcceptableRange from "./vitalsErrorWithAcceptableRange";
import VitalsErrorDataReport from "./vitalsErrorDataReport";

const VitalErrorDataMainTab = () => {
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
                  <Tab label="Vital Error Data" value="1" />
                  <Tab label="Blood Test Detail" value="2" />
                  <Tab label="VitalsErrorData With AcceptableRange" value="3" />
                  <Tab label="Vitals Error Data Report" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: 0 }}>
                <VitalsDataErrorMain />
              </TabPanel>
              <TabPanel value="2" sx={{ p: 0 }}>
                <BloodTestDetails />
              </TabPanel>
              <TabPanel value="3" sx={{ p: 0 }}>
                <VitalsErrorWithAcceptableRange />
              </TabPanel>
              <TabPanel value="4" sx={{ p: 0 }}>
                <VitalsErrorDataReport />
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default VitalErrorDataMainTab;

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Paper, Tab } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { getReportingPermissions } from "../../../assets/reportingPermisions";
import Form21Upload from "./comps/form21Upload";
import Form21Data from "./comps/form21Data";

const Form21Index = () => {
  const permissions = getReportingPermissions();
  const _storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_FORM_21_TAB")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();

  useEffect(() => {
    setValue(_storedData.value || "1");
  }, []);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const savedFilter = {
      value,
    };
    localStorage.setItem("SAVED_FORM_21_TAB", JSON.stringify(savedFilter));
  }, [value]);
  return (
    <Fragment>
      <Box sx={{ marginBlock: 1 }}>
        <Paper
          sx={{
            borderRadius: 5,
            paddingInline: 3,
            boxShadow: 3,
            height: "78vh",
            paddingBlock: 3,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Get Form 21 Data" value="1" />
                  {permissions?.uploadReportTab?.childTab?.form21Tab
                    ?.uploadForm21Data?.visibilty && (
                    <Tab label="Upload Form 21" value="2" />
                  )}
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: 0 }}>
                <Form21Data />
              </TabPanel>
              {permissions?.uploadReportTab?.childTab?.form21Tab
                ?.uploadForm21Data?.visibilty && (
                <TabPanel value="2" sx={{ p: 0 }}>
                  <Form21Upload />
                </TabPanel>
              )}
            </TabContext>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Form21Index;

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Paper, Tab } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Form21Upload from "./form21Comps/form21Upload";
import Form21Data from "./form21Comps/form21Data";

const Form21Index = () => {
  const _storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_FORM_21_TAB")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();

  console.log({ _storedData });

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
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Get Form 21 Data" value="1" />

                <Tab label="Upload Form 21" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1" sx={{ p: 0 }}>
              <Form21Data />
            </TabPanel>

            <TabPanel value="2" sx={{ p: 0 }}>
              <Form21Upload />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Form21Index;

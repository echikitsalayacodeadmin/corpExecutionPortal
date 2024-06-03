import React, { Fragment, useEffect, useState } from "react";
import AddItem from "./subComp/addItem";
import EditItem from "./subComp/editItem";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const AddDataQouation = () => {
  const _storedData = (() => {
    try {
      return (
        JSON.parse(localStorage.getItem("SAVED_QOUTATION_CORP_SALES")) || {}
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();

  useEffect(() => {
    setValue(_storedData.value || "1");
  }, []);
  const [value, setValue] = useState("1");
  const [corpData, setCorpData] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const savedFilter = {
      value,
    };
    localStorage.setItem(
      "SAVED_QOUTATION_CORP_SALES",
      JSON.stringify(savedFilter)
    );
  }, [value]);

  return (
    <Fragment>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Add Items" value="1" />
              <Tab label="Edit Items" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <AddItem setValue={setValue} />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <EditItem />
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default AddDataQouation;

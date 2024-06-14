import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import UpdateCalendarInfo from "./updateCalendarInfo";
import CalendarInfoAdd from "./calendarInfoAdd";

const CalendarInfoMain = () => {
  const _storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_TAB_VALUE_ENG_CAL")) || {};
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
    localStorage.setItem(
      "SAVED_TAB_VALUE_ENG_CAL",
      JSON.stringify(savedFilter)
    );
  }, [value]);
  return (
    <Fragment>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Add Calendar Info" value="1" />
              <Tab label="Update Calendar Info" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: 0 }}>
            <CalendarInfoAdd />
          </TabPanel>

          <TabPanel value="2" sx={{ p: 0 }}>
            <UpdateCalendarInfo />
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default CalendarInfoMain;

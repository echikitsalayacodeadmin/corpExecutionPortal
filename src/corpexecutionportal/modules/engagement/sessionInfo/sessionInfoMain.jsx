import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { Fragment, useState } from "react";
import UpdateSessionInfo from "./updateSessionInfo";
import SessionInfoAdd from "./sessionInfoAdd";

const SessionInfoMain = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Add Session" value="1" />
              <Tab label="Update Session" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: 0 }}>
            <SessionInfoAdd />
          </TabPanel>

          <TabPanel value="2" sx={{ p: 0 }}>
            <UpdateSessionInfo />
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default SessionInfoMain;

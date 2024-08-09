import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import StaffViewMain from "../staffView/StaffViewMain";
import DefineShiftMain from "../defineShift/DefineShiftMain";
import DashboardMain from "../dashboard/DashboardMain";
import HomeMain from "../home/HomeMain";

const StaffManagementTabsMain = () => {
  const [value, setValue] = React.useState("4");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Home" value="4" />
            <Tab label="Dashboard" value="1" />
            <Tab label="Define Shift" value="2" />
            <Tab label="Staff View" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DashboardMain />
        </TabPanel>
        <TabPanel value="2">
          <DefineShiftMain />
        </TabPanel>
        <TabPanel value="3">
          <StaffViewMain />
        </TabPanel>
        <TabPanel value="4">
          <HomeMain />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default StaffManagementTabsMain;

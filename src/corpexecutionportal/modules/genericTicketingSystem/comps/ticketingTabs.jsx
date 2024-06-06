import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";
import { Fragment, useState } from "react";
import RaiseNewTicketMain from "../raiseNewTicketMain";
import DashboardMain from "../dashboardMain";

const TicketingTabs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Dashboard" value="1" />
                    <Tab label="Rasie New Ticket" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box>
                    <DashboardMain />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box>
                    <RaiseNewTicketMain />
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketingTabs;

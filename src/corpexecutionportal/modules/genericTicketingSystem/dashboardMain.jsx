import { Box, Grid } from "@mui/material";
import { Fragment, useState } from "react";
import DashboardFilters from "./comps/dashboardFilters";
import TicketListView from "./comps/ticketListView";
import TicketView from "./comps/ticketView";
import { useNavigate } from "react-router-dom";

const DashboardMain = () => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <DashboardFilters />
          </Grid>
          <Grid item lg={12}>
            <TicketListView />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardMain;

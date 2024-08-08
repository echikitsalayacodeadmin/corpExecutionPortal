import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import DashboardTableComponent from "../tableComp/DashboardTableComponent";

const DashboardMain = () => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <DashboardTableComponent />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardMain;

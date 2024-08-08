import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import StaffViewTableComponent from "../tableComp/StaffViewTableComponent";

const StaffViewMain = () => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <StaffViewTableComponent />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default StaffViewMain;

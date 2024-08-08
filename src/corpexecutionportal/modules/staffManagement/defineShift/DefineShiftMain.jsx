import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import DefineShiftTableComponent from "../tableComp/DefineShiftTableComponent";

const DefineShiftMain = () => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <DefineShiftTableComponent />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DefineShiftMain;

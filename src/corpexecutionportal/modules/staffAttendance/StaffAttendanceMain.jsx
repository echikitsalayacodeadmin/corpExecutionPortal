import { Fragment } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import { Box, Grid } from "@mui/material";
import StaffAttendanceTableComponent from "./tableComp/StaffAttendanceTableComponent";

const StaffAttendanceMain = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Staff Attendance">
        <Box>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <StaffAttendanceTableComponent />
            </Grid>
          </Grid>
        </Box>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default StaffAttendanceMain;

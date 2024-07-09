import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Fragment } from "react";

const DoctorSummaryContent = (props) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Box
            sx={{ p: 3 }}
            component={Stack}
            direction="row"
            justifyContent={"center"}
          >
            <Typography variant="h6">
              Doctor details updated successfully.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DoctorSummaryContent;

import { Box, Grid, TextField } from "@mui/material";
import { Fragment } from "react";

const DashboardFilters = () => {
  return (
    <Fragment>
      <Box sx={{ py: 0 }}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <TextField
              fullWidth
              size="small"
              label="Ticket Type"
              placeholder="eg:Awareness Session"
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              fullWidth
              size="small"
              label="Seacrh"
              placeholder="seacrh by name, ID etc."
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              size="small"
              label="From Date"
              placeholder="January/01/2024"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              size="small"
              label="To Date"
              placeholder="January/01/2024"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              size="small"
              label="Status"
              placeholder="All"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              size="small"
              label="Raised By"
              placeholder="eg:Human Resources"
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardFilters;

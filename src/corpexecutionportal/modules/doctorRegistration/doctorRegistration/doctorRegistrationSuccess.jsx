import { Box, Grid, Stack, Typography } from "@mui/material";

const DoctorRegistrationSuccess = () => {
  return (
    <Grid container>
      <Grid item lg={12} xs={12}>
        <Box
          sx={{ p: 3 }}
          component={Stack}
          direction="row"
          justifyContent={"center"}
        >
          <Typography variant="h6">Doctor On-Boarding Form</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DoctorRegistrationSuccess;

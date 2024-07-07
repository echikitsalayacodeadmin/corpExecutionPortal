import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
const Department = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={1}>
                <Grid
                  item
                  lg={12}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <AddHomeWorkIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>Department</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18 }}>
                      {data.ticketInfo?.department || "n/a"}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Department;

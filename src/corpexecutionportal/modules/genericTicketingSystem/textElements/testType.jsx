import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
const TestType = ({ data }) => {
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
                      <AssignmentIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>Test Type</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18 }}>
                      {data.ticketInfo?.testType || "n/a"}
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

export default TestType;

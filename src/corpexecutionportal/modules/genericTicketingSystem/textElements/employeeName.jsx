import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import PersonIcon from "@mui/icons-material/Person";
const EmployeeName = ({ data }) => {
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
                      <PersonIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>
                        Employee Name
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18 }}>
                      {data.ticketInfo?.empName || "n/a"}
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

export default EmployeeName;

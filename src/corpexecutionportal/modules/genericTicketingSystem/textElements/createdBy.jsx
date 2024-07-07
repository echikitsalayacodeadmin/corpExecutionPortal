import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import BackHandIcon from "@mui/icons-material/BackHand";
const CreatedBy = ({ data }) => {
  let { raisedBy } = data;
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
                      <BackHandIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>Raised by</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18 }}>
                      {data?.raisedBy || "n/a"}
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

export default CreatedBy;

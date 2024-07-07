import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { StatusListForNonFilter } from "../../../assets/corpConstants";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Status = ({ data }) => {
  let { status } = data;
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
                      <MoreHorizIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>Status</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18 }}>
                      {StatusListForNonFilter.find(
                        (value) => value.value === data?.ticketInfo?.status
                      ).label || ""}
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

export default Status;

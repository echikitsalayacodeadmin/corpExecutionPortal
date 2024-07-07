import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Fragment } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const TargetDate = ({ data }) => {
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
                      <CalendarTodayIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>Target date</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18 }}>
                      {data?.ticketInfo?.targetDate
                        ? dayjs(data?.ticketInfo?.targetDate).format("LL")
                        : ""}
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

export default TargetDate;

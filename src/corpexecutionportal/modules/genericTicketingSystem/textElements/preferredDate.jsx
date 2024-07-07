import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Fragment } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const PreferredDate = ({ data }) => {
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
                      <Typography sx={{ fontSize: 10 }}>
                        Preferred Date
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18 }}>
                      {data?.ticketInfo?.preferredDate
                        ? dayjs(data?.ticketInfo?.preferredDate).format("LL")
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

export default PreferredDate;

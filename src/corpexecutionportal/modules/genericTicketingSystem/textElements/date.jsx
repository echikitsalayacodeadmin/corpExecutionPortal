import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Fragment } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const Date = ({ data }) => {
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
                      <CalendarMonthIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>Date</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18 }}>
                      {data?.ticketInfo?.date
                        ? dayjs(data?.ticketInfo?.date).format("LL")
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

export default Date;

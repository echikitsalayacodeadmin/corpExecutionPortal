import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Fragment } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";

const SessionDateForm = ({ date, setDate }) => {
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
                      <DateRangeIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>
                        Seesion Date
                      </Typography>
                    </Stack>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label=""
                        value={date || null}
                        onChange={(newValue) => setDate(newValue)}
                        slotProps={{
                          textField: { size: "small", fullWidth: true },
                        }}
                        format="LL"
                      />
                    </LocalizationProvider>
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

export default SessionDateForm;

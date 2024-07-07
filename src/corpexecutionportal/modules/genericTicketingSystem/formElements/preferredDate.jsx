import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const PreferredDate = ({ formValues, setFormValues }) => {
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
                  <Stack spacing={2} flex={1}>
                    <Stack direction="row" spacing={1}>
                      <CalendarTodayIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>
                        Preferred Date
                      </Typography>
                    </Stack>
                    <Box sx={{ minWidth: 400 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label=""
                          value={formValues.preferredDate || null}
                          onChange={(newValue) =>
                            setFormValues({
                              ...formValues,
                              preferredDate: newValue,
                            })
                          }
                          slotProps={{ textField: { size: "small" } }}
                          format="LL"
                        />
                      </LocalizationProvider>
                    </Box>
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

import { Box, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Date:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label=""
              value={formValues.newDate || null}
              onChange={(newValue) =>
                setFormValues({ ...formValues, newDate: newValue })
              }
              slotProps={{ textField: { size: "small" } }}
              format="LL"
            />
          </LocalizationProvider>
        </Box>
      </Stack>
    </Fragment>
  );
};

export default DateForm;

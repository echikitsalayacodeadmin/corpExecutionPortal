import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { productList } from "../../../assets/corpConstants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TargetDateForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Target Date:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label=""
              value={formValues.targetDate || null}
              onChange={(newValue) =>
                setFormValues({ ...formValues, targetDate: newValue })
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

export default TargetDateForm;

import { Box, IconButton, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import ClearIcon from "@mui/icons-material/Clear";

const GlobalDateLayout = ({
  label,
  setCheckDate,
  setDate,
  initialDate,
  disablePast,
  sevenDaysBack,
  disableFuture,
  numberOfDaysBack,
  disabled,
  formValues,
  setFormValues,
  property,
}) => {
  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    if (initialDate === null) {
      setDateValue(null);
      if (setDate) {
        setDate(null);
      }
      if (formValues && setFormValues && property) {
        setFormValues({ ...formValues, [property]: null });
      }
    } else if (initialDate) {
      setDateValue(dayjs(initialDate));
    } else if (numberOfDaysBack || sevenDaysBack) {
      const daysToSubtract = numberOfDaysBack || 7;
      setDateValue(dayjs().subtract(daysToSubtract, "day"));
    } else {
      setDateValue(dayjs());
    }
  }, [initialDate]);

  const handleDateChange = (newValue) => {
    if (newValue) {
      setDateValue(dayjs(newValue));
      const formattedDate = newValue.format("YYYY-MM-DD");
      if (setDate) {
        setDate(formattedDate);
      }
      if (formValues && setFormValues && property) {
        setFormValues({ ...formValues, [property]: formattedDate });
      }
      if (setCheckDate) {
        setCheckDate(true);
      }
    } else {
      setDateValue(null);
      if (setDate) {
        setDate(null);
      }
      if (formValues && setFormValues && property) {
        setFormValues({ ...formValues, [property]: null });
      }
    }
  };

  const handleClearDate = () => {
    setDateValue(null);
    if (setDate) {
      setDate(null);
    }
    if (formValues && setFormValues && property) {
      setFormValues({ ...formValues, [property]: null });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",

        "& .MuiFormControl-root": {
          display: "flex",
          justifyContent: "center",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          // border: "1px solid #D4D4D4",
          borderRadius: "15px",
          height: "44px",
        },
        "& .MuiOutlinedInput-input": {
          height: "6px",
          borderRadius: "15px",
          backgroundColor: "#FFFFFF",
          fontWeight: "400",
          fontSize: "13px",
          lineHeight: "15px",
          color: "#000000",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={disabled}
          disablePast={disablePast}
          disableFuture={disableFuture}
          openTo="day"
          views={["year", "month", "day"]}
          value={dateValue}
          label={label ? label : null}
          format="YYYY-MM-DD"
          onChange={handleDateChange}
          slotProps={{
            textField: { InputLabelProps: { shrink: true } },
            field: { clearable: true, onClear: () => handleClearDate() },
          }}
          InputProps={{
            endAdornment: (
              <>
                <IconButton>
                  <InsertInvitationIcon />
                </IconButton>
              </>
            ),
          }}
          textField={(params) => (
            <TextField {...params} size="small" sx={{ borderRadius: "15px" }} />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default GlobalDateLayout;

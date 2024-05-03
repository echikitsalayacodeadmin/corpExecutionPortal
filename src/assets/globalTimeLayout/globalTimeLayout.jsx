import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClearIcon from "@mui/icons-material/Clear";

const GlobalTimeLayout = ({
  label,
  setTime,
  initialTime,
  disabled,
  formValues,
  setFormValues,
  property,
}) => {
  const [timeValue, setTimeValue] = useState(null);

  useEffect(() => {
    if (initialTime === null) {
      setTimeValue(null);
      if (setTime) {
        setTime(null);
      }
      if (formValues && setFormValues && property) {
        setFormValues({ ...formValues, [property]: null });
      }
    } else if (initialTime) {
      setTimeValue(dayjs(initialTime));
    } else {
      setTimeValue(dayjs());
    }
  }, [initialTime]);

  const handleTimeChange = (newValue) => {
    if (newValue) {
      setTimeValue(dayjs(newValue));
      const formattedTime = newValue.format("HH:mm:ss");
      if (setTime) {
        setTime(formattedTime);
      }
      if (formValues && setFormValues && property) {
        setFormValues({ ...formValues, [property]: formattedTime });
      }
    } else {
      setTimeValue(null);
      setTime(null);
      if (formValues && setFormValues && property) {
        setFormValues({ ...formValues, [property]: null });
      }
    }
  };

  const handleClearTime = () => {
    setTimeValue(null);
    setTime(null);
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
          borderRadius: "15px",
          height: "44px",
        },
        "& .MuiOutlinedInput-input": {
          height: "6px",
          backgroundColor: "#FFFFFF",
          fontWeight: "400",
          fontSize: "13px",
          lineHeight: "15px",
          color: "#000000",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          disabled={disabled}
          value={timeValue}
          label={label ? label : null}
          onChange={handleTimeChange}
          slotProps={{
            textField: { InputLabelProps: { shrink: true } },
            field: { clearable: true, onClear: () => handleClearTime() },
          }}
          InputProps={{
            endAdornment: (
              <>
                <IconButton>
                  <AccessTimeIcon />
                </IconButton>
              </>
            ),
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" sx={{ borderRadius: "15px" }} />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default GlobalTimeLayout;

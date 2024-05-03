import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Fragment, useState } from "react";

const months = [
  {
    name: "January",
    value: "JANUARY",
  },
  {
    name: "February",
    value: "FEBRUARY",
  },
  {
    name: "March",
    value: "MARCH",
  },
  {
    name: "April",
    value: "APRIL",
  },
  {
    name: "May",
    value: "MAY",
  },
  {
    name: "June",
    value: "JUNE",
  },
  {
    name: "July",
    value: "JULY",
  },
  {
    name: "August",
    value: "AUGUST",
  },
  {
    name: "September",
    value: "SEPTEMBER",
  },
  {
    name: "October",
    value: "OCTOBER",
  },
  {
    name: "November",
    value: "NOVEMBER",
  },
  {
    name: "December",
    value: "DECEMBER",
  },
];

const MonthSelector = ({ month, setMonth }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <Box sx={{}}>
        <FormControl fullWidth size="small" sx={{ background: "#fff" }}>
          <InputLabel id="month-input-label">Month</InputLabel>
          <Select
            style={{ borderRadius: "15px" }}
            sx={{ borderRadius: 5 }}
            labelId="month-label"
            id="month"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={month}
            label="Month"
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          >
            {months?.map((val, index) => (
              <MenuItem value={val?.value} key={index}>
                {val?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Fragment>
  );
};

export default MonthSelector;

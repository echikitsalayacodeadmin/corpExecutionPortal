import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CustomSelect = ({
  disabled,
  width,
  value,
  setvalue,
  options = [],
  label = "",
  placeholder = "",
}) => {
  const handleChange = (event) => {
    setvalue({ ...value, paymentStatus: event.target.value });
  };

  return (
    <Box sx={{ minWidth: 120, width: width }}>
      <FormControl
        fullWidth
        size="small"
        sx={
          {
            //"& fieldset": { border: "none" },
          }
        }
      >
        <InputLabel sx={{ fontSize: 11 }}> {label} </InputLabel>
        <Select
          disabled={disabled}
          sx={{ fontSize: 11, fontWeight: 600, height: 35, borderRadius: 3 }}
          value={value.paymentStatus || ""}
          label={label}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem disabled value="">
            <em>Select {placeholder}...</em>
          </MenuItem>
          {options.map((it, index) => (
            <MenuItem
              value={it?.value}
              key={index}
              sx={{ fontSize: 11, fontWeight: 600 }}
            >
              {it?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default CustomSelect;

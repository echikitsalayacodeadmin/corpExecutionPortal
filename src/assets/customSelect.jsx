import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

const CustomSelect = ({
  disabled,
  placeholder,
  width,
  value,
  setvalue,
  options = [],
  label,
  formValues,
  setFormValues,
  property,
  labelColor,
  helperText,
  required,
}) => {
  const handleChange = (event) => {
    if (setvalue) {
      setvalue(event.target.value);
    } else if (setFormValues && formValues && property) {
      setFormValues({ ...formValues, [property]: event.target.value });
    }
  };

  return (
    <Box sx={{ minWidth: 120, width: width }}>
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={handleChange}
          size="small"
          required={required}
          sx={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            color: "#00000",
            borderColor: "red",
            "& .MuiInputLabel-root": {
              color: labelColor || "#127DDD",
            },
          }}
          placeholder={placeholder}
          displayEmpty
        >
          {options.map((it, index) => (
            <MenuItem value={it?.value} key={index}>
              {it?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {helperText && (
        <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>
      )}
    </Box>
  );
};
export default CustomSelect;

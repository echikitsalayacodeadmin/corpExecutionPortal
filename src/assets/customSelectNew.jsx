import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

const CustomSelectNew = ({
  disabled,
  placeholder,
  width,
  options = [],
  label,
  formValues,
  setFormValues,
  property,
  labelColor,
  helperText,
  required,
}) => {
  return (
    <Box sx={{ minWidth: 120, width: width }}>
      <FormControl fullWidth>
        <Select
          value={formValues[property] || ""}
          onChange={(event) =>
            setFormValues({ ...formValues, [property]: event.target.value })
          }
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
          <MenuItem value="">{placeholder}</MenuItem>
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
export default CustomSelectNew;

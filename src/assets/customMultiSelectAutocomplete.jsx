import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CustomMultiSelectAutocomplete = ({
  options,
  label,
  placeholder,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectValues = (event, selectedOptions, reason) => {
    setSelectedValues(selectedOptions);
    if (reason === "clear") {
      setSelectedValues([]);
    }
    if (typeof onChange === "function") {
      onChange(event, selectedOptions, reason);
    }
  };

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags"
      disableCloseOnSelect
      fullWidth
      size="small"
      options={options}
      value={selectedValues}
      onChange={handleSelectValues}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option, { selected }) => (
        <li style={{ padding: 0 }} {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            background: "#fff",
            color: "#127DDD",
            fontWeight: "500",
            fontSize: "13px",
            lineHeight: " 15px",
            "& input::placeholder": {
              color: "#000000",
              fontWeight: "500",
              fontSize: "13px",
              lineHeight: " 15px",
            },
          }}
          label={label}
          variant="outlined"
          placeholder={placeholder}
          size="small"
          InputProps={{
            ...params.InputProps,
            type: "Search",
          }}
        />
      )}
    />
  );
};

export default CustomMultiSelectAutocomplete;

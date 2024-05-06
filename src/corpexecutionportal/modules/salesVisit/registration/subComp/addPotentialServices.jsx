import {
  Autocomplete,
  Checkbox,
  FormControl,
  IconButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { CORPORATE_SERVICES } from "../../../../assets/corpConstants";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddPotentialServices = ({ formValues, setFormValues }) => {
  const handleClearClick = () => {
    setFormValues({ ...formValues, prospectiveServices: [] }); // Clear the selected values
  };

  return (
    <Fragment>
      <Autocomplete
        size="small"
        freeSolo
        selectOnFocus
        disableClearable
        multiple
        value={formValues?.prospectiveServices}
        options={CORPORATE_SERVICES}
        disableCloseOnSelect
        onChange={(event, selectedOptions) => {
          console.log("Selected options:", selectedOptions);
          setFormValues({
            ...formValues,
            prospectiveServices: selectedOptions,
          });
        }}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Potential Services"
            placeholder="Potential Services"
            sx={{ borderRadius: "15px", backgroundColor: "#FFFFFF" }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {formValues?.potentialServices?.length > 0 && (
                    <IconButton onClick={handleClearClick} edge="end">
                      <ClearOutlinedIcon />
                    </IconButton>
                  )}
                </>
              ),
            }}
          />
        )}
      />
    </Fragment>
  );
};

export default AddPotentialServices;

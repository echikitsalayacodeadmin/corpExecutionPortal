import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const CustomSelect = ({
  dataValue,
  property,
  formValues,
  setFormValues,
}) => {
  const [value, setValue] = useState(dataValue[property] || false);

  return (
    <FormControl>
      <Select
        sx={{
          height: 30,
          mb: 1,
          background: value ? "green" : "#FF474C",
          color: "white",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
        size="small"
        value={value}
        label=""
        onChange={(event) => {
          setValue(event.target.value);

          dataValue[property] = event.target.value;
          setFormValues([...formValues]);
        }}
        defaultValue={true}
      >
        <MenuItem value={true}>Yes</MenuItem>
        <MenuItem value={false}>No</MenuItem>
      </Select>
    </FormControl>
  );
};

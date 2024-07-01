import { Autocomplete, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { getDepartments } from "../../../services/genericTicketingSystem";

const DepartmentFilter = ({
  selectDepartment,
  setSelectDepartment,
  corpId = localStorage.getItem("CORPID"),
}) => {
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    getDepartments(corpId, setDepartmentList);
  }, []);
  return (
    <Fragment>
      <Autocomplete
        value={selectDepartment}
        onChange={(event, newValue) => {
          setSelectDepartment(newValue);
          console.log({ newValue });
        }}
        sx={{
          "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
            fontSize: 11,
            fontWeight: 600,
            color: "#000",
          },
        }}
        ListboxProps={{
          sx: { fontSize: 11, fontWeight: 600 },
        }}
        size="small"
        fullWidth
        disablePortal
        options={departmentList}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& fieldset": {
                fontSize: 11,
                height: 41,
                borderRadius: 3,
              },
            }}
            label="Department"
            InputLabelProps={{
              style: {
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: 11,
                color: "#404040",
              },
            }}
          />
        )}
      />
    </Fragment>
  );
};

export default DepartmentFilter;

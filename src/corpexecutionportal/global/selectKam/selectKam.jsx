import React, { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/corpServices";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Autocomplete, Checkbox, IconButton, TextField } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectKam = ({
  selectedKamData,
  setSelectedKamData,
  formValues,
  setFormValues,
  property,
}) => {
  const userName = localStorage.getItem("USER_NAME_CORP_SALES");
  const [selectedValue, setSelectedValue] = useState([]);
  const [kamList, setKamList] = useState([]);

  const fetchData = async () => {
    const url = BASE_URL + `patient/role?role=CORPSALES_USER`;
    const result = await getData(url);
    if (result?.data) {
      setKamList(result?.data);
    } else {
      setKamList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Autocomplete
        size="small"
        fullWidth
        multiple
        id="checkboxes-tags-demo"
        options={kamList.filter((item) => item.name)}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        value={selectedValue.name}
        onChange={(event, selectedOptions) => {
          setSelectedValue(selectedOptions);
          if (formValues && setFormValues && property) {
            setFormValues({ ...formValues, [property]: selectedOptions });
          } else {
            setSelectedKamData(selectedOptions);
          }
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            {...params}
            label="Associates"
            placeholder="Associates"
          />
        )}
      />
    </Fragment>
  );
};

export default SelectKam;

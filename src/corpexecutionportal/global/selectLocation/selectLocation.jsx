import React, { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import { getData } from "../../assets/corpServices";
import { BASE_URL } from "../../../assets/constants";

const SelectLocation = ({
  label,
  placeholder,
  formValues,
  setFormValues,
  selectedValue,
  setSelectedValue,
  property,
  freeSolo = false,
}) => {
  const [value, setValue] = useState(null);

  const [regionList, setRegionList] = useState([]);

  const fetchRegionList = async () => {
    const url = BASE_URL + "corpSales/locations/all";
    const result = await getData(url);
    if (result?.data) {
      setRegionList(result?.data);
    } else {
      setRegionList([]);
    }
  };

  useEffect(() => {
    fetchRegionList();
  }, []);

  const handleInputChange = (newValue) => {
    if (formValues && setFormValues && property) {
      setFormValues({ ...formValues, [property]: newValue?.trim() });
    } else {
      setValue(newValue?.trim());
      setSelectedValue(newValue?.trim());
    }
  };

  useEffect(() => {
    setValue(formValues?.[property] || selectedValue || null);
  }, [formValues, selectedValue]);

  return (
    <Fragment>
      <CustomAutocomplete
        label={label}
        options={regionList}
        value={value}
        placeholder={placeholder}
        getOptionLabel={(option) => option}
        onChange={(event, newValue, reason) => {
          handleInputChange(newValue);
          if (reason === "clear") {
            handleInputChange(null);
          }
        }}
        freeSolo={freeSolo}
        onInputChange={(event, newInputValue, reason) => {
          handleInputChange(newInputValue);
          if (reason === "clear") {
            handleInputChange(null);
          }
        }}
      />
    </Fragment>
  );
};

export default SelectLocation;

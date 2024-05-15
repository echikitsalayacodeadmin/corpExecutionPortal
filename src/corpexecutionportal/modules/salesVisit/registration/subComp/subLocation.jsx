import React, { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";
import { BASE_URL } from "../../../../../assets/constants";
import { getData } from "../../../../assets/corpServices";

const SubLocation = ({ formValues, setFormValues, property }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChangeSubLoaction = (event, newValue, reason) => {
    setSelectedValue(newValue);
    setFormValues({ ...formValues, [property]: newValue });
    if (reason === "clear") {
      setSelectedValue("");
      setFormValues({ ...formValues, [property]: "" });
    }
  };
  useEffect(() => {
    setSelectedValue(formValues?.[property] || "");
  }, [formValues]);
  return (
    <Fragment>
      <CustomAutocomplete
        options={[
          "Sector 1 - Pithampur",
          "Sector 2 - Pithampur",
          "Sector 3 - Pithampur",
          "Pahadi Pithampur",
          "Suhagpur Pithampur",
          "Pharma SEZ Pithampur",
          "SEZ 1 Pithampur",
          "Sanwar Road Indore",
          "Poleground Indore",
          "Vijay Nagar Indore",
          "Machal Indore",
          "Within City",
        ]}
        freeSolo={true}
        label="Sub Location"
        getOptionLabel={(option) => option}
        placeholder="Sub Location"
        value={selectedValue}
        onChange={handleChangeSubLoaction}
        onInputChange={(event, newInputValue, reason) => {
          setSelectedValue(newInputValue);
          setFormValues({ ...formValues, [property]: newInputValue });

          if (reason === "clear") {
            setSelectedValue("");
            setFormValues({ ...formValues, [property]: "" });
          }
        }}
      />
    </Fragment>
  );
};

export default SubLocation;

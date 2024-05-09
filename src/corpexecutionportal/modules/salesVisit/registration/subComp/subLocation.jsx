import React, { Fragment, useEffect, useState } from "react";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";

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
        label="Sub Location"
        getOptionLabel={(option) => option}
        placeholder="Sub Location"
        value={selectedValue}
        onChange={handleChangeSubLoaction}
      />
    </Fragment>
  );
};

export default SubLocation;

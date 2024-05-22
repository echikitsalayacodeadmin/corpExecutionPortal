import React, { Fragment, useEffect, useState } from "react";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";

const Priority = ({ formValues, setFormValues }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChangeVisitType = (event, newValue, reason) => {
    setSelectedValue(newValue);
    setFormValues({ ...formValues, priority: newValue });
    if (reason === "clear") {
      setSelectedValue("");
      setFormValues({ ...formValues, priority: "" });
    }
  };

  useEffect(() => {
    setSelectedValue(formValues.priority || "");
  }, [formValues]);

  return (
    <Fragment>
      <CustomAutocomplete
        required={true}
        asterickColor={"red"}
        options={["P0", "P1", "P2", "P3", "P4"]}
        label="Priority"
        getOptionLabel={(option) => option}
        placeholder="Priority"
        value={selectedValue}
        onChange={handleChangeVisitType}
      />
    </Fragment>
  );
};

export default Priority;

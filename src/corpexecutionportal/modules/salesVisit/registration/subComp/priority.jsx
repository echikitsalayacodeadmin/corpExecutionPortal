import React, { Fragment, useState } from "react";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";

const Priority = ({ formValues, setFormValues }) => {
  const [selectedValue, setSelectedValue] = useState({
    label: "",
    value: "",
  });
  const handleChangeVisitType = (event, newValue, reason) => {
    setSelectedValue(newValue);
    setFormValues({ ...formValues, priority: newValue.value });
    if (reason === "clear") {
      setSelectedValue({
        value: "",
        label: "",
      });
      setFormValues({ ...formValues, priority: "" });
    }
  };
  return (
    <Fragment>
      <CustomAutocomplete
        options={[
          { value: "P0", label: "P0" },
          { value: "P1", label: "P1" },
          { value: "P2", label: "P2" },
          { value: "P3", label: "P3" },
          { value: "P4", label: "P4" },
        ]}
        label="Priority"
        placeholder="Priority"
        value={selectedValue}
        onChange={handleChangeVisitType}
      />
    </Fragment>
  );
};

export default Priority;

import React, { Fragment, useState } from "react";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";

const VisitType = ({ formValues, setFormValues }) => {
  const [selectedValue, setSelectedValue] = useState({
    label: "",
    value: "",
  });
  const handleChangeVisitType = (event, newValue, reason) => {
    setSelectedValue(newValue);
    setFormValues({ ...formValues, visitType: newValue.value });
    if (reason === "clear") {
      setSelectedValue({
        value: "",
        label: "",
      });
      setFormValues({ ...formValues, visitType: "" });
    }
  };
  return (
    <Fragment>
      <CustomAutocomplete
        options={[
          { label: "Telephonic Visit", value: "TELEPHONIC" },
          { label: "In Person Visit", value: "IN_PERSON" },
        ]}
        label="Visit Type"
        required={true}
        asterickColor={"red"}
        placeholder="Visit Type"
        value={selectedValue}
        onChange={handleChangeVisitType}
      />
    </Fragment>
  );
};

export default VisitType;

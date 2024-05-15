import React, { Fragment, useState } from "react";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";

const VisitType = ({ formValues, setFormValues }) => {
  const [selectedValue, setSelectedValue] = useState({
    label: "",
    value: "",
  });
  const handleChangeVisitType = (event, newValue, reason) => {
    setSelectedValue(newValue);
    setFormValues({ ...formValues, visitType: newValue?.value || "" });
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
          {
            label: "In Person meeting with relevant stakeholder",
            value: "IN_PERSON_MEETING_WITH_RELEVANT_STAKEHOLDER",
          },
          { label: "Gate not crashed", value: "GATE_NOT_CRASHED" },
          {
            label: "Unable to meet relevant stakeholder",
            value: "UNABLE_TO_MEET_RELEVANT_STAKEHOLDER",
          },
          { label: "Follow Up", value: "FOLLOW_UP" },
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

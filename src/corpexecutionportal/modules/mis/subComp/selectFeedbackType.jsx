import React, { Fragment, useState } from "react";
import CustomAutocomplete from "../../../../assets/customAutocomplete";

const SelectFeedbackType = ({ setFeedbackType }) => {
  const [selectedType, setSelectedType] = useState(null);
  return (
    <Fragment>
      <CustomAutocomplete
        options={[
          "CARE_COORDINATION",
          "AWARENESS_SESSION",
          "FIRSTAID_OR_FIRESAFETYTRAINING",
          "POST_AHC_DOCTOR_CONSULTATION",
          "CAMP",
        ]}
        label="Select Feeback Form"
        placeholder="Select Feeback Form"
        getOptionLabel={(option) => option}
        value={selectedType}
        onChange={(event, newValue, reason) => {
          setSelectedType(newValue);
          setFeedbackType(newValue);
          if (reason === "clear") {
            setFeedbackType("");
            setSelectedType("");
          }
        }}
      />
    </Fragment>
  );
};

export default SelectFeedbackType;

import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const MarkStatusBtn = ({
  selectedStatus,
  setSelectedStatus,
  notReq = false,
  disabled,
}) => {
  const handleChange = (event, newValue) => {
    setSelectedStatus(newValue);
  };

  return (
    <ToggleButtonGroup
      disabled={disabled}
      color="primary"
      value={selectedStatus}
      exclusive
      onChange={handleChange}
      aria-label="status"
    >
      <ToggleButton
        value="PENDING"
        style={{
          backgroundColor: selectedStatus === "PENDING" ? "yellow" : "",
          color: selectedStatus === "PENDING" ? "black" : "",
          height: "40px",
        }}
      >
        Pending
      </ToggleButton>
      <ToggleButton
        value="WORK_IN_PROGRESS"
        style={{
          backgroundColor:
            selectedStatus === "WORK_IN_PROGRESS" ? "orange" : "",
          color: selectedStatus === "WORK_IN_PROGRESS" ? "white" : "",
          height: "40px",
        }}
      >
        WIP
      </ToggleButton>
      <ToggleButton
        value="DONE"
        style={{
          backgroundColor: selectedStatus === "DONE" ? "green" : "",
          color: selectedStatus === "DONE" ? "white" : "",
          height: "40px",
        }}
      >
        DONE
      </ToggleButton>
      {notReq && (
        <ToggleButton
          value="NOT_REQUIRED"
          style={{
            backgroundColor: selectedStatus === "NOT_REQUIRED" ? "#000000" : "",
            color: selectedStatus === "NOT_REQUIRED" ? "#FFFFFF" : "",
            height: "40px",
          }}
        >
          Not Req
        </ToggleButton>
      )}
    </ToggleButtonGroup>
  );
};

export default MarkStatusBtn;
